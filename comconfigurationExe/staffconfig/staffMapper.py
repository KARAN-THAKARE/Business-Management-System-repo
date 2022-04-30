ADD_STAFF="INSERT into Staff_Data (FN,LN,address,city,state,pincode,gender,contact_no,email,DOB,designation,salary_amount,workingHR,DT,DN,Created_Date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

GET_STAFF_DATA_LIST="SELECT FN ||' '|| LN as Name,contact_no FROM Staff_Data"

GET_STAFF_DATA_FOR_TABLE="SELECT staff_id , FN||' '|| LN as Name ,contact_no, address ||' , '|| city ||' , ' || state || '. ' || pincode as Address, pincode,DT,DN FROM Staff_Data WHERE isActive='true' ORDER BY Name"

GET_STAFF_DATA_USING_ID="SELECT * FROM Staff_Data where FN ||' '|| LN = ? OR contact_no=? OR staff_id=?"

UPDATE_STAFF_INFORMATION="UPDATE Staff_Data SET FN=?,LN=?,address=?,city=?,state=?,pincode=?,gender=?,contact_no=?,email=?,DOB=?,designation=?,salary_amount=?,workingHR=?,DT=?,DN=? WHERE staff_id = ? "

DELETE_STAFF_INFORMATION="DELETE FROM Staff_Data WHERE staff_id=?"

DELETE_STAFF_INFORMATION="UPDATE Staff_Data SET isActive='false' WHERE staff_id=?"

FETCH_STAFF_DATA_FOR_SALARY="SELECT staff_id,FN,LN,designation,salary_amount FROM Staff_Data WHERE isActive='true' ORDER BY FN,LN"

FETCH_SALARY_TABLE_INFO="select  a.Staff_ID,a.Created_Date,SUM(a.Salary_Paid) as TotalAmtPaid,COUNT(a.Staff_ID) as Totalpaidcount , (round((100.00  * SUM(a.Salary_Paid))/b.salary_amount)) as salarycompleteinpercent, (b.salary_amount-SUM(a.Salary_Paid)) as pendingamt from staff_Salary a left join  Staff_data b on b.Staff_ID=a.staff_id  WHERE a.paid_month=? AND a.paid_year=? AND a.Staff_ID=?"

FETCH_SALARY_PAYMENT_HISTORY="select  a.ID,a.Staff_ID,a.Salary_Paid,strftime('%d-%m-%Y',a.Created_Date) from staff_Salary a WHERE a.paid_month=? AND a.paid_year=? AND a.Staff_ID=?  ORDER BY a.ID DESC"

FETCH_PREVIOUS_PAYMENT_INFO="select  a.Salary_Paid,strftime('%d-%m-%Y',a.Created_Date) from staff_Salary a WHERE a.paid_month=? AND a.paid_year=? AND a.Staff_ID=?  ORDER BY a.ID DESC LIMIT 1"

PAY_SALARY="INSERT into Staff_Salary (Staff_ID,Salary_Paid,paid_month,paid_year,Created_Date) values (?,?,?,?,?)"
