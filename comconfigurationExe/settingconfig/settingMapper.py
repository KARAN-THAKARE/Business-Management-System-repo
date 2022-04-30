#@ User Profile ============================================================================
GET_SYSTEM_INFORM="SELECT * FROM config"
GET_USER_DETAILES="SELECT * FROM User_Profile"
UPDATE_USER_DETAILES="UPDATE User_Profile SET FN=?,MN=?,LN=?,Address=?,City=?,State=?,PinCode=?,Contact_No=?,Email=?,Gender=?,DOB=?,Update_Date=? WHERE User_ID = ? "
#===============================================================================================

#@ Store Profile ============================================================================
GET_STORE_DETAILES="SELECT * FROM Shop_Profile"
UPDATE_STORE_DETAILES="UPDATE Shop_Profile SET Shop_Name=?,Address=?,City=?,State=?,PinCode=?,Contact_No1=?,Contact_No2=?,Email=?,GSTIN=?,Update_Date=? WHERE Shop_ID = ? "
#===============================================================================================


#@ Add Terms ============================================================================
FETCH_TERMS="SELECT * FROM Terms_and_Conditions"
ADD_TERMS="INSERT INTO Terms_and_Conditions (Terms,isActiveForInvoice,isActiveForPurchase,Created_Date) values(?,?,?,?)"
DELETE_TERMS="DELETE FROM Terms_and_Conditions WHERE ID=?"
UPDATE_TERMS="UPDATE Terms_and_Conditions SET Terms=? WHERE ID = ? "
UPDATE_TERMS_ACCESS_FOR_INVOICE="UPDATE Terms_and_Conditions SET isActiveForInvoice=? WHERE ID = ? "
UPDATE_TERMS_ACCESS_FOR_PURCHASE="UPDATE Terms_and_Conditions SET isActiveForPurchase=? WHERE ID = ? "
#========================================================================================


RENEW_PLANS="UPDATE config SET Key1=?,Key2=?,Key3=?,Key4=?,UpdatedDate=? "
FETCH_DATA_FROM_CONFIG="SELECT * FROM config"
