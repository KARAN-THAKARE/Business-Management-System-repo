#================================================================ FETCH CONSTANT QUERY =====================================================
#@ get quotation number
GET_QUOTATION_NO="SELECT * FROM Backend_Increment"

#@ fetch staff data
FETCH_STAFF_DATA="SELECT staff_id,FN || ' ' || LN as StaffName FROM Staff_Data"

#@ fetch client data
FETCH_CLIENT_DATA="SELECT * FROM Client_Data"

#@ fetch item/stock data for given quotaion
FETCH_BUCKET_ITEM_FOR_GIVEN_QUOTATION="SELECT ROW_NUMBER() OVER ( ORDER BY ID )  as SrNo,* FROM Quotation_Item_Bucket WHERE Quotation_NO=?"

#@ fetch item/stock data
FETCH_ITEM_LIST="SELECT * FROM Stock_Details"

#@ fetch item/stock details for selected item/stock
FETCH_SELECTED_ITEM_DETAILS_QUERY="SELECT * FROM Stock_Details WHERE Product_name=?"

#@ get client id
GET_CLIENT_ID="SELECT client_id FROM Client_Data WHERE contact_no=?"

#=================================================================== END END END ========================================================

#================================================================ ADD CONSTANT QUERY =====================================================

#@  add stock to bucket
ADD_STOCK_TO_BUCKET="INSERT INTO Quotation_Item_Bucket (Quotation_NO,Stock_ID,Stock_Name,Qty,Sell_Price,Discount,CGST,SGST,IGST,Cess,Amount) values (?,?,?,?,?,?,?,?,?,?,?)"

#@  cretae new client
CREATE_NEW_CLIENT="INSERT INTO Client_Data (FN,LN,contact_no,address,city,state,pincode,PAN_NO,email,Created_Date) values (?,?,?,?,?,?,?,?,?,?)"

#@  insert into Quotation table
INSERT_INTO_QUOTATION="INSERT INTO Quotation (Quotation_NO,Quotation_Date,Place_of_supply,Valid_Till,Client_ID,isDraft,Created_Date,isActive) values (?,?,?,?,?,?,?,?)"

#@  insert into Quotation_Bill table
INSERT_INTO_QUOTATION_BILL="INSERT INTO Quotation_Bill (Quotation_NO,Apply_Discount,Dis_in_percent,Dis_in_amount,Apply_Shipping,Shipping_Amount,Apply_EMI,EMI_Months,EMI_Percent,DP_in_Amount,DP_in_Percent,Sub_Total_Amount,Total_Amount) values (?,?,?,?,?,?,?,?,?,?,?,?,?)"

#@  insert into Quotation_EMI table
CREATE_EMI_MONTHLY_WISE="INSERT INTO Quotation_EMI (Quotation_NO,EMI_Month,EMI_Amount) values (?,?,?)"
#=================================================================== END END END ========================================================

#================================================================ UPDATE CONSTANT QUERY =====================================================
#@ Update autoincrment value
INCREMENT_CONFIGURATION="UPDATE Backend_Increment SET QuotationNo = QuotationNo + 1"
#=================================================================== END END END ========================================================

#================================================================ DELETE CONSTANT QUERY =====================================================
#@ Delete item/stock from bucket
DELETE_ITEM_FROM_BUCKET_FOR_QUOTATION="DELETE FROM Quotation_Item_Bucket WHERE ID = ?"

#@
DELETE_ALL_QUOTATION_DATA='DELETE FROM Quotation_Item_Bucket WHERE Quotation_NO = ?'
