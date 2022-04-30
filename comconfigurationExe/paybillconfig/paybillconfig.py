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
configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)

CofigurationPayBillBlueprint = Blueprint('CofigurationPayBillBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.paybillconfig.paybillMapper import *

#=================================================================================
#--------------------------------- PAY BILL FOR INVOICE --------------------------

#@Redirect to payment page : Invoice
@CofigurationPayBillBlueprint.route("/PAY_Bill_For_Invoice.do/<ID>")
def PAY_Bill_For_Invoice(ID):
    return render_template(configs.get("PAY--BILL--INVOICE--TEMPLATE").data,ID=ID);


#@Add Payment to Invoice
@CofigurationPayBillBlueprint.route("/ADD_PAYMENT_FOR_INVOICE.do/<ID>",methods=['POST'])
def ADD_PAYMENT_FOR_INVOICE(ID):
    Today=dt.today().strftime('%Y-%m-%d')

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    try:
        x = data.get("Paid_on").split('T')[0]
        Paid_on=dt.strptime(x,'%Y-%m-%d').date()
    except Exception as e:
        Paid_on=data.get("Paid_on")

    cur.execute(FETCH_INVOICE_INFORMATION,(ID,))
    DATA = cur.fetchall()
    for each in DATA:
        Total_amount=each[13]
        Amount_Paid=each[14]

    Amount_Paid=Amount_Paid+int(data.get("Amount_Paid"))
    BalanceAmount=Total_amount-Amount_Paid

    if(BalanceAmount==0):
        status="Complete"
    else:
        status="Pending"

    try:
        cur.execute(ADD_PAYEMENT_FOR_INVOICE_BILL,(ID,data.get("payment_mode"),data.get("TxnNo"),data.get("Amount_Paid"),Paid_on,data.get("Remark"),Today))
        cur.execute(UPDATE_INVOICE_FOR_INVOICE_BILL,(Amount_Paid,BalanceAmount,status,ID))
        Flag="Success"
        con.commit()
    except Exception as e:
        Flag="Failed"
        con.rollback()

    return Flag;



#@Redirect to payment page For EMI : Invoice
@CofigurationPayBillBlueprint.route("/PAY_Bill_For_Invoice_EMI.do/<ID>")
def PAY_Bill_For_Invoice_EMI(ID):
    return render_template(configs.get("PAY--BILL--INVOICE--EMI--TEMPLATE").data,ID=ID);


#@Add Payment to Invoice : EMI
@CofigurationPayBillBlueprint.route("/ADD_Payment_For_Invoice_EMI.do/<EMI_ID>",methods=['POST'])
def ADD_Payment_For_Invoice_EMI(EMI_ID):
        result={}
        Today=dt.today().strftime('%Y-%m-%d')

        con = sqlite3.connect("IMSConfig.db")
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        data = json.loads(request.data.decode())

        try:
            x = data.get("Paid_on").split('T')[0]
            Paid_on=dt.strptime(x,'%Y-%m-%d').date()
        except Exception as e:
            Paid_on=data.get("Paid_on")

        #================================================ CREATE INVOICE FOR EMI =========================================
        try:
            cur.execute(CREATE_INVOICE_FOR_EMI,(data.get("Invoice_NO"),data.get("payment_mode"),data.get("TxnNo"),data.get("EMI_Amount"),Paid_on,data.get("Remark"),Today))
            con.commit()
            result["isInvoiceCreated"]="true"
        except Exception as e:
            con.rollback()
            result["isInvoiceCreated"]="false"
        #==================================================== ~ END ~ END ~ ================================================

        #================================================ UPDATE EMI INFORMATION ON Invoice_EMI =========================================
        if(result["isInvoiceCreated"]=="true"):
            #@Fetch recently created invoice ID
            cur.execute(FETCH_RECENTLY_CREATED_INVOICE_ID)
            DATA = cur.fetchall()
            for each in DATA:
                Invoice_ID_for_EMI=each[0]

            try:
                cur.execute(UPDATE_EMI_INFORMATION,(Invoice_ID_for_EMI,data.get("EMI_Amount"),Paid_on,'Complete',Today,EMI_ID))
                con.commit()
                result["isEMITableUpdate"]="true"
            except Exception as e:
                con.rollback()
                result["isEMITableUpdate"]="false"
        else:
            result["isEMITableUpdate"]="false"
        #==================================================== ~ END ~ END ~ ================================================

        #================================================ ~  UPDATE INVOICE INFORMATION ON Invoice_bill ~ =========================================
        if(result["isEMITableUpdate"]=="true"):
            #@Fetch invoice details
            cur.execute(FETCH_INVOICE_INFORMATION,(data.get("Invoice_NO"),))
            DATA = cur.fetchall()
            for each in DATA:
                Total_amount=each[13]
                Amount_Paid=each[14]

            Amount_Paid=Amount_Paid+data.get("EMI_Amount")
            BalanceAmount=Total_amount-Amount_Paid

            if(BalanceAmount<=0):     # "<=0" we used this because balance amount will go negative as client is paying extra EMI interest
                status="Complete"
            else:
                status="EMI Pending"   #IMP IMP IMP ---becoz we are paying emi here

            try:
                cur.execute(UPDATE_INVOICE_FOR_INVOICE_BILL,(Amount_Paid,BalanceAmount,status,data.get("Invoice_NO")))
                con.commit()
                result["isInvoiceBillTableUpdate"]="true"
            except Exception as e:
                con.rollback()
                result["isInvoiceBillTableUpdate"]="false"

        else:
            result["isInvoiceBillTableUpdate"]="false"
        #==================================================== ~ END ~ END ~ ================================================

        return result;

#----------------------------------END HERE----------------------------------------
#=================================================================================



#=================================================================================
#--------------------------------- PAY BILL FOR PURCHASE --------------------------
#@Redirect to payment page : Purchase
@CofigurationPayBillBlueprint.route("/PAY_Bill_For_Purchase.do/<ID>")
def PAY_Bill_For_Purchase(ID):
    return render_template(configs.get("PAY--BILL--PURCHASE--TEMPLATE").data,ID=ID);



#@Add Payment to Purchase
@CofigurationPayBillBlueprint.route("/ADD_PAYMENT_FOR_PURCHASE.do/<ID>",methods=['POST'])
def ADD_PAYMENT_FOR_PURCHASE(ID):
    Today=dt.today().strftime('%Y-%m-%d')

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    try:
        x = data.get("Paid_on").split('T')[0]
        Paid_on=dt.strptime(x,'%Y-%m-%d').date()
    except Exception as e:
        Paid_on=data.get("Paid_on")

    cur.execute(FETCH_PURCHASE_INFORMATION,(ID,))
    DATA = cur.fetchall()
    for each in DATA:
        Total_amount=each[9]
        Amount_Paid=each[10]

    Amount_Paid=Amount_Paid+int(data.get("Amount_Paid"))
    BalanceAmount=Total_amount-Amount_Paid

    if(BalanceAmount==0):
        status="Complete"
    else:
        status="Pending"

    try:
        cur.execute(ADD_PAYEMENT_FOR_PURCHASE_BILL,(ID,'PO'+str(ID),data.get("payment_mode"),data.get("TxnNo"),data.get("Amount_Paid"),Paid_on,data.get("Remark"),Today))
        cur.execute(UPDATE_PURCHASE_FOR_PURCHASE_BILL,(Amount_Paid,BalanceAmount,status,ID))
        Flag="Success"
        con.commit()
    except Exception as e:
        Flag="Failed"
        con.rollback()

    return Flag;



#----------------------------------END HERE----------------------------------------
#=================================================================================
