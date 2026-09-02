import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, fileData, mimeType } = body;

    if (!text && !fileData) {
      return NextResponse.json(
        { error: 'Lütfen incelenecek bir dosya veya metin sağlayın.' },
        { status: 400 }
      );
    }

    const systemPrompt = `Sen Türkiye Cumhuriyeti Adalet Bakanlığı Arabuluculuk Daire Başkanlığı (ADB) standartlarına, 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu'na ve Türk hukuk usullerine tam hakim uzman bir baş arabuluculuk hukuk danışmanısın.

Görevin: Sana sunulan arabuluculuk başvuru belgesi, UYAP görevlendirme yazısı, tensip tutanağı, UDF metni veya dilekçeden şu bilgileri %100 doğrulukla tespit edip yapılandırılmış JSON olarak döndürmektir:

1. processType: "dava_sarti" veya "ihtiyari"
2. disputeType: "ihtiyari" | "isci_isveren" | "ticari" | "tasinir_tasinmaz_paylasim" | "diger_dava_sarti" | "tarimsal_uretim" | "tuketici"
   - "ihtiyari": İhtiyari Arabuluculuk
   - "isci_isveren": İşçi İşveren (Dava Şartı) (kıdem, ihbar, fazla mesai, ücret, işe iade vb.)
   - "ticari": Ticari (Dava Şartı) (ticari alacak, fatura, cari hesap, çek-senet, ticari tazminat vb.)
   - "tasinir_tasinmaz_paylasim": Taşınır ve Taşınmazların Paylaştırılması ve Ortaklığın Giderilmesi (Dava Şartı) (izale-i şüyu, paydaşlık, miras taksimi vb.)
   - "diger_dava_sarti": Diğer (Dava Şartı) (kira uyuşmazlıkları, kat mülkiyeti, komşuluk hakkı vb.)
   - "tarimsal_uretim": Tarımsal Üretim Sözleşmesinden Kaynaklanan (Dava Şartı)
   - "tuketici": Tüketici (Dava Şartı) (ayıplı mal, hizmet, konut tüketici uyuşmazlığı vb.)
3. disputeSubject: Uyuşmazlık konusu veya talepler (ör: "Kıdem tazminatı, ihbar tazminatı, fazla mesai alacağı, yıllık izin ücreti" veya "Taşınmazın aynen taksimi ve ortaklığın giderilmesi" veya "Faturaya dayalı ticari alacak")
4. buroAdi: Arabuluculuk bürosu adı (ör: "İstanbul Arabuluculuk Bürosu", "Ankara Arabuluculuk Bürosu")
5. buroDosyaNo: Büro dosya numarası (ör: "2026/1234")
6. arabuluculukDosyaNo: Arabuluculuk dosya numarası (ör: "2026/567")
7. basvuruTarihi: Başvuru tarihi (GG.AA.YYYY formatında)
8. gorevlendirmeTarihi: Görevlendirme tarihi (varsa)
9. basvurucu:
   - adSoyadUnvan: Başvurucu / Talep eden adı soyadı veya şirket unvanı
   - tcVkn: TC Kimlik No veya Vergi Kimlik No
   - adres: Adresi
   - telefon: Telefonu (varsa)
   - eposta: E-postası (varsa)
   - vekilAdi: Vekil (Avukat) Adı Soyadı (varsa)
   - vekilBaro: Kayıtlı olduğu Baro (ör: "İstanbul")
   - vekilBaroSicilNo: Baro sicil numarası (varsa)
   - vekilAdres: Vekil adresi
10. karsiTaraf:
   - adSoyadUnvan: Karşı taraf / Muhatap adı soyadı veya şirket unvanı
   - tcVkn: TC Kimlik No veya Vergi Kimlik No
   - adres: Adresi
   - telefon: Telefonu (varsa)
   - eposta: E-postası (varsa)
   - vekilAdi: Vekil (Avukat) Adı Soyadı (varsa)
   - vekilBaro: Kayıtlı olduğu Baro
   - vekilBaroSicilNo: Baro sicil numarası
   - vekilAdres: Vekil adresi
11. arabulucu:
   - adSoyad: Görevli Arabulucu Adı Soyadı
   - sicilNo: Arabuluculuk Sicil Numarası (ADB sicili)
   - iletisim: Telefon / E-posta
   - adres: Çalışma adresi
12. toplantiTarihi: Toplantı tarihi (metinde belirtilmişse veya boş ise bugünden 7 gün sonrası için öneri)
13. toplantiSaati: Toplantı saati (örn: "14:00")
14. toplantiYeri: Toplantı yeri (ör: "Arabuluculuk Bürosu Toplantı Salonu" veya "Arabulucu Çalışma Ofisi")

Eğer bir bilgi metinde kesinlikle yer almıyorsa boş string ("") bırak. Tahmin yapma, ancak uyuşmazlık türü için metindeki taleplerden (ör: kıdem/ihbar -> is_hukuku, kira -> kira_tasinmaz) doğru sınıflandırmayı yap.`;

    const contents: Array<string | { text?: string; inlineData?: { mimeType: string; data: string } }> = [];

    if (fileData && mimeType) {
      contents.push({
        inlineData: {
          mimeType,
          data: fileData,
        },
      });
    }

    if (text) {
      contents.push({
        text: `Lütfen aşağıdaki arabuluculuk başvuru belgesi / UDF metnini analiz et ve bilgileri çıkar:\n\n${text}`,
      });
    } else {
      contents.push({
        text: 'Lütfen ekteki belgeden arabuluculuk süreci, dosya, taraf ve arabulucu bilgilerini çıkar.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents as unknown as string,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            processType: { type: Type.STRING, description: '"dava_sarti" or "ihtiyari"' },
            disputeType: {
              type: Type.STRING,
              description: 'ihtiyari, isci_isveren, ticari, tasinir_tasinmaz_paylasim, diger_dava_sarti, tarimsal_uretim, tuketici'
            },
            disputeSubject: { type: Type.STRING },
            buroAdi: { type: Type.STRING },
            buroDosyaNo: { type: Type.STRING },
            arabuluculukDosyaNo: { type: Type.STRING },
            basvuruTarihi: { type: Type.STRING },
            gorevlendirmeTarihi: { type: Type.STRING },
            basvurucu: {
              type: Type.OBJECT,
              properties: {
                adSoyadUnvan: { type: Type.STRING },
                tcVkn: { type: Type.STRING },
                adres: { type: Type.STRING },
                telefon: { type: Type.STRING },
                eposta: { type: Type.STRING },
                vekilAdi: { type: Type.STRING },
                vekilBaro: { type: Type.STRING },
                vekilBaroSicilNo: { type: Type.STRING },
                vekilAdres: { type: Type.STRING },
              },
              required: ['adSoyadUnvan'],
            },
            karsiTaraf: {
              type: Type.OBJECT,
              properties: {
                adSoyadUnvan: { type: Type.STRING },
                tcVkn: { type: Type.STRING },
                adres: { type: Type.STRING },
                telefon: { type: Type.STRING },
                eposta: { type: Type.STRING },
                vekilAdi: { type: Type.STRING },
                vekilBaro: { type: Type.STRING },
                vekilBaroSicilNo: { type: Type.STRING },
                vekilAdres: { type: Type.STRING },
              },
              required: ['adSoyadUnvan'],
            },
            arabulucu: {
              type: Type.OBJECT,
              properties: {
                adSoyad: { type: Type.STRING },
                sicilNo: { type: Type.STRING },
                iletisim: { type: Type.STRING },
                adres: { type: Type.STRING },
              },
              required: ['adSoyad'],
            },
            toplantiTarihi: { type: Type.STRING },
            toplantiSaati: { type: Type.STRING },
            toplantiYeri: { type: Type.STRING },
          },
          required: ['processType', 'disputeType', 'basvurucu', 'karsiTaraf', 'arabulucu'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json({ success: true, data: parsed });
  } catch (error: unknown) {
    console.error('Extraction error:', error);
    const message = error instanceof Error ? error.message : 'Belge analiz edilirken bir hata oluştu.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
