import { slugify } from "./turkey-zones";

export const CITY_SEO_DATA: Record<string, string> = {
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
  "MERSIN": "Palmiye ağaçlarıyla süslü uzun sahil bandı ve modern marinasıyla Mersin, Akdeniz'in en keyifli buluşma noktalarından biridir.",
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

export const DISTRICT_SEO_DATA: Record<string, Record<string, string>> = {
  "IZMIR": {
    "buca": "Buca'nın simgesi Mevlana Heykeli ve tarihi levanten köşklerinin bulunduğu doku, bölgedeki sosyal buluşmalara nostaljik ve kültürel bir derinlik katar.",
    "konak": "İzmir'in kalbi Konak, Saat Kulesi ve Kemeraltı Çarşısı gibi tarihi mekanlarıyla şehrin en canlı sosyal ve kültürel merkezidir.",
    "karsiyaka": "Kordon'u ve kendine has '35,5' ruhuyla Karşıyaka, seçkin kafeleri ve deniz havasıyla elit sosyal aktiviteler için idealdir.",
    "bornova": "Üniversite kenti kimliği ve Büyük Park'ın yeşil dokusuyla Bornova, dinamik ve kültürel açıdan zengin bir etkinlik ortamı sunar.",
    "cesme": "Dünyaca ünlü plajları ve Alaçatı'nın taş sokaklarıyla Çeşme, yaz aylarında en prestijli davetlerin ve sosyal hayatın zirve yaptığı noktadır.",
    "gaziemir": "Adnan Menderes Havalimanı ve Fuar İzmir'e yakınlığıyla Gaziemir, özellikle profesyonel ve iş odaklı sosyal görüşmelerin merkezidir.",
    "menemen": "Tarihi dokusu ve gelişen yerleşimiyle Menemen, İzmir'in kuzey aksında samimi sosyal etkinlik alanları sunar.",
    "balcova": "Teleferiği ve termal tesisleriyle Balçova, doğa ve huzuru arayan sosyal gruplar için harika bir tercihtir."
  },
  "ISTANBUL": {
    "besiktas": "Dolmabahçe Sarayı ve canlı çarşısıyla Beşiktaş, İstanbul'un hem tarihi hem de modern yüzünü birleştiren en seçkin sosyal duraklardan biridir.",
    "kadikoy": "Moda sahilinden Bahariye'ye uzanan kültürel zenginliğiyle Kadıköy, Anadolu Yakası'nın en prestijli sosyal ve sanatsal merkezidir.",
    "sisli": "Modern iş dünyasının ve lüks alışverişin merkezi Şişli, üst düzey iş yemekleri ve profesyonel sosyal etkinlikler için en doğru adrestir.",
    "beyoglu": "İstiklal Caddesi ve Galata Kulesi'nin tarihi gölgesinde Beyoğlu, sanat ve kültürle iç içe geçmiş bir sosyal refakat deneyimi sunar.",
    "uskudar": "Kız Kulesi manzarası ve tarihi atmosferiyle Üsküdar, İstanbul'un en huzurlu ve anlamlı sosyal buluşma noktalarından biridir.",
    "sariyer": "Boğaz'ın incisi Sarıyer, Emirgan Korusu ve sahilindeki balık restoranlarıyla elit bir sosyal deneyim vaat eder.",
    "bakirkoy": "Sahil bandı ve köklü sosyal kulüpleriyle Bakırköy, İstanbul'un batı yakasında kaliteli vakit geçirmek isteyenlerin uğrak yeridir.",
    "atasehir": "Modern mimarisi ve finans merkeziyle Ataşehir, Anadolu Yakası'nın en yeni ve prestijli sosyal yaşam alanıdır.",
    "maltepe": "Geniş sahil parkı ve Adalar manzarasıyla Maltepe, keyifli yürüyüşler ve sosyal buluşmalar için ideal bir atmosfere sahiptir.",
    "fatih": "Tarihi Yarımada'nın kalbi Fatih, binlerce yıllık medeniyet mirasıyla her köşesinde ayrı bir kültürel derinlik barındıran eşsiz bir bölgedir.",
    "esenyurt": "Hızla gelişen modern yapıları ve kozmopolit yapısıyla Esenyurt, şehrin en dinamik ve hareketli sosyal bölgelerinden biri haline gelmiştir.",
    "pendik": "Sahil yolu ve marina bölgesiyle Pendik, Anadolu Yakası'nın güneyinde prestijli ve ferah bir sosyal yaşam alanunda yer alır.",
    "umraniye": "Modern iş merkezleri ve hızla gelişen sosyal donatılarıyla Ümraniye, İstanbul'un yeni finans ve yaşam akslarından biridir.",
    "kartal": "Yükselen plazaları ve sahil düzenlemesiyle Kartal, modern şehir hayatının tüm imkanlarını sosyal etkinliklere sunar.",
    "kucukcekmece": "Göl kıyısındaki yürüyüş parkurları ve geniş parklarıyla Küçükçekmece, huzurlu sosyal aktiviteler için uygun bir zemine sahiptir."
  },
  "ANTALYA": {
    "alanya": "Tarihi kalesi ve Kızıl Kule'siyle Alanya, Akdeniz'in en gözde tatil ve sosyal yaşam merkezlerinden biri olarak öne çıkar.",
    "muratpasa": "Kaleiçi'nin tarihi sokakları ve falezlerin eşsiz manzarasıyla Muratpaşa, Antalya'nın en köklü ve seçkin yerleşim bölgesidir.",
    "konyaalti": "Mavi bayraklı plajları ve modern yürüyüş yollarıyla Konyaaltı, dinamik ve ferah bir sosyal hayat sunar.",
    "manavgat": "Şelalesi ve Side antik kentiyle Manavgat, hem doğa hem de tarih meraklıları için büyüleyici sosyal fırsatlar barındırır.",
    "kepez": "Düden Şelalesi ve seyir teraslarıyla Kepez, Antalya'nın sosyal dokusuna farklı bir derinlik ve ferahlık katar."
  },
  "ANKARA": {
    "cankaya": "Devletin ve diplomasinin kalbi Çankaya, Kızılay'dan Tunalı Hilmi'ye uzanan elit mekanlarıyla Ankara sosyal hayatının zirvesidir.",
    "yenimahalle": "Varlık ve Batıkent gibi modern yerleşimleriyle Yenimahalle, geniş parkları ve sosyal donatılarıyla huzurlu bir etkinlik ortamı sunar.",
    "etimesgut": "Modern konut projeleri ve gelişen sosyal imkanlarıyla Etimesgut, Ankara'nın yeni ve dinamik yüzünü temsil eder.",
    "kecioren": "Geniş rekreasyon alanları ve teleferiğiyle Keçiören, aile ve sosyal buluşmalar için farklı bir bakış açısı sunar.",
    "golbasi": "Mogan Gölü'nün huzuru ve doğasıyla Gölbaşı, Ankara'nın gürültüsünden uzak, elit ve sakin bir sosyal kaçış noktasıdır.",
    "mamak": "Hızla dönüşen çehresi ve yeni sosyal alanlarıyla Mamak, Ankara'nın doğusunda gelişen bir etkinlik potansiyeli taşır."
  },
  "DIYARBAKIR": {
    "kayapinar": "Modern mimarisi ve geniş caddeleriyle Kayapınar, Diyarbakır'ın en prestijli ve yeni sosyal yaşam merkezidir.",
    "sur": "Tarihi On Gözlü Köprü ve kadim surlarıyla Sur, şehrin tarih kokan ruhunu her türlü sosyal buluşmaya yansıtır.",
    "baglar": "Şehrin en eski ve hareketli bölgelerinden olan Bağlar, kendine has dinamizmiyle canlı bir sosyal yapı sunar."
  },
  "VAN": {
    "ipekyolu": "Van'ın merkezi konumundaki İpekyolu, alışveriş merkezleri ve kafeleriyle şehrin en hareketli sosyal odak noktasıdır.",
    "edremit": "Van Gölü kıyısındaki bahçeleri ve eşsiz gün batımıyla Edremit, huzurlu refakat deneyimleri için mükemmel bir atmosfer sunar."
  },
  "ORDU": {
    "altinordu": "Şehrin kalbi Altınordu, uzun sahil bandı ve Teleferik hattıyla Karadeniz'in en modern sosyal yaşam alanlarından biridir.",
    "fatsa": "Doğal limanı ve yeşil dokusuyla Fatsa, sakin ve kaliteli bir sosyal etkinlik ortamı sağlar."
  }
};

export const getCitySeoInfo = (cityName: string): string => {
  if (!cityName) return "";
  const normalizedSearch = slugify(cityName).toLowerCase();

  const keys = Object.keys(CITY_SEO_DATA);
  const matchKey = keys.find(k => slugify(k).toLowerCase() === normalizedSearch);

  return matchKey ? CITY_SEO_DATA[matchKey] : "";
};

export const getDistrictSeoInfo = (cityName: string, districtName: string): string => {
  if (!cityName || !districtName) return "";

  const normalizedCity = slugify(cityName).toLowerCase();
  const cityKeys = Object.keys(DISTRICT_SEO_DATA);
  const cityKey = cityKeys.find(k => slugify(k).toLowerCase() === normalizedCity);

  if (!cityKey) return "";

  const normalizedDistrict = slugify(districtName).toLowerCase();
  const districtData = DISTRICT_SEO_DATA[cityKey];
  const districtKeys = Object.keys(districtData);

  const districtKey = districtKeys.find(k => slugify(k).toLowerCase() === normalizedDistrict);

  return districtKey ? districtData[districtKey] : "";
};
