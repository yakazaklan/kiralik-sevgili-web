const fs = require('fs');
const path = require('path');

// Mocking the imports since we are running in Node
const TURKEY_DATA = {
  "ADANA": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
  "ADIYAMAN": ["Besni", "Çelikhan", "Gerger", "Gölbaşı", "Merkez", "Kahta", "Samsat", "Sincik", "Tut"],
  "AFYONKARAHİSAR": ["Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Merkez", "Kızılören", "Sandıklı", "Sinanpaşa", "Sultandağı", "Şuhut"],
  "AĞRI": ["Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Merkez", "Patnos", "Taşlıçay", "Tutak"],
  "AKSARAY": ["Ağaçören", "Eskil", "Gülağaç", "Güzelyurt", "Merkez", "Ortaköy", "Sarıyahşi", "Sultanhanı"],
  "AMASYA": ["Göynücek", "Gümüşhacıköy", "Hamamözü", "Merkez", "Merzifon", "Suluova", "Taşova"],
  "ANKARA": ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
  "ANTALYA": ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
  "ARDAHAN": ["Çıldır", "Damal", "Göle", "Hanak", "Merkez", "Posof"],
  "ARTVİN": ["Ardanuç", "Arhavi", "Borçka", "Hopa", "Merkez", "Murgul", "Şavşat", "Yusufeli", "Kemalpaşa"],
  "AYDIN": ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "Incirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"],
  "BALIKESİR": ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadić", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"],
  "BARTIN": ["Amasra", "Kurucaşile", "Merkez", "Ulus"],
  "BATMAN": ["Hasankeyf", "Merkez", "Beşiri", "Gercüş", "Kozluk", "Sason"],
  "BAYBURT": ["Aydıntepe", "Demirözü", "Merkez"],
  "BİLECİK": ["Bozüyük", "Gölpazarı", "İnhisar", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
  "BİNGÖL": ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
  "BİTLİS": ["Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Tatvan"],
  "BOLU": ["Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Merkez", "Mudurnu", "Seben", "Yeniçağa"],
  "BURDUR": ["Ağlasun", "Altınyayla", "Bucak", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Merkez", "Tefenni", "Yeşilova"],
  "BURSA": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
  "ÇANAKKALE": ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Merkez", "Yenice"],
  "ÇANKIRI": ["Atkaracalar", "Bayramören", "Çerkeş", "Eskipazar", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Merkez", "Orta", "Şabanözü", "Yapraklı"],
  "ÇORUM": ["Alaca", "Bayat", "Boğazkale", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Merkez", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"],
  "DENİZLİ": ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"],
  "DİYARBAKIR": ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"],
  "DÜZCE": ["Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Merkez", "Kaynaşlı", "Yığılca"],
  "EDİRNE": ["Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Süloğlu", "Uzunköprü"],
  "ELAZIĞ": ["Ağın", "Alacakaya", "Arıcak", "Baskil", "Karakoçan", "Keban", "Kovancılar", "Maden", "Merkez", "Palu", "Sivrice"],
  "ERZİNCAN": ["Çayırlı", "İliç", "Kemah", "Kemaliye", "Merkez", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
  "ERZURUM": ["Aşkale", "Aziziye", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"],
  "ESKİŞEHİR": ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Mihalgazi", "Mihalıççık", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"],
  "GAZİANTEP": ["Araban", "İslahiye", "Karkamış", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"],
  "GİRESUN": ["Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Görele", "Güce", "Keşap", "Merkez", "Piraziz", "Şebinkaharhisar", "Tirebolu", "Yağlıdere"],
  "GÜMÜŞHANE": ["Kelkit", "Köse", "Kürtün", "Merkez", "Şiran", "Torul"],
  "HAKKARİ": ["Çukurca", "Merkez", "Şemdinli", "Yüksekova", "Derecik"],
  "HATAY": ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladığı"],
  "IĞDIR": ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
  "ISPARTA": ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Merkez", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Yalvaç", "Yenişarbademli"],
  "İSTANBUL": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
  "İZMİR": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
  "KAHRAMANMARAŞ": ["Afşin", "Andırın", "Çağlayancerit", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"],
  "KARABÜK": ["Eflani", "Eskipazar", "Merkez", "Ovacık", "Safranbolu", "Yenice"],
  "KARAMAN": ["Ayrancı", "Başyayla", "Ermenek", "Merkez", "Kazımkarabekir", "Sarıveliler"],
  "KARS": ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Merkez", "Sarıkamış", "Selim", "Susuz"],
  "KASTAMONU": ["Abana", "Ağlı", "Araç", "Azdavay", "Bozkurt", "Cide", "Çatalzeytin", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazi", "İnebolu", "Merkez", "Küre", "Pınarbaşı", "Seydiler", "Taşköprü", "Tosya", "Şenpazar"],
  "KAYSERİ": ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "Incesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
  "KIRIKKALE": ["Bahşılı", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Merkez", "Sulakyurt", "Yahşihan"],
  "KIRKLARELİ": ["Babaeski", "Demirköy", "Kofçaz", "Lüleburgaz", "Merkez", "Pehlivanköy", "Pınarhisar", "Vize"],
  "KIRŞEHİR": ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Merkez", "Mucur"],
  "KİLİS": ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
  "KOCAELİ": ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Kartepe", "Körfez"],
  "KONYA": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltikçi", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
  "KÜTAHYA": ["Altıntaş", "Aslanapa", "Çavdarhisar", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Merkez", "Pazarlar", "Şaphane", "Simav", "Tavşanlı", "Hisarcık"],
  "MALATYA": ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"],
  "MANİSA": ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Şehzadeler", "Turgutlu", "Yunusemre"],
  "MARDİN": ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
  "MERSİN": ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"],
  "MUĞLA": ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"],
  "MUŞ": ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Merkez", "Varto"],
  "NEVŞEHİR": ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
  "NİĞDE": ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Merkez", "Ulukışla"],
  "ORDU": ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "Ikizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
  "OSMANİYE": ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Merkez", "Sumbas", "Toprakkale"],
  "RİZE": ["Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Merkez", "Pazar", "Kalkandere"],
  "SAKARYA": ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karapürçek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"],
  "SAMSUN": ["19 Mayıs", "Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"],
  "SİİRT": ["Baykan", "Eruh", "Kurtalan", "Merkez", "Pervari", "Şirvan", "Tillo"],
  "SİNOP": ["Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Merkez", "Saraydüzü", "Türkeli"],
  "SİVAS": ["Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Hafik", "İmranlı", "Kangal", "Merkez", "Koyulhisar", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara", "Gürün"],
  "ŞANLIURFA": ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"],
  "ŞIRNAK": ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Merkez", "Silopi", "Uludere"],
  "TEKİRDAĞ": ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"],
  "TOKAT": ["Almus", "Artova", "Başçiftlik", "Erbaa", "Merkez", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Turhal", "Yeşilyurt", "Zile"],
  "TRABZON": ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Şalpazarı", "Tonya", "Vakfıkebir", "Yomra"],
  "TUNCELİ": ["Çemişgezek", "Hozat", "Mazgirt", "Merkez", "Nazımiye", "Ovacık", "Pertek", "Pülümür"],
  "UŞAK": ["Banaz", "Eşme", "Karahallı", "Merkez", "Sivaslı", "Ulubey"],
  "VAN": ["Bahçesaray", "Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"],
  "YALOVA": ["Altınova", "Armutlu", "Çınarcık", "Çiftlikköy", "Merkez", "Termal"],
  "YOZGAT": ["Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Merkez", "Saraykent", "Sarıkaya", "Sorgun", "Şefaatli", "Yenifakılı", "Yerköy"],
  "ZONGULDAK": ["Alaplı", "Çaycuma", "Devrek", "Ereğli", "Merkez", "Gökçebey", "Kilimli", "Kozlu"]
};

const CITY_SEO_DATA = {
  "IZMIR": "Ege'nin incisi İzmir, Kordon Boyu, Tarihi Saat Kulesi ve eşsiz körfez manzarasıyla sosyal etkinlikler için büyüleyici bir atmosfere sahiptir.",
  "ISTANBUL": "Yedi tepeli şehir İstanbul, Boğaz'ın eşsiz silüeti, tarihi yarımadası ve bitmek bilmeyen enerjisiyle her türlü kültürel buluşmanın merkezidir.",
  "ANKARA": "Cumhuriyetimizin kalbi Ankara, Anıtkabir, Kuğulu Park ve modern şehir yapısıyla prestijli sosyal organizasyonların vazgeçilmez adresidir.",
  "ANTALYA": "Akdeniz'in turizm başkenti Antalya, tarihi Kaleiçi, dünyaca ünlü plajları ve lüks mekanlarıyla hem yerel hem de uluslararası davetlerin gözdesidir.",
  "BURSA": "Yeşil Bursa, Ulu Camii, tarihi hanları ve Uludağ'ın eteklerindeki modern dokusuyla sosyal ve kültürel etkinlikler için zengin seçenekler sunar.",
  "ADANA": "Lezzetin başkenti Adana, Taşköprü'sü ve Seyhan Nehri kıyısındaki yürüyüş parkurlarıyla samimi ve canlı bir sosyal hayata ev sahipliği yapar.",
  "MUGLA": "Bodrum'dan Fethiye'ye uzanan eşsiz koylarıyla Muğla, elit tatil beldeleri ve yaz akşamlarının en seçkin organizasyonlarının merkezidir.",
  "ESKISEHIR": "Öğrenci kenti Eskişehir, Porsuk Çayı kıyısındaki Venedik havası ve Odunpazarı evleriyle modern ve kültürel bir sosyal yaşam sunar.",
  "GAZIANTEP": "Gastronomi şehri Gaziantep, tarihi kalesi ve Zeugma Mozaik Müzesi ile zengin bir kültürel mirasın içinde sosyal buluşma imkanı sağlar.",
  "TRABZON": "Karadeniz'in hırçın ve güzel şehri Trabzon, Sümela Manastırı'ndan Uzungöl'e kadar uzanan doğasıyla ferah etkinliklerin adresidir.",
  "SAMSUN": "Milli Mücadele'nin başladığı yer olan Samsun, geniş sahil şeridi ve modern parklarıyla Karadeniz'in en düzenli sosyal alanlarına sahiptir.",
  "KAYSERI": "Erciyes'in gölgesindeki Kayseri, tarihi ticaret yollarının kesişim noktasında, hem modern hem de geleneksel bir sosyal yapı barındırır.",
  "MERSIN": "Palmiye ağaçlarıyla süslü uzun sahil bandı and modern marinasıyla Mersin, Akdeniz'in en keyifli buluşma noktalarından biridir.",
  "AYDIN": "Ege'nin bereketli toprakları Aydın, Kuşadası ve Didim gibi turistik ilçeleriyle yaz-kış canlı bir sosyal ve kültürel hayata sahiptir.",
  "DENIZLI": "Beyaz cennet Pamukkale ile tanınan Denizli, termal zenginlikleri ve antik kentleriyle kültürel ağırlıklı sosyal etkinlikler için idealdir.",
  "TEKIRDAG": "Marmara'nın kıyısındaki Tekirdağ, sahil yolu ve üzüm bağlarıyla huzurlu ve kaliteli vakit geçirmek isteyenlerin tercihidir.",
  "EDIRNE": "Osmanlı'nın eski başkenti Edirne, Selimiye Camii'nin ihtişamı ve Meriç Nehri kıyısındaki çay bahçeleriyle tarih kokan bir sosyal atmosfere sahiptir.",
  "SAKARYA": "Sapanca Gölü'nün huzuruyla bilinen Sakarya, doğa ile iç içe olmak isteyen sosyal gruplar ve refakatçiler için eşsiz fırsatlar sunar.",
  "KOCAELI": "Sanayinin kalbi Kocaeli, Kartepe'nin karlı zirveleri ve İzmit Körfezi'nin manzarasıyla hem iş hem de sosyal yaşamı bir araya getirir.",
  "BALIKESIR": "Hem Marmara hem Ege'ye kıyısı olan Balıkesir, Ayvalık ve Cunda Adası gibi büyülü mekanlarıyla en özel sosyal anların adresidir.",
  "CANAKKALE": "Tarihin yazıldığı topraklar Çanakkale, boğaz manzarası ve antik Truva kentiyle derinlikli sosyal buluşmalar sunar.",
  "YALOVA": "Termal kaplıcaları ve yürüyen köşküyle bilinen Yalova, İstanbul'a yakınlığı ve huzurlu doğasıyla sakin bir sosyal kaçış noktasıdır.",
  "MANISA": "Şehzadeler şehri Manisa, Spil Dağı ve tarihi yapılarıyla Ege'nin en köklü kültürel merkezlerinden biri olarak sosyal etkinliklere ev sahipliği yapar.",
  "MALATYA": "Kayısı diyarı Malatya, modern caddeleri ve misafirperver kültürüyle Doğu Anadolu'nun en gelişmiş sosyal yaşam alanlarından biridir.",
  "KAHRAMANMARAS": "Edebiyatın ve dondurmanın başkenti Kahramanmaraş, tarihi çarşıları ve yeni gelişen modern yüzüyle samimi sosyal buluşmalar sunar.",
  "ERZURUM": "Çifte Minareli Medresesi ve Palandöken Dağı ile Erzurum, kış turizminin ve tarihi kültürel etkinliklerin zirve noktasıdır.",
  "HATAY": "Medeniyetlerin buluşma noktası Hatay, eşsiz mutfağı ve binlerce yıllık tarihi dokusuyla en renkli sosyal organizasyonların adresidir.",
  "ELAZIG": "Harput Kalesi'nin gölgesindeki Elazığ, Hazar Gölü ve modern şehir yapısıyla bölgenin en canlı sosyal duraklarından biridir.",
  "DIYARBAKIR": "Tarihi surları ve Hevsel Bahçeleri ile UNESCO mirası olan Diyarbakır, kadim kültürü ve modern sosyal alanlarıyla Mezopotamya'nın kalbidir.",
  "SANLIURFA": "Peygamberler şehri Şanlıurfa, Balıklıgöl'ün manevi atmosferi ve Göbeklitepe'nin tarihi derinliğiyle eşsiz sosyal deneyimler sunar.",
  "VAN": "Doğu'nun incisi Van, görkemli kalesi ve Van Gölü'nün eşsiz maviliğiyle bölgenin en prestijli sosyal ve kültürel merkezidir.",
  "ORDU": "Yeşille mavinin kucaklaştığı Ordu, Boztepe'den izlenen eşsiz manzarası ve modern sahil şeridiyle Karadeniz'in en estetik şehirlerinden biridir.",
  "GIRESUN": "Fındığın başkenti Giresun, tarihi kalesi ve Karadeniz'in tek adasıyla huzurlu ve samimi sosyal buluşmaların adresidir.",
  "RIZE": "Çayın ve doğanın merkezi Rize, Kaçkar Dağları'nın eteklerindeki yaylaları ve hırçın dereleriyle doğa tutkunu sosyal gruplar için idealdir.",
  "BATMAN": "Hızla gelişen modern mimarisi ve Hasankeyf'in tarihi mirasıyla Batman, Güneydoğu'nun yükselen sosyal ve ekonomik merkezidir.",
  "ISPARTA": "Güller ve göller diyarı Isparta, mis kokulu bahçeleri ve Eğirdir Gölü'nün huzuruyla keyifli sosyal etkinliklere ev sahipliği yapar.",
  "ZONGULDAK": "Emeğin başkenti Zonguldak, Karadeniz'in hırçın kıyıları ve mağaralarıyla farklı ve karakteristik bir sosyal atmosfer sunar."
};

const DISTRICT_SEO_DATA = {
  "IZMIR": {
    "buca": "...",
    "konak": "...",
    "karsiyaka": "...",
    "bornova": "...",
    "cesme": "...",
    "gaziemir": "...",
    "menemen": "...",
    "balcova": "..."
  },
  "ISTANBUL": {
    "besiktas": "...",
    "kadikoy": "...",
    "sisli": "...",
    "beyoglu": "...",
    "uskudar": "...",
    "sariyer": "...",
    "bakirkoy": "...",
    "atasehir": "...",
    "maltepe": "...",
    "fatih": "...",
    "esenyurt": "...",
    "pendik": "...",
    "umraniye": "...",
    "kartal": "...",
    "kucukcekmece": "..."
  },
  "ANTALYA": {
    "alanya": "...",
    "muratpasa": "...",
    "konyaalti": "...",
    "manavgat": "...",
    "kepez": "..."
  },
  "ANKARA": {
    "cankaya": "...",
    "yenimahalle": "...",
    "etimesgut": "...",
    "kecioren": "...",
    "golbasi": "...",
    "mamak": "..."
  },
  "DIYARBAKIR": {
    "kayapinar": "...",
    "sur": "...",
    "baglar": "..."
  },
  "VAN": {
    "ipekyolu": "...",
    "edremit": "..."
  },
  "ORDU": {
    "altinordu": "...",
    "fatsa": "..."
  }
};

const cities = Object.keys(TURKEY_DATA);
const totalDistricts = Object.values(TURKEY_DATA).reduce((acc, curr) => acc + curr.length, 0);

const report = {
  summary: {
    totalCities: cities.length,
    totalDistricts: totalDistricts,
    citiesWithSeoData: Object.keys(CITY_SEO_DATA).length,
    districtsWithSeoData: Object.values(DISTRICT_SEO_DATA).reduce((acc, curr) => acc + Object.keys(curr).length, 0)
  },
  cityCoverage: {},
  missingCitySeo: [],
  districtCoverageByCity: {}
};

cities.forEach(city => {
  report.cityCoverage[city] = {
    hasSeoData: !!CITY_SEO_DATA[city],
    districtCount: TURKEY_DATA[city].length,
    districtsWithSeo: DISTRICT_SEO_DATA[city] ? Object.keys(DISTRICT_SEO_DATA[city]).length : 0
  };

  if (!CITY_SEO_DATA[city]) {
    report.missingCitySeo.push(city);
  }

  if (DISTRICT_SEO_DATA[city]) {
    report.districtCoverageByCity[city] = Object.keys(DISTRICT_SEO_DATA[city]);
  }
});

console.log(JSON.stringify(report, null, 2));
