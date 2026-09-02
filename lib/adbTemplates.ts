import { MediationCaseData, GeneratedDocument, DisputeType, ScenarioType } from '@/types/mediation';

export function getDisputeTypeLabel(type: DisputeType | string): string {
  switch (type) {
    case 'ihtiyari':
      return 'İhtiyari Arabuluculuk (6325 sayılı HUAK m.1 vd.)';
    case 'isci_isveren':
    case 'is_hukuku':
      return 'İşçi İşveren (Dava Şartı - 7036 sayılı Kanun m.3)';
    case 'ticari':
      return 'Ticari (Dava Şartı - 6102 sayılı TTK m.5/A)';
    case 'tasinir_tasinmaz_paylasim':
    case 'kira_tasinmaz':
      return 'Taşınır ve Taşınmazların Paylaştırılması ve Ortaklığın Giderilmesi (Dava Şartı - 6325 sayılı HUAK m.18/B)';
    case 'diger_dava_sarti':
    case 'diger':
      return 'Diğer (Dava Şartı - 6325 sayılı HUAK)';
    case 'tarimsal_uretim':
      return 'Tarımsal Üretim Sözleşmesinden Kaynaklanan (Dava Şartı - 5488 s.K. m.13/A / 7442 s.K.)';
    case 'tuketici':
      return 'Tüketici (Dava Şartı - 6502 sayılı TKHK m.73/A)';
    default:
      return 'Hukuk Uyuşmazlığı (6325 sayılı HUAK)';
  }
}

export function formatSafe(value: string | undefined, placeholder: string): string {
  return value && value.trim().length > 0 ? value.trim() : `[${placeholder}]`;
}

// 1. DAVET MEKTUBU (ADB RESMİ ŞABLONU - TÜM DOSYA TÜRLERİNE ÖZEL)
export function generateDavetMektubu(data: MediationCaseData): GeneratedDocument {
  const buroAdi = formatSafe(data.buroAdi, 'Arabuluculuk Bürosu');
  const buroDosyaNo = formatSafe(data.buroDosyaNo, 'Büro Dosya No');
  const arabuluculukDosyaNo = formatSafe(data.arabuluculukDosyaNo, 'Arabuluculuk Dosya No');
  const basvuruTarihi = formatSafe(data.basvuruTarihi, 'Başvuru Tarihi');

  const basvurucuAdi = formatSafe(data.basvurucu.adSoyadUnvan, 'Başvurucu');
  const karsiTarafAdi = formatSafe(data.karsiTaraf.adSoyadUnvan, 'Muhatap / Karşı Taraf');
  const arabulucuAdi = formatSafe(data.arabulucu.adSoyad, 'Arabulucu');
  const arabulucuSicil = formatSafe(data.arabulucu.sicilNo, 'Sicil No');
  
  // İletişim ayrıştırma (varsa telefon/eposta veya ortak iletisim alanı)
  const arabulucuTel = data.arabulucu.telefon || data.arabulucu.iletisim || '[Telefon]';
  const arabulucuEmail = data.arabulucu.eposta || (data.arabulucu.iletisim?.includes('@') ? data.arabulucu.iletisim : '[E-posta]');
  const arabulucuAdres = formatSafe(data.arabulucu.adres, 'Arabulucu Adresi');

  const toplantiTarihi = formatSafe(data.toplantiTarihi, 'Toplantı Tarihi');
  const toplantiSaati = formatSafe(data.toplantiSaati, 'Toplantı Saati');
  const toplantiYeri = formatSafe(data.toplantiYeri, 'Toplantı Adresi / Yeri');
  const uyuşmazlıkKonusu = formatSafe(data.disputeSubject, 'Uyuşmazlık Konusu');

  let baslik = '';
  let yasalDayanakParagrafi = '';
  let ozelSurecParagrafi = '';
  let sureParagrafi = '';
  let ucretParagrafi = '';
  let temsilParagrafi = '';
  let yaptirimParagrafi = '';

  const dtype = data.disputeType;

  if (dtype === 'tuketici') {
    baslik = 'TÜKETİCİ UYUŞMAZLIKLARINDA DAVA ŞARTI ARABULUCULUK İLK TOPLANTI DAVET MEKTUBU';
    yasalDayanakParagrafi = '6502 sayılı Tüketicinin Korunması Hakkında Kanunun 73/A maddesi uyarınca tüketici mahkemelerinde görülen uyuşmazlıklarda dava açılmadan önce arabulucuya başvurulmuş olması dava şartıdır.';
    sureParagrafi = 'Arabulucu, yapılan başvuruyu görevlendirildiği tarihten itibaren üç hafta içinde sonuçlandırır. Bu süre zorunlu hâllerde arabulucu tarafından en fazla bir hafta uzatılabilir.';
    ucretParagrafi = `Tarafların arabuluculuk faaliyeti sonunda anlaşmaları hâlinde, arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin İkinci Kısmına göre aksi kararlaştırılmadıkça taraflarca eşit şekilde karşılanır. Bu durumda ücret, Tarifenin Birinci Kısmında belirlenen iki saatlik ücret tutarından az olamaz. Tüketicinin ödemesi gereken arabuluculuk ücreti, Adalet Bakanlığı bütçesinden karşılanır. Ancak belirtilen hâlde tüketicinin ödeyeceği arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin Birinci Kısmına göre iki saatlik ücret tutarını geçemez.
Arabuluculuk faaliyeti sonunda taraflara ulaşılamaması, taraflar katılmadığı için görüşme yapılamaması veya iki saatten az süren görüşmeler sonunda tarafların anlaşamamaları hâllerinde, iki saatlik ücret tutarı Tarifenin Birinci Kısmına göre Adalet Bakanlığın bütçesinden ödenir. İki saatten fazla süren görüşmeler sonunda tarafların anlaşamamaları hâlinde ise iki saati aşan kısma ilişkin ücret aksi kararlaştırılmadıkça taraflarca eşit şekilde Tarifenin Birinci Kısmına göre karşılanır. Adalet Bakanlığı bütçesinden ödenen ve taraflarca karşılanan arabuluculuk ücreti, yargılama giderlerinden sayılır.`;
    temsilParagrafi = `Arabuluculuk müzakerelerine taraflar bizzat, kanuni temsilcileri veya avukatları aracılığıyla katılabilirler. Uyuşmazlığın çözümüne katkı sağlayabilecek uzman kişiler de müzakerelerde hazır bulundurulabilir.
Arabuluculuk görüşmelerinde idareyi, üst yönetici tarafından belirlenen iki üye ile hukuk birimi amiri veya onun belirleyeceği bir avukat ya da hukuk müşavirinden oluşan komisyon temsil eder. Komisyon kendisini vekil ile temsil ettiremez. (İdarenin taraf olduğu dava şartı arabuluculuk sürecinde kullanılabilir.)`;
    yaptirimParagrafi = 'Taraflardan birinin geçerli bir mazeret göstermeksizin ilk toplantıya katılmaması sebebiyle arabuluculuk faaliyetinin sona ermesi durumunda toplantıya katılmayan taraf, son tutanakta belirtilir ve bu taraf davada kısmen veya tamamen haklı çıksa bile yargılama giderinin tamamından sorumlu tutulur. Ayrıca bu taraf lehine vekâlet ücretine hükmedilmez. Her iki tarafın da ilk toplantıya katılmaması sebebiyle sona eren arabuluculuk faaliyeti üzerine açılacak davalarda tarafların yaptıkları yargılama giderleri kendi üzerlerinde bırakılır. Bu yaptırım tüketici aleyhine uygulanmaz.';
  } else if (dtype === 'ticari') {
    baslik = 'TİCARİ UYUŞMAZLIKLARDA DAVA ŞARTI ARABULUCULUK İLK TOPLANTI DAVET MEKTUBU';
    yasalDayanakParagrafi = '6102 sayılı Türk Ticaret Kanunun 5/A maddesi uyarınca ticari davalardan, konusu bir miktar paranın ödenmesi olan alacak ve tazminat talepleri hakkında dava açılmadan önce arabulucuya başvurulmuş olması dava şartıdır.';
    ozelSurecParagrafi = 'Dava açılmadan önce ihtiyati tedbir kararı verilmesi hâlinde 6100 sayılı Kanunun 397 nci maddesinin birinci fıkrasında, ihtiyati haciz kararı verilmesi hâlinde ise 9/6/1932 tarihli ve 2004 sayılı İcra ve İflas Kanununun 264 üncü maddesinin birinci fıkrasında düzenlenen dava açma süresi, arabuluculuk bürosuna başvurulmasından son tutanağın düzenlendiği tarihe kadar işlemez.\n';
    sureParagrafi = 'Arabulucu, yapılan başvuruyu görevlendirildiği tarihten itibaren altı hafta içinde sonuçlandırır. Bu süre zorunlu hâllerde arabulucu tarafından en fazla iki hafta uzatılabilir.';
    ucretParagrafi = `Tarafların arabuluculuk faaliyeti sonunda anlaşmaları hâlinde, arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin İkinci Kısmına göre aksi kararlaştırılmadıkça taraflarca eşit şekilde karşılanır. Bu durumda ücret, Tarifenin Birinci Kısmında belirlenen iki saatlik ücret tutarından az olamaz.
Arabuluculuk faaliyeti sonunda taraflara ulaşılamaması, taraflar katılmadığı için görüşme yapılamaması veya iki saatten az süren görüşmeler sonunda tarafların anlaşamamaları hâllerinde, iki saatlik ücret tutarı Tarifenin Birinci Kısmına göre Adalet Bakanlığın bütçesinden ödenir. İki saatten fazla süren görüşmeler sonunda tarafların anlaşamamaları hâlinde ise iki saati aşan kısma ilişkin ücret aksi kararlaştırılmadıkça taraflarca eşit şekilde Tarifenin Birinci Kısmına göre karşılanır. Adalet Bakanlığı bütçesinden ödenen ve taraflarca karşılanan arabuluculuk ücreti, yargılama giderlerinden sayılır.`;
    temsilParagrafi = `Arabuluculuk müzakerelerine taraflar bizzat, kanuni temsilcileri veya avukatları aracılığıyla katılabilirler. Uyuşmazlığın çözümüne katkı sağlayabilecek uzman kişiler de müzakerelerde hazır bulundurulabilir.
Arabuluculuk görüşmelerinde idareyi, üst yönetici tarafından belirlenen iki üye ile hukuk birimi amiri veya onun belirleyeceği bir avukat ya da hukuk müşavirinden oluşan komisyon temsil eder. Komisyon kendisini vekil ile temsil ettiremez. (İdarenin taraf olduğu dava şartı arabuluculuk sürecinde kullanılabilir.)`;
    yaptirimParagrafi = 'Taraflardan birinin geçerli bir mazeret göstermeksizin ilk toplantıya katılmaması sebebiyle arabuluculuk faaliyetinin sona ermesi durumunda toplantıya katılmayan taraf, son tutanakta belirtilir ve bu taraf davada kısmen veya tamamen haklı çıksa bile yargılama giderinin tamamından sorumlu tutulur. Ayrıca bu taraf lehine vekâlet ücretine hükmedilmez. Her iki tarafın da ilk toplantıya katılmaması sebebiyle sona eren arabuluculuk faaliyeti üzerine açılacak davalarda tarafların yaptıkları yargılama giderleri kendi üzerlerinde bırakılır.';
  } else if (dtype === 'isci_isveren' || dtype === 'is_hukuku') {
    baslik = 'İŞÇİ - İŞVEREN UYUŞMAZLIKLARINDA DAVA ŞARTI ARABULUCULUK İLK TOPLANTI DAVET MEKTUBU';
    yasalDayanakParagrafi = '7036 sayılı İş Mahkemeleri Kanunun 3 üncü maddesi uyarınca kanuna, bireysel veya toplu iş sözleşmesine dayanan işçi veya işveren alacağı ve tazminatı ile işe iade talebiyle açılan davalarda, arabulucuya başvurulmuş olması dava şartıdır.';
    ozelSurecParagrafi = 'Asıl işveren-alt işveren ilişkisinin varlığı hâlinde işe iade talebiyle arabulucuya başvurulduğunda, anlaşmanın gerçekleşebilmesi için işverenlerin arabuluculuk görüşmelerine birlikte katılmaları ve iradelerinin birbirine uygun olması aranır. (İşe iade talebiyle yapılan başvurularda yer alacak).\n';
    sureParagrafi = 'Arabulucu, yapılan başvuruyu görevlendirildiği tarihten itibaren üç hafta içinde sonuçlandırır. Bu süre zorunlu hâllerde arabulucu tarafından en fazla bir hafta uzatılabilir.';
    ucretParagrafi = `Tarafların arabuluculuk faaliyeti sonunda anlaşmaları hâlinde, arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin İkinci Kısmına göre aksi kararlaştırılmadıkça taraflarca eşit şekilde karşılanır. Bu durumda ücret, Tarifenin Birinci Kısmında belirlenen iki saatlik ücret tutarından az olamaz. İşe iade talebiyle yapılan görüşmelerde tarafların anlaşmaları durumunda, arabulucuya ödenecek ücretin belirlenmesinde işçiye işe başlatılmaması hâlinde ödenecek tazminat miktarı ile çalıştırılmadığı süre için ödenecek ücret ve diğer haklarının toplamı, Tarifenin İkinci Kısmı uyarınca üzerinde anlaşılan miktar olarak kabul edilir.
Arabuluculuk faaliyeti sonunda taraflara ulaşılamaması, taraflar katılmadığı için görüşme yapılamaması veya iki saatten az süren görüşmeler sonunda tarafların anlaşamamaları hâllerinde, iki saatlik ücret tutarı Tarifenin Birinci Kısmına göre Adalet Bakanlığı bütçesinden ödenir. İki saatten fazla süren görüşmeler sonunda tarafların anlaşamamaları hâlinde ise iki saati aşan kısma ilişkin ücret aksi kararlaştırılmadıkça taraflarca eşit şekilde Tarifenin Birinci Kısmına göre karşılanır. Adalet Bakanlığı bütçesinden ödenen ve taraflarca karşılanan arabuluculuk ücreti, yargılama giderlerinden sayılır.`;
    temsilParagrafi = `Arabuluculuk müzakerelerine taraflar bizzat, kanuni temsilcileri veya avukatları aracılığıyla katılabilirler. Uyuşmazlığın çözümüne katkı sağlayabilecek uzman kişiler de müzakerelerde hazır bulundurulabilir. İşverenin yazılı belgeyle yetkilendirdiği çalışanı da görüşmelerde işvereni temsil edebilir ve son tutanağı imzalayabilir.
Arabuluculuk görüşmelerinde idareyi, üst yönetici tarafından belirlenen iki üye ile hukuk birimi amiri veya onun belirleyeceği bir avukat ya da hukuk müşavirinden oluşan komisyon temsil eder. Komisyon kendisini vekil ile temsil ettiremez. (İdarenin taraf olduğu dava şartı arabuluculuk sürecinde kullanılabilir.)`;
    yaptirimParagrafi = 'Taraflardan birinin geçerli bir mazeret göstermeksizin ilk toplantıya katılmaması sebebiyle arabuluculuk faaliyetinin sona ermesi durumunda toplantıya katılmayan taraf, son tutanakta belirtilir ve bu taraf davada kısmen veya tamamen haklı çıksa bile yargılama giderinin tamamından sorumlu tutulur. Ayrıca bu taraf lehine vekâlet ücretine hükmedilmez. Her iki tarafın da ilk toplantıya katılmaması sebebiyle sona eren arabuluculuk faaliyeti üzerine açılacak davalarda tarafların yaptıkları yargılama giderleri kendi üzerlerinde bırakılır.';
  } else if (dtype === 'tasinir_tasinmaz_paylasim' || dtype === 'kira_tasinmaz') {
    baslik = 'TAŞINIR VE TAŞINMAZLARIN PAYLAŞTIRILMASI VE ORTAKLIĞIN GİDERİLMESİ (DAVA ŞARTI) ARABULUCULUK İLK TOPLANTI DAVET MEKTUBU';
    yasalDayanakParagrafi = '6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanununun 18/B maddesi (7445 sayılı Kanun) uyarınca taşınır ve taşınmazların paylaştırılması ve ortaklığın giderilmesine ilişkin uyuşmazlıklarda dava açılmadan önce arabulucuya başvurulmuş olması dava şartıdır.';
    sureParagrafi = 'Arabulucu, yapılan başvuruyu görevlendirildiği tarihten itibaren üç hafta içinde sonuçlandırır. Bu süre zorunlu hâllerde arabulucu tarafından en fazla bir hafta uzatılabilir.';
    ucretParagrafi = `Tarafların arabuluculuk faaliyeti sonunda anlaşmaları hâlinde, arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin İkinci Kısmına göre aksi kararlaştırılmadıkça taraflarca eşit şekilde karşılanır. Bu durumda ücret, Tarifenin Birinci Kısmında belirlenen iki saatlik ücret tutarından az olamaz.
Arabuluculuk faaliyeti sonunda taraflara ulaşılamaması, taraflar katılmadığı için görüşme yapılamaması veya iki saatten az süren görüşmeler sonunda tarafların anlaşamamaları hâllerinde, iki saatlik ücret tutarı Tarifenin Birinci Kısmına göre Adalet Bakanlığın bütçesinden ödenir. İki saatten fazla süren görüşmeler sonunda tarafların anlaşamamaları hâlinde ise iki saati aşan kısma ilişkin ücret aksi kararlaştırılmadıkça taraflarca eşit şekilde Tarifenin Birinci Kısmına göre karşılanır. Adalet Bakanlığı bütçesinden ödenen ve taraflarca karşılanan arabuluculuk ücreti, yargılama giderlerinden sayılır.`;
    temsilParagrafi = `Arabuluculuk müzakerelerine taraflar bizzat, kanuni temsilcileri veya avukatları aracılığıyla katılabilirler. Uyuşmazlığın çözümüne katkı sağlayabilecek uzman kişiler de müzakerelerde hazır bulundurulabilir.
Arabuluculuk görüşmelerinde idareyi, üst yönetici tarafından belirlenen iki üye ile hukuk birimi amiri veya onun belirleyeceği bir avukat ya da hukuk müşavirinden oluşan komisyon temsil eder. Komisyon kendisini vekil ile temsil ettiremez. (İdarenin taraf olduğu dava şartı arabuluculuk sürecinde kullanılabilir.)`;
    yaptirimParagrafi = 'Taraflardan birinin geçerli bir mazeret göstermeksizin ilk toplantıya katılmaması sebebiyle arabuluculuk faaliyetinin sona ermesi durumunda toplantıya katılmayan taraf, son tutanakta belirtilir ve bu taraf davada kısmen veya tamamen haklı çıksa bile yargılama giderinin tamamından sorumlu tutulur. Ayrıca bu taraf lehine vekâlet ücretine hükmedilmez. Her iki tarafın da ilk toplantıya katılmaması sebebiyle sona eren arabuluculuk faaliyeti üzerine açılacak davalarda tarafların yaptıkları yargılama giderleri kendi üzerlerinde bırakılır.';
  } else if (dtype === 'tarimsal_uretim') {
    baslik = 'TARIMSAL ÜRETİM SÖZLEŞMESİNDEN KAYNAKLANAN (DAVA ŞARTI) ARABULUCULUK İLK TOPLANTI DAVET MEKTUBU';
    yasalDayanakParagrafi = '5488 sayılı Tarım Kanununun 13/A maddesi (7442 sayılı Kanun) uyarınca tarımsal üretim sözleşmesinden kaynaklanan uyuşmazlıklarda dava açılmadan önce arabulucuya başvurulmuş olması dava şartıdır.';
    sureParagrafi = 'Arabulucu, yapılan başvuruyu görevlendirildiği tarihten itibaren üç hafta içinde sonuçlandırır. Bu süre zorunlu hâllerde arabulucu tarafından en fazla bir hafta uzatılabilir.';
    ucretParagrafi = `Tarafların arabuluculuk faaliyeti sonunda anlaşmaları hâlinde, arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin İkinci Kısmına göre aksi kararlaştırılmadıkça taraflarca eşit şekilde karşılanır. Bu durumda ücret, Tarifenin Birinci Kısmında belirlenen iki saatlik ücret tutarından az olamaz.
Arabuluculuk faaliyeti sonunda taraflara ulaşılamaması, taraflar katılmadığı için görüşme yapılamaması veya iki saatten az süren görüşmeler sonunda tarafların anlaşamamaları hâllerinde, iki saatlik ücret tutarı Tarifenin Birinci Kısmına göre Adalet Bakanlığın bütçesinden ödenir. İki saatten fazla süren görüşmeler sonunda tarafların anlaşamamaları hâlinde ise iki saati aşan kısma ilişkin ücret aksi kararlaştırılmadıkça taraflarca eşit şekilde Tarifenin Birinci Kısmına göre karşılanır. Adalet Bakanlığı bütçesinden ödenen ve taraflarca karşılanan arabuluculuk ücreti, yargılama giderlerinden sayılır.`;
    temsilParagrafi = `Arabuluculuk müzakerelerine taraflar bizzat, kanuni temsilcileri veya avukatları aracılığıyla katılabilirler. Uyuşmazlığın çözümüne katkı sağlayabilecek uzman kişiler de müzakerelerde hazır bulundurulabilir.
Arabuluculuk görüşmelerinde idareyi, üst yönetici tarafından belirlenen iki üye ile hukuk birimi amiri veya onun belirleyeceği bir avukat ya da hukuk müşavirinden oluşan komisyon temsil eder. Komisyon kendisini vekil ile temsil ettiremez. (İdarenin taraf olduğu dava şartı arabuluculuk sürecinde kullanılabilir.)`;
    yaptirimParagrafi = 'Taraflardan birinin geçerli bir mazeret göstermeksizin ilk toplantıya katılmaması sebebiyle arabuluculuk faaliyetinin sona ermesi durumunda toplantıya katılmayan taraf, son tutanakta belirtilir ve bu taraf davada kısmen veya tamamen haklı çıksa bile yargılama giderinin tamamından sorumlu tutulur. Ayrıca bu taraf lehine vekâlet ücretine hükmedilmez. Her iki tarafın da ilk toplantıya katılmaması sebebiyle sona eren arabuluculuk faaliyeti üzerine açılacak davalarda tarafların yaptıkları yargılama giderleri kendi üzerlerinde bırakılır.';
  } else if (dtype === 'ihtiyari') {
    baslik = 'İHTİYARİ ARABULUCULUK İLK TOPLANTI DAVET MEKTUBU';
    yasalDayanakParagrafi = '6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanununun 1 inci ve devamı maddeleri uyarınca taraflar üzerinde serbestçe tasarruf edebilecekleri iş ve işlemlerden doğan özel hukuk uyuşmazlıklarının çözümü için arabulucuya başvurma konusunda anlaşabilirler.';
    sureParagrafi = 'Arabuluculuk faaliyeti tarafların iradeleri ve 6325 sayılı Kanun hükümleri çerçevesinde yürütülür.';
    ucretParagrafi = `Tarafların arabuluculuk faaliyeti sonunda anlaşmaları hâlinde, arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin İkinci Kısmına göre aksi kararlaştırılmadıkça taraflarca eşit şekilde karşılanır. Anlaşamama durumunda ücret ve masraflar taraflarca aksi kararlaştırılmadıkça eşit olarak ödenir.`;
    temsilParagrafi = `Arabuluculuk müzakerelerine taraflar bizzat, kanuni temsilcileri veya avukatları aracılığıyla katılabilirler. Uyuşmazlığın çözümüne katkı sağlayabilecek uzman kişiler de müzakerelerde hazır bulundurulabilir.`;
    yaptirimParagrafi = 'İhtiyari arabuluculuk sürecinde tarafların iradiliği esas olup, sürece katılımınız uyuşmazlığın mahkeme masrafları ve uzun yargılama süreçlerine gerek kalmaksızın dostane ve hızlı şekilde çözülmesine olanak sağlayacaktır.';
  } else {
    // diger_dava_sarti veya diger
    baslik = 'DİĞER DAVA ŞARTI UYUŞMAZLIKLARDA ARABULUCULUK İLK TOPLANTI DAVET MEKTUBU';
    yasalDayanakParagrafi = '6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu ve ilgili mevzuat uyarınca dava açılmadan önce arabulucuya başvurulmuş olması dava şartıdır.';
    sureParagrafi = 'Arabulucu, yapılan başvuruyu görevlendirildiği tarihten itibaren üç hafta içinde sonuçlandırır. Bu süre zorunlu hâllerde arabulucu tarafından en fazla bir hafta uzatılabilir.';
    ucretParagrafi = `Tarafların arabuluculuk faaliyeti sonunda anlaşmaları hâlinde, arabuluculuk ücreti, Arabuluculuk Asgari Ücret Tarifesinin eki Arabuluculuk Ücret Tarifesinin İkinci Kısmına göre aksi kararlaştırılmadıkça taraflarca eşit şekilde karşılanır. Bu durumda ücret, Tarifenin Birinci Kısmında belirlenen iki saatlik ücret tutarından az olamaz.
Arabuluculuk faaliyeti sonunda taraflara ulaşılamaması, taraflar katılmadığı için görüşme yapılamaması veya iki saatten az süren görüşmeler sonunda tarafların anlaşamamaları hâllerinde, iki saatlik ücret tutarı Tarifenin Birinci Kısmına göre Adalet Bakanlığın bütçesinden ödenir. İki saatten fazla süren görüşmeler sonunda tarafların anlaşamamaları hâlinde ise iki saati aşan kısma ilişkin ücret aksi kararlaştırılmadıkça taraflarca eşit şekilde Tarifenin Birinci Kısmına göre karşılanır. Adalet Bakanlığı bütçesinden ödenen ve taraflarca karşılanan arabuluculuk ücreti, yargılama giderlerinden sayılır.`;
    temsilParagrafi = `Arabuluculuk müzakerelerine taraflar bizzat, kanuni temsilcileri veya avukatları aracılığıyla katılabilirler. Uyuşmazlığın çözümüne katkı sağlayabilecek uzman kişiler de müzakerelerde hazır bulundurulabilir.
Arabuluculuk görüşmelerinde idareyi, üst yönetici tarafından belirlenen iki üye ile hukuk birimi amiri veya onun belirleyeceği bir avukat ya da hukuk müşavirinden oluşan komisyon temsil eder. Komisyon kendisini vekil ile temsil ettiremez. (İdarenin taraf olduğu dava şartı arabuluculuk sürecinde kullanılabilir.)`;
    yaptirimParagrafi = 'Taraflardan birinin geçerli bir mazeret göstermeksizin ilk toplantıya katılmaması sebebiyle arabuluculuk faaliyetinin sona ermesi durumunda toplantıya katılmayan taraf, son tutanakta belirtilir ve bu taraf davada kısmen veya tamamen haklı çıksa bile yargılama giderinin tamamından sorumlu tutulur. Ayrıca bu taraf lehine vekâlet ücretine hükmedilmez. Her iki tarafın da ilk toplantıya katılmaması sebebiyle sona eren arabuluculuk faaliyeti üzerine açılacak davalarda tarafların yaptıkları yargılama giderleri kendi üzerlerinde bırakılır.';
  }

  const isDavaSarti = data.processType === 'dava_sarti';
  const dosyaBaslikKismi = `Büro Dosya No: ${buroDosyaNo} | Arabuluculuk Dosya No: ${arabuluculukDosyaNo} | Başvuru Tarihi: ${basvuruTarihi}`;

  const md = `${baslik}
(${dosyaBaslikKismi})

Sayın ${karsiTarafAdi} ,

${basvurucuAdi} tarafından ${buroAdi}'na yapılan başvuru üzerine UYAP Arabulucu Portal tarafından görevlendirilmiş T.C. Adalet Bakanlığı’ndaki resmi sicile kayıtlı ${arabulucuSicil} sicil numaralı arabulucuyum.

${uyuşmazlıkKonusu} konudaki uyuşmazlığı dostane çözüm yolu olarak arabuluculuk ile çözmek için bu davet mektubu tarafınıza gönderilmektedir. ${uyuşmazlıkKonusu} hukuki uyuşmazlığının 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu kapsamında tarafların üzerinde serbestçe tasarruf edebileceği iş ve işlemlerden doğan özel hukuk uyuşmazlığı olduğu anlaşılmaktadır.

${yasalDayanakParagrafi}

Arabuluculuk bürosuna başvurulmasından son tutanağın düzenlendiği tarihe kadar geçen sürede zamanaşımı durur ve hak düşürücü süre işlemez.
${ozelSurecParagrafi}${isDavaSarti ? 'Davacı, arabuluculuk faaliyeti sonunda anlaşmaya varılamadığına ilişkin son tutanağın aslını veya arabulucu tarafından onaylanmış bir örneğini dava dilekçesine eklemek zorundadır.\n' : ''}
${sureParagrafi}

Arabulucu, taraflara ulaşılamaması, taraflar katılmadığı için görüşme yapılamaması yahut yapılan görüşmeler sonucunda anlaşmaya varılması veya varılamaması hâllerinde arabuluculuk faaliyetini sona erdirir ve son tutanağı düzenleyerek durumu derhâl arabuluculuk bürosuna bildirir.

${ucretParagrafi}

${temsilParagrafi}

Sizlerle yapacağımız ilk toplantı, kararlaştırılan ${toplantiTarihi} tarihinde, ${toplantiSaati} saatinde ve ${toplantiYeri} adresinde gerçekleşecektir.

${yaptirimParagrafi}

Toplantı gününde görüşmek dileğiyle, saygılarımla.


                                                                 İmza 
E-posta : ${arabulucuEmail}                                      ${arabulucuAdi}
Telefon : ${arabulucuTel}                                        Arabulucu 
Adres   : ${arabulucuAdres}                                      (Sicil No: ${arabulucuSicil})
`;

  return {
    id: 'davet_mektubu',
    title: 'Arabuluculuk Davet Mektubu',
    subtitle: `${isDavaSarti ? 'Dava Şartı' : 'İhtiyari'} Arabuluculuk Resmi İlk Toplantı Davet Mektubu`,
    type: 'davet',
    contentMarkdown: md,
    contentPlainText: md,
  };
}

// 2. BİLGİLENDİRME VE İLK OTURUM TUTANAĞI (ADB ŞABLONU)
export function generateIlkOturumTutanagi(data: MediationCaseData): GeneratedDocument {
  const isDavaSarti = data.processType === 'dava_sarti';
  const processHeader = isDavaSarti ? 'DAVA ŞARTI ARABULUCULUK' : 'İHTİYARİ ARABULUCULUK';
  const disputeLabel = getDisputeTypeLabel(data.disputeType);

  const buroAdi = formatSafe(data.buroAdi, 'Arabuluculuk Bürosu Adı');
  const buroDosyaNo = formatSafe(data.buroDosyaNo, 'Büro Dosya No');
  const arabuluculukDosyaNo = formatSafe(data.arabuluculukDosyaNo, 'Arabuluculuk Dosya No');
  const basvuruTarihi = formatSafe(data.basvuruTarihi, 'Başvuru Tarihi');

  const basvurucuAdi = formatSafe(data.basvurucu.adSoyadUnvan, 'Başvurucu Adı / Unvanı');
  const basvurucuTc = formatSafe(data.basvurucu.tcVkn, 'Başvurucu T.C. / VKN');
  const basvurucuAdres = formatSafe(data.basvurucu.adres, 'Başvurucu Adresi');
  const basvurucuVekili = data.basvurucu.vekilAdi
    ? `${data.basvurucu.vekilAdi} (${formatSafe(data.basvurucu.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.basvurucu.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const karsiTarafAdi = formatSafe(data.karsiTaraf.adSoyadUnvan, 'Karşı Taraf Adı / Unvanı');
  const karsiTarafTc = formatSafe(data.karsiTaraf.tcVkn, 'Karşı Taraf T.C. / VKN');
  const karsiTarafAdres = formatSafe(data.karsiTaraf.adres, 'Karşı Taraf Adresi');
  const karsiTarafVekili = data.karsiTaraf.vekilAdi
    ? `${data.karsiTaraf.vekilAdi} (${formatSafe(data.karsiTaraf.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.karsiTaraf.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const arabulucuAdi = formatSafe(data.arabulucu.adSoyad, 'Arabulucu Adı Soyadı');
  const arabulucuSicil = formatSafe(data.arabulucu.sicilNo, 'Sicil No');

  const toplantiTarihi = formatSafe(data.toplantiTarihi, 'Toplantı Tarihi (GG.AA.YYYY)');
  const toplantiSaati = formatSafe(data.toplantiSaati, 'Toplantı Saati (SS:DD)');
  const toplantiYeri = formatSafe(data.toplantiYeri, 'Toplantı Yeri / Adresi');
  const uyuşmazlıkKonusu = formatSafe(data.disputeSubject, 'Uyuşmazlık Konusu / Talepler');

  const md = `T.C.
ADALET BAKANLIĞI
ARABULUCULUK DAİRE BAŞKANLIĞI
${buroAdi.toUpperCase()}
ARABULUCULUK BİLGİLENDİRME VE İLK OTURUM TUTANAĞI

BÜRO DOSYA NO         : ${buroDosyaNo}
ARABULUCULUK DOSYA NO : ${arabuluculukDosyaNo}
BAŞVURU TARİHİ        : ${basvuruTarihi}
UYUŞMAZLIK TÜRÜ       : ${disputeLabel}
SÜREÇ TÜRÜ            : ${processHeader}

ARABULUCU
Adı ve Soyadı         : ${arabulucuAdi}
Arabuluculuk Sicil No : ${arabulucuSicil}

BAŞVURUCU (TALEP EDEN)
Adı Soyadı / Unvanı   : ${basvurucuAdi}
T.C. / VKN            : ${basvurucuTc}
Adresi                : ${basvurucuAdres}${basvurucuVekili ? `\nVekili                : ${basvurucuVekili}` : ''}

KARŞI TARAF (MUHATAP)
Adı Soyadı / Unvanı   : ${karsiTarafAdi}
T.C. / VKN            : ${karsiTarafTc}
Adresi                : ${karsiTarafAdres}${karsiTarafVekili ? `\nVekili                : ${karsiTarafVekili}` : ''}

TOPLANTI BİLGİLERİ
Tarih ve Saat         : ${toplantiTarihi} - Saat: ${toplantiSaati}
Toplantı Yeri         : ${toplantiYeri}

BİLGİLENDİRME VE İŞLEYİŞ SÜRECİ:
Yukarıda bilgileri yazılı taraflar / vekilleri belirlenen gün ve saatte arabuluculuk oturumu için hazır bulunmuşlardır.

Arabulucu tarafından taraflara;
1. 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu ve ilgili mevzuat uyarınca arabuluculuğun temel ilkeleri (iradilik, eşitlik, gizlilik ve beyan/belgelerin yargılamada kullanılamaması ilkesi),
2. Arabuluculuk sürecinin nasıl işleyeceği, arabulucunun bağımsız ve tarafsız bir üçüncü kişi olarak müzakereleri kolaylaştıracağı, taraflara çözüm dayatamayacağı ve hukuki tavsiyede bulunamayacağı,
3. Arabuluculuk sürecinin sonunda düzenlenecek olan son tutanağın ve anlaşma halinde tanzim edilecek anlaşma belgesinin hukuki niteliği ile icra edilebilirlik şartları,
4. Sürecin mali yönü, arabuluculuk ücret tarifesi ve masrafların paylaşımı hususlarında ayrıntılı ve aydınlatıcı bilgilendirme yapılmıştır.

TARAFLARIN BEYANLARI:
Taraflar / vekilleri, arabulucunun yapmış olduğu bilgilendirmeyi anladıklarını, sürecin işleyişi hakkında yeterli bilgiye sahip olduklarını, arabuluculuk sürecine devam etmek istediklerini ve uyuşmazlığın müzakeresine geçilmesini kabul ettiklerini beyan etmişlerdir.

Başvurucu taraf uyuşmazlık konusu olarak: "${uyuşmazlıkKonusu}" taleplerini ileri sürmüş ve açıklamalarda bulunmuştur.

Karşı taraf: Başvurucunun iddia ve taleplerini dinlemiş, kendi görüş ve savunmalarını müzakere masasında dile getirmiştir.

SONUÇ:
Taraflar ile ortak ve özel oturumlar yapılarak müzakerelere devam edilmesine karar verilmiş, işbu Arabuluculuk Bilgilendirme ve İlk Oturum Tutanağı oturuma katılanların huzurunda tanzim edilerek birlikte imza altına alınmıştır. ${toplantiTarihi} - Saat: ${toplantiSaati}

İMZA BLOĞU (ADB STANDART FORMATI):

BAŞVURUCU / VEKİLİ               ARABULUCU                   KARŞI TARAF / VEKİLİ
${basvurucuAdi}                  ${arabulucuAdi}              ${karsiTarafAdi}
${basvurucuVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}  Sicil No: ${arabulucuSicil}       ${karsiTarafVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}
       (İmza)                         (İmza)                         (İmza)
`;

  return {
    id: 'ilk_oturum_tutanagi',
    title: 'Bilgilendirme ve İlk Oturum Tutanağı',
    subtitle: `${data.processType === 'dava_sarti' ? 'Dava Şartı' : 'İhtiyari'} Arabuluculuk Resmi İlk Oturum Tutanağı`,
    type: 'ilk_oturum',
    contentMarkdown: md,
    contentPlainText: md,
  };
}

// 3. ANLAŞMAMA SON TUTANAĞI (6325 s.K. m. 17)
export function generateAnlasmamaSonTutanagi(data: MediationCaseData): GeneratedDocument {
  const isDavaSarti = data.processType === 'dava_sarti';
  const processHeader = isDavaSarti ? 'DAVA ŞARTI ARABULUCULUK' : 'İHTİYARİ ARABULUCULUK';
  const disputeLabel = getDisputeTypeLabel(data.disputeType);

  const buroAdi = formatSafe(data.buroAdi, 'Arabuluculuk Bürosu Adı');
  const buroDosyaNo = formatSafe(data.buroDosyaNo, 'Büro Dosya No');
  const arabuluculukDosyaNo = formatSafe(data.arabuluculukDosyaNo, 'Arabuluculuk Dosya No');
  const basvuruTarihi = formatSafe(data.basvuruTarihi, 'Başvuru Tarihi');

  const basvurucuAdi = formatSafe(data.basvurucu.adSoyadUnvan, 'Başvurucu Adı / Unvanı');
  const basvurucuTc = formatSafe(data.basvurucu.tcVkn, 'Başvurucu T.C. / VKN');
  const basvurucuAdres = formatSafe(data.basvurucu.adres, 'Başvurucu Adresi');
  const basvurucuVekili = data.basvurucu.vekilAdi
    ? `${data.basvurucu.vekilAdi} (${formatSafe(data.basvurucu.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.basvurucu.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const karsiTarafAdi = formatSafe(data.karsiTaraf.adSoyadUnvan, 'Karşı Taraf Adı / Unvanı');
  const karsiTarafTc = formatSafe(data.karsiTaraf.tcVkn, 'Karşı Taraf T.C. / VKN');
  const karsiTarafAdres = formatSafe(data.karsiTaraf.adres, 'Karşı Taraf Adresi');
  const karsiTarafVekili = data.karsiTaraf.vekilAdi
    ? `${data.karsiTaraf.vekilAdi} (${formatSafe(data.karsiTaraf.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.karsiTaraf.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const arabulucuAdi = formatSafe(data.arabulucu.adSoyad, 'Arabulucu Adı Soyadı');
  const arabulucuSicil = formatSafe(data.arabulucu.sicilNo, 'Sicil No');

  const toplantiTarihi = formatSafe(data.toplantiTarihi, 'Son Oturum Tarihi (GG.AA.YYYY)');
  const toplantiSaati = formatSafe(data.toplantiSaati, 'Son Oturum Saati (SS:DD)');
  const toplantiYeri = formatSafe(data.toplantiYeri, 'Toplantı Yeri / Adresi');
  const uyuşmazlıkKonusu = formatSafe(data.disputeSubject, 'Uyuşmazlık Konusu / Talepler');
  const anlasmamaNedeni = data.anlasmamaNedeni && data.anlasmamaNedeni.trim().length > 0
    ? data.anlasmamaNedeni
    : 'Taraflar uyuşmazlık konusu alacak kalemleri, hak iddiaları ve miktarları üzerinde yapılan detaylı müzakereler ve teklifler neticesinde bir mutabakata varamamışlardır.';

  const md = `T.C.
ADALET BAKANLIĞI
ARABULUCULUK DAİRE BAŞKANLIĞI
${buroAdi.toUpperCase()}
ARABULUCULUK SON TUTANAĞI (ANLAŞMAMA)

BÜRO DOSYA NO         : ${buroDosyaNo}
ARABULUCULUK DOSYA NO : ${arabuluculukDosyaNo}
BAŞVURU TARİHİ        : ${basvuruTarihi}
UYUŞMAZLIK TÜRÜ       : ${disputeLabel}
SÜREÇ TÜRÜ            : ${processHeader}
SON TUTANAK TARİHİ    : ${toplantiTarihi}
SON TUTANAK SAATİ     : ${toplantiSaati}

ARABULUCU BİLGİLERİ
Adı ve Soyadı         : ${arabulucuAdi}
Arabuluculuk Sicil No : ${arabulucuSicil}

BAŞVURUCU (TALEP EDEN)
Adı Soyadı / Unvanı   : ${basvurucuAdi}
T.C. / VKN            : ${basvurucuTc}
Adresi                : ${basvurucuAdres}${basvurucuVekili ? `\nVekili                : ${basvurucuVekili}` : ''}

KARŞI TARAF (MUHATAP)
Adı Soyadı / Unvanı   : ${karsiTarafAdi}
T.C. / VKN            : ${karsiTarafTc}
Adresi                : ${karsiTarafAdres}${karsiTarafVekili ? `\nVekili                : ${karsiTarafVekili}` : ''}

UYUŞMAZLIK KONUSU VE MÜZAKERELER:
Başvurucu tarafça ileri sürülen ve arabuluculuk sürecine konu edilen uyuşmazlık talepleri:
"${uyuşmazlıkKonusu}"

Yukarıda dosya bilgileri yazılı arabuluculuk süreci kapsamında taraflar / vekilleri ile yapılan oturumlarda uyuşmazlığın çözümü amacıyla tüm müzakere yöntemleri uygulanmış, ortak ve ayrı oturumlarda tarafların talepleri ve menfaatleri ayrıntılı olarak ele alınmıştır.

SONUÇ VE ANLAŞMAMA BEYANI:
Yapılan müzakereler sonucunda; ${anlasmamaNedeni}

Taraflar uyuşmazlığa konu hususlarda ANLAŞAMADIKLARINI beyan etmişlerdir. 

6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu'nun 17. maddesi ve ilgili mevzuat uyarınca arabuluculuk faaliyeti ANLAŞMAMA ile sona ermiş olup, işbu Arabuluculuk Son Tutanağı (Anlaşmama) tanzim edilerek hazır bulunanlarca okunup birlikte imza altına alınmıştır.

Tarih: ${toplantiTarihi} - Saat: ${toplantiSaati}
Toplantı Yeri: ${toplantiYeri}

İMZA BLOĞU (ADB STANDART FORMATI):

BAŞVURUCU / VEKİLİ               ARABULUCU                   KARŞI TARAF / VEKİLİ
${basvurucuAdi}                  ${arabulucuAdi}              ${karsiTarafAdi}
${basvurucuVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}  Sicil No: ${arabulucuSicil}       ${karsiTarafVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}
       (İmza)                         (İmza)                         (İmza)
`;

  return {
    id: 'son_tutanak_anlasmama',
    title: 'Arabuluculuk Anlaşmama Son Tutanağı',
    subtitle: '6325 sayılı Kanun m.17 Uyarınca Resmi ADB Anlaşmama Tutanağı',
    type: 'son_tutanak_anlasmama',
    contentMarkdown: md,
    contentPlainText: md,
  };
}

// 4. ANLAŞMA SON TUTANAĞI (6325 s.K. m. 18)
export function generateAnlasmaSonTutanagi(data: MediationCaseData): GeneratedDocument {
  const isDavaSarti = data.processType === 'dava_sarti';
  const processHeader = isDavaSarti ? 'DAVA ŞARTI ARABULUCULUK' : 'İHTİYARİ ARABULUCULUK';
  const disputeLabel = getDisputeTypeLabel(data.disputeType);

  const buroAdi = formatSafe(data.buroAdi, 'Arabuluculuk Bürosu Adı');
  const buroDosyaNo = formatSafe(data.buroDosyaNo, 'Büro Dosya No');
  const arabuluculukDosyaNo = formatSafe(data.arabuluculukDosyaNo, 'Arabuluculuk Dosya No');
  const basvuruTarihi = formatSafe(data.basvuruTarihi, 'Başvuru Tarihi');

  const basvurucuAdi = formatSafe(data.basvurucu.adSoyadUnvan, 'Başvurucu Adı / Unvanı');
  const basvurucuTc = formatSafe(data.basvurucu.tcVkn, 'Başvurucu T.C. / VKN');
  const basvurucuAdres = formatSafe(data.basvurucu.adres, 'Başvurucu Adresi');
  const basvurucuVekili = data.basvurucu.vekilAdi
    ? `${data.basvurucu.vekilAdi} (${formatSafe(data.basvurucu.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.basvurucu.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const karsiTarafAdi = formatSafe(data.karsiTaraf.adSoyadUnvan, 'Karşı Taraf Adı / Unvanı');
  const karsiTarafTc = formatSafe(data.karsiTaraf.tcVkn, 'Karşı Taraf T.C. / VKN');
  const karsiTarafAdres = formatSafe(data.karsiTaraf.adres, 'Karşı Taraf Adresi');
  const karsiTarafVekili = data.karsiTaraf.vekilAdi
    ? `${data.karsiTaraf.vekilAdi} (${formatSafe(data.karsiTaraf.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.karsiTaraf.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const arabulucuAdi = formatSafe(data.arabulucu.adSoyad, 'Arabulucu Adı Soyadı');
  const arabulucuSicil = formatSafe(data.arabulucu.sicilNo, 'Sicil No');

  const toplantiTarihi = formatSafe(data.toplantiTarihi, 'Son Oturum Tarihi (GG.AA.YYYY)');
  const toplantiSaati = formatSafe(data.toplantiSaati, 'Son Oturum Saati (SS:DD)');
  const toplantiYeri = formatSafe(data.toplantiYeri, 'Toplantı Yeri / Adresi');
  const uyuşmazlıkKonusu = formatSafe(data.disputeSubject, 'Uyuşmazlık Konusu / Talepler');

  const md = `T.C.
ADALET BAKANLIĞI
ARABULUCULUK DAİRE BAŞKANLIĞI
${buroAdi.toUpperCase()}
ARABULUCULUK SON TUTANAĞI (ANLAŞMA)

BÜRO DOSYA NO         : ${buroDosyaNo}
ARABULUCULUK DOSYA NO : ${arabuluculukDosyaNo}
BAŞVURU TARİHİ        : ${basvuruTarihi}
UYUŞMAZLIK TÜRÜ       : ${disputeLabel}
SÜREÇ TÜRÜ            : ${processHeader}
SON TUTANAK TARİHİ    : ${toplantiTarihi}
SON TUTANAK SAATİ     : ${toplantiSaati}

ARABULUCU BİLGİLERİ
Adı ve Soyadı         : ${arabulucuAdi}
Arabuluculuk Sicil No : ${arabulucuSicil}

BAŞVURUCU (TALEP EDEN)
Adı Soyadı / Unvanı   : ${basvurucuAdi}
T.C. / VKN            : ${basvurucuTc}
Adresi                : ${basvurucuAdres}${basvurucuVekili ? `\nVekili                : ${basvurucuVekili}` : ''}

KARŞI TARAF (MUHATAP)
Adı Soyadı / Unvanı   : ${karsiTarafAdi}
T.C. / VKN            : ${karsiTarafTc}
Adresi                : ${karsiTarafAdres}${karsiTarafVekili ? `\nVekili                : ${karsiTarafVekili}` : ''}

UYUŞMAZLIK KONUSU VE MÜZAKERELER:
Başvurucu tarafça ileri sürülen ve arabuluculuk sürecine konu edilen uyuşmazlık talepleri:
"${uyuşmazlıkKonusu}"

Yukarıda dosya bilgileri yazılı arabuluculuk süreci kapsamında taraflar / vekilleri arabulucu huzurunda bir araya gelmiş; uyuşmazlık konusu talepler, karşılıklı hak ve yükümlülükler detaylı bir şekilde müzakere edilmiştir.

SONUÇ VE ANLAŞMA BEYANI:
Yapılan müzakereler sonucunda; taraflar uyuşmazlık konusu tüm hususlarda ve alacak kalemlerinde tam bir mutabakata vararak ANLAŞMIŞLARDIR.

Taraflar arasındaki anlaşmanın şartları, ifa takvimi, ödeme planı ve karşılıklı ibra hükümleri işbu son tutanağın ayrılmaz bir parçası niteliğindeki ${toplantiTarihi} tarihli "ARABULUCULUK ANLAŞMA BELGESİ"nde açıkça düzenlenmiştir.

6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu'nun 18. maddesi ve ilgili mevzuat uyarınca arabuluculuk faaliyeti ANLAŞMA ile başarıyla sonuçlandırılmış olup; taraflara 6325 sayılı Kanun m. 18 fıkra 2 ve fıkra 4 hükümleri (icra edilebilirlik şerhi ve doğrudan ilam niteliği kazanma koşulları) hakkında gerekli yasal hatırlatmalar yapılmıştır.

İşbu Arabuluculuk Son Tutanağı (Anlaşma) taraflarca / vekillerince okunarak müştereken imza altına alınmıştır.

Tarih: ${toplantiTarihi} - Saat: ${toplantiSaati}
Toplantı Yeri: ${toplantiYeri}

İMZA BLOĞU (ADB STANDART FORMATI):

BAŞVURUCU / VEKİLİ               ARABULUCU                   KARŞI TARAF / VEKİLİ
${basvurucuAdi}                  ${arabulucuAdi}              ${karsiTarafAdi}
${basvurucuVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}  Sicil No: ${arabulucuSicil}       ${karsiTarafVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}
       (İmza)                         (İmza)                         (İmza)
`;

  return {
    id: 'son_tutanak_anlasma',
    title: 'Arabuluculuk Anlaşma Son Tutanağı',
    subtitle: '6325 sayılı Kanun m.18 Uyarınca Resmi ADB Anlaşma Tutanağı',
    type: 'son_tutanak_anlasma',
    contentMarkdown: md,
    contentPlainText: md,
  };
}

// 5. ARABULUCULUK ANLAŞMA BELGESİ (6325 s.K. m. 18 / İLAM NİTELİĞİNDE BELGE)
export function generateAnlasmaBelgesi(data: MediationCaseData): GeneratedDocument {
  const isDavaSarti = data.processType === 'dava_sarti';
  const processHeader = isDavaSarti ? 'DAVA ŞARTI ARABULUCULUK' : 'İHTİYARİ ARABULUCULUK';
  const disputeLabel = getDisputeTypeLabel(data.disputeType);

  const buroAdi = formatSafe(data.buroAdi, 'Arabuluculuk Bürosu Adı');
  const buroDosyaNo = formatSafe(data.buroDosyaNo, 'Büro Dosya No');
  const arabuluculukDosyaNo = formatSafe(data.arabuluculukDosyaNo, 'Arabuluculuk Dosya No');

  const basvurucuAdi = formatSafe(data.basvurucu.adSoyadUnvan, 'Başvurucu Adı / Unvanı');
  const basvurucuTc = formatSafe(data.basvurucu.tcVkn, 'Başvurucu T.C. / VKN');
  const basvurucuAdres = formatSafe(data.basvurucu.adres, 'Başvurucu Adresi');
  const basvurucuVekili = data.basvurucu.vekilAdi
    ? `${data.basvurucu.vekilAdi} (${formatSafe(data.basvurucu.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.basvurucu.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const karsiTarafAdi = formatSafe(data.karsiTaraf.adSoyadUnvan, 'Karşı Taraf Adı / Unvanı');
  const karsiTarafTc = formatSafe(data.karsiTaraf.tcVkn, 'Karşı Taraf T.C. / VKN');
  const karsiTarafAdres = formatSafe(data.karsiTaraf.adres, 'Karşı Taraf Adresi');
  const karsiTarafVekili = data.karsiTaraf.vekilAdi
    ? `${data.karsiTaraf.vekilAdi} (${formatSafe(data.karsiTaraf.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.karsiTaraf.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const arabulucuAdi = formatSafe(data.arabulucu.adSoyad, 'Arabulucu Adı Soyadı');
  const arabulucuSicil = formatSafe(data.arabulucu.sicilNo, 'Sicil No');

  const toplantiTarihi = formatSafe(data.toplantiTarihi, 'Anlaşma Tarihi (GG.AA.YYYY)');
  const uyuşmazlıkKonusu = formatSafe(data.disputeSubject, 'Uyuşmazlık Konusu / Talepler');

  const s = data.anlasmaSartlari;
  const tutar = formatSafe(s?.odenecekTutar, 'Anlaşılan Toplam Tutar (Örn: 150.000,00 TL - Yalnızca Yüz Elli Bin Türk Lirası)');
  const odemeSekli = formatSafe(s?.odemeSekli, 'Banka Havalesi / Tek Seferde / Belirtilen Taksitlerle');
  const odemeTarihleri = formatSafe(s?.odemeTarihleri, 'Ödeme Vadesi / Taksit Tarihleri (Örn: 15.10.2026)');
  const alacakliIban = formatSafe(s?.alacakliIban, 'TR00 0000 0000 0000 0000 0000 00');
  const alacakliBanka = formatSafe(s?.alacakliBanka, 'Banka Adı ve Şubesi');
  const alacakliHesapSahibi = formatSafe(s?.alacakliHesapSahibi || data.basvurucu.adSoyadUnvan, 'Hesap Sahibi Adı');

  const md = `T.C.
ADALET BAKANLIĞI
ARABULUCULUK DAİRE BAŞKANLIĞI
${buroAdi.toUpperCase()}
ARABULUCULUK ANLAŞMA BELGESİ
(6325 sayılı Kanun m. 18 Uyarınca)

BÜRO DOSYA NO         : ${buroDosyaNo}
ARABULUCULUK DOSYA NO : ${arabuluculukDosyaNo}
UYUŞMAZLIK TÜRÜ       : ${disputeLabel}
SÜREÇ TÜRÜ            : ${processHeader}
DÜZENLENME TARİHİ     : ${toplantiTarihi}

ARABULUCU
Adı ve Soyadı         : ${arabulucuAdi}
Arabuluculuk Sicil No : ${arabulucuSicil}

BAŞVURUCU (ALACAKLI / HAK SAHİBİ)
Adı Soyadı / Unvanı   : ${basvurucuAdi}
T.C. / VKN            : ${basvurucuTc}
Adresi                : ${basvurucuAdres}${basvurucuVekili ? `\nVekili                : ${basvurucuVekili}` : ''}

KARŞI TARAF (BORÇLU / YÜKÜMLÜ)
Adı Soyadı / Unvanı   : ${karsiTarafAdi}
T.C. / VKN            : ${karsiTarafTc}
Adresi                : ${karsiTarafAdres}${karsiTarafVekili ? `\nVekili                : ${karsiTarafVekili}` : ''}

ANLAŞMA HÜKÜMLERİ VE EDİMLER:

MADDE 1 - UYUŞMAZLIK KONUSU:
Başvurucu taraf ile Karşı Taraf arasında mevcut olan ve işbu arabuluculuk sürecine konu teşkil eden uyuşmazlık; "${uyuşmazlıkKonusu}" taleplerinden ibarettir.

MADDE 2 - ANLAŞILAN TUTAR VE ÖDEME PLANI:
1. Taraflar, uyuşmazlığa konu tüm alacak ve hak taleplerinin tasfiyesi amacıyla Karşı Taraf'ın Başvurucu'ya toplam ${tutar} net tutarında ödeme yapması hususunda tam bir mutabakata varmışlardır.
2. Ödeme Şekli: Söz konusu bedel ${odemeSekli} suretiyle ödenecektir.
3. Ödeme Vadesi / Takvimi: Ödeme ${odemeTarihleri} tarihinde/tarihlerinde eksiksiz olarak ifa edilecektir.
4. Ödemenin Yapılacağı Banka Hesabı:
   - Banka / Şube     : ${alacakliBanka}
   - Hesap Sahibi     : ${alacakliHesapSahibi}
   - IBAN No          : ${alacakliIban}

MADDE 3 - İBRA VE FERAGAT:
Başvurucu taraf; yukarıda 2. maddede kararlaştırılan ödemenin eksiksiz ve gününde belirtilen banka hesabına yapılması kaydıyla, işbu uyuşmazlığa ve arabuluculuk başvurusuna konu tüm hak ve alacaklarından feragat ettiğini, Karşı Taraf'ı gayrikabili rücu ibra ettiğini, bahse konu uyuşmazlıkla ilgili olarak Karşı Taraf aleyhine gerek adli gerekse icra mercileri nezdinde başkaca hiçbir talepte bulunmayacağını gayrikabili rücu kabul, beyan ve taahhüt eder.

MADDE 4 - ARABULUCULUK ÜCRETİ VE MASRAFLAR:
Arabuluculuk Asgari Ücret Tarifesi uyarınca tahakkuk eden arabuluculuk ücreti ve masrafları, taraflarca aksi kararlaştırılmadığı müddetçe eşit olarak karşılanacaktır. (Tarafların anlaşması gereğince arabuluculuk ücreti [Karşı Tarafça / Eşit Olarak] ödenecektir.)

MADDE 5 - İCRA EDİLEBİLİRLİK ŞERHİ VE İLAM NİTELİĞİ:
6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu'nun 18. maddesinin 4. fıkrası uyarınca; arabuluculuk faaliyeti sonunda varılan anlaşma, taraflar, arabulucu ve vekilleri (avukatları) tarafından birlikte imzalandığı takdirde doğrudan İCRA EDİLEBİLİR İLAM NİTELİĞİNDEDİR. Vekillerin imzası bulunmaması halinde sulh hukuk mahkemesinden icra edilebilirlik şerhi alınabilecektir.

İşbu 5 (beş) maddeden ibaret Arabuluculuk Anlaşma Belgesi, tarafların serbest iradeleriyle müzakere edilerek 3 (üç) nüsha halinde tanzim edilmiş, okunmuş ve doğruluğu onaylanarak müştereken imza altına alınmıştır. ${toplantiTarihi}

İMZA BLOĞU (ADB STANDART FORMATI):

BAŞVURUCU / VEKİLİ               ARABULUCU                   KARŞI TARAF / VEKİLİ
${basvurucuAdi}                  ${arabulucuAdi}              ${karsiTarafAdi}
${basvurucuVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}  Sicil No: ${arabulucuSicil}       ${karsiTarafVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}
       (İmza)                         (İmza)                         (İmza)
`;

  return {
    id: 'anlasma_belgesi',
    title: 'Arabuluculuk Anlaşma Belgesi',
    subtitle: '6325 sayılı Kanun m.18 Uyarınca İlam Niteliğinde Anlaşma Belgesi',
    type: 'anlasma_belgesi',
    contentMarkdown: md,
    contentPlainText: md,
  };
}

// 5. TOPLANTIYA KATILMAMA / MAZERETSİZ GELMEME SON TUTANAĞI (6325 s.K. m. 18/A f. 11)
export function generateKatilmamaSonTutanagi(data: MediationCaseData): GeneratedDocument {
  const isDavaSarti = data.processType === 'dava_sarti';
  const processHeader = isDavaSarti ? 'DAVA ŞARTI ARABULUCULUK' : 'İHTİYARİ ARABULUCULUK';
  const disputeLabel = getDisputeTypeLabel(data.disputeType);

  const buroAdi = formatSafe(data.buroAdi, 'Arabuluculuk Bürosu Adı');
  const buroDosyaNo = formatSafe(data.buroDosyaNo, 'Büro Dosya No');
  const arabuluculukDosyaNo = formatSafe(data.arabuluculukDosyaNo, 'Arabuluculuk Dosya No');
  const basvuruTarihi = formatSafe(data.basvuruTarihi, 'Başvuru Tarihi');

  const basvurucuAdi = formatSafe(data.basvurucu.adSoyadUnvan, 'Başvurucu Adı / Unvanı');
  const basvurucuTc = formatSafe(data.basvurucu.tcVkn, 'Başvurucu T.C. / VKN');
  const basvurucuAdres = formatSafe(data.basvurucu.adres, 'Başvurucu Adresi');
  const basvurucuVekili = data.basvurucu.vekilAdi
    ? `${data.basvurucu.vekilAdi} (${formatSafe(data.basvurucu.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.basvurucu.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const karsiTarafAdi = formatSafe(data.karsiTaraf.adSoyadUnvan, 'Karşı Taraf Adı / Unvanı');
  const karsiTarafTc = formatSafe(data.karsiTaraf.tcVkn, 'Karşı Taraf T.C. / VKN');
  const karsiTarafAdres = formatSafe(data.karsiTaraf.adres, 'Karşı Taraf Adresi');
  const karsiTarafVekili = data.karsiTaraf.vekilAdi
    ? `${data.karsiTaraf.vekilAdi} (${formatSafe(data.karsiTaraf.vekilBaro, 'Baro')} Barosu - Sicil: ${formatSafe(data.karsiTaraf.vekilBaroSicilNo, 'Sicil No')})`
    : '';

  const arabulucuAdi = formatSafe(data.arabulucu.adSoyad, 'Arabulucu Adı Soyadı');
  const arabulucuSicil = formatSafe(data.arabulucu.sicilNo, 'Sicil No');

  const toplantiTarihi = formatSafe(data.toplantiTarihi, 'Toplantı Tarihi (GG.AA.YYYY)');
  const toplantiSaati = formatSafe(data.toplantiSaati, 'Toplantı Saati (SS:DD)');
  const toplantiYeri = formatSafe(data.toplantiYeri, 'Toplantı Yeri / Adresi');
  const uyuşmazlıkKonusu = formatSafe(data.disputeSubject, 'Uyuşmazlık Konusu / Talepler');

  const md = `T.C.
ADALET BAKANLIĞI
ARABULUCULUK DAİRE BAŞKANLIĞI
${buroAdi.toUpperCase()}
ARABULUCULUK SON TUTANAĞI (OTURUMA KATILMAMA / MAZERETSİZ GELMEME)

BÜRO DOSYA NO         : ${buroDosyaNo}
ARABULUCULUK DOSYA NO : ${arabuluculukDosyaNo}
BAŞVURU TARİHİ        : ${basvuruTarihi}
UYUŞMAZLIK TÜRÜ       : ${disputeLabel}
SÜREÇ TÜRÜ            : ${processHeader}
SON TUTANAK TARİHİ    : ${toplantiTarihi}
SON TUTANAK SAATİ     : ${toplantiSaati}

ARABULUCU BİLGİLERİ
Adı ve Soyadı         : ${arabulucuAdi}
Arabuluculuk Sicil No : ${arabulucuSicil}

BAŞVURUCU (TALEP EDEN)
Adı Soyadı / Unvanı   : ${basvurucuAdi}
T.C. / VKN            : ${basvurucuTc}
Adresi                : ${basvurucuAdres}${basvurucuVekili ? `\nVekili                : ${basvurucuVekili}` : ''}

KARŞI TARAF (MUHATAP)
Adı Soyadı / Unvanı   : ${karsiTarafAdi}
T.C. / VKN            : ${karsiTarafTc}
Adresi                : ${karsiTarafAdres}${karsiTarafVekili ? `\nVekili                : ${karsiTarafVekili}` : ''}

UYUŞMAZLIK KONUSU:
Başvurucu tarafça arabuluculuk bürosuna yapılan başvuru konusu:
"${uyuşmazlıkKonusu}" taleplerinden ibarettir.

SÜRECİN İŞLEYİŞİ VE KATILMAMA HUSUSU:
Yukarıda bilgileri yazılı arabuluculuk dosyasında, arabulucu tarafından taraflara ilk oturum gün, saat ve yerini bildirir davet mektubu usulüne uygun olarak tebliğ/teslim edilmiş, iletişim kanalları (telefon, e-posta, SMS) vasıtasıyla ayrıca toplantı tarihi hatırlatılmıştır.

Belirlenen ${toplantiTarihi} günü, saat ${toplantiSaati} itibarıyla ${toplantiYeri} adresinde yapılan ilk arabuluculuk oturumunda;
- Başvurucu (${basvurucuAdi}${basvurucuVekili ? ' vekili ' + basvurucuVekili : ''}) hazır bulunmuştur.
- Karşı taraf (${karsiTarafAdi}${karsiTarafVekili ? ' vekili ' + karsiTarafVekili : ''}) geçerli bir mazeret bildirmeksizin arabuluculuk ilk oturumuna KATILMAMIŞTIR.

YASAL SONUÇ VE İHTARAT (6325 sayılı Kanun m. 18/A fıkra 11):
6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu'nun 18/A maddesinin 11. fıkrası uyarınca;
"Taraflardan birinin geçerli bir mazeret göstermeksizin ilk toplantıya katılmaması sebebiyle arabuluculuk faaliyetinin sona ermesi durumunda toplantıya katılmayan taraf, son tutanakta belirtilir ve bu taraf davada kısmen veya tamamen haklı çıksa bile yargılama giderinin tamamından sorumlu tutulur. Ayrıca bu taraf lehine vekâlet ücretine hükmedilmez." hükmü amirdir. (Tüketici uyuşmazlıklarında bu yaptırım tüketici aleyhine uygulanmaz.)

SONUÇ:
Karşı tarafın geçerli bir mazeret bildirmeksizin oturuma katılmaması sebebiyle görüşme ve müzakere yapılamamış, 6325 sayılı Kanun hükümleri gereğince arabuluculuk faaliyeti SONA ERDİRİLMİŞTİR.

İşbu Arabuluculuk Son Tutanağı (Oturuma Katılmama), hazır bulunan başvurucu / vekili ve arabulucu tarafından okunarak birlikte imza altına alınmıştır.

Tarih: ${toplantiTarihi} - Saat: ${toplantiSaati}
Toplantı Yeri: ${toplantiYeri}

İMZA BLOĞU (ADB STANDART FORMATI):

BAŞVURUCU / VEKİLİ                                ARABULUCU
${basvurucuAdi}                                   ${arabulucuAdi}
${basvurucuVekili ? '(Vekil Asaleten/Vekaleten)' : '(Asil / Temsilci)'}                   Sicil No: ${arabulucuSicil}
       (İmza)                                          (İmza)
`;

  return {
    id: 'son_tutanak_katilmama',
    title: 'Arabuluculuk Katılmama Son Tutanağı',
    subtitle: '6325 s.K. m.18/A f.11 Geçerli Mazeretsiz Katılmama Sebebiyle Sona Erme',
    type: 'son_tutanak_anlasmama',
    contentMarkdown: md,
    contentPlainText: md,
  };
}

export function generateAllDocuments(data: MediationCaseData, scenario: ScenarioType): GeneratedDocument[] {
  const docs: GeneratedDocument[] = [];

  if (scenario === 'davet') {
    // 1. İlk Toplantı Davet Mektubu
    docs.push(generateDavetMektubu(data));
  } else if (scenario === 'ilk_oturum') {
    // 2. Bilgilendirme ve İlk Oturum Tutanağı
    docs.push(generateIlkOturumTutanagi(data));
  } else if (scenario === 'anlasmama') {
    // 3. Anlaşamama Son Tutanağı
    docs.push(generateAnlasmamaSonTutanagi(data));
  } else if (scenario === 'katilmama') {
    // 4. Katılmama / Mazeretsiz Gelmeme Son Tutanağı
    docs.push(generateKatilmamaSonTutanagi(data));
  } else if (scenario === 'anlasma') {
    // 5. Anlaşma Son Tutanağı + Anlaşma Belgesi
    docs.push(generateAnlasmaSonTutanagi(data));
    docs.push(generateAnlasmaBelgesi(data));
  } else if (scenario === 'anlasma_belgesi') {
    // 6. Yalnızca İlam Niteliğinde Anlaşma Belgesi
    docs.push(generateAnlasmaBelgesi(data));
  } else {
    // hepsi (Paket Olarak Tümü)
    docs.push(generateDavetMektubu(data));
    docs.push(generateIlkOturumTutanagi(data));
    docs.push(generateAnlasmaSonTutanagi(data));
    docs.push(generateAnlasmamaSonTutanagi(data));
    docs.push(generateKatilmamaSonTutanagi(data));
    docs.push(generateAnlasmaBelgesi(data));
  }

  return docs;
}
