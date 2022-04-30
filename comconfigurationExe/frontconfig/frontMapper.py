#---------------------------------------------------------------------------------------------------------------------------------------------
#============================================================= User Details  =================================================================
FETCH_OWNER_NAME="select FN || ' ' || LN from User_Profile"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================

#---------------------------------------------------------------------------------------------------------------------------------------------
#============================================================= Notification  =================================================================
FETCH_NOTIFICATION="SELECT reminder_id,reminder_mesg ,'reminder' as Type FROM Reminder WHERE isSeen='false' AND (DATE('now','localtime')  BETWEEN Reminder_Start_Date AND Reminder_End_Date) UNION SELECT '0'as reminder_id,FN ||' '|| LN || ' have Birth Day today' as reminder_mesg  ,'birthday' as Type FROM Client_Data WHERE strftime('%d',DOB) = strftime('%d',DATE('now','localtime')) AND strftime('%m',DOB) = strftime('%m',DATE('now','localtime'))"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================

#---------------------------------------------------------------------------------------------------------------------------------------------
#============================================================= For Daily Summary  ============================================================
FETCH_TODAY_Customer_Invoices="SELECT I.Invoice_NO,I.Invoice_Type,CD.FN || ' ' || CD.LN as Customer_Name,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status FROM Invoice I LEFT JOIN Invoice_Bill IB ON IB.Invoice_NO=I.Invoice_NO LEFT JOIN Client_Data CD ON CD.client_id=I.Client_ID WHERE I.isActive='true' AND I.isReturn='false' AND I.Created_Date=DATE('now','localtime') ORDER BY Customer_Name"

FETCH_TODAY_Purchase_Invoices="SELECT P.P_Bill_NO,P.Purchas_Type,SD.FN || ' ' || SD.LN as SupplierName ,PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON PB.P_Bill_NO = P.P_Bill_NO LEFT JOIN Supplier_Data SD ON SD.supplier_id = P.Supplier_ID WHERE P.isActive='true' AND P.isReturn='false' AND P.Created_Date=DATE('now','localtime') ORDER BY SupplierName"

FETCH_TODAY_Payment_Transaction="SELECT PI.Invoice_ID as PaymentID,P.P_Bill_NO as InvoiceNo,SD.FN || ' ' || SD.LN as Name,PI.Amount_Paid,PI.Payment_Mode,PI.Txn_NO,PI.Remarks,'Purchase' as PaymentFor   FROM Purchase_Invoices PI LEFT JOIN Purchase P on P.P_Bill_NO = PI.P_Bill_NO LEFT JOIN Supplier_Data SD on SD.supplier_id = P.Supplier_ID WHERE P.isActive='true' AND P.isReturn='false' AND  PI.Created_Date=DATE('now','localtime') UNION SELECT II.Invoice_ID as PaymentID,I.Invoice_NO as InvoiceNo,CD.FN || ' ' || CD.LN as Name,II.Amount_Paid,II.Payment_Mode,II.Txn_NO,II.Remarks,'Invoice' as PaymentFor   FROM Invoice_Invoices II LEFT JOIN Invoice I ON I.Invoice_NO = II.Invoice_NO LEFT JOIN Client_Data CD on CD.client_id=I.Client_ID WHERE I.isActive='true' AND I.isReturn='false' AND II.Created_Date=DATE('now','localtime')"

FETCH_TODAY_Stock_Transaction="SELECT PIB.Stock_ID,PIB.Stock_Name,PIB.Qty,SD.FN || ' ' || SD.LN as name,PIB.P_Bill_NO as Invoice,'Supplier' as TransactionFor FROM Purchase_Item_Bucket PIB LEFT JOIN Purchase P ON P.P_Bill_NO = PIB.P_Bill_NO LEFT JOIN Supplier_Data SD ON SD.supplier_id= P.Supplier_ID WHERE P.Created_Date=DATE('now','localtime') UNION SELECT IIB.Stock_ID,IIB.Stock_Name,IIB.Qty,CD.FN || ' ' || CD.LN as name,IIB.Invoice_NO as Invoice,'Customer' as TransactionFor   FROM Invoice_Item_Bucket IIB LEFT JOIN Invoice I ON I.Invoice_NO = IIB.Invoice_NO LEFT JOIN Client_Data CD ON CD.client_id = I.Client_ID WHERE I.Created_Date=DATE('now','localtime') ORDER BY TransactionFor"

FETCH_TODAY_Client_Joine="SELECT client_id,FN || ' ' || LN , contact_no,address || ' ,' || city || ',' || state || '. '|| pincode , PAN_NO FROM Client_Data WHERE isActive='true' AND Created_Date=DATE('now','localtime') order by FN"

FETCH_TODAY_Supplier_Joine="SELECT supplier_id,FN || ' ' || LN , contact_no,address || ' ,' || city || ',' || state || '. '|| pincode , PAN_NO ,GSTIN FROM Supplier_Data WHERE isActive='true' AND Created_Date=DATE('now','localtime') order by FN"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================


#---------------------------------------------------------------------------------------------------------------------------------------------
#============================================================= For Stock Summary  ============================================================
FETCH_STOCK_SUMMARY="SELECT a.StockID,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date FROM Stock_Summary a left join Stock_Details b on  b.StockID = a.StockID  ORDER BY  Product_name"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================

#---------------------------------------------------------------------------------------------------------------------------------------------
#============================================================= Quick Information  ============================================================
FETCH_QUICK_INFORMATION="SELECT COUNT(IB.ID),SUM(IB.Total_Amount),SUM(IB.Amount_Paid),SUM(IB.Balance_Amount) from Invoice I LEFT JOIN Invoice_Bill IB on IB.Invoice_NO=I.Invoice_NO WHERE I.isActive='true' AND I.isReturn='false' AND I.Created_Date=DATE('now','localtime') "

FETCH_NEW_CLIENT_JOIN="SELECT COUNT(*) FROM Client_Data WHERE isActive='true' and Created_Date >= DATE('now','-1 month')  and Created_Date <= DATE('now')"

FETCH_NEW_INVOICE_COUNT="select count(Invoice_ID) from Invoice where isActive='true' AND isReturn='false' AND Created_Date >= DATE('now','-1 month')  and Created_Date <= DATE('now')"

FETCH_NEW_PURCHASE_COUNT="SELECT COUNT(Purchase_ID) from Purchase where isActive='true' AND isReturn='false' AND Created_Date >= DATE('now','-1 month')  and Created_Date <= DATE('now')"

FETCH_NEW_QUOTATION_COUNT="SELECT COUNT(Quotation_ID) from Quotation where isActive='true' AND Created_Date >= DATE('now','-1 month')  and Created_Date <= DATE('now')"

FETCH_LOW_STOCK_OUT_OF_COUNT="SELECT (select count(StockID) FROM Stock_Summary WHERE Quantity<=0 AND isActive='true') as OutOfStock,(select count(StockID) FROM Stock_Summary WHERE Quantity>0 AND Quantity<=? AND isActive='true') as LowStock"

FETCH_UNPAID_INVOICES_COUNT="SELECT COUNT(IB.ID) from Invoice I LEFT JOIN Invoice_Bill IB ON IB.Invoice_NO=I.Invoice_NO WHERE IB.Status!='Complete' AND I.isActive='true' AND I.isReturn='false'"

FETCH_UNPAID_PURCHASE_COUNT="select count(PB.ID) from Purchase P LEFT JOIN Purchase_Bill PB ON PB.P_Bill_NO=P.P_Bill_NO WHERE Status!='Complete' AND P.isActive='true' AND P.isReturn='false'"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================

#---------------------------------------------------------------------------------------------------------------------------------------------
#============================================================= ADD PAYMENT  ==================================================================
FETCH_UNPAID_INVOICE_LIST_NORMAL="SELECT I.Invoice_NO,I.Client_ID,CD.FN || ' ' || CD.LN as ClientName,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount FROM Invoice I LEFT JOIN Invoice_Bill IB ON IB.Invoice_NO = I.Invoice_NO LEFT JOIN Client_Data CD ON CD.client_id = I.Client_ID WHERE I.isActive='true' AND I.isReturn='false' AND IB.Status='Pending'  ORDER BY ClientName"

FETCH_UNPAID_INVOICE_LIST_EMI="Select DISTINCT IE.Invoice_NO ,CD.FN || ' ' || CD.LN as ClientName from Invoice_EMI IE LEFT JOIN Invoice I ON I.Invoice_NO = IE.Invoice_NO LEFT JOIN Client_Data CD ON CD.client_id = I.Client_ID where I.isActive='true' AND I.isReturn='false' AND IE.status='Pending' ORDER BY ClientName"

FETCH_SELECTED_UNPAID_EMI_INFORMATION="Select IE.EMI_ID ,IE.Invoice_NO,IE.EMI_Month,IE.EMI_Amount,CD.FN || ' ' || CD.LN as ClientName,(SELECT strftime('%d-%m-%Y',Created_Date) Created_Date FROM Invoice_Invoices where  Invoice_NO=? ORDER BY Invoice_ID DESC LIMIT 1) as Previuos_Payemnt_Date from Invoice_EMI IE  LEFT JOIN Invoice I ON I.Invoice_NO = IE.Invoice_NO LEFT JOIN Client_Data CD ON CD.client_id = I.Client_ID where IE.Invoice_NO=? ORDER BY IE.EMI_ID  LIMIT 1 "

FETCH_UNPAID_PURCHASE_LIST="SELECT P.P_Bill_NO,P.Supplier_ID,SD.FN || ' ' || SD.LN as SupplierName,PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount FROM Purchase P LEFT JOIN Purchase_Bill PB ON PB.P_Bill_NO = P.P_Bill_NO LEFT JOIN Supplier_Data SD ON SD.supplier_id = P.Supplier_ID WHERE P.isActive='true' AND P.isReturn='false' AND PB.Status='Pending' ORDER BY SupplierName"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================


#---------------------------------------------------------------------------------------------------------------------------------------------
#============================================================= BUSINESS BOOK ==================================================================
GET_BUSINESS_BOOK_DATA="SELECT II.Paid_on,II.Remarks||'/'||CD.FN || ' ' ||CD.LN||'/'||II.Invoice_NO as particulars,II.Payment_Mode,II.Amount_Paid,'credit' as type FROM Invoice_Invoices II LEFT JOIN Invoice I ON I.Invoice_NO = II.Invoice_NO LEFT JOIN Client_Data CD ON CD.client_id=I.Client_ID WHERE I.isActive='true' AND I.isReturn='false' AND II.Paid_on >= ? and II.Paid_on <= ? UNION SELECT PI.Paid_on,PI.Remarks||'/'||SD.FN || ' ' ||SD.LN||'/'||PI.P_Order_NO as particulars,PI.Payment_Mode,PI.Amount_Paid,'debit' as type  from Purchase_Invoices PI  LEFT JOIN Purchase P ON P.P_Bill_NO=PI.P_Bill_NO LEFT JOIN Supplier_Data SD ON SD.supplier_id = P.Supplier_ID WHERE P.isActive='true' AND P.isReturn='false' AND PI.Paid_on >= ? and PI.Paid_on <= ? UNION select expense_date,'Expense'|| '@'||expense_type||'-'||paid_to as particulars,MOP as Payment_Mode,expense_amount as Amount_Paid,'debit' as type from expense WHERE expense_date >= ? and expense_date <= ? UNION SELECT Adjustment_Date as Paid_on , Remarks||'/Self/Adjust/'|| Cash_Adjustment_ID as particulars,Payment_Mode as Payment_Mode,Amount as Amount_Paid,lower(Type) as type  FROM Cash_Adjustment WHERE Adjustment_Date >= ? and Adjustment_Date <= ?"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================

 #---------------------------------------------------------------------------------------------------------------------------------------------
 #============================================================= FRONT PAGE GRAPH ==================================================================
FETCH_TOTAL_SALE_PER_MONTH="SELECT strftime('%m', Created_Date) as Month, COUNT(Invoice_ID) as Total_Sale FROM Invoice WHERE isActive='true' AND isReturn='false' AND strftime('%Y', Created_Date) = ? GROUP BY strftime('%m', Created_Date)"

TOTAL_AVG_COST_OF_SALE_PER_MONTH="SELECT strftime('%m', I.Created_Date) as Month, SUM(IB.Total_Amount) as Total_Amount,SUM(IB.Amount_Paid) as Amount_Paid, SUM(IB.Balance_Amount) as Balance_Amount FROM Invoice I LEFT JOIN Invoice_Bill IB on IB.Invoice_NO = I.Invoice_NO WHERE I.isActive='true' AND I.isReturn='false' AND strftime('%Y', I.Created_Date) = ? GROUP BY strftime('%m', I.Created_Date)"
#---------------------------------------------------------------------------------------------------------------------------------------------
#=============================================================================================================================================
