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

CofigurationQuickSearchBlueprint = Blueprint('CofigurationQuickSearchBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.quicksearchconfig.quicksearchMapper import *

#=================================================================
#------------------------- Quick Search --> Client ----------------
@CofigurationQuickSearchBlueprint.route("/QuickSearchDashboard.do/<Option>/<ID>")
def QuickSearchDashboard(Option,ID):
    return render_template(configs.get("QUICK-SEARCH-TEMPLATE").data,Option=Option,ID=ID);
#-------------------------END HERE-----------------------------

# #------------------------- Quick Search --> Client Or Supplier ----------------
# @CofigurationQuickSearchBlueprint.route("/Search_Client_Supplier_Data.do/<option>/<ID>")
# def Search_Client_Supplier_Data(option,ID):
#         Insider_Dict = {}
#         Outsider_Dict={}
#         i=0
#         con = sqlite3.connect("IMSConfig.db")
#         con.row_factory = sqlite3.Row
#         cur = con.cursor()
#
#         if(option=='Client'):
#             cur.execute(SEARCH_CLIENT,(ID,))
#             DATA = cur.fetchall()
#         else:
#             cur.execute(SEARCH_SUPPLIER,(ID,))
#             DATA = cur.fetchall()
#
#         for each in DATA:
#             Insider_Dict['ID']=each[0]
#             Insider_Dict['FN']=each[1]
#             Insider_Dict['LN']=each[2]
#             Insider_Dict['Gender']=each[3]
#             Insider_Dict['Address']=each[4]
#             Insider_Dict['City']=each[5]
#             Insider_Dict['State']=each[6]
#             Insider_Dict['pincode']=each[7]
#             Insider_Dict['ContactNo']=each[8]
#             Insider_Dict['Email']=each[9]
#             Insider_Dict['PAN_NO']=each[10]
#             Insider_Dict['GSTIN']=each[11]
#             Insider_Dict['DT']=each[12]
#             Insider_Dict['DN']=each[13]
#             Insider_Dict['DOB']=each[14]
#             Insider_Dict['CreatedDate']=each[15]
#             Insider_Dict['isActive']=each[16]
#             Outsider_Dict[i]=Insider_Dict
#             Insider_Dict = {}
#             i=i+1
#         return Outsider_Dict;

#=================================================================
#------------------------- Quick Search --> Purchase Order ----------------
@CofigurationQuickSearchBlueprint.route("/Search_Purchase_Order_OR_Invoice.do/<option>/<ID>",methods=['POST'])
def Search_Purchase_Order_OR_Invoice(option,ID):
    IResult = {}
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    try:
        if(option=='Purchase Order'):
            cur.execute(SEARCH_PURCHASE_ORDER,(ID,ID))
            DATA = cur.fetchall()
            IResult['isSuccess']='true'
        else:
            cur.execute(SEARCH_INVOICES,(ID,))
            DATA = cur.fetchall()
            IResult['isSuccess']='true'
    except Exception as e:
        IResult['isSuccess']='false'

    if(len(DATA)>0):
        IResult['isFound']='true'
    else:
        IResult['isFound']='false'

    return IResult;


#-------------------------END HERE-----------------------------
