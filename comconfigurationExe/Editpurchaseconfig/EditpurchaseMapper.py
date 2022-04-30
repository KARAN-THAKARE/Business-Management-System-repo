#================================================================ FETCH CONSTANT QUERY =====================================================

FETCH_PURCHASE_BILL_INFO="SELECT P.Purchase_ID ,P.P_Bill_NO,P.P_Order_NO,P.EWay_Bill_NO,P.Purchas_Type,P.Bill_Date,P.Supplier_ID,P.Due_Date,P.Purchase_Order_Date, P.Created_Date " +" ,PB.Apply_Discount,PB.Dis_in_percent,PB.Dis_in_amount,PB.Apply_Shipping,PB.Shipping_Amount,PB.Sub_Total_Amount,PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status,SD.FN ||' '||SD.LN as SupplierName ,SD.address,SD.city,SD.state,SD.pincode,SD.contact_no,SD.email,SD.PAN_NO,SD.GSTIN FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.P_Bill_NO=?"

FETCH_STOCK_ID_NEED_TO_BE_RESET="SELECT ID,Stock_ID,Qty FROM Purchase_Item_Bucket WHERE P_Bill_NO = ?"

GET_PREVIOUS_CREDIT_RECORD_OF_STOCK="SELECT PIB.P_Bill_NO,PIB.Qty,P.Created_Date FROM Purchase_Item_Bucket  PIB left join Purchase P on P.P_Bill_NO = PIB.P_Bill_NO WHERE Stock_ID = ? ORDER BY ID DESC LIMIT 1"

FETCH_STOCKS_THAT_ADDED_PREVIOUSLY_BY_GIVEN_ID="SELECT StockID,Prev_Credit_Qty FROM Stock_Summary WHERE Prev_Credit_PO_no=?"

GET_PREVIOUS_CREDIT_RECORD_OF_STOCK_FOR_UPDATE="SELECT PIB.P_Bill_NO,PIB.Qty,P.Created_Date FROM Purchase_Item_Bucket  PIB left join Purchase P on P.P_Bill_NO = PIB.P_Bill_NO WHERE PIB.Stock_ID = ? and PIB.P_Bill_NO != ? ORDER BY ID DESC LIMIT 1"
#=================================================================== END END END ========================================================

#================================================================ ADD CONSTANT QUERY =====================================================


#@ Insert into Purchase_Invoices Table
INSERT_INTO_PURCHASE_INVOICE="INSERT INTO Purchase_Invoices (P_Bill_NO,P_Order_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?,?)"

CREATE_REMARKS_FOR_RETURN="INSERT INTO Remark (ID,Remarks) values (?,?)"
#=================================================================== END END END ========================================================

#================================================================ UPDATE CONSTANT QUERY =====================================================
#@ Update Invoice table
UPDATE_PURCHASE="UPDATE Purchase SET  EWay_Bill_NO=?,Purchas_Type=?,Bill_Date=?,Due_Date=?,Purchase_Order_Date=?,Updated_Date=?  WHERE P_Bill_NO=?"

#@ Update Invoice Bill table
UPDATE_PURCHASE_BILL="UPDATE  Purchase_Bill SET  Apply_Discount=?,Dis_in_percent=?,Dis_in_amount=?,Apply_Shipping=?,Shipping_Amount=?,Sub_Total_Amount=?,Total_Amount=?,Amount_Paid=?,Balance_Amount=?,Status=?   WHERE P_Bill_NO=?"

#@ Update Stock Data after purchase : credit the stock
UPDATE_INTO_STOCK_DATA="UPDATE Stock_Summary SET Quantity = Quantity + ?,Prev_Credit_PO_no=?,Prev_Credit_Qty=?,Prev_Credit_Date=?,Update_Date=? WHERE StockID=?"

RETURN_PURCHASE="UPDATE Purchase SET isReturn='true' WHERE P_Bill_NO = ? "

ROLLBACK_AFTER_PO_DELETE_FOR_STOCK_SETLEMENT_FIRST="UPDATE Stock_Summary SET Quantity = Quantity - ? , Prev_Credit_PO_no = ? ,Prev_Credit_Qty = ? ,Prev_Credit_Date=? WHERE StockID=?"
ROLLBACK_AFTER_PO_DELETE_FOR_STOCK_SETLEMENT_SECOND="UPDATE Stock_Summary SET Quantity = Quantity - ? , Prev_Credit_PO_no = ? ,Prev_Credit_Qty = Prev_Credit_Qty - ?,Prev_Credit_Date=? WHERE StockID=?"
#=================================================================== END END END ========================================================

#================================================================ DELETE CONSTANT QUERY =====================================================

DELETE_PURCHASE="UPDATE Purchase SET isActive='false' WHERE P_Bill_NO = ? "

DELETE_PURCHASE_PAYMENT_SLIP="DELETE FROM Purchase_Invoices  WHERE P_Bill_NO = ? "

DELETE_PURCHASE_ITEM_FROM_BUCKET="DELETE FROM Purchase_Item_Bucket  WHERE P_Bill_NO = ? "

DELETE_PURCHASE_BUCKET_ITEM_ENTRY="DELETE FROM Purchase_Item_Bucket WHERE ID = ?"
