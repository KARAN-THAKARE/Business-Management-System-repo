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

CofigurationSettingBlueprint = Blueprint('CofigurationSettingBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.settingconfig.settingMapper import *


#-------------------------Show Setting ----------------------------
@CofigurationSettingBlueprint.route("/Setting/<Option_ID>")
def Setting(Option_ID):
    return render_template(configs.get("SETTING-TEMPLATE").data,Option_ID=Option_ID);
#-------------------------END HERE-----------------------------


#-------------------------  Setting --> User profile ----------------------------

#@Fetch Profile Details
@CofigurationSettingBlueprint.route("/FetchUserProfileDetails.do")
def FetchUserProfileDetails():
        Insider_Dict = {}
        Outsider_Dict={}
        i=0
        con = sqlite3.connect("IMSConfig.db")
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute(GET_USER_DETAILES)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['User_ID']=each[0]
            Insider_Dict['FN']=each[1]
            Insider_Dict['MN']=each[2]
            Insider_Dict['LN']=each[3]
            Insider_Dict['Address']=each[4]
            Insider_Dict['City']=each[5]
            Insider_Dict['State']=each[6]
            Insider_Dict['ZipCode']=each[7]
            Insider_Dict['PhoneNo']=each[8]
            Insider_Dict['Email']=each[9]
            Insider_Dict['Gender']=each[10]
            Insider_Dict['DOB']=each[11]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1
        return Outsider_Dict;

#@Update User Profile Details
@CofigurationSettingBlueprint.route("/UpdateUserProfileDetails.do", methods=['POST'])
def UpdateUserProfileDetails():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    if(data.get("DOB")!=None):
        x = data.get("DOB").split('T')[0]
        DOB=dt.strptime(x, '%Y-%m-%d').date()
    else:
        DOB=data.get("DOB")
    today=dt.today().strftime('%Y-%m-%d')

    try:
        cur.execute(UPDATE_USER_DETAILES,(data.get("FN"),data.get("MN"),data.get("LN"),data.get("Address"),data.get("City"),data.get("State"),data.get("ZipCode"),data.get("PhoneNo"),data.get("Email"),data.get("Gender"),DOB,today,data.get("User_ID")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#--------------------------------------- END HERE ---------------------------------------
#===========================================================================================

#=============================================================================================
#-------------------------  Setting --> User profile ----------------------------------------
#@Fetch Profile Details
@CofigurationSettingBlueprint.route("/FetchStoreProfileDetails.do")
def FetchStoreProfileDetails():
        Insider_Dict = {}
        Outsider_Dict={}
        i=0
        con = sqlite3.connect("IMSConfig.db")
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute(GET_STORE_DETAILES)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Store_ID']=each[0]
            Insider_Dict['Name']=each[1]
            Insider_Dict['Address']=each[2]
            Insider_Dict['City']=each[3]
            Insider_Dict['State']=each[4]
            Insider_Dict['ZipCode']=each[5]
            Insider_Dict['Contact_No_1']=each[6]
            Insider_Dict['Contact_No_2']=each[7]
            Insider_Dict['Email']=each[8]
            Insider_Dict['GSTIN']=each[9]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1
        return Outsider_Dict;

#@Update User Profile Details
@CofigurationSettingBlueprint.route("/UpdateStoreProfileDetails.do", methods=['POST'])
def UpdateStoreProfileDetails():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    today=dt.today().strftime('%Y-%m-%d')

    try:
        cur.execute(UPDATE_STORE_DETAILES,(data.get("Name"),data.get("Address"),data.get("City"),data.get("State"),data.get("ZipCode"),data.get("Contact_No_1"),data.get("Contact_No_2"),data.get("Email"),data.get("GSTIN"),today,data.get("Store_ID")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#--------------------------------------- END HERE ---------------------------------------
#===========================================================================================
