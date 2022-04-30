#============================================================= FETCH CONSTANT QUERY ==============================================
#@ fetch bucket item for invoice
FETCH_BUCKET_ITEM_FOR_INVOICE="SELECT ROW_NUMBER() OVER ( ORDER BY IIB.ID )  as SrNo , SD.Product_name,IIB.Qty,IIB.Sell_Price,IIB.Discount,IIB.CGST,IIB.SGST,IIB.IGST,IIB.Cess,IIB.Amount,SD.Product_Discription FROM Invoice_Item_Bucket  IIB LEFT JOIN Stock_Details SD ON SD.StockID=IIB.Stock_ID  WHERE IIB.Invoice_NO=? "

#@ fetch invoice information
FETCH_INVOICE_INFO="SELECT I.Invoice_NO ,I.Invoice_Type,strftime('%d-%m-%Y',I.Invoice_Date) as Invoice_Date ,I.Place_of_supply,IB.Apply_Discount,IB.Dis_in_percent,IB.Dis_in_amount,IB.Apply_Shipping,IB.Shipping_Amount,IB.Apply_EMI,IB.EMI_Months,IB.EMI_Percent,IB.Sub_Total_Amount,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount,IB.Status," + "CD.FN ||' '||CD.LN as ClientName , CD.address,CD.city,CD.state,CD.pincode,CD.contact_no,CD.email,CD.PAN_NO,CD.GSTIN,IB.DP_in_Amount,IB.DP_in_Percent,I.isReturn FROM Invoice I LEFT JOIN Invoice_Bill IB ON IB.Invoice_NO = I.Invoice_NO  LEFT JOIN Client_Data CD ON CD.client_id = I.Client_ID WHERE I.Invoice_NO =? "

#@ fetch invoices information for invoice
FETCH_INVOICE_INVOICES_INFO="SELECT ROW_NUMBER() OVER ( ORDER BY Invoice_ID )  as SrNo,* FROM Invoice_Invoices  WHERE Invoice_NO=? ORDER BY Paid_on"

#@ fetch EMI information for Invoice
FETCH_EMI_INFO="SELECT ROW_NUMBER() OVER ( ORDER BY InvoiceID_For_EMI )  as SrNo,* FROM Invoice_EMI WHERE Invoice_NO=? and Status='Pending'"

#@ fetch payment mode information for Invoice
FETCH_PAYMENT_MODE_INFO_FOR_INVOICE_BILL="SELECT * FROM Invoice_Invoices WHERE Invoice_NO=? ORDER BY Paid_on DESC LIMIT 1;"

#@ fetch Over all breakout EMI Cost
FETCH_OVERALL_EMI_AMOUNT="SELECT SUM(EMI_Amount) FROM Invoice_EMI WHERE Invoice_NO=? "



#============================================================= ~ END ~  ~ END ~ ==================================================
