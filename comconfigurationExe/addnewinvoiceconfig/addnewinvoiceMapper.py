#================================================================ FETCH CONSTANT QUERY =====================================================
#@Get invoice number
GET_INVOICE_NO="SELECT * FROM Backend_Increment"

#@fetch staff data
FETCH_STAFF_DATA="SELECT 0 as staff_id,FN || ' ' || LN as StaffName FROM User_Profile UNION SELECT staff_id,FN || ' ' || LN as StaffName FROM Staff_Data order by StaffName "

#@fetch client data
FETCH_CLIENT_DATA="SELECT * FROM Client_Data"

#@fetch supplier data list
GET_SUPPLIER_DATA_LIST="SELECT supplier_id as ID , FN ||' '|| LN as Name,contact_no FROM Supplier_Data"

#@fetch item/stock list
FETCH_ITEM_LIST="SELECT * FROM Stock_Details"

#@fetch selected item/stock details
FETCH_SELECTED_ITEM_DETAILS_QUERY="SELECT * FROM Stock_Details WHERE Product_name=?"

#@fetch item/stock for bucket
FETCH_BUCKET_ITEM_FOR_GIVEN_INVOICE="SELECT ROW_NUMBER() OVER ( ORDER BY ID )  as SrNo,* FROM Invoice_Item_Bucket WHERE Invoice_NO=?"

#@get client id
GET_CLIENT_ID="SELECT client_id FROM Client_Data WHERE contact_no=?"
#========================================================== ~ END ~ ~ END ~ ~ END ~  =====================================================

#============================================================ INSERT CONSTANT QUERY =====================================================
#@add item/stock to bucket
ADD_STOCK_TO_BUCKET="INSERT INTO Invoice_Item_Bucket (Invoice_NO,Stock_ID,Stock_Name,Qty,Sell_Price,Discount,CGST,SGST,IGST,Cess,Amount) values (?,?,?,?,?,?,?,?,?,?,?)"

#@used for creating new stock/item
ADD_NEW_STOCK="INSERT into Stock_Details (Product_name,Product_Group,Brand,Item_Code,Serial_number,Purchase_price,Sale_price,MSP,MRP,Unit,HSN,CGST,SGST,Cess,IGST,Product_type,Product_Discription,Created_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

#@used for creating new client
CREATE_NEW_CLIENT="INSERT INTO Client_Data (FN,LN,contact_no,address,city,state,pincode,PAN_NO,email,Created_Date) values (?,?,?,?,?,?,?,?,?,?)"

#@insert data into 'Invoice' Table
INSERT_INTO_INVOICE="INSERT INTO Invoice (Invoice_NO,Invoice_Type,Invoice_Date,Place_of_supply,Sold_By,Client_ID,isDraft,isReturn,Created_Date,isActive) values (?,?,?,?,?,?,?,?,?,?)"

#@insert data into 'Invoice_Bill' Table
INSERT_INTO_INVOICE_BILL="INSERT INTO Invoice_Bill (Invoice_NO,Apply_Discount,Dis_in_percent,Dis_in_amount,Apply_Shipping,Shipping_Amount,Apply_EMI,EMI_Months,EMI_Percent,DP_in_Amount,DP_in_Percent,Sub_Total_Amount,Total_Amount,Amount_Paid,Balance_Amount,Status) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

#@insert data into 'Invoice_Invoices' Table
INSERT_INTO_INVOICE_INVOICES="INSERT INTO Invoice_Invoices (Invoice_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?)"

#@insert data into 'Invoice_EMI' Table
CREATE_EMI_MONTHLY_WISE="INSERT INTO Invoice_EMI (Invoice_NO,EMI_Month,EMI_Amount,Status) values (?,?,?,?)"

#@insert data into 'Client_Data_Draft' Table
INSERT_INTO_CLIENT_DATA_DRAFT="INSERT INTO Client_Data_Draft (Invoice_NO,FN,LN,address,city,state,pincode,contact_no,email,PAN_NO,GSTIN,Created_Date) values (?,?,?,?,?,?,?,?,?,?,?,?)"
#========================================================== ~ END ~ ~ END ~ ~ END ~  =====================================================

#============================================================ UPDATE CONSTANT QUERY =====================================================
#@ Update Stock Data after sell : debit the stock
UPDATE_INTO_STOCK_DATA="UPDATE Stock_Summary SET Quantity = Quantity - ?,Prev_Debit_Invoice_no=?,Prev_Debit_Qty=?,Prev_Debit_Date=?,Update_Date=? WHERE StockID=?"

#@update increment
INCREMENT_CONFIGURATION="UPDATE Backend_Increment SET InvoiceNo = InvoiceNo + 1"

#@
DELETE_ALL_DATA='DELETE FROM Invoice_Item_Bucket WHERE Invoice_NO = ?'
#========================================================== ~ END ~ ~ END ~ ~ END ~  =====================================================

#============================================================ DELETE CONSTANT QUERY =====================================================
#@delete stock/item from bucket : Invoice
DELETE_ITEM_FROM_BUCKET_FOR_INVOICE="DELETE FROM Invoice_Item_Bucket WHERE ID = ?"
#========================================================== ~ END ~ ~ END ~ ~ END ~  =====================================================
