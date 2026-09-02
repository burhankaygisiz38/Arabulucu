'use client';

import React, { useState } from 'react';
import { GeneratedDocument, MediationCaseData } from '@/types/mediation';
import { Sparkles, X, Check, Loader2, Copy, Plus } from 'lucide-react';

interface AiLegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDoc: GeneratedDocument | null;
  caseData: MediationCaseData;
  onInsertClause: (clauseText: string) => void;
}

export default function AiLegalModal({
  isOpen,
  onClose,
  currentDoc,
  caseData,
  onInsertClause,
}: AiLegalModalProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const quickTemplates = [
    {
      title: 'Muacceliyet & Gecikme Cezası',
      prompt: 'Taksitlerden herhangi birinin vadesinde ödenmemesi halinde kalan tüm taksitlerin muaccel olacağı ve %5 gecikme cezası uygulanacağı maddesini ADB standartlarında yaz.',
    },
    {
      title: 'İş Hukuku Geniş Kapsamlı İbra & SGK',
      prompt: 'Kıdem, ihbar, fazla mesai, yıllık izin ve SGK prim haklarını da kapsayan eksiksiz karşılıklı ibra ve feragat maddesini ADB formatında hazırla.',
    },
    {
      title: 'Taşınmaz Tahliye ve Anahtar Teslimi',
      prompt: 'Kiracının taşınmazı belirli bir tarihte hasarsız tahliye edeceği, anahtar teslim tutanağı ve tahliye edilmemesi halinde doğrudan icraya konulabileceğine ilişkin anlaşma maddesini hazırla.',
    },
    {
      title: 'Arabuluculuk Ücreti & Masraf Paylaşımı',
      prompt: 'Arabuluculuk Asgari Ücret Tarifesi uyarınca doğan arabuluculuk ücretinin tamamının karşı tarafça (veya eşit olarak) karşılanacağına dair ADB standart maddesini yaz.',
    },
  ];

  const handleGenerate = async (promptToUse?: string) => {
    const finalPrompt = promptToUse || customPrompt;
    if (!finalPrompt.trim()) return;

    setIsLoading(true);
    setGeneratedResult('');

    try {
      const res = await fetch('/api/gemini/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_agreement_clause',
          prompt: finalPrompt,
          caseData,
          currentText: currentDoc?.contentPlainText || '',
        }),
      });

      const json = await res.json();
      if (json.success && json.text) {
        setGeneratedResult(json.text);
      }
    } catch (err) {
      console.error('Enhance error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsert = () => {
    if (generatedResult) {
      onInsertClause('\n\n' + generatedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1E3A8A] text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#B91C1C]" />
            <h3 className="font-bold text-base tracking-tight">Hukuki Madde ve İbra Sihirbazı (AI)</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded-md transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase text-[11px] tracking-wider">
              Hızlı Hukuki Madde Şablonları:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickTemplates.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCustomPrompt(item.prompt);
                    handleGenerate(item.prompt);
                  }}
                  className="text-left p-3 rounded-lg border border-[#E5E7EB] hover:border-[#1E3A8A] hover:bg-blue-50/30 bg-[#F9FAFB] transition shadow-2xs"
                >
                  <p className="font-bold text-xs text-slate-900">{item.title}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.prompt}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase text-[11px] tracking-wider">
              Veya Özel Hukuki İstek / Şart Belirtin:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Örn: 30 gün içinde tahliye edilmezse aylık 10.000 TL cezai şart ödenecektir..."
                className="flex-1 p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white focus:outline-none text-slate-900 transition"
              />
              <button
                type="button"
                disabled={isLoading || !customPrompt.trim()}
                onClick={() => handleGenerate()}
                className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#172e6f] text-white font-bold rounded-lg text-xs inline-flex items-center disabled:opacity-50 transition shadow-xs"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Madde Üret'}
              </button>
            </div>
          </div>

          {/* Generated Result */}
          {generatedResult && (
            <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <span className="font-bold text-xs text-emerald-800 flex items-center">
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> ADB Standartlarına Uygun Hukuki Metin:
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs text-slate-700 hover:text-slate-900 font-semibold flex items-center bg-white px-2.5 py-1 rounded border border-[#E5E7EB] shadow-2xs"
                  >
                    {copied ? <Check className="w-3 h-3 mr-1 text-emerald-600" /> : <Copy className="w-3 h-3 mr-1" />}
                    {copied ? 'Kopyalandı' : 'Kopyala'}
                  </button>
                  <button
                    type="button"
                    onClick={handleInsert}
                    className="text-xs text-white bg-emerald-700 hover:bg-emerald-800 font-bold px-3 py-1 rounded flex items-center transition shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Belgeye Ekle
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-900 font-serif leading-relaxed whitespace-pre-wrap">
                {generatedResult}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F9FAFB] border-t border-[#E5E7EB] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 transition shadow-2xs"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
