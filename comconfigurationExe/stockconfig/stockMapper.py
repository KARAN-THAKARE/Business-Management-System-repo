#@Fetch stock summary
FETCH_STOCK_DATA="SELECT a.StockID,b.Product_name ,a.Quantity,a.Prev_Credit_Qty,a.Prev_Debit_Qty,strftime('%d-%m-%Y',a.Prev_Credit_Date) as Prev_Credit_Date ,strftime('%d-%m-%Y',a.Prev_Debit_Date) as Prev_Debit_Date FROM Stock_Summary a left join Stock_Details b on  b.StockID = a.StockID order by b.Product_name "

#@Fetch previously credited data
FETCH_STOCK_PREV_CREDIT_DATA="SELECT PIB.Stock_ID,SD.Product_name,PIB.Qty,strftime('%d-%m-%Y',P.Created_Date) as Prev_Credit_Date,PIB.Amount,SUDA.FN || ' ' || LN as Suppliername ,P.P_Bill_NO FROM Purchase P LEFT JOIN Purchase_Bill PB ON PB.P_Bill_NO=P.P_Bill_NO LEFT JOIN Purchase_Item_Bucket PIB ON PIB.P_Bill_NO=P.P_Bill_NO LEFT JOIN Supplier_Data SUDA ON SUDA.supplier_id=P.Supplier_ID LEFT JOIN Stock_Details SD ON SD.StockID=PIB.Stock_ID WHERE P.isActive='true' ORDER BY  PIB.ID DESC"

#@Fetch previously debited data
FETCH_STOCK_PREV_DEBIT_DATA="SELECT IIB.Stock_ID,SD.Product_name,IIB.Qty,strftime('%d-%m-%Y',I.Created_Date) as Prev_Debit_Date,IIB.Amount,CD.FN || ' ' || LN as ClientName ,I.Invoice_NO  FROM Invoice I LEFT JOIN Invoice_Bill IB ON IB.Invoice_NO=I.Invoice_NO LEFT JOIN Invoice_Item_Bucket IIB ON IIB.Invoice_NO=I.Invoice_NO LEFT JOIN Client_Data CD ON CD.client_id=I.Client_ID LEFT JOIN Stock_Details SD ON SD.StockID=IIB.Stock_ID WHERE I.isActive='true' ORDER BY  IIB.ID DESC"
