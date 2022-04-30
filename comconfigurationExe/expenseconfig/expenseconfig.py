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

CofigurationExpenseBlueprint = Blueprint('CofigurationExpenseBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.expenseconfig.expenseMapper import *
from comconfigurationExe.reportconfig.reportMapper import *

#-------------------------   EXPENSE DASHBOARD   -----------------------
#-------------------------------------------------------------------------
@CofigurationExpenseBlueprint.route("/ExpenseDashboard")
def ExpenseDashboard():
    Filter="Select Expense Type"
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    StartDate = (dt.now() - datetime.timedelta(30)).strftime('%Y-%m-%d')
    EndDate=dt.today().strftime('%Y-%m-%d')
    isSuccess="false"
    try:
        cur.execute(ALL__GENERATE_EXPENSE_REPORT,(StartDate,EndDate))
        GENERATED_EXPENSE_DATA = cur.fetchall()
        isSuccess="true"
    except Exception as e:
        GENERATED_EXPENSE_DATA=[]
    return render_template(configs.get("EXPENSE-DASHBOARD-TEMPLATE").data,GENERATED_EXPENSE_DATA=GENERATED_EXPENSE_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate,Filter=Filter);

#@Add Expense
@CofigurationExpenseBlueprint.route("/AddExpense.do", methods=['POST'])
def AddExpense():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    if(data.get("ExpenseDate")!=None):
        x = data.get("ExpenseDate").split('T')[0]
        Expense_Date=dt.strptime(x,'%Y-%m-%d').date()
    else:
        Expense_Date=data.get("ExpenseDate")
    today=dt.today().strftime('%Y-%m-%d')

    try:
        cur.execute(ADD_EXPENSE,(data.get("ExpenseType"),Expense_Date,data.get("ExpenseAmount"),data.get("PaidTo"),data.get("PaidBy"),data.get("MOP"),data.get("Remark"),today))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;

#@Delete Expense
@CofigurationExpenseBlueprint.route("/Delete_Expense.do/<Filter>/<StartDate>/<EndDate>/<ExpenseID>")
def Delete_Expense(Filter,StartDate,EndDate,ExpenseID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    isSuccess="false"
    isDelete="false"

    try:
        cur.execute(DELETE_EXPENSE,(ExpenseID,))
        con.commit()
        isDelete="true"
    except Exception as e:
        con.rollback()

    try:
       if(Filter=='null' or Filter=='All'):
           cur.execute(ALL__GENERATE_EXPENSE_REPORT,(StartDate,EndDate))
           GENERATED_EXPENSE_DATA = cur.fetchall()
       else:
           cur.execute(GENERATE_EXPENSE_REPORT,(Filter,StartDate,EndDate))
           GENERATED_EXPENSE_DATA = cur.fetchall()
       isSuccess="true"
    except Exception as e:
        GENERATED_EXPENSE_DATA=[]

    return render_template(configs.get("EXPENSE-DASHBOARD-TEMPLATE").data,GENERATED_EXPENSE_DATA=GENERATED_EXPENSE_DATA,isSuccess=isSuccess,StartDate=StartDate,EndDate=EndDate,Filter=Filter);




 #---------------------------   END HERE   ------------------------------
#========================================================================
