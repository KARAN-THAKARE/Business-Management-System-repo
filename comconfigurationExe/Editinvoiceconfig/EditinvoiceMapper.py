#================================================================ FETCH CONSTANT QUERY =====================================================

FETCH_INVOICE_INFO="SELECT I.Invoice_NO ,I.Invoice_Type,I.Invoice_Date,I.Place_of_supply,IB.Apply_Discount,IB.Dis_in_percent,IB.Dis_in_amount,IB.Apply_Shipping,IB.Shipping_Amount,IB.Apply_EMI,IB.EMI_Months,IB.EMI_Percent,IB.Sub_Total_Amount,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status," + "CD.FN ||' '||CD.LN as ClientName , CD.address,CD.city,CD.state,CD.pincode,CD.contact_no,CD.email,CD.PAN_NO,CD.GSTIN,IB.DP_in_Amount,IB.DP_in_Percent,I.Sold_By,I.Created_Date FROM Invoice I LEFT JOIN Invoice_Bill IB ON IB.Invoice_NO = I.Invoice_NO  LEFT JOIN Client_Data CD ON CD.client_id = I.Client_ID WHERE I.Invoice_NO =? "

FETCH_STOCK_ID_NEED_TO_BE_RESET='SELECT ID,Stock_ID,Qty from Invoice_Item_Bucket WHERE Invoice_NO=?'

GET_PREVIOUS_CREDIT_RECORD_OF_STOCK="select IIT.Invoice_NO,IIT.Qty,I.Created_Date from Invoice_Item_Bucket IIT left join Invoice I ON I.Invoice_NO = IIT.Invoice_NO where IIT.Stock_ID=? order by IIT.ID desc limit 1 "

FETCH_STOCKS_THAT_REMOVED_PREVIOUSLY_BY_GIVEN_ID="SELECT StockID,Prev_Debit_Qty FROM Stock_Summary WHERE Prev_Debit_Invoice_no=?"

GET_PREVIOUS_DEBIT_RECORD_OF_STOCK_FOR_UPDATE="select IIT.Invoice_NO,IIT.Qty,I.Created_Date from Invoice_Item_Bucket IIT left join Invoice I ON I.Invoice_NO = IIT.Invoice_NO where IIT.Stock_ID=? and IIT.Invoice_NO!=? order by IIT.ID desc limit 1 "

#=================================================================== END END END ========================================================

#================================================================ ADD CONSTANT QUERY =====================================================

#@insert data into 'Invoice_Invoices' Table
INSERT_INTO_INVOICE_INVOICES="INSERT INTO Invoice_Invoices (Invoice_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?)"

#@insert data into 'Invoice_EMI' Table
CREATE_EMI_MONTHLY_WISE="INSERT INTO Invoice_EMI (Invoice_NO,EMI_Month,EMI_Amount,Status) values (?,?,?,?)"
#=================================================================== END END END ========================================================

#================================================================ UPDATE CONSTANT QUERY =====================================================
#@ Update Invoice table
UPDATE_INVOICE="UPDATE Invoice SET Invoice_Type=?,Invoice_Date=?,Place_of_supply=?,Sold_By=?,Updated_Date=? WHERE Invoice_NO=?"

#@ Update Invoice Bill table
UPDATE_INVOICE_BILL="UPDATE Invoice_Bill SET  Apply_Discount=?,Dis_in_percent=?,Dis_in_amount=?,Apply_Shipping=?,Shipping_Amount=?,Apply_EMI=?,EMI_Months=?,EMI_Percent=?,DP_in_Amount=?,DP_in_Percent=?,Sub_Total_Amount=?,Total_Amount=?,Amount_Paid=?,Balance_Amount=?,Status=?  WHERE Invoice_NO=?"

#@ Update Stock Data after sell : debit the stock
UPDATE_INTO_STOCK_DATA="UPDATE Stock_Summary SET Quantity = Quantity - ?,Prev_Debit_Invoice_no=?,Prev_Debit_Qty=?,Prev_Debit_Date=?,Update_Date=? WHERE StockID=?"

RETURN_INVOICE="UPDATE Invoice SET isReturn='true' WHERE Invoice_NO = ? "

ROLLBACK_AFTER_INVOICE_DELETE_FOR_STOCK_SETLEMENT_FIRST="UPDATE Stock_Summary SET Quantity = Quantity + ? , Prev_Debit_Invoice_no = ? ,Prev_Debit_Qty = ? ,Prev_Debit_Date=? WHERE StockID=?"
ROLLBACK_AFTER_INVOICE_DELETE_FOR_STOCK_SETLEMENT_SECOND="UPDATE Stock_Summary SET Quantity = Quantity + ? , Prev_Debit_Invoice_no = ? ,Prev_Debit_Qty = Prev_Debit_Qty - ?,Prev_Debit_Date=? WHERE StockID=?"
#=================================================================== END END END ========================================================

#================================================================ DELETE CONSTANT QUERY =====================================================

DELETE_INVOICE="UPDATE Invoice SET isActive='false' WHERE Invoice_NO = ? "

DELETE_INVOICES_PAYMENT_SLIP="DELETE FROM Invoice_Invoices  WHERE Invoice_NO = ? "

DELETE_INVOICE_EMIS="DELETE FROM Invoice_EMI WHERE Invoice_NO = ? "

DELETE_INVOICE_BUCKET_ITEM_ENTRY="DELETE FROM Invoice_Item_Bucket WHERE ID = ?"
