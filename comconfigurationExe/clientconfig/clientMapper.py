GET_CLIENT_DATA_FOR_TABLE="SELECT client_id , FN||' '|| LN as Name ,contact_no,email, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address ,PAN_NO FROM Client_Data WHERE isActive='true' order by Name"

ADD_CLIENT="INSERT into Client_Data (FN,LN,gender,address,city,state,pincode,contact_no,email,PAN_NO,GSTIN,DT,DN,DOB,Created_Date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
GET_CLIENT_DATA_LIST="SELECT FN ||' '|| LN as Name,contact_no FROM Client_Data"

GET_CLIENT_DATA_LIST_USING_ID="SELECT * FROM Client_Data where FN||' '|| LN = ? OR contact_no=? OR client_id=?"

UPDATE_CLIENT_INFORMATION="UPDATE Client_Data SET FN=?,LN=?,address=?,city=?,state=?,pincode=?,contact_no=?,email=?,gender=?,PAN_NO=?,GSTIN=?,DT=?,DN=?,DOB=? WHERE client_id = ? "

DELETE_CLIENT_INFORMATION="UPDATE Client_Data SET isActive='false' WHERE client_id=?"

SEARCH_CLIENT_DATA_USING_CONTACT_NO="Select * from Client_Data where contact_no=?"
