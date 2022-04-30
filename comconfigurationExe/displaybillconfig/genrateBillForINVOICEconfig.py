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

CofigurationDisplayBillForInvoiceBlueprint = Blueprint('CofigurationDisplayBillForInvoiceBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.displaybillconfig.genrateBillForINVOICEMapper  import *

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

#==================================================================================================================================
#-------------------------------------------------------------- DISPLAY BILL : INVOICE ---------------------------------------------------

@CofigurationDisplayBillForInvoiceBlueprint.route("/Display_Bill_For_Invoice.do/<ID>/<TYPE>")
def Display_Bill_For_Invoice(ID,TYPE):
    return render_template(configs.get("DISPLAY--BILL--INVOICE--TEMPLATE").data,ID=ID,TYPE=TYPE);
#------------------------------------------------------- ~ END DISPLAY BILL : INVOICE END ~ --------------------------------------------
#==================================================================================================================================

#==================================================================================================================================
#-------------------------------------------------------------- FETCH INVOICE INFO FOR INVOICE -------------------------------------
@CofigurationDisplayBillForInvoiceBlueprint.route("/FETCH_INVOICE_INFORMATION_FOR_INVOICE.do/<ID>",methods=['POST'])
def FETCH_INVOICE_INFORMATION_FOR_INVOICE(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    #============= For EMI ======================
    cur.execute(FETCH_OVERALL_EMI_AMOUNT,(str(ID),))
    Data = cur.fetchall()
    for each in Data:
        NET_EMI_PAYABLE=each[0]
    #============= END ======================

    cur.execute(FETCH_INVOICE_INFO,(str(ID),))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['Invoice_NO']=each[0]
        Insider_Dict['Invoice_Type']=each[1]
        Insider_Dict['Invoice_Date']=each[2]
        Insider_Dict['POS']=each[3]
        Insider_Dict['Apply_Discount']=each[4]
        Insider_Dict['Dis_in_percent']=each[5]
        Insider_Dict['Dis_in_amount']=each[6]
        Insider_Dict['Apply_Shipping']=each[7]
        Insider_Dict['Shipping_Amount']=each[8]
        Insider_Dict['Apply_EMI']=each[9]
        Insider_Dict['EMI_Months']=each[10]
        Insider_Dict['EMI_Percent']=each[11]
        Insider_Dict['Sub_Total_Amount']=each[12]
        Insider_Dict['Total_Amount']=each[13]
        Insider_Dict['Amount_Paid']=each[14]
        Insider_Dict['Balance_Amount']=each[15]
        Insider_Dict['Status']=each[16]
        Insider_Dict['ClientName']=each[17]
        Insider_Dict['address']=each[18]
        Insider_Dict['city']=each[19]
        Insider_Dict['state']=each[20]
        Insider_Dict['pincode']=each[21]
        Insider_Dict['contact_no']=each[22]
        Insider_Dict['email']=each[23]
        Insider_Dict['PAN_NO']=each[24]
        Insider_Dict['GSTIN']=each[25]
        Insider_Dict['DP_in_Amount']=each[26]
        Insider_Dict['DP_in_Percent']=each[27]
        Insider_Dict['isReturn']=each[28]
        Insider_Dict['AmountInWords']=number_to_word(int(each[13]))

        #================================ FOR EMI ====================================

        if(each[9]=='true'):
            if(each[26]!=0):                # when Downpayment in amount is not 0
                DownPayment=each[26]
            elif(each[27]!=0):              # when Downpayment in percentage is not 0
                DownPayment=each[13]*float(each[27])*0.01
            else:
                DownPayment=0               # when Downpayment in both is  0
            Insider_Dict['NET_EMI_PAYABLE']=NET_EMI_PAYABLE+DownPayment


        #=============================== ~ END FOR EMI END ~ ====================================


        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
    # return render_template(configs.get("DISPLAY--BILL--INVOICE--TEMPLATE").data,ID=ID,TYPE=TYPE);
#------------------------------------------------------- ~ END FETCH INVOICE INFO FOR INVOICE END ~ --------------------------------------------
#==================================================================================================================================

#==================================================================================================================================
#-------------------------------------------------------------- FETCH BUCKET ITEM/STOCK FOR INVOICE -------------------------------------
@CofigurationDisplayBillForInvoiceBlueprint.route("/FETCH_BUCKET_ITEM_FOR_INVOICE_BILL.do/<ID>",methods=['POST'])
def FETCH_BUCKET_ITEM_FOR_INVOICE_BILL(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_BUCKET_ITEM_FOR_INVOICE,(str(ID),))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['SrNo']=each[0]
        Insider_Dict['Stock_Name']=each[1]
        Insider_Dict['Qty']=each[2]
        Insider_Dict['Sell_Price']=each[3]
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

#------------------------------------------------------- ~ END  FETCH BUCKET ITEM/STOCK FOR INVOICE END ~ --------------------------------------------
#==================================================================================================================================

#==================================================================================================================================
#-------------------------------------------------------------- FETCH PAYMENT INFORMATION FOR INVOICE -------------------------------------

@CofigurationDisplayBillForInvoiceBlueprint.route("/FETCH_PAYMENT_INFORMATION_FOR_INVOICE_BILL.do/<ID>",methods=['POST'])
def FETCH_PAYMENT_INFORMATION_FOR_INVOICE_BILL(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_INVOICE_INVOICES_INFO,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['SrNo']=each[0]
        Insider_Dict['Invoice_ID']=each[1]
        Insider_Dict['Payment_Mode']=each[3]
        Insider_Dict['Txn_NO']=each[4]
        Insider_Dict['Amount_Paid']=each[5]
        Insider_Dict['Paid_on']=each[6]
        Insider_Dict['Remarks']=each[7]
        Insider_Dict['Created_Date']=each[8]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;

#------------------------------------------------------- ~ END  FETCH PAYMENT INFORMATION FOR INVOICE END ~ --------------------------------------------
#==================================================================================================================================

#==================================================================================================================================
#-------------------------------------------------------------- FETCH EMI INFORMATION FOR INVOICE -------------------------------------
@CofigurationDisplayBillForInvoiceBlueprint.route("/FETCH_EMI_INFORMATION_FOR_INVOICE_BILL.do/<ID>",methods=['POST'])
def FETCH_EMI_INFORMATION_FOR_INVOICE_BILL(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_EMI_INFO,(ID,))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['SrNo']=each[0]
        Insider_Dict['EMI_ID']=each[1]
        Insider_Dict['Invoice_NO']=each[2]
        Insider_Dict['InvoiceID_For_EMI']=each[3]
        Insider_Dict['EMI_Month']=each[4]
        Insider_Dict['EMI_Amount']=each[5]
        Insider_Dict['EMI_Paid_Amount']=each[6]
        Insider_Dict['EMI_Paid_Date']=each[7]
        Insider_Dict['Status']=each[8]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#------------------------------------------------------- ~ END  FETCH EMI INFORMATION FOR INVOICE END ~ --------------------------------------------
#==================================================================================================================================

#==================================================================================================================================
#-------------------------------------------------------------- FETCH PAYMENT MODE INFO FOR INVOICE -------------------------------------
@CofigurationDisplayBillForInvoiceBlueprint.route("/FETCH_PAYMENT_MODE_INFORMATION_FOR_INVOICE.do/<ID>",methods=['POST'])
def FETCH_PAYMENT_MODE_INFORMATION_FOR_INVOICE(ID):
    Insider_Dict = {}
    Outsider_Dict={}
    i=0
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(FETCH_PAYMENT_MODE_INFO_FOR_INVOICE_BILL,(str(ID),))
    Data = cur.fetchall()
    for each in Data:
        Insider_Dict['Payment_Mode']=each[2]
        Insider_Dict['Txn_NO']=each[3]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;

#------------------------------------------------------- ~ END  FETCH PAYMENT MODE INFO FOR INVOICE  END ~ --------------------------------------------
#==================================================================================================================================
