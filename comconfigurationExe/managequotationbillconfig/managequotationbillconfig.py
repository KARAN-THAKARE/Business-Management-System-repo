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


CofigurationManageQuotationBillBlueprint = Blueprint('CofigurationManageQuotationBillBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.managequotationbillconfig.managequotationbillMapper import *
from comconfigurationExe.SMTPServer.SMTP  import *


configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)
#==================================================================================
#------------------------------ RENDER DASHBOARD : Quotation ------------------------
@CofigurationManageQuotationBillBlueprint.route("/ManageQuotation.do")
def ManageQuotation():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_OPEN_DATA)
    DATA_FOR_OPEN = cur.fetchall()

    return render_template(configs.get("MANAGE_QUOTATION_DASHBOARD_TEMPLATE").data,DATA_FOR_OPEN=DATA_FOR_OPEN);

#------------------------- ~ END RENDER DASHBOARD : Invoice END ~ ------------------
#==================================================================================

#=============================================================================================================
#------------------------------ SEND QUOTATION ON EMAIL ON CLICK (QUOTATION DASHBOARD) ------------------------
@CofigurationManageQuotationBillBlueprint.route("/SEND_QUOTATION_ON_MAIL.do/<ID>",methods=["POST"])
def SEND_QUOTATION_ON_MAIL(ID):
    TEMPLATE_ID=1
    WantedToAttachFile=True
    Result=Send_Mail(TEMPLATE_ID,ID,"Short",WantedToAttachFile,"Quotation")
    return Result
#------------------------- ~ END ========================= END ~ ------------------
#==================================================================================
