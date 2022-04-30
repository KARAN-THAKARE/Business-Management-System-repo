FETCH_SHOP_DEATILS_FOR_HEADER="SELECT * FROM Shop_Profile"

#------------------------------------------------ Invoice (Client) -------------------------------------------------------------------

FETCH_BUCKET_ITEM_FOR_INVOICE="SELECT ROW_NUMBER() OVER ( ORDER BY IIB.ID )  as SrNo , SD.Product_name,IIB.Qty,IIB.Sell_Price,IIB.Discount,IIB.CGST,IIB.SGST,IIB.IGST,IIB.Cess,IIB.Amount,SD.Product_Discription FROM Invoice_Item_Bucket  IIB LEFT JOIN Stock_Details SD ON SD.StockID=IIB.Stock_ID  WHERE IIB.Invoice_NO=? "

FETCH_INVOICE_INFO="SELECT I.Invoice_NO ,I.Invoice_Type,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,I.Place_of_supply,IB.Apply_Discount,IB.Dis_in_percent,IB.Dis_in_amount,IB.Apply_Shipping,IB.Shipping_Amount,IB.Apply_EMI,IB.EMI_Months,IB.EMI_Percent,IB.Sub_Total_Amount,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status,CD.FN ||' '||CD.LN as ClientName , CD.address as Address,CD.city,CD.state,CD.pincode,CD.PAN_NO,CD.GSTIN,CD.contact_no,CD.email "+"FROM Invoice I LEFT JOIN Invoice_Bill IB ON IB.Invoice_NO = I.Invoice_NO  LEFT JOIN Client_Data CD ON CD.client_id = I.Client_ID WHERE I.Invoice_NO =?"

FETCH_INVOICE_INVOICES_INFO="SELECT ROW_NUMBER() OVER ( ORDER BY Invoice_ID )  as SrNo,* FROM Invoice_Invoices  WHERE Invoice_NO=? ORDER BY Paid_on"

FETCH_EMI_INFO="SELECT ROW_NUMBER() OVER ( ORDER BY InvoiceID_For_EMI )  as SrNo,* FROM Invoice_EMI WHERE Invoice_NO=?"

FETCH_INVOICE_PAY_SLIP_INFO="SELECT * FROM Invoice_Invoices WHERE  Invoice_ID=?"

FETCH_TERMS_FOR_INVOICE="SELECT ROW_NUMBER() OVER ( ORDER BY ID )  as SrNo,* FROM Terms_and_Conditions WHERE  isActiveForInvoice='true'"

#@ fetch payment mode information for Invoice
FETCH_PAYMENT_MODE_INFO_FOR_INVOICE_BILL="SELECT * FROM Invoice_Invoices WHERE Invoice_NO=? ORDER BY Paid_on DESC LIMIT 1;"
#================================================================================================================================


#------------------------------------------------Purchase Order-------------------------------------------------------------------
FETCH_BUCKET_ITEM_FOR_PURCHASE_INVOICE="SELECT ROW_NUMBER() OVER ( ORDER BY PIB.ID )  as SrNo , SD.Product_name,PIB.Qty,PIB.Purchase_Price,PIB.Discount,PIB.CGST,PIB.SGST,PIB.IGST,PIB.Cess,PIB.Amount,SD.Product_Discription FROM Purchase_Item_Bucket  PIB LEFT JOIN Stock_Details SD ON SD.StockID=PIB.Stock_ID WHERE PIB.P_Bill_NO=?"

FETCH_PURCHASE_BILL_INFO="SELECT P.Purchase_ID ,P.P_Bill_NO,P.P_Order_NO,P.EWay_Bill_NO,P.Purchas_Type,strftime('%d-%m-%Y',P.Bill_Date) as Bill_Date ,P.Supplier_ID,strftime('%d-%m-%Y',P.Due_Date) as Due_Date,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date,strftime('%d-%m-%Y',P.Created_Date) as " +"Created_Date,PB.Apply_Discount,PB.Dis_in_percent,PB.Dis_in_amount,PB.Apply_Shipping,PB.Shipping_Amount,PB.Sub_Total_Amount,PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status,SD.FN ||' '||SD.LN as SupplierName ,SD.address,SD.city,SD.state,SD.pincode,SD.contact_no,SD.email,SD.PAN_NO,SD.GSTIN FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.P_Bill_NO=?"

FETCH_PURCHASE_INVOICE_INFO="SELECT ROW_NUMBER() OVER ( ORDER BY Invoice_ID )  as SrNo,* FROM Purchase_Invoices  WHERE P_Bill_NO=? ORDER BY Paid_on"

FETCH_PURCHASE_PAY_SLIP_INFO="SELECT * FROM Purchase_Invoices WHERE  Invoice_ID=?"

FETCH_TERMS_FOR_PURCHASE="SELECT ROW_NUMBER() OVER ( ORDER BY ID )  as SrNo,* FROM Terms_and_Conditions WHERE  isActiveForPurchase='true'"


FETCH_PAYMENT_MODE_INFO_FOR_PURCHASE_BILL="SELECT * FROM Purchase_Invoices  WHERE P_Bill_NO=? ORDER BY Paid_on DESC LIMIT 1;"

#==========================================================================================================================================================



#------------------------------------------------ Quotation -------------------------------------------------------------------
#@ fetch bucket item for Quotation
FETCH_BUCKET_ITEM_FOR_QUOTATION="SELECT ROW_NUMBER() OVER ( ORDER BY QIB.ID )  as SrNo , SD.Product_name,QIB.Qty,QIB.Sell_Price,QIB.Discount,QIB.CGST,QIB.SGST,QIB.IGST,QIB.Cess,QIB.Amount,SD.Product_Discription FROM Quotation_Item_Bucket  QIB LEFT JOIN Stock_Details SD ON SD.StockID=QIB.Stock_ID  WHERE QIB.Quotation_NO=?"

#@ fetch Quotation information
FETCH_QUOTATION_INFO="SELECT Q.Quotation_NO,strftime('%d-%m-%Y',Q.Quotation_Date) as Quotation_Date ,Q.Place_of_supply,strftime('%d-%m-%Y',Q.Valid_Till) as Valid_Date ,QB.Apply_Discount,QB.Dis_in_percent,QB.Dis_in_amount, QB.Apply_Shipping,QB.Shipping_Amount,QB.Apply_EMI,QB.EMI_Months,QB.EMI_Percent,QB.Sub_Total_Amount,QB.Total_Amount,QB.DP_in_Amount,QB.DP_in_Percent,CD.FN ||' '||CD.LN as ClientName , CD.address,CD.city,CD.state,CD.pincode,CD.contact_no,CD.email,CD.PAN_NO,CD.GSTIN "+  "FROM Quotation Q LEFT JOIN Quotation_Bill QB ON QB.Quotation_NO = Q.Quotation_NO  LEFT JOIN Client_Data CD ON CD.client_id = Q.Client_ID WHERE Q.Quotation_NO=?"

#@ fetch EMI information for Quotation
FETCH_EMI_INFO_FOR_QUOTATION="SELECT ROW_NUMBER() OVER ( ORDER BY EMI_ID )  as SrNo,* FROM Quotation_EMI WHERE Quotation_NO=?"

#@ fetch Over all breakout EMI Cost
FETCH_OVERALL_EMI_AMOUNT="SELECT SUM(EMI_Amount) FROM Quotation_EMI WHERE Quotation_NO=? "
#==========================================================================================================================================================


#------------------------------------------------------------------- Custom Invoice -------------------------------------------------------------------
FETCH_CUSTOM_INVOICE_INFO="SELECT *,strftime('%d-%m-%Y',InvoiceDate) as Custom_Invoice_Date FROM Custom_Invoice WHERE Invoice_NO=?"

FETCH_BUCKET_ITEM_FOR_CUSTOM_INVOICE="SELECT ROW_NUMBER() OVER ( ORDER BY ID )  as SrNo,* FROM Custom_Invoice_Bucket  WHERE Invoice_NO=?"

FETCH_TERMS_FOR_CUSTOM_INVOICE="SELECT ROW_NUMBER() OVER ( ORDER BY ID )  as SrNo,* FROM Custom_Invoice_Terms  WHERE Invoice_NO=?"
#==========================================================================================================================================================
