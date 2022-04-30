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

CofigurationDisplayBillForPurchaseBlueprint = Blueprint('CofigurationDisplayBillForPurchaseBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.displaybillconfig.genrateBillForPURCHASEMapper  import *

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

#-------------------------Show GenrateBill----------------------------
@CofigurationDisplayBillForPurchaseBlueprint.route("/Display_Bill_For_Purchase.do/<ID>/<TYPE>")
def GenrateBill(ID,TYPE):
    return render_template(configs.get("DISPLAY--BILL--PURCHASE--TEMPLATE").data,ID=ID,TYPE=TYPE);

#-------------------------END HERE-----------------------------

@CofigurationDisplayBillForPurchaseBlueprint.route("/FETCH_INVOICE_INFORMATION_FOR_PURCHASE.do/<ID>",methods=['POST'])
def FETCH_INVOICE_INFORMATION_FOR_PURCHASE(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_PURCHASE_BILL_INFO,(str(ID),))
    Data = cur.fetchall()
    for each in Data:
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
        Insider_Dict['isReturn']=each[29]
        Insider_Dict['AmountInWords']=number_to_word(int(each[16]))
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;

@CofigurationDisplayBillForPurchaseBlueprint.route("/FETCH_BUCKET_ITEM_FOR_PURCHASE_BILL.do/<ID>",methods=['POST'])
def FETCH_BUCKET_ITEM_FOR_PURCHASE_BILL(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_BUCKET_ITEM_FOR_PURCHASE,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['SrNo']=each[0]
        Insider_Dict['Stock_Name']=each[1]
        Insider_Dict['Qty']=each[2]
        Insider_Dict['Purchase_Price']=each[3]
        Insider_Dict['Discount']=each[4]
        Insider_Dict['CGST']=each[5]
        Insider_Dict['SGST']=each[6]
        Insider_Dict['IGST']=each[7]
        Insider_Dict['Cess']=each[8]
        Insider_Dict['Amount']=each[9]
        Insider_Dict['Stock_Discription']=each[10]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;



@CofigurationDisplayBillForPurchaseBlueprint.route("/FETCH_PAYMENT_INFORMATION_FOR_PURCHASE_BILL.do/<ID>",methods=['POST'])
def FETCH_PAYMENT_INFORMATION_FOR_PURCHASE_BILL(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_PURCHASE_INVOICE_INFO,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['SrNo']=each[0]
        Insider_Dict['Invoice_ID']=each[1]
        Insider_Dict['Payment_Mode']=each[4]
        Insider_Dict['Txn_NO']=each[5]
        Insider_Dict['Amount_Paid']=each[6]
        Insider_Dict['Paid_on']=each[7]
        Insider_Dict['Remarks']=each[8]
        Insider_Dict['Created_Date']=each[9]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;

@CofigurationDisplayBillForPurchaseBlueprint.route("/FETCH_PAYMENT_MODE_INFORMATION_FOR_PURCHASE_BILL.do/<ID>",methods=['POST'])
def FETCH_PAYMENT_MODE_INFORMATION_FOR_PURCHASE_BILL(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_PAYMENT_MODE_INFO_FOR_PURCHASE_BILL,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['Payment_Mode']=each[3]
        Insider_Dict['Txn_NO']=each[4]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
