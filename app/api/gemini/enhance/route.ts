import { GoogleGenAI } from '@google/genai';
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

    const { action, currentText, prompt, caseData } = await req.json();

    const systemPrompt = `Sen T.C. Adalet Bakanlığı Arabuluculuk Daire Başkanlığı standartlarına ve 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu mevzuatına %100 hakim uzman bir hukukçusun.
Amacın arabuluculuk evraklarındaki hükümleri (özellikle anlaşma şartları, ibra, feragat, taksitlendirme, icra kabiliyeti vb.) ADB'nin en güncel ve en sağlam hukuki şablonlarına uygun olarak yazmak veya geliştirmektir.
KESİN KURAL: Asla kendinden uydurma bilgi veya varsayımsal veri (tutar, isim, tarih, IBAN, banka adı vb.) ekleme. Eğer bir bilgi sağlanmamışsa veya eksikse, o kısmı "...." şeklinde bırak.
Cevaplarında doğrudan resmi evrağa eklenebilecek duru, kesin ve Türk borçlar/iş/ticaret hukukuna tam uyumlu maddeler ve metinler sun.`;

    let userPrompt = '';
    if (action === 'generate_agreement_clause') {
      userPrompt = `Şu arabuluculuk uyuşmazlığı ve anlaşma şartları için ADB standartlarında resmi "Anlaşma Şartları, Ödeme Takvimi ve İbra/Feragat Hükmü" oluştur:
Uyuşmazlık: ${caseData?.disputeSubject || '....'}
Anlaşılan Tutar: ${caseData?.anlasmaSartlari?.odenecekTutar || '....'}
Ödeme Detayı: ${prompt || '....'}
IBAN: ${caseData?.anlasmaSartlari?.alacakliIban || '....'}
Not: Bilgisi verilmemiş hiçbir alanı kendinden uydurma, eksik bilgileri doğrudan "...." olarak bırak.
Lütfen doğrudan evrağa yapıştırılmaya hazır resmi hukuki metin üret.`;
    } else if (action === 'refine_text') {
      userPrompt = `Aşağıdaki arabuluculuk tutanak metnini ADB resmi kalıplarına ve 6325 sayılı Kanun'a göre kusursuzlaştır:
İstek: ${prompt}
Mevcut Metin:
${currentText}`;
    } else {
      userPrompt = prompt;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'arabulucu-ai-enhance',
        },
      },
    });

    const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    });

    return NextResponse.json({
      success: true,
      text: response.text,
    });
  } catch (error: unknown) {
    console.error('Enhance API error:', error);
    const message = error instanceof Error ? error.message : 'Metin işlenirken bir hata oluştu.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
