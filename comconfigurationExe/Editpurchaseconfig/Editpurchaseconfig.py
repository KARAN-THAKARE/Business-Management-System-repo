from flask import Flask,Blueprint,request,render_template
from fiscalyear import *
import sqlite3
import json

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


CofigurationEditPurchaseBlueprint = Blueprint('CofigurationEditPurchaseBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.Editpurchaseconfig.EditpurchaseMapper import *


#-------------------------Edit Invoice----------------------------
@CofigurationEditPurchaseBlueprint.route("/EditPurchaseOrder.do/<PurchaseID>")
def EditPurchaseOrder(PurchaseID):
    return render_template(configs.get("EDIT_PURCHASE_TEMPLATE").data,PurchaseID=PurchaseID);
#-------------------------END HERE-----------------------------


#------------------------- Fetch Invoice Item ----------------------------
@CofigurationEditPurchaseBlueprint.route("/FetchPurchaseData.do/<PurchaseID>",methods=['POST','GET'])
def FetchPurchaseData(PurchaseID):

    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    try:
        cur.execute(FETCH_PURCHASE_BILL_INFO,(str(PurchaseID),))
        DATA = cur.fetchall()
        for each in DATA:
            Insider_Dict['Purchase_ID']=each[0]
            Insider_Dict['P_Bill_NO']=each[1]
            Insider_Dict['P_Order_NO']=each[2]
            Insider_Dict['EWay_Bill_NO']=each[3]
            Insider_Dict['Purchas_Type']=each[4]
            Insider_Dict['Bill_Date']=each[5]
            Insider_Dict['Supplier_ID']=each[6]
            Insider_Dict['Due_Date']=each[7]
            Insider_Dict['Purchase_Order_Date']=each[8]
            Insider_Dict['Created_Date']=each[9]
            Insider_Dict['Apply_Discount']=each[10]
            Insider_Dict['Dis_in_percent']=each[11]
            Insider_Dict['Dis_in_amount']=each[12]
            Insider_Dict['Apply_Shipping']=each[13]
            Insider_Dict['Shipping_Amount']=each[14]
            Insider_Dict['Sub_Total_Amount']=each[15]
            Insider_Dict['Total_Amount']=each[16]
            Insider_Dict['Amount_Paid']=each[17]
            Insider_Dict['Balance_Amount']=each[18]
            Insider_Dict['Status']=each[19]
            Insider_Dict['SupplierName']=each[20]
            Insider_Dict['address']=each[21]
            Insider_Dict['city']=each[22]
            Insider_Dict['state']=each[23]
            Insider_Dict['pincode']=each[24]
            Insider_Dict['contact_no']=each[25]
            Insider_Dict['email']=each[26]
            Insider_Dict['PAN_NO']=each[27]
            Insider_Dict['GSTIN']=each[28]
            Insider_Dict['Todays_Date']=dt.today().strftime('%Y-%m-%d')
            Outsider_Dict[i]=Insider_Dict
            Insider_Dict = {}
            i=i+1
        status="Success"
    except Exception as e:
        status="Failed"

    return Outsider_Dict;
#-------------------------END HERE-----------------------------


#------------------------- Update PurchaseBill ----------------------------

@CofigurationEditPurchaseBlueprint.route("/UpdatePurchaseBill.do",methods=['POST'])
def UpdatePurchaseBill():
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

    if(int(data.get("BalanceAmount"))==0):
        Status="Complete"
    else:
        Status="Pending"

    try:
        if(data.get("Update_Type")=='half'):
            cur.execute(UPDATE_PURCHASE,(data.get("eway_no"),data.get("pt"),Bill_Date,Due_Date,Purchase_Order_Date,TODAY_DATE,data.get("billno")))
        else:
            cur.execute(DELETE_PURCHASE_PAYMENT_SLIP,(data.get("billno"),))

            cur.execute(UPDATE_PURCHASE,(data.get("eway_no"),data.get("pt"),Bill_Date,Due_Date,Purchase_Order_Date,TODAY_DATE,data.get("billno")))
            cur.execute(UPDATE_PURCHASE_BILL,(str(data.get("Apply_Discount")).lower(),Disc_in_percentage,Disc_in_amt,str(data.get("Apply_Shipping")).lower(),ShippingAmt,data.get("SubTotal"),data.get("TotalAmount"),data.get("Amount_Paid"),data.get("BalanceAmount"),Status,data.get("billno")))
            if(int(data.get("Amount_Paid"))>0):
                cur.execute(INSERT_INTO_PURCHASE_INVOICE,(data.get("billno"),data.get("ON"),data.get("payment_mode"),data.get("TxnNo"),data.get("Amount_Paid"),TODAY_DATE,"Purchase order first payment",TODAY_DATE))

            #As we update we are updating purchase order so there are chances that shop keeper can delete or modify item too
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   RESET TO PREVIOUS STATE  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            #***************************************************************************************************
            # Add back item quantity after delete
            PURCHASE_ID=data.get("billno")
            cur.execute(FETCH_STOCKS_THAT_ADDED_PREVIOUSLY_BY_GIVEN_ID,(PURCHASE_ID,))
            FETCHED_STOCKS_THAT_ADDED_PREVIOUSLY_BY_GIVEN_ID = cur.fetchall()

            for i in FETCHED_STOCKS_THAT_ADDED_PREVIOUSLY_BY_GIVEN_ID:
                STOCK_ID=i[0]
                PREV_ADDED_STOCK_QTY=i[1]

                # Fetch Previous Record
                cur.execute(GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_FOR_UPDATE,(STOCK_ID,PURCHASE_ID))
                GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_FOR_UPDATE_DATA = cur.fetchall()

                if(len(GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_FOR_UPDATE_DATA)!=0):
                    for each in GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_FOR_UPDATE_DATA:
                        PREV_CREDIT_PO=each[0]
                        PREV_CREDIT_QTY=each[1]
                        PREV_CREDIT_DATE=each[2]
                    cur.execute(ROLLBACK_AFTER_PO_DELETE_FOR_STOCK_SETLEMENT_FIRST,(PREV_ADDED_STOCK_QTY,PREV_CREDIT_PO,PREV_CREDIT_QTY,PREV_CREDIT_DATE,STOCK_ID)); #here we set
                else:
                    PREV_CREDIT_PO=None
                    PREV_CREDIT_QTY=PREV_ADDED_STOCK_QTY
                    PREV_CREDIT_DATE=None
                    cur.execute(ROLLBACK_AFTER_PO_DELETE_FOR_STOCK_SETLEMENT_SECOND,(PREV_ADDED_STOCK_QTY,PREV_CREDIT_PO,PREV_CREDIT_QTY,PREV_CREDIT_DATE,STOCK_ID)); #here we minus
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<< END END END END END END END END END END END END END >>>>>>>>>>>>>>>>>>>>>>>>
            #****************************************************************************************************

            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<<   For Adding stock Quantity in stock summary table >>>>>>>>>>>>>>>>>>>>>>>>
            #***************************************************************************************************
            for Key,Value in data.get("Purchase_Items").items():
                #@ Update Stock Data after purchase : credit the stock
                cur.execute(UPDATE_INTO_STOCK_DATA,(Value['Qty'],Value['P_Bill_NO'],Value['Qty'],TODAY_DATE,TODAY_DATE,Value['Stock_ID']))
            #***************************************************************************************************
            #<<<<<<<<<<<<<<<<<<<<<<< END END END END END END END END END END END END END >>>>>>>>>>>>>>>>>>>>>>>>
            #****************************************************************************************************

        Result['message']='Purchase bill successfully created.'
        Result['isSuccess']="true"
        Result['ErrorMessg']=''
        con.commit()
    except Exception as e:
        print(e)
        Result['message']='Hey user, System is facing some issue while creating purchase bill.Please try again in fresh mode.If issue persist please contact service provider.'
        Result['isSuccess']="false"
        Result['ErrorMessg']=str(e)
        con.rollback()

    return Result;
#-------------------------END HERE-----------------------------


#==================================================================================================================================
#-------------------------------------------------------------- Delete Purchase -------------------------------------
@CofigurationEditPurchaseBlueprint.route("/DELETE_PURCHASE_ORDER.do/<PURCHASE_ID>",methods=['POST'])
def DELETE_PURCHASE_ORDER(PURCHASE_ID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    try:
        cur.execute(DELETE_PURCHASE,(PURCHASE_ID,));
        cur.execute(DELETE_PURCHASE_PAYMENT_SLIP,(PURCHASE_ID,));

        # Add back item quantity after delete
        cur.execute(FETCH_STOCK_ID_NEED_TO_BE_RESET,(PURCHASE_ID,)) #first collect all invoice bucket entry
        FETCHED_STOCK_ID_NEED_TO_BE_RESET = cur.fetchall()          #There may be multiple entry as customer ca buy many items
        for i in FETCHED_STOCK_ID_NEED_TO_BE_RESET:
            ENTRY_ID=i[0]
            STOCK_ID=i[1]
            STOCK_QTY=i[2]

            #First Delete entry of table
            cur.execute(DELETE_PURCHASE_BUCKET_ITEM_ENTRY,(ENTRY_ID,));
            con.commit()

            # Fetch Previous Record
            cur.execute(GET_PREVIOUS_CREDIT_RECORD_OF_STOCK,(STOCK_ID,))
            GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_DATA = cur.fetchall()

            if(len(GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_DATA)!=0):
                for each in GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_DATA:
                    PREV_CREDIT_PO=each[0]
                    PREV_CREDIT_QTY=each[1]
                    PREV_CREDIT_DATE=each[2]
                cur.execute(ROLLBACK_AFTER_PO_DELETE_FOR_STOCK_SETLEMENT_FIRST,(STOCK_QTY,PREV_CREDIT_PO,PREV_CREDIT_QTY,PREV_CREDIT_DATE,STOCK_ID)); #here we set
            else:
                PREV_CREDIT_PO=None
                PREV_CREDIT_QTY=STOCK_QTY
                PREV_CREDIT_DATE=None
                cur.execute(ROLLBACK_AFTER_PO_DELETE_FOR_STOCK_SETLEMENT_SECOND,(STOCK_QTY,PREV_CREDIT_PO,PREV_CREDIT_QTY,PREV_CREDIT_DATE,STOCK_ID)); #here we minus
            con.commit()
        isSuccess="true"
        con.commit()
    except Exception as e:
        print(e)
        isSuccess="false"
        con.rollback()

    return isSuccess;
#------------------------------------------------------- ~ END  Delete Purchase END ~ --------------------------------------------
#==================================================================================================================================

#==================================================================================================================================
#-------------------------------------------------------------- RETURN Purchase -------------------------------------
@CofigurationEditPurchaseBlueprint.route("/RETURN_PURCHASE_ORDER.do/<PURCHASE_ID>/<REMARK>",methods=['POST'])
def RETURN_PURCHASE_ORDER(PURCHASE_ID,REMARK):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    try:
        cur.execute(RETURN_PURCHASE,(PURCHASE_ID,));
        cur.execute(CREATE_REMARKS_FOR_RETURN,(PURCHASE_ID,REMARK));
        isSuccess="true"
        con.commit()
    except Exception as e:
        isSuccess="false"
        con.rollback()

    return isSuccess;
#------------------------------------------------------- ~ END  Delete Purchase END ~ --------------------------------------------
#==================================================================================================================================
