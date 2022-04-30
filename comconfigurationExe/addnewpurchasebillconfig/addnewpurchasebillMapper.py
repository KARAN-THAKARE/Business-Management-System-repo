
#=================================================== FETCH CONSTANT QUERY =============================================================
#@ get purchase no.
GET_PURCHASE_NO="SELECT * FROM Backend_Increment"

#@ fetch item list
FETCH_ITEM_LIST="SELECT * FROM Stock_Details ORDER BY Product_name"

#@ fetch slected item/stock details
FETCH_SELECTED_ITEM_DETAILS_QUERY="SELECT * FROM Stock_Details WHERE Product_name=?"

#@ fetch supplier data
GET_SUPPLIER_DATA_LIST="SELECT supplier_id as ID , FN ||' '|| LN as Name,contact_no,address || ',' || city || ',' || state || '.' || pincode as Address,email,PAN_NO,GSTIN  FROM Supplier_Data ORDER BY Name"

#@ fetch bucket item for given bill
FETCH_BUCKET_ITEM_FOR_GIVEN_BILL="SELECT ROW_NUMBER() OVER ( ORDER BY ID )  as SrNo,* FROM Purchase_Item_Bucket WHERE P_Bill_NO=?"

#@ Fetch stock ID from table
FETCH_STOCK_ID="SELECT StockID FROM Stock_Details WHERE Product_name=?"

#====================================================== END =====================================================================

#=================================================== INSERT CONSTANT QUERY =============================================================
#@ Add new stock details
ADD_NEW_STOCK="INSERT into Stock_Details (Product_name,Product_Group,Brand,Item_Code,Serial_number,Purchase_price,Sale_price,MSP,MRP,Unit,HSN,CGST,SGST,Cess,IGST,Product_type,Product_Discription,Created_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

#@ Add stock/item into bucket
ADD_STOCK_TO_BUCKET="INSERT INTO Purchase_Item_Bucket (P_Bill_NO,P_Order_NO,Stock_ID,Stock_Name,Qty,Purchase_Price,Discount,CGST,SGST,IGST,Cess,Amount) values (?,?,?,?,?,?,?,?,?,?,?,?)"

#@ Insert into Purchase Table
INSERT_INTO_PURCHASE="INSERT INTO Purchase (P_Bill_NO,P_Order_NO,EWay_Bill_NO,Purchas_Type,Bill_Date,Supplier_ID,Due_Date,Purchase_Order_Date,isDraft,isReturn,Created_Date,isActive) values (?,?,?,?,?,?,?,?,?,?,?,?)"

#@ Insert into Purchase_Bill Table
INSERT_INTO_PURCHASE_BILL="INSERT INTO Purchase_Bill (P_Bill_NO,P_Order_NO,Apply_Discount,Dis_in_percent,Dis_in_amount,Apply_Shipping,Shipping_Amount,Sub_Total_Amount,Total_Amount,Amount_Paid,Balance_Amount,Status) values (?,?,?,?,?,?,?,?,?,?,?,?)"

#@ Insert into Purchase_Invoices Table
INSERT_INTO_PURCHASE_INVOICE="INSERT INTO Purchase_Invoices (P_Bill_NO,P_Order_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?,?)"

#@ Create new row for newly added stock item for stock summary table
CREATE_NEW_FIELDS_IN_STOCK_SUMMARY="INSERT INTO Stock_Summary (StockID,Quantity,Prev_Credit_Qty,Prev_Debit_Qty,isActive,Created_Date) values (?,?,?,?,?,?)"


#====================================================== END =====================================================================

#=================================================== UPDATE CONSTANT QUERY =============================================================
#@ Update Stock Data after purchase : credit the stock
UPDATE_INTO_STOCK_DATA="UPDATE Stock_Summary SET Quantity = Quantity + ?,Prev_Credit_PO_no=?,Prev_Credit_Qty=?,Prev_Credit_Date=?,Update_Date=? WHERE StockID=?"

#@ Update Backend_Increment table (Autoincrement)
INCREMENT_CONFIGURATION="UPDATE Backend_Increment SET PurchaseBillNo = PurchaseBillNo + 1 , PurchaseOrderNo = PurchaseOrderNo + 1"

#====================================================== END =====================================================================

#=================================================== DELETE CONSTANT QUERY =============================================================
#@ Delete item/stock form bucket
DELETE_ITEM_FROM_BUCKET="DELETE FROM Purchase_Item_Bucket WHERE ID = ?"

#@ Delete DELETE_ALL_DATA form bucket
DELETE_ALL_DATA='DELETE FROM Purchase_Item_Bucket WHERE P_Bill_NO = ?'
#====================================================== END =====================================================================
