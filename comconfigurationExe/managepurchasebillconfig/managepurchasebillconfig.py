from flask import Flask,Blueprint,request,render_template,jsonify
import json

import sqlite3

#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time

from jproperties import Properties


CofigurationManagePurchaseBillBlueprint = Blueprint('CofigurationManagePurchaseBillBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.managepurchasebillconfig.managepurchasebillMapper import *
from comconfigurationExe.displaybillconfig.genrateBillForPURCHASEMapper  import *
from comconfigurationExe.SMTPServer.SMTP  import *

configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)

#-------------------------Show Client Dashboard----------------------------
@CofigurationManagePurchaseBillBlueprint.route("/ManagePurchaseBill.do")
def ManagePurchaseBill():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_OPEN_DATA)
    DATA_FOR_OPEN = cur.fetchall()

    cur.execute(FETCH_RETURN_DATA)
    DATA_FOR_RETURN = cur.fetchall()

    cur.execute(FETCH_COMPLETED_DATA)
    DATA_FOR_COMPLETED = cur.fetchall()

    return render_template(configs.get("MANAGE_PURCHASE_BILL_TEMPLATE").data,DATA_FOR_OPEN=DATA_FOR_OPEN,DATA_FOR_RETURN=DATA_FOR_RETURN,DATA_FOR_COMPLETED=DATA_FOR_COMPLETED);

#-------------------------END HERE-----------------------------

#=============================================================================================================
#------------------------------ SEND PURCHASE ORDER ON EMAIL ON CLICK (PURCHASE DASHBOARD) --------------------
@CofigurationManagePurchaseBillBlueprint.route("/SEND_PURCHASE_ORDER_ON_MAIL.do/<ID>",methods=["POST"])
def SEND_PURCHASE_ORDER_ON_MAIL(ID):
    TEMPLATE_ID=1
    WantedToAttachFile=True
    Result=Send_Mail(TEMPLATE_ID,ID,"Short",WantedToAttachFile,"Purchase")
    return Result
#------------------------- ~ END ========================= END ~ ------------------
#==================================================================================



@CofigurationManagePurchaseBillBlueprint.route("/FETCH_PURCHASE_BILL_INFORMATION.do/<ID>",methods=['POST'])
def FETCH_PURCHASE_BILL_INFORMATION(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_PURCHASE_BILL_INFO,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['Purchase_ID']=each[0]
        Insider_Dict['P_Bill_NO']=each[1]
        Insider_Dict['P_Order_NO']=each[2]
        Insider_Dict['EWay_Bill_NO']=each[3]
        Insider_Dict['Purchas_Type']=each[4]
        Insider_Dict['Bill_Date']=each[5]
        Insider_Dict['Supplier_ID']=each[6]
        Insider_Dict['Due_Date']=each[7]
        Insider_Dict['Purchase_Order_Date']=each[8]
        Insider_Dict['Flag']=each[9]
        Insider_Dict['Created_Date']=each[10]
        Insider_Dict['Apply_Discount']=each[11]
        Insider_Dict['Dis_in_percent']=each[12]
        Insider_Dict['Dis_in_amount']=each[13]
        Insider_Dict['Apply_Shipping']=each[14]
        Insider_Dict['Shipping_Amount']=each[15]
        Insider_Dict['Apply_Shipping']=each[16]
        Insider_Dict['EMI_Months']=each[17]
        Insider_Dict['EMI_Percent']=each[18]
        Insider_Dict['Sub_Total_Amount']=each[19]
        Insider_Dict['Total_Amount']=each[20]
        Insider_Dict['Amount_Paid']=each[21]
        Insider_Dict['Balance_Amount']=each[22]
        Insider_Dict['Status']=each[23]
        Insider_Dict['SupplierName']=each[24]
        Insider_Dict['SupplierAddress']=each[25]
        Insider_Dict['Supplier_ContactNo']=each[26]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;

@CofigurationManagePurchaseBillBlueprint.route("/FETCH_BUCKET_ITEMS_FOR_GIVEN_BILL.do/<ID>",methods=['POST'])
def FETCH_BUCKET_ITEMS_FOR_GIVEN_BILL(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_BUCKET_ITEM_FOR_GIVEN_BILL,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['SrNo']=each[0]
        Insider_Dict['ID']=each[1]
        Insider_Dict['P_Bill_NO']=each[2]
        Insider_Dict['P_Order_NO']=each[3]
        Insider_Dict['Stock_ID']=each[4]
        Insider_Dict['Stock_Name']=each[5]
        Insider_Dict['Qty']=each[6]
        Insider_Dict['Purchase_Price']=each[7]
        Insider_Dict['Discount']=each[8]
        Insider_Dict['CGST']=each[9]
        Insider_Dict['SGST']=each[10]
        Insider_Dict['IGST']=each[11]
        Insider_Dict['Cess']=each[12]
        Insider_Dict['Amount']=each[13]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;


@CofigurationManagePurchaseBillBlueprint.route("/FETCH_PURCHASE_INVOICE_INFORMATION.do/<ID>",methods=['POST'])
def FETCH_PURCHASE_INVOICE_INFORMATION(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_PURCHASE_INVOICE_INFO,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['SrNo']=each[0]
        Insider_Dict['Invoice_ID']=each[1]
        Insider_Dict['P_Bill_NO']=each[2]
        Insider_Dict['P_Order_NO']=each[3]
        Insider_Dict['Payment_Mode']=each[4]
        Insider_Dict['Txn_NO']=each[5]
        Insider_Dict['Amount_Paid']=each[6]
        Insider_Dict['Paid_on']=each[7]
        Insider_Dict['Remarks']=each[8]
        Insider_Dict['Created_Date']=each[9]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
