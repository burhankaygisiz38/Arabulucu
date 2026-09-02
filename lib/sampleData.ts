import { MediationCaseData } from '@/types/mediation';

export const SAMPLE_CASES: Record<string, { label: string; description: string; data: MediationCaseData; rawText: string }> = {
  isci_isveren: {
    label: 'İşçi İşveren (Dava Şartı)',
    description: '7036 sayılı İş Mahkemeleri Kanunu m.3 gereğince işçilik alacakları (Kıdem, İhbar, Fazla Çalışma)',
    data: {
      processType: 'dava_sarti',
      disputeType: 'isci_isveren',
      disputeSubject: 'Kıdem tazminatı, ihbar tazminatı, fazla mesai ücreti, ulusal bayram ve genel tatil (UBGT) ücreti alacağı',
      buroAdi: 'İstanbul Arabuluculuk Bürosu',
      buroDosyaNo: '2026/14258',
      arabuluculukDosyaNo: '2026/3890',
      basvuruTarihi: '18.08.2026',
      gorevlendirmeTarihi: '20.08.2026',
      basvurucu: {
        adSoyadUnvan: 'Ahmet YILMAZ',
        tcVkn: '12345678901',
        adres: 'Mecidiyeköy Mah. Şehit Er Cihan Namlı Cad. No:14 D:5 Şişli / İSTANBUL',
        telefon: '0532 111 22 33',
        eposta: 'ahmet.yilmaz@email.com',
        vekilAdi: 'Av. Mehmet DEMİR',
        vekilBaro: 'İstanbul',
        vekilBaroSicilNo: '45892',
        vekilAdres: 'Çağlayan Mah. Vatan Cad. Hukukçular Plaza K:4 No:12 Kağıthane / İSTANBUL',
      },
      karsiTaraf: {
        adSoyadUnvan: 'Yıldız Lojistik ve Ticaret A.Ş.',
        tcVkn: '9870054321',
        adres: 'İkitelli OSB Mah. Enkoop Sanayi Sitesi 1. Cad. No:28 Başakşehir / İSTANBUL',
        telefon: '0212 555 44 00',
        eposta: 'muhasebe@yildizlojistik.com.tr',
        vekilAdi: 'Av. Zeynep KAYA',
        vekilBaro: 'İstanbul',
        vekilBaroSicilNo: '51204',
        vekilAdres: 'Levent Mah. Büyükdere Cad. Plazalar Bölgesi No:185 Beşiktaş / İSTANBUL',
      },
      arabulucu: {
        adSoyad: 'Av. Burhan KAYGISIZ',
        sicilNo: '18492',
        iletisim: '0555 999 88 77 - arabulucu@burhankaygisiz.av.tr',
        telefon: '0555 999 88 77',
        eposta: 'arabulucu@burhankaygisiz.av.tr',
        adres: 'Merkez Mah. Abide-i Hürriyet Cad. No:82 Kat:3 Şişli / İSTANBUL',
      },
      toplantiTarihi: '08.09.2026',
      toplantiSaati: '14:30',
      toplantiYeri: 'İstanbul Arabuluculuk Merkezi Görüşme Odası 2 (Şişli / İSTANBUL)',
      toplantiTuru: 'fiziki',
      anlasmamaNedeni: 'Taraflar talep konusu kıdem ve fazla mesai alacak kalemlerinin hesabı ve teklif edilen tasfiye bedeli üzerinde mutabakat sağlayamamışlardır.',
      anlasmaSartlari: {
        odenecekTutar: '285.000,00 TL (İki Yüz Seksen Beş Bin Türk Lirası)',
        odemeSekli: '2 (iki) eşit taksitte banka havalesi ile',
        odemeTarihleri: '1. Taksit (142.500,00 TL): 25.09.2026 tarihinde, 2. Taksit (142.500,00 TL): 25.10.2026 tarihinde',
        alacakliIban: 'TR56 0006 2000 0001 2345 6789 01',
        alacakliBanka: 'Garanti BBVA Şişli Şubesi',
        alacakliHesapSahibi: 'Ahmet YILMAZ',
        ibraVeFeragatMetni: 'Başvurucu, belirtilen 285.000,00 TL tutarın takvimine uygun olarak ödenmesi halinde, iş sözleşmesinden ve iş ilişkisinden kaynaklanan kıdem, ihbar, fazla çalışma, UBGT, yıllık izin ve her ne nam altında olursa olsun tüm hak ve alacaklarından feragat ettiğini ve karşı tarafı gayrikabili rücu ibra ettiğini kabul ve taahhüt eder.',
      },
    },
    rawText: `T.C. İSTANBUL ARABULUCULUK BÜROSU
Büro Dosya No: 2026/14258
Arabuluculuk Dosya No: 2026/3890
Başvuru Tarihi: 18.08.2026

BAŞVURUCU: Ahmet YILMAZ (T.C. 12345678901)
Adres: Mecidiyeköy Mah. Şehit Er Cihan Namlı Cad. No:14 D:5 Şişli / İSTANBUL
Vekili: Av. Mehmet DEMİR (İstanbul Barosu - Sicil: 45892)

KARŞI TARAF: Yıldız Lojistik ve Ticaret A.Ş. (VKN: 9870054321)
Adres: İkitelli OSB Mah. Enkoop Sanayi Sitesi 1. Cad. No:28 Başakşehir / İSTANBUL
Vekili: Av. Zeynep KAYA (İstanbul Barosu - Sicil: 51204)

ARABULUCU: Av. Burhan KAYGISIZ (Sicil No: 18492)
Uyuşmazlık Türü: İşçi İşveren (Dava Şartı)
Talep Konusu: Kıdem tazminatı, ihbar tazminatı, fazla mesai ve genel tatil ücreti alacaklarının tahsili talebidir.`,
  },

  ticari: {
    label: 'Ticari (Dava Şartı)',
    description: '6102 sayılı TTK m.5/A gereğince konusu bir miktar paranın ödenmesi olan ticari alacak ve fatura uyuşmazlığı',
    data: {
      processType: 'dava_sarti',
      disputeType: 'ticari',
      disputeSubject: 'Ticari mal tesliminden kaynaklanan cari hesap ve fatura alacağının tahsili',
      buroAdi: 'Ankara Arabuluculuk Bürosu',
      buroDosyaNo: '2026/8940',
      arabuluculukDosyaNo: '2026/2150',
      basvuruTarihi: '12.08.2026',
      gorevlendirmeTarihi: '15.08.2026',
      basvurucu: {
        adSoyadUnvan: 'Atlas Endüstriyel Ürünler Sanayi ve Ticaret Ltd. Şti.',
        tcVkn: '0981234567',
        adres: 'Ostim OSB Mah. 100. Yıl Bulvarı No:45 Yenimahalle / ANKARA',
        telefon: '0312 385 10 20',
        eposta: 'info@atlasendustri.com.tr',
        vekilAdi: 'Av. Can ARSLAN',
        vekilBaro: 'Ankara',
        vekilBaroSicilNo: '32190',
        vekilAdres: 'Söğütözü Mah. 2176. Sok. Plazalar İş Merkezi No:7 Çankaya / ANKARA',
      },
      karsiTaraf: {
        adSoyadUnvan: 'Doruk Metal İmalat İnşaat Taahhüt A.Ş.',
        tcVkn: '3129876540',
        adres: 'Sincan Organize Sanayi Bölgesi ASO 2. Cadde No:19 Sincan / ANKARA',
        telefon: '0312 267 80 90',
        eposta: 'finans@dorukmetal.com',
        vekilAdi: 'Av. Seda GÜVEN',
        vekilBaro: 'Ankara',
        vekilBaroSicilNo: '39412',
        vekilAdres: 'Mustafa Kemal Mah. Dumlupınar Bulvarı No:266 Çankaya / ANKARA',
      },
      arabulucu: {
        adSoyad: 'Av. Serkan YURDAKUL',
        sicilNo: '24110',
        iletisim: '0312 444 33 22 - serkan@yurdakulhukuk.com',
        telefon: '0312 444 33 22',
        eposta: 'serkan@yurdakulhukuk.com',
        adres: 'Kızılırmak Mah. Ufuk Üniversitesi Cad. No:11 Kat:7 Çankaya / ANKARA',
      },
      toplantiTarihi: '10.09.2026',
      toplantiSaati: '11:00',
      toplantiYeri: 'Arabulucu Çalışma Ofisi Toplantı Salonu (Çankaya / ANKARA)',
      toplantiTuru: 'fiziki',
      anlasmamaNedeni: 'Taraflar fatura konusu malların ayıplı olduğu iddiası ve mahsup talepleri üzerinde anlaşamamışlardır.',
      anlasmaSartlari: {
        odenecekTutar: '420.000,00 TL (Dört Yüz Yirmi Bin Türk Lirası)',
        odemeSekli: '3 (üç) eşit taksitte banka havalesi ile',
        odemeTarihleri: '1. Taksit: 30.09.2026 (140.000 TL), 2. Taksit: 31.10.2026 (140.000 TL), 3. Taksit: 30.11.2026 (140.000 TL)',
        alacakliIban: 'TR12 0001 5001 5800 1234 5678 90',
        alacakliBanka: 'Türkiye İş Bankası Ostim Şubesi',
        alacakliHesapSahibi: 'Atlas Endüstriyel Ürünler Sanayi ve Ticaret Ltd. Şti.',
        ibraVeFeragatMetni: 'Başvurucu şirket, anılan 420.000,00 TL tutarın tam ve zamanında ödenmesi durumunda, cari hesap ilişkisi ve 2025-2026 yılları faturalarına dayalı tüm alacak haklarından feragat ettiğini, Karşı Taraf şirketi gayrikabili rücu ibra ettiğini kabul ve beyan eder.',
      },
    },
    rawText: `T.C. ANKARA ARABULUCULUK BÜROSU
Büro Dosya No: 2026/8940
Arabuluculuk Dosya No: 2026/2150
Başvuru Tarihi: 12.08.2026

BAŞVURUCU: Atlas Endüstriyel Ürünler Sanayi ve Ticaret Ltd. Şti. (VKN: 0981234567)
Adres: Ostim OSB Mah. 100. Yıl Bulvarı No:45 Yenimahalle / ANKARA
Vekili: Av. Can ARSLAN (Ankara Barosu - Sicil: 32190)

KARŞI TARAF: Doruk Metal İmalat İnşaat Taahhüt A.Ş. (VKN: 3129876540)
Adres: Sincan Organize Sanayi Bölgesi ASO 2. Cadde No:19 Sincan / ANKARA
Vekili: Av. Seda GÜVEN (Ankara Barosu - Sicil: 39412)

ARABULUCU: Av. Serkan YURDAKUL (Sicil No: 24110)
Uyuşmazlık Türü: Ticari (Dava Şartı)
Talep Konusu: Ticari satıştan kaynaklanan fatura ve cari hesap bakiye alacağının tahsili talebidir.`,
  },

  tasinir_tasinmaz_paylasim: {
    label: 'Taşınır ve Taşınmazların Paylaştırılması ve Ortaklığın Giderilmesi (Dava Şartı)',
    description: '6325 sayılı HUAK m.18/B (7445 s.K.) gereğince ortaklığın giderilmesi ve paylaştırma uyuşmazlığı',
    data: {
      processType: 'dava_sarti',
      disputeType: 'tasinir_tasinmaz_paylasim',
      disputeSubject: 'Miras kalan taşınmaz ve taşınır malların aynen taksimi / satışı ile ortaklığın giderilmesi talebi',
      buroAdi: 'İzmir Arabuluculuk Bürosu',
      buroDosyaNo: '2026/5120',
      arabuluculukDosyaNo: '2026/1840',
      basvuruTarihi: '05.08.2026',
      gorevlendirmeTarihi: '08.08.2026',
      basvurucu: {
        adSoyadUnvan: 'Fatma ŞAHİN',
        tcVkn: '45678912304',
        adres: 'Alsancak Mah. Atatürk Cad. No:112 D:4 Konak / İZMİR',
        telefon: '0542 777 88 99',
        eposta: 'fatmasahin@mail.com',
        vekilAdi: 'Av. Hakan ÇETİN',
        vekilBaro: 'İzmir',
        vekilBaroSicilNo: '16780',
        vekilAdres: 'Adalet Mah. Manas Bulvarı Folkart Towers B Kule No:47 Bayraklı / İZMİR',
      },
      karsiTaraf: {
        adSoyadUnvan: 'Murat KOÇ',
        tcVkn: '78912345602',
        adres: 'Bostanlı Mah. Cemal Gürsel Cad. No:84 D:2 Karşıyaka / İZMİR',
        telefon: '0533 444 55 66',
        eposta: 'murat.koc@email.com',
        vekilAdi: 'Av. Selin GÜNEŞ',
        vekilBaro: 'İzmir',
        vekilBaroSicilNo: '18920',
        vekilAdres: 'Mansuroğlu Mah. Ankara Cad. No:34 Bayraklı / İZMİR',
      },
      arabulucu: {
        adSoyad: 'Av. Elif ÖZTÜRK',
        sicilNo: '19875',
        iletisim: '0232 489 00 11 - elif@ozturkarabuluculuk.com',
        telefon: '0232 489 00 11',
        eposta: 'elif@ozturkarabuluculuk.com',
        adres: 'Mansuroğlu Mah. İslam Kerimov Cad. No:15 Bayraklı / İZMİR',
      },
      toplantiTarihi: '04.09.2026',
      toplantiSaati: '15:00',
      toplantiYeri: 'İzmir Arabuluculuk Bürosu Görüşme Odası 4 (Bayraklı Adliyesi)',
      toplantiTuru: 'fiziki',
      anlasmamaNedeni: 'Taraflar paylı mülkiyete konu taşınmazın aynen taksimi ve satış bedelinin paylaşımı konusunda anlaşamamışlardır.',
      anlasmaSartlari: {
        odenecekTutar: '1.200.000,00 TL Pay Devir Bedeli',
        odemeSekli: 'Tapu devri anında bloke çek veya güvenli ödeme sistemi ile',
        odemeTarihleri: 'En geç 15.10.2026 tarihine kadar ilgili Tapu Müdürlüğünde',
        alacakliIban: 'TR89 0006 4000 0011 2233 4455 66',
        alacakliBanka: 'Türkiye İş Bankası Alsancak Şubesi',
        alacakliHesapSahibi: 'Fatma ŞAHİN',
        ibraVeFeragatMetni: 'Taraflar ortaklığa konu taşınmazdaki hisselerin devri ve belirlenen bedelin ödenmesi halinde, ortaklığın giderilmesi ve ecrimisil taleplerinden karşılıklı olarak feragat ettiklerini kabul ve taahhüt ederler.',
      },
    },
    rawText: `T.C. İZMİR ARABULUCULUK BÜROSU
Büro Dosya No: 2026/5120
Arabuluculuk Dosya No: 2026/1840
Başvuru Tarihi: 05.08.2026

BAŞVURUCU: Fatma ŞAHİN (T.C. 45678912304)
Adres: Alsancak Mah. Atatürk Cad. No:112 D:4 Konak / İZMİR
Vekili: Av. Hakan ÇETİN (İzmir Barosu - Sicil: 16780)

KARŞI TARAF: Murat KOÇ (T.C. 78912345602)
Adres: Bostanlı Mah. Cemal Gürsel Cad. No:84 D:2 Karşıyaka / İZMİR
Vekili: Av. Selin GÜNEŞ (İzmir Barosu - Sicil: 18920)

ARABULUCU: Av. Elif ÖZTÜRK (Sicil No: 19875)
Uyuşmazlık Türü: Taşınır ve Taşınmazların Paylaştırılması ve Ortaklığın Giderilmesi (Dava Şartı)
Talep Konusu: Miras kalan taşınmazdaki ortaklığın giderilmesi ve paylaştırma talebidir.`,
  },

  tarimsal_uretim: {
    label: 'Tarımsal Üretim Sözleşmesinden Kaynaklanan (Dava Şartı)',
    description: '5488 sayılı Tarım Kanunu m.13/A (7442 s.K.) gereğince sözleşmeli tarımsal üretim uyuşmazlığı',
    data: {
      processType: 'dava_sarti',
      disputeType: 'tarimsal_uretim',
      disputeSubject: 'Sözleşmeli tarımsal üretim kapsamındaki ürün teslimi, fire oranı ve ürün bedeli ödemesi uyuşmazlığı',
      buroAdi: 'Konya Arabuluculuk Bürosu',
      buroDosyaNo: '2026/3410',
      arabuluculukDosyaNo: '2026/980',
      basvuruTarihi: '10.08.2026',
      gorevlendirmeTarihi: '12.08.2026',
      basvurucu: {
        adSoyadUnvan: 'Mustafa DEMİR (Üretici / Çiftçi)',
        tcVkn: '23456789012',
        adres: 'Çumra İlçesi Alibeyhüyüğü Mah. Çiftçiler Cad. No:44 Çumra / KONYA',
        telefon: '0535 666 77 88',
        eposta: 'mustafademir42@email.com',
        vekilAdi: 'Av. Kemal YILDIRIM',
        vekilBaro: 'Konya',
        vekilBaroSicilNo: '5420',
        vekilAdres: 'Akabe Mah. Adliye Sarayı Yanı Hukukçular Plaza K:2 Karatay / KONYA',
      },
      karsiTaraf: {
        adSoyadUnvan: 'Anadolu Şeker ve Tarım Ürünleri San. Tic. A.Ş.',
        tcVkn: '0680123987',
        adres: 'Büyükkayacık OSB Mah. 4. Organize Sanayi Bölgesi 102. Cad. No:18 Selçuklu / KONYA',
        telefon: '0332 239 00 00',
        eposta: 'tarim@anadoluseker.com.tr',
        vekilAdi: 'Av. Ayşe KILIÇ',
        vekilBaro: 'Konya',
        vekilBaroSicilNo: '6110',
        vekilAdres: 'Feritpaşa Mah. Ahmet Hilmi Nalçacı Cad. No:58 Selçuklu / KONYA',
      },
      arabulucu: {
        adSoyad: 'Av. Ali Osman KAYA',
        sicilNo: '15640',
        iletisim: '0332 350 40 50 - info@aliaydin.av.tr',
        telefon: '0332 350 40 50',
        eposta: 'info@aliaydin.av.tr',
        adres: 'Şemsitebrizi Mah. Mevlana Cad. No:22 Karatay / KONYA',
      },
      toplantiTarihi: '07.09.2026',
      toplantiSaati: '10:00',
      toplantiYeri: 'Konya Adliyesi Arabuluculuk Görüşme Odası (Karatay / KONYA)',
      toplantiTuru: 'fiziki',
      anlasmamaNedeni: 'Sözleşmeli pancar/mısır teslimatındaki polar ve fire oranları ile bakiye ürün bedeli üzerinde anlaşma sağlanamamıştır.',
      anlasmaSartlari: {
        odenecekTutar: '340.000,00 TL Bakiye Ürün Bedeli',
        odemeSekli: 'Tek seferde banka havalesi ile',
        odemeTarihleri: 'En geç 20.09.2026 tarihine kadar',
        alacakliIban: 'TR33 0001 0002 0003 4455 6677 88',
        alacakliBanka: 'Ziraat Bankası Çumra Şubesi',
        alacakliHesapSahibi: 'Mustafa DEMİR',
        ibraVeFeragatMetni: '2025-2026 üretim dönemine ait sözleşmeli tarımsal üretim sözleşmesinden kaynaklanan ürün bedeli, fire farkı ve nakliye alacaklarının tamamen tasfiye edildiği kabul edilmiştir.',
      },
    },
    rawText: `T.C. KONYA ARABULUCULUK BÜROSU
Büro Dosya No: 2026/3410
Arabuluculuk Dosya No: 2026/980
Başvuru Tarihi: 10.08.2026

BAŞVURUCU: Mustafa DEMİR (T.C. 23456789012)
Adres: Çumra İlçesi Alibeyhüyüğü Mah. Çiftçiler Cad. No:44 Çumra / KONYA
Vekili: Av. Kemal YILDIRIM (Konya Barosu - Sicil: 5420)

KARŞI TARAF: Anadolu Şeker ve Tarım Ürünleri San. Tic. A.Ş. (VKN: 0680123987)
Adres: Büyükkayacık OSB Mah. Selçuklu / KONYA
Vekili: Av. Ayşe KILIÇ (Konya Barosu - Sicil: 6110)

ARABULUCU: Av. Ali Osman KAYA (Sicil No: 15640)
Uyuşmazlık Türü: Tarımsal Üretim Sözleşmesinden Kaynaklanan (Dava Şartı)
Talep Konusu: Sözleşmeli tarımsal üretimden kaynaklanan bakiye ürün bedelinin tahsili talebidir.`,
  },

  tuketici: {
    label: 'Tüketici (Dava Şartı)',
    description: '6502 sayılı TKHK m.73/A gereğince tüketici mahkemelerinin görev alanındaki parasal sınır üstü uyuşmazlıklar',
    data: {
      processType: 'dava_sarti',
      disputeType: 'tuketici',
      disputeSubject: 'Ayıplı sıfır araç satışı nedeniyle bedel indirimi ve onarım masrafı tazminatı talebi',
      buroAdi: 'Bursa Arabuluculuk Bürosu',
      buroDosyaNo: '2026/6210',
      arabuluculukDosyaNo: '2026/1450',
      basvuruTarihi: '14.08.2026',
      gorevlendirmeTarihi: '16.08.2026',
      basvurucu: {
        adSoyadUnvan: 'Emre ÇELİK (Tüketici)',
        tcVkn: '34567890123',
        adres: 'Kükürtlü Mah. Çekirge Cad. No:65 Osmangazi / BURSA',
        telefon: '0533 888 99 00',
        eposta: 'emrecelik16@email.com',
        vekilAdi: 'Av. Nilgün AKSOY',
        vekilBaro: 'Bursa',
        vekilBaroSicilNo: '4820',
        vekilAdres: 'Odunluk Mah. Akademi Cad. Eker Meydan K:5 Nilüfer / BURSA',
      },
      karsiTaraf: {
        adSoyadUnvan: 'Kuzey Otomotiv Satış ve Servis A.Ş.',
        tcVkn: '5920194821',
        adres: 'İzmir Yolu Cad. No:210 Nilüfer / BURSA',
        telefon: '0224 444 16 16',
        eposta: 'hukuk@kuzeyoto.com.tr',
        vekilAdi: 'Av. Barış TEKİN',
        vekilBaro: 'Bursa',
        vekilBaroSicilNo: '5240',
        vekilAdres: 'Fethiye Mah. Sanayi Cad. No:120 Nilüfer / BURSA',
      },
      arabulucu: {
        adSoyad: 'Av. Merve AYDIN',
        sicilNo: '21340',
        iletisim: '0224 220 30 40 - arabulucu@merveaydin.av.tr',
        telefon: '0224 220 30 40',
        eposta: 'arabulucu@merveaydin.av.tr',
        adres: 'Kırcaali Mah. Fevzi Çakmak Cad. No:45 Osmangazi / BURSA',
      },
      toplantiTarihi: '09.09.2026',
      toplantiSaati: '13:30',
      toplantiYeri: 'Bursa Arabuluculuk Bürosu Görüşme Odası 1 (Bursa Adliyesi)',
      toplantiTuru: 'fiziki',
      anlasmamaNedeni: 'Ayıp iddiasının garanti kapsamında olup olmadığı ve talep edilen değer kaybı bedeli üzerinde uzlaşılamamıştır.',
      anlasmaSartlari: {
        odenecekTutar: '180.000,00 TL Değer Kaybı & 3 Yıl Ücretsiz Periyodik Bakım Paketi',
        odemeSekli: 'Nakit ödeme banka havalesiyle, bakım paketi sistem tanımıyla',
        odemeTarihleri: 'Bedel 25.09.2026 tarihine kadar ödenecektir.',
        alacakliIban: 'TR67 0006 7000 1234 5678 9012 34',
        alacakliBanka: 'Yapı Kredi Çekirge Şubesi',
        alacakliHesapSahibi: 'Emre ÇELİK',
        ibraVeFeragatMetni: 'Tüketici, söz konusu aracın ayıplı olduğu iddiasına dayalı tüm seçimlik haklarından (sözleşmeden dönme, araç değişimi, bedel indirimi) feragat ettiğini kabul eder.',
      },
    },
    rawText: `T.C. BURSA ARABULUCULUK BÜROSU
Büro Dosya No: 2026/6210
Arabuluculuk Dosya No: 2026/1450
Başvuru Tarihi: 14.08.2026

BAŞVURUCU: Emre ÇELİK (T.C. 34567890123)
Adres: Kükürtlü Mah. Çekirge Cad. No:65 Osmangazi / BURSA
Vekili: Av. Nilgün AKSOY (Bursa Barosu - Sicil: 4820)

KARŞI TARAF: Kuzey Otomotiv Satış ve Servis A.Ş. (VKN: 5920194821)
Adres: İzmir Yolu Cad. No:210 Nilüfer / BURSA
Vekili: Av. Barış TEKİN (Bursa Barosu - Sicil: 5240)

ARABULUCU: Av. Merve AYDIN (Sicil No: 21340)
Uyuşmazlık Türü: Tüketici (Dava Şartı)
Talep Konusu: Ayıplı araç tesliminden doğan bedel indirimi ve değer kaybı tazminatı talebidir.`,
  },

  ihtiyari: {
    label: 'İhtiyari',
    description: '6325 sayılı HUAK m.1 vd. uyarınca tarafların dava şartı olmaksızın kendi iradeleriyle başvurduğu arabuluculuk',
    data: {
      processType: 'ihtiyari',
      disputeType: 'ihtiyari',
      disputeSubject: 'Ticari ortaklığın sona erdirilmesi, hisse devir bedeli ve cari hesap tasfiyesi',
      buroAdi: 'İstanbul Arabuluculuk Bürosu',
      buroDosyaNo: 'İHT-2026/410',
      arabuluculukDosyaNo: '2026/890',
      basvuruTarihi: '20.08.2026',
      gorevlendirmeTarihi: '20.08.2026',
      basvurucu: {
        adSoyadUnvan: 'Cemil ERDEM',
        tcVkn: '56789012345',
        adres: 'Bebek Mah. Cevdetpaşa Cad. No:78 Beşiktaş / İSTANBUL',
        telefon: '0532 999 00 11',
        eposta: 'cemil@erdemholding.com',
        vekilAdi: 'Av. Ozan POLAT',
        vekilBaro: 'İstanbul',
        vekilBaroSicilNo: '33450',
        vekilAdres: 'Nisbetiye Mah. Aytar Cad. No:14 Beşiktaş / İSTANBUL',
      },
      karsiTaraf: {
        adSoyadUnvan: 'Tarık KOCAMAN',
        tcVkn: '67890123456',
        adres: 'Fenerbahçe Mah. Kalamış Fener Cad. No:42 Kadıköy / İSTANBUL',
        telefon: '0533 123 45 67',
        eposta: 'tarik@kocaman.com.tr',
        vekilAdi: 'Av. Berna ŞEN',
        vekilBaro: 'İstanbul',
        vekilBaroSicilNo: '37890',
        vekilAdres: 'Bağdat Cad. No:310 Kadıköy / İSTANBUL',
      },
      arabulucu: {
        adSoyad: 'Av. Burhan KAYGISIZ',
        sicilNo: '18492',
        iletisim: '0555 999 88 77 - arabulucu@burhankaygisiz.av.tr',
        telefon: '0555 999 88 77',
        eposta: 'arabulucu@burhankaygisiz.av.tr',
        adres: 'Merkez Mah. Abide-i Hürriyet Cad. No:82 Kat:3 Şişli / İSTANBUL',
      },
      toplantiTarihi: '11.09.2026',
      toplantiSaati: '16:00',
      toplantiYeri: 'Arabulucu Çalışma Ofisi (Şişli / İSTANBUL)',
      toplantiTuru: 'fiziki',
      anlasmamaNedeni: 'Ortaklık tasfiye protokolündeki şirket değerlemesi ve gayrimenkul paylaşımı üzerinde mutabakat sağlanamamıştır.',
      anlasmaSartlari: {
        odenecekTutar: '1.500.000,00 TL Tasfiye Payı Bedeli',
        odemeSekli: '3 taksit halinde banka transferi ile',
        odemeTarihleri: '1. Taksit: 01.10.2026 (500.000 TL), 2. Taksit: 01.11.2026 (500.000 TL), 3. Taksit: 01.12.2026 (500.000 TL)',
        alacakliIban: 'TR44 0006 2000 0099 8877 6655 44',
        alacakliBanka: 'Garanti BBVA Bebek Şubesi',
        alacakliHesapSahibi: 'Cemil ERDEM',
        ibraVeFeragatMetni: 'Taraflar ortak girişimden kaynaklanan tüm alacak, kâr payı, hisse devir ve tazminat haklarının tamamen ifa edildiğini ve birbirlerini ibra ettiklerini beyan ederler.',
      },
    },
    rawText: `İHTİYARİ ARABULUCULUK BAŞVURUSU
Dosya No: İHT-2026/410
Başvuru Tarihi: 20.08.2026

BAŞVURUCU: Cemil ERDEM (T.C. 56789012345)
Vekili: Av. Ozan POLAT (İstanbul Barosu - Sicil: 33450)

KARŞI TARAF: Tarık KOCAMAN (T.C. 67890123456)
Vekili: Av. Berna ŞEN (İstanbul Barosu - Sicil: 37890)

ARABULUCU: Av. Burhan KAYGISIZ (Sicil No: 18492)
Uyuşmazlık Türü: İhtiyari
Talep Konusu: Adi ortaklığın tasfiyesi ve hisse bedelinin taksimi talebidir.`,
  },

  diger_dava_sarti: {
    label: 'Diğer (Dava Şartı)',
    description: '6325 sayılı HUAK ve diğer özel kanunlarla dava şartı kapsamına alınan komşuluk hakkı ve diğer uyuşmazlıklar',
    data: {
      processType: 'dava_sarti',
      disputeType: 'diger_dava_sarti',
      disputeSubject: 'Kat mülkiyeti, ortak gider avansı ve komşuluk hukukundan kaynaklanan taşkın kullanımın önlenmesi',
      buroAdi: 'Antalya Arabuluculuk Bürosu',
      buroDosyaNo: '2026/7450',
      arabuluculukDosyaNo: '2026/1620',
      basvuruTarihi: '15.08.2026',
      gorevlendirmeTarihi: '18.08.2026',
      basvurucu: {
        adSoyadUnvan: 'Palmiye Sitesi Kat Malikleri Kurulu Yönetimi',
        tcVkn: '0789123456',
        adres: 'Liman Mah. Boğaçayı Cad. Palmiye Sitesi Blokları Konyaaltı / ANTALYA',
        telefon: '0242 259 10 20',
        eposta: 'yonetim@palmiyesitesi.com',
        vekilAdi: 'Av. Barış YILMAZ',
        vekilBaro: 'Antalya',
        vekilBaroSicilNo: '7890',
        vekilAdres: 'Meltem Mah. Dumlupınar Bulvarı No:18 Muratpaşa / ANTALYA',
      },
      karsiTaraf: {
        adSoyadUnvan: 'Hasan Hakan ÇELİK',
        tcVkn: '89012345678',
        adres: 'Liman Mah. Boğaçayı Cad. No:12 A Blok D:8 Konyaaltı / ANTALYA',
        telefon: '0532 321 00 00',
        eposta: 'hakan.celik@email.com',
        vekilAdi: '',
      },
      arabulucu: {
        adSoyad: 'Av. Deniz SARI',
        sicilNo: '20450',
        iletisim: '0242 248 80 90 - arabulucu@denizsari.av.tr',
        telefon: '0242 248 80 90',
        eposta: 'arabulucu@denizsari.av.tr',
        adres: 'Varlık Mah. 100. Yıl Bulvarı No:42 Muratpaşa / ANTALYA',
      },
      toplantiTarihi: '12.09.2026',
      toplantiSaati: '14:00',
      toplantiYeri: 'Antalya Adliyesi Arabuluculuk Odası (Muratpaşa / ANTALYA)',
      toplantiTuru: 'fiziki',
      anlasmamaNedeni: 'Ortak yerlere yapılan müdahalenin giderilmesi ve aidat borcu faiz indirimi taleplerinde anlaşılamamıştır.',
      anlasmaSartlari: {
        odenecekTutar: '45.000,00 TL Birikmiş Aidat & Çatı Onarım Payı',
        odemeSekli: 'Site yönetimi hesabına 2 eşit taksitte',
        odemeTarihleri: '1. Taksit: 30.09.2026 (22.500 TL), 2. Taksit: 31.10.2026 (22.500 TL)',
        alacakliIban: 'TR15 0001 2009 8877 6655 4433 22',
        alacakliBanka: 'Halkbank Konyaaltı Şubesi',
        alacakliHesapSahibi: 'Palmiye Sitesi Yönetimi',
        ibraVeFeragatMetni: 'Kat maliki ortak alandaki eklentiyi 15 gün içinde kaldıracağını, site yönetimi ise ödemelerin yapılmasıyla icra takibinden feragat edeceğini kabul etmiştir.',
      },
    },
    rawText: `T.C. ANTALYA ARABULUCULUK BÜROSU
Büro Dosya No: 2026/7450
Arabuluculuk Dosya No: 2026/1620
Başvuru Tarihi: 15.08.2026

BAŞVURUCU: Palmiye Sitesi Yönetimi (VKN: 0789123456)
Vekili: Av. Barış YILMAZ (Antalya Barosu - Sicil: 7890)

KARŞI TARAF: Hasan Hakan ÇELİK (T.C. 89012345678)

ARABULUCU: Av. Deniz SARI (Sicil No: 20450)
Uyuşmazlık Türü: Diğer (Dava Şartı)
Talep Konusu: Ortak gider alacağı ve kat mülkiyetinden doğan uyuşmazlığın giderilmesi talebidir.`,
  },
};
