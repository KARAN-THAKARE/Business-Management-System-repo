from flask import Flask,Blueprint,request,render_template,make_response
import json
import sqlite3
import pdfkit

from jproperties import Properties
ServerConfigs = Properties()
with open('Server.properties', 'rb') as read_prop:
    ServerConfigs.load(read_prop)

configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)

CofigurationStockDashboardBlueprint = Blueprint('CofigurationStockDashboardBlueprint', __name__,template_folder='templates',static_folder='static')
from comconfigurationExe.stockconfig.stockMapper  import *

#===============================================================================
#-------------------------- Stock Dashboard Page -------------------------------
@CofigurationStockDashboardBlueprint.route("/StockDashboard")
def StockDashboard():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_STOCK_DATA)
    STOCK_DATA = cur.fetchall()

    cur.execute(FETCH_STOCK_PREV_CREDIT_DATA)
    PREV_CREDIT_DATA = cur.fetchall()

    cur.execute(FETCH_STOCK_PREV_DEBIT_DATA)
    PREV_DEBIT_DATA = cur.fetchall()
 
    WARNING_STOCK_COUNT=int(ServerConfigs.get("WARNING_STOCK_COUNT").data)

    return render_template(configs.get("STOCK_DASHBOARD_TEMPLATE").data,STOCK_DATA=STOCK_DATA,PREV_CREDIT_DATA=PREV_CREDIT_DATA,PREV_DEBIT_DATA=PREV_DEBIT_DATA,WARNING_STOCK_COUNT=WARNING_STOCK_COUNT);
#===============================================================================
#===============================================================================
