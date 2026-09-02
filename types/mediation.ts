export type DisputeType =
  | 'ihtiyari' // İhtiyari
  | 'isci_isveren' // İşçi İşveren (Dava Şartı)
  | 'ticari' // Ticari (Dava Şartı)
  | 'tasinir_tasinmaz_paylasim' // Taşınır ve Taşınmazların Paylaştırılması ve Ortaklığın Giderilmesi (Dava Şartı)
  | 'diger_dava_sarti' // Diğer (Dava Şartı)
  | 'tarimsal_uretim' // Tarımsal Üretim Sözleşmesinden Kaynaklanan (Dava Şartı)
  | 'tuketici' // Tüketici (Dava Şartı)
  // Geriye dönük uyumluluk aliasları:
  | 'is_hukuku'
  | 'kira_tasinmaz'
  | 'diger';

export type ProcessType = 'dava_sarti' | 'ihtiyari';

export type ScenarioType =
  | 'davet' // 1. İlk Toplantı Davet Mektubu
  | 'ilk_oturum' // 2. Bilgilendirme ve İlk Oturum Tutanağı
  | 'anlasma' // 3. Son Tutanak (Anlaşma) + Anlaşma Belgesi
  | 'anlasmama' // 4. Son Tutanak (Anlaşamama)
  | 'katilmama' // 5. Son Tutanak (Toplantıya Katılmama / Mazeretsiz Gelmeme)
  | 'anlasma_belgesi' // 6. Anlaşma Belgesi (m.18)
  | 'hepsi'; // Tüm Evraklar (Paket)

export interface DisputeTypeOption {
  id: DisputeType;
  label: string;
  legalBasis: string;
  defaultProcessType: ProcessType;
  description: string;
}

export const OFFICIAL_DISPUTE_TYPES: DisputeTypeOption[] = [
  {
    id: 'ihtiyari',
    label: 'İhtiyari',
    legalBasis: '6325 sayılı HUAK m.1 vd.',
    defaultProcessType: 'ihtiyari',
    description: 'Tarafların serbest iradesiyle başvurduğu ihtiyari genel hukuk uyuşmazlıkları',
  },
  {
    id: 'isci_isveren',
    label: 'İşçi İşveren (Dava Şartı)',
    legalBasis: '7036 sayılı Kanun m.3',
    defaultProcessType: 'dava_sarti',
    description: 'Kıdem, ihbar, fazla mesai, ücret, yıllık izin ve işe iade alacakları',
  },
  {
    id: 'ticari',
    label: 'Ticari (Dava Şartı)',
    legalBasis: '6102 sayılı TTK m.5/A',
    defaultProcessType: 'dava_sarti',
    description: 'Konusu bir miktar paranın ödenmesi olan ticari alacak ve tazminat talepleri',
  },
  {
    id: 'tasinir_tasinmaz_paylasim',
    label: 'Taşınır ve Taşınmazların Paylaştırılması ve Ortaklığın Giderilmesi (Dava Şartı)',
    legalBasis: '6325 sayılı HUAK m.18/B (7445 s.K.)',
    defaultProcessType: 'dava_sarti',
    description: 'Ortaklığın giderilmesi (izale-i şüyu), taşınır ve taşınmazların paylaştırılması ve kat mülkiyeti',
  },
  {
    id: 'diger_dava_sarti',
    label: 'Diğer (Dava Şartı)',
    legalBasis: '6325 sayılı HUAK ve İlgili Mevzuat',
    defaultProcessType: 'dava_sarti',
    description: 'Komşuluk hukuku, kira uyuşmazlıkları ve kanunla dava şartı kılınan diğer uyuşmazlıklar',
  },
  {
    id: 'tarimsal_uretim',
    label: 'Tarımsal Üretim Sözleşmesinden Kaynaklanan (Dava Şartı)',
    legalBasis: '5488 sayılı Kanun m.13/A (7442 s.K.)',
    defaultProcessType: 'dava_sarti',
    description: 'Sözleşmeli tarımsal üretim ve teslim sözleşmelerinden doğan uyuşmazlıklar',
  },
  {
    id: 'tuketici',
    label: 'Tüketici (Dava Şartı)',
    legalBasis: '6502 sayılı TKHK m.73/A',
    defaultProcessType: 'dava_sarti',
    description: 'Tüketici mahkemelerinin görev alanına giren parasal sınır üzerindeki uyuşmazlıklar',
  },
];

export interface PartyInfo {
  adSoyadUnvan: string;
  tcVkn: string;
  adres: string;
  telefon?: string;
  eposta?: string;
  vekilAdi?: string;
  vekilBaro?: string;
  vekilBaroSicilNo?: string;
  vekilAdres?: string;
  vekilTelefon?: string;
}

export interface MediatorInfo {
  adSoyad: string;
  sicilNo: string;
  iletisim?: string;
  telefon?: string;
  eposta?: string;
  adres?: string;
  odaYeri?: string;
  bankaIban?: string;
}

export interface MediationCaseData {
  // Dosya Bilgileri
  processType: ProcessType;
  disputeType: DisputeType;
  disputeSubject: string; // Uyuşmazlık Konusu / Talepler
  buroAdi: string; // ör: İstanbul Arabuluculuk Bürosu
  buroDosyaNo: string; // ör: 2026/1234
  arabuluculukDosyaNo: string; // ör: 2026/567
  basvuruTarihi: string; // YYYY-MM-DD veya GG.AA.YYYY
  gorevlendirmeTarihi?: string;

  // Taraflar
  basvurucu: PartyInfo;
  karsiTaraf: PartyInfo;

  // Arabulucu
  arabulucu: MediatorInfo;

  // Oturum Bilgileri
  toplantiTarihi: string;
  toplantiSaati: string;
  toplantiYeri: string;
  toplantiTuru: 'fiziki' | 'telekonferans' | 'karma';

  // Anlaşma / Anlaşmama Detayları
  anlasmamaNedeni?: string;
  anlasmaSartlari?: {
    odenecekTutar?: string;
    odemeSekli?: string;
    odemeTarihleri?: string;
    alacakliIban?: string;
    alacakliBanka?: string;
    alacakliHesapSahibi?: string;
    ibraVeFeragatMetni?: string;
    ozelMaddeler?: string[];
  };

  // Ek notlar
  ekNotlar?: string;
}

export interface GeneratedDocument {
  id: string;
  title: string;
  subtitle: string;
  type: 'davet' | 'ilk_oturum' | 'son_tutanak_anlasma' | 'son_tutanak_anlasmama' | 'anlasma_belgesi';
  contentMarkdown: string;
  contentPlainText: string;
}
