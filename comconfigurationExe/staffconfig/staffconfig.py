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

CofigurationStaffBlueprint = Blueprint('CofigurationStaffBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.staffconfig.staffMapper import *

#-----------------------------------------------------
@CofigurationStaffBlueprint.route("/StaffDashboard")
def StaffDashboard():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_STAFF_DATA_FOR_TABLE)
    StaffData = cur.fetchall()
    return render_template(configs.get("STAFF_DASHBOARD_TEMPLATE").data,StaffData=StaffData);

#-------------------------END HERE-----------------------------

#-------------------------Add New Staff----------------------------
@CofigurationStaffBlueprint.route("/AddStaff.do", methods=['POST'])
def AddStaff():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    if(data.get("DOB")!=None):
        x = data.get("DOB").split('T')[0]
        DOB=dt.strptime(x, '%Y-%m-%d').date()
    else:
        DOB=data.get("DOB")
    ToDay=dt.today().strftime('%Y-%m-%d')
    try:
        cur.execute(ADD_STAFF,(data.get("FN"),data.get("LN"),data.get("address"),data.get("city"),data.get("state"),data.get("pincode"),data.get("gender"),data.get("contactNumber"),data.get("email"),DOB,data.get("Designation"),data.get("SA"),data.get("WH"),data.get("DT"),data.get("DN"),ToDay))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Fetch Staff List---------------------------
@CofigurationStaffBlueprint.route("/StaffListforSearch.do", methods=['GET'])
def StaffListforSearch():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_STAFF_DATA_LIST)
    StaffData = cur.fetchall()
    for each in StaffData:
        Insider_Dict['Staff_Name']=each[0]
        Insider_Dict['Contact_No']=each[1]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------

#-------------------------Get Staff Data---------------------------
@CofigurationStaffBlueprint.route("/GetStaffData.do", methods=['POST'])
def GetStaffData():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("ID")
    cur.execute(GET_STAFF_DATA_USING_ID,(ID,ID,ID))
    StaffData = cur.fetchall()
    for each in StaffData:
        Insider_Dict['Staff_ID']=each[0]
        Insider_Dict['First_Name']=each[1]
        Insider_Dict['Last_Name']=each[2]
        Insider_Dict['Address']=each[3]
        Insider_Dict['City']=each[4]
        Insider_Dict['State']=each[5]
        Insider_Dict['Pincode']=each[6]
        Insider_Dict['Gender']=each[7]
        Insider_Dict['Contact_No']=each[8]
        Insider_Dict['email']=each[9]
        Insider_Dict['DOB']=each[10]
        Insider_Dict['Designation']=each[11]
        Insider_Dict['SA']=each[12]
        Insider_Dict['WH']=each[13]
        Insider_Dict['DT']=each[14]
        Insider_Dict['DN']=each[15]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------

#-------------------------Update Staff Information----------------------------
@CofigurationStaffBlueprint.route("/UpdateStaffInfo.do", methods=['POST'])
def UpdateStaffInfo():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    if(data.get("DOB")!=None and data.get("DOB")!=''):
        x = data.get("DOB").split('T')[0]
        DOB=dt.strptime(x, '%Y-%m-%d').date()
    else:
        DOB=data.get("DOB")
    try:
        cur.execute(UPDATE_STAFF_INFORMATION,(data.get("First_Name"),data.get("Last_Name"),data.get("Address"),data.get("City"),data.get("State"),data.get("Pincode"),data.get("Gender"),data.get("Contact_No"),data.get("email"),DOB,data.get("Designation"),data.get("SA"),data.get("WH"),data.get("DT"),data.get("DN"),data.get("Staff_ID")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Delete Staff Information----------------------------
@CofigurationStaffBlueprint.route("/DeleteStaffInfo.do", methods=['POST'])
def DeleteStaffInfo():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("Staff_ID")
    try:
        cur.execute(DELETE_STAFF_INFORMATION,(ID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Delete Staff Information----------------------------
@CofigurationStaffBlueprint.route("/DeleteButtonTableForStaff.do", methods=['POST'])
def DeleteButtonTableForStaff():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("Staff_ID")
    try:
        cur.execute(DELETE_STAFF_INFORMATION,(ID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------


#-------------------------Add new Invoice----------------------------
@CofigurationStaffBlueprint.route("/SalaryDashboard")
def SalaryDashboard():
    return render_template(configs.get("SALARY_DASHBOARD_TEMPLATE").data);

#-------------------------END HERE-----------------------------
