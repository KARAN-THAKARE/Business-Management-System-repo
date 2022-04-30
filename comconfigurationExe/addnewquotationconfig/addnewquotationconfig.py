from flask import Flask,Blueprint,request,render_template
from fiscalyear import *
import sqlite3
import json

#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time
from fiscalyear import *

from jproperties import Properties
configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)


CofigurationAddNewQuotationBlueprint = Blueprint('CofigurationAddNewQuotationBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.addnewquotationconfig.addnewquotationMapper import *
from comconfigurationExe.SMTPServer.SMTP  import *



#-------------------------Add new Quotation----------------------------
@CofigurationAddNewQuotationBlueprint.route("/AddNewQuotation.do")
def AddNewQuotation():
    configs = Properties()
    with open('example.properties', 'rb') as read_prop:
        configs.load(read_prop)
    return render_template(configs.get("ADD_NEW_QUOTATION_TEMPLATE").data);
#-------------------------END HERE-----------------------------


#-------------------------Fetch Quotation Number----------------------------
@CofigurationAddNewQuotationBlueprint.route("/FetchQuotationNumber.do")
def FetchQuotationNumber():
    a=str(FiscalYear.current())
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_QUOTATION_NO)
    FetchQuotationDetails = cur.fetchall()
    for each in FetchQuotationDetails:
        Insider_Dict['QuotationNumber']="QT"+a[2::]+str(each[4])
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#------------------------- ADD STOCK TO BUCKET OF GIVEN Quotation ID----------------------------
@CofigurationAddNewQuotationBlueprint.route("/Add_Stock_To_Bucket_For_Quotation.do",methods=['POST'])
def Add_Stock_To_Bucket_For_Quotation():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    #--------------------- Set Null To 0------------------------
    #@For Discount
    if(data.get("disc")==None):
        disc=0
    else:
        disc=data.get("disc")

    #@For cgst
    if(data.get("cgst")==None):
        cgst=0
    else:
        cgst=data.get("cgst")

    #@For sgst
    if(data.get("sgst")==None):
        sgst=0
    else:
        sgst=data.get("sgst")

    #@For igst
    if(data.get("igst")==None):
        igst=0
    else:
        igst=data.get("igst")

    #@For cess
    if(data.get("cess")==None):
        cess=0
    else:
        cess=data.get("cess")

    try:
        cur.execute(ADD_STOCK_TO_BUCKET,(data.get("QuotationNumber"),data.get("Stock_ID"),data.get("Stock_Name"),data.get("qty"),data.get("sp"),disc,cgst,sgst,igst,cess,data.get("amt")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------


#------------------------- Fetch Bucket Item----------------------------
@CofigurationAddNewQuotationBlueprint.route("/Fetch_Bucket_Item_for_Quotation.do",methods=['POST'])
def Fetch_Bucket_Item_for_Quotation():
    Sub_Total=0
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    try:
        cur.execute(FETCH_BUCKET_ITEM_FOR_GIVEN_QUOTATION,(str(data.get("QuotationNumber")),))
        Bucket_Item = cur.fetchall()
        for each in Bucket_Item:
            Insider_Dict['SrNo']=each[0]
            Insider_Dict['ID']=each[1]
            Insider_Dict['Quotation_NO']=each[2]
            Insider_Dict['Stock_ID']=each[3]
            Insider_Dict['Stock_Name']=each[4]
            Insider_Dict['Qty']=each[5]
            Insider_Dict['Sell_Price']=each[6]
            Insider_Dict['Discount']=each[7]
            Insider_Dict['CGST']=each[8]
            Insider_Dict['SGST']=each[9]
            Insider_Dict['IGST']=each[10]
            Insider_Dict['Cess']=each[11]
            Insider_Dict['Amount']=each[12]
            Sub_Total=Sub_Total+float(each[12])
            Insider_Dict['Sub_Total']=Sub_Total
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1
        status="Success"
    except Exception as e:
        status="Failed"

    return Outsider_Dict;
#-------------------------END HERE-----------------------------

#------------------------- Delete Item From Bucket ----------------------------
@CofigurationAddNewQuotationBlueprint.route("/Delete_Item_From_Bucket_For_Quotation.do",methods=['POST'])
def Delete_Item_From_Bucket_For_Quotation():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    try:
        cur.execute(DELETE_ITEM_FROM_BUCKET_FOR_QUOTATION,(data.get("ID"),))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------


#------------------------- Submit Quotation ----------------------------

@CofigurationAddNewQuotationBlueprint.route("/SubmitQuotation.do",methods=['POST'])
def SubmitQuotation():
    Quotation_Date=''
    EMI_MONTH=0

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    try:
        x = data.get("QuotationDate").split('T')[0]
        Quotation_Date=dt.strptime(x, '%Y-%m-%d').date()
    except Exception as e:
        Quotation_Date=data.get("QuotationDate")

    try:
        x = data.get("Valid_Till_Date").split('T')[0]
        Valid_Till_Date=dt.strptime(x, '%Y-%m-%d').date()
    except Exception as e:
        Valid_Till_Date=data.get("Valid_Till_Date")

    TODAY_DATE=dt.today().strftime('%Y-%m-%d')

    cur.execute("SELECT COUNT(*) FROM Quotation WHERE Quotation_NO = ?",(data.get("QuotationNumber"),))
    x = cur.fetchall()
    for each in x:
        Record_Count=each[0]

    #--------------------- Set Null To 0------------------------
    #@For Discount in percentage
    if(data.get("Disc_in_percentage")==None):
        Disc_in_percentage=0
    else:
        Disc_in_percentage=data.get("Disc_in_percentage")

    #@For Discount in amount
    if(data.get("Disc_in_amt")==None):
        Disc_in_amt=0
    else:
        Disc_in_amt=data.get("Disc_in_amt")

    #@For Shipping amount
    if(data.get("ShippingAmt")==None):
        ShippingAmt=0
    else:
        ShippingAmt=data.get("ShippingAmt")

    #@For EMI Months
    if(data.get("EMI_Months")==None):
        EMI_Months=0
    else:
        EMI_Months=data.get("EMI_Months")

    #@For Downpayment in amount
    if(data.get("DP_in_Amount")==None):
        DP_in_Amount=0
    else:
        DP_in_Amount=data.get("DP_in_Amount")

    #@For Downpayment in Percent
    if(data.get("DP_in_Percent")==None):
        DP_in_Percent=0
    else:
        DP_in_Percent=data.get("DP_in_Percent")

    #@For Downpayment in percent
    if(data.get("EMI_PERCENT")==None):
        EMI_PERCENT=0
    else:
        EMI_PERCENT=data.get("EMI_PERCENT")
    #----------------------------------------------------------

    if(int(data.get("ClientID"))==0):
            cur.execute(CREATE_NEW_CLIENT,(data.get("FN"),data.get("LN"),data.get("contactNo"),data.get("Address"),data.get("city"),data.get("state"),data.get("Pincode"),data.get("PAN"),data.get("Email"),TODAY_DATE))
            cur.execute(GET_CLIENT_ID,(data.get("contactNo"),));
            CLIENT_DATA = cur.fetchall()
            for Each in CLIENT_DATA:
                ClientID=Each[0]
    else:
        ClientID=int(data.get("ClientID"))


    if(Record_Count==0 and ClientID>0):
        try:
            cur.execute(INSERT_INTO_QUOTATION,(data.get("QuotationNumber"),Quotation_Date,data.get("POS"),Valid_Till_Date,ClientID,"false",TODAY_DATE,"true"));
            cur.execute(INSERT_INTO_QUOTATION_BILL,(data.get("QuotationNumber"),str(data.get("Apply_Discount")).lower(),Disc_in_percentage,Disc_in_amt,str(data.get("Apply_Shipping")).lower(),ShippingAmt,str(data.get("Apply_EMI")).lower(),EMI_Months,EMI_PERCENT,DP_in_Amount,DP_in_Percent,data.get("SubTotal"),data.get("TotalAmount")))
            if(data.get("Apply_EMI")):
                for Monthly_EMI_Amount in data.get("breakout"):
                    EMI_MONTH=EMI_MONTH+1
                    cur.execute(CREATE_EMI_MONTHLY_WISE,(data.get("QuotationNumber"),EMI_MONTH,Monthly_EMI_Amount));
            cur.execute(INCREMENT_CONFIGURATION) #This will increment quotation number
            status="Success"
            con.commit()

            #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEND EMAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            if(status=="Success"):
                try:
                    Result=Send_Mail(1,data.get("QuotationNumber"),"Short",True,"Quotation")
                except Exception as e:
                    pass         
            #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        except Exception as e:
            print(e)
            status="Failed"
            con.rollback()
    else:
        status="Failed"

    return status;
#-------------------------END HERE-----------------------------


#==============================================================================
#--------------------------- CREATE NEW : QUOTATION ----------------------------
@CofigurationAddNewQuotationBlueprint.route("/CreateNewForQuotation.do/<ID>")
def CreateNewForQuotation(ID):
    configs = Properties()
    with open('example.properties', 'rb') as read_prop:
        configs.load(read_prop)
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute(DELETE_ALL_QUOTATION_DATA,(str(ID),))
        con.commit()
    except Exception as e:
        con.rollback()

    return render_template(configs.get("ADD_NEW_QUOTATION_TEMPLATE"))
#---------------------------- END CREATE NEW END ----------------------------
#============================================================================
