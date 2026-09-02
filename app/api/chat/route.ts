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

    const body = await req.json();
    const { messages, message, systemInstruction } = body;

    // Default System Instruction specialized for Turkish Mediation and Legal Assistant
    const defaultSystemPrompt =
      systemInstruction ||
      `Sen T.C. Adalet Bakanlığı Arabuluculuk Daire Başkanlığı (ADB) mevzuatına, 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu'na ve Türk hukuk sistemine tam hakim uzman bir Hukuk & Arabuluculuk Yapay Zeka Asistanısın.

GÖREV VE KESİN KURALLAR:
1. KESİNLİKLE KENDİNDEN BİLGİ UYDURMA. Eğer kullanıcı tarafından sağlanmamış veya sende bulunmayan somut bir veri (isim, unvan, tarih, saat, dosya no, T.C./VKN, IBAN, banka bilgisi, parasal miktar, adres vb.) gerekliyse, asla uydurma bilgi üretme; o kısmı "...." şeklinde boş bırak veya taraflarca doldurulması gerektiğini belirt.
2. Arabuluculara ve hukukçulara dava şartı ve ihtiyari arabuluculuk süreçleri, tutanak tanzimi, hak düşürücü süreler, ilam niteliğinde anlaşma belgeleri, ibra hükümleri ve arabuluculuk asgari ücret tarifesi konularında doğru, güncel ve mevzuata %100 uygun hukuki danışmanlık ve metin desteği sağla.
3. Tutanak, madde ve ibra metni taleplerinde resmi ADB kalıplarına uygun metinler üret.
4. Cevaplarını net, profesyonel ve yapılandırılmış (gerekirse madde imleri veya başlıklar kullanarak) olarak sun.`;

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'arabulucu-ai-chat',
        },
      },
    });

    let contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages
        .filter((m: { content?: string }) => m && typeof m.content === 'string' && m.content.trim() !== '')
        .map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
    } else if (typeof message === 'string' && message.trim() !== '') {
      contents = [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];
    } else {
      return NextResponse.json(
        { success: false, error: 'Lütfen geçerli bir mesaj veya mesaj listesi gönderin.' },
        { status: 400 }
      );
    }

    // Call Gemini API using gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: defaultSystemPrompt,
        temperature: 0.3,
      },
    });

    const replyText = response.text || '';

    return NextResponse.json({
      success: true,
      message: replyText,
      reply: replyText,
    });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Mesaj işlenirken bir sunucu hatası oluştu.';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
