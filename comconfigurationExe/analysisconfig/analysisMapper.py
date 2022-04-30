
#========================================================== SALE ANALYSIS ======================================================================
#--------------------------------------------------------------------------------------------------------------------------------------------------
FETCH_TOTAL_SALE_PER_MONTH="SELECT strftime('%m', Created_Date) as Month, COUNT(Invoice_ID) as Total_Sale FROM Invoice WHERE isActive='true' AND isReturn='false' AND strftime('%Y', Created_Date) = ? GROUP BY strftime('%m', Created_Date)"
TOTAL_AVG_COST_OF_SALE_PER_MONTH="SELECT strftime('%m', I.Created_Date) as Month, SUM(IB.Total_Amount) as Total_Amount,SUM(IB.Amount_Paid) as Amount_Paid, SUM(IB.Balance_Amount) as Balance_Amount FROM Invoice I LEFT JOIN Invoice_Bill IB on IB.Invoice_NO = I.Invoice_NO WHERE I.isActive='true' AND I.isReturn='false' AND strftime('%Y', I.Created_Date) = ? GROUP BY strftime('%m', I.Created_Date)"
PLACE_OF_SUPPLY_FOR_SALE="SELECT  Place_of_supply, COUNT(Invoice_NO) as No_Of_times FROM Invoice  WHERE isActive='true' AND isReturn='false' AND  strftime('%Y', Created_Date) = ? GROUP BY  Place_of_supply "
TOTAL_GST_SALE="SELECT strftime('%m', Created_Date) as Month, COUNT(Invoice_Type) as GST_Sale FROM Invoice WHERE isActive='true' AND isReturn='false' AND  strftime('%Y', Created_Date) = ? and Invoice_Type='GST' GROUP BY strftime('%m', Created_Date)"
TOTAL_NON_GST_SALE="SELECT strftime('%m', Created_Date) as Month, COUNT(Invoice_Type) as Non_GST_Sale FROM Invoice WHERE isActive='true' AND isReturn='false' AND  strftime('%Y', Created_Date) = ? and Invoice_Type='Non GST' GROUP BY strftime('%m', Created_Date)"
#======================================================================================================================================================

#========================================================== PURCHASE ANALYSIS ======================================================================
#--------------------------------------------------------------------------------------------------------------------------------------------------
FETCH_TOTAL_PURCHASE_PER_MONTH="SELECT strftime('%m', Created_Date) as Month, COUNT(P_Bill_NO) as Total_Purchase FROM Purchase WHERE isActive='true' AND isReturn='false' AND  strftime('%Y', Created_Date) = ? GROUP BY strftime('%m', Created_Date)"
TOTAL_AVG_COST_OF_PURCHASE_PER_MONTH="SELECT strftime('%m', P.Created_Date) as Month, SUM(PB.Total_Amount) as Total_Amount,SUM(PB.Amount_Paid) as Amount_Paid, SUM(PB.Balance_Amount) as Balance_Amount FROM Purchase P LEFT JOIN Purchase_Bill PB on PB.P_Bill_NO = P.P_Bill_NO WHERE P.isActive='true' AND P.isReturn='false' AND  strftime('%Y', P.Created_Date) = ? GROUP BY strftime('%m', P.Created_Date)"
TOTAL_GST_PURCHASE="SELECT strftime('%m', Created_Date) as Month, COUNT(Purchas_Type) as GST_Purchase FROM Purchase WHERE isActive='true' AND isReturn='false' AND  strftime('%Y', Created_Date) = ? and Purchas_Type='GST' GROUP BY strftime('%m', Created_Date)"
TOTAL_NON_GST_PURCHASE="SELECT strftime('%m', Created_Date) as Month, COUNT(Purchas_Type) as NON_GST_Purchase FROM Purchase WHERE isActive='true' AND isReturn='false' AND  strftime('%Y', Created_Date) = ? and Purchas_Type='Non GST' GROUP BY strftime('%m', Created_Date)"
#======================================================================================================================================================

#========================================================== CLIENT ANALYSIS ======================================================================
#--------------------------------------------------------------------------------------------------------------------------------------------------
TOTAL_CLIENT_JOIN_DATA="SELECT strftime('%m', Created_Date) as Month, COUNT(*) as Client_Join FROM Client_Data WHERE isActive='true' AND strftime('%Y', Created_Date) = ? GROUP BY strftime('%m', Created_Date)"
TOTAL_ORDERS_PER_CLIENT_DATA="SELECT strftime('%m', Created_Date) as Month, COUNT(Client_ID) as Order_Per_Client FROM Invoice WHERE isActive='true' AND strftime('%Y', Created_Date) = ? GROUP BY strftime('%m', Created_Date)"
TOTAL_CLIENT_STATE_DATA="SELECT  State, COUNT(client_id) as No_of_Client FROM Client_Data WHERE isActive='true' AND strftime('%Y', Created_Date) = ?  GROUP BY  State"
#======================================================================================================================================================


#========================================================== SUPPLIER ANALYSIS ======================================================================
#--------------------------------------------------------------------------------------------------------------------------------------------------
TOTAL_SUPPLIER_JOIN_DATA="SELECT strftime('%m', Created_Date) as Month, COUNT(*) as Supplier_Join FROM Supplier_Data WHERE isActive='true' AND strftime('%Y', Created_Date) = ? GROUP BY strftime('%m', Created_Date)"
TOTAL_PURCHASE_ORDERS_PER_SUPPLIER_DATA="SELECT strftime('%m', Created_Date) as Month, COUNT(Purchase_ID) as Purchase_Order_Per_Supplier FROM Purchase WHERE isActive='true' AND strftime('%Y', Created_Date) = ? GROUP BY strftime('%m', Created_Date)"
TOTAL_SUPPLIER_STATE_DATA="SELECT  State, COUNT(supplier_id) as No_of_Supplier FROM Supplier_Data WHERE isActive='true' AND strftime('%Y', Created_Date) = ? GROUP BY  State"
#======================================================================================================================================================
