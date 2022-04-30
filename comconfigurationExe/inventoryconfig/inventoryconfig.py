from flask import Flask,Blueprint,request,render_template,make_response
import json
import sqlite3
import pdfkit

from jproperties import Properties
configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)

CofigurationInventoryBlueprint = Blueprint('CofigurationInventoryBlueprint', __name__,template_folder='templates',static_folder='static')
from comconfigurationExe.inventoryconfig.inventoryMapper  import *

#-------------------------Home Page----------------------------
@CofigurationInventoryBlueprint.route("/InventoryDashboard")
def InventoryDashboard():

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_INVENTORY_INFO)
    INVENTORY_INFO = cur.fetchall()

    return render_template(configs.get("INVENTORY_DASHBOARD_TEMPLATE").data,INVENTORY_INFO=INVENTORY_INFO);
#-------------------------END HERE-----------------------------

#-------------------------Fetch Inventory List---------------------------
@CofigurationInventoryBlueprint.route("/InventoyListforSearch.do", methods=['GET'])
def InventoyListforSearch():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_INVENTORY_DATA_LIST)
    InventoryData = cur.fetchall()
    for each in InventoryData:
        Insider_Dict['Inventory_ID']=each[0]
        Insider_Dict['Inventory_Name']=each[1]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#-------------------------Get Inventory List---------------------------
@CofigurationInventoryBlueprint.route("/GetSearchedInventoryData.do", methods=['POST'])
def GetSearchedInventoryData():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    ID=data.get("ID")
    cur.execute(GET_SEARCH_INVENTORY_DATA,(ID,ID))
    InventoryData = cur.fetchall()
    for each in InventoryData:
        Insider_Dict['StockID']=each[0]
        Insider_Dict['Product_name']=each[1]
        Insider_Dict['Product_Group']=each[2]
        Insider_Dict['Brand']=each[3]
        Insider_Dict['Item_Code']=each[4]
        Insider_Dict['Serial_number']=each[5]
        Insider_Dict['Purchase_price']=each[6]
        Insider_Dict['Sale_price']=each[7]
        Insider_Dict['MSP']=each[8]
        Insider_Dict['MRP']=each[9]
        Insider_Dict['Unit']=each[10]
        Insider_Dict['HSN']=each[11]
        Insider_Dict['CGST']=each[12]
        Insider_Dict['SGST']=each[13]
        Insider_Dict['Cess']=each[14]
        Insider_Dict['IGST']=each[15]
        Insider_Dict['Product_type']=each[16]
        Insider_Dict['Product_Discription']=each[17]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#-------------------------Update Inventory Information----------------------------
@CofigurationInventoryBlueprint.route("/UpdateInventoryData.do", methods=['POST'])
def UpdateInventoryData():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    print(data.get("StockID"))
    try:
        cur.execute(UPDATE_INVENTORY_INFORMATION,(data.get("Product_name"),data.get("Product_Group"),data.get("Brand"),data.get("Item_Code"),data.get("Serial_number"),data.get("Purchase_price"),data.get("Sale_price"),data.get("MSP"),data.get("MRP"),data.get("Unit"),data.get("HSN"),data.get("CGST"),data.get("SGST"),data.get("Cess"),data.get("IGST"),data.get("Product_type"),data.get("Product_Discription"),int(data.get("StockID"))))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------



#------------------------- Delete Inventory Information----------------------------
@CofigurationInventoryBlueprint.route("/DeleteInventoryData.do", methods=['POST'])
def DeleteInventoryData():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    print(data.get("StockID"))
    try:
        cur.execute(DELETE_INVENTORY_INFORMATION,(int(data.get("StockID")),))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------
