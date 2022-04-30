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

CofigurationEmailManagementBlueprint = Blueprint('CofigurationEmailManagementBlueprint', __name__,template_folder='templates',static_folder='static')

from comconfigurationExe.emailconfig.emailMapper import *


#===============================================================================
#-------------------------- Show Email Management ------------------------------

@CofigurationEmailManagementBlueprint.route("/EmailManagement")
def EmailManagement():
    return render_template(configs.get("EMAIL_MANAGEMENT_TEMPLATE").data);

#---------------------------------- END END END --------------------------------
#===============================================================================
