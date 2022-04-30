FETCH_BUCKET_ITEM_FOR_PURCHASE="SELECT ROW_NUMBER() OVER ( ORDER BY PIB.ID )  as SrNo , SD.Product_name,PIB.Qty,PIB.Purchase_Price,PIB.Discount,PIB.CGST,PIB.SGST,PIB.IGST,PIB.Cess,PIB.Amount,SD.Product_Discription FROM Purchase_Item_Bucket  PIB LEFT JOIN Stock_Details SD ON SD.StockID=PIB.Stock_ID WHERE PIB.P_Bill_NO=? "

FETCH_PURCHASE_BILL_INFO="SELECT P.Purchase_ID ,P.P_Bill_NO,P.P_Order_NO,P.EWay_Bill_NO,P.Purchas_Type,strftime('%d-%m-%Y',P.Bill_Date) as Bill_Date ,P.Supplier_ID,strftime('%d-%m-%Y',P.Due_Date) as Due_Date,strftime('%d-%m-%Y',P.Purchase_Order_Date) as Purchase_Order_Date,strftime('%d-%m-%Y',P.Created_Date) as " +"Created_Date,PB.Apply_Discount,PB.Dis_in_percent,PB.Dis_in_amount,PB.Apply_Shipping,PB.Shipping_Amount,PB.Sub_Total_Amount,PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount,PB.Status,SD.FN ||' '||SD.LN as SupplierName ,SD.address,SD.city,SD.state,SD.pincode,SD.contact_no,SD.email,SD.PAN_NO,SD.GSTIN,P.isReturn FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.P_Bill_NO=?"


FETCH_PURCHASE_INVOICE_INFO="SELECT ROW_NUMBER() OVER ( ORDER BY Invoice_ID )  as SrNo,* FROM Purchase_Invoices  WHERE P_Bill_NO=? ORDER BY Paid_on"

FETCH_PAYMENT_MODE_INFO_FOR_PURCHASE_BILL="SELECT * FROM Purchase_Invoices  WHERE P_Bill_NO=? ORDER BY Paid_on DESC LIMIT 1;"
