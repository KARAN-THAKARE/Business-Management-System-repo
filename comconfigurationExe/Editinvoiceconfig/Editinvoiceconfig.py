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


CofigurationEditInvoiceBlueprint = Blueprint('CofigurationEditInvoiceBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.Editinvoiceconfig.EditinvoiceMapper import *


#-------------------------Edit Invoice----------------------------
@CofigurationEditInvoiceBlueprint.route("/EditInvoice.do/<InvoiceID>")
def EditInvoice(InvoiceID):
    return render_template(configs.get("EDIT_INVOICE_TEMPLATE").data,InvoiceID=InvoiceID);
#-------------------------END HERE-----------------------------


#------------------------- Fetch Invoice Item ----------------------------
@CofigurationEditInvoiceBlueprint.route("/FetchInvoiceData.do/<InvoiceID>",methods=['POST','GET'])
def FetchInvoiceData(InvoiceID):

    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    print(InvoiceID)
    try:
        cur.execute(FETCH_INVOICE_INFO,(str(InvoiceID),))
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Invoice_NO']=each[0]
            Insider_Dict['Invoice_Type']=each[1]
            Insider_Dict['Invoice_Date']=each[2]
            Insider_Dict['POS']=each[3]
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
            Insider_Dict['Amount_Paid']=each[14]
            Insider_Dict['Balance_Amount']=each[15]
            Insider_Dict['Status']=each[16]
            Insider_Dict['ClientName']=each[17]
            Insider_Dict['address']=each[18]
            Insider_Dict['city']=each[19]
            Insider_Dict['state']=each[20]
            Insider_Dict['pincode']=each[21]
            Insider_Dict['contact_no']=each[22]
            Insider_Dict['email']=each[23]
            Insider_Dict['PAN_NO']=each[24]
            Insider_Dict['GSTIN']=each[25]
            Insider_Dict['DP_in_Amount']=each[26]
            Insider_Dict['DP_in_Percent']=each[27]
            Insider_Dict['Sold_By']=each[28]
            Insider_Dict['Invoice_Created_Date']=each[29]
            Insider_Dict['Todays_Date']=dt.today().strftime('%Y-%m-%d')
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1
        status="Success"
    except Exception as e:
        status="Failed"

    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#============================================================================
#--------------------------- UPDATE INVOICE ---------------------------------
@CofigurationEditInvoiceBlueprint.route("/UpdateInvoice.do",methods=['POST'])
def UpdateInvoice():
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


    try:
        if(data.get("Update_Type")=='half'):
            #Update 'invoice' table
            cur.execute(UPDATE_INVOICE,(data.get("it"),Invoice_Date,data.get("POS"),data.get("SoldBy"),TODAY_DATE,data.get("InvoiceNumber")))
        else:
            #delete invoices (Payment slip) from Invoice_Invoices
            cur.execute(DELETE_INVOICES_PAYMENT_SLIP,(data.get("InvoiceNumber"),))

            #delete invoices EMI from Invoice_EMI
            cur.execute(DELETE_INVOICE_EMIS,(data.get("InvoiceNumber"),))

            #Update into 'invoice' table
            cur.execute(UPDATE_INVOICE,(data.get("it"),Invoice_Date,data.get("POS"),data.get("SoldBy"),TODAY_DATE,data.get("InvoiceNumber")))

            #Update into 'invoice_Bill' table
            cur.execute(UPDATE_INVOICE_BILL,(str(data.get("Apply_Discount")).lower(),Disc_in_percentage,Disc_in_amt,str(data.get("Apply_Shipping")).lower(),ShippingAmt,str(data.get("Apply_EMI")).lower(),EMI_Months,EMI_PERCENT,DP_in_Amount,DP_in_Percent,data.get("SubTotal"),data.get("TotalAmount"),data.get("Amount_Paid"),data.get("BalanceAmount"),Status,data.get("InvoiceNumber")))

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

            #As we update we are updating Invoice so there are chances that shop keeper can delete or modify item too
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   RESET TO PREVIOUS STATE  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            #***************************************************************************************************
            # Add back item quantity after delete
            INVOICE_ID=data.get("InvoiceNumber")
            cur.execute(FETCH_STOCKS_THAT_REMOVED_PREVIOUSLY_BY_GIVEN_ID,(INVOICE_ID,))
            FETCHED_STOCKS_THAT_REMOVED_PREVIOUSLY_BY_GIVEN_ID = cur.fetchall()
            for i in FETCHED_STOCKS_THAT_REMOVED_PREVIOUSLY_BY_GIVEN_ID:
                STOCK_ID=i[0]
                PREV_REMOVED_STOCK_QTY=i[1]

                # Fetch Previous Record
                cur.execute(GET_PREVIOUS_DEBIT_RECORD_OF_STOCK_FOR_UPDATE,(STOCK_ID,INVOICE_ID))
                GET_PREVIOUS_DEBIT_RECORD_OF_STOCK_FOR_UPDATE_DATA = cur.fetchall()
                if(len(GET_PREVIOUS_DEBIT_RECORD_OF_STOCK_FOR_UPDATE_DATA)!=0):
                    for each in GET_PREVIOUS_DEBIT_RECORD_OF_STOCK_FOR_UPDATE_DATA:
                        PREV_DEBIT_INVOICE=each[0]
                        PREV_DEBIT_QTY=each[1]
                        PREV_DEBIT_DATE=each[2]
                    cur.execute(ROLLBACK_AFTER_INVOICE_DELETE_FOR_STOCK_SETLEMENT_FIRST,(PREV_REMOVED_STOCK_QTY,PREV_DEBIT_INVOICE,PREV_DEBIT_QTY,PREV_DEBIT_DATE,STOCK_ID)); #here we set
                else:
                    PREV_DEBIT_INVOICE=None
                    PREV_DEBIT_QTY=PREV_REMOVED_STOCK_QTY
                    PREV_DEBIT_DATE=None
                    cur.execute(ROLLBACK_AFTER_INVOICE_DELETE_FOR_STOCK_SETLEMENT_SECOND,(PREV_REMOVED_STOCK_QTY,PREV_DEBIT_INVOICE,PREV_DEBIT_QTY,PREV_DEBIT_DATE,STOCK_ID)); #here we minus
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<< END END END END END END END END END END END END END >>>>>>>>>>>>>>>>>>>>>>>>
            #****************************************************************************************************

            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<<   For Debit stock Quantity in stock summary table >>>>>>>>>>>>>>>>>>>>>>>>
            #***************************************************************************************************
            for Key,Value in data.get("Sell_Items").items():
                #@ Update Stock Data after sell : debit the stock
                cur.execute(UPDATE_INTO_STOCK_DATA,(Value['Qty'],Value['Invoice_NO'],Value['Qty'],TODAY_DATE,TODAY_DATE,Value['Stock_ID']))
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<< END END END END END END END END END END END END END >>>>>>>>>>>>>>>>>>>>>>>>
            #****************************************************************************************************

        Result['message']='Invoice successfully Updated.'
        Result['isSuccess']="true"
        Result['ErrorMessg']=''
        con.commit()

    except Exception as e:
        print(e)
        Result['message']='Hey user, System is facing some issue while updating invoice.Please try again.If issue persist please contact service provider.'
        Result['isSuccess']="false"
        Result['ErrorMessg']=str(e)
        con.rollback()

    return Result;
#------------------------- END UPDATE INVOICE END ---------------------------
#============================================================================


#==================================================================================================================================
#-------------------------------------------------------------- Delete Invoice -------------------------------------
@CofigurationEditInvoiceBlueprint.route("/DELETE_INVOICE_BILL.do/<INVOICE_ID>",methods=['POST'])
def DELETE_INVOICE_BILL(INVOICE_ID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    try:
        cur.execute(DELETE_INVOICE,(INVOICE_ID,));
        cur.execute(DELETE_INVOICES_PAYMENT_SLIP,(INVOICE_ID,));

        # Add back item quantity after delete
        cur.execute(FETCH_STOCK_ID_NEED_TO_BE_RESET,(str(INVOICE_ID),)) #first collect all invoice bucket entry
        FETCH_STOCK_ID_NEED_TO_BE_RESET_DATA = cur.fetchall()           #There may be multiple entry as customer ca buy many items
        for i in FETCH_STOCK_ID_NEED_TO_BE_RESET_DATA:
            ENTRY_ID=i[0]
            STOCK_ID=i[1]
            STOCK_QTY=i[2]

            #First Delete entry of table
            cur.execute(DELETE_INVOICE_BUCKET_ITEM_ENTRY,(ENTRY_ID,));
            con.commit()

            # Fetch Previous Record
            cur.execute(GET_PREVIOUS_CREDIT_RECORD_OF_STOCK,(STOCK_ID,))
            GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_DATA = cur.fetchall()
            if(len(GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_DATA)!=0):
                for each in GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_DATA:
                    PREV_DEBIT_INVOICE=each[0]
                    PREV_DEBIT_QTY=each[1]
                    PREV_DEBIT_DATE=each[2]
                cur.execute(ROLLBACK_AFTER_INVOICE_DELETE_FOR_STOCK_SETLEMENT_FIRST,(STOCK_QTY,PREV_DEBIT_INVOICE,PREV_DEBIT_QTY,PREV_DEBIT_DATE,STOCK_ID)); #here we set
            else:
                PREV_DEBIT_INVOICE=None
                PREV_DEBIT_QTY=STOCK_QTY
                PREV_DEBIT_DATE=None
                cur.execute(ROLLBACK_AFTER_INVOICE_DELETE_FOR_STOCK_SETLEMENT_SECOND,(STOCK_QTY,PREV_DEBIT_INVOICE,PREV_DEBIT_QTY,PREV_DEBIT_DATE,STOCK_ID)); #here we minus
            con.commit()
        isSuccess="true"
        con.commit()
    except Exception as e:
        print(e)
        isSuccess="false"
        con.rollback()

    return isSuccess;
#------------------------------------------------------- ~ END  Delete Invoice END ~ --------------------------------------------
#==================================================================================================================================

#==================================================================================================================================
#-------------------------------------------------------------- RETURN Invoice -------------------------------------
@CofigurationEditInvoiceBlueprint.route("/RETURN_INVOICE.do/<INVOICE_ID>/<REMARK>",methods=['POST'])
def RETURN_INVOICE(INVOICE_ID,REMARK):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute("UPDATE Invoice SET isReturn='true' WHERE Invoice_NO = ? ",(str(INVOICE_ID),));
        cur.execute("INSERT INTO Remark (ID,Remarks) values (?,?)",(INVOICE_ID,REMARK));
        isSuccess="true"
        con.commit()
    except Exception as e:
        print(e)
        isSuccess="false"
        con.rollback()

    return isSuccess;
#------------------------------------------------------- ~ END  Delete Invoice END ~ --------------------------------------------
#==================================================================================================================================
