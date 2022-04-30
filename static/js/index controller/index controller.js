var app = angular.module('COMMON', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});



  var state_arr = new Array("Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal");

  var s_a = new Array();
  s_a[0]="";
  s_a[1]=" Alipur | Andaman Island | Anderson Island | Arainj-Laka-Punga | Austinabad | Bamboo Flat | Barren Island | Beadonabad | Betapur | Bindraban | Bonington | Brookesabad | Cadell Point | Calicut | Chetamale | Cinque Islands | Defence Island | Digilpur | Dolyganj | Flat Island | Geinyale | Great Coco Island | Haddo | Havelock Island | Henry Lawrence Island | Herbertabad | Hobdaypur | Ilichar | Ingoie | Inteview Island | Jangli Ghat | Jhon Lawrence Island | Karen | Kartara | KYD Islannd | Landfall Island | Little Andmand | Little Coco Island | Long Island | Maimyo | Malappuram | Manglutan | Manpur | Mitha Khari | Neill Island | Nicobar Island | North Brother Island | North Passage Island | North Sentinel Island | Nothen Reef Island | Outram Island | Pahlagaon | Palalankwe | Passage Island | Phaiapong | Phoenix Island | Port Blair | Preparis Island | Protheroepur | Rangachang | Rongat | Rutland Island | Sabari | Saddle Peak | Shadipur | Smith Island | Sound Island | South Sentinel Island | Spike Island | Tarmugli Island | Taylerabad | Titaije | Toibalawe | Tusonabad | West Island | Wimberleyganj | Yadita";
  s_a[2]=" Achampet | Adilabad | Adoni | Alampur | Allagadda | Alur | Amalapuram | Amangallu | Anakapalle | Anantapur | Andole | Araku | Armoor | Asifabad | Aswaraopet | Atmakur | B. Kothakota | Badvel | Banaganapalle | Bandar | Bangarupalem | Banswada | Bapatla | Bellampalli | Bhadrachalam | Bhainsa | Bheemunipatnam | Bhimadole | Bhimavaram | Bhongir | Bhooragamphad | Boath | Bobbili | Bodhan | Chandoor | Chavitidibbalu | Chejerla | Chepurupalli | Cherial | Chevella | Chinnor | Chintalapudi | Chintapalle | Chirala | Chittoor | Chodavaram | Cuddapah | Cumbum | Darsi | Devarakonda | Dharmavaram | Dichpalli | Divi | Donakonda | Dronachalam | East Godavari | Eluru | Eturnagaram | Gadwal | Gajapathinagaram | Gajwel | Garladinne | Giddalur | Godavari | Gooty | Gudivada | Gudur | Guntur | Hindupur | Hunsabad | Huzurabad | Huzurnagar | Hyderabad | Ibrahimpatnam | Jaggayyapet | Jagtial | Jammalamadugu | Jangaon | Jangareddygudem | Jannaram | Kadiri | Kaikaluru | Kakinada | Kalwakurthy | Kalyandurg | Kamalapuram | Kamareddy | Kambadur | Kanaganapalle | Kandukuru | Kanigiri | Karimnagar | Kavali | Khammam | Khanapur (AP) | Kodangal | Koduru | Koilkuntla | Kollapur | Kothagudem | Kovvur | Krishna | Krosuru | Kuppam | Kurnool | Lakkireddipalli | Madakasira | Madanapalli | Madhira | Madnur | Mahabubabad | Mahabubnagar | Mahadevapur | Makthal | Mancherial | Mandapeta | Mangalagiri | Manthani | Markapur | Marturu | Medachal | Medak | Medarmetla | Metpalli | Mriyalguda | Mulug | Mylavaram | Nagarkurnool | Nalgonda | Nallacheruvu | Nampalle | Nandigama | Nandikotkur | Nandyal | Narasampet | Narasaraopet | Narayanakhed | Narayanpet | Narsapur | Narsipatnam | Nazvidu | Nelloe | Nellore | Nidamanur | Nirmal | Nizamabad | Nuguru | Ongole | Outsarangapalle | Paderu | Pakala | Palakonda | Paland | Palmaneru | Pamuru | Pargi | Parkal | Parvathipuram | Pathapatnam | Pattikonda | Peapalle | Peddapalli | Peddapuram | Penukonda | Piduguralla | Piler | Pithapuram | Podili | Polavaram | Prakasam | Proddatur | Pulivendla | Punganur | Putturu | Rajahmundri | Rajampeta | Ramachandrapuram | Ramannapet | Rampachodavaram | Rangareddy | Rapur | Rayachoti | Rayadurg | Razole | Repalle | Saluru | Sangareddy | Sathupalli | Sattenapalle | Satyavedu | Shadnagar | Siddavattam | Siddipet | Sileru | Sircilla | Sirpur Kagaznagar | Sodam | Sompeta | Srikakulam | Srikalahasthi | Srisailam | Srungavarapukota | Sudhimalla | Sullarpet | Tadepalligudem | Tadipatri | Tanduru | Tanuku | Tekkali | Tenali | Thungaturthy | Tirivuru | Tirupathi | Tuni | Udaygiri | Ulvapadu | Uravakonda | Utnor | V.R. Puram | Vaimpalli | Vayalpad | Venkatgiri | Venkatgirikota | Vijayawada | Vikrabad | Vinjamuru | Vinukonda | Visakhapatnam | Vizayanagaram | Vizianagaram | Vuyyuru | Wanaparthy | Warangal | Wardhannapet | Yelamanchili | Yelavaram | Yeleswaram | Yellandu | Yellanuru | Yellareddy | Yerragondapalem | Zahirabad ";
  s_a[3]=" Along | Anini | Anjaw | Bameng | Basar | Changlang | Chowkhem | Daporizo | Dibang Valley | Dirang | Hayuliang | Huri | Itanagar | Jairampur | Kalaktung | Kameng | Khonsa | Kolaring | Kurung Kumey | Lohit | Lower Dibang Valley | Lower Subansiri | Mariyang | Mechuka | Miao | Nefra | Pakkekesang | Pangin | Papum Pare | Passighat | Roing | Sagalee | Seppa | Siang | Tali | Taliha | Tawang | Tezu | Tirap | Tuting | Upper Siang | Upper Subansiri | Yiang Kiag ";
  s_a[4]=" Abhayapuri | Baithalangshu | Barama | Barpeta Road | Bihupuria | Bijni | Bilasipara | Bokajan | Bokakhat | Boko | Bongaigaon | Cachar | Cachar Hills | Darrang | Dhakuakhana | Dhemaji | Dhubri | Dibrugarh | Digboi | Diphu | Goalpara | Gohpur | Golaghat | Guwahati | Hailakandi | Hajo | Halflong | Hojai | Howraghat | Jorhat | Kamrup | Karbi Anglong | Karimganj | Kokarajhar | Kokrajhar | Lakhimpur | Maibong | Majuli | Mangaldoi | Mariani | Marigaon | Moranhat | Morigaon | Nagaon | Nalbari | Rangapara | Sadiya | Sibsagar | Silchar | Sivasagar | Sonitpur | Tarabarihat | Tezpur | Tinsukia | Udalgiri | Udalguri | UdarbondhBarpeta";
  s_a[5]=" Adhaura | Amarpur | Araria | Areraj | Arrah | Arwal | Aurangabad | Bagaha | Banka | Banmankhi | Barachakia | Barauni | Barh | Barosi | Begusarai | Benipatti | Benipur | Bettiah | Bhabhua | Bhagalpur | Bhojpur | Bidupur | Biharsharif | Bikram | Bikramganj | Birpur | Buxar | Chakai | Champaran | Chapara | Dalsinghsarai | Danapur | Darbhanga | Daudnagar | Dhaka | Dhamdaha | Dumraon | Ekma | Forbesganj | Gaya | Gogri | Gopalganj | H.Kharagpur | Hajipur | Hathua | Hilsa | Imamganj | Jahanabad | Jainagar | Jamshedpur | Jamui | Jehanabad | Jhajha | Jhanjharpur | Kahalgaon | Kaimur (Bhabua) | Katihar | Katoria | Khagaria | Kishanganj | Korha | Lakhisarai | Madhepura | Madhubani | Maharajganj | Mahua | Mairwa | Mallehpur | Masrakh | Mohania | Monghyr | Motihari | Motipur | Munger | Muzaffarpur | Nabinagar | Nalanda | Narkatiaganj | Naugachia | Nawada | Pakribarwan | Pakridayal | Patna | Phulparas | Piro | Pupri | Purena | Purnia | Rafiganj | Rajauli | Ramnagar | Raniganj | Raxaul | Rohtas | Rosera | S.Bakhtiarpur | Saharsa | Samastipur | Saran | Sasaram | Seikhpura | Sheikhpura | Sheohar | Sherghati | Sidhawalia | Singhwara | Sitamarhi | Siwan | Sonepur | Supaul | Thakurganj | Triveniganj | Udakishanganj | Vaishali | Wazirganj";
  s_a[6]=" Chandigarh | Mani Marja";
  s_a[7]=" Ambikapur | Antagarh | Arang | Bacheli | Bagbahera | Bagicha | Baikunthpur | Balod | Balodabazar | Balrampur | Barpalli | Basana | Bastanar | Bastar | Bderajpur | Bemetara | Berla | Bhairongarh | Bhanupratappur | Bharathpur | Bhatapara | Bhilai | Bhilaigarh | Bhopalpatnam | Bijapur | Bilaspur | Bodla | Bokaband | Chandipara | Chhinagarh | Chhuriakala | Chingmut | Chuikhadan | Dabhara | Dallirajhara | Dantewada | Deobhog | Dhamda | Dhamtari | Dharamjaigarh | Dongargarh | Durg | Durgakondal | Fingeshwar | Gariaband | Garpa | Gharghoda | Gogunda | Ilamidi | Jagdalpur | Janjgir | Janjgir-Champa | Jarwa | Jashpur | Jashpurnagar | Kabirdham-Kawardha | Kanker | Kasdol | Kathdol | Kathghora | Kawardha | Keskal | Khairgarh | Kondagaon | Konta | Korba | Korea | Kota | Koyelibeda | Kuakunda | Kunkuri | Kurud | Lohadigundah | Lormi | Luckwada | Mahasamund | Makodi | Manendragarh | Manpur | Marwahi | Mohla | Mungeli | Nagri | Narainpur | Narayanpur | Neora | Netanar | Odgi | Padamkot | Pakhanjur | Pali | Pandaria | Pandishankar | Parasgaon | Pasan | Patan | Pathalgaon | Pendra | Pratappur | Premnagar | Raigarh | Raipur | Rajnandgaon | Rajpur | Ramchandrapur | Saraipali | Saranggarh | Sarona | Semaria | Shakti | Sitapur | Sukma | Surajpur | Surguja | Tapkara | Toynar | Udaipur | Uproda | Wadrainagar";
  s_a[8]=" Amal | Amli | Bedpa | Chikhli | Dadra & Nagar Haveli | Dahikhed | Dolara | Galonda | Kanadi | Karchond | Khadoli | Kharadpada | Kherabari | Kherdi | Kothar | Luari | Mashat | Rakholi | Rudana | Saili | Sili | Silvassa | Sindavni | Udva | Umbarkoi | Vansda | Vasona | Velugam ";
  s_a[9]=" Brancavare | Dagasi | Daman | Diu | Magarvara | Nagwa | Pariali | Passo Covo ";
  s_a[10]=" Central Delhi | East Delhi | New Delhi | North Delhi | North East Delhi | North West Delhi | South Delhi | South West Delhi | West Delhi ";
  s_a[11]=" Canacona | Candolim | Chinchinim | Cortalim | Goa | Jua | Madgaon | Mahem | Mapuca | Marmagao | Panji | Ponda | Sanvordem | Terekhol ";
  s_a[12]=" Ahmedabad | Ahwa | Amod | Amreli | Anand | Anjar | Ankaleshwar | Babra | Balasinor | Banaskantha | Bansada | Bardoli | Bareja | Baroda | Barwala | Bayad | Bhachav | Bhanvad | Bharuch | Bhavnagar | Bhiloda | Bhuj | Billimora | Borsad | Botad | Chanasma | Chhota Udaipur | Chotila | Dabhoi | Dahod | Damnagar | Dang | Danta | Dasada | Dediapada | Deesa | Dehgam | Deodar | Devgadhbaria | Dhandhuka | Dhanera | Dharampur | Dhari | Dholka | Dhoraji | Dhrangadhra | Dhrol | Dwarka | Fortsongadh | Gadhada | Gandhi Nagar | Gariadhar | Godhra | Gogodar | Gondal | Halol | Halvad | Harij | Himatnagar | Idar | Jambusar | Jamjodhpur | Jamkalyanpur | Jamnagar | Jasdan | Jetpur | Jhagadia | Jhalod | Jodia | Junagadh | Junagarh | Kalawad | Kalol | Kapad Wanj | Keshod | Khambat | Khambhalia | Khavda | Kheda | Khedbrahma | Kheralu | Kodinar | Kotdasanghani | Kunkawav | Kutch | Kutchmandvi | Kutiyana | Lakhpat | Lakhtar | Lalpur | Limbdi | Limkheda | Lunavada | M.M.Mangrol | Mahuva | Malia-Hatina | Maliya | Malpur | Manavadar | Mandvi | Mangrol | Mehmedabad | Mehsana | Miyagam | Modasa | Morvi | Muli | Mundra | Nadiad | Nakhatrana | Nalia | Narmada | Naswadi | Navasari | Nizar | Okha | Paddhari | Padra | Palanpur | Palitana | Panchmahals | Patan | Pavijetpur | Porbandar | Prantij | Radhanpur | Rahpar | Rajaula | Rajkot | Rajpipla | Ranavav | Sabarkantha | Sanand | Sankheda | Santalpur | Santrampur | Savarkundla | Savli | Sayan | Sayla | Shehra | Sidhpur | Sihor | Sojitra | Sumrasar | Surat | Surendranagar | Talaja | Thara | Tharad | Thasra | Una-Diu | Upleta | Vadgam | Vadodara | Valia | Vallabhipur | Valod | Valsad | Vanthali | Vapi | Vav | Veraval | Vijapur | Viramgam | Visavadar | Visnagar | Vyara | Waghodia | Wankaner ";
  s_a[13]=" Adampur Mandi | Ambala | Assandh | Bahadurgarh | Barara | Barwala | Bawal | Bawanikhera | Bhiwani | Charkhidadri | Cheeka | Chhachrauli | Dabwali | Ellenabad | Faridabad | Fatehabad | Ferojpur Jhirka | Gharaunda | Gohana | Gurgaon | Hansi | Hisar | Jagadhari | Jatusana | Jhajjar | Jind | Julana | Kaithal | Kalanaur | Kalanwali | Kalka | Karnal | Kosli | Kurukshetra | Loharu | Mahendragarh | Meham | Mewat | Mohindergarh | Naraingarh | Narnaul | Narwana | Nilokheri | Nuh | Palwal | Panchkula | Panipat | Pehowa | Ratia | Rewari | Rohtak | Safidon | Sirsa | Siwani | Sonipat | Tohana | Tohsam | Yamunanagar ";
  s_a[14]=" Amb | Arki | Banjar | Bharmour | Bilaspur | Chamba | Churah | Dalhousie | Dehra Gopipur | Hamirpur | Jogindernagar | Kalpa | Kangra | Kinnaur | Kullu | Lahaul | Mandi | Nahan | Nalagarh | Nirmand | Nurpur | Palampur | Pangi | Paonta | Pooh | Rajgarh | Rampur Bushahar | Rohru | Shimla | Sirmaur | Solan | Spiti | Sundernagar | Theog | Udaipur | Una";
  s_a[15]=" Akhnoor | Anantnag | Badgam | Bandipur | Baramulla | Basholi | Bedarwah | Budgam | Doda | Gulmarg | Jammu | Kalakot | Kargil | Karnah | Kathua | Kishtwar | Kulgam | Kupwara | Leh | Mahore | Nagrota | Nobra | Nowshera | Nyoma | Padam | Pahalgam | Patnitop | Poonch | Pulwama | Rajouri | Ramban | Ramnagar | Reasi | Samba | Srinagar | Udhampur | Vaishno Devi ";
  s_a[16]=" Bagodar | Baharagora | Balumath | Barhi | Barkagaon | Barwadih | Basia | Bermo | Bhandaria | Bhawanathpur | Bishrampur | Bokaro | Bolwa | Bundu | Chaibasa | Chainpur | Chakardharpur | Chandil | Chatra | Chavparan | Daltonganj | Deoghar | Dhanbad | Dumka | Dumri | Garhwa | Garu | Ghaghra | Ghatsila | Giridih | Godda | Gomia | Govindpur | Gumla | Hazaribagh | Hunterganj | Ichak | Itki | Jagarnathpur | Jamshedpur | Jamtara | Japla | Jharmundi | Jhinkpani | Jhumaritalaiya | Kathikund | Kharsawa | Khunti | Koderma | Kolebira | Latehar | Lohardaga | Madhupur | Mahagama | Maheshpur Raj | Mandar | Mandu | Manoharpur | Muri | Nagarutatri | Nala | Noamundi | Pakur | Palamu | Palkot | Patan | Rajdhanwar | Rajmahal | Ramgarh | Ranchi | Sahibganj | Saraikela | Simaria | Simdega | Singhbhum | Tisri | Torpa ";
  s_a[17]=" Afzalpur | Ainapur | Aland | Alur | Anekal | Ankola | Arsikere | Athani | Aurad | Bableshwar | Badami | Bagalkot | Bagepalli | Bailhongal | Bangalore | Bangalore Rural | Bangarpet | Bantwal | Basavakalyan | Basavanabagewadi | Basavapatna | Belgaum | Bellary | Belthangady | Belur | Bhadravati | Bhalki | Bhatkal | Bidar | Bijapur | Biligi | Chadchan | Challakere | Chamrajnagar | Channagiri | Channapatna | Channarayapatna | Chickmagalur | Chikballapur | Chikkaballapur | Chikkanayakanahalli | Chikkodi | Chikmagalur | Chincholi | Chintamani | Chitradurga | Chittapur | Cowdahalli | Davanagere | Deodurga | Devangere | Devarahippargi | Dharwad | Doddaballapur | Gadag | Gangavathi | Gokak | Gowribdanpur | Gubbi | Gulbarga | Gundlupet | H.B.Halli | H.D. Kote | Haliyal | Hampi | Hangal | Harapanahalli | Hassan | Haveri | Hebri | Hirekerur | Hiriyur | Holalkere | Holenarsipur | Honnali | Honnavar | Hosadurga | Hosakote | Hosanagara | Hospet | Hubli | Hukkeri | Humnabad | Hungund | Hunsagi | Hunsur | Huvinahadagali | Indi | Jagalur | Jamkhandi | Jewargi | Joida | K.R. Nagar | Kadur | Kalghatagi | Kamalapur | Kanakapura | Kannada | Kargal | Karkala | Karwar | Khanapur | Kodagu | Kolar | Kollegal | Koppa | Koppal | Koratageri | Krishnarajapet | Kudligi | Kumta | Kundapur | Kundgol | Kunigal | Kurugodu | Kustagi | Lingsugur | Madikeri | Madugiri | Malavalli | Malur | Mandya | Mangalore | Manipal | Manvi | Mashal | Molkalmuru | Mudalgi | Muddebihal | Mudhol | Mudigere | Mulbagal | Mundagod | Mundargi | Murugod | Mysore | Nagamangala | Nanjangud | Nargund | Narsimrajapur | Navalgund | Nelamangala | Nimburga | Pandavapura | Pavagada | Puttur | Raibag | Raichur | Ramdurg | Ranebennur | Ron | Sagar | Sakleshpur | Salkani | Sandur | Saundatti | Savanur | Sedam | Shahapur | Shankarnarayana | Shikaripura | Shimoga | Shirahatti | Shorapur | Siddapur | Sidlaghatta | Sindagi | Sindhanur | Sira | Sirsi | Siruguppa | Somwarpet | Sorab | Sringeri | Sriniwaspur | Srirangapatna | Sullia | T. Narsipur | Tallak | Tarikere | Telgi | Thirthahalli | Tiptur | Tumkur | Turuvekere | Udupi | Virajpet | Wadi | Yadgiri | Yelburga | Yellapur ";
  s_a[18]=" Adimaly | Adoor | Agathy | Alappuzha | Alathur | Alleppey | Alwaye | Amini | Androth | Attingal | Badagara | Bitra | Calicut | Cannanore | Chetlet | Ernakulam | Idukki | Irinjalakuda | Kadamath | Kalpeni | Kalpetta | Kanhangad | Kanjirapally | Kannur | Karungapally | Kasargode | Kavarathy | Kiltan | Kochi | Koduvayur | Kollam | Kottayam | Kovalam | Kozhikode | Kunnamkulam | Malappuram | Mananthodi | Manjeri | Mannarghat | Mavelikkara | Minicoy | Munnar | Muvattupuzha | Nedumandad | Nedumgandam | Nilambur | Palai | Palakkad | Palghat | Pathaanamthitta | Pathanamthitta | Payyanur | Peermedu | Perinthalmanna | Perumbavoor | Punalur | Quilon | Ranni | Shertallai | Shoranur | Taliparamba | Tellicherry | Thiruvananthapuram | Thodupuzha | Thrissur | Tirur | Tiruvalla | Trichur | Trivandrum | Uppala | Vadakkanchery | Vikom | Wayanad ";
  s_a[19]=" Agatti Island | Bingaram Island | Bitra Island | Chetlat Island | Kadmat Island | Kalpeni Island | Kavaratti Island | Kiltan Island | Lakshadweep Sea | Minicoy Island | North Island | South Island ";
  s_a[20]=" Agar | Ajaigarh | Alirajpur | Amarpatan | Amarwada | Ambah | Anuppur | Arone | Ashoknagar | Ashta | Atner | Babaichichli | Badamalhera | Badarwsas | Badnagar | Badnawar | Badwani | Bagli | Baihar | Balaghat | Baldeogarh | Baldi | Bamori | Banda | Bandhavgarh | Bareli | Baroda | Barwaha | Barwani | Batkakhapa | Begamganj | Beohari | Berasia | Berchha | Betul | Bhainsdehi | Bhander | Bhanpura | Bhikangaon | Bhimpur | Bhind | Bhitarwar | Bhopal | Biaora | Bijadandi | Bijawar | Bijaypur | Bina | Birsa | Birsinghpur | Budhni | Burhanpur | Buxwaha | Chachaura | Chanderi | Chaurai | Chhapara | Chhatarpur | Chhindwara | Chicholi | Chitrangi | Churhat | Dabra | Damoh | Datia | Deori | Deosar | Depalpur | Dewas | Dhar | Dharampuri | Dindori | Gadarwara | Gairatganj | Ganjbasoda | Garoth | Ghansour | Ghatia | Ghatigaon | Ghorandogri | Ghughari | Gogaon | Gohad | Goharganj | Gopalganj | Gotegaon | Gourihar | Guna | Gunnore | Gwalior | Gyraspur | Hanumana | Harda | Harrai | Harsud | Hatta | Hoshangabad | Ichhawar | Indore | Isagarh | Itarsi | Jabalpur | Jabera | Jagdalpur | Jaisinghnagar | Jaithari | Jaitpur | Jaitwara | Jamai | Jaora | Jatara | Jawad | Jhabua | Jobat | Jora | Kakaiya | Kannod | Kannodi | Karanjia | Kareli | Karera | Karhal | Karpa | Kasrawad | Katangi | Katni | Keolari | Khachrod | Khajuraho | Khakner | Khalwa | Khandwa | Khaniadhana | Khargone | Khategaon | Khetia | Khilchipur | Khirkiya | Khurai | Kolaras | Kotma | Kukshi | Kundam | Kurwai | Kusmi | Laher | Lakhnadon | Lamta | Lanji | Lateri | Laundi | Maheshwar | Mahidpurcity | Maihar | Majhagwan | Majholi | Malhargarh | Manasa | Manawar | Mandla | Mandsaur | Manpur | Mauganj | Mawai | Mehgaon | Mhow | Morena | Multai | Mungaoli | Nagod | Nainpur | Narsingarh | Narsinghpur | Narwar | Nasrullaganj | Nateran | Neemuch | Niwari | Niwas | Nowgaon | Pachmarhi | Pandhana | Pandhurna | Panna | Parasia | Patan | Patera | Patharia | Pawai | Petlawad | Pichhore | Piparia | Pohari | Prabhapattan | Punasa | Pushprajgarh | Raghogarh | Raghunathpur | Rahatgarh | Raisen | Rajgarh | Rajpur | Ratlam | Rehli | Rewa | Sabalgarh | Sagar | Sailana | Sanwer | Sarangpur | Sardarpur | Satna | Saunsar | Sehore | Sendhwa | Seondha | Seoni | Seonimalwa | Shahdol | Shahnagar | Shahpur | Shajapur | Sheopur | Sheopurkalan | Shivpuri | Shujalpur | Sidhi | Sihora | Silwani | Singrauli | Sirmour | Sironj | Sitamau | Sohagpur | Sondhwa | Sonkatch | Susner | Tamia | Tarana | Tendukheda | Teonthar | Thandla | Tikamgarh | Timarani | Udaipura | Ujjain | Umaria | Umariapan | Vidisha | Vijayraghogarh | Waraseoni | Zhirnia ";
  s_a[21]=" Achalpur | Aheri | Ahmednagar | Ahmedpur | Ajara | Akkalkot | Akola | Akole | Akot | Alibagh | Amagaon | Amalner | Ambad | Ambejogai | Amravati | Arjuni Merogaon | Arvi | Ashti | Atpadi | Aurangabad | Ausa | Babhulgaon | Balapur | Baramati | Barshi Takli | Barsi | Basmatnagar | Bassein | Beed | Bhadrawati | Bhamregadh | Bhandara | Bhir | Bhiwandi | Bhiwapur | Bhokar | Bhokardan | Bhoom | Bhor | Bhudargad | Bhusawal | Billoli | Brahmapuri | Buldhana | Butibori | Chalisgaon | Chamorshi | Chandgad | Chandrapur | Chandur | Chanwad | Chhikaldara | Chikhali | Chinchwad | Chiplun | Chopda | Chumur | Dahanu | Dapoli | Darwaha | Daryapur | Daund | Degloor | Delhi Tanda | Deogad | Deolgaonraja | Deori | Desaiganj | Dhadgaon | Dhanora | Dharani | Dhiwadi | Dhule | Dhulia | Digras | Dindori | Edalabad | Erandul | Etapalli | Gadhchiroli | Gadhinglaj | Gaganbavada | Gangakhed | Gangapur | Gevrai | Ghatanji | Golegaon | Gondia | Gondpipri | Goregaon | Guhagar | Hadgaon | Hatkangale | Hinganghat | Hingoli | Hingua | Igatpuri | Indapur | Islampur | Jalgaon | Jalna | Jamkhed | Jamner | Jath | Jawahar | Jintdor | Junnar | Kagal | Kaij | Kalamb | Kalamnuri | Kallam | Kalmeshwar | Kalwan | Kalyan | Kamptee | Kandhar | Kankavali | Kannad | Karad | Karjat | Karmala | Katol | Kavathemankal | Kedgaon | Khadakwasala | Khamgaon | Khed | Khopoli | Khultabad | Kinwat | Kolhapur | Kopargaon | Koregaon | Kudal | Kuhi | Kurkheda | Kusumba | Lakhandur | Langa | Latur | Lonar | Lonavala | Madangad | Madha | Mahabaleshwar | Mahad | Mahagaon | Mahasala | Mahaswad | Malegaon | Malgaon | Malgund | Malkapur | Malsuras | Malwan | Mancher | Mangalwedha | Mangaon | Mangrulpur | Manjalegaon | Manmad | Maregaon | Mehda | Mekhar | Mohadi | Mohol | Mokhada | Morshi | Mouda | Mukhed | Mul | Mumbai | Murbad | Murtizapur | Murud | Nagbhir | Nagpur | Nahavara | Nanded | Nandgaon | Nandnva | Nandurbar | Narkhed | Nashik | Navapur | Ner | Newasa | Nilanga | Niphad | Omerga | Osmanabad | Pachora | Paithan | Palghar | Pali | Pandharkawada | Pandharpur | Panhala | Paranda | Parbhani | Parner | Parola | Parseoni | Partur | Patan | Pathardi | Pathari | Patoda | Pauni | Peint | Pen | Phaltan | Pimpalner | Pirangut | Poladpur | Pune | Pusad | Pusegaon | Radhanagar | Rahuri | Raigad | Rajapur | Rajgurunagar | Rajura | Ralegaon | Ramtek | Ratnagiri | Raver | Risod | Roha | Sakarwadi | Sakoli | Sakri | Salekasa | Samudrapur | Sangamner | Sanganeshwar | Sangli | Sangola | Sanguem | Saoner | Saswad | Satana | Satara | Sawantwadi | Seloo | Shahada | Shahapur | Shahuwadi | Shevgaon | Shirala | Shirol | Shirpur | Shirur | Shirwal | Sholapur | Shri Rampur | Shrigonda | Shrivardhan | Sillod | Sinderwahi | Sindhudurg | Sindkheda | Sindkhedaraja | Sinnar | Sironcha | Soyegaon | Surgena | Talasari | Talegaon S.Ji Pant | Taloda | Tasgaon | Thane | Tirora | Tiwasa | Trimbak | Tuljapur | Tumsar | Udgir | Umarkhed | Umrane | Umrer | Urlikanchan | Vaduj | Velhe | Vengurla | Vijapur | Vita | Wada | Wai | Walchandnagar | Wani | Wardha | Warlydwarud | Warora | Washim | Wathar | Yavatmal | Yawal | Yeola | Yeotmal ";
  s_a[22]=" Bishnupur | Chakpikarong | Chandel | Chattrik | Churachandpur | Imphal | Jiribam | Kakching | Kalapahar | Mao | Mulam | Parbung | Sadarhills | Saibom | Sempang | Senapati | Sochumer | Taloulong | Tamenglong | Thinghat | Thoubal | Ukhrul ";
  s_a[23]=" Amlaren | Baghmara | Cherrapunjee | Dadengiri | Garo Hills | Jaintia Hills | Jowai | Khasi Hills | Khliehriat | Mariang | Mawkyrwat | Nongpoh | Nongstoin | Resubelpara | Ri Bhoi | Shillong | Tura | Williamnagar";
  s_a[24]=" Aizawl | Champhai | Demagiri | Kolasib | Lawngtlai | Lunglei | Mamit | Saiha | Serchhip";
  s_a[25]=" Dimapur | Jalukie | Kiphire | Kohima | Mokokchung | Mon | Phek | Tuensang | Wokha | Zunheboto ";
  s_a[26]=" Anandapur | Angul | Anugul | Aska | Athgarh | Athmallik | Attabira | Bagdihi | Balangir | Balasore | Baleswar | Baliguda | Balugaon | Banaigarh | Bangiriposi | Barbil | Bargarh | Baripada | Barkot | Basta | Berhampur | Betanati | Bhadrak | Bhanjanagar | Bhawanipatna | Bhubaneswar | Birmaharajpur | Bisam Cuttack | Boriguma | Boudh | Buguda | Chandbali | Chhatrapur | Chhendipada | Cuttack | Daringbadi | Daspalla | Deodgarh | Deogarh | Dhanmandal | Dharamgarh | Dhenkanal | Digapahandi | Dunguripali | G. Udayagiri | Gajapati | Ganjam | Ghatgaon | Gudari | Gunupur | Hemgiri | Hindol | Jagatsinghapur | Jajpur | Jamankira | Jashipur | Jayapatna | Jeypur | Jharigan | Jharsuguda | Jujumura | Kalahandi | Kalimela | Kamakhyanagar | Kandhamal | Kantabhanji | Kantamal | Karanjia | Kashipur | Kendrapara | Kendujhar | Keonjhar | Khalikote | Khordha | Khurda | Komana | Koraput | Kotagarh | Kuchinda | Lahunipara | Laxmipur | M. Rampur | Malkangiri | Mathili | Mayurbhanj | Mohana | Motu | Nabarangapur | Naktideul | Nandapur | Narlaroad | Narsinghpur | Nayagarh | Nimapara | Nowparatan | Nowrangapur | Nuapada | Padampur | Paikamal | Palla Hara | Papadhandi | Parajang | Pardip | Parlakhemundi | Patnagarh | Pattamundai | Phiringia | Phulbani | Puri | Puruna Katak | R. Udayigiri | Rairakhol | Rairangpur | Rajgangpur | Rajkhariar | Rayagada | Rourkela | Sambalpur | Sohela | Sonapur | Soro | Subarnapur | Sunabeda | Sundergarh | Surada | T. Rampur | Talcher | Telkoi | Titlagarh | Tumudibandha | Udala | Umerkote ";
  s_a[27]=" Bahur | Karaikal | Mahe | Pondicherry | Purnankuppam | Valudavur | Villianur | Yanam ";
  s_a[28]=" Abohar | Ajnala | Amritsar | Balachaur | Barnala | Batala | Bathinda | Chandigarh | Dasua | Dinanagar | Faridkot | Fatehgarh Sahib | Fazilka | Ferozepur | Garhashanker | Goindwal | Gurdaspur | Guruharsahai | Hoshiarpur | Jagraon | Jalandhar | Jugial | Kapurthala | Kharar | Kotkapura | Ludhiana | Malaut | Malerkotla | Mansa | Moga | Muktasar | Nabha | Nakodar | Nangal | Nawanshahar | Nawanshahr | Pathankot | Patiala | Patti | Phagwara | Phillaur | Phulmandi | Quadian | Rajpura | Raman | Rayya | Ropar | Rupnagar | Samana | Samrala | Sangrur | Sardulgarh | Sarhind | SAS Nagar | Sultanpur Lodhi | Sunam | Tanda Urmar | Tarn Taran | Zira ";
  s_a[29]=" Abu Road | Ahore | Ajmer | Aklera | Alwar | Amber | Amet | Anupgarh | Asind | Aspur | Atru | Bagidora | Bali | Bamanwas | Banera | Bansur | Banswara | Baran | Bari | Barisadri | Barmer | Baseri | Bassi | Baswa | Bayana | Beawar | Begun | Behror | Bhadra | Bharatpur | Bhilwara | Bhim | Bhinmal | Bikaner | Bilara | Bundi | Chhabra | Chhipaborad | Chirawa | Chittorgarh | Chohtan | Churu | Dantaramgarh | Dausa | Deedwana | Deeg | Degana | Deogarh | Deoli | Desuri | Dhariawad | Dholpur | Digod | Dudu | Dungarpur | Dungla | Fatehpur | Gangapur | Gangdhar | Gerhi | Ghatol | Girwa | Gogunda | Hanumangarh | Hindaun | Hindoli | Hurda | Jahazpur | Jaipur | Jaisalmer | Jalore | Jhalawar | Jhunjhunu | Jodhpur | Kaman | Kapasan | Karauli | Kekri | Keshoraipatan | Khandar | Kherwara | Khetri | Kishanganj | Kishangarh | Kishangarhbas | Kolayat | Kota | Kotputli | Kotra | Kotri | Kumbalgarh | Kushalgarh | Ladnun | Ladpura | Lalsot | Laxmangarh | Lunkaransar | Mahuwa | Malpura | Malvi | Mandal | Mandalgarh | Mandawar | Mangrol | Marwar-Jn | Merta | Nadbai | Nagaur | Nainwa | Nasirabad | Nathdwara | Nawa | Neem Ka Thana | Newai | Nimbahera | Nohar | Nokha | Onli | Osian | Pachpadara | Pachpahar | Padampur | Pali | Parbatsar | Phagi | Phalodi | Pilani | Pindwara | Pipalda | Pirawa | Pokaran | Pratapgarh | Raipur | Raisinghnagar | Rajgarh | Rajsamand | Ramganj Mandi | Ramgarh | Rashmi | Ratangarh | Reodar | Rupbas | Sadulshahar | Sagwara | Sahabad | Salumber | Sanchore | Sangaria | Sangod | Sapotra | Sarada | Sardarshahar | Sarwar | Sawai Madhopur | Shahapura | Sheo | Sheoganj | Shergarh | Sikar | Sirohi | Siwana | Sojat | Sri Dungargarh | Sri Ganganagar | Sri Karanpur | Sri Madhopur | Sujangarh | Taranagar | Thanaghazi | Tibbi | Tijara | Todaraisingh | Tonk | Udaipur | Udaipurwati | Uniayara | Vallabhnagar | Viratnagar ";
  s_a[30]=" Barmiak | Be | Bhurtuk | Chhubakha | Chidam | Chubha | Chumikteng | Dentam | Dikchu | Dzongri | Gangtok | Gauzing | Gyalshing | Hema | Kerung | Lachen | Lachung | Lema | Lingtam | Lungthu | Mangan | Namchi | Namthang | Nanga | Nantang | Naya Bazar | Padamachen | Pakhyong | Pemayangtse | Phensang | Rangli | Rinchingpong | Sakyong | Samdong | Singtam | Siniolchu | Sombari | Soreng | Sosing | Tekhug | Temi | Tsetang | Tsomgo | Tumlong | Yangang | Yumtang ";
  s_a[31]=" Ambasamudram | Anamali | Arakandanallur | Arantangi | Aravakurichi | Ariyalur | Arkonam | Arni | Aruppukottai | Attur | Avanashi | Batlagundu | Bhavani | Chengalpattu | Chengam | Chennai | Chidambaram | Chingleput | Coimbatore | Courtallam | Cuddalore | Cumbum | Denkanikoitah | Devakottai | Dharampuram | Dharmapuri | Dindigul | Erode | Gingee | Gobichettipalayam | Gudalur | Gudiyatham | Harur | Hosur | Jayamkondan | Kallkurichi | Kanchipuram | Kangayam | Kanyakumari | Karaikal | Karaikudi | Karur | Keeranur | Kodaikanal | Kodumudi | Kotagiri | Kovilpatti | Krishnagiri | Kulithalai | Kumbakonam | Kuzhithurai | Madurai | Madurantgam | Manamadurai | Manaparai | Mannargudi | Mayiladuthurai | Mayiladutjurai | Mettupalayam | Metturdam | Mudukulathur | Mulanur | Musiri | Nagapattinam | Nagarcoil | Namakkal | Nanguneri | Natham | Neyveli | Nilgiris | Oddanchatram | Omalpur | Ootacamund | Ooty | Orathanad | Palacode | Palani | Palladum | Papanasam | Paramakudi | Pattukottai | Perambalur | Perundurai | Pollachi | Polur | Pondicherry | Ponnamaravathi | Ponneri | Pudukkottai | Rajapalayam | Ramanathapuram | Rameshwaram | Ranipet | Rasipuram | Salem | Sankagiri | Sankaran | Sathiyamangalam | Sivaganga | Sivakasi | Sriperumpudur | Srivaikundam | Tenkasi | Thanjavur | Theni | Thirumanglam | Thiruraipoondi | Thoothukudi | Thuraiyure | Tindivanam | Tiruchendur | Tiruchengode | Tiruchirappalli | Tirunelvelli | Tirupathur | Tirupur | Tiruttani | Tiruvallur | Tiruvannamalai | Tiruvarur | Tiruvellore | Tiruvettipuram | Trichy | Tuticorin | Udumalpet | Ulundurpet | Usiliampatti | Uthangarai | Valapady | Valliyoor | Vaniyambadi | Vedasandur | Vellore | Velur | Vilathikulam | Villupuram | Virudhachalam | Virudhunagar | Wandiwash | Yercaud ";
  s_a[32]=" Agartala | Ambasa | Bampurbari | Belonia | Dhalai | Dharam Nagar | Kailashahar | Kamal Krishnabari | Khopaiyapara | Khowai | Phuldungsei | Radha Kishore Pur | Tripura ";
  s_a[33]=" Achhnera | Agra | Akbarpur | Aliganj | Aligarh | Allahabad | Ambedkar Nagar | Amethi | Amiliya | Amroha | Anola | Atrauli | Auraiya | Azamgarh | Baberu | Badaun | Baghpat | Bagpat | Baheri | Bahraich | Ballia | Balrampur | Banda | Bansdeeh | Bansgaon | Bansi | Barabanki | Bareilly | Basti | Bhadohi | Bharthana | Bharwari | Bhogaon | Bhognipur | Bidhuna | Bijnore | Bikapur | Bilari | Bilgram | Bilhaur | Bindki | Bisalpur | Bisauli | Biswan | Budaun | Budhana | Bulandshahar | Bulandshahr | Capianganj | Chakia | Chandauli | Charkhari | Chhata | Chhibramau | Chirgaon | Chitrakoot | Chunur | Dadri | Dalmau | Dataganj | Debai | Deoband | Deoria | Derapur | Dhampur | Domariyaganj | Dudhi | Etah | Etawah | Faizabad | Farrukhabad | Fatehpur | Firozabad | Garauth | Garhmukteshwar | Gautam Buddha Nagar | Ghatampur | Ghaziabad | Ghazipur | Ghosi | Gonda | Gorakhpur | Gunnaur | Haidergarh | Hamirpur | Hapur | Hardoi | Harraiya | Hasanganj | Hasanpur | Hathras | Jalalabad | Jalaun | Jalesar | Jansath | Jarar | Jasrana | Jaunpur | Jhansi | Jyotiba Phule Nagar | Kadipur | Kaimganj | Kairana | Kaisarganj | Kalpi | Kannauj | Kanpur | Karchhana | Karhal | Karvi | Kasganj | Kaushambi | Kerakat | Khaga | Khair | Khalilabad | Kheri | Konch | Kumaon | Kunda | Kushinagar | Lalganj | Lalitpur | Lucknow | Machlishahar | Maharajganj | Mahoba | Mainpuri | Malihabad | Mariyahu | Math | Mathura | Mau | Maudaha | Maunathbhanjan | Mauranipur | Mawana | Meerut | Mehraun | Meja | Mirzapur | Misrikh | Modinagar | Mohamdabad | Mohamdi | Moradabad | Musafirkhana | Muzaffarnagar | Nagina | Najibabad | Nakur | Nanpara | Naraini | Naugarh | Nawabganj | Nighasan | Noida | Orai | Padrauna | Pahasu | Patti | Pharenda | Phoolpur | Phulpur | Pilibhit | Pitamberpur | Powayan | Pratapgarh | Puranpur | Purwa | Raibareli | Rampur | Ramsanehi Ghat | Rasara | Rath | Robertsganj | Sadabad | Safipur | Sagri | Saharanpur | Sahaswan | Sahjahanpur | Saidpur | Salempur | Salon | Sambhal | Sandila | Sant Kabir Nagar | Sant Ravidas Nagar | Sardhana | Shahabad | Shahganj | Shahjahanpur | Shikohabad | Shravasti | Siddharthnagar | Sidhauli | Sikandra Rao | Sikandrabad | Sitapur | Siyana | Sonbhadra | Soraon | Sultanpur | Tanda | Tarabganj | Tilhar | Unnao | Utraula | Varanasi | Zamania ";
  s_a[34]=" Almora | Bageshwar | Bhatwari | Chakrata | Chamoli | Champawat | Dehradun | Deoprayag | Dharchula | Dunda | Haldwani | Haridwar | Joshimath | Karan Prayag | Kashipur | Khatima | Kichha | Lansdown | Munsiari | Mussoorie | Nainital | Pantnagar | Partapnagar | Pauri Garhwal | Pithoragarh | Purola | Rajgarh | Ranikhet | Roorkee | Rudraprayag | Tehri Garhwal | Udham Singh Nagar | Ukhimath | Uttarkashi ";
  s_a[35]=" Adra | Alipurduar | Amlagora | Arambagh | Asansol | Balurghat | Bankura | Bardhaman | Basirhat | Berhampur | Bethuadahari | Birbhum | Birpara | Bishanpur | Bolpur | Bongoan | Bulbulchandi | Burdwan | Calcutta | Canning | Champadanga | Contai | Cooch Behar | Daimond Harbour | Dalkhola | Dantan | Darjeeling | Dhaniakhali | Dhuliyan | Dinajpur | Dinhata | Durgapur | Gangajalghati | Gangarampur | Ghatal | Guskara | Habra | Haldia | Harirampur | Harishchandrapur | Hooghly | Howrah | Islampur | Jagatballavpur | Jalpaiguri | Jhalda | Jhargram | Kakdwip | Kalchini | Kalimpong | Kalna | Kandi | Karimpur | Katwa | Kharagpur | Khatra | Krishnanagar | Mal Bazar | Malda | Manbazar | Mathabhanga | Medinipur | Mekhliganj | Mirzapur | Murshidabad | Nadia | Nagarakata | Nalhati | Nayagarh | Parganas | Purulia | Raiganj | Rampur Hat | Ranaghat | Seharabazar | Siliguri | Suri | Takipur | Tamluk";

  function print_state(state_id){
  	// given the id of the <select> tag as function argument, it inserts <option> tags
  	var option_str = document.getElementById(state_id);
  	option_str.length=0;
  	option_str.options[0] = new Option('Select State','');
  	option_str.selectedIndex = 0;
  	for (var i=0; i<state_arr.length; i++) {
  		option_str.options[option_str.length] = new Option(state_arr[i],state_arr[i]);
  	}
  }

  function print_city(city_id, city_index){
  	var option_str = document.getElementById(city_id);
  	option_str.length=0;	// Fixed by Julian Woods
  	option_str.options[0] = new Option('Select City','');
  	option_str.selectedIndex = 0;
  	var city_arr = s_a[city_index].split("|");
  	for (var i=0; i<city_arr.length; i++) {
  		option_str.options[option_str.length] = new Option(city_arr[i],city_arr[i]);
  	}
  }





//_________________________________________________________________________________________________________________
//_____________________________________  HEADER CONTROLLER MODULE  ________________________________________________
//_________________________________________________________________________________________________________________

app.controller('HEADER~CONTROLLER', function($scope,$window,$http,$log,$rootScope) {
  $scope.GST={};
  $scope.GST.rate=0
  let today = new Date().toISOString().substr(0, 10);
  $scope.Today=new Date().getFullYear();
  navigator.getBattery().then(function(battery) {

      var level = battery.level;

      console.log(level*100);
  });



  //****************************************************************************************************************
  //*************************************************** Fetch Owner Name **********************************************
  //****************************************************************************************************************
  //Fetch Owner Name
  Fetch_Owner_Name=function(){
  $http({
  method : "GET",
  url : "/FetchOwnerName.do",
   }).then(function mySuccess(response) {
          document.getElementById("OWNER_NAME").innerHTML=response.data;
   }, function myError(response) {
          console.log("error in fetching Owner Name");
   });
  }
  Fetch_Owner_Name()
  //****************************************************************************************************************
  //************************************************** END Fetch Owner Name  END ***********************************
  //****************************************************************************************************************








//****************************************************************************************************************
//********************************************* DETECT INTERNET ****************************************************
//****************************************************************************************************************
$rootScope.online = navigator.onLine;
$window.addEventListener("offline", function() {
  $rootScope.$apply(function() {
    $rootScope.online = false;
  });
}, false);

$window.addEventListener("online", function() {
  $rootScope.$apply(function() {
    $rootScope.online = true;
  });
}, false);
//****************************************************************************************************************
//**************************************** END DETECT INTERNET END ***********************************************
//****************************************************************************************************************

  //****************************************************************************************************************
  //********************************************* Daily Summary ****************************************************
  //****************************************************************************************************************

  $scope.Daily_Summary_Option_list=['Customer Invoices','Supplier Invoices','Payment Transaction','Stock Transaction','Client Joine','Supplier Joine'];
  $scope.Daily_Summary_Option='Customer Invoices';
  //fetch Daily Summary
  $scope.Fetch_Daily_Summary=function(){
    URL="/FetchDailySummary.do/"+$scope.Daily_Summary_Option;
    $http.post(URL).
      success(function(results) {
        $scope.DailySummaryData=results;
        $scope.DailySummaryDataLength=Object.keys(results).length;
      }).
      error(function(error) {
        $scope.DailySummaryDataLegth=0
        console.log("Errro--> while fetching Daily Summary");
      });
  }
  $scope.Fetch_Daily_Summary()

  //****************************************************************************************************************
  //********************************************* END Daily Summary END *******************************************
  //****************************************************************************************************************


  //****************************************************************************************************************
  //*************************************************** Stock Summary **********************************************
  //****************************************************************************************************************
  //fetch Stock Summary
  Fetch_Stock_Summary=function(){
  $http({
  method : "GET",
  url : "/FetchStockSummary.do",
   }).then(function mySuccess(response) {
        $scope.StockSummary=response.data;
   }, function myError(response) {
          console.log("error in fetching Stock Summary");
   });
  }
  Fetch_Stock_Summary()
  //****************************************************************************************************************
  //************************************************** END Stock Summary END ***************************************
  //****************************************************************************************************************

  //***********************************************************************************************************
  //----------------------------------------------- FOR BUSINESS BOOK ----------------------------------------
  //***********************************************************************************************************
  $scope.Total_Inflow=0;
  $scope.Total_Outflow=0;
  $scope.Net_Flow=0;


  var ourDate = new Date();

  console.log(ourDate);

  $scope.SearchBusinessBook=function(DATE_OPTION) {
  var DATES={};
  var ourDate = new Date();
  if(DATE_OPTION=="Custome"){
    DATES["StartDate"]=$scope.StartDate;
    DATES["EndDate"]=$scope.EndDate
  }else if(DATE_OPTION=="Today"){
    DATES["StartDate"]=new Date(today);
    DATES["EndDate"]=new Date(today);
    $scope.StartDate=new Date(today);
    $scope.EndDate=new Date(today);
  }else if(DATE_OPTION=="Yesterday"){
    var pastDate = ourDate.getDate() - 1;
    ourDate.setDate(pastDate);
    DATES["StartDate"]=ourDate;
    DATES["EndDate"]=new Date(today);
    $scope.StartDate=ourDate;
    $scope.EndDate=new Date(today);
  }else if(DATE_OPTION=="SevenDayBack"){
    var pastDate = ourDate.getDate() - 6;
    ourDate.setDate(pastDate);
    DATES["StartDate"]=ourDate;
    DATES["EndDate"]=new Date(today);
    $scope.StartDate=ourDate;
    $scope.EndDate=new Date(today);
  }else if(DATE_OPTION=="ThirtyDayBack"){
    var pastDate = ourDate.getDate() - 29;
    ourDate.setDate(pastDate);
    DATES["StartDate"]=ourDate;
    DATES["EndDate"]=new Date(today);
    $scope.StartDate=ourDate;
    $scope.EndDate=new Date(today);
  }


  if($scope.SearchBusinessBookValidation(DATES)){
    $http.post("/SearchBusinessBookData.do",DATES).
    success(function(results) {
      $scope.Total_Inflow=0;
      $scope.Total_Outflow=0;
      $scope.Net_Flow=0;

      $scope.BussinessBookData=results;
      $scope.BusinessBookDataLength=Object.keys(results).length;


      for (let value of Object.values(results)) {
        if(value.Type=='credit'){
          $scope.Total_Inflow=$scope.Total_Inflow+value.AmountPaid;
        }
        else{
          $scope.Total_Outflow=$scope.Total_Outflow+value.AmountPaid;
        }
      }
      $scope.Net_Flow=$scope.Total_Inflow+$scope.Total_Outflow;
    }).
    error(function(error) {
       console.log("ADD PAYMENT **SearchBusinessBook** -----> Error",error);
       Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while searching records with given dates.Please try again .If issue  persists , please contact service provider.','Try Again');
    });
  }
  }

  $scope.SearchBusinessBookValidation=function(DATES) {
    if(typeof DATES.StartDate  === 'undefined' ){
          Notiflix.Confirm.Show('Oops !','Please select starting date.','Try Again');
          return false;
    }
    if(typeof DATES.EndDate  === 'undefined' ){
          Notiflix.Confirm.Show('Oops !','Please select ending date.','Try Again');
          return false;
    }
   return true;
  }

  //***********************************************************************************************************
  //------------------------------------------- END FOR BUSINESS BOOK END -------------------------------------
  //***********************************************************************************************************

  //***********************************************************************************************************
  //========================================== GST Calculator =================================================
  //***********************************************************************************************************
          $scope.GST_Calculator = function(GST) {
            if(GST.amount>0 && GST.option==0 ){
                var GSTAmount =(GST.amount*(GST.rate*0.01)) ;
                $scope.GST.GSTAmount= parseFloat(GSTAmount.toFixed(2));
                $scope.GST.Net_Amount= GST.amount + GST.GSTAmount;
            }
            else{
              $scope.GST.Net_Amount=0;
              $scope.GST.GSTAmount=0;

            }
          };

  //***********************************************************************************************************
  //========================================= ~~ END GST Calculator END ~~ =====================================
  //***********************************************************************************************************



  //***********************************************************************************************************
  //============================================ NOTIFICATION TAB ===========================================
  //***********************************************************************************************************
  //fetch all notification
  Fetch_Notification=function(){
  $http({
  method : "GET",
  url : "/Fetch_All_Notification.do",
   }).then(function mySuccess(response) {
        $scope.Notifications=response.data;
        $scope.NotificationsLength=Object.keys(response.data).length;
   }, function myError(response) {
          console.log("error in fetching notification");
   });
  }
  Fetch_Notification()
  //***********************************************************************************************************
  //==================================== END NOTIFICATION TAB END ===========================================
  //***********************************************************************************************************

  //***********************************************************************************************************
  //----------------------------------------------- SHUT DOWN SERVER ------------------------------------------
  //***********************************************************************************************************

  //fetch Low Stock , Out of stock
  $scope.shutdownServer=function(){
  $http({
  method : "GET",
  url : "/shutdown.do",
   }).then(function mySuccess(response) {
          console.log("Shut Down Server Done");
   }, function myError(response) {
          console.log("error in Shut Down Server ");
   });
  }
  //***********************************************************************************************************
  //------------------------------------------- END SHUT DOWN SERVER END -------------------------------------
  //***********************************************************************************************************





});
//_________________________________________________________________________________________________________________
//_______________________________ END  HEADER CONTROLLER MODULE END _______________________________________________
//_________________________________________________________________________________________________________________











//_________________________________________________________________________________________________________________
//_____________________________________  HOME CONTROLLER MODULE  ________________________________________________
//_________________________________________________________________________________________________________________


app.controller('INDEX~CONTROLLER' , function($scope,$window,$http,$log) {

  let today = new Date().toISOString().substr(0, 10);
  $scope.Today=new Date().getFullYear();



//***********************************************************************************************************
//============================================ SUBMIT CLIENT FORM ===========================================
//***********************************************************************************************************
$('#client_CN').keyup(function () {
  this.value = this.value.replace(/[^0-9\.]/g,'');
});

document.getElementById('client_PC').addEventListener('input', function (e) {
e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
});
$scope.client={};
$scope.SubmitClientForm = function(client) {
if($scope.Client_Validation(client)){
  $http.post('/AddClient.do',client).
    success(function(results) {
      if(results=="Success"){
      $scope.client={};
      $('#add_client_model').modal('hide');
      document.getElementById("Submit_Client_Form").reset();
      Notiflix.Report.Success('Successfully Done !','Hey user, New client has been successfully added and joined with us , you can see and manage client through CLIENT DASHBOARD .','Done');
    }else{
        $('#add_client_model').modal('show');
        Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding client information  . Please try again with validation . If problem persist please contact service provider .','Try Again');
    }
    }).
    error(function(error) {
      $('#add_client_model').modal('show');
      Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding client information  . Please try again with validation . If problem persist please contact service provider .','Try Again');
    });
    }
  };


  $scope.Client_Validation=function(client){
   if(typeof client.FN === 'undefined' || client.FN === '' ){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter First Name. ','Try Again');
         return false;
   }
   if(typeof client.LN === 'undefined' || client.LN === '' ){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter Last Name. ','Try Again');
         return false;
   }
   if(typeof client.address === 'undefined' || client.address === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select client Full Billing Address. ','Try Again');
         return false;
   }
   if(typeof client.state === 'undefined' || client.state === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select State of client.','Try Again');
         return false;
   }
   if(typeof client.city === 'undefined' || client.city === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select city of client.','Try Again');
         return false;
   }
   if(typeof client.pincode === 'undefined' || client.pincode === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the client Pincode .','Try Again');
         return false;
   }
   if(typeof client.contactNumber === 'undefined' || client.contactNumber === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the client contact number.','Try Again');
         return false;
   }
  return true;
  }

//***********************************************************************************************************
//==================================== END SUBMIT CLIENT FORM END ===========================================
//***********************************************************************************************************



//***********************************************************************************************************
//============================================ SUBMIT SUPPLIER FORM ===========================================
//***********************************************************************************************************
$('#supplier_CN').keyup(function () {
  this.value = this.value.replace(/[^0-9\.]/g,'');
});

document.getElementById('supplier_PC').addEventListener('input', function (e) {
e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
});
$scope.supplier={};
  //Submit Supplier form
  $scope.SubmitSupplierForm = function(supplier) {
    if($scope.Supplier_Validation(supplier)){
    $http.post('/AddSupplier.do',supplier).
    success(function(results) {
      if(results=="Success"){
      $scope.supplier={};
      $('#add_supplier_model').modal('hide');
      document.getElementById("Submit_Supplier_Form").reset();
      Notiflix.Report.Success('Successfully Done !','Hey user, New supplier is successfully added and joined with us , you can see and manage supplier through SUPPLIER DASHBOARD .','Done');
    }else{
        $('#add_supplier_model').modal('show');
        Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding supplier information  . Please try again with validation . If problem persist  please contact service provider .','Try Again');
    }
    }).
    error(function(error) {
      $('#add_supplier_model').modal('show');
      Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding supplier information  . Please try again with validation . If problem persist please contact service provider .','Try Again');
    });
  };
}

  $scope.Supplier_Validation=function(supplier){
   if(typeof supplier.FN === 'undefined' || supplier.FN === '' ){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter First Name. ','Try Again');
         return false;
   }
   if(typeof supplier.LN === 'undefined' || supplier.LN === '' ){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter Last Name. ','Try Again');
         return false;
   }
   if(typeof supplier.address === 'undefined' || supplier.address === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select supplier Full Billing Address. ','Try Again');
         return false;
   }
   if(typeof supplier.state === 'undefined' || supplier.state === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select State of supplier.','Try Again');
         return false;
   }
   if(typeof supplier.city === 'undefined' || supplier.city === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select city of supplier.','Try Again');
         return false;
   }
   if(typeof supplier.pincode === 'undefined' || supplier.pincode === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the supplier Pincode .','Try Again');
         return false;
   }
   if(typeof supplier.contactNumber === 'undefined' || supplier.contactNumber === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the supplier contact number.','Try Again');
         return false;
   }
  return true;
  }


//***********************************************************************************************************
//==================================== END SUBMIT SUPPLIER FORM END ===========================================
//***********************************************************************************************************


//***********************************************************************************************************
//--------------------------------------------- EXPENSE ----------------------------------------------------
//***********************************************************************************************************
$scope.Expense={};
$scope.Expense.ExpenseDate=new Date(today);

$scope.Expense_Validation = function(Expense){
     if(typeof Expense.ExpenseDate === 'undefined' || Expense.ExpenseDate === '' || Expense.ExpenseDate === null){
        Notiflix.Confirm.Show('Oops !','Hey user ,Please Enter Expense Date.','Try Again');
       return false;
      }
      if(typeof Expense.ExpenseAmount === 'undefined' || Expense.ExpenseAmount === '' || Expense.ExpenseAmount === null){
         Notiflix.Confirm.Show('Oops !','Hey user ,Please Enter Expense Amount.','Try Again');
        return false;
       }
       if(typeof Expense.PaidTo === 'undefined' || Expense.PaidTo === '' || Expense.PaidTo === null){
          Notiflix.Confirm.Show('Oops !','Hey user ,Please Enter name for whom you paid.','Try Again');
         return false;
        }
     return true;
}

$scope.Submit_Expense = function(Expense) {
if($scope.Expense_Validation(Expense)){
  $http.post('/AddExpense.do',Expense).
    success(function(results) {
      if(results=="Success"){
      Notiflix.Report.Success('Successfully Add !','Hey user, Expense has been successfully added in system.Please checkout Expense Dashboard. ','Done');
      $('#add_expense_model').modal('hide');
      document.getElementById("Expense").reset();
    }else{
      Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding Expense. Please try again with validation .If issue persists , please contact service provider ','Try Again');
    }
    }).
    error(function(error) {
      Notiflix.Report.Failure('Oops ! Failed .','Hey user, Software facing some issue while adding Expense. Please try again with validation .If issue persists , please contact service provider ','Try Again');
    });
  };
};

//***********************************************************************************************************
//--------------------------------------------- END EXPENSE END ---------------------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//----------------------------------------------- NEW JOINE -------------------------------------------------
//***********************************************************************************************************
//fetch New Joine
Fetch_New_Joine=function(){
$http({
method : "GET",
url : "/NewClientJoin.do",
 }).then(function mySuccess(response) {
    document.getElementById("NewJoine").innerHTML=response.data;
      $scope.NewJoine=response.data;
 }, function myError(response) {
        console.log("error in fetching New Joine");
 });
}
Fetch_New_Joine()
//***********************************************************************************************************
//-----------------------------------------------END NEW JOINE END------------------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//----------------------------------------------- NEW INVOICES ----------------------------------------------
//***********************************************************************************************************
//fetch New Invoices count
Fetch_New_Invoices=function(){
$http({
method : "GET",
url : "/NewInvoiceCount.do",
 }).then(function mySuccess(response) {
    document.getElementById("NewInvoiceCount").innerHTML=response.data;
      $scope.NewInvoiceCount=response.data;
 }, function myError(response) {
        console.log("error in fetching New Invoices count");
 });
}
Fetch_New_Invoices()
//***********************************************************************************************************
//---------------------------------------- END NEW INVOICES END ---------------------------------------------
//***********************************************************************************************************


//***********************************************************************************************************
//----------------------------------------------- NEW PURCHASE ----------------------------------------------
//***********************************************************************************************************
//fetch New Purchase count
Fetch_New_Purchase=function(){
$http({
method : "GET",
url : "/NewPurchaseCount.do",
 }).then(function mySuccess(response) {
    document.getElementById("NewPurchaseCount").innerHTML=response.data;
    $scope.NewPurchaseCount=response.data;
 }, function myError(response) {
        console.log("error in fetching New Purchase count");
 });
}
Fetch_New_Purchase()
//***********************************************************************************************************
//----------------------------------------------- END NEW PURCHASE END --------------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//------------------------------------------------  NEW QUOTATION  -----------------------------------------
//***********************************************************************************************************
//fetch New Quotation count
Fetch_New_Quotation=function(){
$http({
method : "GET",
url : "/NewQuotationCount.do",
 }).then(function mySuccess(response) {
    document.getElementById("NewQuotationCount").innerHTML=response.data;
      $scope.NewQuotationCount=response.data;
 }, function myError(response) {
        console.log("error in fetching New Quotation count");
 });
}
Fetch_New_Quotation()
//***********************************************************************************************************
//----------------------------------------------- END NEW QUOTATION END --------------------------------------
//***********************************************************************************************************


//***********************************************************************************************************
//----------------------------------------------- UNPAID INVOICE COUNT  --------------------------------------
//***********************************************************************************************************
//fetch Unpaid Invoices Count
Fetch_Unpaid_Invoices_Count=function(){
$http({
method : "GET",
url : "/TotalUnpaidInvoicesCount.do",
 }).then(function mySuccess(response) {
     document.getElementById("Unpaid_Invoices_Count").innerHTML=response.data;

 }, function myError(response) {
        console.log("error in fetching Unpaid Invoices Count");
 });
}
Fetch_Unpaid_Invoices_Count()
//***********************************************************************************************************
//----------------------------------------------- END NEW UNPAID INVOICE END -------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//----------------------------------------------- UNPAID INVOICE COUNT --------------------------------------
//***********************************************************************************************************
//fetch Unpaid Purchase Count
Fetch_Unpaid_Purchase_Count=function(){
$http({
method : "GET",
url : "/TotalUnpaidPurchaseCount.do",
 }).then(function mySuccess(response) {
   document.getElementById("Unpaid_Purchase_Count").innerHTML=response.data;
 }, function myError(response) {
        console.log("error in fetching Unpaid Purchase Count");
 });
}
Fetch_Unpaid_Purchase_Count()
//***********************************************************************************************************
//------------------------------------------- END UNPAID INVOICE COUNT END ---------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//------------------------------------------- LOW / OUT OF STOCK COUNT --------------------------------------
//***********************************************************************************************************
//fetch Low Stock , Out of stock
Fetch_Low_Stock_Out_of_STock=function(){
$http({
method : "GET",
url : "/FetchLowStockOutofSTock.do",
 }).then(function mySuccess(response) {
   document.getElementById("Low_Stock_Item").innerHTML=response.data.LOW_STOCK_ITEM;
   document.getElementById("Out_Of_Stock").innerHTML=response.data.OUT_OF_STOCK;
 }, function myError(response) {
        console.log("error in fetch Low Stock , Out of stock");
 });
}
Fetch_Low_Stock_Out_of_STock()
//***********************************************************************************************************
//-------------------------------------------END  LOW / OUT OF STOCK COUNT END ------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//------------------------------------------- QUICK INFORMATION ---------------------------------------------
//***********************************************************************************************************

//fetch Quick Information
Fetch_Quick_Information=function(){
$http({
method : "GET",
url : "/FetchQuickInformation.do",
 }).then(function mySuccess(response) {
    $scope.QuickInfo=response.data;
 }, function myError(response) {
        console.log("error in fetching Quick Information");
 });
}
Fetch_Quick_Information()

//***********************************************************************************************************
//------------------------------------- END QUICK INFORMATION END -------------------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//--------------------------------------------   QUICK SEARCH   ---------------------------------------------
//***********************************************************************************************************

CloseQuickInfoPopover=function(){
    $("#SearchClient").popover("hide");
      $("#SearchSupplier").popover("hide");
}

Fetch_Client_Name_List=function(){
$scope.ClientList=[];
$http({
method : "GET",
url : "/FetchClientDetails.do",
 }).then(function mySuccess(response) {
    $scope.ClientData=response.data;
    for (let value of Object.values($scope.ClientData)) {
     $scope.ClientList.push(value.Client_Name);
      }
 }, function myError(response) {
        console.log("error in fetching client list");
 });
}

Fetch_Client_Name_List();

//fetch supplier data
Fetch_Supplier_Name_List=function(){
  $scope.SupplierList=[];
  $http({
  method : "GET",
  url : "/FetchSupplierNameList.do",
   }).then(function mySuccess(response) {
     $scope.SupplierData = response.data;
     for (var key in $scope.SupplierData) {
          $scope.SupplierList.push($scope.SupplierData[key].Supplier_Name);
          }
   }, function myError(response) {
     console.log("error in fetching supplier list");
   });
 }
 Fetch_Supplier_Name_List();


$scope.SetAutosuggestion = function(QuickSearch) {
  if(QuickSearch.Option=="Client"){
     $scope.QuickSearch.QuickSearchInput="";
  }else if(QuickSearch.Option=="Supplier"){
     $scope.QuickSearch.QuickSearchInput="";
  }else if(QuickSearch.Option=="Purchase Order" || QuickSearch.Option=="Invoice"){
     $scope.QuickSearch.QuickSearchInput="";
  }else{

  }
}

$scope.QuickSearchButton = function(QuickSearch) {
Notiflix.Loading.Pulse('Searching please wait ...');

var isFound=false;
var SearchField=$("#QuickSearchInput").val();

if(SearchField !== '' && typeof QuickSearch.Option !== 'undefined'){

if(QuickSearch.Option=="Client"){

  URL="/FetchSearchedClientData.do/"+SearchField
  $http({
  method : "GET",
  url : URL,
   }).then(function mySuccess(response) {
      $scope.ClientData = response.data;
          if((Object.keys($scope.ClientData ).length)>0){
                for (let value of Object.values($scope.ClientData)) {
                  $("#Searched_Client_FN").attr("placeholder",value.Client_Name);
                  $("#Searched_Client_ID").attr("placeholder",value.Client_ID);
                  $("#Searched_Client_Address").attr("placeholder",value.Client_Address+','+value.Client_City+','+value.Client_State+'.'+value.Client_pincode);
                  $("#Searched_Client_Contact_NO").attr("placeholder",value.Client_contact_no);
                  $("#Searched_Client_Email").attr("placeholder",value.Client_Email);
                  $("#Searched_Client_PAN").attr("placeholder",value.Client_PAN_no);
                  $("#Searched_Client_GSTIN").attr("placeholder",value.Client_GSTIN_no);
                  $("#SearchClient").popover("show");
                  Notiflix.Loading.Remove();
              }
        }else{
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure('Oops ! Client not found .');
          }
   }, function myError(response) {
     Notiflix.Loading.Remove();
     Notiflix.Notify.Failure('Oops ! Client not found .');
   });


}else if(QuickSearch.Option=="Supplier"){

  URL="/FetchSearchedSupplierData.do/"+SearchField
  $http({
  method : "GET",
  url : URL,
   }).then(function mySuccess(response) {
      $scope.SupplierData = response.data;
          if((Object.keys($scope.SupplierData ).length)>0){
                for (let value of Object.values($scope.SupplierData)) {
                  $("#Searched_Supplier_FN").attr("placeholder",value.Supplier_Name);
                  $("#Searched_Supplier_ID").attr("placeholder",value.ID);
                  $("#Searched_Supplier_Address").attr("placeholder",value.FullAddress);
                  $("#Searched_Supplier_Contact_NO").attr("placeholder",value.Contact_No);
                  $("#Searched_Supplier_Email").attr("placeholder",value.Email);
                  $("#Searched_Supplier_PAN").attr("placeholder",value.PanNo);
                  $("#Searched_Supplier_GSTIN").attr("placeholder",value.GSTIN);
                  $("#SearchSupplier").popover("show");
                  Notiflix.Loading.Remove();
              }
        }else{
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure('Oops ! Supplier not found .');
          }
   }, function myError(response) {
     Notiflix.Loading.Remove();
  Notiflix.Notify.Failure('Oops ! Supplier not found .');
   });


}else if(QuickSearch.Option=="Purchase Order" || QuickSearch.Option=="Invoice" ){
  URL="/Search_Purchase_Order_OR_Invoice.do/"+QuickSearch.Option+"/"+SearchField
  $http.post(URL).
    success(function(results) {
      if(QuickSearch.Option=="Purchase Order"){
        if(results.isSuccess=="true" &&  results.isFound=="true"){
          Notiflix.Loading.Remove();
          let PO= SearchField.match(/\d+/)
          URL="/Display_Bill_For_Purchase.do/"+PO+"/old";     //SearchField : Purchase Order
          $window.location.href = URL;
       }else{
          Notiflix.Loading.Remove();
          Notiflix.Notify.Failure('Oops! Purchase Not Found.');
       }
      }

      if(QuickSearch.Option=="Invoice"){
        if(results.isSuccess=="true" && results.isFound=="true"){
        Notiflix.Loading.Remove();
         URL="/Display_Bill_For_Invoice.do/"+SearchField+"/old";     //SearchField : Invoice ID
         $window.location.href = URL;
       }else{
          Notiflix.Loading.Remove();
          Notiflix.Notify.Failure('Oops! Invoice Not Found.');
       }
      }

    }).
    error(function(error) {
      Notiflix.Loading.Remove();
      Notiflix.Notify.Failure('Error occurred');
    });
  }
}else{  Notiflix.Loading.Remove(); Notiflix.Confirm.Show('Oops !','Please select quick search category.','Try Again');}
};

//***********************************************************************************************************
//-------------------------------------------- END   QUICK SEARCH  END  -------------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//---------------------------------------------- ADD PAYMENT  ----------------------------------------------
//***********************************************************************************************************


Close_Add_Payment_Template = function (){
  $("#Add_Payment_Button").popover("hide");

   $("#For_Client_Button").popover("hide");
   $("#For_Client_Button__NORMAL").popover("hide");
   $("#Client_Payment_Button_Normal").popover("hide");
   $("#For_Client_Button__EMI").popover("hide");
   $("#Client_Payment_Button_EMI").popover("hide");

   $("#For_Supplier_Button").popover("hide");
   $("#Supplier_Payment_Button").popover("hide");
}

//==========================================================================================================================================================================
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FOR CLIENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//fetch All client name and id whoes payment is pending
Fetch_Unpaid_Client_List=function(){
$http({
method : "GET",
url : "/Fetch_Unpaid_Client_List.do",
 }).then(function mySuccess(response) {
    $scope.Unpaid_Client_List=response.data;
 }, function myError(response) {
        console.log("error in fetching Fetch_Unpaid_Client_List");
 });
}
Fetch_Unpaid_Client_List()


Fetch_Unpaid_Client_List_For_EMI=function(){
$http({
method : "GET",
url : "/Fetch_Unpaid_Client_List_EMI.do",
 }).then(function mySuccess(response) {
    $scope.Unpaid_EMI_Client_List=response.data;
 }, function myError(response) {
        console.log("error in fetching Fetch_Unpaid_Client_List_EMI");
 });
}
Fetch_Unpaid_Client_List_For_EMI()

OpenForClient = function(){
     $("#Add_Payment_Button").popover("hide");
      $("#For_Client_Button").popover("show");
}

OpenForClient__NORMAL = function(){
      $("#Add_Payment_Button").popover("hide");
      $("#For_Client_Button").popover("hide");
      $("#For_Client_Button__NORMAL").popover("show");

}

Unpaid_Client_Select = function(){
     $("#For_Client_Button__NORMAL").popover("hide");

      $scope.Selected_Unpaid_Client_ID = $(".popover #Client_Select").val();

      for (let value of Object.values($scope.Unpaid_Client_List)) {
        if($scope.Selected_Unpaid_Client_ID==value.INVOICE_ID){

          $scope.Selected_Unpaid_Client_Total_Amount=value.TOTAL_AMOUNT;
          $scope.Selected_Unpaid_Client_Balance_Amount =value.BALANCE_AMOUNT;
          $scope.BALANCE_AMOUNT=value.BALANCE_AMOUNT;

          $("#Unpaid_Client_Purchase_Order").attr("placeholder",$scope.Selected_Unpaid_Client_ID);
          $("#Unpaid_Client_Name").attr("placeholder",value.CLIENT_NAME);
          $("#Unpaid_Client_Total_Amount").attr("placeholder","₹ "+ value.TOTAL_AMOUNT);
          $("#Unpaid_Client_Balance_Amount").attr("placeholder","₹ "+ value.BALANCE_AMOUNT);
           $("#Client_Payment_Button_Normal").popover("show");
           break;
        }
      }
};

PayToUnpaidClient = function(){

  Payment={};
  Payment["TotalAmount"]=$scope.Selected_Unpaid_Client_Total_Amount;
  Payment["Amount_Paid"]=$(".popover  #Unpaid_Client_Name_Amount_To_Be_Paid").val();
  Payment["payment_mode"]=$(".popover #Unpaid_Client_Payment_Mode").val();
  Payment["Remark"]="NA"
  Payment["Paid_on"]=new Date(today)

    URL="/ADD_PAYMENT_FOR_INVOICE.do/"+$scope.Selected_Unpaid_Client_ID;
    if($scope.PAYMENT_VALIDATION(Payment)){
    $http.post(URL,Payment).
    success(function(results) {
      if(results=="Success"){
        Fetch_Unpaid_Client_List();
        Fetch_Unpaid_Invoices_Count();
        $("#Client_Payment_Button_Normal").popover("hide");
        Notiflix.Report.Success('Successfully Done ! ','Hey user, Payment has been successfully paid . ','Okey');
      }else{
        Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding payment for current invoice.Please try again .If issue persists , please contact service provider.','Try Again');
      }
    }).
    error(function(error) {
       console.log("ADD PAYMENT **PayToUnpaidClient** -----> Error",error);
       Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding payment for current invoice.Please try again .If issue persists , please contact service provider.','Try Again');
    });
  }

}



OpenForClient__EMI = function(){
     $("#Add_Payment_Button").popover("hide");
      $("#For_Client_Button").popover("hide");
      $("#For_Client_Button__EMI").popover("show");
}

Unpaid_Client_Select_For_EMI = function(){
     $("#For_Client_Button__EMI").popover("hide");
      $scope.Selected_Unpaid_EMI_Client_ID = $(".popover #Client_Select_For_Unpaid_EMI").val();

      //Fetch emi infor for selecetd client
      URL="/FETCH_SELECTED_UNPAID_EMI_INFO.do/"+$scope.Selected_Unpaid_EMI_Client_ID
      //Fetch Select client emi information
      $http.post(URL).
      success(function(results) {
           $scope.Selected_UnPaidEMI_Information=results;
           $("#Unpaid_EMI_Client_Invoice_ID").attr("placeholder",results.INVOICE_ID);
           $("#Unpaid_EMI_Client_Name").attr("placeholder",results.CLIENT_NAME);
           $("#Unpaid_EMI_Prev_Paid_Date").attr("placeholder",results.PREVIOUS_PAYMENT_DATE);
           $("#Unpaid_EMI_Client_EMI_Amount").attr("placeholder","₹ "+ results.EMI_AMOUNT);
           $("#Client_Payment_Button_EMI").popover("show");
      }).
      error(function(error) {
         console.log("ADD PAYMENT **FETCH_SELECTED_UNPAID_EMI_INFO** -----> Error",error);
      });
};

PayToUnpaidEMIClient = function(){
  URL="/ADD_Payment_For_Invoice_EMI.do/"+$scope.Selected_UnPaidEMI_Information.EMI_ID;
  var Payment={};
  Payment.Invoice_NO= $scope.Selected_UnPaidEMI_Information.INVOICE_ID;
  Payment.Paid_on= new Date(today)
  Payment.EMI_Amount=$scope.Selected_UnPaidEMI_Information.EMI_AMOUNT;
  Payment.payment_mode=$(".popover #Unpaid_EMI_Client_Payment_Mode").val();

if(typeof $(".popover #Unpaid_EMI_Client_Remarks").val() === 'undefined' || $(".popover #Unpaid_EMI_Client_Remarks").val() ==='' || $(".popover #Unpaid_EMI_Client_Remarks").val() === null){
  Payment.Remark="Successfully paid EMI for Month "+$scope.Selected_UnPaidEMI_Information.EMI_MONTH;
}else{
    Payment.Remark=$(".popover #Unpaid_EMI_Client_Remarks").val();
}


  if($scope.PAYMENT_VALIDATION_FOR_EMI(Payment)){
    $http.post(URL,Payment).
    success(function(results) {
      if(results.isInvoiceCreated=='true'){
        if(results.isEMITableUpdate=='true'){
          if(results.isInvoiceBillTableUpdate=='true'){
                Fetch_Unpaid_Client_List();
                Fetch_Unpaid_Invoices_Count();
                Fetch_Unpaid_Client_List_For_EMI()
                $("#Client_Payment_Button_EMI").popover("hide");
                Notiflix.Report.Success('Successfully Done ! ','Hey user, EMI Payment has been successfully paid . ','Okey');
          }else{
             Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while Updating EMI Information.Please try again.If issue persists , please contact service provider.','Try Again');
          }
        }else{
           Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while Updating EMI Information.Please try again.If issue persists , please contact service provider.','Try Again');
          }
     }else{
       Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while creating invoice.Please try again.If issue persists , please contact service provider.','Try Again');
     }
    }).
    error(function(error) {
       console.log("PayToUnpaidEMIClient----> Error",error);
       Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding EMI payment for current invoice.Please try again .If issue persists , please contact service provider.','Try Again');
    });
  }
}

$scope.PAYMENT_VALIDATION_FOR_EMI=function(Payment) {
  if(typeof Payment.payment_mode  === 'undefined' || Payment.payment_mode === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter mode of payment','Try Again');
        return false;
  }
  if(typeof Payment.EMI_Amount === 'undefined' || Payment.EMI_Amount == 0 || Payment.EMI_Amount == null){
        Notiflix.Confirm.Show('Oops !','Please enter amount to be paid , It should not be empty or 0 ','Try Again');
        return false;
  }
  if(typeof Payment.Paid_on  === 'undefined' || Payment.Paid_on === '' ){
        Notiflix.Confirm.Show('Oops !','System is facing issue while fetching current date','Try Again');
        return false;
  }
 return true;
}

//==========================================================================================================================================================================


//==========================================================================================================================================================================
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FOR SUPPLIER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//fetch All supplier name and id whoes payment is pending
Fetch_Unpaid_Supplier_List=function(){
$http({
method : "GET",
url : "/Fetch_Unpaid_Supplier_List.do",
 }).then(function mySuccess(response) {
    $scope.Unpaid_Supplier_List=response.data;
 }, function myError(response) {
        console.log("error in fetching Fetch_Unpaid_Supplier_List");
 });
}
Fetch_Unpaid_Supplier_List()


OpenForSupplier = function(){
  $("#Add_Payment_Button").popover("hide");
   $("#For_Supplier_Button").popover("show");
}


Unpaid_Supplier_Select = function(){
     $("#For_Supplier_Button").popover("hide");

      $scope.Selected_Unpaid_Supplier_ID = $(".popover #Supplier_Select").val();

      for (let value of Object.values($scope.Unpaid_Supplier_List)) {
        if($scope.Selected_Unpaid_Supplier_ID==value.PURCHASE_ID){

          $scope.Selected_Unpaid_Supplier_Total_Amount=value.TOTAL_AMOUNT;
          $scope.Selected_Unpaid_Supplier_Balance_Amount =value.BALANCE_AMOUNT;
          $scope.BALANCE_AMOUNT=value.BALANCE_AMOUNT;

          $("#Unpaid_Supplier_Purchase_Order").attr("placeholder","PO"+$scope.Selected_Unpaid_Supplier_ID);
          $("#Unpaid_Supplier_Name").attr("placeholder",value.SUPPLIER_NAME);
          $("#Unpaid_Supplier_Total_Amount").attr("placeholder","₹ "+ value.TOTAL_AMOUNT);
          $("#Unpaid_Supplier_Balance_Amount").attr("placeholder","₹ "+ value.BALANCE_AMOUNT);
           $("#Supplier_Payment_Button").popover("show");
           break;
        }
      }
};


PayToUnpaidSupplier = function(){

  Payment={};
  Payment["TotalAmount"]=$scope.Selected_Unpaid_Supplier_Total_Amount;
  Payment["Amount_Paid"]=$(".popover  #Unpaid_Supplier_Name_Amount_To_Be_Paid").val();
  Payment["payment_mode"]=$(".popover #Unpaid_Supplier_Payment_Mode").val();
  Payment["Remark"]="NA"
  Payment["Paid_on"]=new Date(today)

  URL="/ADD_PAYMENT_FOR_PURCHASE.do/"+$scope.Selected_Unpaid_Supplier_ID;

  if($scope.PAYMENT_VALIDATION(Payment)){
    $http.post(URL,Payment).
    success(function(results) {
      if(results=="Success"){
        Fetch_Unpaid_Supplier_List();
        Fetch_Unpaid_Purchase_Count();
        $("#Supplier_Payment_Button").popover("hide");
        Notiflix.Report.Success('Successfully Done ! ','Hey user, Payment has been successfully paid . ','Okey');
      }else{
        Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding payment for current purchase order.Please try again .If issue persists , please contact service provider.','Try Again');
      }
    }).
    error(function(error) {
       console.log("ADD PAYMENT **PayToUnpaidSupplier** -----> Error",error);
       Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adding payment for current purchase order.Please try again .If issue  persists , please contact service provider.','Try Again');
    });
  }

}

//==========================================================================================================================================================================

$scope.PAYMENT_VALIDATION=function(Payment) {
  if(typeof Payment.Amount_Paid === 'undefined' || Payment.Amount_Paid === '' || Payment.Amount_Paid ==0 || Payment.Amount_Paid == null){
        Notiflix.Confirm.Show('Oops !','Please enter amount to be paid , It should not be empty or 0 ','Try Again');
        return false;
  }
  if(Payment.Amount_Paid>$scope.BALANCE_AMOUNT){
      mesg='Total paid amount should not exceed total bill amount ₹'+Payment.TotalAmount+' .';
      Notiflix.Confirm.Show('Oops !',mesg,'Try Again');
      return false;
    }
  if(typeof Payment.Paid_on  === 'undefined' || Payment.Paid_on === '' ){
        Notiflix.Confirm.Show('Oops !','System is not able to fetch current date','Try Again');
        return false;
  }
  if(typeof Payment.payment_mode  === 'undefined' || Payment.payment_mode === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter mode of payment','Try Again');
        return false;
  }
 return true;
}
//***********************************************************************************************************
//---------------------------------------- END ADD PAYMENT END ----------------------------------------------
//***********************************************************************************************************

//***********************************************************************************************************
//------------------------------------------ CASH ADJUSTMENT ------------------------------------------------
//***********************************************************************************************************
CloseCashAdjustment = function(){
     $("#CashAdjustment").popover("hide");
}

SubmitCashAdjustment = function(){

  DATA={};

  DATA["Cash_Adjustment_Type"]=$(".popover  #CashAdjustmenttype:checked").val();
  DATA["Cash_Adjustment_Date"]=$(".popover #CashAdjustmentDate").val();
  DATA["Total_Amount_Paid"]=$(".popover #CashAdjustmentAmount").val();
  DATA["Payment_Mode"]=$(".popover #CashAdjustmentDatePM").val();
  DATA["Remark"]=$(".popover #CashAdjustmentDateRemarks").val();

  URL="/ADD_CASH_ADJUSTMENT.do";

  if($scope.CASH_ADJUSTMENT_VALIDATION(DATA)){
    $http.post(URL,DATA).
    success(function(results) {
      if(results=="Success"){
        $("#CashAdjustment").popover("hide");
        Notiflix.Report.Success('Successfully Done ! ','Hey user, Cash has been successfully adjust to account.','Okey');
      }else{
        Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adjusting cash to account.Please try again .If issue  persists , please contact service provider.','Try Again');
      }
    }).
    error(function(error) {
       console.log("ADD PAYMENT **SubmitCashAdjustment** -----> Error",error);
       Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while adjusting cash to account.Please try again .If issue  persists , please contact service provider.','Try Again');
    });
  }

}


$scope.CASH_ADJUSTMENT_VALIDATION=function(DATA) {
  if(typeof DATA.Cash_Adjustment_Type  === 'undefined' || DATA.Cash_Adjustment_Type === '' ){
      Notiflix.Confirm.Show('Oops !','Please select transaction type.','Try Again');
      return false;
    }
    if(typeof DATA.Cash_Adjustment_Date  === 'undefined' || DATA.Cash_Adjustment_Date === '' ){
        Notiflix.Confirm.Show('Oops !','Please select adjustment date.','Try Again');
        return false;
      }
  if(typeof DATA.Total_Amount_Paid === 'undefined' || DATA.Total_Amount_Paid === '' || DATA.Total_Amount_Paid ==0 || DATA.Total_Amount_Paid === null){
        Notiflix.Confirm.Show('Oops !','Please enter adjustment amount.','Try Again');
        return false;
  }
  if(typeof DATA.Payment_Mode  === 'undefined' || DATA.Payment_Mode === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter mode of payment.','Try Again');
        return false;
  }
  if(typeof DATA.Remark  === 'undefined' || DATA.Remark === '' ){
        Notiflix.Confirm.Show('Oops !','Please enter remark.','Try Again');
        return false;
  }
 return true;
}

//***********************************************************************************************************
//-------------------------------------- END CASH ADJUSTMENT END --------------------------------------------
//***********************************************************************************************************

//=================================================================================================================================================
//--------------------------------------------------------------- FETCH STAFF DETAILES START --------------------------------------------------------
  //Fetch Staff Deatiles
  FetchStaffDetails=function(){
  $scope.StaffNamelist=[]
  $http({
  method : "GET",
  url : "/FetchStaffDetails.do",
   }).then(function mySuccess(response) {
      $scope.StaffData=response.data;
      for (let value of Object.values($scope.StaffData)) {
       $scope.StaffNamelist.push(value.Staff_Name);
        }
   }, function myError(response) {
     Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching invoice number . Please try again .If issue is persists , please contact service provider.','Try Again');
   });
}
FetchStaffDetails();
//------------------------------------------------------------ ~ END END END ~ ------------------------------------------------------------------
//===============================================================================================================================================



var SearchButton = document.getElementById("QuickSearchInput");
SearchButton.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("QuickSearchButton").click();
  }
});





}); //end app.controller



//_________________________________________________________________________________________________________________
//_____________________________________ END  HOME CONTROLLER MODULE  END __________________________________________
//_________________________________________________________________________________________________________________
