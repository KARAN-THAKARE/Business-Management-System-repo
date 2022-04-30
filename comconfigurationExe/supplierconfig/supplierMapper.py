GET_SUPPLIER_DATA_FOR_TABLE="SELECT supplier_id , FN||' '|| LN as Name ,contact_no,email, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address ,PAN_NO FROM Supplier_Data WHERE isActive='true' order by Name"

ADD_SUPPLIER="INSERT into Supplier_Data (FN,LN,gender,address,city,state,pincode,contact_no,email,PAN_NO,GSTIN,DT,DN,DOB,Created_Date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

GET_SUPPLIER_DATA_LIST="SELECT FN ||' '|| LN as Name,contact_no FROM Supplier_Data"

GET_SUPPLIER_DATA_LIST_USING_ID="SELECT * FROM Supplier_Data where FN||' '|| LN = ? OR contact_no=? OR supplier_id=?"

UPDATE_SUPPLIER_INFORMATION="UPDATE Supplier_Data SET FN=?,LN=?,address=?,city=?,state=?,pincode=?,contact_no=?,email=?,gender=?,PAN_NO=?,GSTIN=?,DT=?,DN=?,DOB=? WHERE supplier_id = ? "

DELETE_SUPPLIER_INFORMATION="UPDATE Supplier_Data SET isActive='false' WHERE supplier_id=?"

SEARCH_SUPPLIER_BY_CONTACT_NO="SELECT supplier_id as ID , FN ||' '|| LN as Name,contact_no,address || ',' || city || ',' || state || '.' || pincode as Address,email,PAN_NO,GSTIN  FROM Supplier_Data where contact_no=?"
