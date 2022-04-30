from flask import Flask,Blueprint,request,render_template,make_response
import json
import sqlite3
import pdfkit
import os

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

#for printing
import win32ui
import win32print
import win32api

from jproperties import Properties


CofigurationDownloadPDFBlueprint = Blueprint('CofigurationDownloadPDFBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.downloadpdfconfig.downloadpdfMapper  import *


from comconfigurationExe.SMTPServer.SMTP  import *
configs = Properties()
with open('example.properties','rb') as read_prop:
    configs.load(read_prop)



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

#==============================================================================================================================
#--------------------------------------------------- DOWNLOAD PDF FOR := Invoice (Client) -------------------------------------
@CofigurationDownloadPDFBlueprint.route("/Display_Bill_For_Invoice.do/<PrevID>/Download_PDF_For_Invoice/<ID>/<InvoiceType>")
def Display_Bill_For_Invoice(PrevID,ID,InvoiceType):
    #Ignore PrevID as It is only used to match URL
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    Serverconfigs = Properties()
    with open('Server.properties', 'rb') as read_prop:
        Serverconfigs.load(read_prop)

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

    FilneName='attachment;filename=Invoice '+str(ID)+'.pdf'

    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
    res = render_template(configs.get("DOWNLOAD--PDF--INVOICE--TEMPLATE").data,INVOICE_INFO=INVOICE_INFO,BUCKET_ITEM_FOR_INVOICE=BUCKET_ITEM_FOR_INVOICE,INVOICE_INVOICES_INFO=INVOICE_INVOICES_INFO,INVOICE_TERMS_INFO=INVOICE_TERMS_INFO,InvoiceType=InvoiceType,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,PAYMENT_MODE_INFO_FOR_INVOICE_BILL=PAYMENT_MODE_INFO_FOR_INVOICE_BILL,AmountInWords=AmountInWords)
    responsestring=pdfkit.from_string(res,False,configuration=config)
    response = make_response(responsestring) #for inline mode add False attribute here #(responsestring,False)
    response.headers['Content-Type']='application/pdf'
    response.headers['Content-Disposition']=FilneName
    return response


#********************************************************************************
#=========================== PRINT := Client Invoice ============================
@CofigurationDownloadPDFBlueprint.route("/PrintClientInvoice.do/<ID>/<InvoiceType>")
def PrintClientInvoice(ID,InvoiceType):
    IsSuccess="false"
    try:
        configs = Properties()
        with open('example.properties','rb') as read_prop:
            configs.load(read_prop)

        Serverconfigs = Properties()
        with open('Server.properties', 'rb') as read_prop:
            Serverconfigs.load(read_prop)


        #Ignore PrevID as It is only used to match URL
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

        FilneName='attachment;filename=Invoice '+str(ID)+'.pdf'

        WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
        config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
        res = render_template(configs.get("DOWNLOAD--PDF--INVOICE--TEMPLATE").data,INVOICE_INFO=INVOICE_INFO,BUCKET_ITEM_FOR_INVOICE=BUCKET_ITEM_FOR_INVOICE,INVOICE_INVOICES_INFO=INVOICE_INVOICES_INFO,INVOICE_TERMS_INFO=INVOICE_TERMS_INFO,PAYMENT_MODE_INFO_FOR_INVOICE_BILL=PAYMENT_MODE_INFO_FOR_INVOICE_BILL,InvoiceType=InvoiceType,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,AmountInWords=AmountInWords)

        pdfkit.from_string(res,"Client Invoice.pdf",configuration=config)

        GHOSTSCRIPT_PATH = Serverconfigs.get("GHOSTSCRIPT_PATH").data
        GSPRINT_PATH = Serverconfigs.get("GSPRINT_PATH").data

        currentprinter = win32print.GetDefaultPrinter()

        win32api.ShellExecute(0, 'open', GSPRINT_PATH, '-ghostscript "'+GHOSTSCRIPT_PATH+'" -dPDFFitPage -color -printer "'+currentprinter+'" "Client Invoice.pdf"', '.', 0)

        IsSuccess="true"

    except Exception as e:
        IsSuccess="false"

    return IsSuccess

#=========================== END END END END END END ============================
#********************************************************************************

#=========================== Payslip ~ Invoice ==========================
@CofigurationDownloadPDFBlueprint.route("/DOWNLOAD_PAYSLIP_INVOICE/<Invoice_No>/<PaySlipID>")
def DOWNLOAD_PAYSLIP_INVOICE(Invoice_No,PaySlipID):
    ID=Invoice_No
    PaySlipID=int(PaySlipID)

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    Serverconfigs = Properties()
    with open('Server.properties', 'rb') as read_prop:
        Serverconfigs.load(read_prop)

    cur.execute(FETCH_INVOICE_INFO,(str(ID),))
    INVOICE_INFO = cur.fetchall()

    cur.execute(FETCH_BUCKET_ITEM_FOR_INVOICE,(str(ID),))
    BUCKET_ITEM_FOR_INVOICE = cur.fetchall()

    cur.execute(FETCH_INVOICE_INVOICES_INFO,(str(ID),))
    INVOICE_INVOICES_INFO = cur.fetchall()

    cur.execute(FETCH_INVOICE_PAY_SLIP_INFO,(PaySlipID,))
    INVOICE_PAY_SLIP_INFO = cur.fetchall()

    cur.execute(FETCH_TERMS_FOR_INVOICE)
    INVOICE_TERMS_INFO = cur.fetchall()

    cur.execute(FETCH_SHOP_DEATILS_FOR_HEADER)
    SHOP_DEATILS_FOR_HEADER_INFORMATION = cur.fetchall()

    for each in INVOICE_INFO:
        Total_Amount=each[13]

    AmountInWords=number_to_word(int(Total_Amount))

    FilneName='attachment;filename=Invoice '+str(ID)+'.pdf'

    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
    res = render_template(configs.get("DOWNLOAD--PDF--INVOICE--PAYMENT--SLIP--TEMPLATE").data,INVOICE_INFO=INVOICE_INFO,BUCKET_ITEM_FOR_INVOICE=BUCKET_ITEM_FOR_INVOICE,INVOICE_INVOICES_INFO=INVOICE_INVOICES_INFO,INVOICE_PAY_SLIP_INFO=INVOICE_PAY_SLIP_INFO,INVOICE_TERMS_INFO=INVOICE_TERMS_INFO,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,AmountInWords=AmountInWords)
    responsestring=pdfkit.from_string(res,False,configuration=config)
    response = make_response(responsestring) #for inline mode add False attribute here #(responsestring,False)
    response.headers['Content-Type']='application/pdf'
    response.headers['Content-Disposition']=FilneName
    return response


@CofigurationDownloadPDFBlueprint.route("/FETCH_EMI_INFORMATION_FOR_INVOICE_BILL.do/<ID>",methods=['POST'])
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
        Insider_Dict['Invoice_NO']=each[1]
        Insider_Dict['InvoiceIF_For_EMI']=each[3]
        Insider_Dict['EMI_Month']=each[4]
        Insider_Dict['EMI_Amount']=each[5]
        Insider_Dict['EMI_Paid_Amount']=each[6]
        Insider_Dict['EMI_Paid_Date']=each[7]
        Insider_Dict['Status']=each[8]
        Outsider_Dict[i]=Insider_Dict
        Insider_Dict = {}
        i=i+1
    return Outsider_Dict;
#---------------------------------------------- ~ END DOWNLOAD PDF FOR := Invoice (Client) END ~ ------------------------------
#==============================================================================================================================


#==============================================================================================================================
#---------------------------------------------- DOWNLOAD PDF FOR := Purchase (Supplier) ---------------------------------------
@CofigurationDownloadPDFBlueprint.route("/Display_Bill_For_Purchase.do/<PrevID>/Download_PDF_For_PURCHASE/<ID>/<InvoiceType>")
def Display_Bill_For_Purchase(PrevID,ID,InvoiceType):
    configs = Properties()
    with open('example.properties','rb') as read_prop:
        configs.load(read_prop)

    Serverconfigs = Properties()
    with open('Server.properties', 'rb') as read_prop:
        Serverconfigs.load(read_prop)

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


    FilneName='attachment;filename=Purchase Order '+str(ID)+'.pdf'

    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
    res = render_template(configs.get("DOWNLOAD--PDF--PURCHASE--TEMPLATE").data,PURCHASE_INFO=PURCHASE_INFO,BUCKET_ITEM_FOR_PURCHASE_INVOICE=BUCKET_ITEM_FOR_PURCHASE_INVOICE,PURCHASE_INVOICES_INFO=PURCHASE_INVOICES_INFO,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,PURCHASE_TERMS_INFO=PURCHASE_TERMS_INFO,PAYMENT_MODE_INFO_FOR_PURCHASE=PAYMENT_MODE_INFO_FOR_PURCHASE,InvoiceType=InvoiceType,AmountInWords=AmountInWords)
    responsestring=pdfkit.from_string(res,False,configuration=config)
    response = make_response(responsestring) #for inline mode add False attribute here
    response.headers['Content-Type']='application/pdf'
    response.headers['Content-Disposition']=FilneName
    return response



#********************************************************************************
#=========================== PRINT := Purchase Order ============================
@CofigurationDownloadPDFBlueprint.route("/PrintPurchase.do/<ID>/<InvoiceType>")
def PrintPurchase(ID,InvoiceType):
    IsSuccess="false"
    try:
        configs = Properties()
        with open('example.properties','rb') as read_prop:
            configs.load(read_prop)

        Serverconfigs = Properties()
        with open('Server.properties', 'rb') as read_prop:
            Serverconfigs.load(read_prop)


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

        WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
        config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
        res = render_template(configs.get("DOWNLOAD--PDF--PURCHASE--TEMPLATE").data,PURCHASE_INFO=PURCHASE_INFO,BUCKET_ITEM_FOR_PURCHASE_INVOICE=BUCKET_ITEM_FOR_PURCHASE_INVOICE,PURCHASE_INVOICES_INFO=PURCHASE_INVOICES_INFO,PURCHASE_TERMS_INFO=PURCHASE_TERMS_INFO,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,PAYMENT_MODE_INFO_FOR_PURCHASE=PAYMENT_MODE_INFO_FOR_PURCHASE,InvoiceType=InvoiceType,AmountInWords=AmountInWords)

        pdfkit.from_string(res,"Purchase Order.pdf",configuration=config)

        GHOSTSCRIPT_PATH = Serverconfigs.get("GHOSTSCRIPT_PATH").data
        GSPRINT_PATH = Serverconfigs.get("GSPRINT_PATH").data

        currentprinter = win32print.GetDefaultPrinter()

        win32api.ShellExecute(0, 'open', GSPRINT_PATH, '-ghostscript "'+GHOSTSCRIPT_PATH+'" -dPDFFitPage -color -printer "'+currentprinter+'" "Purchase Order.pdf"', '.', 0)

        IsSuccess="true"

    except Exception as e:
        IsSuccess="false"

    return IsSuccess

#=========================== END END END END END END ============================
#********************************************************************************

#=========================== Payslip ~ Purchase ==========================
@CofigurationDownloadPDFBlueprint.route("/DOWNLOAD_PAYSLIP_PURCHASE/<Purchase_No>/<PaySlipID>")
def DOWNLOAD_PAYSLIP_PURCHASE(Purchase_No,PaySlipID):
    ID=Purchase_No
    PaySlipID=int(PaySlipID)

    Serverconfigs = Properties()
    with open('Server.properties', 'rb') as read_prop:
        Serverconfigs.load(read_prop)

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute(FETCH_PURCHASE_BILL_INFO,(ID,))
    PURCHASE_INFO  = cur.fetchall()

    cur.execute(FETCH_BUCKET_ITEM_FOR_PURCHASE_INVOICE,(ID,))
    BUCKET_ITEM_FOR_PURCHASE_INVOICE = cur.fetchall()

    cur.execute(FETCH_PURCHASE_INVOICE_INFO,(ID,))
    PURCHASE_INVOICES_INFO = cur.fetchall()

    cur.execute(FETCH_PURCHASE_PAY_SLIP_INFO,(PaySlipID,))
    PURCHASE_PAY_SLIP_INFO = cur.fetchall()

    cur.execute(FETCH_TERMS_FOR_PURCHASE)
    PURCHASE_TERMS_INFO = cur.fetchall()

    cur.execute(FETCH_SHOP_DEATILS_FOR_HEADER)
    SHOP_DEATILS_FOR_HEADER_INFORMATION = cur.fetchall()

    for each in PURCHASE_INFO:
        Total_Amount=each[16]
    AmountInWords=number_to_word(int(Total_Amount))

    FilneName='attachment;filename=Payslip '+str(ID)+'.pdf'

    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
    res = render_template(configs.get("DOWNLOAD--PDF--PURCHASE--PAYMENT--SLIP--TEMPLATE").data,PURCHASE_INFO=PURCHASE_INFO,BUCKET_ITEM_FOR_PURCHASE_INVOICE=BUCKET_ITEM_FOR_PURCHASE_INVOICE,PURCHASE_INVOICES_INFO=PURCHASE_INVOICES_INFO,PURCHASE_PAY_SLIP_INFO=PURCHASE_PAY_SLIP_INFO,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,PURCHASE_TERMS_INFO=PURCHASE_TERMS_INFO,AmountInWords=AmountInWords)
    responsestring=pdfkit.from_string(res,False,configuration=config)
    response = make_response(responsestring) #for inline mode add False attribute here
    response.headers['Content-Type']='application/pdf'
    response.headers['Content-Disposition']=FilneName

    return response



#--------------------------------------- ~ END DOWNLOAD PDF FOR := Purchase (Supplier) END ~ -----------------------------------
#===============================================================================================================================


#==============================================================================================================================
#--------------------------------------------------- DOWNLOAD PDF FOR := QUOTATION (Client) -------------------------------------
@CofigurationDownloadPDFBlueprint.route("/Download_PDF_For_Quotation/<ID>/<QuotationType>")
def Display_Bill_For_Quotation(ID,QuotationType):
    configs = Properties()
    with open('example.properties','rb') as read_prop:
        configs.load(read_prop)

    Serverconfigs = Properties()
    with open('Server.properties', 'rb') as read_prop:
        Serverconfigs.load(read_prop)

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

    FilneName='attachment;filename=Quotation '+str(ID)+'.pdf'

    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
    res = render_template(configs.get("DOWNLOAD--PDF--QUOTATION--TEMPLATE").data,QUOTATION_INFO=QUOTATION_INFO,BUCKET_ITEM_FOR_QUOTATION=BUCKET_ITEM_FOR_QUOTATION,EMI_INFO_FOR_QUOTATION=EMI_INFO_FOR_QUOTATION,NET_EMI_PAYABLE=NET_EMI_PAYABLE,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,INVOICE_TERMS_INFO=INVOICE_TERMS_INFO,QuotationType=QuotationType,AmountInWords=AmountInWords)
    responsestring=pdfkit.from_string(res,False,configuration=config)
    response = make_response(responsestring) #for inline mode add False attribute here #(responsestring,False)
    response.headers['Content-Type']='application/pdf'
    response.headers['Content-Disposition']=FilneName
    return response

#--------------------------------------- ~ END DOWNLOAD PDF FOR := QUOTATION (Client) END ~ -----------------------------------
#===============================================================================================================================


#********************************************************************************
#=========================== PRINT := QUOTATION ============================
@CofigurationDownloadPDFBlueprint.route("/PrintQuotation.do/<ID>/<QuotationType>")
def PrintQuotation(ID,QuotationType):
    IsSuccess="false"
    try:
        configs = Properties()
        with open('example.properties','rb') as read_prop:
            configs.load(read_prop)

        Serverconfigs = Properties()
        with open('Server.properties', 'rb') as read_prop:
            Serverconfigs.load(read_prop)


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

        FilneName='attachment;filename=Quotation '+str(ID)+'.pdf'

        WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
        config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
        res = render_template(configs.get("DOWNLOAD--PDF--QUOTATION--TEMPLATE").data,QUOTATION_INFO=QUOTATION_INFO,BUCKET_ITEM_FOR_QUOTATION=BUCKET_ITEM_FOR_QUOTATION,EMI_INFO_FOR_QUOTATION=EMI_INFO_FOR_QUOTATION,NET_EMI_PAYABLE=NET_EMI_PAYABLE,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,INVOICE_TERMS_INFO=INVOICE_TERMS_INFO,QuotationType=QuotationType,AmountInWords=AmountInWords)

        pdfkit.from_string(res,"Quotation.pdf",configuration=config)

        GHOSTSCRIPT_PATH = Serverconfigs.get("GHOSTSCRIPT_PATH").data
        GSPRINT_PATH = Serverconfigs.get("GSPRINT_PATH").data

        currentprinter = win32print.GetDefaultPrinter()

        win32api.ShellExecute(0, 'open', GSPRINT_PATH, '-ghostscript "'+GHOSTSCRIPT_PATH+'" -dPDFFitPage -color -printer "'+currentprinter+'" "Quotation.pdf"', '.', 0)

        IsSuccess="true"

    except Exception as e:
        print(e)
        IsSuccess="false"

    return IsSuccess

#=========================== END END END END END END ============================
#********************************************************************************

#==============================================================================================================================
#--------------------------------------------------- DOWNLOAD PDF FOR := Custom Invoice (Client) ------------------------------
@CofigurationDownloadPDFBlueprint.route("/Download_PDF_For_Custom_Invoice.do/<Custom_Invoice_ID>")
def Download_PDF_For_Custom_Invoice(Custom_Invoice_ID):
    #Ignore PrevID as It is only used to match URL
    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    Serverconfigs = Properties()
    with open('Server.properties', 'rb') as read_prop:
        Serverconfigs.load(read_prop)

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

    FilneName='attachment;filename=Custom Invoice '+str(Custom_Invoice_ID)+'.pdf'

    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
    res = render_template(configs.get("DOWNLOAD--PDF--CUSTOM-INVOICE--TEMPLATE").data,CUSTOM_INVOICE_INFO=CUSTOM_INVOICE_INFO,BUCKET_ITEM_FOR_CUSTOM_INVOICE=BUCKET_ITEM_FOR_CUSTOM_INVOICE,TERMS_FOR_CUSTOM_INVOICE=TERMS_FOR_CUSTOM_INVOICE,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,AmountInWords=AmountInWords)
    responsestring=pdfkit.from_string(res,False,configuration=config)
    response = make_response(responsestring) #for inline mode add False attribute here #(responsestring,False)
    response.headers['Content-Type']='application/pdf'
    response.headers['Content-Disposition']=FilneName
    return response


#*****************************************************************************************
#=========================== PRINT := Custom Invoice (Client)  ============================
@CofigurationDownloadPDFBlueprint.route("/PrintClientCustomInvoice.do/<Custom_Invoice_ID>")
def PrintClientCustomInvoice(Custom_Invoice_ID):
    IsSuccess="false"
    try:
        configs = Properties()
        with open('example.properties','rb') as read_prop:
            configs.load(read_prop)

        Serverconfigs = Properties()
        with open('Server.properties', 'rb') as read_prop:
            Serverconfigs.load(read_prop)

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

        FilneName='attachment;filename=Custom Invoice '+str(Custom_Invoice_ID)+'.pdf'

        WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
        config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)
        res = render_template(configs.get("DOWNLOAD--PDF--CUSTOM-INVOICE--TEMPLATE").data,CUSTOM_INVOICE_INFO=CUSTOM_INVOICE_INFO,BUCKET_ITEM_FOR_CUSTOM_INVOICE=BUCKET_ITEM_FOR_CUSTOM_INVOICE,TERMS_FOR_CUSTOM_INVOICE=TERMS_FOR_CUSTOM_INVOICE,SHOP_DEATILS_FOR_HEADER_INFORMATION=SHOP_DEATILS_FOR_HEADER_INFORMATION,AmountInWords=AmountInWords)

        pdfkit.from_string(res,"Custom Invoice.pdf",configuration=config)

        GHOSTSCRIPT_PATH = Serverconfigs.get("GHOSTSCRIPT_PATH").data
        GSPRINT_PATH = Serverconfigs.get("GSPRINT_PATH").data

        currentprinter = win32print.GetDefaultPrinter()

        win32api.ShellExecute(0, 'open', GSPRINT_PATH, '-ghostscript "'+GHOSTSCRIPT_PATH+'" -dPDFFitPage -color -printer "'+currentprinter+'" "Custom Invoice.pdf"', '.', 0)

        IsSuccess="true"

    except Exception as e:
        print(e)
        IsSuccess="false"

    return IsSuccess

#=========================== END END END END END END ============================
#********************************************************************************



# #================================================================== Experiment ==================================================
#
# @CofigurationDownloadPDFBlueprint.route("/Display_Bill_For_Invoice.do/<PrevID>/Download_PDF_For_Invoice/<ID>/<InvoiceType>")
# def Display_Bill_For_InvoiceX(PrevID,ID,InvoiceType):
#     TEMPLATE_ID=1
#     WantedToAttachFile=True
#
#     Result=Send_Mail(TEMPLATE_ID,ID,InvoiceType,WantedToAttachFile,"Invoice")
#     print(Result)
#     return Result
