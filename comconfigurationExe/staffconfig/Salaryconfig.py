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

CofigurationSalaryBlueprint = Blueprint('CofigurationSalaryBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.staffconfig.staffMapper import *


#==================================================================================================================================
#-------------------------------------------------------------- AMOUNT IN WORDS ---------------------------------------------------
def number_to_word(number):
    def get_word(n):
        words={ 0:"", 1:"One", 2:"Two", 3:"Three", 4:"Four", 5:"Five", 6:"Six", 7:"Seven", 8:"Eight", 9:"Nine", 10:"Ten", 11:"Eleven", 12:"Twelve", 13:"Thirteen", 14:"Fourteen", 15:"Fifteen", 16:"Sixteen", 17:"Seventeen", 18:"Eighteen", 19:"Nineteen", 20:"Twenty", 30:"Thirty", 40:"Forty", 50:"Fifty", 60:"Sixty", 70:"Seventy", 80:"Eighty", 90:"Ninty" }
        if n<=20:
            return words[n]
        else:
            ones=n%10
            tens=n-ones
            return words[tens]+" "+words[ones]

    def get_all_word(n):
        d=[100,10,100,100]
        v=["","Hundred And","Thousand","lakh"]
        w=[]
        for i,x in zip(d,v):
            t=get_word(n%i)
            if t!="":
                t+=" "+x
            w.append(t.rstrip(" "))
            n=n//i
        w.reverse()
        w=' '.join(w).strip()
        if w.endswith("And"):
            w=w[:-3]
        return w

    arr=str(number).split(".")
    number=int(arr[0])
    crore=number//10000000
    number=number%10000000
    word=""
    if crore>0:
        word+=get_all_word(crore)
        word+=" crore "
    word+=get_all_word(number).strip()+" Rupees"
    if len(arr)>1:
         if len(arr[1])==1:
            arr[1]+="0"
         word+=" and "+get_all_word(int(arr[1]))+" paisa"
    return word

#------------------------------------------------------- ~ END AMOUNT IN WORDS  END ~ --------------------------------------------
#==================================================================================================================================



#===============================================================================
#----------------------------- Fetch Staff Data --------------------------------
@CofigurationSalaryBlueprint.route("/FetchStaffDataForSalary.do", methods=['POST'])
def FetchStaffDataForSalary():
    Insider_Dict = {}
    Outsider_Dict={}
    Salary=[]
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    cur.execute(FETCH_STAFF_DATA_FOR_SALARY)
    DATA = cur.fetchall()

    for each in DATA:
        Insider_Dict['ID']=each[0]
        Insider_Dict['Name']= str(each[1]) + " "+ str(each[2])
        Insider_Dict['Designation']=each[3]
        Insider_Dict['Salary_Amount']=str(each[4])
        Insider_Dict['Salary_Amount_In_Words']=number_to_word(int(each[4])) + " Only"

        cur.execute(FETCH_SALARY_TABLE_INFO,(data.get("Month"),str(data.get("Year")),int(each[0])))
        FETCH_SALARY_TABLE_INFORMATION = cur.fetchall()
        for s in FETCH_SALARY_TABLE_INFORMATION:
            Insider_Dict['Created_Date']=s[1]
            Insider_Dict['TotalAmtPaid']=s[2]
            Insider_Dict['Totalpaidcount']=s[3]
            Insider_Dict['salarycompleteinpercent']=s[4]
            if(s[5]==None):
                Insider_Dict['pendingamt']=each[4]
            else:
                Insider_Dict['pendingamt']=s[5]

        cur.execute(FETCH_PREVIOUS_PAYMENT_INFO,(data.get("Month"),str(data.get("Year")),int(each[0])))
        FETCH_PREVIOUS_PAYMENT_INFORMATION = cur.fetchall()
        for prev_payment in FETCH_PREVIOUS_PAYMENT_INFORMATION:
            Insider_Dict['prev_payment_amt']=prev_payment[0]
            Insider_Dict['prev_Paid_on']=prev_payment[1]
            Insider_Dict['prev_payment_amt_in_words']=number_to_word(int(prev_payment[0])) + " Only"
            
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE---------------------------------------------
#===============================================================================

#===============================================================================
#----------------------------- Fetch Payment History ---------------------------
@CofigurationSalaryBlueprint.route("/Fetch_Payment_History.do", methods=['POST'])
def Fetch_Payment_History():
    Insider_Dict = {}
    Outsider_Dict={}
    Salary=[]
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    cur.execute(FETCH_SALARY_PAYMENT_HISTORY,(data.get("Month"),str(data.get("Year")),int(data.get("id"))))
    FETCH_SALARY_PAYMENT_HISTORY_DATA = cur.fetchall()

    for each in FETCH_SALARY_PAYMENT_HISTORY_DATA:
        Insider_Dict['salarypaid_id']=each[0]
        Insider_Dict['staff_id']= each[1]
        Insider_Dict['salarypaid']=each[2]
        Insider_Dict['paidon']=each[3]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE---------------------------------------------
#===============================================================================



#===============================================================================
#---------------------------------PAY SALARY TO EMP ----------------------------
@CofigurationSalaryBlueprint.route("/Pay_Salary.do", methods=['POST'])
def Pay_Salary():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    today=dt.today().strftime('%Y-%m-%d')
    try:
        cur.execute(PAY_SALARY,(data.get("ID"),data.get("Amount"),data.get("Month"),str(data.get("Year")),today))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE---------------------------------------------
#===============================================================================
