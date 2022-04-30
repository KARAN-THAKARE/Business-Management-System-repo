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

CofigurationSupplierBlueprint = Blueprint('CofigurationSupplierBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.supplierconfig.supplierMapper import *

#-------------------------SupplierDashboard----------------------------
@CofigurationSupplierBlueprint.route("/SupplierDashboard")
def SupplierDashboard():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_SUPPLIER_DATA_FOR_TABLE)
    SupplierData = cur.fetchall()
    return render_template(configs.get("SUPPLIER_DASHBOARD_TEMPLATE").data,SupplierData=SupplierData);


#-------------------------END HERE-----------------------------



#-------------------------Add New Supplier----------------------------
@CofigurationSupplierBlueprint.route("/AddSupplier.do", methods=['POST'])
def AddSupplier():
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
        cur.execute(ADD_SUPPLIER,(data.get("FN"),data.get("LN"),data.get("gender"),data.get("address"),data.get("city"),data.get("state"),data.get("pincode"),data.get("contactNumber"),data.get("email"),data.get("pan"),data.get("gstin"),data.get("DT"),data.get("DN"),DOB,ToDay))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Fetch Supplier List---------------------------
@CofigurationSupplierBlueprint.route("/SupplierListforSearch.do", methods=['GET'])
def SupplierListforSearch():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_SUPPLIER_DATA_LIST)
    SupplierData = cur.fetchall()
    for each in SupplierData:
        Insider_Dict['Supplier_Name']=each[0]
        Insider_Dict['Contact_No']=each[1]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------



#-------------------------Get Supplier List---------------------------
@CofigurationSupplierBlueprint.route("/GetSupplierData.do", methods=['POST'])
def GetSupplierData():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("ID")
    cur.execute(GET_SUPPLIER_DATA_LIST_USING_ID,(ID,ID,ID))
    SupplierData = cur.fetchall()
    for each in SupplierData:
        Insider_Dict['Supplier_ID']=each[0]
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


#-------------------------Update Supplier Information----------------------------
@CofigurationSupplierBlueprint.route("/UpdateSupplierInfo.do", methods=['POST'])
def UpdateSupplierInfo():
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
        cur.execute(UPDATE_SUPPLIER_INFORMATION,(data.get("First_Name"),data.get("Last_Name"),data.get("Address"),data.get("City"),data.get("State"),data.get("Pincode"),data.get("Contact_No"),data.get("email"),data.get("Gender"),data.get("PAN_NO"),data.get("GSTIN"),data.get("DT"),data.get("DN"),DOB,data.get("Supplier_ID")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Delete supllier Information----------------------------
@CofigurationSupplierBlueprint.route("/DeleteSupplierInfo.do", methods=['POST'])
def DeleteSupplierInfo():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("Supplier_ID")
    try:
        cur.execute(DELETE_SUPPLIER_INFORMATION,(ID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Delete Client Information----------------------------
@CofigurationSupplierBlueprint.route("/DeleteButtonTableForSupplier.do", methods=['POST'])
def DeleteButtonTableForSupplier():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("Supplier_ID")
    try:
        cur.execute(DELETE_SUPPLIER_INFORMATION,(ID,))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------




#-------------------------Fetch searched Supplier ---------------------------
@CofigurationSupplierBlueprint.route("/FetchSearchedSupplierData.do/<Contact_NO>", methods=['GET'])
def FetchSearchedSupplierData(Contact_NO):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(SEARCH_SUPPLIER_BY_CONTACT_NO,(Contact_NO,))
    SupplierData = cur.fetchall()
    for each in SupplierData:
        Insider_Dict['ID']=each[0]
        Insider_Dict['Supplier_Name']=each[1]
        Insider_Dict['Contact_No']=each[2]
        Insider_Dict['FullAddress']=each[3]
        Insider_Dict['Email']=each[4]
        Insider_Dict['PanNo']=each[5]
        Insider_Dict['GSTIN']=each[6]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------
