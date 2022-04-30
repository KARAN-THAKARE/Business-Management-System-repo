#================================================================ PAY BILL FOR INVOICE ==========================================================================
#@ Pay bill for invoice
FETCH_INVOICE_INFORMATION="SELECT * FROM Invoice_Bill WHERE Invoice_NO =? "
ADD_PAYEMENT_FOR_INVOICE_BILL="INSERT INTO Invoice_Invoices (Invoice_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?)"
UPDATE_INVOICE_FOR_INVOICE_BILL="UPDATE Invoice_Bill SET Amount_Paid=?,Balance_Amount=?,Status=?  WHERE Invoice_NO = ? "
#=================================================================================================================================================================


#================================================================ PAY BILL FOR INVOICE ~ EMI ==========================================================================
#@create invoice of EMI
CREATE_INVOICE_FOR_EMI="INSERT INTO Invoice_Invoices (Invoice_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?)"

#@create invoice of EMI
FETCH_RECENTLY_CREATED_INVOICE_ID="SELECT  * FROM Invoice_Invoices ORDER BY Invoice_ID DESC LIMIT 1"

#@Update EMI Information
UPDATE_EMI_INFORMATION="UPDATE Invoice_EMI SET InvoiceID_For_EMI=?,EMI_Paid_Amount=?,EMI_Paid_Date=?,Status=?,Updation_Date=?   WHERE EMI_ID = ? "
#=================================================================================================================================================================

#================================================================ PAY BILL FOR PURCHASE ==========================================================================
#@ Pay bill for Purchase
FETCH_PURCHASE_INFORMATION="SELECT * FROM Purchase_Bill WHERE P_Bill_NO =? "
ADD_PAYEMENT_FOR_PURCHASE_BILL="INSERT INTO Purchase_Invoices (P_Bill_NO,P_Order_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?,?)"
UPDATE_PURCHASE_FOR_PURCHASE_BILL="UPDATE Purchase_Bill SET Amount_Paid=?,Balance_Amount=?,Status=?  WHERE P_Bill_NO = ? "
#=================================================================================================================================================================
