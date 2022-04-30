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

CofigurationReminderBlueprint = Blueprint('CofigurationReminderBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.reminderconfig.reminderMapper import *

#------------------------- reminder ----------------------------
@CofigurationReminderBlueprint.route("/ReminderDashboard")
def ReminderDashboard():
    return render_template(configs.get("REMINDER-DASHBOARD-TEMPLATE").data);

#-------------------------END HERE-----------------------------

#
# #-------------------------Add new reminder----------------------------
# @CofigurationReminderBlueprint.route("/AddReminder.do", methods=['POST'])
# def AddReminder():
#     con = sqlite3.connect("IMSConfig.db")
#     con.row_factory = sqlite3.Row
#     cur = con.cursor()
#     data = json.loads(request.data.decode())
#     x = data.get("Reminder_date").split('T')[0]
#     Reminder_date=dt.strptime(x, '%Y-%m-%d').date()
#     try:
#         cur.execute(ADD_REMINDER,(data.get("Reminder_message"),Reminder_date))
#         status="Success"
#         con.commit()
#     except Exception as e:
#         status="Failed"
#         con.rollback()
#     return status;
#
# #-------------------------END HERE-----------------------------


#============================================================================
#------------------------- FETCH EVENT LIST -----------------------------
@CofigurationReminderBlueprint.route("/FetchEvent.do", methods=['GET'])
def FetchEvent():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_EVENT_LIST)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['ID']=each[0]
        Insider_Dict['Title']=each[1]
        Insider_Dict['StartDate']=each[2]
        Insider_Dict['EndDate']=each[3]
        Insider_Dict['isAllDay']=each[4]
        Insider_Dict['Created_Date']=each[5]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#--------------------- END FETCH EVENT LIST END -------------------------
#============================================================================

#============================================================================
#------------------------- Add new Event ----------------------------
@CofigurationReminderBlueprint.route("/AddEvent.do", methods=['POST'])
def AddEvent():
    Result={}
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    TODAY=dt.today().strftime('%Y-%m-%d')
 
    try:
        cur.execute(ADD_EVENT,(data.get("Title"),data.get("Selected_Start_Date"),data.get("Selected_End_Date"),data.get("Selected_AllDay"),data.get("Reminder_Start_Date"),data.get("Reminder_End_Date"),TODAY))
        Result["status"]="Success"
        con.commit()

        cur.execute(FETCH_LATEST_EVENT_ID)
        DATA = cur.fetchall()
        for each in DATA:
            Result["ID"]=each[0]

    except Exception as e:
        Result["status"]="Failed"
        con.rollback()
    return Result;

#-------------------------END HERE-----------------------------
#============================================================================

#============================================================================
#------------------------------- Edit Event ---------------------------------
@CofigurationReminderBlueprint.route("/EditEvent.do/<ID>/<TITLE>",methods=['POST'])
def EditEvent(ID,TITLE):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute(EDIT_EVENT,(TITLE,ID))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;

#------------------------------- END HERE ----------------------------------
#============================================================================

#============================================================================
#------------------------------- Delete Event ---------------------------------
@CofigurationReminderBlueprint.route("/DeleteEvent.do/<ID>",methods=['POST'])
def DeleteEvent(ID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute(DELETE_EVENT,(ID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;

#------------------------------- Delete HERE ----------------------------------
#============================================================================
