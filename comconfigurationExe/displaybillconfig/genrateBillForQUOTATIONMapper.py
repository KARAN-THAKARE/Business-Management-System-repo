#============================================================= FETCH CONSTANT QUERY ==============================================
#@ fetch bucket item for Quotation
FETCH_BUCKET_ITEM_FOR_QUOTATION="SELECT ROW_NUMBER() OVER ( ORDER BY QIB.ID )  as SrNo , SD.Product_name,QIB.Qty,QIB.Sell_Price,QIB.Discount,QIB.CGST,QIB.SGST,QIB.IGST,QIB.Cess,QIB.Amount,SD.Product_Discription FROM Quotation_Item_Bucket  QIB LEFT JOIN Stock_Details SD ON SD.StockID=QIB.Stock_ID  WHERE QIB.Quotation_NO=?"

#@ fetch Quotation information
FETCH_QUOTATION_INFO="SELECT Q.Quotation_NO,strftime('%d-%m-%Y',Q.Quotation_Date) as Quotation_Date ,Q.Place_of_supply,strftime('%d-%m-%Y',Q.Valid_Till) as Valid_Date ,QB.Apply_Discount,QB.Dis_in_percent,QB.Dis_in_amount, QB.Apply_Shipping,QB.Shipping_Amount,QB.Apply_EMI,QB.EMI_Months,QB.EMI_Percent,QB.Sub_Total_Amount,QB.Total_Amount,QB.DP_in_Amount,QB.DP_in_Percent,CD.FN ||' '||CD.LN as ClientName , CD.address,CD.city,CD.state,CD.pincode,CD.contact_no,CD.email,CD.PAN_NO,CD.GSTIN "+  "FROM Quotation Q LEFT JOIN Quotation_Bill QB ON QB.Quotation_NO = Q.Quotation_NO  LEFT JOIN Client_Data CD ON CD.client_id = Q.Client_ID WHERE Q.Quotation_NO=?"

#@ fetch EMI information for Quotation
FETCH_EMI_INFO_FOR_QUOTATION="SELECT ROW_NUMBER() OVER ( ORDER BY EMI_ID )  as SrNo,* FROM Quotation_EMI WHERE Quotation_NO=?"

#@ fetch Over all breakout EMI Cost
FETCH_OVERALL_EMI_AMOUNT="SELECT SUM(EMI_Amount) FROM Quotation_EMI WHERE Quotation_NO=? "
#============================================================= ~ END ~  ~ END ~ ==================================================
