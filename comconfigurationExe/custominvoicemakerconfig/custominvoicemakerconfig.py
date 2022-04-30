from flask import Flask,Blueprint,request,render_template,jsonify
import json

import sqlite3

#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time

CofigurationCustomInvoiceMakerBlueprint = Blueprint('CofigurationCustomInvoiceMakerBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.custominvoicemakerconfig.custominvoicemakerMapper import *
from comconfigurationExe.SMTPServer.SMTP  import *

from jproperties import Properties
configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)


#-------------------------Show invocie maker ----------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/CustomInvoiceMaker")
def CustomInvoiceMaker():
    return render_template(configs.get("CUSTOM_INVOICE_MAKER_TEMPLATE").data);

#-------------------------END HERE-----------------------------



#-------------------------Save Custom Invoice ----------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/Save_Custom_Invoices.do",methods=["POST"])
def Save_Custom_Invoices():
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



    try:
        cur.execute(CREATE_CUSTOM_INVOICE,(data.get("InvoiceNO"),data.get("InvoiceDate"),data.get("POS"),data.get("ClientName"),data.get("FullAddress"),data.get("City"),data.get("State"),data.get("ZipCode"),data.get("ContactNo"),data.get("Email"),data.get("PAN"),data.get("GSTIN"),data.get("OverallDiscount"),data.get("ShippingAmount"),data.get("subtotal"),data.get("NetAmount"),TODAY_DATE))

        for each in data.get("TermsAndCondition"):
            cur.execute(CREATE_TERMS,(data.get("InvoiceNO"),each,TODAY_DATE))

        for each in data.get("Bucket"):
            cur.execute(INSERT_INTO_BUCKET,(data.get("InvoiceNO"),data.get("Bucket")[each]["ItemName"],data.get("Bucket")[each]["ItemPrice"],data.get("Bucket")[each]["ItemQty"],data.get("Bucket")[each]["ItemTaxType"],data.get("Bucket")[each]["ItemTax"],data.get("Bucket")[each]["ItemDisc"],data.get("Bucket")[each]["ItemTotalAmount"],TODAY_DATE))

        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()

    return status;


#-------------------------END HERE-----------------------------



#============================================================================
#------------------------- FETCH DATA FOR TABEL -----------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/Fetch_Data_For_Table.do",methods=["GET"])
def Fetch_Data_For_Table():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_DATA_FOR_TABLE)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['ID']=each[0]
        Insider_Dict['Invoice_NO']=each[1]
        Insider_Dict['InvoiceDate']=each[2]
        Insider_Dict['ClientName']=each[3]
        Insider_Dict['ClientContact']=each[4]
        Insider_Dict['ClientEmail']=each[5]
        Insider_Dict['NetAmount']=each[6]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#--------------------- END FETCH STAFF DETAILS END -------------------------
#============================================================================



#============================================================================
#------------------------- DELETE CUSTOM INVOICE -----------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/Delete_Custom_Invoice.do/<Invoice_NO>",methods=["POST"])
def Delete_Custom_Invoice(Invoice_NO):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    try:
        cur.execute(DELETE_CUSTOM_INVOICE,(Invoice_NO,))
        cur.execute(DELETE_CUSTOM_INVOICE_BUCKET_ITEM,(Invoice_NO,))
        cur.execute(DELETE_CUSTOM_INVOICE_TERMS,(Invoice_NO,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#--------------------- END DELETE CUSTOM INVOICE END -------------------------
#============================================================================



#============================================================================
#------------------------- PREVIEW CUSTOM INVOICE -----------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/FETCH_PREVIEW_CUSTOM_INVOICE_DATA.do/<Invoice_No>",methods=["GET"])
def FETCH_PREVIEW_CUSTOM_INVOICE_DATA(Invoice_No):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_PREVIEW_CUSTOM_INVOICE_DATA,(str(Invoice_No),))
    DATA1 = cur.fetchall()
    for each in DATA1:
        Insider_Dict['Invoice_ID']=each[0]
        Insider_Dict['Invoice_NO']=each[1]
        Insider_Dict['InvoiceDate']=each[2]
        Insider_Dict['POS']=each[3]
        Insider_Dict['ClientName']=each[4]
        Insider_Dict['ClientAddress']=each[5]
        Insider_Dict['ClientCity']=each[6]
        Insider_Dict['ClientState']=each[7]
        Insider_Dict['ClientZipCode']=each[8]
        Insider_Dict['ClientContactNo']=each[9]
        Insider_Dict['ClientEmail']=each[10]
        Insider_Dict['ClientPAN']=each[11]
        Insider_Dict['ClientGSTIN']=each[12]
        Insider_Dict['Discount']=each[13]
        Insider_Dict['Shipping']=each[14]
        Insider_Dict['SubTotal']=each[15]
        Insider_Dict['NetAmount']=each[16]
        Insider_Dict['CreatedDate']=each[17]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1

    return Outsider_Dict;
#--------------------- END FETCH STAFF DETAILS END -------------------------
#============================================================================


#============================================================================
#------------------------- PREVIEW CUSTOM INVOICE BUCKET ITEM -----------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/FETCH_PREVIEW_CUSTOM_INVOICE_BUCKET_ITEM.do/<Invoice_No>",methods=["GET"])
def FETCH_PREVIEW_CUSTOM_INVOICE_BUCKET_ITEM(Invoice_No):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(GET_PREVIEW_CUSTOM_INVOICE_BUCKET_DATA,(str(Invoice_No),))
    DATA1 = cur.fetchall()
    for each in DATA1:
        Insider_Dict['Invoice_ID']=each[0]
        Insider_Dict['Invoice_NO']=each[1]
        Insider_Dict['ItemName']=each[2]
        Insider_Dict['ItemPrice']=each[3]
        Insider_Dict['ItemQty']=each[4]
        Insider_Dict['Tax_Type']=each[5]
        Insider_Dict['Tax']=each[6]
        Insider_Dict['Discount']=each[7]
        Insider_Dict['TotalAmount']=each[8]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#--------------------- END PREVIEW CUSTOM INVOICE BUCKET ITEM  END -------------------------
#============================================================================



#============================================================================
#------------------------- PREVIEW CUSTOM INVOICE TERMS -----------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/FETCH_PREVIEW_CUSTOM_INVOICE_TERMS.do/<Invoice_No>",methods=["GET"])
def FETCH_PREVIEW_CUSTOM_INVOICE_TERMS(Invoice_No):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(GET_PREVIEW_CUSTOM_INVOICE_TERMS_DATA,(str(Invoice_No),))
    DATA1 = cur.fetchall()
    for each in DATA1:
        Insider_Dict['Terms']=each[2]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#--------------------- END PREVIEW CUSTOM INVOICE TERMS END -------------------------
#============================================================================






#=============================================================================================================
#------------------------------ SEND INVOICE ON EMAIL ON CLICK (INVOICE DASHBOARD) ------------------------
@CofigurationCustomInvoiceMakerBlueprint.route("/SEND_CUSTOM_INVOICE_ON_MAIL.do/<ID>",methods=["POST"])
def SEND_CUSTOM_INVOICE_ON_MAIL(ID):
    TEMPLATE_ID=1
    WantedToAttachFile=True
    Result=Send_Mail(TEMPLATE_ID,ID,"Short",WantedToAttachFile,"Custom Invoice")
    return Result
#------------------------- ~ END ========================= END ~ ------------------
#==================================================================================
