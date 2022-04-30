#================================================================ FETCH CONSTANT QUERY =====================================================

FETCH_QUOTATION_INFO="SELECT Q.Quotation_NO,Q.Quotation_Date,Q.Place_of_supply,Q.Valid_Till,QB.Apply_Discount,QB.Dis_in_percent,QB.Dis_in_amount, QB.Apply_Shipping,QB.Shipping_Amount,QB.Apply_EMI,QB.EMI_Months,QB.EMI_Percent,QB.Sub_Total_Amount,QB.Total_Amount,QB.DP_in_Amount,QB.DP_in_Percent,CD.FN ||' '||CD.LN as ClientName , CD.address,CD.city,CD.state,CD.pincode,CD.contact_no,CD.email,CD.PAN_NO,CD.GSTIN "+  "FROM Quotation Q LEFT JOIN Quotation_Bill QB ON QB.Quotation_NO = Q.Quotation_NO  LEFT JOIN Client_Data CD ON CD.client_id = Q.Client_ID WHERE Q.Quotation_NO=?"
#=================================================================== END END END ========================================================

#================================================================ ADD CONSTANT QUERY =====================================================

#@  add stock to bucket
ADD_STOCK_TO_BUCKET="INSERT INTO Quotation_Item_Bucket (Quotation_NO,Stock_ID,Stock_Name,Qty,Sell_Price,Discount,CGST,SGST,IGST,Cess,Amount) values (?,?,?,?,?,?,?,?,?,?,?)"

#@  insert into Quotation_EMI table
CREATE_EMI_MONTHLY_WISE="INSERT INTO Quotation_EMI (Quotation_NO,EMI_Month,EMI_Amount) values (?,?,?)"
#=================================================================== END END END ========================================================

#================================================================ UPDATE CONSTANT QUERY =====================================================
#@ Update Quotation table
UPDATE_QUOTATION="UPDATE Quotation SET Quotation_Date=?,Place_of_supply=?,Valid_Till=?,Updated_Date=?  WHERE Quotation_NO=?"

#@ Update Quotation Bill table
UPDATE_QUOTATION_BILL="UPDATE Quotation_Bill SET Apply_Discount=?,Dis_in_percent=?,Dis_in_amount=?,Apply_Shipping=?,Shipping_Amount=?,Apply_EMI=?,EMI_Months=?,EMI_Percent=?,DP_in_Amount=?,DP_in_Percent=?,Sub_Total_Amount=?,Total_Amount=?  WHERE Quotation_NO=?"
#=================================================================== END END END ========================================================

#================================================================ DELETE CONSTANT QUERY =====================================================
#@ Delete item/stock from bucket
DELETE_ITEM_FROM_BUCKET_FOR_QUOTATION="DELETE FROM Quotation_Item_Bucket WHERE ID = ?"

DELETE_QUOTATION_EMI="DELETE FROM Quotation_EMI WHERE Quotation_NO = ?"

DELETE_QUOTATION="UPDATE Quotation SET isActive='false' WHERE Quotation_NO = ? "
