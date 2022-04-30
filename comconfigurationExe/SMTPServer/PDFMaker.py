from flask import Flask,Blueprint,request,render_template,make_response
import json
import sqlite3
import pdfkit

#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta
import time

import email, smtplib, ssl

from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from comconfigurationExe.downloadpdfconfig.downloadpdfMapper  import *

from jproperties import Properties
configure = Properties()
with open('example.properties', 'rb') as read_prop:
    configure.load(read_prop)

#==========================================================================================================================================================
#---------------------------------------------------------------- AMOUNT IN WORDS --------------------------------------------------------------------------
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
#--------------------------------------------------------- ~ END AMOUNT IN WORDS END ~ --------------------------------------------------------------------
#==========================================================================================================================================================

#===============================================================================
#------------------------ CREATE PDF FOR INVOICE (Client) ----------------------
def Invoice_For_Client(ID,InvoiceType):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_INVOICE_INFO,(str(ID),))
    INVOICE_INFO = cur.fetchall()

    cur.execute(FETCH_BUCKET_ITEM_FOR_INVOICE,(str(ID),))
    BUCKET_ITEM_FOR_INVOICE = cur.fetchall()

    cur.execute(FETCH_INVOICE_INVOICES_INFO,(str(ID),))
    INVOICE_INVOICES_INFO = cur.fetchall()

    cur.execute(FETCH_TERMS_FOR_INVOICE)
    INVOICE_TERMS_INFO = cur.fetchall()

    cur.execute(FETCH_PAYMENT_MODE_INFO_FOR_INVOICE_BILL,(str(ID),))
    PAYMENT_MODE_INFO_FOR_INVOICE_BILL = cur.fetchall()

    cur.execute(FETCH_SHOP_DEATILS_FOR_HEADER)
    SHOP_DEATILS_FOR_HEADER_INFORMATION = cur.fetchall()

    for each in INVOICE_INFO:
        Total_Amount=each[13]

    AmountInWords=number_to_word(int(Total_Amount))

    res = render_template(configure.get("DOWNLOAD--PDF--INVOICE--TEMPLATE").data,INVOICE_INFO=INVOICE_INFO,BUCKET_ITEM_FOR_INVOICE=BUCKET_ITEM_FOR_INVOICE,INVOICE_INVOICES_INFO=INVOICE_INVOICES_INFO,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,INVOICE_TERMS_INFO=INVOICE_TERMS_INFO,PAYMENT_MODE_INFO_FOR_INVOICE_BILL=PAYMENT_MODE_INFO_FOR_INVOICE_BILL,InvoiceType=InvoiceType,AmountInWords=AmountInWords)

    return res

#---------------------------- END END END END ----------------------------------
#===============================================================================

#===============================================================================
#------------------------ CREATE PDF FOR QUOTATION (Client) ----------------------
def Quotation_For_Client(ID,QuotationType):
    #Ignore PrevID as It is only used to match URL
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_QUOTATION_INFO,(str(ID),))
    QUOTATION_INFO = cur.fetchall()

    cur.execute(FETCH_BUCKET_ITEM_FOR_QUOTATION,(str(ID),))
    BUCKET_ITEM_FOR_QUOTATION = cur.fetchall()

    cur.execute(FETCH_EMI_INFO_FOR_QUOTATION,(str(ID),))
    EMI_INFO_FOR_QUOTATION = cur.fetchall()

    cur.execute(FETCH_TERMS_FOR_INVOICE)
    INVOICE_TERMS_INFO = cur.fetchall()

    cur.execute(FETCH_SHOP_DEATILS_FOR_HEADER)
    SHOP_DEATILS_FOR_HEADER_INFORMATION = cur.fetchall()

    #============= For EMI ======================
    NET_EMI_PAYABLE=0
    cur.execute(FETCH_OVERALL_EMI_AMOUNT,(str(ID),))
    Data = cur.fetchall()
    for each in Data:
        NET_EMI_PAYABLE=each[0]

    for each in QUOTATION_INFO:
        Total_Amount=each[13]
        if(each[9]=='true'):
            if(each[14]!=0):                # when Downpayment in amount is not 0
                DownPayment=each[14]
            elif(each[15]!=0):              # when Downpayment in percentage is not 0
                DownPayment=each[13]*float(each[15])*0.01
            else:
                DownPayment=0               # when Downpayment in both is  0
                NET_EMI_PAYABLE=NET_EMI_PAYABLE+DownPayment


        #=============================== ~ END FOR EMI END ~ ====================================

    AmountInWords=number_to_word(int(Total_Amount))

    res = render_template(configure.get("DOWNLOAD--PDF--QUOTATION--TEMPLATE").data,QUOTATION_INFO=QUOTATION_INFO,BUCKET_ITEM_FOR_QUOTATION=BUCKET_ITEM_FOR_QUOTATION,EMI_INFO_FOR_QUOTATION=EMI_INFO_FOR_QUOTATION,NET_EMI_PAYABLE=NET_EMI_PAYABLE,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,INVOICE_TERMS_INFO=INVOICE_TERMS_INFO,QuotationType=QuotationType,AmountInWords=AmountInWords)

    return res

#---------------------------- END END END END ----------------------------------
#===============================================================================



#===============================================================================
#------------------------ CREATE PDF FOR PURCHASE ORDER (Supplier) ----------------------
def Invoice_For_Supplier(ID,InvoiceType):
    configure = Properties()
    with open('example.properties','rb') as read_prop:
        configure.load(read_prop)

    #Ignore PrevID as It is only used to match URL
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_PURCHASE_BILL_INFO,(ID,))
    PURCHASE_INFO  = cur.fetchall()

    cur.execute(FETCH_BUCKET_ITEM_FOR_PURCHASE_INVOICE,(ID,))
    BUCKET_ITEM_FOR_PURCHASE_INVOICE = cur.fetchall()

    cur.execute(FETCH_PURCHASE_INVOICE_INFO,(ID,))
    PURCHASE_INVOICES_INFO = cur.fetchall()

    cur.execute(FETCH_TERMS_FOR_PURCHASE)
    PURCHASE_TERMS_INFO = cur.fetchall()

    cur.execute(FETCH_PAYMENT_MODE_INFO_FOR_PURCHASE_BILL,(str(ID),))
    PAYMENT_MODE_INFO_FOR_PURCHASE = cur.fetchall()

    cur.execute(FETCH_SHOP_DEATILS_FOR_HEADER)
    SHOP_DEATILS_FOR_HEADER_INFORMATION = cur.fetchall()

    for each in PURCHASE_INFO:
        Total_Amount=each[16]
    AmountInWords=number_to_word(int(Total_Amount))

    res = render_template(configure.get("DOWNLOAD--PDF--PURCHASE--TEMPLATE").data,PURCHASE_INFO=PURCHASE_INFO,BUCKET_ITEM_FOR_PURCHASE_INVOICE=BUCKET_ITEM_FOR_PURCHASE_INVOICE,PURCHASE_INVOICES_INFO=PURCHASE_INVOICES_INFO,PURCHASE_TERMS_INFO=PURCHASE_TERMS_INFO,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,PAYMENT_MODE_INFO_FOR_PURCHASE=PAYMENT_MODE_INFO_FOR_PURCHASE,InvoiceType=InvoiceType,AmountInWords=AmountInWords)

    return res

#---------------------------- END END END END ----------------------------------
#===============================================================================

#======================================================================================
#------------------------ CREATE PDF FOR CUSTOM INVOICE (Client) ----------------------
def Custom_Invoice_For_Client(Custom_Invoice_ID):
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_CUSTOM_INVOICE_INFO,(str(Custom_Invoice_ID),))
    CUSTOM_INVOICE_INFO = cur.fetchall()

    cur.execute(FETCH_BUCKET_ITEM_FOR_CUSTOM_INVOICE,(str(Custom_Invoice_ID),))
    BUCKET_ITEM_FOR_CUSTOM_INVOICE = cur.fetchall()

    cur.execute(FETCH_TERMS_FOR_CUSTOM_INVOICE,(str(Custom_Invoice_ID),))
    TERMS_FOR_CUSTOM_INVOICE = cur.fetchall()

    cur.execute(FETCH_SHOP_DEATILS_FOR_HEADER)
    SHOP_DEATILS_FOR_HEADER_INFORMATION = cur.fetchall()

    for each in CUSTOM_INVOICE_INFO:
        Total_Amount=each[16]

    AmountInWords=number_to_word(int(Total_Amount))

    res = render_template(configure.get("DOWNLOAD--PDF--CUSTOM-INVOICE--TEMPLATE").data,CUSTOM_INVOICE_INFO=CUSTOM_INVOICE_INFO,BUCKET_ITEM_FOR_CUSTOM_INVOICE=BUCKET_ITEM_FOR_CUSTOM_INVOICE,TERMS_FOR_CUSTOM_INVOICE=TERMS_FOR_CUSTOM_INVOICE,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,AmountInWords=AmountInWords)

    return res

#---------------------------- END END END END ----------------------------------
#===============================================================================
