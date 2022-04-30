from flask import Flask,Blueprint,request,render_template
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

Serverconfigs = Properties()
with open('Server.properties', 'rb') as read_prop:
    Serverconfigs.load(read_prop)


CofigurationReportBlueprint = Blueprint('CofigurationReportBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.reportconfig.reportMapper import *

#-------------------------   PAYMENT REPORT    ----------------------------
#-------------------------------------------------------------------------
@CofigurationReportBlueprint.route("/PaymentReport")
def PaymentReport():
    isSuccess=""
    return render_template(configs.get("REPORT--PAYMENT--TEMPLATE").data,isSuccess=isSuccess);

#@Generate report for Payment
@CofigurationReportBlueprint.route("/GenratePaymentReport.do/<Filter>/<StartDate>/<EndDate>",methods=['POST','GET'])
def GenratePaymentReport(Filter,StartDate,EndDate):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"
    try:
       if(Filter=='General'):
           cur.execute(GENERATE_PAYMENT_REPORT_GENERAL,(StartDate,EndDate,StartDate,EndDate))
           GENERATED_PAYMENT_DATA = cur.fetchall()
       elif(Filter=='Pay In'):
           cur.execute(GENERATE_PAYMENT_PAY_IN,(StartDate,EndDate))
           GENERATED_PAYMENT_DATA = cur.fetchall()
       else:
           cur.execute(GENERATE_PAYMENT_PAY_OUT,(StartDate,EndDate))
           GENERATED_PAYMENT_DATA = cur.fetchall()
       isSuccess="true"
    except Exception as e:
        GENERATED_PAYMENT_DATA=[]

    return render_template(configs.get("REPORT--PAYMENT--TEMPLATE").data,GENERATED_PAYMENT_DATA=GENERATED_PAYMENT_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate);

#---------------------------   END HERE   ------------------------------
#========================================================================




#-------------------------   STOCK REPORT    ----------------------------
#-------------------------------------------------------------------------
@CofigurationReportBlueprint.route("/StockReport")
def StockReport():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess=""
    return render_template(configs.get("REPORT--STOCK--TEMPLATE").data,STOCK_CONSTANT=int(Serverconfigs.get("WARNING_STOCK_COUNT").data),isSuccess=isSuccess);

#@Generate report for stock
@CofigurationReportBlueprint.route("/GenrateStockReport.do/<FilterOne>/<FilterTwo>",methods=['POST','GET'])
def GenrateStockReport(FilterOne,FilterTwo):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"

    try:
        if(FilterOne=='All'):
            if(FilterTwo=='All'):
                cur.execute(GENERATE_STOCK_REPORT__ALL__ALL)                                                               # All  --> All
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"
            elif(FilterTwo=='Available'):
                cur.execute(GENERATE_STOCK_REPORT__ALL__AVAILABLE,(int(Serverconfigs.get("WARNING_STOCK_COUNT").data),))  # All  --> Available
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"
            elif(FilterTwo=='Out Of Stock'):
                cur.execute(GENERATE_STOCK_REPORT__ALL__OUT_OF_STOCK)                                                     # All  --> Out Of Stock'
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"
            else:
                cur.execute(GENERATE_STOCK_REPORT__ALL__ABOUT_TO_OUT,(int(Serverconfigs.get("WARNING_STOCK_COUNT").data),)) # All  --> About To Out
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"
        else:
            if(FilterTwo=='All'):
                cur.execute(GENERATE_STOCK_REPORT__FILTER__ALL,(FilterOne,))
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"
            elif(FilterTwo=='Available'):
                cur.execute(GENERATE_STOCK_REPORT__FILTER__AVAILABLE,(FilterOne,int(Serverconfigs.get("WARNING_STOCK_COUNT").data)))
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"
            elif(FilterTwo=='Out Of Stock'):
                cur.execute(GENERATE_STOCK_REPORT__FILTER__OUT_OF_STOCK,(FilterOne,))
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"
            else:
                cur.execute(GENERATE_STOCK_REPORT__FILTER__ABOUT_TO_OUT,(FilterOne,int(Serverconfigs.get("WARNING_STOCK_COUNT").data)))
                GENERATED_STOCK_DATA = cur.fetchall()
                isSuccess="true"

    except Exception as e:
        print(e)
        GENERATED_STOCK_DATA=[]
    return render_template(configs.get("REPORT--STOCK--TEMPLATE").data,STOCK_CONSTANT=int(Serverconfigs.get("WARNING_STOCK_COUNT").data),GENERATED_STOCK_DATA=GENERATED_STOCK_DATA,isSuccess=isSuccess);

#---------------------------   END HERE   ------------------------------
#========================================================================


#-------------------------   SALE REPORT    ----------------------------
#-------------------------------------------------------------------------
@CofigurationReportBlueprint.route("/SaleReport")
def SaleReport():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess=""
    return render_template(configs.get("REPORT--SALE--TEMPLATE").data,isSuccess=isSuccess);

#@Generate report for sale
@CofigurationReportBlueprint.route("/GenrateSaleReport.do/<FilterOne>/<FilterTwo>/<FilterThree>/<StartDate>/<EndDate>",methods=['POST','GET'])
def GenrateSaleReport(FilterOne,FilterTwo,FilterThree,StartDate,EndDate):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"
    try:
        if(FilterOne=='All'):
            if(FilterTwo=='Status Wise'):
                if(FilterThree=='All'):
                    cur.execute(GENERATE_SALE_REPORT_ALL__STATUS_WISE__ALL,(StartDate,EndDate))
                    GENERATED_SALE_DATA = cur.fetchall()
                    isSuccess="true"
                else:
                    cur.execute(GENERATE_SALE_REPORT_ALL__STATUS_WISE__OPTION,(FilterThree,StartDate,EndDate))
                    GENERATED_SALE_DATA = cur.fetchall()
                    isSuccess="true"
            elif(FilterTwo=='POS Wise'):
                cur.execute(GENERATE_SALE_REPORT_ALL__POS_WISE__OPTION,(FilterThree,StartDate,EndDate))
                GENERATED_SALE_DATA = cur.fetchall()
                isSuccess="true"
        else:
            if(FilterTwo=='Status Wise'):
                if(FilterThree=='All'):
                    cur.execute(GENERATE_SALE_REPORT_STATUS_WISE_ALL,(FilterOne,StartDate,EndDate))
                    GENERATED_SALE_DATA = cur.fetchall()
                    isSuccess="true"
                else:
                    cur.execute(GENERATE_SALE_REPORT_STATUS_WISE,(FilterOne,FilterThree,StartDate,EndDate))
                    GENERATED_SALE_DATA = cur.fetchall()
                    isSuccess="true"

            elif(FilterTwo=='POS Wise'):
                cur.execute(GENERATE_SALE_REPORT_POS_WISE,(FilterOne,FilterThree,StartDate,EndDate))
                GENERATED_SALE_DATA = cur.fetchall()
                isSuccess="true"
    except Exception as e:
        GENERATED_SALE_DATA=[]

    return render_template(configs.get("REPORT--SALE--TEMPLATE").data,GENERATED_SALE_DATA=GENERATED_SALE_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate);

#---------------------------   END HERE   ------------------------------
#========================================================================

#-------------------------   PURCHASE REPORT    ----------------------------
#-------------------------------------------------------------------------
@CofigurationReportBlueprint.route("/PurchaseReport")
def PurchaseReport():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess=""
    return render_template(configs.get("REPORT--PURCHASE--TEMPLATE").data,isSuccess=isSuccess);

#@Generate report for Purchase
@CofigurationReportBlueprint.route("/GenratePurchaseReport.do/<FilterOne>/<FilterTwo>/<FilterThree>/<StartDate>/<EndDate>",methods=['POST','GET'])
def GenratePurchaseReport(FilterOne,FilterTwo,FilterThree,StartDate,EndDate):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"

    try:
        if(FilterOne=='All'):
            if(FilterTwo=='Status Wise'):
                if(FilterThree=='All'):
                    cur.execute(GENERATE_PURCHASE_REPORT_ALL__STATUS_WISE__ALL,(StartDate,EndDate))
                    GENERATED_PURCHASE_DATA = cur.fetchall()
                    isSuccess="true"
                else:
                    cur.execute(GENERATE_PURCHASE_REPORT_ALL__STATUS_WISE__OPTION,(FilterThree,StartDate,EndDate))
                    GENERATED_PURCHASE_DATA = cur.fetchall()
                    isSuccess="true"
            elif(FilterTwo=='Supplier Wise'):
                cur.execute(GENERATE_PURCHASE_REPORT_ALL_SUPPLIER_WISE__OPTION,(FilterThree,StartDate,EndDate))
                GENERATED_PURCHASE_DATA = cur.fetchall()
                isSuccess="true"

        else:
            if(FilterTwo=='Status Wise'):
                if(FilterThree=='All'):
                    cur.execute(GENERATE_PURCHASE_REPORT_STATUS_WISE_ALL,(FilterOne,StartDate,EndDate))
                    GENERATED_PURCHASE_DATA = cur.fetchall()
                    isSuccess="true"
                else:
                    cur.execute(GENERATE_PURCHASE_REPORT_STATUS_WISE,(FilterOne,FilterThree,StartDate,EndDate))
                    GENERATED_PURCHASE_DATA = cur.fetchall()
                    isSuccess="true"
            elif(FilterTwo=='Supplier Wise'):
                cur.execute(GENERATE_PURCHASE_REPORT_SUPPLIER_WISE,(FilterOne,FilterThree,StartDate,EndDate))
                GENERATED_PURCHASE_DATA = cur.fetchall()
                isSuccess="true"

    except Exception as e:
        GENERATED_PURCHASE_DATA=[]

    return render_template(configs.get("REPORT--PURCHASE--TEMPLATE").data,GENERATED_PURCHASE_DATA=GENERATED_PURCHASE_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate);

#---------------------------   END HERE   ------------------------------
#========================================================================

#-------------------------   CLIENT REPORT    ----------------------------
#-------------------------------------------------------------------------
@CofigurationReportBlueprint.route("/ClientReport")
def ClientReport():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess=""
    return render_template(configs.get("REPORT--CLIENT--TEMPLATE").data,isSuccess=isSuccess);

#@Generate report for client
@CofigurationReportBlueprint.route("/GenrateClientReport.do/<Filter>/<StartDate>/<EndDate>",methods=['POST','GET'])
def GenrateClientReport(Filter,StartDate,EndDate):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"
    try:
       if(Filter=='All'):
           cur.execute(GENERATE_CLIENT_REPORT_ALL,(StartDate,EndDate))
           GENERATED_CLIENT_DATA = cur.fetchall()
       else:
           cur.execute(GENERATE_CLIENT_REPORT_FILTER,(Filter,StartDate,EndDate))
           GENERATED_CLIENT_DATA = cur.fetchall()
       isSuccess="true"
    except Exception as e:
        GENERATED_CLIENT_DATA=[]
    return render_template(configs.get("REPORT--CLIENT--TEMPLATE").data,GENERATED_CLIENT_DATA=GENERATED_CLIENT_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate);

#---------------------------   END HERE   ------------------------------
#========================================================================

#-------------------------   SUPPLIER REPORT    ----------------------------
#-------------------------------------------------------------------------
@CofigurationReportBlueprint.route("/SupplierReport")
def SupplierReport():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess=""
    return render_template(configs.get("REPORT--SUPPLIER--TEMPLATE").data,isSuccess=isSuccess);

#@Generate report for Supplier
@CofigurationReportBlueprint.route("/GenrateSupplierReport.do/<Filter>/<StartDate>/<EndDate>",methods=['POST','GET'])
def GenrateSupplierReport(Filter,StartDate,EndDate):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"
    try:
       if(Filter=='All'):
           cur.execute(GENERATE_SUPPLIER_REPORT_All,(StartDate,EndDate))
           GENERATED_SUPPLIER_DATA = cur.fetchall()
       else:
           cur.execute(GENERATE_SUPPLIER_REPORT_FILTER,(Filter,StartDate,EndDate))
           GENERATED_SUPPLIER_DATA = cur.fetchall()
       isSuccess="true"
    except Exception as e:
        GENERATED_SUPPLIER_DATA=[]
    return render_template(configs.get("REPORT--SUPPLIER--TEMPLATE").data,GENERATED_SUPPLIER_DATA=GENERATED_SUPPLIER_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate);

#---------------------------   END HERE   -------------------------------
#========================================================================


#-------------------------   TRANSACTION REPORT    -----------------------
#-------------------------------------------------------------------------
@CofigurationReportBlueprint.route("/TransactionReport")
def TransactionReport():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess=""
    return render_template(configs.get("REPORT--TRANSACTION--TEMPLATE").data,isSuccess=isSuccess);

#@Generate report for Transaction
@CofigurationReportBlueprint.route("/GenrateTransactionReport.do/<FilterOne>/<FilterTwo>/<StartDate>/<EndDate>",methods=['POST','GET'])
def GenrateTransactionReport(FilterOne,FilterTwo,StartDate,EndDate):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"
    cur.execute(GENERATE_TRANSACTION_REPORT_STOCK_CREDIT,(StartDate,EndDate))
    GENERATED_TRANSACTION_DATA = cur.fetchall()
    isSuccess="true"
    try:
        if(FilterOne=='Stock'):                                                 #For Stock
            if(FilterTwo=='Credit Transaction'):                                #For Stock ~  Credit Transaction
                cur.execute(GENERATE_TRANSACTION_REPORT_STOCK_CREDIT,(StartDate,EndDate))
                GENERATED_TRANSACTION_DATA = cur.fetchall()
                isSuccess="true"
            else:                                                               #For Stock ~  Debit Transaction
                cur.execute(GENERATE_TRANSACTION_REPORT_STOCK_DEBIT,(StartDate,EndDate))
                GENERATED_TRANSACTION_DATA = cur.fetchall()
                isSuccess="true"
        elif(FilterOne=='sell'):                                                #For Sell
            isSuccess="true"
        else:                                                                   #For Purchase
            isSuccess="true"

    except Exception as e:
        GENERATED_TRANSACTION_DATA=[]
    return render_template(configs.get("REPORT--TRANSACTION--TEMPLATE").data,GENERATED_TRANSACTION_DATA=GENERATED_TRANSACTION_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate,Flag=FilterTwo);

#---------------------------   END HERE   ------------------------------
#========================================================================

#-------------------------   EXPENSE REPORT    ----------------------------
#-------------------------------------------------------------------------
#@Generate report for EXPENSE
@CofigurationReportBlueprint.route("/GenrateExpenseReport.do/<Filter>/<StartDate>/<EndDate>",methods=['POST','GET'])
def GenrateExpenseReport(Filter,StartDate,EndDate):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    isSuccess="false"
    try:
       if(Filter=='All'):
           cur.execute(ALL__GENERATE_EXPENSE_REPORT,(StartDate,EndDate))
           GENERATED_EXPENSE_DATA = cur.fetchall()
           for each in GENERATED_EXPENSE_DATA:
               print(each[8])
       else:
           cur.execute(GENERATE_EXPENSE_REPORT,(Filter,StartDate,EndDate))
           GENERATED_EXPENSE_DATA = cur.fetchall()

       isSuccess="true"
    except Exception as e:
        GENERATED_EXPENSE_DATA=[]
    return render_template(configs.get("EXPENSE-DASHBOARD-TEMPLATE").data,GENERATED_EXPENSE_DATA=GENERATED_EXPENSE_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate,Filter=Filter);

#---------------------------   END HERE   ------------------------------
#========================================================================
