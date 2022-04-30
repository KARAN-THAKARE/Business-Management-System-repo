FETCH_INVENTORY_INFO="SELECT * FROM Stock_Details WHERE isActive='true' ORDER BY Product_name"

FETCH_INVENTORY_DATA_LIST="SELECT StockID, Product_name FROM Stock_Details WHERE isActive='true'"


GET_SEARCH_INVENTORY_DATA="SELECT * FROM Stock_Details where Product_name=? or StockID=?"

UPDATE_INVENTORY_INFORMATION="UPDATE Stock_Details SET Product_name=?,Product_Group=?,Brand=?,Item_Code=?,Serial_number=?,Purchase_price=?,Sale_price=?,MSP=?,MRP=?,Unit=?,HSN=?,CGST=?,SGST=?,Cess=?,IGST=?,Product_type=?,Product_Discription=? WHERE StockID = ? "

DELETE_INVENTORY_INFORMATION="UPDATE Stock_Details SET isActive='false' WHERE StockID=?"
