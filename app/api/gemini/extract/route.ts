import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            'GEMINI_API_KEY bulunamadı. Lütfen .env.local dosyanızda GEMINI_API_KEY ortam değişkenini tanımlayın.',
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { text, fileData, mimeType } = body;

    if (!text && !fileData) {
      return NextResponse.json(
        { error: 'Lütfen incelenecek bir dosya veya metin sağlayın.' },
        { status: 400 }
      );
    }

    const systemPrompt = `Sen Türkiye Cumhuriyeti Adalet Bakanlığı Arabuluculuk Daire Başkanlığı (ADB) standartlarına, 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu'na ve Türk hukuk usullerine tam hakim uzman bir baş arabuluculuk hukuk danışmanısın.

GÖREV VE KESİN KURALLAR:
1. KESİNLİKLE KENDİNDEN BİLGİ UYDURMA VEYA TAHMİNİ VERİ EKLEME.
2. Sana sunulan belgede veya metinde bir bilgi açıkça yer almıyorsa o alanı KESİNLİKLE BOŞ STRING ("") OLARAK BIRAK. Asla varsayımsal tarih, saat, kişi adı, TC/VKN, adres, dosya numarası veya IBAN üretme.
3. Sadece ve sadece metinde açıkça yazan gerçek verileri tespit et ve aşağıdaki yapılandırılmış JSON formatında döndür:

1. processType: "dava_sarti" veya "ihtiyari"
2. disputeType: "ihtiyari" | "isci_isveren" | "ticari" | "tasinir_tasinmaz_paylasim" | "diger_dava_sarti" | "tarimsal_uretim" | "tuketici"
3. disputeSubject: Metindeki uyuşmazlık konusu veya talepler (metinde yoksa "")
4. buroAdi: Arabuluculuk bürosu adı (metinde yoksa "")
5. buroDosyaNo: Büro dosya numarası (metinde yoksa "")
6. arabuluculukDosyaNo: Arabuluculuk dosya numarası (metinde yoksa "")
7. basvuruTarihi: Başvuru tarihi (metinde yoksa "")
8. gorevlendirmeTarihi: Görevlendirme tarihi (metinde yoksa "")
9. basvurucu:
   - adSoyadUnvan: Başvurucu adı soyadı veya unvanı (metinde yoksa "")
   - tcVkn: TC Kimlik No veya Vergi Kimlik No (metinde yoksa "")
   - adres: Adresi (metinde yoksa "")
   - telefon: Telefonu (metinde yoksa "")
   - eposta: E-postası (metinde yoksa "")
   - vekilAdi: Vekil Adı Soyadı (metinde yoksa "")
   - vekilBaro: Kayıtlı olduğu Baro (metinde yoksa "")
   - vekilBaroSicilNo: Baro sicil numarası (metinde yoksa "")
   - vekilAdres: Vekil adresi (metinde yoksa "")
10. karsiTaraf:
   - adSoyadUnvan: Karşı taraf adı soyadı veya unvanı (metinde yoksa "")
   - tcVkn: TC Kimlik No veya Vergi Kimlik No (metinde yoksa "")
   - adres: Adresi (metinde yoksa "")
   - telefon: Telefonu (metinde yoksa "")
   - eposta: E-postası (metinde yoksa "")
   - vekilAdi: Vekil Adı Soyadı (metinde yoksa "")
   - vekilBaro: Kayıtlı olduğu Baro (metinde yoksa "")
   - vekilBaroSicilNo: Baro sicil numarası (metinde yoksa "")
   - vekilAdres: Vekil adresi (metinde yoksa "")
11. arabulucu:
   - adSoyad: Görevli Arabulucu Adı Soyadı (metinde yoksa "")
   - sicilNo: Arabuluculuk Sicil Numarası (metinde yoksa "")
   - iletisim: Telefon / E-posta (metinde yoksa "")
   - adres: Çalışma adresi (metinde yoksa "")
12. toplantiTarihi: Toplantı tarihi (metinde açıkça belirtilmişse yaz, yoksa "")
13. toplantiSaati: Toplantı saati (metinde açıkça belirtilmişse yaz, yoksa "")
14. toplantiYeri: Toplantı yeri (metinde açıkça belirtilmişse yaz, yoksa "")`;

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

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'arabulucu-ai-extract',
        },
      },
    });

    const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
    const response = await ai.models.generateContent({
      model,
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
