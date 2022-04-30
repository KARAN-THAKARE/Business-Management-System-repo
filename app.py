import sys, os
if sys.executable.endswith('pythonw.exe'):
    sys.stdout = open(os.devnull, 'w')
    sys.stderr = open(os.path.join(os.getenv('TEMP'), 'stderr-{}'.format(os.path.basename(sys.argv[0]))), "w")

from flask import Flask, render_template, request,redirect,jsonify
from flaskwebgui import FlaskUI #get the FlaskUI class
import sqlite3
import ctypes
import json


from jproperties import Properties


#for Email
import smtplib
import email.message




from comconfigurationExe.frontconfig.frontconfig import CofigurationhomeBlueprint


from comconfigurationExe.reminderconfig.reminderconfig import CofigurationReminderBlueprint

from comconfigurationExe.clientconfig.clientconfig import CofigurationClientBlueprint

from comconfigurationExe.supplierconfig.supplierconfig import CofigurationSupplierBlueprint

from comconfigurationExe.inventoryconfig.inventoryconfig import CofigurationInventoryBlueprint

from comconfigurationExe.stockconfig.stockconfig import CofigurationStockDashboardBlueprint

#--------------------------------------- STAFF------------------------------------------------
from comconfigurationExe.staffconfig.Salaryconfig import CofigurationSalaryBlueprint
from comconfigurationExe.staffconfig.staffconfig import CofigurationStaffBlueprint
#--------------------------------------------------------------------------------------------------


#--------------------------------------- MANAGE DASHBOARD------------------------------------------------
from comconfigurationExe.manageinvoicebillconfig.manageinvoicebillconfig import CofigurationManageInvoiceBillBlueprint
from comconfigurationExe.managepurchasebillconfig.managepurchasebillconfig import CofigurationManagePurchaseBillBlueprint
from comconfigurationExe.managequotationbillconfig.managequotationbillconfig import CofigurationManageQuotationBillBlueprint
#------------------------------------------------------------------------------------------------------------

#--------------------------------------- ADD NEW INVOICE------------------------------------------------
from comconfigurationExe.addnewinvoiceconfig.addnewinvoiceconfig import CofigurationAddNewInvoiceBlueprint
#------------------------------------------------------------------------------------------------------------

#--------------------------------------- ADD NEW PURCHASE------------------------------------------------
from comconfigurationExe.addnewpurchasebillconfig.addnewpurchasebillconfig import CofigurationAddNewPurchaseBillBlueprint
#------------------------------------------------------------------------------------------------------------

#--------------------------------------- ADD NEW QUOTATION------------------------------------------------
from comconfigurationExe.addnewquotationconfig.addnewquotationconfig import CofigurationAddNewQuotationBlueprint
#------------------------------------------------------------------------------------------------------------

#--------------------------------------- DISPLAY BILL :  ------------------------------------------------
#@Invoice
from comconfigurationExe.displaybillconfig.genrateBillForINVOICEconfig import CofigurationDisplayBillForInvoiceBlueprint
#@Purchase order
from comconfigurationExe.displaybillconfig.generateBillForPURCHASEconfig import CofigurationDisplayBillForPurchaseBlueprint
#@Quotation
from comconfigurationExe.displaybillconfig.genrateBillForQUOTATIONconfig import CofigurationDisplayBillForQuotationBlueprint
#------------------------------------------------------------------------------------------------------------

#------------------------- Edit -----------------------------------------------------------------------
from comconfigurationExe.Editquotationconfig.Editquotationconfig import CofigurationEditQuotationBlueprint
from comconfigurationExe.Editinvoiceconfig.Editinvoiceconfig import CofigurationEditInvoiceBlueprint
from comconfigurationExe.Editpurchaseconfig.Editpurchaseconfig import CofigurationEditPurchaseBlueprint
#----------------------------------------------------------------------------------------------------------

#------------------------- Pay Bill -----------------------------------------------------------------------
from comconfigurationExe.paybillconfig.paybillconfig import CofigurationPayBillBlueprint
#----------------------------------------------------------------------------------------------------------

#--------------------------------------- CREATE~DOWNLOAD PDF ------------------------------------------------
from comconfigurationExe.downloadpdfconfig.downloadpdfconfig import CofigurationDownloadPDFBlueprint
#------------------------------------------------------------------------------------------------------------

#--------------------------------------- Analysis --------------------------------------------
from comconfigurationExe.analysisconfig.analysisconfig import CofigurationAnalysisBlueprint
#---------------------------------------------------------------------------------------------

#--------------------------------------- Report --------------------------------------------
from comconfigurationExe.reportconfig.reportclientconfig import CofigurationReportBlueprint
#---------------------------------------------------------------------------------------------

#--------------------------------------- Setting --------------------------------------------
from comconfigurationExe.settingconfig.settingconfig import CofigurationSettingBlueprint
#---------------------------------------------------------------------------------------------

#--------------------------------------- Quick Search --------------------------------------------
from comconfigurationExe.quicksearchconfig.quicksearchconfig import CofigurationQuickSearchBlueprint
#---------------------------------------------------------------------------------------------

#--------------------------------------- Expense --------------------------------------------
from comconfigurationExe.expenseconfig.expenseconfig import CofigurationExpenseBlueprint
#---------------------------------------------------------------------------------------------

#--------------------------------------- Cash Adjustment --------------------------------------------
from comconfigurationExe.cashadjustmentconfig.cashadjustmentconfig import CofigurationCashAdjustmentBlueprint
#---------------------------------------------------------------------------------------------

#--------------------------------------- Email Management --------------------------------------------
from comconfigurationExe.emailconfig.emailconfig import CofigurationEmailManagementBlueprint
#---------------------------------------------------------------------------------------------

#--------------------------------------- Custom Invoice Maker -------------------------------
from comconfigurationExe.custominvoicemakerconfig.custominvoicemakerconfig import CofigurationCustomInvoiceMakerBlueprint
#---------------------------------------------------------------------------------------------


#--------------------------------------- Daily report sender -------------------------------
from comconfigurationExe.dailyreportconfig.dailyreportconfig import CofigurationDailyreportBlueprint
#---------------------------------------------------------------------------------------------



app = Flask(__name__)

ui = FlaskUI(app)


app.register_blueprint(CofigurationhomeBlueprint)
app.register_blueprint(CofigurationAddNewInvoiceBlueprint)


app.register_blueprint(CofigurationReminderBlueprint)
app.register_blueprint(CofigurationClientBlueprint)
app.register_blueprint(CofigurationSupplierBlueprint)

app.register_blueprint(CofigurationInventoryBlueprint)
app.register_blueprint(CofigurationStockDashboardBlueprint)

app.register_blueprint(CofigurationStaffBlueprint)
app.register_blueprint(CofigurationSalaryBlueprint)

app.register_blueprint(CofigurationManagePurchaseBillBlueprint)
app.register_blueprint(CofigurationManageInvoiceBillBlueprint)
app.register_blueprint(CofigurationManageQuotationBillBlueprint)
#------------------------- Display Bill --------------------------------
app.register_blueprint(CofigurationDisplayBillForPurchaseBlueprint)
app.register_blueprint(CofigurationDisplayBillForInvoiceBlueprint)
app.register_blueprint(CofigurationDisplayBillForQuotationBlueprint)
#------------------------------------------------------------------

#------------------------- Edit --------------------------------
app.register_blueprint(CofigurationEditQuotationBlueprint)
app.register_blueprint(CofigurationEditInvoiceBlueprint)
app.register_blueprint(CofigurationEditPurchaseBlueprint)
#------------------------------------------------------------------



#------------------------- Purchase Bill --------------------------------
app.register_blueprint(CofigurationAddNewPurchaseBillBlueprint)
#------------------------------------------------------------------
#------------------------- Quotation --------------------------------
app.register_blueprint(CofigurationAddNewQuotationBlueprint)
#------------------------------------------------------------------

#------------------------- Pay Bill --------------------------------
app.register_blueprint(CofigurationPayBillBlueprint)
#------------------------------------------------------------------

#---------------------- CREATE~DOWNLOAD PDF ----------------------
app.register_blueprint(CofigurationDownloadPDFBlueprint)
#------------------------------------------------------------------

#------------------------- Analysis --------------------------------
app.register_blueprint(CofigurationAnalysisBlueprint)
#------------------------------------------------------------------


#------------------------- Report --------------------------------
app.register_blueprint(CofigurationReportBlueprint)
#------------------------------------------------------------------

#------------------------- Setting --------------------------------
app.register_blueprint(CofigurationSettingBlueprint)
#------------------------------------------------------------------

#--------------------------------------- Quick Search --------------------------------------------
app.register_blueprint(CofigurationQuickSearchBlueprint)
#---------------------------------------------------------------------------------------------

#--------------------------------------- Expense --------------------------------------------
app.register_blueprint(CofigurationExpenseBlueprint)
#---------------------------------------------------------------------------------------------

#----------------------------- Cash Adjustment --------------------------------
app.register_blueprint(CofigurationCashAdjustmentBlueprint)
#-------------------------------------------------------------------------------

#----------------------------- Custom Invoice Maker --------------------------------
app.register_blueprint(CofigurationCustomInvoiceMakerBlueprint)
#-------------------------------------------------------------------------------

#----------------------------- Email Management --------------------------------
app.register_blueprint(CofigurationEmailManagementBlueprint)
#-------------------------------------------------------------------------------


#----------------------------- Daily Report --------------------------------
app.register_blueprint(CofigurationDailyreportBlueprint)
#-------------------------------------------------------------------------------

ui.run()
if __name__ == '__main__':
    app.run(debug = True)
