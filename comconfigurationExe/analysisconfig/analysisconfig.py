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

CofigurationAnalysisBlueprint = Blueprint('CofigurationAnalysisBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.analysisconfig.analysisMapper import *

#**************************************************************************************************************************************
#START START START START START START START START START START START START START START START START START START START START START START START
#**************************************************************************************************************************************
#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SALE ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
@CofigurationAnalysisBlueprint.route("/SaleAnalysis/<Year>",methods=["POST","GET"])
def SaleAnalysis(Year):
    if(int(Year)==1998):
        Year=dt.today().year
    TOTAL_SALE_PER_MONTH=[]
    TOTAL_SALE_AMOUNT_PER_MONTH=[]
    TOTAL_SALE_AMOUNT_PAID_PER_MONTH=[]
    TOTAL_SALE_BALANCE_AMOUNT_PER_MONTH=[]
    SALE_GST_DATA=[]
    SALE_NON_GST_DATA=[]
    SALE_STATE_DATA=[]

    MONTH_LIST=["01","02","03","04","05","06","07","08","09","10","11","12"]
    STATE_LIST=["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"]

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_TOTAL_SALE_PER_MONTH,(str(Year),))
    DATA1 = cur.fetchall()

    cur.execute(TOTAL_AVG_COST_OF_SALE_PER_MONTH,(str(Year),))
    DATA2 = cur.fetchall()

    cur.execute(PLACE_OF_SUPPLY_FOR_SALE,(str(Year),))
    DATA3 = cur.fetchall()

    cur.execute(TOTAL_GST_SALE,(str(Year),))
    DATA4 = cur.fetchall()

    cur.execute(TOTAL_NON_GST_SALE,(str(Year),))
    DATA5 = cur.fetchall()

    for i in MONTH_LIST: #for no. of  sale per month
         FLAG1=False
         for j in DATA1:
             if(i==j[0]):
                 TOTAL_SALE_PER_MONTH.append(j[1])
                 FLAG1=True
                 break
         if(str(FLAG1)!='True'):
             TOTAL_SALE_PER_MONTH.append(0)

    for i in MONTH_LIST:#for total cost of sale per month
         FLAG2=False
         for j in DATA2:
             if(i==j[0]):
                 TOTAL_SALE_AMOUNT_PER_MONTH.append(j[1])
                 FLAG2=True
                 break
         if(str(FLAG2)!='True'):
             TOTAL_SALE_AMOUNT_PER_MONTH.append(0)

    for i in MONTH_LIST:#for total paid amount of sale per month
         FLAG3=False
         for j in DATA2:
             if(i==j[0]):
                 TOTAL_SALE_AMOUNT_PAID_PER_MONTH.append(j[2])
                 FLAG3=True
                 break
         if(str(FLAG3)!='True'):
             TOTAL_SALE_AMOUNT_PAID_PER_MONTH.append(0)

    for i in MONTH_LIST:#for balance amount of sale per month
         FLAG4=False
         for j in DATA2:
             if(i==j[0]):
                 TOTAL_SALE_BALANCE_AMOUNT_PER_MONTH.append(j[3])
                 FLAG4=True
                 break
         if(str(FLAG4)!='True'):
             TOTAL_SALE_BALANCE_AMOUNT_PER_MONTH.append(0)

    for i in MONTH_LIST:#for GST Invoice
         FLAG5=False
         for j in DATA4:
             if(i==j[0]):
                 SALE_GST_DATA.append(j[1])
                 FLAG5=True
                 break
         if(str(FLAG5)!='True'):
             SALE_GST_DATA.append(0)

    for i in MONTH_LIST:#for Non GST Invoice
         FLAG6=False
         for j in DATA5:
             if(i==j[0]):
                 SALE_NON_GST_DATA.append(j[1])
                 FLAG6=True
                 break
         if(str(FLAG6)!='True'):
             SALE_NON_GST_DATA.append(0)


    for i in STATE_LIST:#for place of supply
         FLAG7=False
         for j in DATA3:
             if(i==j[0]):
                 SALE_STATE_DATA.append(j[1])
                 FLAG7=True
                 break
         if(str(FLAG7)!='True'):
             SALE_STATE_DATA.append(0)

    return render_template(configs.get("ANALYSIS-SALE-TEMPLATE").data,Year=Year,TOTAL_SALE_PER_MONTH=TOTAL_SALE_PER_MONTH,TOTAL_SALE_AMOUNT_PER_MONTH=TOTAL_SALE_AMOUNT_PER_MONTH,TOTAL_SALE_AMOUNT_PAID_PER_MONTH=TOTAL_SALE_AMOUNT_PAID_PER_MONTH,TOTAL_SALE_BALANCE_AMOUNT_PER_MONTH=TOTAL_SALE_BALANCE_AMOUNT_PER_MONTH,SALE_GST_DATA=SALE_GST_DATA,SALE_NON_GST_DATA=SALE_NON_GST_DATA,SALE_STATE_DATA=SALE_STATE_DATA);

#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SALE ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
#**************************************************************************************************************************************
#END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
#**************************************************************************************************************************************

#**************************************************************************************************************************************
#START START START START START START START START START START START START START START START START START START START START START START START
#**************************************************************************************************************************************
#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PURCHASE ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@CofigurationAnalysisBlueprint.route("/PurchaseAnalysis/<Year>",methods=["POST","GET"])
def PurchaseAnalysis(Year):
    if(int(Year)==1998):
        Year=dt.today().year
    TOTAL_PURCHASE_PER_MONTH=[]
    TOTAL_PURCHASE_AMOUNT_PER_MONTH=[]
    TOTAL_PURCHASE_AMOUNT_PAID_PER_MONTH=[]
    TOTAL_PURCHASE_BALANCE_AMOUNT_PER_MONTH=[]
    PURCHASE_GST_DATA=[]
    PURCHASE_NON_GST_DATA=[]


    MONTH_LIST=["01","02","03","04","05","06","07","08","09","10","11","12"]

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_TOTAL_PURCHASE_PER_MONTH,(str(Year),))
    DATA1 = cur.fetchall()

    cur.execute(TOTAL_AVG_COST_OF_PURCHASE_PER_MONTH,(str(Year),))
    DATA2 = cur.fetchall()

    cur.execute(TOTAL_GST_PURCHASE,(str(Year),))
    DATA3 = cur.fetchall()

    cur.execute(TOTAL_NON_GST_PURCHASE,(str(Year),))
    DATA4 = cur.fetchall()

    for i in MONTH_LIST: #for no. of  Purchase per month
         FLAG1=False
         for j in DATA1:
             if(i==j[0]):
                 TOTAL_PURCHASE_PER_MONTH.append(j[1])
                 FLAG1=True
                 break
         if(str(FLAG1)!='True'):
             TOTAL_PURCHASE_PER_MONTH.append(0)

    for i in MONTH_LIST:#for total cost of Purchase per month
         FLAG2=False
         for j in DATA2:
             if(i==j[0]):
                 TOTAL_PURCHASE_AMOUNT_PER_MONTH.append(j[1])
                 FLAG2=True
                 break
         if(str(FLAG2)!='True'):
             TOTAL_PURCHASE_AMOUNT_PER_MONTH.append(0)

    for i in MONTH_LIST:#for total paid amount of Purchase per month
         FLAG3=False
         for j in DATA2:
             if(i==j[0]):
                 TOTAL_PURCHASE_AMOUNT_PAID_PER_MONTH.append(j[2])
                 FLAG3=True
                 break
         if(str(FLAG3)!='True'):
             TOTAL_PURCHASE_AMOUNT_PAID_PER_MONTH.append(0)

    for i in MONTH_LIST:#for balance amount of Purchase per month
         FLAG4=False
         for j in DATA2:
             if(i==j[0]):
                 TOTAL_PURCHASE_BALANCE_AMOUNT_PER_MONTH.append(j[3])
                 FLAG4=True
                 break
         if(str(FLAG4)!='True'):
             TOTAL_PURCHASE_BALANCE_AMOUNT_PER_MONTH.append(0)

    for i in MONTH_LIST:#for GST Invoice
         FLAG5=False
         for j in DATA3:
             if(i==j[0]):
                 PURCHASE_GST_DATA.append(j[1])
                 FLAG5=True
                 break
         if(str(FLAG5)!='True'):
             PURCHASE_GST_DATA.append(0)

    for i in MONTH_LIST:#for Non GST Invoice
         FLAG6=False
         for j in DATA4:
             if(i==j[0]):
                 PURCHASE_NON_GST_DATA.append(j[1])
                 FLAG6=True
                 break
         if(str(FLAG6)!='True'):
             PURCHASE_NON_GST_DATA.append(0)

    return render_template(configs.get("ANALYSIS-PURCHASE-TEMPLATE").data,Year=Year,TOTAL_PURCHASE_PER_MONTH=TOTAL_PURCHASE_PER_MONTH,TOTAL_PURCHASE_AMOUNT_PER_MONTH=TOTAL_PURCHASE_AMOUNT_PER_MONTH,TOTAL_PURCHASE_AMOUNT_PAID_PER_MONTH=TOTAL_PURCHASE_AMOUNT_PAID_PER_MONTH,TOTAL_PURCHASE_BALANCE_AMOUNT_PER_MONTH=TOTAL_PURCHASE_BALANCE_AMOUNT_PER_MONTH,PURCHASE_GST_DATA=PURCHASE_GST_DATA,PURCHASE_NON_GST_DATA=PURCHASE_NON_GST_DATA);

#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PURCHASE ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
#**************************************************************************************************************************************
#END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
#**************************************************************************************************************************************


#**************************************************************************************************************************************
#START START START START START START START START START START START START START START START START START START START START START START START
#**************************************************************************************************************************************
#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CLIENT ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
@CofigurationAnalysisBlueprint.route("/ClientAnalysis/<Year>",methods=["POST","GET"])
def ClientAnalysis(Year):
    if(int(Year)==1998):
        Year=dt.today().year
    CLIENT_JOINE_DATA=[]
    ORDER_PER_CLIENT_DATA=[]
    CLIENT_STATE_DATA=[]
    MONTH_LIST=["01","02","03","04","05","06","07","08","09","10","11","12"]
    STATE_LIST=["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"]

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(TOTAL_CLIENT_JOIN_DATA,(str(Year),))
    DATA1 = cur.fetchall()

    cur.execute(TOTAL_ORDERS_PER_CLIENT_DATA,(str(Year),))
    DATA2 = cur.fetchall()

    cur.execute(TOTAL_CLIENT_STATE_DATA,(str(Year),))
    DATA3 = cur.fetchall()

    for i in MONTH_LIST:
         FLAG1=False
         for j in DATA1:
             if(i==j[0]):
                 CLIENT_JOINE_DATA.append(j[1])
                 FLAG1=True
                 break
         if(str(FLAG1)!='True'):
             CLIENT_JOINE_DATA.append(0)

    for i in MONTH_LIST:
         FLAG2=False
         for j in DATA2:
             if(i==j[0]):
                 ORDER_PER_CLIENT_DATA.append(j[1])
                 FLAG2=True
                 break
         if(str(FLAG2)!='True'):
             ORDER_PER_CLIENT_DATA.append(0)

    for i in STATE_LIST:
         FLAG3=False
         for j in DATA3:
             if(i==j[0]):
                 CLIENT_STATE_DATA.append(j[1])
                 FLAG3=True
                 break
         if(str(FLAG3)!='True'):
             CLIENT_STATE_DATA.append(0)

    return render_template(configs.get("ANALYSIS-CLIENT-TEMPLATE").data,Year=Year,CLIENT_JOINE_DATA=CLIENT_JOINE_DATA,ORDER_PER_CLIENT_DATA=ORDER_PER_CLIENT_DATA,CLIENT_STATE_DATA=CLIENT_STATE_DATA);

#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CLIENT ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
#**************************************************************************************************************************************
#END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
#**************************************************************************************************************************************


#**************************************************************************************************************************************
#START START START START START START START START START START START START START START START START START START START START START START START
#**************************************************************************************************************************************
#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SUPPLIER ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
@CofigurationAnalysisBlueprint.route("/SupplierAnalysis/<Year>",methods=["POST","GET"])
def SupplierAnalysis(Year):
    if(int(Year)==1998):
        Year=dt.today().year
    SUPPLIER_JOINE_DATA=[]
    ORDER_PER_SUPPLIER_DATA=[]
    SUPPLIER_STATE_DATA=[]
    MONTH_LIST=["01","02","03","04","05","06","07","08","09","10","11","12"]
    STATE_LIST=["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"]
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(TOTAL_SUPPLIER_JOIN_DATA,(str(Year),))
    DATA1 = cur.fetchall()

    cur.execute(TOTAL_PURCHASE_ORDERS_PER_SUPPLIER_DATA,(str(Year),))
    DATA2 = cur.fetchall()

    cur.execute(TOTAL_SUPPLIER_STATE_DATA,(str(Year),))
    DATA3 = cur.fetchall()

    for i in MONTH_LIST:
         FLAG1=False
         for j in DATA1:
             if(i==j[0]):
                 SUPPLIER_JOINE_DATA.append(j[1])
                 FLAG1=True
                 break
         if(str(FLAG1)!='True'):
             SUPPLIER_JOINE_DATA.append(0)

    for i in MONTH_LIST:
         FLAG2=False
         for j in DATA2:
             if(i==j[0]):
                 ORDER_PER_SUPPLIER_DATA.append(j[1])
                 FLAG2=True
                 break
         if(str(FLAG2)!='True'):
             ORDER_PER_SUPPLIER_DATA.append(0)

    for i in STATE_LIST:
         FLAG3=False
         for j in DATA3:
             if(i==j[0]):
                 SUPPLIER_STATE_DATA.append(j[1])
                 FLAG3=True
                 break
         if(str(FLAG3)!='True'):
             SUPPLIER_STATE_DATA.append(0)

    return render_template(configs.get("ANALYSIS-SUPPLIER-TEMPLATE").data,Year=Year,SUPPLIER_JOINE_DATA=SUPPLIER_JOINE_DATA,ORDER_PER_SUPPLIER_DATA=ORDER_PER_SUPPLIER_DATA,SUPPLIER_STATE_DATA=SUPPLIER_STATE_DATA);

#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SUPPLIER ANALYSIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
#**************************************************************************************************************************************
#END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
#**************************************************************************************************************************************
