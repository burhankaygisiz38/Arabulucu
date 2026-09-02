'use client';

import React, { useState } from 'react';
import { GeneratedDocument, ScenarioType, MediationCaseData } from '@/types/mediation';
import { exportToDocx } from '@/lib/docExporter';
import {
  Download,
  Copy,
  Check,
  Printer,
  Edit3,
  Eye,
  Sparkles,
  AlertTriangle,
  FileText,
  HelpCircle,
  FileCheck,
  Mail,
  XCircle,
  Handshake,
  Files,
  ArrowLeft,
  RotateCcw,
  Scale
} from 'lucide-react';

interface DocumentViewerProps {
  documents: GeneratedDocument[];
  onUpdateDocumentContent: (id: string, newContent: string) => void;
  onOpenAiHelper?: (currentDoc: GeneratedDocument) => void;
  scenario?: ScenarioType;
  setScenario?: (scenario: ScenarioType) => void;
  caseData?: MediationCaseData;
  onBackToStep2?: () => void;
  onBackToStep1?: () => void;
}

export default function DocumentViewer({
  documents = [],
  onUpdateDocumentContent,
  onOpenAiHelper,
  scenario = 'davet',
  setScenario,
  caseData,
  onBackToStep2,
  onBackToStep1,
}: DocumentViewerProps) {
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Derive current document safely
  const currentDoc =
    documents.find((d) => d.id === selectedDocId) || documents[0];

  if (!currentDoc) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
        <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
        <p className="font-semibold text-sm">Henüz oluşturulmuş bir evrak bulunmuyor.</p>
        <p className="text-xs mt-1">Lütfen önceki adımları tamamlayıp evrak üretimini başlatın.</p>
        <button
          type="button"
          onClick={onBackToStep2}
          className="mt-4 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold"
        >
          2. Adıma Dön
        </button>
      </div>
    );
  }

  // Count unfilled bracket placeholders e.g. [Tarih/Saat Giriniz]
  const placeholderMatches = currentDoc.contentPlainText.match(/\[(.*?)\]/g) || [];
  const hasPlaceholders = placeholderMatches.length > 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDoc.contentPlainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWordExport = async () => {
    setIsExporting(true);
    try {
      await exportToDocx(currentDoc, currentDoc.title);
    } catch (err) {
      console.error('Word export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentDoc.title}</title>
          <meta charset="utf-8">
          <style>
            @page { size: A4; margin: 20mm 20mm 20mm 20mm; }
            body {
              font-family: "Times New Roman", Times, serif;
              font-size: 11pt;
              line-height: 1.35;
              color: #000;
              margin: 0;
              padding: 10px;
              white-space: pre-wrap;
              text-align: justify;
            }
            .header-center { text-align: center; font-weight: bold; }
          </style>
        </head>
        <body>${currentDoc.contentPlainText}</body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="space-y-6 mb-12">
      {/* Scenario Selector Banner at top of Step 3 */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4 gap-2">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded bg-[#1E3A8A] text-white font-bold text-xs shadow-2xs">
                3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Resmi Arabuluculuk Belgeleri ve UYAP / Word Çıktıları
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-9.5">
              Üretmek istediğiniz resmi evrak senaryosunu seçin ve ADB standartlarındaki matbu metinleri inceleyin.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            {onBackToStep2 && (
              <button
                type="button"
                onClick={onBackToStep2}
                className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-[#1E3A8A] bg-[#F9FAFB] hover:bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-lg transition shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> 2. Adıma Dön
              </button>
            )}
            {onBackToStep1 && (
              <button
                type="button"
                onClick={onBackToStep1}
                className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-[#1E3A8A] bg-[#F9FAFB] hover:bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-lg transition shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> 1. Adıma Dön
              </button>
            )}
          </div>
        </div>

        {/* Dosya Bilgi Özeti Çubuğu */}
        <div className="mb-4 p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700">Aktif Dosya:</span>
            <span className="px-2 py-0.5 rounded bg-white border border-[#E5E7EB] text-slate-800">
              <strong>Büro No:</strong> {caseData?.buroDosyaNo || 'Belirtilmedi'}
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[#1E3A8A] font-bold">
              <strong>Arabuluculuk No:</strong> {caseData?.arabuluculukDosyaNo || 'Belirtilmedi'}
            </span>
            <span className="px-2 py-0.5 rounded bg-white border border-[#E5E7EB] text-slate-600 truncate max-w-xs">
              {caseData?.disputeSubject || 'Uyuşmazlık konusu'}
            </span>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold flex items-center">
            <Scale className="w-3.5 h-3.5 mr-1 text-emerald-600" /> 6325 s.K. Uyumlu
          </span>
        </div>

        {/* Scenario Selection Buttons */}
        {setScenario && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Evrak Senaryosunu Değiştir:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {/* 1. Davet Mektubu */}
              <button
                type="button"
                onClick={() => setScenario('davet')}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs cursor-pointer ${
                  scenario === 'davet'
                    ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white ring-2 ring-blue-300/40'
                    : 'bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Mail className={`w-4 h-4 ${scenario === 'davet' ? 'text-blue-200' : 'text-[#1E3A8A]'}`} />
                  <span className="font-bold text-xs sm:text-sm">1. İlk Toplantı Davet Mektubu</span>
                </div>
                <p className={`text-[11px] mt-1 ${scenario === 'davet' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Toplantı daveti ve yasal ihtaratlar
                </p>
              </button>

              {/* 2. İlk Oturum Tutanağı */}
              <button
                type="button"
                onClick={() => setScenario('ilk_oturum')}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs cursor-pointer ${
                  scenario === 'ilk_oturum'
                    ? 'bg-sky-800 border-sky-800 text-white ring-2 ring-sky-300/40'
                    : 'bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className={`w-4 h-4 ${scenario === 'ilk_oturum' ? 'text-sky-200' : 'text-sky-700'}`} />
                  <span className="font-bold text-xs sm:text-sm">2. İlk Oturum Tutanağı</span>
                </div>
                <p className={`text-[11px] mt-1 ${scenario === 'ilk_oturum' ? 'text-sky-100' : 'text-slate-500'}`}>
                  Bilgilendirme ve sürece başlama tutanağı
                </p>
              </button>

              {/* 3. Son Tutanak (Anlaşma) */}
              <button
                type="button"
                onClick={() => setScenario('anlasma')}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs cursor-pointer ${
                  scenario === 'anlasma'
                    ? 'bg-emerald-700 border-emerald-700 text-white ring-2 ring-emerald-300/40'
                    : 'bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Handshake className={`w-4 h-4 ${scenario === 'anlasma' ? 'text-emerald-200' : 'text-emerald-700'}`} />
                  <span className="font-bold text-xs sm:text-sm">3. Son Tutanak (Anlaşma)</span>
                </div>
                <p className={`text-[11px] mt-1 ${scenario === 'anlasma' ? 'text-emerald-100' : 'text-slate-500'}`}>
                  Son Tutanak + Anlaşma Belgesi
                </p>
              </button>

              {/* 4. Son Tutanak (Anlaşamama) */}
              <button
                type="button"
                onClick={() => setScenario('anlasmama')}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs cursor-pointer ${
                  scenario === 'anlasmama'
                    ? 'bg-[#B91C1C] border-[#B91C1C] text-white ring-2 ring-red-300/40'
                    : 'bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <XCircle className={`w-4 h-4 ${scenario === 'anlasmama' ? 'text-red-200' : 'text-[#B91C1C]'}`} />
                  <span className="font-bold text-xs sm:text-sm">4. Son Tutanak (Anlaşamama)</span>
                </div>
                <p className={`text-[11px] mt-1 ${scenario === 'anlasmama' ? 'text-red-100' : 'text-slate-500'}`}>
                  6325 s.K. m.17 Anlaşamama Tutanağı
                </p>
              </button>

              {/* 5. Son Tutanak (Katılmama) */}
              <button
                type="button"
                onClick={() => setScenario('katilmama')}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs cursor-pointer ${
                  scenario === 'katilmama'
                    ? 'bg-amber-800 border-amber-800 text-white ring-2 ring-amber-300/40'
                    : 'bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <XCircle className={`w-4 h-4 ${scenario === 'katilmama' ? 'text-amber-200' : 'text-amber-700'}`} />
                  <span className="font-bold text-xs sm:text-sm">5. Son Tutanak (Katılmama)</span>
                </div>
                <p className={`text-[11px] mt-1 ${scenario === 'katilmama' ? 'text-amber-100' : 'text-slate-500'}`}>
                  6325 s.K. m.18/A f.11 Katılmama Tutanağı
                </p>
              </button>

              {/* 6. Tüm Evrak Paketi */}
              <button
                type="button"
                onClick={() => setScenario('hepsi')}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs cursor-pointer ${
                  scenario === 'hepsi'
                    ? 'bg-slate-800 border-slate-800 text-white ring-2 ring-slate-400/40'
                    : 'bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Files className={`w-4 h-4 ${scenario === 'hepsi' ? 'text-amber-300' : 'text-slate-700'}`} />
                  <span className="font-bold text-xs sm:text-sm">Tüm Evrak Paketi</span>
                </div>
                <p className={`text-[11px] mt-1 ${scenario === 'hepsi' ? 'text-slate-200' : 'text-slate-500'}`}>
                  Tüm ADB resmi evraklarını aynı anda üret
                </p>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Primary Document Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        {/* Top Document Selection Tabs */}
        <div className="bg-[#1E3A8A] text-white px-4 pt-3 border-b border-blue-900">
          <div className="flex items-center justify-between pb-3 flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                Resmi ADB Matbu Evrakları ({documents.length} Belge)
              </h3>
              <p className="text-[11px] text-blue-200">
                Görüntülemek istediğiniz belgeyi seçerek canlı düzenleyebilir ve indirebilirsiniz.
              </p>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="flex space-x-1 overflow-x-auto no-scrollbar pt-1">
            {documents.map((doc, idx) => {
              const isSelected = doc.id === currentDoc.id;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    setIsEditing(false);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-t-lg transition whitespace-nowrap flex items-center space-x-1.5 border-t border-x ${
                    isSelected
                      ? 'bg-white text-[#1E3A8A] border-[#E5E7EB] shadow-2xs font-bold'
                      : 'bg-blue-900/60 text-blue-100 border-transparent hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  <FileCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B91C1C]' : 'text-blue-300'}`} />
                  <span>{idx + 1}. {doc.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Document Subtitle & Warning */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">{currentDoc.subtitle}</span>
            {hasPlaceholders && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300" title="Belgede doldurulması gereken köşeli parantezli alanlar var">
                <AlertTriangle className="w-3 h-3 mr-1 text-amber-600" />
                {placeholderMatches.length} Doldurulabilir Alan
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            {/* Edit toggle */}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center px-3 py-1.5 rounded-md border text-xs font-semibold transition ${
                isEditing
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isEditing ? (
                <>
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Önizleme Modu
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 mr-1" />
                  Metni Düzenle
                </>
              )}
            </button>

            {/* AI Assistant */}
            {onOpenAiHelper && (
              <button
                type="button"
                onClick={() => onOpenAiHelper(currentDoc)}
                className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100 transition shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-600" />
                Hukuki Madde / İbra Sihirbazı (AI)
              </button>
            )}

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Kopyalandı
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Metni Kopyala / UDF
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5 mr-1" />
              Yazdır / PDF
            </button>

            {/* Word Export Button */}
            <button
              type="button"
              disabled={isExporting}
              onClick={handleWordExport}
              className="inline-flex items-center px-3.5 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 mr-1 text-emerald-200" />
              {isExporting ? 'Hazırlanıyor...' : 'Word (.docx) İndir'}
            </button>
          </div>
        </div>

        {/* Document Paper Container */}
        <div className="p-4 sm:p-8 bg-[#F3F4F6] flex justify-center min-h-[500px]">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6 sm:p-12 transition">
            {isEditing ? (
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">
                    Canlı Düzenleyici: Metin üzerinde dilediğiniz ekleme veya çıkarmayı yapabilirsiniz.
                  </span>
                  <span className="text-[11px] text-blue-600 font-medium">Değişiklikler anında işlenir</span>
                </div>
                <textarea
                  rows={25}
                  value={currentDoc.contentPlainText}
                  onChange={(e) => onUpdateDocumentContent(currentDoc.id, e.target.value)}
                  className="w-full text-xs sm:text-sm font-serif leading-relaxed p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none text-slate-900 bg-slate-50/50"
                />
              </div>
            ) : (
              <div className="prose prose-slate max-w-none text-xs sm:text-sm font-serif leading-relaxed text-slate-900 space-y-4">
                <pre className="font-serif whitespace-pre-wrap text-slate-900 font-normal leading-relaxed text-xs sm:text-sm">
                  {currentDoc.contentPlainText}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Bottom helper info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>
              Bu evrak doğrudan UYAP Arabulucu Portalı, UDF Editörü veya Microsoft Word içerisine yapıştırılmaya hazırdır.
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            6325 sayılı Kanun m. 15, 17, 18 & İlgili Yönetmelik Hükümleri
          </div>
        </div>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToStep2}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 font-bold text-xs sm:text-sm shadow-2xs transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>2. Adıma Dön (Taraf ve Arabulucu Bilgileri)</span>
        </button>

        <button
          type="button"
          onClick={onBackToStep1}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-white bg-[#1E3A8A] hover:bg-[#172e6f] font-bold text-xs sm:text-sm shadow-xs transition"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          <span>Yeni Başvuru Dilekçesi Gir (1. Adım)</span>
        </button>
      </div>
    </div>
  );
}
