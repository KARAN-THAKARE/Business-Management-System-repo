#=========================================================== FETCH CONSTANT QUERY ====================================================================
FETCH_OPEN_DATA="SELECT Q.Quotation_NO,strftime('%d-%m-%Y', Q.Quotation_Date) as Quotation_Date,Q.Place_of_supply,QB.Apply_EMI,QB.Total_Amount,C.FN || ' ' || C.LN as Client_Name,C.contact_no,C.email from Quotation Q LEFT JOIN Quotation_Bill QB ON QB.Quotation_NO=Q.Quotation_NO LEFT JOIN Client_Data C ON C.client_id=Q.Client_ID WHERE  Q.isActive='true' order by Q.Quotation_Date  DESC "
#===================================================== ~ END FETCH CONSTANT QUERY END ~ ====================================================================