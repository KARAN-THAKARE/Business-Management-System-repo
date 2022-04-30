#=========================================================== FETCH CONSTANT QUERY ====================================================================
#@ fetch open data
FETCH_OPEN_DATA="SELECT I.Invoice_NO ,I.Invoice_Type,strftime('%d-%m-%Y',I.Invoice_Date) as InvoiceDate ,CD.FN || ' ' || CD.LN as ClientName,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount ,(IB.Amount_Paid*100/IB.Total_Amount) as GraphStatus,IB.Status as InvoiceStatus FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.isActive='true' and I.isReturn='false' and (IB.Status='Pending' or IB.Status='EMI Pending') ORDER BY I.Invoice_Date  DESC "

#@ fetch EMI data
FETCH_EMI_DATA="SELECT I.Invoice_NO ,I.Invoice_Type,strftime('%d-%m-%Y',I.Invoice_Date) as InvoiceDate ,CD.FN || ' ' || CD.LN as ClientName,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount ,(IB.Amount_Paid*100/IB.Total_Amount) as Status ,IB.EMI_Percent  FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id LEFT JOIN Invoice_EMI EMI ON EMI.Invoice_NO = I.Invoice_NO WHERE  I.isActive='true' and I.isReturn='false' and  IB.Status='EMI Pending' GROUP BY I.Invoice_NO ORDER BY I.Invoice_Date  DESC"

#  @ fetch return data
FETCH_RETURN_DATA="SELECT I.Invoice_NO ,I.Invoice_Type,I.Place_of_supply,strftime('%d-%m-%Y',I.Invoice_Date) as InvoiceDate ,CD.FN || ' ' || CD.LN as ClientName,IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount ,(IB.Amount_Paid*100/IB.Total_Amount) as Status,IB.Status as InvoiceStatus,RM.Remarks FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id  LEFT JOIN Remark RM ON RM.ID = I.Invoice_NO    WHERE   I.isReturn='true' and I.isActive='true' ORDER BY I.Invoice_Date  DESC"

#@ fetch complete data
FETCH_COMPLETED_DATA="SELECT I.Invoice_NO,I.Place_of_supply,I.Invoice_Type ,strftime('%d-%m-%Y',I.Invoice_Date) as InvoiceDate ,CD.FN || ' ' || CD.LN as ClientName,CD.email, IB.Total_Amount,IB.Amount_Paid,IB.Balance_Amount FROM Invoice I LEFT JOIN Invoice_Bill IB ON I.Invoice_NO = IB.Invoice_NO LEFT JOIN Client_Data CD ON I.Client_ID = CD.client_id WHERE I.isActive='true' and I.isReturn='false' and IB.Status='Complete' ORDER BY I.Invoice_Date DESC"


#===================================================== ~ END FETCH CONSTANT QUERY END ~ ====================================================================

#=========================================================== DELETE CONSTANT QUERY ====================================================================
#@ delete draft data
DELETE_SAVE_AS_DRAFT_DATA_1=" DELETE FROM Invoice WHERE Invoice_NO = ?"
DELETE_SAVE_AS_DRAFT_DATA_2=" DELETE FROM Invoice_Bill WHERE Invoice_NO = ?"
#===================================================== ~ END DELETE CONSTANT QUERY END ~ ====================================================================
