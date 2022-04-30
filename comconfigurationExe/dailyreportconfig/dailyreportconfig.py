from flask import Flask,Blueprint,request,render_template,make_response
import json
import sqlite3
import pdfkit

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

CofigurationDailyreportBlueprint = Blueprint('CofigurationDailyreportBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.frontconfig.frontMapper import *

#==================================================================================================================================
#-------------------------------------------------------------- DISPLAY BILL : INVOICE ---------------------------------------------------

@CofigurationDailyreportBlueprint.route("/exportdailyreport.do")
def exportdailyreport():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    TODAY=dt.today()

    Serverconfigs = Properties()
    with open('Server.properties', 'rb') as read_prop:
        Serverconfigs.load(read_prop)

    cur.execute(FETCH_TODAY_Customer_Invoices)
    DATA_OF_TODAY_Customer_Invoices = cur.fetchall()

    cur.execute(FETCH_TODAY_Purchase_Invoices)
    DATA_OF_TODAY_Purchase_Invoices = cur.fetchall()

    cur.execute(FETCH_TODAY_Payment_Transaction)
    DATA_OF_TODAY_Payment_Transaction = cur.fetchall()

    cur.execute(FETCH_TODAY_Stock_Transaction)
    DATA_OF_TODAY_Stock_Transaction = cur.fetchall()

    cur.execute(FETCH_TODAY_Client_Joine)
    DATA_OF_TODAY_Client_Joine = cur.fetchall()

    cur.execute(FETCH_TODAY_Supplier_Joine)
    DATA_OF_TODAY_Supplier_Joine = cur.fetchall()

    cur.execute(FETCH_STOCK_SUMMARY)
    DATA_OF_FETCH_STOCK_SUMMARY = cur.fetchall()

    WARNING_STOCK_COUNT=int(Serverconfigs.get("WARNING_STOCK_COUNT").data)

    FilneName='attachment;filename=Daily.pdf'

    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
    res = render_template(configs.get("DAILY--REPORT--TEMPLATE").data,TODAY=TODAY,DATA_OF_TODAY_Customer_Invoices=DATA_OF_TODAY_Customer_Invoices,DATA_OF_TODAY_Purchase_Invoices=DATA_OF_TODAY_Purchase_Invoices,DATA_OF_TODAY_Payment_Transaction=DATA_OF_TODAY_Payment_Transaction,DATA_OF_TODAY_Stock_Transaction=DATA_OF_TODAY_Stock_Transaction,DATA_OF_TODAY_Client_Joine=DATA_OF_TODAY_Client_Joine,DATA_OF_TODAY_Supplier_Joine=DATA_OF_TODAY_Supplier_Joine,DATA_OF_FETCH_STOCK_SUMMARY=DATA_OF_FETCH_STOCK_SUMMARY,WARNING_STOCK_COUNT=WARNING_STOCK_COUNT)
    responsestring=pdfkit.from_string(res,False,configuration=config)
    response = make_response(responsestring) #for inline mode add False attribute here #(responsestring,False)
    response.headers['Content-Type']='application/pdf'
    response.headers['Content-Disposition']=FilneName
    return response


#------------------------------------------------------- ~ END DISPLAY BILL : INVOICE END ~ --------------------------------------------
#==================================================================================================================================
