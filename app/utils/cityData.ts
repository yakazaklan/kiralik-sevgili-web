export interface CityInfo {
  name: string;
  slug: string;
  activities: string[];
  socialSpots: string[];
  description: string;
  usageLogic: string;
  faqs: { q: string; a: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export const cities: CityInfo[] = [
  {
    name: "İstanbul",
    slug: "istanbul",
    seoTitle: "Boğaz'da Sosyal Arkadaşlık: İstanbul Kiralık Sevgili ve VIP Eşlik",
    seoDescription: "İstanbul'un metropol hayatında, Boğaz'da akşam yemeği veya Nişantaşı'nda elit etkinliklerde size eşlik edecek vizyon sahibi sosyal partnerler.",
    activities: ["Boğaz turunda akşam yemeği", "Nişantaşı'nda alışveriş ve kahve", "Karaköy'de sanat galerisi gezisi", "Kız Kulesi'ne karşı gün batımı izleme"],
    socialSpots: ["Bebek Sahili", "Galataport", "Bağdat Caddesi", "Ortaköy"],
    description: "İstanbul'da birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "İstanbul'da trafik ve yoğun iş temposu arasında sosyal kalmak zordur. Kiralık Sevgili, bu yoğunlukta size kaliteli zaman vadeden partnerlerle buluşturur.",
    faqs: [{ q: "İstanbul'da güvenli buluşma nasıl ayarlanır?", a: "Bebek veya Nişantaşı gibi popüler ve kalabalık noktaları tercih ederek güvenli bir ilk görüşme gerçekleştirebilirsiniz." }]
  },
  {
    name: "Ankara",
    slug: "ankara",
    seoTitle: "Ankara'da VIP Eşlik ve Sosyal Refakat | Tunalı ve Çayyolu İlanları",
    seoDescription: "Ankara'nın iş ve bürokrasi dünyasında sosyal bir nefes. Tunalı veya Çayyolu'nda size eşlik edecek en elit Ankara sosyal arkadaşlık ilanları.",
    activities: ["Tunalı Hilmi'de yürüyüş", "Eymir Gölü'nde bisiklet turu", "Atakule'de akşam yemeği", "Opera ve bale etkinliklerine katılım"],
    socialSpots: ["Arjantin Caddesi", "Bahçelievler 7. Cadde", "Kızılay", "Çayyolu"],
    description: "Ankara'da birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Ankara'da bürokrasi ve iş dünyasının yorgunluğunu, sosyal aktivitelerle atmak için platformumuzu kullanabilirsiniz.",
    faqs: [{ q: "Ankara'da hafta sonu ne yapılır?", a: "Eymir Gölü'nde kahvaltı veya Çayyolu'ndaki nezih mekanlarda akşam yemeği Ankara kullanıcılarımızın favorisidir." }]
  },
  {
    name: "İzmir",
    slug: "izmir",
    seoTitle: "İzmir Kordon Keyfi ve Sosyal Partner Arayanlar İçin Seçkin İlanlar",
    seoDescription: "İzmir Kordon'da gün batımı veya Alaçatı'da akşam yemeği. İzmir'in samimi atmosferine uygun sosyal refakatçi ilanlarını keşfedin.",
    activities: ["Kordon'd çimlerde gün batımı", "Alaçatı sokaklarında gezi", "Urla şarap tadım etkinlikleri", "Karşıyaka'da vapur turu"],
    socialSpots: ["Kordonboyu", "Alsancak Gül Sokak", "Bostanlı Sahili", "Çeşme Marina"],
    description: "İzmir'de sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "İzmir'in rahat ve samimi atmosferine uygun, hayattan keyif almayı bilen kullanıcılarla tanışın.",
    faqs: [{ q: "İzmir'de sosyal refakat popüler mi?", a: "Evet, özellikle etkinlik ve festival dönemlerinde İzmir'de sosyal eşlik hizmetine talep oldukça yüksektir." }]
  },
  {
    name: "Antalya",
    slug: "antalya",
    seoTitle: "Antalya Tatil Arkadaşı: Lara ve Konyaaltı'nda Size Eşlik Edecek Profiller",
    seoDescription: "Antalya tatilinize renk katacak, Kaleiçi veya Lara'da size eşlik edecek seçkin sosyal partnerler Antalya özel sayfasında.",
    activities: ["Kaleiçi'nde tarihi bir gezi", "Konyaaltı sahilinde yürüş", "Lara'da lüks bir akşam yemeği", "Düden Şelalesi ziyareti"],
    socialSpots: ["Kaleiçi Yat Limanı", "TerraCity AVM Çevresi", "Konyaaltı Sahil Yaşam Parkı"],
    description: "Antalya'da vakit geçirecek, etkinliklere katılacak veya size eşlik edecek seçkin ve profesyonel bir sosyal çevre keşfedin.",
    usageLogic: "Antalya'da hem tatilciler hem de yerleşikler için sosyal ağlarını genişletme fırsatı sunuyoruz.",
    faqs: [{ q: "Antalya'da yabancı dil bilen refakatçi var mı?", a: "Platformumuzdaki birçok profil turistik bir şehir olması nedeniyle İngilizce ve Rusça bilmektedir." }]
  },
  {
    name: "Alanya",
    slug: "alanya",
    seoTitle: "Alanya Tatil Arkadaşlığı | Kleopatra Plajı ve Kale Manzaralı Eşlik",
    seoDescription: "Alanya tatilinizi unutulmaz kılacak, gündüz plajda gece ise kalede size eşlik edecek vizyoner sosyal partner ilanları.",
    activities: ["Alanya Kalesi'nde manzara keyfi", "Kleopatra Plajı'nda güneşlenme", "Dim Çayı'nda serin bir gün", "Alanya Limanı'nda akşam yürüyüşü"],
    socialSpots: ["Damlataş Caddesi", "Alanya Yat Limanı", "Mahmutlar Sahil"],
    description: "Alanya'da birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Alanya'da yaz kış demeden sosyal kalmak isteyenler için özel olarak kurgulanmış bir deneyim.",
    faqs: [{ q: "Alanya'da etkinlik arkadaşı bulabilir miyim?", a: "Tabii ki, özellikle tekne turları ve gece etkinlikleri için Alanya'da birçok aktif kullanıcımız bulunmaktadır." }]
  },
  {
    name: "Bursa",
    slug: "bursa",
    seoTitle: "Uludağ ve Bursa'da Sosyal Refakat | Şehrin Elit Partnerleri",
    seoDescription: "Bursa'nın tarihi dokusunda veya Uludağ'da kış keyfinde size eşlik edecek partnerler. Bursa elit sosyal arkadaşlık platformu.",
    activities: ["Uludağ'da kayak keyfi", "Cumalıkızık'ta köy kahvaltısı", "Mudanya sahilinde akşam yemeği", "Tophane'de panoramik şehir izleme"],
    socialSpots: ["Fatih Sultan Mehmet Bulvarı", "Özlüce", "Heykel Çarşı"],
    description: "Bursa'da sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "Bursa'nın sanayi ve ticaret yoğunluğunda, hafta sonu kaçamaklarınıza eşlik edecek profiller için buradayız.",
    faqs: [{ q: "Bursa'da Uludağ gezisi için eşlikçi bulabilir miyim?", a: "Evet, kış sezonunda kayak ve doğa yürüyüşleri için birçok profil Bursa sayfamızda aktif olmaktadır." }]
  },
  {
    name: "Adana",
    slug: "adana",
    seoTitle: "Adana Sosyal Eşlik ve Gurme Turu Arkadaşlığı | VIP İlanlar",
    seoDescription: "Adana'nın meşhur lezzet duraklarında veya Seyhan Barajı kenarında size eşlik edecek, şehrin enerjisine uyumlu sosyal partnerler.",
    activities: ["Seyhan Baraj Gölü kenarında yürüyüş", "Meşhur Adana kebap restoranlarında akşam yemeği", "Merkez Park'ta kahve keyfi", "Misis Antik Kenti gezisi"],
    socialSpots: ["Turgut Özal Bulvarı", "Ziyapaşa Bulvarı", "Baraj Yolu", "Menderes Adası"],
    description: "Adana'da birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Adana'nın zengin mutfağını ve gece hayatını tek başına değil, kaliteli bir eşlikçiyle deneyimlemek isteyenler için.",
    faqs: [{ q: "Adana'da akşam yemeği eşlikçisi bulabilir miyim?", a: "Kesinlikle, Adana sayfamızda özellikle akşam yemeği ve gastronomi etkinliklerine katılmak isteyen birçok profil bulunmaktadır." }]
  },
  {
    name: "Muğla",
    slug: "mugla",
    seoTitle: "Bodrum ve Marmaris Tatil Eşliği | Muğla Sosyal Partner Arayanlar",
    seoDescription: "Ege'nin en popüler tatil rotalarında, Bodrum marinada veya Fethiye koylarında size eşlik edecek seçkin sosyal partnerler.",
    activities: ["Bodrum Kalesi gezisi", "Marmaris Marina'da akşam yemeği", "Fethiye Ölüdeniz'de tekne turu", "Akyaka'da azmak nehri turu"],
    socialSpots: ["Bodrum Marina", "Marmaris Barçın Sokağı", "Fethiye Kordon", "Göcek"],
    description: "Muğla'da vakit geçirecek, etkinliklere katılacak veya size eşlik edecek seçkin ve profesyonel bir sosyal çevre keşfedin.",
    usageLogic: "Tatilinizi daha sosyal ve eğlenceli hale getirmek, bilmediğiniz koyları ve mekanları bilen bir eşlikçiyle keşfetmek için ideal.",
    faqs: [{ q: "Yazlık bölgelerde refakatçi bulmak zor mu?", a: "Hayır, özellikle sezon boyunca Bodrum, Marmaris ve Fethiye bölgelerinde aktif kullanıcı sayımız oldukça yüksektir." }]
  },
  {
    name: "Eskişehir",
    slug: "eskisehir",
    seoTitle: "Eskişehir Sosyal Refakat ve Kültür Sanat Arkadaşlığı | Porsuk Çayı İlanları",
    seoDescription: "Anadolu'nun modern yüzü Eskişehir'de kültür sanat turları veya Porsuk kenarında bir kahve. Genç ve dinamik sosyal refakatçiler.",
    activities: ["Porsuk Çayı'nda gondol turu", "Odunpazarı modern müze gezisi", "Sazova Parkı'nda yürüyüş", "Haller Gençlik Merkezi'nde etkinlik"],
    socialSpots: ["Doktorlar Caddesi", "Adalar Mevkii", "Kanatlı AVM Çevresi", "Cassaba Modern"],
    description: "Eskişehir'de birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Şehrin kültürel etkinliklerine, tiyatro ve sergilerine birlikte gidebileceğiniz entelektüel partnerlerle tanışın.",
    faqs: [{ q: "Eskişehir'de öğrenci olmayan profiller var mı?", a: "Evet, platformumuzda her yaş grubundan ve farklı mesleklerden, Eskişehir'de yaşayan elit profiller bulunmaktadır." }]
  },
  {
    name: "Mersin",
    slug: "mersin",
    seoTitle: "Akdeniz Esintisi: Mersin Marina ve Sahil Sosyal Partnerleri",
    seoDescription: "Mersin Marina'da şık bir akşam yemeği veya sahil bandında keyifli bir yürüyüş. Mersin'in Akdeniz esintisine uygun ilanlar.",
    activities: ["Mersin Marina'da alışveriş ve yemek", "Kushimoto Sokağı'nda kahve keyfi", "Narlıkuyu'da kahvaltı", "Kızkalesi ziyareti"],
    socialSpots: ["Mersin Marina", "Adnan Menderes Bulvarı", "Yenişehir Sahil", "Forum Mersin"],
    description: "Mersin'de sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "Mersin'in geniş sosyal imkanlarını değerlendirirken size refakat edecek birini bulmak için platformumuzu kullanabilirsiniz.",
    faqs: [{ q: "Mersin'de güvenli buluşma noktaları nerelerdir?", a: "Mersin Marina ve Adnan Menderes Bulvarı üzerindeki kafeler en popüler ve güvenli buluşma alanlarıdır." }]
  },
  {
    name: "Gaziantep",
    slug: "gaziantep",
    seoTitle: "Gaziantep Gurme Turu ve Sosyal Refakat | Gastronomi Şehri İlanları",
    seoDescription: "Gaziantep'in dünyaca ünlü lezzetlerini keşfederken size eşlik edecek, sosyal adaptasyonu yüksek partnerler. Gurme turu arkadaşlığı.",
    activities: ["Zeugma Mozaik Müzesi gezisi", "Tarihi Bakırcılar Çarşısı turu", "Gurme restoranlarda akşam yemeği", "Erikçe Ormanı'nda yürüyüş"],
    socialSpots: ["Sanko Park Çevresi", "İbrahimli", "Primemall", "Kalyon Stadyumu Civarı"],
    description: "Gaziantep'te birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Şehrin zengin mutfak kültürünü ve tarihi dokusunu, vizyon sahibi bir eşlikçiyle deneyimleyin.",
    faqs: [{ q: "Gaziantep'te iş yemeği için refakatçi bulabilir miyim?", a: "Evet, platformumuzda iş dünyasına ve resmi davetlere eşlik edebilecek protokole hakim profiller mevcuttur." }]
  },
  {
    name: "Konya",
    slug: "konya",
    seoTitle: "Konya Kültürel Rehber ve Sosyal Eşlik | Mevlana Şehri VIP Partner",
    seoDescription: "Konya'nın huzurlu atmosferinde size eşlik edecek, kültürel etkinliklere katılabileceğiniz sosyal partnerler. Konya elit refakat platformu.",
    activities: ["Mevlana Müzesi ziyareti", "Meram Bağları'nda çay keyfi", "Tropikal Kelebek Bahçesi gezisi", "Sille Köyü turu"],
    socialSpots: ["KuleSite AVM", "Bosna Hersek Mahallesi", "Meram", "Zafer Meydanı"],
    description: "Konya'da birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Konya'nın geniş caddelerinde ve tarihi mekanlarında size eşlik edecek, saygılı ve vizyoner partnerlerle tanışın.",
    faqs: [{ q: "Konya'da sosyal etkinlikler kısıtlı mı?", a: "Hayır, Konya özellikle son yıllarda açılan modern kafeleri ve kültür merkezleriyle oldukça aktif bir sosyal hayata sahiptir." }]
  },
  {
    name: "Samsun",
    slug: "samsun",
    seoTitle: "Samsun Atakum Sahili Sosyal Arkadaşlık | Karadeniz Eşlik İlanları",
    seoDescription: "Atakum sahilinde yürüyüş veya Amisos Tepesi'nde manzara. Samsun'un dinamik yapısına uygun, sosyal çevrenizi genişletecek ilanlar.",
    activities: ["Atakum sahil bandında yürüyüş", "Amisos Tepesi'ne teleferik ile çıkış", "Bandırma Gemi Müzesi ziyareti", "Piazza AVM'de alışveriş"],
    socialSpots: ["Atakum Sahili", "Çiftlik Caddesi", "Türkiş", "Piazza"],
    description: "Samsun'da sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "Samsun'un modern yüzü Atakum'da veya şehrin tarihi noktalarında size eşlik edecek partnerler için en doğru adres.",
    faqs: [{ q: "Atakum bölgesinde buluşma ayarlamak güvenli mi?", a: "Atakum sahili, şehrin en sosyal ve kalabalık noktası olduğu için ilk buluşmalar için en çok tercih edilen, güvenli bir bölgedir." }]
  },
  {
    name: "Kayseri",
    slug: "kayseri",
    seoTitle: "Erciyes Kayak Eşliği ve Kayseri Sosyal Refakatçi İlanları",
    seoDescription: "Erciyes'te kayak keyfi veya Talas'ta tarihi bir yürüyüş. Kayseri'nin ticaret ve doğa odaklı yaşamına eşlik edecek elit partnerler.",
    activities: ["Erciyes Kayak Merkezi'nde vakit geçirme", "Talas tarihi sokaklarında yürüyüş", "Kayseri Kalesi ve Cumhuriyet Meydanı turu", "Mazakaland gezisi"],
    socialSpots: ["Talas Bahçelievler", "Alpaslan Mahallesi", "Kayseri Park", "Erciyes"],
    description: "Kayseri'de birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Erciyes'in tadını çıkarmak veya şehir merkezindeki şık mekanlarda vakit geçirmek için ideal bir partner bulun.",
    faqs: [{ q: "Kayseri'de Erciyes için günlük refakatçi bulunur mu?", a: "Evet, özellikle kış aylarında kayak sezonu boyunca Erciyes'te vakit geçirmek isteyen kullanıcılarımız yoğunlaşmaktadır." }]
  },
  {
    name: "Kocaeli",
    slug: "kocaeli",
    seoTitle: "Kartepe ve İzmit Sosyal Partner Arayanlar | Kocaeli VIP Eşlik",
    seoDescription: "İzmit Körfezi'nde sosyal bir gün. Kartepe'de kış keyfi veya Sekapark'ta yürüyüş için size eşlik edecek elit partnerler.",
    activities: ["Kartepe'de kayak", "Sekapark sahil yürüyüşü", "Maşukiye'de doğa kahvaltısı", "Ormanya gezisi"],
    socialSpots: ["Symbol AVM", "İzmit Yürüyüş Yolu", "Başiskele Sahil"],
    description: "Kocaeli'de birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "İş seyahatlerinizde veya hafta sonu doğa kaçamaklarınızda size eşlik edecek profesyonel partnerler.",
    faqs: [{ q: "Kartepe için eşlikçi bulabilir miyim?", a: "Evet, Kartepe kayak merkezi için kış sezonunda birçok aktif profilimiz mevcuttur." }]
  },
  {
    name: "Trabzon",
    slug: "trabzon",
    seoTitle: "Boztepe Manzarası ve Trabzon'da Sosyal Eşlik | Karadeniz VIP Partner",
    seoDescription: "Trabzon'un eşsiz yaylalarında veya Boztepe manzarasında size eşlik edecek sosyal partnerler. Karadeniz turu refakatçileri.",
    activities: ["Uzungöl turu", "Boztepe'de semaver keyfi", "Sümela Manastırı gezisi", "Ganita'da deniz havası"],
    socialSpots: ["Meydan Parkı", "Forum Trabzon", "Akçaabat Sahil"],
    description: "Trabzon'da sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "Yayla turlarınızda veya şehirdeki sosyal etkinliklerinizde yanınızda olacak vizyoner eşlikçiler.",
    faqs: [{ q: "Yaylalar için günlük refakat mümkün mü?", a: "Evet, bölgeyi bilen ve doğa gezilerine eşlik edebilecek kullanıcılarımız bulunmaktadır." }]
  },
  {
    name: "Denizli",
    slug: "denizli",
    seoTitle: "Pamukkale Travertenleri ve Denizli'de Seçkin Sosyal Refakat İlanları",
    seoDescription: "Pamukkale travertenleri veya Bağbaşı Yaylası'nda size eşlik edecek seçkin sosyal partnerler. Denizli elit arkadaşlık ilanları.",
    activities: ["Pamukkale traverten gezisi", "Denizli Teleferik ile yayla keyfi", "Hierapolis antik kent turu", "Çamlık yürüyüşü"],
    socialSpots: ["Çamlık", "Forum Çamlık", "Paü Kampüs Çevresi"],
    description: "Denizli'de birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Şehrin doğal güzelliklerini ve modern mekanlarını bir partnerle deneyimlemek isteyenler için.",
    faqs: [{ q: "Denizli'de öğrenci ağırlıklı mı?", a: "Üniversite şehri olması nedeniyle genç ve dinamik bir profil yapısına sahibiz." }]
  },
  {
    name: "Balıkesir",
    slug: "balikesir",
    seoTitle: "Ayvalık ve Cunda Adası Tatil Arkadaşlığı | Balıkesir Sosyal Partner",
    seoDescription: "Ayvalık, Cunda veya Edremit Körfezi'nde tatilinize renk katacak seçkin partnerler. Balıkesir özel refakat sayfası.",
    activities: ["Cunda Adası'nda akşam yemeği", "Şeytan Sofrası'nda gün batımı", "Avşa Adası gezisi", "Kaz Dağları doğa turu"],
    socialSpots: ["Ayvalık Marina", "Bahçelievler", "Paşaalanı"],
    description: "Balıkesir'de birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Körfez bölgesindeki tatilinizi veya şehir merkezindeki işlerinizi daha sosyal kılmak için ideal.",
    faqs: [{ q: "Ayvalık/Cunda bölgesinde aktif profil var mı?", a: "Evet, özellikle yaz döneminde bu bölgelerde yoğun bir kullanıcı kitlemiz bulunmaktadır." }]
  },
  {
    name: "Aydın",
    slug: "aydin",
    seoTitle: "Kuşadası Marina ve Aydın'da VIP Eşlik | Ege Sahil Arkadaşlığı",
    seoDescription: "Kuşadası Marina veya Didim sahillerinde size eşlik edecek enerjik sosyal partnerler. Aydın elit refakatçi ilanları.",
    activities: ["Kuşadası'nda tekne turu", "Didim Apollon Tapınağı gezisi", "Aydın merkezde kahve keyfi", "Dilek Yarımadası turu"],
    socialSpots: ["Kuşadası Setur Marina", "Adnan Menderes Bulvarı", "Altınkum"],
    description: "Aydın'da sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "Tatil bölgelerindeki etkinliklere tek katılmak istemeyenler için profesyonel sosyal çözümler.",
    faqs: [{ q: "Kuşadası için akşam yemeği eşlikçisi bulunur mu?", a: "Kesinlikle, marina ve çevresindeki mekanlar için birçok profilimiz mevcuttur." }]
  },
  {
    name: "Tekirdağ",
    slug: "tekirdag",
    seoTitle: "Trakya Bağ Yolu ve Tekirdağ Sahilinde Size Eşlik Edecek Profiller",
    seoDescription: "Tekirdağ sahilinde veya bağ rotalarında size eşlik edecek, Trakya'nın samimi atmosferine uygun sosyal partnerler.",
    activities: ["Sahil dolgu alanda yürüyüş", "Bağ evleri ziyareti", "Uçmakdere yamaç paraşütü izleme", "Köfte ziyafeti"],
    socialSpots: ["Hürriyet Mahallesi", "Tekira Çevresi", "Değirmenaltı"],
    description: "Tekirdağ'da birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Trakya gezilerinizde veya şehirdeki sosyal planlarınızda size eşlik edecek partnerler.",
    faqs: [{ q: "Tekirdağ'da bağ gezisi için eşlikçi bulunur mu?", a: "Evet, özellikle hafta sonu bağ rotaları için sosyal eşlik arayan kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Sakarya",
    slug: "sakarya",
    seoTitle: "Sapanca Gölü Huzuru ve Sakarya Serdivan Sosyal Partner Arayanlar",
    seoDescription: "Sapanca Gölü kenarında huzurlu bir gün veya Serdivan'da sosyal bir akşam. Sakarya'nın elit partner ilanları bu sayfada.",
    activities: ["Sapanca Gölü'nde kahvaltı", "Serdivan kafelerinde sohbet", "Poyrazlar Gölü gezisi", "Maşukiye turu"],
    socialSpots: ["Serdivan Mavi Durak", "Çark Caddesi", "Sapanca Sahil"],
    description: "Sakarya'da birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Üniversite şehri dinamizmi ve doğa huzurunu birlikte yaşayacağınız partnerler.",
    faqs: [{ q: "Sapanca için refakatçi bulabilir miyim?", a: "Sapanca bölgesi, hem yerel hem de hafta sonu gelen misafirlerimiz için popüler bir buluşma noktasıdır." }]
  },
  {
    name: "Manisa",
    slug: "manisa",
    seoTitle: "Manisa Spil Dağı ve Şehir Merkezinde VIP Sosyal Refakat Hizmeti",
    seoDescription: "Manisa'nın tarihi dokusunda veya Spil Dağı eteklerinde size eşlik edecek vizyoner sosyal partner ilanları.",
    activities: ["Spil Dağı gezisi", "Muradiye Camii ziyareti", "Magnesia AVM'de vakit geçirme", "Sultan Yaylası turu"],
    socialSpots: ["Magnesia Çevresi", "Güzelyurt", "Uncubozköy"],
    description: "Manisa'da sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "İzmir'e yakınlığı ve kendi sosyal dokusuyla Manisa'da elit refakat çözümleri.",
    faqs: [{ q: "Manisa merkezde güvenli mekanlar nerelerdir?", a: "Güzelyurt ve Uncubozköy bölgelerindeki nezih kafeler ilk buluşmalar için idealdir." }]
  },
  {
    name: "Hatay",
    slug: "hatay",
    seoTitle: "Antakya Gastronomi Turu ve Hatay Medeniyetler Sofrası Eşlikçileri",
    seoDescription: "Hatay'ın eşsiz lezzet duraklarında ve tarihi sokaklarında size eşlik edecek sosyal partnerler.",
    activities: ["Antakya sokaklarında gurme turu", "Harbiye Şelaleleri ziyareti", "Titus Tüneli gezisi", "Eski Antakya evlerinde kahve"],
    socialSpots: ["Saray Caddesi", "Atatürk Caddesi", "İskenderun Sahil"],
    description: "Hatay'da birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Hatay'ın eşsiz mutfağını ve kültürel mirasını tek başına değil, bir eşlikçiyle keşfedin.",
    faqs: [{ q: "İskenderun için ilan var mı?", a: "Evet, platformumuzda hem Antakya hem de İskenderun merkezli birçok aktif profil bulunmaktadır." }]
  },
  {
    name: "Şanlıurfa",
    slug: "sanliurfa",
    seoTitle: "Göbeklitepe ve Balıklıgöl Gezisi İçin Şanlıurfa Sosyal Refakatçi",
    seoDescription: "Şanlıurfa'da, tarihin sıfır noktası Göbeklitepe veya Balıklıgöl gezilerinizde size eşlik edecek sosyal partnerler.",
    activities: ["Göbeklitepe ziyareti", "Balıklıgöl'de yürüyüş", "Sıra gecesi etkinliğine katılım", "Halfeti tekne turu"],
    socialSpots: ["Bahçelievler", "Haliliye", "Piazza AVM", "Tarihi Gümrük Hanı"],
    description: "Şanlıurfa'da birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Şehrin mistik atmosferini ve eşsiz mutfağını bir partnerle deneyimleyerek sosyal çevrenizi genişletin.",
    faqs: [{ q: "Urfa'da sıra gecesine eşlikçi bulunur mu?", a: "Evet, kültürel etkinliklere ve sıra gecelerine eşlik edecek birçok profilimiz mevcuttur." }]
  },
  {
    name: "Malatya",
    slug: "malatya",
    seoTitle: "Malatya Kanalboyu ve Fahri Kayahan Bulvarı VIP Sosyal Partnerler",
    seoDescription: "Malatya'nın modern yüzünde, Kanalboyu veya Fahri Kayahan Bulvarı'nda size eşlik edecek elit partnerler.",
    activities: ["Kanalboyu'nda yürüyüş", "Aslantepe Höyüğü gezisi", "Kudret Havuzu ziyareti", "Şire Pazarı turu"],
    socialSpots: ["Fahri Kayahan Bulvarı", "Kanalboyu", "Malatya Park"],
    description: "Malatya'da sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "Şehirdeki sosyal etkinliklerde veya iş yemeklerinde size refakat edecek profesyonel partnerler.",
    faqs: [{ q: "Malatya'da buluşma noktaları nerelerdir?", a: "Fahri Kayahan Bulvarı üzerindeki kafeler ve Kanalboyu en popüler buluşma noktalarıdır." }]
  },
  {
    name: "Erzurum",
    slug: "erzurum",
    seoTitle: "Palandöken Kayak Partneri ve Erzurum Şehir Kültürü Eşlik İlanları",
    seoDescription: "Palandöken Kayak Merkezi'nde kış keyfi veya Çifte Minareli Medrese turunda size eşlik edecek elit partnerler.",
    activities: ["Palandöken'de kayak ve snowboard", "Çifte Minareli Medrese ziyareti", "Tortum Şelalesi gezisi", "Cağ kebabı tadımı"],
    socialSpots: ["Cumhuriyet Caddesi", "Yenişehir", "Palandöken Oteller Bölgesi"],
    description: "Erzurum'da birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Zirvede kayak yaparken veya şehirde vakit geçirirken yanınızda olacak, bölgeye hakim eşlikçiler.",
    faqs: [{ q: "Palandöken için günlük refakatçi var mı?", a: "Evet, kış sezonu boyunca kayak merkezinde aktif olan birçok kullanıcımız bulunmaktadır." }]
  },
  {
    name: "Mardin",
    slug: "mardin",
    seoTitle: "Eski Mardin Sokakları ve Mezopotamya Manzaralı Sosyal Eşlik",
    seoDescription: "Mardin'in masalsı sokaklarında veya Mezopotamya ovasına karşı bir akşam yemeğinde size eşlik edecek sosyal partnerler.",
    activities: ["Eski Mardin sokaklarında yürüyüş", "Deyrulzafaran Manastırı gezisi", "Mardin Kalesi manzarası eşliğinde kahve", "Dara Antik Kenti turu"],
    socialSpots: ["Eski Mardin", "Yenişehir", "Mardin AVM"],
    description: "Mardin'de birlikte zaman geçirmek, sosyal aktivitelere katılmak ve yeni insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Şehrin otantik dokusunu ve kültürel zenginliğini bir eşlikçiyle keşfetmek isteyenler için.",
    faqs: [{ q: "Eski Mardin'de akşam yemeği eşlikçisi bulunur mu?", a: "Kesinlikle, butik otellerin teras mekanları için sosyal eşlik arayan birçok profilimiz mevcuttur." }]
  },
  {
    name: "Nevşehir",
    slug: "nevsehir",
    seoTitle: "Kapadokya Balon Turu ve Nevşehir Sosyal Eşlik | Masalsı Tatil Partneri",
    seoDescription: "Kapadokya'nın büyüleyici atmosferinde, balon turu veya mağara otel yemeklerinde size eşlik edecek elit sosyal partnerler.",
    activities: ["Göreme balon turu izleme", "Ürgüp'te şarap tadımı", "Ihlara Vadisi yürüyüşü", "Avanos'ta çömlek yapımı"],
    socialSpots: ["Uçhisar Kalesi Çevresi", "Ortahisar", "Ürgüp Merkez"],
    description: "Nevşehir'de sosyal aktiviteler ve birlikte zaman geçirmek için size uygun profilleri keşfedin.",
    usageLogic: "Turistik gezilerinizi daha keyifli hale getirecek, bölgeyi bilen vizyoner eşlikçiler.",
    faqs: [{ q: "Balon turları için eşlikçi bulunur mu?", a: "Evet, sabahın erken saatlerindeki balon etkinlikleri için sosyal partnerlerimiz mevcuttur." }]
  },
  {
    name: "Rize",
    slug: "rize",
    seoTitle: "Fırtına Deresi ve Rize Yayla Turları İçin Doğa Tutkunu Sosyal Partner",
    seoDescription: "Rize'nin yeşil yaylalarında veya Fırtına Deresi kenarında size eşlik edecek, doğa tutkunu sosyal partnerler.",
    activities: ["Ayder Yaylası gezisi", "Zilkale ziyareti", "Fırtına Deresi'nde rafting izleme", "Çay bahçelerinde mola"],
    socialSpots: ["Rize Sahil", "Şimal AVM", "Ayder"],
    description: "Rize'de birlikte zaman geçirmek ve sosyal aktiviteler için yeni insanlarla tanışın.",
    usageLogic: "Doğu Karadeniz'in hırçın doğasında size refakat edecek profesyonel eşlikçiler.",
    faqs: [{ q: "Yayla konaklamalarında eşlik mümkün mü?", a: "Platformumuz sadece günlük sosyal etkinlik ve refakat odaklıdır." }]
  },
  {
    name: "Çanakkale",
    slug: "canakkale",
    seoTitle: "Bozcaada ve Çanakkale Kordon'da Gezi Arkadaşlığı | VIP Sosyal Refakat",
    seoDescription: "Çanakkale Kordon'da yürüyüş veya Bozcaada sokaklarında keyifli bir gün. Çanakkale'nin tarihi ve modern yüzüne eşlik edecek partnerler.",
    activities: ["Aynalı Çarşı gezisi", "Truva Atı önünde yürüyüş", "Bozcaada sokak turu", "Kordon'da gün batımı"],
    socialSpots: ["Çanakkale Kordon", "17 Burda AVM", "Bozcaada Feribot İskelesi"],
    description: "Çanakkale'de birlikte zaman geçirmek, sosyal aktivitelere katılmak ve new insanlarla tanışmak için KiralıkSevgili.net profillerini keşfedin.",
    usageLogic: "Kültürel gezilerinizi ve ada kaçamaklarınızı daha sosyal bir hale getirin.",
    faqs: [{ q: "Bozcaada için günlük refakatçi bulunur mu?", a: "Evet, özellikle yaz aylarında ada gezileri için birçok profilimiz aktiftir." }]
  },
  {
    name: "Edirne",
    slug: "edirne",
    seoTitle: "Selimiye ve Meriç Nehri Kıyısında Edirne Sosyal Partner İlanları",
    seoDescription: "Edirne'nin tarihi dokusunda, Meriç Nehri kenarında veya Selimiye çevresinde size eşlik edecek sosyal partnerler.",
    activities: ["Selimiye Camii ziyareti", "Meriç Nehri kenarında kahvaltı", "Karaağaç turu", "Saraçlar Caddesi yürüyüşü"],
    socialSpots: ["Saraçlar Caddesi", "Erasta AVM", "Karaağaç"],
    description: "Sınır şehri Edirne'nin kültürel zenginliğini bir partnerle keşfederek keyifli vakit geçirin.",
    usageLogic: "Trakya'nın bu tarihi şehrinde sosyal çevrenizi genişletecek elit refakat çözümleri.",
    faqs: [{ q: "Edirne merkezde güvenli buluşma yerleri nerelerdir?", a: "Saraçlar Caddesi ve Karaağaç'taki nezih kafeler en uygun noktalardır." }]
  },
  {
    name: "Afyonkarahisar",
    slug: "afyon",
    seoTitle: "Afyon Termal Tatil Arkadaşlığı ve Frig Vadisi Kültür Turu Eşliği",
    seoDescription: "Afyon'un termal otellerinde veya tarihi Frig Vadisi gezilerinizde size eşlik edecek seçkin sosyal partnerler.",
    activities: ["Termal tesislerde vakit geçirme", "Afyon Kalesi'ne çıkış", "Frig Vadisi turu", "Tarihi Afyon konakları gezisi"],
    socialSpots: ["Park Afyon AVM", "Ambaryolu", "Uydukent"],
    description: "Kavşak noktası Afyon'da, hem dinlenme hem de keşif odaklı sosyal eşlik ihtiyaçlarınız için buradayız.",
    usageLogic: "Termal tatilinizi veya şehirdeki kısa molalarınızı bir partnerle daha sosyal kılın.",
    faqs: [{ q: "Frig Vadisi turu için refakatçi bulunur mu?", a: "Evet, bölgeyi bilen ve geziye eşlik edebilecek kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Diyarbakır",
    slug: "diyarbakir",
    seoTitle: "Tarihi Sur İçi ve Diyarbakır Hevsel Bahçeleri Sosyal Partner Arayanlar",
    seoDescription: "Diyarbakır'ın binlerce yıllık tarihinde, Sur içi gezilerinde veya On Gözlü Köprü'de size eşlik edecek saygılı ve sosyal partnerler.",
    activities: ["Tarihi Sur gezisi", "Hevsel Bahçeleri yürüyüşü", "Hasan Paşa Hanı'nda kahvaltı", "Dicle Nehri kenarında çay"],
    socialSpots: ["Sur İçi", "Diclekent", "Kayapınar", "Ceylan Karavil Park"],
    description: "Medeniyetlerin buluşma noktası Diyarbakır'da, şehrin kültürel derinliğini birlikte keşfedeceğiniz partnerler.",
    usageLogic: "Doğu'nun Paris'inde sosyal çevrenizi genişletin ve tarihi anları bir partnerle paylaşın.",
    faqs: [{ q: "Diyarbakır'da sosyal refakat popüler mi?", a: "Evet, özellikle kültürel geziler için platformumuzda aktif profiller bulunmaktadır." }]
  },
  {
    name: "Zonguldak",
    slug: "zonguldak",
    seoTitle: "Karadeniz Sahili ve Zonguldak Fener Mevkii VIP Sosyal Eşlik İlanları",
    seoDescription: "Zonguldak fener mevkii veya sahil bandında size eşlik edecek, Karadeniz'in samimi ruhuna uygun sosyal partnerler.",
    activities: ["Gökgöl Mağarası gezisi", "Fener mahallesinde yürüyüş", "Kapuz plajında vakit geçirme", "Ereğli sahil turu"],
    socialSpots: ["Fener", "Westalife AVM Çevresi", "Ereğli Sahil"],
    description: "Emeğin başkenti Zonguldak'ta, deniz havası eşliğinde sosyal hayatınızı renklendirecek profiller.",
    usageLogic: "Liman kenti dinamizmini ve sahil huzurunu bir partnerle yaşayın.",
    faqs: [{ q: "Ereğli ilçesi için refakatçi var mı?", a: "Evet, Zonguldak merkez ve Ereğli ilçesinde aktif kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Bolu",
    slug: "bolu",
    seoTitle: "Abant ve Gölcük Tabiat Parkı Gezileri İçin Bolu Sosyal Partner Arayanlar",
    seoDescription: "Bolu'nun doğa harikaları Abant, Gölcük ve Yedigöller'de size eşlik edecek, doğa tutkunu sosyal partner ilanları.",
    activities: ["Abant Gölü etrafında yürüyüş", "Gölcük'te piknik", "Yedigöller doğa fotoğrafçılığı", "Kartalkaya'da kayak"],
    socialSpots: ["İzzet Baysal Caddesi", "14 Burda AVM", "Abant"],
    description: "Doğa turizminin kalbi Bolu'da, eşsiz göl manzaralarına karşı size refakat edecek vizyoner partnerler.",
    usageLogic: "Hafta sonu doğa kaçamaklarınızı veya kayak tatilinizi bir eşlikçiyle daha keyifli hale getirin.",
    faqs: [{ q: "Yedigöller gezisi için eşlikçi bulunur mu?", a: "Evet, özellikle bahar aylarında doğa gezileri için birçok aktif profilimiz mevcuttur." }]
  },
  {
    name: "Isparta",
    slug: "isparta",
    seoTitle: "Gül Hasadı ve Eğirdir Gölü Keyfi İçin Isparta Sosyal Eşlik Partnerleri",
    seoDescription: "Isparta'nın mis kokulu gül bahçelerinde veya Eğirdir Gölü kenarında size eşlik edecek, enerjisi yüksek sosyal partnerler.",
    activities: ["Gül ve lavanta bahçeleri gezisi", "Eğirdir Gölü'nde tekne turu", "Davraz Kayak Merkezi'nde kış keyfi", "Kirazlıdere yürüyüşü"],
    socialSpots: ["Iyaşpark", "Kafeler Caddesi", "Eğirdir Sahil"],
    description: "Göller yöresinin incisi Isparta'da, sosyal yaşamınıza renk katacak ve etkinliklerinize eşlik edecek partnerler.",
    usageLogic: "Gül hasadı döneminde veya Davraz'da kayak yaparken yanınızda olacak sosyal eşlikçiler.",
    faqs: [{ q: "Eğirdir için günlük refakatçi bulunur mu?", a: "Evet, Eğirdir Gölü çevresindeki aktiviteler için kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Sivas",
    slug: "sivas",
    seoTitle: "Gök Medrese ve Sivas Tarihi Meydanı Gezileri İçin Sosyal Refakatçi",
    seoDescription: "Sivas'ın tarihi meydanında, Selçuklu eserleri arasında veya Paşabahçe mesire alanında size eşlik edecek vizyon sahibi partnerler.",
    activities: ["Çifte Minareli Medrese ziyareti", "Paşabahçe'de piknik", "Sivas Kalesi manzarası", "Hobbit Evleri gezisi"],
    socialSpots: ["İstasyon Caddesi", "Atatürk Kongre Müzesi Çevresi", "Primemall"],
    description: "Cumhuriyetin temellerinin atıldığı Sivas'ta, tarihi dokuya uygun sosyal refakat seçenekleri.",
    usageLogic: "Şehrin geniş meydanlarında ve tarihi caddelerinde size eşlik edecek partnerlerle tanışın.",
    faqs: [{ q: "Sivas merkezde güvenli buluşma noktaları nerelerdir?", a: "İstasyon Caddesi üzerindeki popüler kafeler ilk görüşme için en ideal yerlerdir." }]
  },
  {
    name: "Van",
    slug: "van",
    seoTitle: "Van Gölü Akdamar Adası Turu ve Şehirde VIP Sosyal Arkadaşlık İlanları",
    seoDescription: "Van Gölü'nün eşsiz maviliğinde veya Akdamar Adası gezilerinizde size eşlik edecek, bölgeyi bilen vizyoner sosyal partner ilanları.",
    activities: ["Akdamar Adası tekne turu", "Van Kalesi'nde gün batımı", "Van Kahvaltısı etkinliği", "Muradiye Şelalesi gezisi"],
    socialSpots: ["Cumhuriyet Caddesi", "Maraş Caddesi", "Edremit Sahil"],
    description: "Doğu'nun incisi Van'da, hem tarihi mekanlarda hem de göl kenarında size eşlik edecek elit profilleri keşfedin.",
    usageLogic: "Meşhur Van kahvaltısından kale gezilerine kadar her anınıza değer katacak sosyal eşlikçiler.",
    faqs: [{ q: "Edremit sahilinde buluşma uygun mu?", a: "Evet, Edremit sahil bandı Van'ın en nezih sosyal alanlarından biridir." }]
  },
  {
    name: "Ordu",
    slug: "ordu",
    seoTitle: "Boztepe Teleferik ve Ordu Sahil Yürüyüşleri İçin Sosyal Eşlik Partneri",
    seoDescription: "Ordu Boztepe'de eşsiz manzara eşliğinde veya Karadeniz sahilinde size eşlik edecek enerjik ve elit sosyal partnerler.",
    activities: ["Teleferik ile Boztepe'ye çıkış", "Yason Burnu gezisi", "Ordu sahilinde yürüyüş", "Çambaşı Yaylası turu"],
    socialSpots: ["Fidangör", "Ordu Sahili", "Boztepe"],
    description: "Mavinin ve yeşilin buluştuğu Ordu'da, sosyal aktivitelerinizi bir partnerle paylaşarak keyfinizi ikiye katlayın.",
    usageLogic: "Şehrin ikonik noktası Boztepe'de veya sahil kafelerinde size refakat edecek vizyoner eşlikçiler.",
    faqs: [{ q: "Boztepe için eşlikçi bulunur mu?", a: "Evet, özellikle manzara keyfi ve akşam yemekleri için Boztepe'de aktif partnerlerimiz mevcuttur." }]
  },
  {
    name: "Kahramanmaraş",
    slug: "kahramanmaras",
    seoTitle: "Maraş Lezzet Durakları ve Başkonuş Yaylası Sosyal Etkinlik Partneri",
    seoDescription: "Kahramanmaraş'ın meşhur lezzet duraklarında veya Başkonuş Yaylası'nda size eşlik edecek saygılı ve vizyoner partnerler.",
    activities: ["Tarihi Maraş Çarşısı turu", "Başkonuş Yaylası doğa gezisi", "Dondurma tadım etkinlikleri", "Menzelet Barajı tekne turu"],
    socialSpots: ["Piazza AVM", "Yatılı Bölge", "Tekerek", "Bin Evler"],
    description: "Gastronomi ve doğanın merkezi Kahramanmaraş'da, sosyal çevrenizi genişletecek elit refakat seçenekleri.",
    usageLogic: "Şehrin geleneksel dokusunu ve modern kafelerini bir partnerle deneyimlemek isteyenler için.",
    faqs: [{ q: "Maraş çarşı turu için refakatçi var mı?", a: "Evet, şehrin tarihi noktalarını birlikte gezebileceğiniz partnerlerimiz bulunmaktadır." }]
  },
  {
    name: "Kütahya",
    slug: "kutahya",
    seoTitle: "Aizanoi Antik Kenti ve Kütahya Çini Sanatı Gezileri İçin Sosyal Eşlik",
    seoDescription: "Kütahya'nın tarihi çini atölyelerinde veya Aizanoi Antik Kenti gezilerinizde size eşlik edecek entelektüel sosyal partnerler.",
    activities: ["Aizanoi Antik Kenti gezisi", "Çini Müzesi ziyareti", "Germiyan Sokağı yürüyüşü", "Ilıca termal tatili"],
    socialSpots: ["Sera AVM", "Sevgi Yolu", "Menderes Bulvarı"],
    description: "Sanatın ve tarihin iç içe olduğu Kütahya'da, kültürel etkinliklerinize eşlik edecek seçkin profiller.",
    usageLogic: "Şehrin tarihi atmosferini ve termal imkanlarını bir partnerle daha sosyal hale getirin.",
    faqs: [{ q: "Antik kent gezisi için refakatçi bulunur mu?", a: "Evet, tarih gezilerine ilgi duyan ve eşlik edebilecek kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Amasya",
    slug: "amasya",
    seoTitle: "Yeşilırmak Yalıboyu Evleri ve Amasya Krallar Kaya Mezarları Eşlikçileri",
    seoDescription: "Şehzadeler şehri Amasya'da, Yeşilırmak kenarında veya tarihi konaklarda size eşlik edecek vizyon sahibi sosyal partnerler.",
    activities: ["Krallar Kaya Mezarları ziyareti", "Yeşilırmak kenarında yürüyüş", "Hazeranlar Konağı gezisi", "Ferhat ile Şirin Aşıklar Müzesi"],
    socialSpots: ["Şehzadeler Yolu", "Yalıboyu Evleri Çevresi", "Apple AVM"],
    description: "Tarihin her sokakta hissedildiği Amasya'da, bu romantik ve tarihi atmosferi bir partnerle paylaşın.",
    usageLogic: "Yeşilırmak'ın gece ışıkları altında veya tarihi mekanlarda size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Yalıboyu kafelerinde buluşma güvenli mi?", a: "Amasya'nın en popüler ve güvenli sosyal alanı Yalıboyu bölgesidir." }]
  },
  {
    name: "Adıyaman",
    slug: "adiyaman",
    seoTitle: "Nemrut Dağı Gün Batımı ve Adıyaman Kültür Turları İçin Sosyal Partner",
    seoDescription: "Dünyanın sekizinci harikası Nemrut Dağı'nda gün batımını veya Cendere Köprüsü'nü birlikte keşfedeceğiniz vizyoner partnerler.",
    activities: ["Nemrut Dağı zirvesinde gün batımı", "Cendere Köprüsü gezisi", "Arsemia Antik Kenti turu", "Perre Antik Kenti ziyareti"],
    socialSpots: ["Gölbaşı Caddesi", "Adıyaman Park AVM", "Demokrasi Parkı"],
    description: "Kommagene Krallığı'nın topraklarında, tarihi zirvelere yapacağınız yolculuklarda size eşlik edecek sosyal partnerler.",
    usageLogic: "Nemrut seyahatinizi veya şehirdeki sosyal vakitlerinizi bir eşlikçiyle daha anlamlı kılın.",
    faqs: [{ q: "Nemrut turu için refakatçi bulunur mu?", a: "Evet, özellikle gün doğumu ve gün batımı turları için sosyal partnerlerimiz mevcuttur." }]
  },
  {
    name: "Karabük",
    slug: "karabuk",
    seoTitle: "Safranbolu Tarihi Evleri ve Karabük Şehir Turu İçin Sosyal Refakatçi",
    seoDescription: "Tarihi Safranbolu evleri arasında veya Kristal Teras'ta size eşlik edecek, kültürel birikimi yüksek sosyal partner ilanları.",
    activities: ["Safranbolu eski çarşı turu", "Kristal Teras'ta manzara keyfi", "Bulak Mencilis Mağarası gezisi", "Yörük Köyü ziyareti"],
    socialSpots: ["Safranbolu Eski Çarşı", "100. Yıl Mahallesi", "Kares AVM"],
    description: "UNESCO Dünya Mirası listesindeki Safranbolu'da, tarih kokan sokakları bir partnerle keşfetmenin tadını çıkarın.",
    usageLogic: "Karabük'ün tarihi dokusunda ve modern alanlarında size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Safranbolu'da akşam yemeği için uygun yerler var mı?", a: "Eski Çarşı'daki tarihi konaklar, güvenli ve elit bir buluşma için en çok tercih edilen noktalardır." }]
  },
  {
    name: "Yalova",
    slug: "yalova",
    seoTitle: "Çınarcık Sahili ve Yalova Termal Tesislerinde VIP Sosyal Eşlik Partneri",
    seoDescription: "Yalova Termal'de dinlendirici bir gün veya Çınarcık sahillerinde eğlence. Yalova'nın elit sosyal partnerleri burada.",
    activities: ["Termal kaplıcalarda vakit geçirme", "Yürüyen Köşk ziyareti", "Çınarcık sahil yürüyüşü", "Erikli Yaylası doğa turu"],
    socialSpots: ["Yalova Sahil Bandı", "Star AVM", "Çınarcık"],
    description: "İstanbul'un yanı başında, doğa ve termal turizmin merkezi Yalova'da sosyal çevrenizi genişletin.",
    usageLogic: "Kısa tatillerinizde veya termal dinlenme süreçlerinizde size eşlik edecek vizyoner partnerler.",
    faqs: [{ q: "Çınarcık sahili için refakatçi var mı?", a: "Özellikle yaz aylarında Çınarcık bölgesinde aktif kullanıcı sayımız artmaktadır." }]
  },
  {
    name: "Batman",
    slug: "batman",
    seoTitle: "Hasankeyf Tarihi ve Batman Dicle Nehri Kıyısında Sosyal Partner İlanları",
    seoDescription: "Batman Hasankeyf'in yeni yüzünde veya Dicle Nehri kıyısında size eşlik edecek, saygılı ve vizyoner sosyal partnerler.",
    activities: ["Yeni Hasankeyf müze turu", "Dicle Nehri tekne gezisi", "Batman Park'ta kahve keyfi", "Malabadi Köprüsü ziyareti"],
    socialSpots: ["Batman Park Çevresi", "Turgut Özal Bulvarı", "Gültepe"],
    description: "Güneydoğu Anadolu'nun hızla gelişen şehri Batman'da, modern ve sosyal bir çevre için buradayız.",
    usageLogic: "Şehirdeki iş seyahatlerinizde veya sosyal etkinliklerinizde size refakat edecek elit partnerler.",
    faqs: [{ q: "Batman'da güvenli buluşma noktaları nerelerdir?", a: "Turgut Özal Bulvarı ve Gültepe mahallesindeki nezih kafeler en uygun seçeneklerdir." }]
  },
  {
    name: "Kırklareli",
    slug: "kirklareli",
    seoTitle: "İğneada Longoz Ormanları ve Kırklareli Doğa Turları Sosyal Arkadaşlık",
    seoDescription: "Kırklareli İğneada'da doğa ile baş başa veya Dupnisa Mağarası'nda keşif. Trakya'nın elit sosyal partner ilanları.",
    activities: ["İğneada Longoz Ormanları gezisi", "Dupnisa Mağarası turu", "Kıyıköy sahil yürüyüşü", "Lüleburgaz kültür gezisi"],
    socialSpots: ["İstasyon Caddesi", "Lüleburgaz LYFA", "İğneada Sahil"],
    description: "Doğanın en saf haliyle buluştuğu Kırklareli'de, huzurlu ve sosyal bir vakit geçirmek için ideal partnerler.",
    usageLogic: "Trakya'nın saklı cennetlerinde size eşlik edecek, doğa tutkunu sosyal refakatçiler.",
    faqs: [{ q: "Longoz ormanları turu için eşlikçi bulunur mu?", a: "Evet, doğa gezilerine ve outdoor aktivitelere meraklı profillerimiz mevcuttur." }]
  },
  {
    name: "Uşak",
    slug: "usak",
    seoTitle: "Ulubey Kanyonu ve Uşak Karun Hazinesi Müze Gezisi Sosyal Partnerleri",
    seoDescription: "Dünyanın en büyük ikinci kanyonu Ulubey'de veya Karun Hazinesi müze gezisinde size eşlik edecek sosyal partnerler.",
    activities: ["Ulubey Kanyonu cam teras gezisi", "Uşak Arkeoloji Müzesi ziyareti", "Blaundus Antik Kenti turu", "Atapark yürüyüşü"],
    socialSpots: ["Atapark", "İsmet Paşa Caddesi", "Festiva AVM"],
    description: "Tarihin ve doğal devasa oluşumların merkezi Uşak'ta, keşiflerinizi bir partnerle paylaşın.",
    usageLogic: "Kanyon gezilerinizi ve müze ziyaretlerinizi daha sosyal bir deneyime dönüştürün.",
    faqs: [{ q: "Ulubey Kanyonu için refakatçi bulunur mu?", a: "Evet, kanyon gezisi ve çevresindeki sosyal alanlar için kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Ağrı",
    slug: "agri",
    seoTitle: "İshak Paşa Sarayı ve Ağrı Dağı Eteklerinde Sosyal Arkadaşlık",
    seoDescription: "Ağrı'nın görkemli tarihi yapılarında veya doğa turlarında size eşlik edecek, bölgeye hakim sosyal partnerler.",
    activities: ["İshak Paşa Sarayı gezisi", "Ağrı Dağı tırmanış eşliği", "Meteor Çukuru ziyareti", "Balık Gölü'nde vakit geçirme"],
    socialSpots: ["Cumhuriyet Caddesi", "Ağrı Park", "İbrahim Çeçen Üniversitesi Çevresi"],
    description: "Anadolu'nun zirvesi Ağrı'da, tarihi ve doğal güzellikleri bir partnerle keşfederek unutulmaz anılar biriktirin.",
    usageLogic: "Zirvelere olan yolculuğunuzda veya şehir merkezindeki sosyal vakitlerinizde size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "İshak Paşa Sarayı için refakatçi bulunur mu?", a: "Evet, özellikle tarihi geziler için bölgeyi bilen partnerlerimiz mevcuttur." }]
  },
  {
    name: "Artvin",
    slug: "artvin",
    seoTitle: "Borçka Karagöl ve Artvin Yaylalarında Doğa Tutkunu Sosyal Partnerler",
    seoDescription: "Artvin'in eşsiz doğasında, Karagöl veya Şavşat yaylalarında size eşlik edecek, enerjik ve doğasever sosyal partnerler.",
    activities: ["Borçka Karagöl gezisi", "Şavşat Karagöl yürüyüşü", "Mençuna Şelalesi ziyareti", "Artvin Kalesi manzarası"],
    socialSpots: ["İnönü Caddesi", "Atatepe", "Hopa Sahil"],
    description: "Yeşilin her tonunu barındıran Artvin'de, doğa yürüyüşlerinizi ve sosyal aktivitelerinizi bir partnerle paylaşın.",
    usageLogic: "Karadeniz'in hırçın ve güzel doğasında size eşlik edecek, vizyoner ve enerjik partnerler.",
    faqs: [{ q: "Yayla gezileri için refakatçi bulunur mu?", a: "Evet, doğa turlarına ilgi duyan ve eşlik edebilecek kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Bilecik",
    slug: "bilecik",
    seoTitle: "Osmanlı'nın Kuruluş Şehri Bilecik'te Tarihi Sosyal Refakat İlanları",
    seoDescription: "Bilecik ve Söğüt'te, tarihin izlerini takip ederken size eşlik edecek, saygılı ve vizyoner sosyal partnerler.",
    activities: ["Şeyh Edebali Türbesi ziyareti", "Söğüt Ertuğrul Gazi turu", "Pelitözü Göleti yürüyüşü", "Bilecik Müzesi gezisi"],
    socialSpots: ["Tevfik Bey Caddesi", "Bilecik Park AVM", "Pelitözü"],
    description: "Tarihin başladığı topraklarda, kültürel mirasımızı bir partnerle keşfederek keyifli bir gün geçirin.",
    usageLogic: "Şehrin manevi atmosferinde ve modern sosyal alanlarında size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Söğüt gezisi için refakatçi bulunur mu?", a: "Evet, tarihi noktalara eşlik edebilecek bilinçli partnerlerimiz bulunmaktadır." }]
  },
  {
    name: "Bingöl",
    slug: "bingol",
    seoTitle: "Yüzen Adalar ve Bingöl Hesarek Kayak Merkezi Sosyal Arkadaşlık",
    seoDescription: "Bingöl'ün eşsiz Yüzen Adaları'nda veya Hesarek Kayak Merkezi'nde size eşlik edecek, bölgenin ruhuna uygun partnerler.",
    activities: ["Yüzen Adalar ziyareti", "Hesarek Kayak Merkezi'nde kış keyfi", "Kös Kaplıcaları'nda dinlenme", "Çır Şelalesi gezisi"],
    socialSpots: ["Genç Caddesi", "Bingöl Üniversitesi Çevresi", "Bingöl Park"],
    description: "Doğu Anadolu'nun saklı güzelliklerini barındıran Bingöl'de, sosyal yaşamınızı renklendirecek elit profiller.",
    usageLogic: "Kayak sezonunda veya doğa keşiflerinde size eşlik edecek profesyonel sosyal partnerler.",
    faqs: [{ q: "Hesarek için günlük refakatçi bulunur mu?", a: "Kış sezonu boyunca kayak merkezinde vakit geçirmek isteyen kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Bitlis",
    slug: "bitlis",
    seoTitle: "Nemrut Krater Gölü ve Ahlat Selçuklu Mezarlığı Sosyal Refakat",
    seoDescription: "Bitlis'in tarihi Ahlat ilçesinde veya Nemrut Krater Gölü'nün eşsiz manzarasında size eşlik edecek vizyoner partnerler.",
    activities: ["Nemrut Krater Gölü gezisi", "Ahlat Selçuklu Meydan Mezarlığı ziyareti", "Bitlis Kalesi turu", "Tatvan sahil yürüyüşü"],
    socialSpots: ["Tatvan Sahil Bandı", "Bitlis Merkez", "Tatvan Yaşam AVM"],
    description: "Tarihin ve doğanın kucaklaştığı Bitlis'te, keşiflerinizi bir partnerle paylaşarak sosyal çevrenizi genişletin.",
    usageLogic: "Van Gölü kıyısında veya tarihi mekanlarda size refakat edecek, bölgeye hakim eşlikçiler.",
    faqs: [{ q: "Tatvan sahilinde buluşma uygun mu?", a: "Evet, Tatvan sahili bölgenin en popüler ve nezih sosyal alanlarından biridir." }]
  },
  {
    name: "Burdur",
    slug: "burdur",
    seoTitle: "Salda Gölü (Türkiye'nin Maldivleri) ve Sagalassos Sosyal Eşlik",
    seoDescription: "Salda Gölü'nün beyaz kumsallarında veya Sagalassos Antik Kenti'nde size eşlik edecek, enerjisi yüksek sosyal partnerler.",
    activities: ["Salda Gölü'nde vakit geçirme", "Sagalassos Antik Kenti gezisi", "İnsuyu Mağarası turu", "Burdur Gölü kenarında kahve"],
    socialSpots: ["İstasyon Caddesi", "Cumhuriyet Meydanı", "Burdur Müzesi Çevresi"],
    description: "Eşsiz doğasıyla büyüleyen Burdur'da, sosyal aktivitelerinizi bir partnerle taçlandırın.",
    usageLogic: "Turistik gezilerinizi ve şehirdeki sosyal anlarınızı daha keyifli kılacak vizyoner eşlikçiler.",
    faqs: [{ q: "Salda Gölü gezisi için refakatçi bulunur mu?", a: "Evet, özellikle yaz aylarında Salda ve çevresi için aktif kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Çankırı",
    slug: "cankiri",
    seoTitle: "Tarihi Tuz Mağarası ve Çankırı Kalesi Gezileri İçin Sosyal Partner",
    seoDescription: "Çankırı'nın şifalı Tuz Mağarası'nda veya tarihi sokaklarında size eşlik edecek, saygılı ve vizyon sahibi partnerler.",
    activities: ["Tuz Mağarası gezisi", "Çankırı Kalesi ziyareti", "Taşmescit turu", "Ilgaz Dağı kış keyfi"],
    socialSpots: ["Anıt Alanı", "Çankırı Park AVM", "Ilgaz"],
    description: "Anadolu'nun sakin ve huzurlu şehri Çankırı'da, sosyal yaşamınıza renk katacak elit profiller.",
    usageLogic: "Kültürel gezilerinizde veya Ilgaz Dağı kaçamaklarınızda size refakat edecek profesyonel eşlikçiler.",
    faqs: [{ q: "Tuz Mağarası turu için refakatçi var mı?", a: "Evet, şehrin turistik noktalarını birlikte keşfedebileceğiniz partnerlerimiz bulunmaktadır." }]
  },
  {
    name: "Çorum",
    slug: "corum",
    seoTitle: "Hattuşaş Antik Kenti ve Çorum Müzesi Gezileri İçin Sosyal Refakatçi",
    seoDescription: "Hititlerin başkenti Hattuşaş'ta tarihe yolculuk yaparken size eşlik edecek, entelektüel ve sosyal partnerler.",
    activities: ["Hattuşaş ve Yazılıkaya gezisi", "Çorum Müzesi ziyareti", "İncesu Kanyonu yürüyüşü", "Çorum Kalesi turu"],
    socialSpots: ["Gazi Caddesi", "AHL Park AVM", "Hürriyet Meydanı"],
    description: "Medeniyetlerin beşiği Çorum'da, tarihi derinlikleri bir partnerle keşfetmenin ayrıcalığını yaşayın.",
    usageLogic: "Dünya mirası alanlarını gezerken veya şehir merkezinde vakit geçirirken yanınızda olacak elit eşlikçiler.",
    faqs: [{ q: "Hattuşaş gezisi için günlük refakatçi bulunur mu?", a: "Evet, tarih ve kültür gezilerine ilgi duyan partnerlerimiz mevcuttur." }]
  },
  {
    name: "Elazığ",
    slug: "elazig",
    seoTitle: "Harput Kalesi ve Hazar Gölü Kıyısında Elazığ Sosyal Partner İlanları",
    seoDescription: "Tarihi Harput mahallesinde veya Hazar Gölü kenarında size eşlik edecek, Elazığ'ın samimi ruhuna uygun partnerler.",
    activities: ["Harput Kalesi ve Ulu Cami ziyareti", "Hazar Gölü'nde tekne turu", "Çırçır Şelalesi gezisi", "Kapalı Çarşı turu"],
    socialSpots: ["Gazi Caddesi", "Elazığ Park 23 AVM", "Hazar Gölü Sahili"],
    description: "Gakgoşlar diyarı Elazığ'da, hem tarihi hem de modern sosyal alanlarda size eşlik edecek seçkin profiller.",
    usageLogic: "Şehrin kültürel dokusunu ve doğal güzelliklerini bir partnerle paylaşarak sosyal çevrenizi genişletin.",
    faqs: [{ q: "Harput'ta akşam yemeği için refakatçi bulunur mu?", a: "Evet, Harput'un eşsiz manzarasında vakit geçirmek isteyen kullanıcılarımız mevcuttur." }]
  },
  {
    name: "Erzincan",
    slug: "erzincan",
    seoTitle: "Girlevik Şelalesi ve Erzincan Doğa Sporları İçin Sosyal Arkadaşlık",
    seoDescription: "Erzincan'ın doğa harikası Girlevik Şelalesi'nde veya Ergan Dağı'nda size eşlik edecek, enerjik sosyal partnerler.",
    activities: ["Girlevik Şelalesi gezisi", "Ergan Dağı'nda kayak", "Karanlık Kanyon turu", "Ekşisu Mesire Alanı ziyareti"],
    socialSpots: ["Ordu Caddesi", "Erzincan Park AVM", "Ergan Dağı"],
    description: "Doğa sporlarının ve huzurun şehri Erzincan'da, aktivitelerinize değer katacak partnerlerle tanışın.",
    usageLogic: "Adrenalin dolu kanyon gezilerinde veya sakin doğa yürüyüşlerinde yanınızda olacak elit eşlikçiler.",
    faqs: [{ q: "Ergan Dağı için kayak partneri bulunur mu?", a: "Kış sezonu boyunca kayak ve snowboard tutkunu kullanıcılarımız aktiftir." }]
  },
  {
    name: "Giresun",
    slug: "giresun",
    seoTitle: "Giresun Adası ve Kümbet Yaylası Gezileri İçin Sosyal Eşlik Partneri",
    seoDescription: "Karadeniz'in tek adası olan Giresun Adası'nda veya sisli yaylalarda size eşlik edecek, vizyoner sosyal partnerler.",
    activities: ["Giresun Adası tekne turu", "Kümbet Yaylası gezisi", "Giresun Kalesi manzara keyfi", "Tirebolu Kalesi ziyareti"],
    socialSpots: ["Gazi Caddesi", "Giresun Sahil", "Atapark"],
    description: "Mavinin ve yeşilin en saf haliyle buluştuğu Giresun'da, sosyal yaşamınızı bir partnerle renklendirin.",
    usageLogic: "Fındık diyarının eşsiz yaylalarında ve sahil şeridinde size refakat edecek seçkin eşlikçiler.",
    faqs: [{ q: "Giresun Kalesi'nde buluşma uygun mu?", a: "Evet, kale mevkii şehrin en güzel manzaralı ve güvenli sosyal alanlarından biridir." }]
  },
  {
    name: "Gümüşhane",
    slug: "gumushane",
    seoTitle: "Karaca Mağarası ve Gümüşhane Yayla Turları İçin Sosyal Partner",
    seoDescription: "Dünyaca ünlü Karaca Mağarası'nda veya Zigana Dağı'nda size eşlik edecek, doğa tutkunu sosyal partnerler.",
    activities: ["Karaca Mağarası gezisi", "Zigana Yaylası turu", "Limni Gölü ziyareti", "Süleymaniye Mahallesi yürüyüşü"],
    socialSpots: ["Atatürk Caddesi", "Gümüşhane Üniversitesi Çevresi", "Zigana"],
    description: "Gümüş şehri Gümüşhane'de, doğanın kalbinde size eşlik edecek elit ve vizyoner profilleri keşfedin.",
    usageLogic: "Sarp dağların arasındaki saklı güzellikleri bir partnerle keşfederek sosyal çevrenizi genişletin.",
    faqs: [{ q: "Karaca Mağarası için refakatçi bulunur mu?", a: "Evet, bölgeyi bilen ve geziye eşlik edebilecek partnerlerimiz mevcuttur." }]
  },
  {
    name: "Hakkari",
    slug: "hakkari",
    seoTitle: "Cilo Dağları ve Hakkari Doğa Keşifleri İçin Sosyal Refakat İlanları",
    seoDescription: "Hakkari'nin el değmemiş doğasında and heybetli dağ turlarında size eşlik edecek, dayanıklı ve sosyal partnerler.",
    activities: ["Cilo Dağları manzara izleme", "Merga Bütan Kayak Merkezi kış keyfi", "Zap Suyu kenarında vakit geçirme", "Seyit Taha Hazretleri Türbesi ziyareti"],
    socialSpots: ["Bulvar Caddesi", "Hakkari Merkez", "Merga Bütan"],
    description: "Türkiye'nin en yüksek noktalarından biri olan Hakkari'de, doğa ile iç içe sosyal bir deneyim yaşayın.",
    usageLogic: "Zirvelerdeki huzuru veya şehir merkezindeki samimi ortamı bir partnerle paylaşmak isteyenler için.",
    faqs: [{ q: "Hakkari merkezde güvenli buluşma yerleri nerelerdir?", a: "Bulvar Caddesi üzerindeki nezih kafeler ilk görüşme için en uygun noktalardır." }]
  },
  {
    name: "Kars",
    slug: "kars",
    seoTitle: "Ani Harabeleri ve Sarıkamış Kayak Keyfi İçin Kars Sosyal Partnerleri",
    seoDescription: "Doğu Ekspresi'nin son durağı Kars'ta, Ani Harabeleri'nde veya kristal karlı Sarıkamış'ta size eşlik edecek seçkin partnerler.",
    activities: ["Ani Harabeleri gezisi", "Sarıkamış'ta kristal karda kayak", "Çıldır Gölü'nde atlı kızak turu", "Kars Kalesi ziyareti"],
    socialSpots: ["Faikbey Caddesi", "Kars Kalesi Çevresi", "Sarıkamış Oteller Bölgesi"],
    description: "Tarihin ve kış masalının buluştuğu Kars'ta, unutulmaz anlarınıza eşlik edecek vizyoner partnerler.",
    usageLogic: "Baltık mimarisi sokaklarda yürürken veya donmuş göl üzerinde vakit geçirirken yanınızda olacak elit eşlikçiler.",
    faqs: [{ q: "Çıldır Gölü turu için refakatçi bulunur mu?", a: "Özellikle kış aylarında göl üzerindeki etkinlikler için aktif kullanıcılarımız bulunmaktadır." }]
  },
  {
    name: "Kastamonu",
    slug: "kastamonu",
    seoTitle: "Ilgaz Dağı ve Kastamonu Tarihi Konakları Sosyal Refakat İlanları",
    seoDescription: "Kastamonu'nun tarihi dokusunda veya Ilgaz Dağı'nın eşsiz doğasında size eşlik edecek, saygılı sosyal partnerler.",
    activities: ["Valla Kanyonu gezisi", "Ilgaz Dağı Milli Parkı turu", "Kastamonu Kalesi ziyareti", "Tarihi konaklarda akşam yemeği"],
    socialSpots: ["Cumhuriyet Caddesi", "Barutçuoğlu AVM", "Ilgaz"],
    description: "Evliyalar şehri Kastamonu'da, hem manevi atmosferi hem de doğal güzellikleri bir partnerle keşfedin.",
    usageLogic: "Şehrin tarihi sokaklarında yürürken veya kanyon gezilerinde size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Valla Kanyonu için refakatçi bulunur mu?", a: "Evet, doğa yürüyüşlerine ve kanyon gezilerine meraklı partnerlerimiz mevcuttur." }]
  },
  {
    name: "Kırşehir",
    slug: "kirsehir",
    seoTitle: "Ahi Evran Şehri Kırşehir'de Kültürel Sosyal Eşlik Partnerleri",
    seoDescription: "Kırşehir'in tarihi camilerinde veya Terme kaplıcalarında size eşlik edecek, bölgenin kültürüne hakim partnerler.",
    activities: ["Ahi Evran Camii ziyareti", "Cacabey Medresesi gezisi", "Seyfe Gölü kuş gözlemi", "Termal tesislerde vakit geçirme"],
    socialSpots: ["Ankara Caddesi", "Terme Caddesi", "Kırşehir Park AVM"],
    description: "Ozanlar diyarı Kırşehir'de, kültürel etkinliklerinizi ve sosyal vakitlerinizi bir partnerle taçlandırın.",
    usageLogic: "Şehrin huzurlu atmosferinde ve tarihi mekanlarında size refakat edecek profesyonel eşlikçiler.",
    faqs: [{ q: "Cacabey Medresesi gezisi için refakatçi var mı?", a: "Evet, tarihi ve kültürel gezilere eşlik edebilecek partnerlerimiz bulunmaktadır." }]
  },
  {
    name: "Muş",
    slug: "mus",
    seoTitle: "Muş Ovası ve Tarihi Murat Köprüsü Gezileri İçin Sosyal Partner",
    seoDescription: "Muş'un geniş ovalarında veya tarihi Murat Köprüsü manzarasında size eşlik edecek, saygılı ve vizyoner partnerler.",
    activities: ["Tarihi Murat Köprüsü gezisi", "Muş Kalesi ziyareti", "Muş Ovası'nda lale izleme (mevsimlik)", "Yıldız Alparslan Tarım İşletmesi turu"],
    socialSpots: ["İstasyon Caddesi", "Atatürk Bulvarı", "Muş Merkez"],
    description: "Anadolu'nun kadim şehirlerinden Muş'ta, sosyal yaşamınıza değer katacak elit profillerle tanışın.",
    usageLogic: "Şehrin tarihi dokusunda veya doğal alanlarında size refakat edecek seçkin eşlikçiler.",
    faqs: [{ q: "Murat Köprüsü'nde buluşma uygun mu?", a: "Evet, köprü çevresi sosyal aktiviteler ve manzara için tercih edilen bir noktadır." }]
  },
  {
    name: "Niğde",
    slug: "nigde",
    seoTitle: "Aladağlar Doğa Turları ve Niğde Şehir Kültürü Sosyal Refakatçi",
    seoDescription: "Niğde'nin heybetli Aladağlar'ında veya tarihi Gümüşler Manastırı'nda size eşlik edecek, doğa tutkunu partnerler.",
    activities: ["Aladağlar Milli Parkı gezisi", "Gümüşler Manastırı ziyareti", "Niğde Kalesi ve Saat Kulesi turu", "Roma Havuzu ziyareti"],
    socialSpots: ["Bor Caddesi", "Niğde Ömer Halisdemir Üniversitesi Çevresi", "Niğde Park AVM"],
    description: "Medeniyetlerin yaşatıldığı şehir Niğde'de, sosyal aktivitelerinizi bir partnerle daha keyifli hale getirin.",
    usageLogic: "Doğa tırmanışlarında veya şehir merkezindeki şık mekanlarda size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Aladağlar gezisi için refakatçi bulunur mu?", a: "Evet, outdoor aktivitelere ve doğa gezilerine eşlik edebilecek partnerlerimiz mevcuttur." }]
  },
  {
    name: "Siirt",
    slug: "siirt",
    seoTitle: "Tillo Maneviyat Turu ve Siirt Veysel Karani Sosyal Eşlik İlanları",
    seoDescription: "Siirt'in manevi ikliminde, Tillo veya Veysel Karani ziyaretlerinizde size eşlik edecek, saygılı sosyal partnerler.",
    activities: ["Veysel Karani Türbesi ziyareti", "Tillo Kalesi ve Işık Hadisesi izleme", "Siirt Ulu Cami turu", "Botan Çayı kenarında vakit geçirme"],
    socialSpots: ["Güres Caddesi", "Siirt Park AVM", "Tillo"],
    description: "Tarihin ve inancın harmanlandığı Siirt'te, sosyal çevrenizi vizyoner partnerlerle genişletin.",
    usageLogic: "Şehrin manevi noktalarını keşfederken veya merkezde vakit geçirirken yanınızda olacak elit eşlikçiler.",
    faqs: [{ q: "Güres Caddesi'nde buluşma uygun mu?", a: "Siirt'in en canlı ve sosyal caddesi olan Güres, ilk buluşmalar için en ideal noktadır." }]
  },
  {
    name: "Sinop",
    slug: "sinop",
    seoTitle: "Sinop Tarihi Cezaevi ve Hamsilos Koyu İçin Sosyal Eşlik Partneri",
    seoDescription: "Karadeniz'in en kuzey ucu Sinop'ta, Hamsilos Koyu veya tarihi cezaevinde size eşlik edecek, vizyoner partnerler.",
    activities: ["Sinop Tarihi Cezaevi gezisi", "Hamsilos Koyu ve İnceburun turu", "Sinop Kalesi'nde manzara keyfi", "Erfelek Şelaleleri yürüyüşü"],
    socialSpots: ["Sakarya Caddesi", "Sinop Sahil Bandı", "Karakum"],
    description: "Mutluluğun şehri Sinop'ta, eşsiz deniz manzaraları eşliğinde sosyal yaşamınızı renklendirin.",
    usageLogic: "Fiyort benzeri koyları keşfederken veya kordon boyunda yürürken size refakat edecek seçkin eşlikçiler.",
    faqs: [{ q: "Sinop sahilinde güvenli mekanlar var mı?", a: "Sahil bandı boyunca birçok nezih kafe ve restoran bulunmaktadır." }]
  },
  {
    name: "Tokat",
    slug: "tokat",
    seoTitle: "Ballıca Mağarası ve Tokat Kalesi Gezileri İçin Sosyal Refakatçi",
    seoDescription: "Tokat'ın doğa harikası Ballıca Mağarası'nda veya tarihi sokaklarında size eşlik edecek, saygılı ve vizyoner partnerler.",
    activities: ["Ballıca Mağarası gezisi", "Tokat Kalesi ve saat kulesi turu", "Tarihi Yazmacılar Çarşısı ziyareti", "Kaz Gölü kuş gözlemi"],
    socialSpots: ["Gaziosmanpaşa Bulvarı", "Novada Tokat AVM", "Tokat Merkez"],
    description: "Tarih ve doğanın iç içe geçtiği Tokat'ta, keşiflerinizi bir partnerle paylaşarak sosyal çevrenizi genişletin.",
    usageLogic: "Şehrin tarihi dokusunda veya doğal alanlarında size refakat edecek seçkin eşlikçiler.",
    faqs: [{ q: "Ballıca Mağarası turu için refakatçi bulunur mu?", a: "Evet, bölgeyi bilen ve geziye eşlik edebilecek partnerlerimiz mevcuttur." }]
  },
  {
    name: "Tunceli",
    slug: "tunceli",
    seoTitle: "Munzur Vadisi ve Tunceli Doğa Turları İçin Sosyal Eşlik Partneri",
    seoDescription: "Tunceli Munzur Çayı kıyısında veya Munzur Gözeleri'nde size eşlik edecek, doğasever ve sosyal partnerler.",
    activities: ["Munzur Vadisi Milli Parkı gezisi", "Munzur Gözeleri ziyareti", "Pülümür Çayı kenarında vakit geçirme", "Ovacık yayla turu"],
    socialSpots: ["Tunceli Merkez Sahil", "Mameki Köprüsü Çevresi", "Munzur Çayı Kenarı"],
    description: "Eşsiz doğası ve özgün kültürüyle Tunceli'de, doğa yürüyüşlerinizi bir partnerle paylaşın.",
    usageLogic: "Hırçın nehirlerin ve ulu dağların arasında size refakat edecek, vizyoner ve enerjik partnerler.",
    faqs: [{ q: "Munzur Çayı kenarında buluşma uygun mu?", a: "Evet, nehir kıyısındaki sosyal alanlar vakit geçirmek için oldukça popülerdir." }]
  },
  {
    name: "Yozgat",
    slug: "yozgat",
    seoTitle: "Yozgat Çamlığı ve Tarihi Roma Hamamı Sosyal Refakat İlanları",
    seoDescription: "Türkiye'nin ilk milli parkı Yozgat Çamlığı'nda veya Sarıkaya Roma Hamamı'nda size eşlik edecek vizyoner partnerler.",
    activities: ["Yozgat Çamlığı Milli Parkı yürüyüşü", "Sarıkaya Roma Hamamı gezisi", "Çapanoğlu Camii ziyareti", "Yozgat Müzesi turu"],
    socialSpots: ["Lise Caddesi", "Yozgat Park AVM", "Yozgat Şehir Meydanı"],
    description: "Anadolu'nun kalbinde, doğa ve tarihin buluştuğu Yozgat'ta sosyal yaşamınıza değer katacak elit profiller.",
    usageLogic: "Şehrin huzurlu atmosferinde ve tarihi mekanlarında size refakat edecek profesyonel eşlikçiler.",
    faqs: [{ q: "Yozgat Çamlığı'nda buluşma uygun mu?", a: "Milli park alanı, doğa yürüyüşü ve sosyal vakit için en çok tercih edilen güvenli bölgedir." }]
  },
  {
    name: "Aksaray",
    slug: "aksaray",
    seoTitle: "Ihlara Vadisi ve Aksaray Selime Manastırı Sosyal Eşlik Partnerleri",
    seoDescription: "Aksaray'ın doğa harikası Ihlara Vadisi'nda veya Selime Manastırı'nda size eşlik edecek, kültür ve doğa tutkunu partnerler.",
    activities: ["Ihlara Vadisi yürüyüşü", "Selime Manastırı gezisi", "Eğri Minare ziyareti", "Hasandağı manzara izleme"],
    socialSpots: ["Ebulfez Elçibey Caddesi", "Nora City AVM", "Aksaray Üniversitesi Çevresi"],
    description: "Kapadokya'nın giriş kapısı Aksaray'da, tarihi vadileri bir partnerle keşfetmenin keyfini çıkarın.",
    usageLogic: "Vadi yürüyüşlerinde veya şehir merkezindeki sosyal alanlarda size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Ihlara Vadisi gezisi için refakatçi bulunur mu?", a: "Evet, doğa ve tarih turlarına eşlik edebilecek partnerlerimiz mevcuttur." }]
  },
  {
    name: "Bayburt",
    slug: "bayburt",
    seoTitle: "Bayburt Kalesi ve Baksı Müzesi Sosyal Refakat İlanları",
    seoDescription: "Bayburt'un tarihi kalesinde veya dünyaca ünlü Baksı Müzesi'nde size eşlik edecek, sanat ve tarih sever partnerler.",
    activities: ["Bayburt Kalesi gezisi", "Baksı Müzesi ziyareti", "Çoruh Nehri kenarında vakit geçirme", "Aydıntepe Yeraltı Şehri turu"],
    socialSpots: ["Cumhuriyet Caddesi", "Çoruh Nehri Kıyısı", "Bayburt Merkez"],
    description: "Sanatın ve tarihin harmanlandığı Bayburt'ta, sosyal çevrenizi vizyoner partnerlerle genişletin.",
    usageLogic: "Şehrin kültürel derinliğini keşfederken veya merkezde vakit geçirirken yanınızda olacak elit eşlikçiler.",
    faqs: [{ q: "Baksı Müzesi gezisi için refakatçi var mı?", a: "Sanat turlarına ilgi duyan ve eşlik edebilecek partnerlerimiz bulunmaktadır." }]
  },
  {
    name: "Karaman",
    slug: "karaman",
    seoTitle: "Karaman Kalesi ve Tartan Evi Gezileri İçin Sosyal Partner",
    seoDescription: "Türkçenin başkenti Karaman'da, tarihi kalede veya Tartan Evi'nde size eşlik edecek, saygılı ve vizyoner partnerler.",
    activities: ["Karaman Kalesi ziyareti", "Tartan Evi ve müze turu", "Aktekke Camii ziyareti", "Taşkale Manazan Mağaraları gezisi"],
    socialSpots: ["İstasyon Caddesi", "Karaman Park AVM", "Mevlana Caddesi"],
    description: "Tarihi ve kültürel birikimiyle Karaman'da, sosyal aktivitelerinizi bir partnerle taçlandırın.",
    usageLogic: "Şehrin tarihi dokusunda ve modern sosyal alanlarında size refakat edecek profesyonel eşlikçiler.",
    faqs: [{ q: "Karaman merkezde güvenli buluşma noktaları nerelerdir?", a: "İstasyon Caddesi üzerindeki nezih kafeler ilk görüşme için en ideal noktalardır." }]
  },
  {
    name: "Kırıkkale",
    slug: "kirikkale",
    seoTitle: "Kırıkkale Silah Müzesi ve Celal Bayar Parkı Sosyal Eşlik Partnerleri",
    seoDescription: "Kırıkkale'nin modern parklarında veya Silah Müzesi gezilerinizde size eşlik edecek, vizyoner sosyal partnerler.",
    activities: ["Silah Müzesi ziyareti", "Celal Bayar Parkı yürüyüşü", "Hasandede Türbesi ziyareti", "Kızılırmak kenarında vakit geçirme"],
    socialSpots: ["Millet Bulvarı", "Podium AVM", "Kırıkkale Şehir Meydanı"],
    description: "Ankara'nın yanı başında gelişen Kırıkkale'de, sosyal yaşamınıza renk katacak elit profillerle tanışın.",
    usageLogic: "Şehirdeki sosyal etkinliklerde veya kısa molalarınızda size refakat edecek seçkin eşlikçiler.",
    faqs: [{ q: "Kırıkkale'de buluşma noktaları nerelerdir?", a: "Podium AVM ve çevresindeki kafeler sosyal vakit geçirmek için en popüler yerlerdir." }]
  },
  {
    name: "Şırnak",
    slug: "sirnak",
    seoTitle: "Cudi Dağı Manzarası ve Şırnak Şehir Kültürü Sosyal Refakatçi",
    seoDescription: "Şırnak'ın tarihi noktalarında veya Cudi Dağı manzarasında size eşlik edecek, saygılı ve vizyoner partnerler.",
    activities: ["Nuh Peygamber Türbesi ziyareti", "Cizre Ejder Kalesi turu", "Kasrik Boğazı gezisi", "Şırnak Merkez yürüyüşü"],
    socialSpots: ["Atatürk Mahallesi", "Cizre Sanat Sokağı", "Şırnak Merkez"],
    description: "Kadim medeniyetlerin izlerini taşıyan Şırnak'ta, sosyal çevrenizi elit partnerlerle genişletin.",
    usageLogic: "Şehrin tarihi dokusunu keşfederken veya merkezde vakit geçirirken yanınızda olacak elit eşlikçiler.",
    faqs: [{ q: "Cizre ilçesi için refakatçi bulunur mu?", a: "Evet, Cizre merkezli aktif kullanıcılarımız platformumuzda mevcuttur." }]
  },
  {
    name: "Bartın",
    slug: "bartin",
    seoTitle: "Amasra Sahili ve Bartın Irmağı Gezileri İçin Sosyal Eşlik Partneri",
    seoDescription: "Karadeniz'in incisi Amasra'da veya Bartın Irmağı kenarında size eşlik edecek, enerjik ve vizyoner partnerler.",
    activities: ["Amasra Kalesi ve Kemere Köprüsü gezisi", "Bartın Irmağı'nda tekne turu", "İnkumu plajında yürüyüş", "Kuşkayası Yol Anıtı ziyareti"],
    socialSpots: ["Amasra Küçük Liman", "Bartın Şehir Merkezi", "İnkumu"],
    description: "Tarihin denizle buluştuğu Bartın'da, sahil keyfinizi ve gezi planlarınızı bir partnerle paylaşın.",
    usageLogic: "Amasra'nın romantik atmosferinde veya Bartın'ın yeşil doğasında size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Amasra'da akşam yemeği için refakatçi bulunur mu?", a: "Evet, balık restoranları ve manzara keyfi için partnerlerimiz oldukça aktiftir." }]
  },
  {
    name: "Ardahan",
    slug: "ardahan",
    seoTitle: "Çıldır Gölü Kış Masalı ve Ardahan Kalesi Sosyal Refakat İlanları",
    seoDescription: "Ardahan'ın kışın donan Çıldır Gölü'nde veya tarihi kalesinde size eşlik edecek, saygılı ve vizyoner partnerler.",
    activities: ["Çıldır Gölü'nde buz balıkçılığı izleme", "Ardahan Kalesi ziyareti", "Yalnızçam Kayak Merkezi turu", "Şeytan Kalesi gezisi"],
    socialSpots: ["Kongre Caddesi", "Ardahan Merkez", "Çıldır"],
    description: "Sınır şehri Ardahan'ın eşsiz doğasında ve tarihi mekanlarında size eşlik edecek seçkin profiller.",
    usageLogic: "Kışın donmuş göl üzerinde veya yazın yaylalarda size refakat edecek profesyonel eşlikçiler.",
    faqs: [{ q: "Çıldır Gölü için kışın refakatçi bulunur mu?", a: "Evet, göl üzerindeki kış aktivitelerine eşlik edebilecek partnerlerimiz mevcuttur." }]
  },
  {
    name: "Iğdır",
    slug: "igdir",
    seoTitle: "Ağrı Dağı Manzarası ve Iğdır Şehir Kültürü Sosyal Eşlik Partnerleri",
    seoDescription: "Iğdır'ın bereketli topraklarında, Ağrı Dağı'nın eşsiz manzarasında size eşlik edecek vizyoner partnerler.",
    activities: ["Ağrı Dağı manzara izleme", "Soykırım Anıtı ziyareti", "Tuzluca Tuz Mağaraları gezisi", "Iğdır Kayısı Bahçeleri turu"],
    socialSpots: ["Vali Yolu", "Iğdır Merkez", "Haydar Aliyev Parkı"],
    description: "Üç ülkeye komşu olan Iğdır'da, sosyal yaşamınızı ve gezi rotalarınızı bir partnerle renklendirin.",
    usageLogic: "Şehrin en popüler noktası Vali Yolu'nda veya doğa gezilerinde size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Vali Yolu'nda buluşma uygun mu?", a: "Iğdır'ın en nezih ve sosyal caddesi olan Vali Yolu, ilk görüşmeler için en ideal noktadır." }]
  },
  {
    name: "Kilis",
    slug: "kilis",
    seoTitle: "Kilis Tarihi Evleri ve Gastronomi Turu İçin Sosyal Refakatçi",
    seoDescription: "Kilis'in dar sokaklarındaki tarihi evlerde veya eşsiz mutfak kültüründe size eşlik edecek saygılı partnerler.",
    activities: ["Tarihi Kilis evleri turu", "Ravanda Kalesi gezisi", "Kilis mutfağı gurme tadımı", "Sabun Müzesi ziyareti"],
    socialSpots: ["Cumhuriyet Caddesi", "Kilis Merkez", "7 Aralık Üniversitesi Çevresi"],
    description: "Gastronomi şehri Kilis'te, yöresel lezzetleri ve tarihi dokuyu bir partnerle keşfedin.",
    usageLogic: "Şehrin samimi atmosferinde ve lezzet duraklarında size refakat edecek profesyonel eşlikçiler.",
    faqs: [{ q: "Ravanda Kalesi gezisi için refakatçi bulunur mu?", a: "Evet, tarihi noktalara eşlik edebilecek partnerlerimiz bulunmaktadır." }]
  },
  {
    name: "Osmaniye",
    slug: "osmaniye",
    seoTitle: "Karatepe-Aslantaş ve Osmaniye Doğa Turları İçin Sosyal Partner",
    seoDescription: "Osmaniye'nin tarihi Karatepe-Aslantaş Açık Hava Müzesi'nde veya yaylalarında size eşlik edecek vizyoner partnerler.",
    activities: ["Karatepe-Aslantaş gezisi", "Kastabala Antik Kenti turu", "Zorkun Yaylası yürüyüşü", "Osmaniye Kent Müzesi ziyareti"],
    socialSpots: ["Akyar Caddesi", "Park 328 AVM", "Osmaniye Şehir Meydanı"],
    description: "Fıstık diyarı Osmaniye'de, tarihi ve doğal güzellikleri bir partnerle paylaşarak keyifli vakit geçirin.",
    usageLogic: "Antik kent gezilerinde veya yayla havası alırken yanınızda olacak elit eşlikçiler.",
    faqs: [{ q: "Park 328 AVM çevresi buluşma için uygun mu?", a: "Evet, AVM ve çevresindeki kafeler şehrin en popüler sosyal alanlarıdır." }]
  },
  {
    name: "Düzce",
    slug: "duzce",
    seoTitle: "Samandere Şelalesi ve Düzce Güzeldere Doğa Turları Sosyal Eşlik",
    seoDescription: "Düzce'nin gürleyen şelalelerinde veya rafting heyecanında size eşlik edecek, enerjik ve sosyal partnerler.",
    activities: ["Samandere ve Güzeldere Şelalesi gezisi", "Melen Çayı'nda rafting eşliği", "Efteni Gölü kuş gözlemi", "Konuralp Antik Kenti turu"],
    socialSpots: ["İstanbul Caddesi", "Krempark AVM", "Düzce Üniversitesi Çevresi"],
    description: "İstanbul ve Ankara'nın ortasında bir doğa cenneti olan Düzce'de, aktivitelerinize değer katacak partnerler.",
    usageLogic: "Doğa sporlarında veya sakin göl manzarası eşliğinde size refakat edecek elit eşlikçiler.",
    faqs: [{ q: "Rafting için eşlikçi bulunur mu?", a: "Evet, macera sporlarına ilgi duyan ve eşlik edebilecek partnerlerimiz mevcuttur." }]
  }
];

export function getCityBySlug(slug: string): CityInfo | undefined {
  if (!slug) return undefined;
  return cities.find(c => c.slug === slug.toLowerCase());
}

export function generateCityName(slug: string): string {
  const city = getCityBySlug(slug);
  if (city) return city.name;
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}
