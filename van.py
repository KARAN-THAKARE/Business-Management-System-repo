import pyvan
global feed
OPTIONS = {
            "main_file_name": "app.py",
            "show_console": False,
            "use_pipreqs": True,
            "install_only_these_modules": [ "Pip install flask","pip install flask-sqlalchemy","pip install qrcode","pip install pillow","pip install opencv-python","pip install numpy","pip install pyzbar","pip install db-sqlite3","pip install pysqlite3","pip install flaskwebgui","pip install pyvan","pip install python-dateutil","pip install XlsxWriter","pip install flask-caching","pip install pyautogui","pip install jproperties","pip install fiscalyear","pip install pdfkit","pip install wkhtmltopdf"],
            "exclude_modules":[],
            "include_modules":[],
            "path_to_get_pip_and_python_embeded_zip": ""
            }

pyvan.build(OPTIONS)
