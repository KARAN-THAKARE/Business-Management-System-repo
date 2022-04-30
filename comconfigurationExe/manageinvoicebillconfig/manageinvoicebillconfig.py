from flask import Flask,Blueprint,request,render_template,jsonify
import json

import sqlite3

#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time

CofigurationManageInvoiceBillBlueprint = Blueprint('CofigurationManageInvoiceBillBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.manageinvoicebillconfig.manageinvoicebillMapper import *
from comconfigurationExe.SMTPServer.SMTP  import *

from jproperties import Properties
configure = Properties()
with open('example.properties', 'rb') as read_prop:
    configure.load(read_prop)
#==================================================================================
#------------------------------ RENDER DASHBOARD : Invoice ------------------------
@CofigurationManageInvoiceBillBlueprint.route("/ManageInvoice.do")
def ManageInvoice():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_OPEN_DATA)
    DATA_FOR_OPEN = cur.fetchall()

    cur.execute(FETCH_EMI_DATA)
    DATA_FOR_EMI = cur.fetchall()

    cur.execute(FETCH_RETURN_DATA)
    DATA_FOR_RETURN = cur.fetchall()

    cur.execute(FETCH_COMPLETED_DATA)
    DATA_FOR_COMPLETED = cur.fetchall()

    return render_template(configure.get("MANAGE_INVOICES_DASHBOARD_TEMPLATE").data,DATA_FOR_OPEN=DATA_FOR_OPEN,DATA_FOR_EMI=DATA_FOR_EMI,DATA_FOR_RETURN=DATA_FOR_RETURN,DATA_FOR_COMPLETED=DATA_FOR_COMPLETED);

#------------------------- ~ END RENDER DASHBOARD : Invoice END ~ ------------------
#==================================================================================

#=============================================================================================================
#------------------------------ SEND INVOICE ON EMAIL ON CLICK (INVOICE DASHBOARD) ------------------------
@CofigurationManageInvoiceBillBlueprint.route("/SEND_INVOICE_ON_MAIL.do/<ID>",methods=["POST"])
def SEND_INVOICE_ON_MAIL(ID):
    TEMPLATE_ID=1
    WantedToAttachFile=True
    Result=Send_Mail(TEMPLATE_ID,ID,"Short",WantedToAttachFile,"Invoice")
    return Result
#------------------------- ~ END ========================= END ~ ------------------
#==================================================================================
