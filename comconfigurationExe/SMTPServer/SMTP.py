'''
Note:-
======================================================================================================
if you are facing "smtplib.SMTPAuthenticationError: (535, b'5.7.8 Username and Password not accepted.
Learn more at\n5.7.8  https://support.google.com/mail/?p=BadCredentials w11sm1555132pfj.65 - gsmtp')"

then go to this link
    https://www.google.com/settings/security/lesssecureapps
and then  login with email that we are using in email marketing
and  Allow less secure apps : ON
======================================================================================================

======================================================================================================
if you are facing  : 'Error': gaierror(11001, 'getaddrinfo failed'),
then it must be wrong with server name SMTP_SERVER='smtp.gmail.com'
======================================================================================================


'''

from flask import Flask,Blueprint,request,render_template,make_response
import json
import sqlite3
import pdfkit
import re

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

from comconfigurationExe.SMTPServer.PDFMaker  import *
from comconfigurationExe.SMTPServer.ServerMapper  import *
from comconfigurationExe.downloadpdfconfig.downloadpdfMapper  import *
from jproperties import Properties
Serverconfigs = Properties()
with open('Server.properties', 'rb') as read_prop:
    Serverconfigs.load(read_prop)

def Send_Mail(TEMPLATE_ID,ID,Type,WantedToAttachFile,Option):
    Result={}
    isSuccess="false"
    Error=""
    FrontEndMesg=""


    WKHTMLTOX_PATH=Serverconfigs.get("WKHTMLTOX_PATH").data
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOX_PATH)

    con = sqlite3.connect("IMSConfig.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    # @STEP 1 ==> Creating PDF virtually
    try:
        if(Option=='Invoice'):
            res = Invoice_For_Client(ID,Type)
            cur.execute(FETCH_INVOICE_INFO,(ID,))
            FETCH_INVOICE_INFORMATION  = cur.fetchall()
            for each in FETCH_INVOICE_INFORMATION:
                Customer_Name=each[17]
                receiver_email=each[25]

        elif(Option=='Quotation'):
            res = Quotation_For_Client(ID,Type)
            cur.execute(FETCH_QUOTATION_INFO,(ID,))
            FETCH_QUOTATION_INFORMATION = cur.fetchall()
            for each in FETCH_QUOTATION_INFORMATION:
                Customer_Name=each[17]
                receiver_email=each[23]

        elif(Option=='Purchase'):
            res = Invoice_For_Supplier(ID,Type)
            cur.execute(FETCH_PURCHASE_BILL_INFO,(ID,))
            FETCH_PURCHASE_BILL_INFORMATION = cur.fetchall()
            for each in FETCH_PURCHASE_BILL_INFORMATION:
                Customer_Name=each[20]
                receiver_email=each[26]

        elif(Option=='Custom Invoice'):
            res = Custom_Invoice_For_Client(ID)
            cur.execute(FETCH_CUSTOM_INVOICE_INFO,(ID,))
            FETCH_CUSTOM_INVOICE_INFORMATION = cur.fetchall()
            for each in FETCH_CUSTOM_INVOICE_INFORMATION:
                Customer_Name=each[4]
                receiver_email=each[10]

        filename = Option+' '+str(ID)+'.pdf'
        isSuccess="true"
        FrontEndMesg="Invoice PDF Has been successfully created."
    except Exception as e:
        isSuccess="false"
        Error=e
        FrontEndMesg="Failed to create Invoice PDF."

    #@ Find Email ID
    if(receiver_email is not None and receiver_email!=''):
        isSuccess="true"
        FrontEndMesg="Email Found successfully"
    else:
        isSuccess="false"
        FrontEndMesg="Email ID is not available."

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    # @STEP 2 ==> SET UP EMAIL
    if(isSuccess=="true"):
        try:
            #@Set port and server
            port = Serverconfigs.get("PORT").data
            smtp_server =str(Serverconfigs.get("SMTP_SERVER").data)

            #@Set Email Body
            sender_email=str(Serverconfigs.get("EMAILID").data)
            password=str(Serverconfigs.get("EMAILID_PASSWORD").data)

            cur.execute(FETCH_TEMPLATE,(TEMPLATE_ID,))
            TEMPLATE_INFO = cur.fetchall()
            for each in TEMPLATE_INFO:
                Subject=each[2]
                Email_Template=each[3]

            message = MIMEMultipart("alternative")
            message["Subject"] = Subject
            message["From"] = sender_email
            message["To"] = receiver_email

            Email_Template=Email_Template.replace("%s",Customer_Name)
            message.attach(MIMEText(Email_Template,'html'))           # Turn these into plain/html MIMEText objects

            isSuccess="true"
            FrontEndMesg="Email Body set successfully."
        except Exception as e:
            isSuccess="false"
            Error=e
            FrontEndMesg="failed to set email body."
    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    # @STEP 3 ==> ATTACH FILE ALONG WITH PDF
    if(isSuccess=='true' and WantedToAttachFile):
        try:
            part = MIMEBase("application","octet-stream")
            part.set_payload(pdfkit.from_string(res,False,configuration=config))
            encoders.encode_base64(part)
            part.add_header("Content-Disposition",f"attachment; filename= {filename}",)
            message.attach(part)

            isSuccess="true"
            FrontEndMesg="File attached along with email successfully."
        except Exception as e:
            isSuccess="false"
            Error=e
            FrontEndMesg="failed to attach file along with email."
    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    # @STEP 4 ==> CREATE CONNECTION WITH SERVER AND SEND E-MAIL
    if(isSuccess=="true"):
        try:
            print(sender_email, password)
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_server,port,context=context) as server:
                server.login(sender_email, password)
                server.sendmail(
                    sender_email,
                    receiver_email,
                    message.as_string()
                )

            isSuccess="true"
            FrontEndMesg="Email Sent Successfully"
        except Exception as e:
            if re.search("Username and Password not accepted", str(e) ):
                FrontEndMesg="less secure apps status is ON . Please make less secure apps OFF"
            else:
                FrontEndMesg="failed probably system is facing some issue with connection with server or you are not connected to internet."
            isSuccess="false"
            Error='Connection to server failed'

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Result['isSuccess']=isSuccess
    Result['Error']=Error
    Result['FrontEndMesg']=FrontEndMesg
    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return Result
