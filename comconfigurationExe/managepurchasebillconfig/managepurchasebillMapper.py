
#=========================================================  FETCH CONSTANT QUERY ====================================================================
#@ Fetch open data
FETCH_OPEN_DATA="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as PurchaseDate ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount ,(PB.Amount_Paid*100/PB.Total_Amount) as Status FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE P.isActive='true'and PB.Status='Pending' ORDER BY P.Purchase_Order_Date DESC"

#@ Fetch RETURN data
FETCH_RETURN_DATA="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as PurchaseDate ,SD.FN || ' ' || SD.LN as SupplierName, PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount ,(PB.Amount_Paid*100/PB.Total_Amount) as Status,RE.Remarks FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id  LEFT JOIN Remark RE ON RE.ID = P.P_Bill_NO WHERE P.isReturn='true' and P.isActive='true' ORDER BY P.Purchase_Order_Date DESC"

#@ Fetch complete data
FETCH_COMPLETED_DATA="SELECT P.P_Bill_NO,P.Purchas_Type ,strftime('%d-%m-%Y',P.Purchase_Order_Date) as PurchaseDate ,SD.FN || ' ' || SD.LN as SupplierName,SD.email,PB.Total_Amount,PB.Amount_Paid,PB.Balance_Amount FROM Purchase P LEFT JOIN Purchase_Bill PB ON P.P_Bill_NO = PB.P_Bill_NO LEFT JOIN Supplier_Data SD ON P.Supplier_ID = SD.supplier_id WHERE  P.isActive='true'and PB.Status='Complete' ORDER BY P.Purchase_Order_Date DESC"



#=========================================================  END END END END ====================================================================



DELETE_SAVE_AS_DRAFT_DATA_1=" DELETE FROM Purchase WHERE P_Bill_NO = ?"
DELETE_SAVE_AS_DRAFT_DATA_2=" DELETE FROM Purchase_Bill WHERE P_Bill_NO = ?"

FETCH_PURCHASE_BILL_INFOR="SELECT * FROM Purchase_Bill WHERE P_Bill_NO =? "
ADD_PAYEMENT_FOR_BILL="INSERT INTO Purchase_Invoices (P_Bill_NO,P_Order_NO,Payment_Mode,Txn_NO,Amount_Paid,Paid_on,Remarks,Created_Date) values (?,?,?,?,?,?,?,?)"
UPDATE_Purchase_Bill="UPDATE Purchase_Bill SET Amount_Paid=?,Balance_Amount=?,Status=?  WHERE P_Bill_NO = ? "
