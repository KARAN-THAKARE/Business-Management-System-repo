from flask import Flask,Blueprint,request,render_template,jsonify
import json

import sqlite3

#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time



CofigurationCashAdjustmentBlueprint = Blueprint('CofigurationCashAdjustmentBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.cashadjustmentconfig.cashadjustmentMapper import *


@CofigurationCashAdjustmentBlueprint.route("/ADD_CASH_ADJUSTMENT.do",methods=['POST'])
def ADD_CASH_ADJUSTMENT():
    Today=dt.today().strftime('%Y-%m-%d')

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    try:
        x = data.get("CashAdjustmentDate").split('T')[0]
        Cash_Adjustment_Date=dt.strptime(x,'%Y-%m-%d').date()
    except Exception as e:
        Cash_Adjustment_Date=data.get("Paid_on")

    try:
        cur.execute(ADJUST_CASH,(data.get("Cash_Adjustment_Type"),data.get("Cash_Adjustment_Date"),data.get("Total_Amount_Paid"),data.get("Payment_Mode"),data.get("Remark"),Today))
        Flag="Success"
        con.commit()
    except Exception as e:
        Flag="Failed"
        con.rollback()

    return Flag;
