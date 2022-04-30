
#=============================================================================================================================================================
#------------------------------------------------------------ PAYMENT REPORT CONSTANT QUERY ------------------------------------------------------------------

GENERATE_PAYMENT_REPORT_GENERAL="SELECT PI.Invoice_ID as PaymentID,P.P_Order_NO as InvoiceNo,SD.FN || ' ' || SD.LN as Name,PI.Amount_Paid,CASE WHEN PI.Payment_Mode IS NULL THEN ''  ELSE PI.Payment_Mode END as Payment_Mode,CASE WHEN PI.Txn_NO IS NULL THEN ''  ELSE PI.Txn_NO END as Txn_NO,PI.Remarks,'Purchase' as PaymentFor, PI.Paid_on as PaidOn FROM Purchase_Invoices PI LEFT JOIN Purchase P on P.P_Bill_NO = PI.P_Bill_NO LEFT JOIN Supplier_Data SD on SD.supplier_id = P.Supplier_ID  WHERE PI.Created_Date >= ? and PI.Created_Date <= ? UNION SELECT II.Invoice_ID as PaymentID,I.Invoice_NO as InvoiceNo,CD.FN || ' ' || CD.LN as Name,II.Amount_Paid,CASE WHEN II.Payment_Mode IS NULL THEN ''  ELSE II.Payment_Mode END as Payment_Mode,CASE WHEN II.Txn_NO IS NULL THEN ''  ELSE II.Txn_NO END as Txn_NO,II.Remarks,'Invoice' as PaymentFor , II.Paid_on as PaidOn FROM Invoice_Invoices II LEFT JOIN Invoice I ON I.Invoice_NO = II.Invoice_NO LEFT JOIN Client_Data CD on CD.client_id=I.Client_ID  WHERE II.Created_Date >= ? and II.Created_Date <= ? ORDER BY PaidOn"

GENERATE_PAYMENT_PAY_IN="SELECT II.Invoice_ID as PaymentID,I.Invoice_NO as InvoiceNo,CD.FN || ' ' || CD.LN as Name,II.Amount_Paid,CASE WHEN II.Payment_Mode IS NULL THEN ''   ELSE II.Payment_Mode END as Payment_Mode,CASE WHEN II.Txn_NO IS NULL THEN ''  ELSE II.Txn_NO END as Txn_NO,II.Remarks,'Invoice' as PaymentFor, II.Paid_on as PaidOn FROM Invoice_Invoices II LEFT JOIN Invoice I ON I.Invoice_NO = II.Invoice_NO LEFT JOIN Client_Data CD on CD.client_id=I.Client_ID WHERE II.Created_Date >= ? and II.Created_Date <= ? ORDER BY PaidOn"

GENERATE_PAYMENT_PAY_OUT="SELECT PI.Invoice_ID as PaymentID,P.P_Order_NO as InvoiceNo,SD.FN || ' ' || SD.LN as Name,PI.Amount_Paid,CASE WHEN PI.Payment_Mode IS NULL THEN ''   ELSE PI.Payment_Mode END as Payment_Mode,CASE WHEN PI.Txn_NO IS NULL THEN ''  ELSE PI.Txn_NO END as Txn_NO,PI.Remarks,'Purchase' as PaymentFor, PI.Paid_on as PaidOn   FROM Purchase_Invoices PI LEFT JOIN Purchase P on P.P_Bill_NO = PI.P_Bill_NO LEFT JOIN Supplier_Data SD on SD.supplier_id = P.Supplier_ID WHERE PI.Created_Date >= ? and PI.Created_Date <= ? ORDER BY PaidOn"

#------------------------------------------------------------END PAYMENT REPORT CONSTANT QUERY  END----------------------------------------------------------------
#==================================================================================================================================================================

#==========================================================================================================================================================
#------------------------------------------------------------ STOCK REPORT CONSTANT QUERY -----------------------------------------------------------------

# @ For Stock Type : all
GENERATE_STOCK_REPORT__ALL__ALL="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID"

GENERATE_STOCK_REPORT__ALL__AVAILABLE="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID WHERE a.Quantity > ?"

GENERATE_STOCK_REPORT__ALL__OUT_OF_STOCK="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID WHERE a.Quantity=0"

GENERATE_STOCK_REPORT__ALL__ABOUT_TO_OUT="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID WHERE a.Quantity <= ? and a.Quantity!=0"

GENERATE_STOCK_REPORT__FILTER__ALL="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID WHERE b.Product_type=? "

GENERATE_STOCK_REPORT__FILTER__AVAILABLE="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID WHERE b.Product_type=?  AND a.Quantity > ?"

GENERATE_STOCK_REPORT__FILTER__OUT_OF_STOCK="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID WHERE b.Product_type=?  AND a.Quantity=0"

GENERATE_STOCK_REPORT__FILTER__ABOUT_TO_OUT="SELECT b.Product_type,b.Product_name,a.Quantity,a.Prev_Credit_Qty,a.Prev_Credit_Date,a.Prev_Debit_Qty,a.Prev_Debit_Date  FROM Stock_Summary a LEFT JOIN Stock_Details b ON b.StockID = a.StockID LEFT JOIN Purchase c ON c.P_Bill_NO = a.Prev_Credit_PO_no LEFT JOIN Supplier_Data d ON d.supplier_id = c.Supplier_ID WHERE b.Product_type=?  AND a.Quantity <= ? and a.Quantity!=0"

#------------------------------------------------------------END STOCK REPORT CONSTANT QUERY END----------------------------------------------------------------
#===============================================================================================================================================================


#==========================================================================================================================================================
#------------------------------------------------------------ SALE'S REPORT CONSTANT QUERY -----------------------------------------------------------------
# @ For Ivoice Type : all

# All --> Status wise --> All
GENERATE_SALE_REPORT_ALL__STATUS_WISE__ALL="SELECT I.Invoice_NO,I.Place_of_supply,I.Invoice_Type ,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,CD.FN || ' ' || CD.LN as ClientName, IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.isReturn='false' and I.isActive='true' and  I.Invoice_Date >= ? and I.Invoice_Date <= ?"

# All --> Status wise --> Complete / pending / emi pending
GENERATE_SALE_REPORT_ALL__STATUS_WISE__OPTION="SELECT I.Invoice_NO,I.Place_of_supply,I.Invoice_Type ,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,CD.FN || ' ' || CD.LN as ClientName, IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.isReturn='false' and I.isActive='true' and IB.Status=? and I.Invoice_Date >= ? and I.Invoice_Date <= ?"

# All --> POS wise -->  amravati,goa etc ..
GENERATE_SALE_REPORT_ALL__POS_WISE__OPTION="SELECT I.Invoice_NO,I.Place_of_supply,I.Invoice_Type ,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,CD.FN || ' ' || CD.LN as ClientName, IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.isReturn='false' and I.isActive='true' and I.Place_of_supply=? and I.Invoice_Date >= ? and I.Invoice_Date <= ?"


# @ For Invoice Type : Other than all

# GST/NON GST/Bill Of Supply --> Status wise --> All
GENERATE_SALE_REPORT_STATUS_WISE_ALL="SELECT I.Invoice_NO,I.Place_of_supply,I.Invoice_Type ,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,CD.FN || ' ' || CD.LN as ClientName, IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.Invoice_Type=? and I.isReturn='false' and I.isActive='true' and I.Invoice_Date >= ? and I.Invoice_Date <= ?"

# GST/NON GST/Bill Of Supply --> Status wise --> Complete / pending / emi pending
GENERATE_SALE_REPORT_STATUS_WISE="SELECT I.Invoice_NO,I.Place_of_supply,I.Invoice_Type ,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,CD.FN || ' ' || CD.LN as ClientName, IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.Invoice_Type=? and I.isReturn='false' and I.isActive='true' and  IB.Status=? and I.Invoice_Date >= ? and I.Invoice_Date <= ?"

# GST/NON GST/Bill Of Supply --> POS wise --> amravati,goa etc ..
GENERATE_SALE_REPORT_POS_WISE="SELECT I.Invoice_NO,I.Place_of_supply,I.Invoice_Type ,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,CD.FN || ' ' || CD.LN as ClientName, IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.isReturn='false' and I.isActive='true' and  I.Invoice_Type=? and I.Place_of_supply=? and I.Invoice_Date >= ? and I.Invoice_Date <= ?"

#------------------------------------------------------------END SALE'S REPORT CONSTANT QUERY END----------------------------------------------------------------
#===============================================================================================================================================================

#==============================================================================================================================================================
#------------------------------------------------------------ PURCHASE REPORT CONSTANT QUERY -------------------------------------------------------------------

# @ For Purchase Type : all

# All --> Status wise --> All
GENERATE_PURCHASE_REPORT_ALL__STATUS_WISE__ALL="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.isReturn='false' and P.isActive='true' and  P.Purchase_Order_Date >= ? and P.Purchase_Order_Date <= ?"

# All --> Status wise --> Complete / pending
GENERATE_PURCHASE_REPORT_ALL__STATUS_WISE__OPTION="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.isReturn='false' and P.isActive='true' and PB.Status=? and  P.Purchase_Order_Date >= ? and P.Purchase_Order_Date <= ?"

# All --> Supplier wise --> supplier names
GENERATE_PURCHASE_REPORT_ALL_SUPPLIER_WISE__OPTION="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.isReturn='false' and P.isActive='true' and P.Supplier_ID=? and  P.Purchase_Order_Date >= ? and P.Purchase_Order_Date <= ?"

# @ For Purchase Type : Other than all

# GST/NON GST/Bill Of Supply --> Status wise --> All
GENERATE_PURCHASE_REPORT_STATUS_WISE_ALL="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.Purchas_Type=? and  P.isReturn='false' and P.isActive='true' and  P.Purchase_Order_Date >= ? and P.Purchase_Order_Date <= ?"

# GST/NON GST/Bill Of Supply --> Status wise --> Complete / pending
GENERATE_PURCHASE_REPORT_STATUS_WISE="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.Purchas_Type=? and  P.isReturn='false' and P.isActive='true' and PB.Status=? and  P.Purchase_Order_Date >= ? and P.Purchase_Order_Date <= ?"

# GST/NON GST/Bill Of Supply --> Supplier wise --> supplier names
GENERATE_PURCHASE_REPORT_SUPPLIER_WISE="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.Purchas_Type=? and  P.isReturn='false' and P.isActive='true' and P.Supplier_ID=? and  P.Purchase_Order_Date >= ? and P.Purchase_Order_Date <= ?"

#------------------------------------------------------------END PURCHASE REPORT CONSTANT QUERY END----------------------------------------------------------------
#==================================================================================================================================================================


#==============================================================================================================================================================
#------------------------------------------------------------ CLIENT REPORT CONSTANT QUERY -------------------------------------------------------------------

GENERATE_CLIENT_REPORT_ALL="SELECT client_id , FN||' '|| LN as Name ,contact_no,email, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address ,PAN_NO FROM Client_Data WHERE Created_Date >= ? and Created_Date <= ?"
GENERATE_CLIENT_REPORT_FILTER="SELECT client_id , FN||' '|| LN as Name ,contact_no,email, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address ,PAN_NO FROM Client_Data WHERE isActive=? and Created_Date >= ? and Created_Date <= ?"

#------------------------------------------------------------END PURCHASE REPORT CONSTANT QUERY END----------------------------------------------------------------
#==================================================================================================================================================================


#==============================================================================================================================================================
#------------------------------------------------------------ SUPPLIER REPORT CONSTANT QUERY -------------------------------------------------------------------

GENERATE_SUPPLIER_REPORT_All="SELECT supplier_id , FN||' '|| LN as Name ,contact_no,email, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address ,PAN_NO FROM Supplier_Data WHERE Created_Date >= ? and Created_Date <= ?"
GENERATE_SUPPLIER_REPORT_FILTER="SELECT supplier_id , FN||' '|| LN as Name ,contact_no,email, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address ,PAN_NO FROM Supplier_Data WHERE isActive=? and Created_Date >= ? and Created_Date <= ?"

#------------------------------------------------------------END SUPPLIER REPORT CONSTANT QUERY END----------------------------------------------------------------
#==================================================================================================================================================================

#==============================================================================================================================================================
#------------------------------------------------------------ TRANSACTION REPORT CONSTANT QUERY ---------------------------------------------------------------

# @ For Select : Stock
#Credit
GENERATE_TRANSACTION_REPORT_STOCK_CREDIT="Select a.ID as Transaction_ID,a.P_Bill_NO as Bill_NO ,a.Stock_Name,a.Stock_ID,a.Qty,a.Purchase_Price as SP_Price,a.CGST,a.SGST,a.IGST,a.Cess,(a.CGST+a.SGST+a.IGST+a.Cess)as NetTax,a.Discount,a.Amount,e.FN || ' ' ||e.LN as Invoice_For,strftime('%d-%m-%Y',b.Created_Date) as Created_Date from Purchase_Item_Bucket a LEFT JOIN Purchase b ON b.P_Bill_NO = a.P_Bill_NO LEFT JOIN Purchase_Bill c ON c.P_Bill_NO = a.P_Bill_NO LEFT JOIN Purchase_Invoices d ON d.P_Bill_NO = a.P_Bill_NO LEFT JOIN Supplier_Data e ON e.Supplier_id = b.Supplier_ID WHERE c.Status!='Save as Draft' and b.Created_Date >= ? and b.Created_Date <= ?"
#Debit
GENERATE_TRANSACTION_REPORT_STOCK_DEBIT="Select a.ID as Transaction_ID,a.Invoice_NO as Bill_NO ,a.Stock_Name,a.Stock_ID,a.Qty,a.Sell_Price as SP_Price,a.CGST,a.SGST,a.IGST,a.Cess,(a.CGST+a.SGST+a.IGST+a.Cess)as NetTax,a.Discount,a.Amount,e.FN || ' ' ||e.LN as Invoice_For,strftime('%d-%m-%Y',b.Created_Date) as Created_Date from Invoice_Item_Bucket a LEFT JOIN Invoice b ON b.Invoice_NO = a.Invoice_NO LEFT JOIN Invoice_Bill c ON c.Invoice_NO = a.Invoice_NO LEFT JOIN Invoice_Invoices d ON d.Invoice_NO = a.Invoice_NO LEFT JOIN Client_Data e ON e.client_id = b.Client_ID WHERE c.Status!='Save as Draft' and b.Created_Date >= ? and b.Created_Date <= ?"

#------------------------------------------------------------END TRANSACTION REPORT CONSTANT QUERY END-------------------------------------------------------------
#==================================================================================================================================================================


#===============================================================================================================================================================
#--------------------------------------------------------------- EXPENSE REPORT CONSTANT QUERY -----------------------------------------------------------------

# @ For Select : All
ALL__GENERATE_EXPENSE_REPORT="SELECT *  FROM Expense WHERE Created_Date >= ? and Created_Date <= ? order by Created_Date DESC"
# @ For Select : Other than all
GENERATE_EXPENSE_REPORT="SELECT * FROM Expense WHERE expense_type=? and Created_Date >=? and Created_Date <=? order by Created_Date DESC"

#------------------------------------------------------------END EXPENSE REPORT CONSTANT QUERY END-----------------------------------------------------------------
#==================================================================================================================================================================
