from flask import Flask,Blueprint,request,render_template
import json
import sqlite3
from fiscalyear import *


#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time
from fiscalyear import *

from jproperties import Properties
configs = Properties()
with open('example.properties', 'rb') as read_prop:
    configs.load(read_prop)

CofigurationAddNewPurchaseBillBlueprint = Blueprint('CofigurationAddNewPurchaseBillBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.addnewpurchasebillconfig.addnewpurchasebillMapper import *

#============================= Add new Purchase Bill ================================
@CofigurationAddNewPurchaseBillBlueprint.route("/AddNewPurchase.do")
def AddNewPurchase():
    return render_template(configs.get("ADD_NEW_PURCHASE_TEMPLATE").data);
#=================================== END HERE ======================================

#================================ Get Purchase Numbers ============================
@CofigurationAddNewPurchaseBillBlueprint.route("/GetpurchaseBillNumber.do")
def GetpurchaseBillNumber():
    a=str(FiscalYear.current())
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_PURCHASE_NO)
    DATA = cur.fetchall()
    for each in DATA:
        Insider_Dict['PurchaseBillNo']=a[2::]+str(each[0])
        Insider_Dict['PurchaseOrderNo']="PO"+a[2::]+str(each[1])
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#=================================== END HERE ======================================

#=================================== Fetch Supplier List ======================================
@CofigurationAddNewPurchaseBillBlueprint.route("/FetchSupplierNameList.do", methods=['GET'])
def FetchSupplierNameList():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(GET_SUPPLIER_DATA_LIST)
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

#-------------------------Add new stock----------------------------
@CofigurationAddNewPurchaseBillBlueprint.route("/AddNewStockDetails.do",methods=['POST'])
def AddNewStockDetails():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    Date=dt.today().strftime('%Y-%m-%d')
    try:
        cur.execute(ADD_NEW_STOCK,(data.get("PN"),data.get("group"),data.get("brand"),data.get("IC"),data.get("SN"),data.get("PP"),data.get("SP"),data.get("MSP"),data.get("MRP"),data.get("unit"),data.get("HSN"),data.get("CGST"),data.get("SGST"),data.get("cess"),data.get("IGST"),data.get("product_type"),data.get("PDiscription"),Date))

        #@fetch recently added stock ID
        cur.execute(FETCH_STOCK_ID,(data.get("PN"),))
        DATA = cur.fetchall()
        for each in DATA:
            Recently_Added_Stock_ID=each[0]

        #@Create new role in stock summary for newly added product item
        cur.execute(CREATE_NEW_FIELDS_IN_STOCK_SUMMARY,(Recently_Added_Stock_ID,0,0,0,'true',Date))

        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#-------------------------Fetch Item List-----------------------------
@CofigurationAddNewPurchaseBillBlueprint.route("/FetchItem.do",methods=['GET'])
def FetchItem():
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_ITEM_LIST)
    FetchItemDetails = cur.fetchall()
    for each in FetchItemDetails:
        Insider_Dict['StockID']=each[0]
        Insider_Dict['Item_name']=each[1]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#-------------------------END HERE-----------------------------

#-------------------------Fetch Selected Item Details -----------------------------
@CofigurationAddNewPurchaseBillBlueprint.route("/FetchSelectedItemDetails.do",methods=['POST'])
def FetchSelectedItemDetails():
    Insider_Dict = {}
    Outsider_Dict={}
    data = json.loads(request.data.decode())
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute(FETCH_SELECTED_ITEM_DETAILS_QUERY,(data.get("selectedItemName"),))
        FETCH_SELECTED_ITEM_DETAILS = cur.fetchall()
        for each in FETCH_SELECTED_ITEM_DETAILS:
            Insider_Dict['StockID']=each[0]
            Insider_Dict['Product_name']=each[1]
            Insider_Dict['Product_group']=each[2]
            Insider_Dict['Brand']=each[3]
            Insider_Dict['Item_code']=each[4]
            Insider_Dict['SN']=each[5]
            Insider_Dict['PP']=each[6]
            Insider_Dict['SP']=each[7]
            Insider_Dict['MSP']=each[8]
            Insider_Dict['MRP']=each[9]
            Insider_Dict['Unit']=each[10]
            Insider_Dict['HSN']=each[11]
            Insider_Dict['CGST']=each[12]
            Insider_Dict['SGST']=each[13]
            Insider_Dict['Cess']=each[14]
            Insider_Dict['IGST']=each[15]
            Insider_Dict['PT']=each[16]
            Insider_Dict['PD']=each[17]
            Insider_Dict['Created_Date']=each[18]
            Outsider_Dict[0]=Insider_Dict
            Insider_Dict = {}
    except Exception as e:
        Outsider_Dict={}

    return Outsider_Dict;
#-------------------------END HERE-----------------------------

#------------------------- ADD STOCK TO BUCKET OF GIVEN INVOICE ID----------------------------
@CofigurationAddNewPurchaseBillBlueprint.route("/Add_Stock_To_Bucket.do",methods=['POST'])
def Add_Stock_To_Bucket():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    #--------------------- Set Null To 0------------------------
    #@For Discount
    if(data.get("disc")==None):
        disc=0
    else:
        disc=data.get("disc")

    #@For cgst
    if(data.get("cgst")==None):
        cgst=0
    else:
        cgst=data.get("cgst")

    #@For sgst
    if(data.get("sgst")==None):
        sgst=0
    else:
        sgst=data.get("sgst")

    #@For igst
    if(data.get("igst")==None):
        igst=0
    else:
        igst=data.get("igst")

    #@For cess
    if(data.get("cess")==None):
        cess=0
    else:
        cess=data.get("cess")

    #-------------------------------------


    try:
        cur.execute(ADD_STOCK_TO_BUCKET,(data.get("billno"),data.get("ON"),data.get("Stock_ID"),data.get("Stock_Name"),data.get("qty"),data.get("pp"),disc,cgst,sgst,igst,cess,data.get("amt")))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------


#------------------------- Fetch Bucket Item----------------------------
@CofigurationAddNewPurchaseBillBlueprint.route("/Fetch_Bucket_Item.do",methods=['POST'])
def Fetch_Bucket_Item():
    Sub_Total=0
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    try:
        cur.execute(FETCH_BUCKET_ITEM_FOR_GIVEN_BILL,(data.get("billno"),))
        Bucket_Item = cur.fetchall()

        for each in Bucket_Item:
            Insider_Dict['SrNo']=each[0]
            Insider_Dict['ID']=each[1]
            Insider_Dict['P_Bill_NO']=each[2]
            Insider_Dict['P_Order_NO']=each[3]
            Insider_Dict['Stock_ID']=each[4]
            Insider_Dict['Stock_Name']=each[5]
            Insider_Dict['Qty']=each[6]
            Insider_Dict['Purchase_Price']=each[7]
            Insider_Dict['Discount']=each[8]
            Insider_Dict['CGST']=each[9]
            Insider_Dict['SGST']=each[10]
            Insider_Dict['IGST']=each[11]
            Insider_Dict['Cess']=each[12]
            Insider_Dict['Amount']=each[13]
            Sub_Total=Sub_Total+float(each[13])
            Insider_Dict['Sub_Total']=Sub_Total
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1

        status="Success"
    except Exception as e:
        status="Failed"

    return Outsider_Dict;
#-------------------------END HERE-----------------------------



#------------------------- Delete Item From Bucket ----------------------------
@CofigurationAddNewPurchaseBillBlueprint.route("/Delete_Item_From_Bucket.do",methods=['POST'])
def Delete_Item_From_Bucket():
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())
    try:
        cur.execute(DELETE_ITEM_FROM_BUCKET,(data.get("ID"),))
        status="Success"
        con.commit()
    except Exception as e:
        status="Failed"
        con.rollback()
    return status;
#-------------------------END HERE-----------------------------

#------------------------- SavePurchaseBill ----------------------------

@CofigurationAddNewPurchaseBillBlueprint.route("/SavePurchaseBill.do",methods=['POST'])
def SavePurchaseBill():
    Bill_Date=''
    Due_Date=''
    Purchase_Order_Date=''
    Result={}

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    data = json.loads(request.data.decode())

    #--------------------- Set Null To 0------------------------
    #@For Discount in percentage
    if(data.get("Disc_in_percentage")==None):
        Disc_in_percentage=0
    else:
        Disc_in_percentage=data.get("Disc_in_percentage")

    #@For Discount in amount
    if(data.get("Disc_in_amt")==None):
        Disc_in_amt=0
    else:
        Disc_in_amt=data.get("Disc_in_amt")

    #@For Shipping amount
    if(data.get("ShippingAmt")==None):
        ShippingAmt=0
    else:
        ShippingAmt=data.get("ShippingAmt")
    #----------------------------------------------------------

    try:
        x = data.get("BD").split('T')[0]
        Bill_Date=dt.strptime(x, '%Y-%m-%d').date()
    except Exception as e:
        Bill_Date=data.get("BD")

    try:
        x = data.get("DD").split('T')[0]
        Due_Date=dt.strptime(x, '%Y-%m-%d').date()
    except Exception as e:
        Due_Date=data.get("DD")

    try:
        x = data.get("pod").split('T')[0]
        Purchase_Order_Date=dt.strptime(x, '%Y-%m-%d').date()
    except Exception as e:
        Purchase_Order_Date=data.get("pod")

    TODAY_DATE=dt.today().strftime('%Y-%m-%d')

    cur.execute("SELECT COUNT(*) FROM Purchase WHERE P_Bill_NO = ?",(data.get("billno"),))
    x = cur.fetchall()
    for each in x:
        Record_Count=each[0]

    if(int(data.get("BalanceAmount"))==0):
        Status="Complete"
    else:
        Status="Pending"


    if(Record_Count==0):
        try:
            cur.execute(INSERT_INTO_PURCHASE,(data.get("billno"),data.get("ON"),data.get("eway_no"),data.get("pt"),Bill_Date,data.get("SN"),Due_Date,Purchase_Order_Date,'false','false',TODAY_DATE,'true'))
            cur.execute(INSERT_INTO_PURCHASE_BILL,(data.get("billno"),data.get("ON"),str(data.get("Apply_Discount")).lower(),Disc_in_percentage,Disc_in_amt,str(data.get("Apply_Shipping")).lower(),ShippingAmt,data.get("SubTotal"),data.get("TotalAmount"),data.get("Amount_Paid"),data.get("BalanceAmount"),Status))
            if(int(data.get("Amount_Paid"))>0):
                cur.execute(INSERT_INTO_PURCHASE_INVOICE,(data.get("billno"),data.get("ON"),data.get("payment_mode"),data.get("TxnNo"),data.get("Amount_Paid"),TODAY_DATE,"Purchase order first payment",TODAY_DATE))

            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<<   For Adding stock Quantity in stock summary table >>>>>>>>>>>>>>>>>>>>>>>>
            #***************************************************************************************************
            for Key,Value in data.get("Purchase_Items").items():
                #@ Update Stock Data after purchase : credit the stock
                cur.execute(UPDATE_INTO_STOCK_DATA,(Value['Qty'],Value['P_Bill_NO'],Value['Qty'],TODAY_DATE,TODAY_DATE,Value['Stock_ID']))
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<< END END END END END END END END END END END END END >>>>>>>>>>>>>>>>>>>>>>>>
            #****************************************************************************************************

            cur.execute(INCREMENT_CONFIGURATION) #This will increment purchase bill number

            Result['message']='Purchase bill successfully created.'
            Result['isSuccess']="true"
            Result['ErrorMessg']=''
            con.commit()
        except Exception as e:
            Result['message']='Hey user, System is facing some issue while creating purchase bill.Please try again in fresh mode.If issue persist please contact service provider.'
            Result['isSuccess']="false"
            Result['ErrorMessg']=str(e)
            con.rollback()
    else:
        Result['message']='Hey user, System is trying to generate purchase bill have existing purchase bill number. Please referesh and try again.'
        Result['isSuccess']="Failed"
        Result['ErrorMessg']=''

    return Result;
#-------------------------END HERE-----------------------------

#-------------------------Create New-----------------------------
@CofigurationAddNewPurchaseBillBlueprint.route("/CreateNew.do/<ID>")
def CreateNew(ID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    try:
        cur.execute(DELETE_ALL_DATA,(ID,))
        con.commit()
    except Exception as e:
        con.rollback()

    return render_template(configs.get("ADD_NEW_PURCHASE_TEMPLATE"))
