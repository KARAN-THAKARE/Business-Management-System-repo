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

CofigurationClientBlueprint = Blueprint('CofigurationClientBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.clientconfig.clientMapper import *

#-------------------------Show Client Dashboard----------------------------
@CofigurationClientBlueprint.route("/ClientDashboard")
def ClientDashboard():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_CLIENT_DATA_FOR_TABLE)
    ClientData = cur.fetchall()
    return render_template(configs.get("CLIENT_DASHBOARD_TEMPLATE").data,ClientData=ClientData);

#-------------------------END HERE-----------------------------

#-------------------------Fetch Client data for Table---------------------------
@CofigurationClientBlueprint.route("/FetchClientDateForTable.do", methods=['GET'])
def FetchClientDateForTable():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_CLIENT_DATA_FOR_TABLE)
    ClientData = cur.fetchall()
    for each in ClientData:
        Insider_Dict['Client_ID']=each[0]
        Insider_Dict['Name']=each[1]
        Insider_Dict['ContactNO']=each[2]
        Insider_Dict['Address']=each[3]
        Insider_Dict['PAN_NO']=each[4]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------

#-------------------------Add New Client----------------------------
@CofigurationClientBlueprint.route("/AddClient.do", methods=['POST'])
def AddClient():
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
        cur.execute(ADD_CLIENT,(data.get("FN"),data.get("LN"),data.get("gender"),data.get("address"),data.get("city"),data.get("state"),data.get("pincode"),data.get("contactNumber"),data.get("email"),data.get("pan"),data.get("gstin"),data.get("DT"),data.get("DN"),DOB,ToDay))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Fetch Client List---------------------------
@CofigurationClientBlueprint.route("/ClientListforSearch.do", methods=['GET'])
def ClientListforSearch():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_CLIENT_DATA_LIST)
    ClientData = cur.fetchall()
    for each in ClientData:
        Insider_Dict['Client_Name']=each[0]
        Insider_Dict['Contact_No']=each[1]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------



#-------------------------Get Client List---------------------------
@CofigurationClientBlueprint.route("/GetClientData.do", methods=['POST'])
def GetClientData():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("ID")
    cur.execute(GET_CLIENT_DATA_LIST_USING_ID,(ID,ID,ID))
    ClientData = cur.fetchall()
    for each in ClientData:
        Insider_Dict['Client_ID']=each[0]
        Insider_Dict['First_Name']=each[1]
        Insider_Dict['Last_Name']=each[2]
        Insider_Dict['Gender']=each[3]
        Insider_Dict['Address']=each[4]
        Insider_Dict['City']=each[5]
        Insider_Dict['State']=each[6]
        Insider_Dict['Pincode']=each[7]
        Insider_Dict['Contact_No']=each[8]
        Insider_Dict['email']=each[9]
        Insider_Dict['PAN_NO']=each[10]
        Insider_Dict['GSTIN']=each[11]
        Insider_Dict['DT']=each[12]
        Insider_Dict['DN']=each[13]
        Insider_Dict['DOB']=str(each[14])
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#-------------------------Update Client Information----------------------------
@CofigurationClientBlueprint.route("/UpdateClientInfo.do", methods=['POST'])
def UpdateClientInfo():
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
        cur.execute(UPDATE_CLIENT_INFORMATION,(data.get("First_Name"),data.get("Last_Name"),data.get("Address"),data.get("City"),data.get("State"),data.get("Pincode"),data.get("Contact_No"),data.get("email"),data.get("Gender"),data.get("PAN_NO"),data.get("GSTIN"),data.get("DT"),data.get("DN"),DOB,data.get("Client_ID")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Delete Client Information----------------------------
@CofigurationClientBlueprint.route("/DeleteClientInfo.do", methods=['POST'])
def DeleteClientInfo():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("Client_ID")
    try:
        cur.execute(DELETE_CLIENT_INFORMATION,(ID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Delete Client Information----------------------------
@CofigurationClientBlueprint.route("/DeleteButtonTable.do", methods=['POST'])
def DeleteButtonTable():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("Client_ID")
    try:
        cur.execute(DELETE_CLIENT_INFORMATION,(ID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------



#-------------------------Delete Client Information----------------------------
@CofigurationClientBlueprint.route("/FetchSearchedClientData.do/<Contact_No>", methods=['GET','POST'])
def FetchSearchedClientData(Contact_No):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(SEARCH_CLIENT_DATA_USING_CONTACT_NO,(Contact_No,))
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['Client_ID']=each[0]
        Insider_Dict['Client_Name']=each[1]+" "+each[2]
        Insider_Dict['Client_Address']=each[4]
        Insider_Dict['Client_City']=each[5]
        Insider_Dict['Client_State']=each[6]
        Insider_Dict['Client_pincode']=each[7]
        Insider_Dict['Client_contact_no']=each[8]
        Insider_Dict['Client_Email']=each[9]
        Insider_Dict['Client_PAN_no']=each[10]
        Insider_Dict['Client_GSTIN_no']=each[11]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;

#-------------------------END HERE-----------------------------
