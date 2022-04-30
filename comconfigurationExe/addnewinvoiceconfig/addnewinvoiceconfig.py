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

CofigurationAddNewInvoiceBlueprint = Blueprint('CofigurationAddNewInvoiceBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.addnewinvoiceconfig.addnewinvoiceMapper import *
from comconfigurationExe.SMTPServer.SMTP  import *

from jproperties import Properties
configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)
#============================================================================
#----------------------------- ADD NEW INVOICE ------------------------------
@CofigurationAddNewInvoiceBlueprint.route("/AddNewInvoice.do")
def AddNewInvoice():
    return render_template(configs.get("ADD_NEW_INVOICE_TEMPLATE").data);
#--------------------------- END ADD NEW INVOICE END  ----------------------
#============================================================================

#============================================================================
#------------------------- FETCH INVOICE NUMBER -----------------------------
@CofigurationAddNewInvoiceBlueprint.route("/FetchInvoiceNumber.do")
def FetchInvoiceNumber():
    a=str(FiscalYear.current())
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_INVOICE_NO)
    FetchInvoiceDetails = cur.fetchall()
    for each in FetchInvoiceDetails:
        Insider_Dict['InvoiceNumber']="IN"+a[2::]+str(each[3])
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#--------------------- END FETCH INVOICE NUMBER END -------------------------
#============================================================================

#============================================================================
#------------------------- FETCH STAFF DETAILS -----------------------------
@CofigurationAddNewInvoiceBlueprint.route("/FetchStaffDetails.do")
def FetchStaffDetails():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_STAFF_DATA)
    FetchStaffDetails = cur.fetchall()
    for each in FetchStaffDetails:
        Insider_Dict['Staff_ID']=each[0]
        Insider_Dict['Staff_Name']=each[1]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#--------------------- END FETCH STAFF DETAILS END -------------------------
#============================================================================

#============================================================================
#------------------------- FETCH CLIENT DETAILS -----------------------------
@CofigurationAddNewInvoiceBlueprint.route("/FetchClientDetails.do")
def FetchClientDetails():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_CLIENT_DATA)
    FetchClientDetails = cur.fetchall()
    for each in FetchClientDetails:
        Insider_Dict['Client_ID']=each[0]
        Insider_Dict['Client_Name']=each[1]+" "+each[2]
        Insider_Dict['Client_Address']=each[4]
        Insider_Dict['Client_City']=each[5]
        Insider_Dict['Client_State']=each[6]
        Insider_Dict['Client_pincode']=each[7]
        Insider_Dict['Client_contact_no']=each[8]
        Insider_Dict['Client_Email']=each[9]
        Insider_Dict['Client_PAN_no']=each[10]
        Insider_Dict['Client_GSTIN_no']=each[11]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;

#--------------------- END FETCH CLIENT DETAILS END -------------------------
#============================================================================

#============================================================================
#------------------ FETCH BUCKET ITEM'S FOR GIVEN INVOICE  -------------------
@CofigurationAddNewInvoiceBlueprint.route("/Fetch_Bucket_Item_for_Invoice.do",methods=['POST'])
def Fetch_Bucket_Item_for_Invoice():
    Sub_Total=0
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    try:
        cur.execute(FETCH_BUCKET_ITEM_FOR_GIVEN_INVOICE,(data.get("InvoiceNumber"),))
        Bucket_Item = cur.fetchall()
        for each in Bucket_Item:
            Insider_Dict['SrNo']=each[0]
            Insider_Dict['ID']=each[1]
            Insider_Dict['Invoice_NO']=each[2]
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
#---------------- END FETCH BUCKET ITEM'S FOR GIVEN INVOICE END -------------
#============================================================================

#============================================================================
#------------------ ADD ITEM'S TO BUCKET FOR GIVEN INVOICE  -------------------
@CofigurationAddNewInvoiceBlueprint.route("/Add_Stock_To_Bucket_For_Invoice.do",methods=['POST'])
def Add_Stock_To_Bucket_For_Invoice():
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
        cur.execute(ADD_STOCK_TO_BUCKET,(data.get("InvoiceNumber"),data.get("Stock_ID"),data.get("Stock_Name"),data.get("qty"),data.get("sp"),disc,cgst,sgst,igst,cess,data.get("amt")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#--------------------- END ADD ITEM'S TO BUCKET FOR GIVEN INVOICE  END -------------------------
#===============================================================================================

#============================================================================
#----------------------- DELETE ITEM FROM BUCKET ----------------------------
@CofigurationAddNewInvoiceBlueprint.route("/Delete_Item_From_Bucket_For_Invoice.do",methods=['POST'])
def Delete_Item_From_Bucket_For_Invoice():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    try:
        cur.execute(DELETE_ITEM_FROM_BUCKET_FOR_INVOICE,(data.get("ID"),))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#--------------------- END DELETE ITEM FROM BUCKET END -------------------------
#===============================================================================

#============================================================================
#--------------------------- SUBMIT INVOICE ---------------------------------
@CofigurationAddNewInvoiceBlueprint.route("/SubmitInvoice.do",methods=['POST'])
def SubmitInvoice():
    Invoice_Date=''
    EMI_MONTH=0
    Result={}

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    try:
        x = data.get("InvoiceDate").split('T')[0]
        Invoice_Date=dt.strptime(x, '%Y-%m-%d').date()
    except Exception as e:
        Invoice_Date=data.get("InvoiceDate")

    TODAY_DATE=dt.today().strftime('%Y-%m-%d')

    cur.execute("SELECT COUNT(*) FROM Invoice WHERE Invoice_NO = ?",(data.get("InvoiceNumber"),))
    x = cur.fetchall()
    for each in x:
        Record_Count=each[0]

    if(int(data.get("BalanceAmount"))==0):
        Status="Complete"
    elif(data.get("Apply_EMI")):
        Status="EMI Pending"
    else:
        Status="Pending"


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
            #Insert into 'invoice' table
            cur.execute(INSERT_INTO_INVOICE,(data.get("InvoiceNumber"),data.get("it"),Invoice_Date,data.get("POS"),data.get("SoldBy"),ClientID,'false','false',TODAY_DATE,'true'));

            #Insert into 'invoice_Bill' table
            cur.execute(INSERT_INTO_INVOICE_BILL,(data.get("InvoiceNumber"),str(data.get("Apply_Discount")).lower(),Disc_in_percentage,Disc_in_amt,str(data.get("Apply_Shipping")).lower(),ShippingAmt,str(data.get("Apply_EMI")).lower(),EMI_Months,EMI_PERCENT,DP_in_Amount,DP_in_Percent,data.get("SubTotal"),data.get("TotalAmount"),data.get("Amount_Paid"),data.get("BalanceAmount"),Status))

            #If EMI is enable
            #@ Create EMI for given invoice
            if(data.get("Apply_EMI") and int(data.get("Amount_Paid"))>0):
                cur.execute(INSERT_INTO_INVOICE_INVOICES,(data.get("InvoiceNumber"),data.get("payment_mode"),data.get("TxnNo"),data.get("Amount_Paid"),TODAY_DATE,"EMI Down Payment",TODAY_DATE));
                for Monthly_EMI_Amount in data.get("breakout"):
                    EMI_MONTH=EMI_MONTH+1
                    cur.execute(CREATE_EMI_MONTHLY_WISE,(data.get("InvoiceNumber"),EMI_MONTH,Monthly_EMI_Amount,"Pending"));
            #@ Create invoice payment record
            elif(int(data.get("Amount_Paid"))>0):
                cur.execute(INSERT_INTO_INVOICE_INVOICES,(data.get("InvoiceNumber"),data.get("payment_mode"),data.get("TxnNo"),data.get("Amount_Paid"),TODAY_DATE,"Invoice First Payment",TODAY_DATE));

            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<<   For Debit stock Quantity in stock summary table >>>>>>>>>>>>>>>>>>>>>>>>
            #***************************************************************************************************
            for Key,Value in data.get("Sell_Items").items():
                #@ Update Stock Data after sell : debit the stock
                cur.execute(UPDATE_INTO_STOCK_DATA,(Value['Qty'],Value['Invoice_NO'],Value['Qty'],TODAY_DATE,TODAY_DATE,Value['Stock_ID']))
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<< END END END END END END END END END END END END END >>>>>>>>>>>>>>>>>>>>>>>>
            #****************************************************************************************************

            #@ Auto increment
            cur.execute(INCREMENT_CONFIGURATION)

            status="Success"
            con.commit()

            #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEND EMAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            if(status=="Success"):
                Result=Send_Mail(1,data.get("InvoiceNumber"),"Short",True,"Invoice")
                print(Result)
            #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            Result['message']='Invoice successfully created.'
            Result['isSuccess']="true"
            Result['ErrorMessg']=''

        except Exception as e:
            Result['message']='Hey user, System is facing some issue while creating invoice.Please try again in fresh mode.If issue persist please contact service provider.'
            Result['isSuccess']="false"
            Result['ErrorMessg']=str(e)
            con.rollback()
    else:
        Result['message']='Hey user, System is trying to generate invoice have existing invoice number. Please referesh and try again.'
        Result['isSuccess']="Failed"
        Result['ErrorMessg']=''
    return Result;
#------------------------- END SUBMIT INVOICE END ---------------------------
#============================================================================


#==================================================================================
#--------------------------- SAVE AS DRAFT : INVOICE -----------------------------
@CofigurationAddNewInvoiceBlueprint.route("/SaveAsDraft_Invoice.do",methods=['POST'])
def SaveAsDraft_Invoice():
    Bill_Date=''
    Due_Date=''
    Purchase_Order_Date=''

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())


    try:
        x = data.get("InvoiceDate").split('T')[0]
        Invoice_Date=dt.strptime(x, '%Y-%m-%d').date()
    except Exception as e:
        Invoice_Date=data.get("InvoiceDate")


    TODAY_DATE=dt.today().strftime('%Y-%m-%d')

    cur.execute("SELECT COUNT(*) FROM Purchase WHERE P_Bill_NO = ?",(data.get("InvoiceNumber"),))
    x = cur.fetchall()
    for each in x:
        Record_Count=each[0]

    if(Record_Count==0):
        try:
            cur.execute(INSERT_INTO_CLIENT_DATA_DRAFT,(data.get("InvoiceNumber"),data.get("FN"),data.get("LN"),data.get("Address"),data.get("city"),data.get("state"),data.get("Pincode"),data.get("contactNo"),data.get("email"),data.get("PAN_NO"),data.get("GSTIN"),TODAY_DATE));#Temporary save data in client draft table
            cur.execute(INSERT_INTO_INVOICE,(data.get("InvoiceNumber"),data.get("it"),Invoice_Date,data.get("POS"),data.get("SoldBy"),0,0,TODAY_DATE));# 0 : this is for clientID
            cur.execute(INSERT_INTO_INVOICE_BILL,(data.get("InvoiceNumber"),data.get("Apply_Discount"),data.get("Disc_in_percentage"),data.get("Disc_in_amt"),data.get("Apply_Shipping"),data.get("ShippingAmt"),data.get("Apply_EMI"),data.get("EMI_Months"),data.get("EMI_PERCENT"),data.get("DP_in_Amount"),data.get("DP_in_Percent"),data.get("SubTotal"),data.get("TotalAmount"),data.get("Amount_Paid"),data.get("BalanceAmount"),"Save as Draft"))
            cur.execute(INCREMENT_CONFIGURATION) #This will increment purchase bill number

            if(data.get("Apply_EMI")):
                for Monthly_EMI_Amount in data.get("breakout"):
                    EMI_MONTH=EMI_MONTH+1
                    cur.execute(CREATE_EMI_MONTHLY_WISE,(data.get("InvoiceNumber"),EMI_MONTH,Monthly_EMI_Amount,"Pending"));

            status="Success"
            con.commit()
        except Exception as e:
            status="Failed"
            con.rollback()
    else:
        status="Failed"

    return status;

#--------------------- END  SAVE AS DRAFT : INVOICE  END --------------------
#============================================================================

#=============================================================================
#--------------------------- CREATE NEW : INVOICE ----------------------------
@CofigurationAddNewInvoiceBlueprint.route("/CreateNewForInvoice.do/<ID>")
def CreateNewForInvoice(ID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute(DELETE_ALL_DATA,(str(ID),))
        con.commit()
    except Exception as e:
        con.rollback()

    return render_template(configs.get("ADD_NEW_INVOICE_TEMPLATE"))
#---------------------------- END CREATE NEW END ----------------------------
#============================================================================
