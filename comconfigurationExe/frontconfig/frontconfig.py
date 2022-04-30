from flask import Flask,Blueprint,request,render_template
import json, os, signal
import sqlite3

from jproperties import Properties

import pyautogui

#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time

configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)

Serverconfigs = Properties()
with open('Server.properties', 'rb') as read_prop:
    Serverconfigs.load(read_prop)

CofigurationhomeBlueprint = Blueprint('CofigurationhomeBlueprint', __name__,template_folder='templates',static_folder='static')



from comconfigurationExe.frontconfig.frontMapper import *

from comconfigurationExe.configuration.configuration import *

#-------------------------Home Page----------------------------
@CofigurationhomeBlueprint.route("/")
def FirstLook():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    TOTAL_SALE_PER_MONTH=[]
    TOTAL_SALE_AMOUNT_PER_MONTH=[]
    MONTH_LIST=["01","02","03","04","05","06","07","08","09","10","11","12"]
    CURRENT_YEAR=dt.today().year

    #================= For Avg Order Count for index Page ===============
    cur.execute(FETCH_TOTAL_SALE_PER_MONTH,(str(CURRENT_YEAR),))
    DATA1 = cur.fetchall()
    for i in MONTH_LIST: #for no. of  sale per month
         FLAG1=False
         for j in DATA1:
             if(i==j[0]):
                 TOTAL_SALE_PER_MONTH.append(j[1])
                 FLAG1=True
                 break
         if(str(FLAG1)!='True'):
             TOTAL_SALE_PER_MONTH.append(0)
    #===================================================================

    #================= For Avg Sale Count for index Page ===============
    cur.execute(TOTAL_AVG_COST_OF_SALE_PER_MONTH,(str(CURRENT_YEAR),))
    DATA2 = cur.fetchall()
    for i in MONTH_LIST:#for total cost of sale per month
         FLAG2=False
         for j in DATA2:
             if(i==j[0]):
                 TOTAL_SALE_AMOUNT_PER_MONTH.append(j[1])
                 FLAG2=True
                 break
         if(str(FLAG2)!='True'):
             TOTAL_SALE_AMOUNT_PER_MONTH.append(0)
    #===================================================================
    return render_template(configs.get("FIRST_TEMPLATE").data,TOTAL_SALE_PER_MONTH=TOTAL_SALE_PER_MONTH,TOTAL_SALE_AMOUNT_PER_MONTH=TOTAL_SALE_AMOUNT_PER_MONTH)
 
 #-------------------------END HERE-----------------------------


#------------------------- Quit Button----------------------------
@CofigurationhomeBlueprint.route('/shutdown.do', methods=['GET'])
def shutdown():
	pyautogui.hotkey('alt', 'f4')
	os.kill(os.getpid(), signal.SIGINT)
	return jsonify({ "success": True, "message": "Server is shutting down..." })
#-------------------------END HERE-----------------------------


#------------------------- FETCH NOTIFICATION ----------------------------
@CofigurationhomeBlueprint.route("/Fetch_All_Notification.do",methods=["GET"])
def Fetch_All_Notification():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_NOTIFICATION)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['NOTIFICATION_ID']=each[0]
        Insider_Dict['NOTIFICATION_MESG']=each[1]
        Insider_Dict['NOTIFICATION_TYPE']=each[2]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------




#------------------------- FETCH OWNER NAME ----------------------------
@CofigurationhomeBlueprint.route("/FetchOwnerName.do",methods=["GET"])
def FetchOwnerName():
    result=""
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_OWNER_NAME)
    DATA = cur.fetchall()
    for each in DATA:
        result=each[0]

    return result;
#-------------------------END HERE-----------------------------



#------------------------- FETCH DAILY SUMMARY ----------------------------
@CofigurationhomeBlueprint.route("/FetchDailySummary.do/<option>",methods=["POST","GET"])
def FetchDailySummary(option):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    #@For Customer Invoices (Sell)
    if(option=='Customer Invoices'):
        cur.execute(FETCH_TODAY_Customer_Invoices)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Invoice_NO']=each[0]
            Insider_Dict['Invoice_Type']=each[1]
            Insider_Dict['Customer_Name']=each[2]
            Insider_Dict['Total_Amount']=each[3]
            Insider_Dict['Amount_Paid']=each[4]
            Insider_Dict['Balance_Amount']=each[5]
            Insider_Dict['Status']=each[6]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1

    #@For Purchase Invoices (Purchase~supplier)
    if(option=='Supplier Invoices'):
        cur.execute(FETCH_TODAY_Purchase_Invoices)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Purchase_NO']=each[0]
            Insider_Dict['Purchase_Type']=each[1]
            Insider_Dict['Supplier_Name']=each[2]
            Insider_Dict['Total_Amount']=each[3]
            Insider_Dict['Amount_Paid']=each[4]
            Insider_Dict['Balance_Amount']=each[5]
            Insider_Dict['Status']=each[6]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1

    #@For Payment Transaction (Both : sell and purchase)
    if(option=='Payment Transaction'):
        cur.execute(FETCH_TODAY_Payment_Transaction)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Payment_ID']=each[0]
            Insider_Dict['InvoiceNo']=each[1]
            Insider_Dict['Name']=each[2]
            Insider_Dict['Amount_Paid']=each[3]
            Insider_Dict['Payment_Mode']=each[4]
            Insider_Dict['Txn_NO']=each[5]
            Insider_Dict['Remarks']=each[6]
            Insider_Dict['PaymentFor']=each[7]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1


    #@For Stock Transaction (Both : sell and purchase)
    if(option=='Stock Transaction'):
        cur.execute(FETCH_TODAY_Stock_Transaction)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Stock_ID']=each[0]
            Insider_Dict['Stock_Name']=each[1]
            Insider_Dict['Quantity']=each[2]
            Insider_Dict['Name']=each[3]
            Insider_Dict['Invoice']=each[4]
            Insider_Dict['Transaction_For']=each[5]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1

    #@For client joine
    if(option=='Client Joine'):
        cur.execute(FETCH_TODAY_Client_Joine)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Client_ID']=each[0]
            Insider_Dict['Client_Name']=each[1]
            Insider_Dict['PhoneNo']=each[2]
            Insider_Dict['Address']=each[3]
            Insider_Dict['PanNumber']=each[4]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1

    #@For Supplier joine
    if(option=='Supplier Joine'):
        cur.execute(FETCH_TODAY_Supplier_Joine)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Supplier_ID']=each[0]
            Insider_Dict['Supplier_Name']=each[1]
            Insider_Dict['PhoneNo']=each[2]
            Insider_Dict['Address']=each[3]
            Insider_Dict['PanNumber']=each[4]
            Insider_Dict['GSTIN']=each[5]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1

    return Outsider_Dict;
#-------------------------END HERE-----------------------------















#------------------------- FETCH STOCK SUMMARY ----------------------------
@CofigurationhomeBlueprint.route("/FetchStockSummary.do")
def FetchStockSummary():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_STOCK_SUMMARY)
    DATA = cur.fetchall()
    WARNING_STOCK_COUNT=int(Serverconfigs.get("WARNING_STOCK_COUNT").data)
    for each in DATA:
        Insider_Dict['STOCK_ID']=each[0]
        Insider_Dict['STOCK_NAME']=each[1]
        Insider_Dict['STOCK_QUANTITY']=each[2]
        Insider_Dict['PREV_CREDIT_QUANTITY']=each[3]
        Insider_Dict['PREV_CREDIT_DATE']=each[4]
        Insider_Dict['PREV_DEBIT_QUANTITY']=each[5]
        Insider_Dict['PREV_DEBIT_DATE']=each[6]
        Insider_Dict['WARNING_STOCK_COUNT']=WARNING_STOCK_COUNT
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------



#------------------------- FETCH QUICK INFORMATION ----------------------------
@CofigurationhomeBlueprint.route("/FetchQuickInformation.do")
def FetchQuickInformation():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_QUICK_INFORMATION)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['TOTAL_ORDER']=each[0]
        Insider_Dict['GROSS_SALE']=each[1]
        Insider_Dict['AMOUNT_RECEIVED']=each[2]
        Insider_Dict['AMOUNT_DUE']=each[3]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#------------------------- NEW INVOICE COUNT ----------------------------
@CofigurationhomeBlueprint.route("/NewInvoiceCount.do")
def NewInvoiceCount():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_NEW_INVOICE_COUNT)
    DATA = cur.fetchall()
    for each in DATA:
        NEW_INVOICE_COUNT=str(each[0])
    return NEW_INVOICE_COUNT;
#-------------------------END HERE-----------------------------

#------------------------- NEW PURCHASE COUNT ----------------------------
@CofigurationhomeBlueprint.route("/NewPurchaseCount.do")
def NewPurchaseCount():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_NEW_PURCHASE_COUNT)
    DATA = cur.fetchall()
    for each in DATA:
        NEW_PURCHASE_COUNT=str(each[0])
    return NEW_PURCHASE_COUNT;
#-------------------------END HERE-----------------------------


#------------------------- NEW CLIENT JOIN ----------------------------
@CofigurationhomeBlueprint.route("/NewClientJoin.do")
def NewClientJoin():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_NEW_CLIENT_JOIN)
    DATA = cur.fetchall()
    for each in DATA:
        NEW_CLIENT_JOINE=str(each[0])
    return NEW_CLIENT_JOINE;
#-------------------------END HERE-----------------------------


#------------------------- NEW QUOTATION COUNT ----------------------------
@CofigurationhomeBlueprint.route("/NewQuotationCount.do")
def NewQuotationCount():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_NEW_QUOTATION_COUNT)
    DATA = cur.fetchall()
    for each in DATA:
        NEW_QUOTATION_COUNT=str(each[0])
    return NEW_QUOTATION_COUNT;
#-------------------------END HERE-----------------------------


#------------------------- FETCH LOW STOCK SND OUT OF STOCK ITEM COUNT ----------------------------
@CofigurationhomeBlueprint.route("/FetchLowStockOutofSTock.do")
def FetchLowStockOutofSTock():
    Result={}
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    WARNING_STOCK_COUNT=int(Serverconfigs.get("WARNING_STOCK_COUNT").data)
    cur.execute(FETCH_LOW_STOCK_OUT_OF_COUNT,(WARNING_STOCK_COUNT,))
    DATA = cur.fetchall()
    for each in DATA:
        OUT_OF_STOCK =str(each[0])
        LOW_STOCK_ITEM=str(each[1])

    Result["OUT_OF_STOCK"]=OUT_OF_STOCK
    Result["LOW_STOCK_ITEM"]=LOW_STOCK_ITEM

    return Result;
#------------------------------------END HERE----------------------------------------------------


#------------------------- TOTAL UNPAID INVOICES COUNT ----------------------------
@CofigurationhomeBlueprint.route("/TotalUnpaidInvoicesCount.do")
def TotalUnpaidInvoicesCount():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_UNPAID_INVOICES_COUNT)
    DATA = cur.fetchall()
    for each in DATA:
        UNPAID_INVOICES_COUNT=str(each[0])
    return UNPAID_INVOICES_COUNT;
#-------------------------END HERE-----------------------------


#------------------------- TOTAL UNPAID PURCHASE COUNT ----------------------------
@CofigurationhomeBlueprint.route("/TotalUnpaidPurchaseCount.do")
def TotalUnpaidPurchaseCount():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_UNPAID_PURCHASE_COUNT)
    DATA = cur.fetchall()
    for each in DATA:
        UNPAID_PURCHASE_COUNT=str(each[0])
    return UNPAID_PURCHASE_COUNT;
#-------------------------END HERE-----------------------------

#------------------------- FETCH UNPAID CLIENT LIST NORMAL ----------------------------
@CofigurationhomeBlueprint.route("/Fetch_Unpaid_Client_List.do")
def Fetch_Unpaid_Client_List():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_UNPAID_INVOICE_LIST_NORMAL)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['INVOICE_ID']=each[0]
        Insider_Dict['CLIENT_ID']=each[1]
        Insider_Dict['CLIENT_NAME']=each[2]
        Insider_Dict['TOTAL_AMOUNT']=each[3]
        Insider_Dict['AMOUNT_PAID']=each[4]
        Insider_Dict['BALANCE_AMOUNT']=each[5]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------

#------------------------- FETCH UNPAID CLIENT LIST EMI ----------------------------
@CofigurationhomeBlueprint.route("/Fetch_Unpaid_Client_List_EMI.do")
def Fetch_Unpaid_Client_List_EMI():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_UNPAID_INVOICE_LIST_EMI)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['INVOICE_ID']=each[0]
        Insider_Dict['CLIENT_NAME']=each[1]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;


@CofigurationhomeBlueprint.route("/FETCH_SELECTED_UNPAID_EMI_INFO.do/<Invoice_NO>",methods=["POST"])
def FETCH_SELECTED_UNPAID_EMI_INFO(Invoice_NO):
    Insider_Dict = {}
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_SELECTED_UNPAID_EMI_INFORMATION,(str(Invoice_NO),str(Invoice_NO)))
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['EMI_ID']=each[0]
        Insider_Dict['INVOICE_ID']=each[1]
        Insider_Dict['EMI_MONTH']=each[2]
        Insider_Dict['EMI_AMOUNT']=each[3]
        Insider_Dict['CLIENT_NAME']=each[4]
        Insider_Dict['PREVIOUS_PAYMENT_DATE']=str(each[5])

    return Insider_Dict;
#-------------------------END HERE-----------------------------

#------------------------- FETCH UNPAID SUPPLIER LIST ----------------------------
@CofigurationhomeBlueprint.route("/Fetch_Unpaid_Supplier_List.do")
def Fetch_Unpaid_Supplier_List():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_UNPAID_PURCHASE_LIST)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['PURCHASE_ID']=each[0]
        Insider_Dict['SUPPLIER_ID']=each[1]
        Insider_Dict['SUPPLIER_NAME']=each[2]
        Insider_Dict['TOTAL_AMOUNT']=each[3]
        Insider_Dict['AMOUNT_PAID']=each[4]
        Insider_Dict['BALANCE_AMOUNT']=each[5]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#=============================================================================================
#----------------------------------  Business Book ---------------------------------------------
#@Fetch records for Business Book
@CofigurationhomeBlueprint.route("/SearchBusinessBookData.do",methods=["POST"])
def SearchBusinessBook():
        Insider_Dict = {}
        Outsider_Dict={}
        i=0
        con = sqlite3.connect("IMSConfig.db")
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        data = json.loads(request.data.decode())

        if(data.get("StartDate")!=None):
            x = data.get("StartDate").split('T')[0]
            StartDate=dt.strptime(x, '%Y-%m-%d').date()
        else:
            StartDate=data.get("StartDate")

        if(data.get("EndDate")!=None):
            x = data.get("EndDate").split('T')[0]
            EndDate=dt.strptime(x, '%Y-%m-%d').date()
        else:
            EndDate=data.get("EndDate")

        cur.execute(GET_BUSINESS_BOOK_DATA,(StartDate,EndDate,StartDate,EndDate,StartDate,EndDate,StartDate,EndDate))
        DATA = cur.fetchall()

        for each in DATA:
            Insider_Dict['Date']=each[0]
            Insider_Dict['Particulars']=each[1]
            Insider_Dict['PaymentMode']=each[2]
            Insider_Dict['AmountPaid']=each[3]
            Insider_Dict['Type']=each[4]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1
        return Outsider_Dict;
#--------------------------------------- END HERE ---------------------------------------
#===========================================================================================


#-------------------------Home Page----------------------------
@CofigurationhomeBlueprint.route("/fetchexpiredate.do",methods=["GET"])
def fetchexpiredate():
    DATA=EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR_GET_DD_METHOD()
    return DATA
 #-------------------------END HERE-----------------------------
