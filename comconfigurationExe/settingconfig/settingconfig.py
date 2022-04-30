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

ServerProperties = Properties()
with open('Exe.properties', 'rb') as read_prop:
    ServerProperties.load(read_prop)

CofigurationSettingBlueprint = Blueprint('CofigurationSettingBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.settingconfig.settingMapper import *
from comconfigurationExe.configuration.configuration import *

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

#@Fetch Software Information
@CofigurationSettingBlueprint.route("/FetchSoftwareInformation.do")
def FetchSoftwareInformation():
        Insider_Dict = {}
        Outsider_Dict={}
        i=0
        con = sqlite3.connect("IMSConfig.db")
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute(GET_SYSTEM_INFORM)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['SOFTWARE_CODE']=ServerProperties.get("CLIENT_ALLOCATED_SOFTWARE_CODE").data
            Insider_Dict['AUTH_CODE']=each[3]
            Insider_Dict['REGISTRATION_DATE']=each[4]
            Insider_Dict['SOFTWARE_PLAN']=ServerProperties.get("CLIENT_ALLOCATED_SOFTWARE_PLAN").data
            Insider_Dict['START_DATE']=each[5]
            Insider_Dict['END_DATE']=EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR_GET_DD_METHOD()
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1

        return Outsider_Dict;
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


#=============================================================================================
#-------------------------  Setting --> Subscription ----------------------------------
#@Add New Authentication Key  ==> Renewal of plan
@CofigurationSettingBlueprint.route("/RenewPlan.do" ,methods=['POST'])
def RenewPlan():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    today=dt.today().strftime('%Y-%m-%d')
    EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR={}

    try:
        cur.execute(RENEW_PLANS,(data.get("key1"),data.get("key2"),data.get("key3"),data.get("key4"),today))
        con.commit()
        EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR=EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR_METHOD()
    except Exception as e:
        print(e)
        EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR["isSuccess"]=False
        con.rollback()
    return EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR;

#@Add New Authentication Key  ==> Extened of plan through Settings
@CofigurationSettingBlueprint.route("/ExtenedSubscription.do" ,methods=['POST'])
def ExtenedSubscription():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    today=dt.today().strftime('%Y-%m-%d')
    EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR={}

    cur.execute(FETCH_DATA_FROM_CONFIG)
    DATA = cur.fetchall()
    for EACH_AUTH_KEY in DATA:
        PREV_AUTHENTICATION_KEY_1=str(EACH_AUTH_KEY[0])
        PREV_AUTHENTICATION_KEY_2=str(EACH_AUTH_KEY[1])
        PREV_AUTHENTICATION_KEY_3=str(EACH_AUTH_KEY[2])
        PREV_AUTHENTICATION_KEY_4=str(EACH_AUTH_KEY[3])
        PREV_UPDATED_DATE=str(EACH_AUTH_KEY[5])

    try:
        cur.execute(RENEW_PLANS,(data.get("key1"),data.get("key2"),data.get("key3"),data.get("key4"),today))
        con.commit()
        EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR=EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR_METHOD()
        if(EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR[SOFTWARE]):
            if(EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR[HARDWARE]!=GOOGLE_AUTH_ONE): #if authetication failed with some reasone -- we need to roll back
                cur.execute(RENEW_PLANS,(PREV_AUTHENTICATION_KEY_1,PREV_AUTHENTICATION_KEY_2,PREV_AUTHENTICATION_KEY_3,PREV_AUTHENTICATION_KEY_4,PREV_UPDATED_DATE))
                con.commit()
        else:
            #if authetication failed with some reasone -- we need to roll back
            cur.execute(RENEW_PLANS,(PREV_AUTHENTICATION_KEY_1,PREV_AUTHENTICATION_KEY_2,PREV_AUTHENTICATION_KEY_3,PREV_AUTHENTICATION_KEY_4,PREV_UPDATED_DATE))
            con.commit()

    except Exception as e:
        print(e)
        EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR["isSuccess"]=False
        con.rollback()
    return EXE_CONFIGUARTION_SPACETRS_MODEM_CLIENT_IP_DETECTOR;
#--------------------------------------- END HERE ---------------------------------------
#===========================================================================================



#=============================================================================================
#-------------------------  Setting --> Terms and Condition ----------------------------------

#@Fetch Terms and Condition
@CofigurationSettingBlueprint.route("/FetchTermsAndCondition.do")
def FetchTermsAndCondition():
        Insider_Dict = {}
        Outsider_Dict={}
        i=0
        con = sqlite3.connect("IMSConfig.db")
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        cur.execute(FETCH_TERMS)
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['ID']=each[0]
            Insider_Dict['terms']=each[1]
            Insider_Dict['isActiveForInvoice']=each[2]
            Insider_Dict['isActiveForPurchase']=each[3]
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1
        return Outsider_Dict;

#@Add Terms and Condition
@CofigurationSettingBlueprint.route("/AddTerms.do" ,methods=['POST'])
def AddTerms():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    today=dt.today().strftime('%Y-%m-%d')

    try:
        cur.execute(ADD_TERMS,(data.get("terms"),"false","false",today))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;

#@Update terms and condition
@CofigurationSettingBlueprint.route("/UpdateTerms.do",methods=['POST'])
def UpdateTerms():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    try:
        cur.execute(UPDATE_TERMS,(data.get("Update_Terms_Condition"),data.get("TERM_ID")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;

#@Delete terms and condition
@CofigurationSettingBlueprint.route("/DeleteTerms.do/<TermID>",methods=['POST'])
def DeleteTerms(TermID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute(DELETE_TERMS,(TermID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;


#@Update terms and conditions access for invoice and purchase
@CofigurationSettingBlueprint.route("/UpdateTermsAccess.do/<TermID>/<ForWhich>/<ForWhichStatus>",methods=['POST'])
def UpdateTermsAccess(TermID,ForWhich,ForWhichStatus):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        if(ForWhich=='Invoice'):
            cur.execute(UPDATE_TERMS_ACCESS_FOR_INVOICE,(ForWhichStatus,TermID))
        else:
            cur.execute(UPDATE_TERMS_ACCESS_FOR_PURCHASE,(ForWhichStatus,TermID))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;

#--------------------------------------- END HERE ---------------------------------------
#===========================================================================================
