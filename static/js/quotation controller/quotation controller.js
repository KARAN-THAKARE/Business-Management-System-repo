var app = angular.module('COMMON', []);
angular.module('app',[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('..').endSymbol('..');
});

//===============================================================================================================================================
//---------------------------------------------------------------- START ------------------------------------------------------------------------

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
  option_str.options[0] = new Option("Maharashtra","Maharashtra");
  option_str.selectedIndex = 0;
  for (var i=0; i<state_arr.length; i++) {
    option_str.options[option_str.length] = new Option(state_arr[i],state_arr[i]);
  }
}

function print_city(city_id,city_index,statepass,citypass){
  var option_str = document.getElementById(city_id);
  if(statepass=="Maharashtra"){
      var city_index = state_arr.indexOf(statepass) +1;
      option_str.length=0;	// Fixed by Julian Woods
      option_str.options[0] = new Option(citypass,citypass);
      option_str.selectedIndex = 0;
  } else  if(statepass=="NA"){
    option_str.length=0;	// Fixed by Julian Woods
    option_str.options[0] = new Option('Select City',null);
    option_str.selectedIndex = 0;
  }else {
    var city_index = state_arr.indexOf(statepass) +1;
    option_str.length=0;	// Fixed by Julian Woods
    option_str.options[0] = new Option(citypass,null);
    option_str.selectedIndex = 0;
  }
  var city_arr = s_a[city_index].split("|");
  for (var i=0; i<city_arr.length; i++) {
    option_str.options[option_str.length] = new Option(city_arr[i],city_arr[i]);
  }
}
/*===================================================================================== */

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
/*===================================================================================== */

//---------------------------------------------------------------- END ------------------------------------------------------------------------
//===============================================================================================================================================


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


app.controller('ADD_QUOATATION_CONTROLLER', function($scope,$window,$http,$log) {

//=========================================================================================================
//========================================== Declear variables ============================================

  let today = new Date().toISOString().substr(0, 10);
  $scope.Quotation_TYPE = ["Non GST", "GST", "Bill of supply"];
  $scope.PAYMENT_MODE = ["Cash", "Chaque", "Debit Card","Credit Card","UPI","Bank Transfer"];
  $scope.States = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"];
  $scope.Quotation={};
  $scope.makeItOff=true;
  $scope.Plus_Button=true;

  //Set up Quotation value
  SET_UP_Quotation=function(Quotation){
   $scope.Quotation.QuotationDate=new Date(today);
   $scope.Quotation.POS='Maharashtra';
   $scope.Quotation.Valid_Till_Date=new Date(today);
   $scope.Quotation.Apply_Discount=false;
   $scope.Quotation.Disc_in_percentage=null;
   $scope.Quotation.Disc_in_amt=null;
   $scope.Quotation.payment_mode=null;
   $scope.Quotation.SubTotal=null;
   $scope.Quotation.TotalAmount=null;
   $scope.Quotation.Apply_Shipping=false;
   $scope.Quotation.ShippingAmt=0;
   $scope.Quotation.TxnNo=null;
   $scope.Quotation.Apply_EMI=false;
   $scope.Quotation.EMI_Months=null;
   $scope.Quotation.EMI_PERCENT=0;
   $scope.Quotation.Amount_Paid=0;
   $scope.Quotation.DP_in_Percent=null;
   $scope.Quotation.DP_in_Amount=null;
   $scope.Quotation.BalanceAmount=null;
   $scope.Quotation.BalanceAmountForPaidAmount=0;
   /* client dataset */
   $scope.Quotation.ClientName=null;
   $scope.Quotation.contactNo=null;
   $scope.Quotation.Address=null;
   $scope.Quotation.state=null;
   $scope.Quotation.city=null;
   $scope.Quotation.Pincode=null;
   $scope.Quotation.PAN=null;
   $scope.Quotation.Email=null;

   $scope.Discount_String="0 %";
   $scope.Shipping_String="0";

    $scope.ClientDataLength=0;

   print_city('state',21,'Maharashtra','Amravati')

  document.getElementById("sts").value = "Maharashtra";
  document.getElementById("state").value = "Amravati";


  }
  SET_UP_Quotation( $scope.Quotation);

//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//========================================== FETCH QUOTATIOIN NUMBER ======================================
    FetchQuotationNumber=function(){
    $http({
    method : "GET",
    url : "/FetchQuotationNumber.do",
     }).then(function mySuccess(response) {
       for (let value of Object.values(response.data)) {
        $scope.Quotation.QuotationNumber=value.QuotationNumber;
        Fetch_Bucket_Item($scope.Quotation); //Fetch Bucket Item
         }

     }, function myError(response) {
       Notiflix.Report.Warning('Oops !','Hey user, Software facing issue while faching Quotation number . Please try again .If issue is persists , please contact service provider.','Try Again');
     });
  }
  FetchQuotationNumber();
//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//========================================== FETCH BUCKET ITEM ============================================
   Fetch_Bucket_Item=function(Quotation){
   $scope.Bucket={};
   $http.post('/Fetch_Bucket_Item_for_Quotation.do',Quotation).
   success(function(results) {
        $scope.Bucket=results;
        $scope.BucketSize=Object.keys($scope.Bucket).length;
        for (let value of Object.values($scope.Bucket)) {
           $scope.Quotation.SubTotal=value.Sub_Total.toFixed(2);
           $scope.Quotation.TotalAmount=Math.round($scope.Quotation.SubTotal);
           $scope.Quotation.Fixed_Sub_Total=value.Sub_Total.toFixed(2);
           $scope.Quotation.BalanceAmount=Math.round($scope.Quotation.SubTotal);
           $scope.Quotation.BalanceAmountForPaidAmount=Math.round($scope.Quotation.SubTotal);
        }
        if(Object.keys($scope.Bucket).length<1){
          $scope.Quotation.SubTotal=0;
          $scope.Quotation.TotalAmount=0;
          $scope.Quotation.Fixed_Sub_Total=0;
          $scope.Quotation.BalanceAmount=Math.round($scope.Quotation.SubTotal);
          $scope.Quotation.BalanceAmountForPaidAmount=Math.round($scope.Quotation.SubTotal);
        }
     $scope.FinalAmount($scope.Quotation) ;  //calculate again all value
   }).
   error(function(error) {
      console.log("ERROR IN Fetch_Bucket_Item ");
   });
}
//========================================== END END END END ============================================
//=======================================================================================================


//=========================================================================================================
//========================================== FETCH STOCK/ITEM LIST ========================================
$scope.fetchItem=function(){
$scope.FETCH_ITEM_NAME_LIST={};
$http({
method : "GET",
url : "/FetchItem.do",
 }).then(function mySuccess(response) {
   $scope.FETCH_ITEM_NAME_LIST = response.data;
 }, function myError(response) {
   Notiflix.Report.Warning('Oops !','Hey user, Software facing some issue while faching existing stocks items. Please try again .If issue is persists , please contact service provider.','Try Again');
 });
}
$scope.fetchItem();
//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//========================================== SEARCH CLIENT ON SEARCH BUTTON ===============================

//Search Client on click of search button
 $scope.SearchClient=function(){
   Contact=$("#contactNo").val();
   URL="/FetchSearchedClientData.do/"+Contact
   $http({
   method : "GET",
   url : URL,
    }).then(function mySuccess(response) {
       $scope.ClientData = response.data;
        $scope.ClientDataLength=Object.keys(response.data).length;
        if($scope.ClientDataLength!=0){
           for (let value of Object.values($scope.ClientData)) {
               $scope.Quotation.ClientName=value.Client_Name;
               $scope.Quotation.contactNo=value.Client_contact_no;
               $scope.Quotation.Address=value.Client_Address;
               $scope.Quotation.state=value.Client_State;
               print_city('state',this.selectedIndex,value.Client_State,value.Client_City)
               $scope.Quotation.Pincode=value.Client_pincode;
               $scope.Quotation.PAN=value.Client_PAN_no;
               $scope.Quotation.Email=value.Client_Email;
               Notiflix.Notify.Success('Great ! Client Data Found.')
          }
     }else{
       Notiflix.Notify.Failure('Oops ! Client Data Not Found.');
       $scope.Quotation.ClientName=null;
       $scope.Quotation.city=null;
       $scope.Quotation.Address=null;
       $scope.Quotation.state=null;
       $scope.Quotation.Pincode=null;
       $scope.Quotation.PAN=null;
       $scope.Quotation.Email=null;
       print_city('state',21,'Maharashtra','Amravati')
      document.getElementById("sts").value = "Maharashtra";
      document.getElementById("state").value = "Amravati";
     }
    }, function myError(response) {
       $scope.ClientDataLength=0;
       Notiflix.Notify.Failure('Oops ! Client Data Not Found.');
       $scope.Quotation.ClientName=null;
       $scope.Quotation.city=null;
       $scope.Quotation.Address=null;
       $scope.Quotation.state=null;
       $scope.Quotation.Pincode=null;
       $scope.Quotation.PAN=null;
       $scope.Quotation.Email=null;
       print_city('state',21,'Maharashtra','Amravati')
      document.getElementById("sts").value = "Maharashtra";
      document.getElementById("state").value = "Amravati";
    });

 }
//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//========================== FETCH SELECTED STOCK/ITEM INFORMATION AND SET ================================

/*@ If Success */
$scope.SetItemDetailToScope=function(Quotation,Final){   //call funtion that set required value to be fetched value
  $scope.Quotation.sp=Final.SP;
  $scope.Quotation.cgst=Final.CGST;
  $scope.Quotation.sgst=Final.SGST;
  $scope.Quotation.igst=Final.IGST;
  $scope.Quotation.cess=Final.Cess;
  $scope.makeItOff=false;
  $scope.Plus_Button=false;
}

/*@ If Failed */
$scope.SetItemDetailToNull=function(Quotation){   //call funtion that set required value to be null or zero
$scope.makeItOff=true;
$scope.Plus_Button=true;
//clear the i/p if seleted ITEM is not exist'
$scope.Quotation.sp=null;
$scope.Quotation.cgst=null;
$scope.Quotation.sgst=null;
$scope.Quotation.igst=null;
$scope.Quotation.cess=null;
$scope.Quotation.amt=null;
Notiflix.Report.Warning('Oops !','Hey user, Software does not found selected item details . Please try to select valid stock or existing one .','Select Existing Stock');
}

//@ API
  $scope.SelectedItem=function(Item_Name,Quotation){
  $scope.FETCH_SELECTED_ITEM_DETAILS={};
  var Final={};
  $http.post('/FetchSelectedItemDetails.do',Item_Name).
    success(function(results) {
      $scope.FETCH_SELECTED_ITEM_DETAILS=results;
      $scope.Quotation.qty=1;
      $scope.Quotation.disc=0;
      if(Object.keys($scope.FETCH_SELECTED_ITEM_DETAILS).length>0){
        for (var key in $scope.FETCH_SELECTED_ITEM_DETAILS) {
             Final= $scope.FETCH_SELECTED_ITEM_DETAILS[key];
             }
             $scope.SetItemDetailToScope(Quotation,Final); //call funtion that calculate total value of item
             $scope.TotalItemAmount(); //call funtion that calculate total value of item

      }else{
        $scope.SetItemDetailToNull(Quotation); //call funtion that set required value to be null or zero
      }
    }).
    error(function(error) {
      $scope.SetItemDetailToNull(Quotation); //call funtion that set required value to be null or zero
    });
  };

//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//======================================= ADD STOCK TO BUCKET =============================================

Clear_input_Field=function(){
  $scope.makeItOff=true;
  $scope.Plus_Button=true;
  $scope.Quotation.qty=1;
  $scope.Quotation.disc=0;
  //clear the i/p if seleted ITEM is not exist'
  $scope.Quotation.sp=null;
  $scope.Quotation.cgst=null;
  $scope.Quotation.sgst=null;
  $scope.Quotation.igst=null;
  $scope.Quotation.cess=null;
  $scope.Quotation.amt=null;

  $scope.Item_Name={};
}

$scope.Add_Stock_TO_Bucket = function(Item_Name,Quotation,FETCH_ITEM_NAME_LIST) {
    for (let value of Object.values(FETCH_ITEM_NAME_LIST) ){
        if(value.Item_name == Item_Name.selectedItemName){
          Quotation["Stock_ID"]=value.StockID; //this give us STOCK ID
          Quotation["Stock_Name"]=Item_Name.selectedItemName;
        }
      }

      var isItemExist = false;
      for (let value of Object.values($scope.Bucket) ){
          if(value.Stock_ID == Quotation.Stock_ID){
              isItemExist = true;
              break;
           }
        }

 if(!isItemExist){
    $http.post('/Add_Stock_To_Bucket_For_Quotation.do',Quotation).
    success(function(results) {
      if(results=="Success"){
          Clear_input_Field();           //Clear input field
          Fetch_Bucket_Item(Quotation); //Fetch Bucket Item after adding item
          Notiflix.Notify.Success('Successfully added in Bucket !');
    }else{
        Notiflix.Notify.Failure('Oops ! Unable to add in Bucket');
    }
    }).
    error(function(error) {
        Notiflix.Notify.Failure('Oops ! Unable to add in Bucket');
    });
}else{ Notiflix.Confirm.Show('Oops !','Hey user ,Selected product is already in bucked.Please first delete existing product to add new one.','Try Again'); }
  };
//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//======================================= DELETE STOCK FROM BUCKET ==========================================
   $scope.Delete_Item_From_Bucket=function(Bucket_Item_ID,Quotation){
   var Item={};
   Item["ID"]=Bucket_Item_ID;
   $http.post('/Delete_Item_From_Bucket_For_Quotation.do',Item).
   success(function(results) {
     if(results=="Success"){
       Fetch_Bucket_Item(Quotation);
       Notiflix.Notify.Success('Item removed from bucket !');
   }else{
       Notiflix.Notify.Failure('Oops ! Failed to remove item');
   }
   }).
   error(function(error) {
      console.log("ERROR IN Fetch_Bucket_Item After Delete ");
       Notiflix.Notify.Failure('Oops ! Failed to remove item');
   });

 }
 //========================================== END END END END ============================================
 //=======================================================================================================

 //=========================================================================================================
 //==========================================================================================================

      $scope.ZERO_BOTH_FIELD=function(Quotation){
        Quotation.Disc_in_amt=0;
        Quotation.Disc_in_percentage=0;
        $scope.FinalAmount(Quotation);
       }


       //Make Discount in Amount field 0
       $scope.ZERO_AMOUNT_FIELD=function(Quotation){
        Quotation.Disc_in_amt=0;
        Quotation.Disc_in_percentage=null;
        $scope.FinalAmount(Quotation);
      }
      //Make Discount in percent field 0
      $scope.ZERO_PERCENT_FIELD=function(Quotation){
       Quotation.Disc_in_percentage=0;
       Quotation.Disc_in_amt=null;
       $scope.FinalAmount(Quotation);
     }

     //Make Discount in Amount for down payment field 0
     $scope.ZERO_AMOUNT_FIELD_FOR_DP=function(Quotation){
      Quotation.DP_in_Amount=0;
      Quotation.DP_in_Percent=null;
    Quotation.Amount_Paid=0;
    }
    //Make Discount in percent for down payment field 0
    $scope.ZERO_PERCENT_FIELD_FOR_DP=function(Quotation){
     Quotation.DP_in_Percent=0;
       Quotation.DP_in_Amount=null;
       Quotation.Amount_Paid=0;
   }

     $scope.Function_for_EMI=function(Quotation){
        Quotation.Amount_Paid=0;
     }

     $scope.On_Click_EMI_value_Zero=function(Quotation){
   Quotation.EMI_PERCENT=null;
    }

$scope.ChnageInPaymentMode=function(Quotation){
  if(Quotation.payment_mode=='Cash'){
          $scope.Quotation.TxnNo="NA"
       }else{
            $scope.Quotation.TxnNo=""
       }
   }

//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//======================================== CALCULATE TOTAL AMOUNT==========================================

    $scope.SetFinalResult=function(Quotation,SubTotal){
      $scope.Quotation.SubTotal=SubTotal;
      $scope.Quotation.TotalAmount=Math.round(SubTotal);
      $scope.Quotation.BalanceAmount=Math.round(SubTotal);
      $scope.Quotation.BalanceAmountForPaidAmount=Math.round(SubTotal);
    }


    //=========================== This Function Calculate Total Price of  Item=================================
    $scope.TotalItemAmount=function(){

      var qty =$scope.Quotation.qty;
      var sp =$scope.Quotation.sp;
      var disc =$scope.Quotation.disc;
      var cgst =$scope.Quotation.cgst;
      var sgst =$scope.Quotation.sgst;
      var igst =$scope.Quotation.igst;
      var cess =$scope.Quotation.cess;

      //-------------------- handle null value ----------------
      if($scope.Quotation.qty===null){qty=1}
      if($scope.Quotation.sp===null){sp=0}
      if($scope.Quotation.disc===null){disc=0}
      if($scope.Quotation.cgst===null){cgst=0}
      if($scope.Quotation.sgst===null){sgst=0}
      if($scope.Quotation.igst===null){igst=0}
      if($scope.Quotation.cess===null){cess=0}


      var TotaoPriceOfItem=0;
      TotaoPriceOfItem=parseFloat(sp)+(parseFloat(sp)*(parseFloat(cgst)/100))+(parseFloat(sp)*(parseFloat(sgst)/100))+(parseFloat(sp)*(parseFloat(igst)/100))+(parseFloat(sp)*(parseFloat(cess)/100));
      TotaoPriceOfItem=TotaoPriceOfItem*parseInt(qty);
      TotaoPriceOfItem=TotaoPriceOfItem-(parseFloat(sp)*(parseFloat(disc)/100))

      if (TotaoPriceOfItem>=0) {
      $scope.Quotation.amt=TotaoPriceOfItem.toFixed(2);
      }
    }
    //========================================== END END END END ============================================

    //=========================== This Function Calculate Total Price of  Item=================================
    $scope.FinalAmount=function(Quotation){

      var SubTotal=0;
      var AmountPaid=0;
      var BalanceAmount=0;
      var FixedValue=Quotation.Fixed_Sub_Total;
      $scope.Quotation.BalanceAmountForPaidAmount=0;

      //-------------------- For Discount ------------------
      if(Quotation.Apply_Discount){
                   if(!Quotation.Disc_in_percentage && Quotation.Disc_in_percentage!=0 || Quotation.Disc_in_percentage==null ){
                     SubTotal = FixedValue;
                     $scope.SetFinalResult(Quotation,SubTotal);
                      $scope.Discount_String="0 %";
                   }
                   if(parseFloat($scope.Quotation.Disc_in_percentage)>0){  //--------------------  Discount IN Percent
                     var SubTotal= ( FixedValue - ( parseFloat(FixedValue) * (parseFloat($scope.Quotation.Disc_in_percentage)/100))).toFixed(2);
                     $scope.SetFinalResult(Quotation,SubTotal);
                     $scope.Discount_String= $scope.Quotation.Disc_in_percentage + " %" ;
                   }

                  if(!Quotation.Disc_in_amt && Quotation.Disc_in_amt!=0 ){ SubTotal = FixedValue;$scope.SetFinalResult(Quotation,SubTotal);$scope.Discount_String="0 %";}

                  if(parseInt(Quotation.Disc_in_amt)>0){     // --------  Discount in Amount
                   SubTotal= ( FixedValue - parseFloat($scope.Quotation.Disc_in_amt)).toFixed(2);
                   $scope.SetFinalResult(Quotation,SubTotal);
                   $scope.Discount_String="Rs. " + $scope.Quotation.Disc_in_amt;
                 }

                 if(parseFloat($scope.Quotation.Disc_in_percentage)==0 && parseInt(Quotation.Disc_in_amt)==0){     // --------  Discount in Amount
                   SubTotal=FixedValue;
                   $scope.SetFinalResult(Quotation,SubTotal);
                    $scope.Discount_String="0 %";
                }

        }else{
              $scope.Discount_String="0 %";
              SubTotal=FixedValue;
              $scope.SetFinalResult(Quotation,SubTotal);
          }
        //-------------------- END END END ---------------------------//

      //-------------------- For Shipping cost ------------------//
      if(Quotation.Apply_Shipping)
      {
      if(!Quotation.ShippingAmt && Quotation.ShippingAmt!=0 || Quotation.ShippingAmt==null){ $scope.SetFinalResult(Quotation,SubTotal);$scope.Shipping_String="0";}
      if(parseInt(Quotation.ShippingAmt)>=0){
         SubTotal= (parseFloat(SubTotal)+parseFloat($scope.Quotation.ShippingAmt)).toFixed(2);
         $scope.SetFinalResult(Quotation,SubTotal);
          $scope.Shipping_String=parseInt(Quotation.ShippingAmt);
      }
    }else{
          $scope.SetFinalResult(Quotation,SubTotal);
            $scope.Shipping_String="0";
         }
   //-------------------- END END END------------------//

   //--------------------For EMI ------------------//
   //--------------------For EMI ------------------//
   if(Quotation.Apply_EMI){
        var FLAG = 1;
        var month = parseInt(Quotation.EMI_Months);
        console.log(Quotation.DP_in_Percent,Quotation.DP_in_Amount);
        if (parseFloat(Quotation.EMI_PERCENT)>=0 && month>0)  {
                              if(parseInt(Quotation.DP_in_Amount)>0){
                                var After_paying_Down_Payment= parseFloat(Quotation.TotalAmount)- parseFloat(Quotation.DP_in_Amount);
                                var Overall_one_year_EMI_Percent_amount = parseFloat(After_paying_Down_Payment) * (parseFloat(Quotation.EMI_PERCENT)/100)
                                var Per_month_EMI_Percent_amount=parseFloat(Overall_one_year_EMI_Percent_amount/12);
                                var Total_Amount_After_Adding_EMI_Percent_Amount=parseFloat(After_paying_Down_Payment)+(Per_month_EMI_Percent_amount*month);
                                var Divided_Amount_with_Months = Total_Amount_After_Adding_EMI_Percent_Amount/month;

                                $scope.Quotation.x=(Math.round(After_paying_Down_Payment)).toFixed(2);
                                $scope.Quotation.y=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount)).toFixed(2);
                                $scope.Quotation.z=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount-After_paying_Down_Payment)).toFixed(2);

                                 $scope.Quotation.Amount_Paid=Quotation.DP_in_Amount;
                                $scope.Quotation.BalanceAmount=Math.round(Total_Amount_After_Adding_EMI_Percent_Amount);

                                var i;
                                var Sum_Of_all_EMI=Math.round(Divided_Amount_with_Months)*month;
                                var Out_Standing_Amount=$scope.Quotation.y-Sum_Of_all_EMI;
                                $scope.breakout=[];
                                   for (i = 0; i < month; i++)
                                   {
                                          if(i==(month-1)){
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months+Out_Standing_Amount)).toFixed(2));
                                          }else {
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months)).toFixed(2));
                                          }
                                   }

                              }
                              if(Quotation.DP_in_Percent==0 && Quotation.DP_in_Amount===null){
                                       $scope.Quotation.Amount_Paid=0;
                              }

                              if(parseFloat(Quotation.DP_in_Percent)>0){
                                var Pay_in_Percent_Value=(parseFloat(Quotation.TotalAmount) * (parseFloat(Quotation.DP_in_Percent)/100));
                                var After_paying_Down_Payment= parseFloat(Quotation.TotalAmount)- Pay_in_Percent_Value;
                                var Overall_one_year_EMI_Percent_amount = parseFloat(After_paying_Down_Payment) * (parseFloat(Quotation.EMI_PERCENT)/100)
                                var Per_month_EMI_Percent_amount=parseFloat(Overall_one_year_EMI_Percent_amount/12);
                                var Total_Amount_After_Adding_EMI_Percent_Amount=parseFloat(After_paying_Down_Payment)+(Per_month_EMI_Percent_amount*month);
                                var Divided_Amount_with_Months = Total_Amount_After_Adding_EMI_Percent_Amount/month;

                                $scope.Quotation.x=(Math.round(After_paying_Down_Payment)).toFixed(2);
                                $scope.Quotation.y=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount)).toFixed(2);
                                $scope.Quotation.z=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount-After_paying_Down_Payment)).toFixed(2);



                                $scope.Quotation.Amount_Paid=Math.round(Pay_in_Percent_Value);
                                $scope.Quotation.BalanceAmount=Math.round(Total_Amount_After_Adding_EMI_Percent_Amount);

                                var i;
                                var Sum_Of_all_EMI=Math.round(Divided_Amount_with_Months)*month;
                                var Out_Standing_Amount=$scope.Quotation.y-Sum_Of_all_EMI;
                                $scope.breakout=[];
                                   for (i = 0; i < month; i++)
                                   {

                                          if(i==(month-1)){
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months+Out_Standing_Amount)).toFixed(2));
                                          }else {
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months)).toFixed(2));
                                          }
                                   }

                              }

                              if(Quotation.DP_in_Percent===null && Quotation.DP_in_Amount==0){
                                       $scope.Quotation.Amount_Paid=0;
                              }

                              if(Quotation.DP_in_Percent===null || Quotation.DP_in_Amount===null){
                                $scope.Quotation.Amount_Paid=0;
                              }

                              if(Quotation.DP_in_Amount==0 && Quotation.DP_in_Percent==0){

                                var After_paying_Down_Payment= parseFloat(Quotation.TotalAmount)- parseFloat(Quotation.DP_in_Amount);
                                var Overall_one_year_EMI_Percent_amount = parseFloat(After_paying_Down_Payment) * (parseFloat(Quotation.EMI_PERCENT)/100)
                                var Per_month_EMI_Percent_amount=parseFloat(Overall_one_year_EMI_Percent_amount/12);
                                var Total_Amount_After_Adding_EMI_Percent_Amount=parseFloat(After_paying_Down_Payment)+(Per_month_EMI_Percent_amount*month);
                                var Divided_Amount_with_Months = Total_Amount_After_Adding_EMI_Percent_Amount/month;

                                $scope.Quotation.x=(Math.round(After_paying_Down_Payment)).toFixed(2);
                                $scope.Quotation.y=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount)).toFixed(2);
                                $scope.Quotation.z=(Math.round(Total_Amount_After_Adding_EMI_Percent_Amount-After_paying_Down_Payment)).toFixed(2);

                                 $scope.Quotation.Amount_Paid=Quotation.DP_in_Amount;
                                $scope.Quotation.BalanceAmount=Math.round(Total_Amount_After_Adding_EMI_Percent_Amount);

                                var i;
                                var Sum_Of_all_EMI=Math.round(Divided_Amount_with_Months)*month;
                                var Out_Standing_Amount=$scope.Quotation.y-Sum_Of_all_EMI;
                                $scope.breakout=[];
                                   for (i = 0; i < month; i++)
                                   {
                                          if(i==(month-1)){
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months+Out_Standing_Amount)).toFixed(2));
                                          }else {
                                            $scope.breakout.push((Math.round(Divided_Amount_with_Months)).toFixed(2));
                                          }
                                   }
                              }

                     }else {
                       $scope.Quotation.Amount_Paid=0;
                     }
    }else{
      $scope.Quotation.Amount_Paid=0;
    }
   //-------------------- END END END ---------------------------//
     $scope.PaidAmount(Quotation);
    }

//==================================== END END END =========================================

//This Function Handles Amount paid
$scope.PaidAmount=function(Quotation){
    if(typeof $scope.Quotation.Amount_Paid === 'undefined'){
        $scope.Quotation.BalanceAmount=$scope.Quotation.BalanceAmountForPaidAmount;
      }else if ($scope.Quotation.Amount_Paid >=0) {
  $scope.Quotation.BalanceAmount=$scope.Quotation.BalanceAmountForPaidAmount - $scope.Quotation.Amount_Paid;
      }

}

//========================================== END END END END ============================================
//=======================================================================================================

//=========================================================================================================
//=========================================== SUBMIT QUOTATION ============================================

$scope.Submit=function(Quotation){

Quotation.state =   document.getElementById("sts").value;
Quotation.city  =  document.getElementById("state").value;

Quotation["breakout"]=$scope.breakout;
var city=$scope.Quotation.city

if($scope.ClientDataLength!=0){
      for (let value of Object.values($scope.ClientData)) {
          Quotation["ClientID"]=value.Client_ID;
          $scope.Quotation.city=value.Client_City;
        }
}else{
   Quotation["ClientID"]=0;
       if(Quotation.ClientName !== null && Quotation.ClientName !== ''){
         var ClientNAME=Quotation.ClientName.split(" ");
         Quotation["FN"]=ClientNAME[0];
         Quotation["LN"]=ClientNAME[1];
      }
}

if(typeof Quotation.Pincode === 'undefined' || Quotation.Pincode === null || Quotation.Pincode === ''){
Quotation.Pincode='';
}


// ============================================== Call API ============================================== //
  if ($scope.Submit_Validation(Quotation)) {
   Notiflix.Loading.Pulse('Please wait ...');
   $http.post('/SubmitQuotation.do',Quotation).
      success(function(results) {
        if(results=='Success'){
          URL='/Display_Bill_For_Quotation.do/'+String(Quotation.QuotationNumber)+'/new';
          $window.location.href = URL;
        }else{
          Notiflix.Loading.Remove();
          Notiflix.Report.Failure('Oops !','Hey user, Software trying to create Quotation for client but something went wrong .If issue is persists , please contact service provider. ','Try Again');
        }
      }).
      error(function(error) {
        Notiflix.Loading.Remove();
        Notiflix.Report.Failure('Oops !','Hey user, Software trying to create Quotation for client but something went wrong .If issue is persists , please contact service provider. ','Try Again');
      });
  }
}
// ======================================================= END Call API END ========================================================= //


///  @Validation  ==================================================>

  $scope.Submit_Validation=function(Quotation){
   if(typeof Quotation.QuotationNumber === 'undefined' || Quotation.QuotationNumber === null || Quotation.QuotationNumber === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Quotation Number for current bill is none . ','Try Again');
         return false;
   }
   if(typeof Quotation.QuotationDate === 'undefined' || Quotation.QuotationDate === null || Quotation.QuotationDate === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select Quotation date. ','Try Again');
         return false;
   }
   if(typeof Quotation.POS === 'undefined' || Quotation.POS === null || Quotation.POS === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select place of supply','Try Again');
         return false;
   }
   if(typeof Quotation.ClientName === 'undefined' || Quotation.ClientName === null || Quotation.ClientName === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter client name.','Try Again');
         return false;
   }
   if(typeof Quotation.contactNo === 'undefined' || Quotation.contactNo === null || Quotation.contactNo === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the client contact number.','Try Again');
         return false;
   }
   if(typeof Quotation.Address === 'undefined' || Quotation.Address === null || Quotation.Address === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please enter the client address.','Try Again');
         return false;
   }
   if(typeof Quotation.state === 'undefined' || Quotation.state === null || Quotation.state === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select state of client.','Try Again');
         return false;
   }
   if(typeof Quotation.city === 'undefined' || Quotation.city === null || Quotation.city === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please select city of client.','Try Again');
         return false;
   }
   if($scope.BucketSize<1 || typeof $scope.BucketSize === 'undefined' || $scope.BucketSize === null || Quotation.BucketSize === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please try to add at least One item/stock in bucket.','Try Again');
         return false;
   }
   if(Quotation.TotalAmount<1 || typeof Quotation.TotalAmount === 'undefined' || Quotation.TotalAmount === null || Quotation.TotalAmount === ''){
         Notiflix.Confirm.Show('Oops !','Hey user , Please try to add at least One item/stock in bucket.','Try Again');
         return false;
   }
   if(Quotation.Apply_EMI){
     if(typeof Quotation.EMI_Months === 'undefined' || Quotation.EMI_Months=== null || Quotation.EMI_Months === ''){
           Notiflix.Confirm.Show('Oops !','Hey user , please select EMI Months for client.','Try Again');
           return false;
     }
     if(typeof Quotation.EMI_PERCENT === 'undefined' || Quotation.EMI_PERCENT === null || Quotation.EMI_PERCENT === ''){
           Notiflix.Confirm.Show('Oops !','Hey user , EMI % should not be null','Try Again');
           return false;
     }
     if(Quotation.DP_in_Amount=== null && Quotation.DP_in_Percent=== null ){
           Notiflix.Confirm.Show('Oops !','Hey user , Client need to pay Down payment to procced EMI.','Try Again');
           return false;
     }
   }
   if(typeof Quotation.BalanceAmount === 'undefined' || Quotation.BalanceAmount === null || Quotation.BalanceAmount<0 || Quotation.BalanceAmount === ''){
         Notiflix.Confirm.Show('Oops !','Hey user ,Paid amount should not be greater than actual amount.','Try Again');
         return false;
   }
   if(typeof Quotation.Amount_Paid === 'undefined' || Quotation.Amount_Paid === null ||  Quotation.Amount_Paid == ''){
          Quotation.Amount_Paid=0;
   }
  return true;
 }

 //========================================== END END END END ============================================
 //=======================================================================================================

 //=========================================================================================================
 //============================================== CREATE NEW ===============================================

$scope.CreateNew = function(Quotation) {
var mesg='Are you sure you want to navigate away from this page? Be aware, if you press "Yes" now, All your data will be lost! Press Yes to continue .';
URL="/CreateNewForQuotation.do/" + String(Quotation.QuotationNumber);
Notiflix.Confirm.Show(
  "Confirmation Box",
  mesg,
  false,
  false,
  function(){$window.location.href = URL;},
  function(){console.log("user select NO");});
}
//========================================== END END END END ============================================
//=======================================================================================================


// ======================================= EVENT HANDLER KEYBOARD ====================================

  var input = document.getElementById("SelectedItem");
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add_Item_details").click();
    }
  });

  var SearchClientButton = document.getElementById("contactNo");
  SearchClientButton.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("SearchClientButtonID").click();
    }
  });

  $(document).keypress("keyup", function(event) {
    if (event.keyCode === 43) {
      event.preventDefault();
      document.getElementById("AddButton").click();
    }
    if (event.keyCode === 13) {
      event.preventDefault();
      try {
        document.getElementById("NXReportButton").click();
      }catch(err)
      {
        console.log(err);
      }
      try {document.getElementById("NXConfirmButtonOk").click();}catch(err) { console.log(err);}
    }
  });
// ======================================= ~ END EVENT HANDLER KEYBOARD END ~ ====================================

$('#contactNo').keyup(function () {
  this.value = this.value.replace(/[^0-9\.]/g,'');
});
document.getElementById('Pincode').addEventListener('input', function (e) {
e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
});

$(function() {
         $('#PAN').keyup(function() {
             this.value = this.value.toLocaleUpperCase();
         });
     });

}); //end app.controller
