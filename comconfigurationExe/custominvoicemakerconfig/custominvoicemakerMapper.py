CREATE_CUSTOM_INVOICE="INSERT INTO Custom_Invoice (Invoice_NO,InvoiceDate,POS,ClientName,ClientAddress,ClientCity,ClientState,ClientZipCode,ClientContactNo,ClientEmail,ClientPAN,ClientGSTIN,Discount,Shipping,SubTotal,NetAmount,CreatedDate) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
CREATE_TERMS="INSERT INTO Custom_Invoice_Terms (Invoice_NO,Term,CreatedDate) values (?,?,?)"
INSERT_INTO_BUCKET="INSERT INTO Custom_Invoice_Bucket (Invoice_NO,ItemName,ItemPrice,ItemQty,Tax_Type,Tax,Discount,TotalAmount,CreatedDate) values (?,?,?,?,?,?,?,?,?)"
FETCH_DATA_FOR_TABLE="SELECT Invoice_ID,Invoice_NO,InvoiceDate,ClientName,ClientContactNo,ClientEmail,NetAmount FROM Custom_Invoice ORDER BY CreatedDate DESC"

DELETE_CUSTOM_INVOICE="DELETE FROM Custom_Invoice WHERE Invoice_NO=?"
DELETE_CUSTOM_INVOICE_BUCKET_ITEM="DELETE FROM Custom_Invoice_Bucket WHERE Invoice_NO=?"
DELETE_CUSTOM_INVOICE_TERMS="DELETE FROM Custom_Invoice_Terms WHERE Invoice_NO=?"

GET_PREVIEW_CUSTOM_INVOICE_DATA= " SELECT * FROM Custom_Invoice WHERE Invoice_NO = ? "
GET_PREVIEW_CUSTOM_INVOICE_BUCKET_DATA=" SELECT * FROM Custom_Invoice_Bucket WHERE Invoice_NO=? "
GET_PREVIEW_CUSTOM_INVOICE_TERMS_DATA=" SELECT * FROM Custom_Invoice_Terms WHERE Invoice_NO=? "
