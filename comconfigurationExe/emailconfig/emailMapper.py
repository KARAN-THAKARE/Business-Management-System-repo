ADD_STAFF="INSERT into Staff_Data (FN,LN,address,city,state,pincode,gender,contact_no,email,DOB,designation,salary_amount,workingHR,DT,DN,Created_Date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

GET_STAFF_DATA_LIST="SELECT FN ||' '|| LN as Name,contact_no FROM Staff_Data"

GET_STAFF_DATA_FOR_TABLE="SELECT staff_id , FN||' '|| LN as Name ,contact_no, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address, pincode,DT,DN FROM Staff_Data WHERE isActive='true'"

GET_STAFF_DATA_USING_ID="SELECT * FROM Staff_Data where FN ||' '|| LN = ? OR contact_no=? OR staff_id=?"

UPDATE_STAFF_INFORMATION="UPDATE Staff_Data SET FN=?,LN=?,address=?,city=?,state=?,pincode=?,gender=?,contact_no=?,email=?,DOB=?,designation=?,salary_amount=?,workingHR=?,DT=?,DN=? WHERE staff_id = ? "

DELETE_STAFF_INFORMATION="DELETE FROM Staff_Data WHERE staff_id=?"

DELETE_STAFF_INFORMATION="UPDATE Staff_Data SET isActive='false' WHERE staff_id=?"

FETCH_STAFF_DATA_FOR_SALARY="SELECT * FROM Staff_Data WHERE isActive='true'"

FETCH_SALARY_TABLE_INFO="SELECT * FROM Staff_Salary WHERE strftime('%m', Created_Date)=? AND strftime('%Y', Created_Date)=? AND Staff_ID=?"

PAY_SALARY="INSERT into Staff_Salary (Staff_ID,Salary_Paid,Created_Date) values (?,?,?)"
