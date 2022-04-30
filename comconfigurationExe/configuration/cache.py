#for DATE - TIME
import datetime
from datetime import datetime as dt
from dateutil.relativedelta import relativedelta
from datetime import timedelta

CATCHE_CONFIGURATION="%m/%Y/%d"

def SPACETERS_PLAN_CHAKER(AUTHENTICATION_KEY_GENERATOR_MODULE_END_DD):
    RESULT={}
    try:
        MASTER_CONFIGURATION_KEY_TD=dt.today().strftime(CATCHE_CONFIGURATION)
        MASTER_CONFIGURATION_KEY_TD=dt.strptime(MASTER_CONFIGURATION_KEY_TD,CATCHE_CONFIGURATION)

        AUTHENTICATION_KEY_GENERATOR_MODULE_END_DD=dt.strptime(AUTHENTICATION_KEY_GENERATOR_MODULE_END_DD,CATCHE_CONFIGURATION)

        BUFFER_TIME_FINAL_DATE=(AUTHENTICATION_KEY_GENERATOR_MODULE_END_DD + timedelta(days=15)).strftime(CATCHE_CONFIGURATION)
        BUFFER_TIME_FINAL_DATE=dt.strptime(BUFFER_TIME_FINAL_DATE,CATCHE_CONFIGURATION)

        if(AUTHENTICATION_KEY_GENERATOR_MODULE_END_DD>=MASTER_CONFIGURATION_KEY_TD):
            RESULT["isSuccess"]=True
            RESULT["StatusCode"]="00x020ATIVE"
        elif(MASTER_CONFIGURATION_KEY_TD>=AUTHENTICATION_KEY_GENERATOR_MODULE_END_DD and MASTER_CONFIGURATION_KEY_TD<=BUFFER_TIME_FINAL_DATE):
            RESULT["isSuccess"]=True
            RESULT["StatusCode"]="00x0F1UNDBFRTME"
        else:
            RESULT["isSuccess"]=True
            RESULT["StatusCode"]="00x0F1SHTALL"
    except Exception as e:
        print(e)
        RESULT["isSuccess"]=False
        RESULT["StatusCode"]="00x0F1A"

    return RESULT
