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


CofigurationEditQuotationBlueprint = Blueprint('CofigurationEditQuotationBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.Editquotationconfig.EditquotationMapper import *


#-------------------------Edit Quotation----------------------------
@CofigurationEditQuotationBlueprint.route("/EditQuotation.do/<QuotationID>")
def EditQuotation(QuotationID):
    return render_template(configs.get("EDIT_QUOTATION_TEMPLATE").data,QuotationID=QuotationID);
#-------------------------END HERE-----------------------------

#------------------------- Fetch Bucket Item----------------------------
@CofigurationEditQuotationBlueprint.route("/FetchQuotationData.do/<QuotationID>",methods=['POST','GET'])
def FetchQuotationData(QuotationID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_QUOTATION_INFO,(str(QuotationID),))
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['Quotation_NO']=each[0]
        Insider_Dict['Quotation_Date']=each[1]
        Insider_Dict['POS']=each[2]
        Insider_Dict['ValidTill']=each[3]
        Insider_Dict['Apply_Discount']=each[4]
        Insider_Dict['Dis_in_percent']=each[5]
        Insider_Dict['Dis_in_amount']=each[6]
        Insider_Dict['Apply_Shipping']=each[7]
        Insider_Dict['Shipping_Amount']=each[8]
        Insider_Dict['Apply_EMI']=each[9]
        Insider_Dict['EMI_Months']=each[10]
        Insider_Dict['EMI_Percent']=each[11]
        Insider_Dict['Sub_Total_Amount']=each[12]
        Insider_Dict['Total_Amount']=each[13]
        Insider_Dict['DP_in_Amount']=each[14]
        Insider_Dict['DP_in_Percent']=each[15]
        Insider_Dict['ClientName']=each[16]
        Insider_Dict['address']=each[17]
        Insider_Dict['city']=each[18]
        Insider_Dict['state']=each[19]
        Insider_Dict['pincode']=each[20]
        Insider_Dict['contact_no']=each[21]
        Insider_Dict['email']=each[22]
        Insider_Dict['PAN_NO']=each[23]
        Insider_Dict['GSTIN']=each[24]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#------------------------- Update Quotation ----------------------------

@CofigurationEditQuotationBlueprint.route("/UpdateQuotation.do",methods=['POST'])
def UpdateQuotation():
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

    try:
        cur.execute(DELETE_QUOTATION_EMI,(data.get("QuotationNumber"),));
        cur.execute(UPDATE_QUOTATION,(Quotation_Date,data.get("POS"),Valid_Till_Date,TODAY_DATE,data.get("QuotationNumber")));
        cur.execute(UPDATE_QUOTATION_BILL,(str(data.get("Apply_Discount")).lower(),Disc_in_percentage,Disc_in_amt,str(data.get("Apply_Shipping")).lower(),ShippingAmt,str(data.get("Apply_EMI")).lower(),EMI_Months,EMI_PERCENT,DP_in_Amount,DP_in_Percent,data.get("SubTotal"),data.get("TotalAmount"),data.get("QuotationNumber")))
        if(data.get("Apply_EMI")):
            for Monthly_EMI_Amount in data.get("breakout"):
                EMI_MONTH=EMI_MONTH+1
                cur.execute(CREATE_EMI_MONTHLY_WISE,(data.get("QuotationNumber"),EMI_MONTH,Monthly_EMI_Amount));
        status="Success"
        con.commit()

    except Exception as e:
        print(e)
        status="Failed"
        con.rollback()

    return status;
#-------------------------END HERE-----------------------------


#==================================================================================================================================
#-------------------------------------------------------------- FETCH EMI INFORMATION FOR Quotation -------------------------------------
@CofigurationEditQuotationBlueprint.route("/DELETE_QUOTATION_BILL.do/<QUOTATION_ID>",methods=['POST'])
def DELETE_QUOTATION_BILL(QUOTATION_ID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    try:
        cur.execute(DELETE_QUOTATION,(QUOTATION_ID,));
        isSuccess="true"
        con.commit()
    except Exception as e:
        isSuccess="false"
        con.rollback()


    return isSuccess;
#------------------------------------------------------- ~ END  FETCH EMI INFORMATION FOR Quotation END ~ --------------------------------------------
#==================================================================================================================================
