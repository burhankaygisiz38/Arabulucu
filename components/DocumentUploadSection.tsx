'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Sparkles, Loader2, FileUp, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { SAMPLE_CASES } from '@/lib/sampleData';
import { MediationCaseData } from '@/types/mediation';

interface DocumentUploadSectionProps {
  onDataExtracted: (data: MediationCaseData, sourceText?: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function DocumentUploadSection({
  onDataExtracted,
  isLoading,
  setIsLoading,
}: DocumentUploadSectionProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'samples'>('samples');
  const [pastedText, setPastedText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.udf') && !file.name.endsWith('.txt')) {
      setErrorMessage('Lütfen geçerli bir PDF, Görsel (JPG/PNG) veya Metin dosyası seçin.');
      return;
    }
    setSelectedFile(file);
    setErrorMessage(null);
  };

  const processFileExtraction = async () => {
    if (!selectedFile) {
      setErrorMessage('Lütfen önce bir dosya seçin.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessInfo(null);

    try {
      if (selectedFile.type === 'text/plain' || selectedFile.name.endsWith('.txt')) {
        const text = await selectedFile.text();
        await processTextExtraction(text);
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const res = await fetch('/api/gemini/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileData: base64Data,
            mimeType: selectedFile.type || 'application/pdf',
          }),
        });

        const json = await res.json();
        if (json.success && json.data) {
          setSuccessInfo(`"${selectedFile.name}" dosyasından bilgiler başarıyla çıkarıldı ve ADB standartlarına uyarlandı.`);
          onDataExtracted(json.data);
        } else {
          setErrorMessage(json.error || 'Dosyadan veri çıkarılamadı. Lütfen metin yapıştırmayı deneyin.');
        }
        setIsLoading(false);
      };
      reader.onerror = () => {
        setErrorMessage('Dosya okunamadı.');
        setIsLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'İşlem sırasında bir hata oluştu.';
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  const processTextExtraction = async (textToProcess?: string) => {
    const rawText = textToProcess || pastedText;
    if (!rawText.trim()) {
      setErrorMessage('Lütfen UYAP veya UDF metnini yapıştırın.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessInfo(null);

    try {
      const res = await fetch('/api/gemini/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setSuccessInfo('Metin analiz edildi, tüm dosya ve taraf bilgileri eksiksiz ayrıştırıldı.');
        onDataExtracted(json.data, rawText);
      } else {
        setErrorMessage(json.error || 'Metin analiz edilemedi.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analiz sırasında hata oluştu.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = (key: string) => {
    const preset = SAMPLE_CASES[key];
    if (preset) {
      setPastedText(preset.rawText);
      setSuccessInfo(`"${preset.label}" şablonu yüklendi.`);
      onDataExtracted(preset.data, preset.rawText);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs p-4 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E7EB] gap-2">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-[#1E3A8A] text-white font-bold text-xs shadow-2xs">
              1
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Dosyadan Veri Çıkarma & Süreç Tespiti
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-8.5">
            UYAP Başvuru Belgesi, Görevlendirme Tensibi, PDF/Görsel veya UDF metnini yükleyerek süreci otomatik tespit edin.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-[#F3F4F6] p-1 rounded-lg self-start sm:self-auto border border-[#E5E7EB]">
          <button
            type="button"
            onClick={() => setActiveTab('samples')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === 'samples'
                ? 'bg-white text-[#1E3A8A] shadow-2xs border border-[#E5E7EB]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ Hazır Dosyalar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === 'paste'
                ? 'bg-white text-[#1E3A8A] shadow-2xs border border-[#E5E7EB]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✍️ UDF / Metin Yapıştır
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === 'upload'
                ? 'bg-white text-[#1E3A8A] shadow-2xs border border-[#E5E7EB]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📁 PDF / Belge Yükle
          </button>
        </div>
      </div>

      {/* Tab 1: Hazır Örnekler */}
      {activeTab === 'samples' && (
        <div className="pt-4 space-y-3">
          <p className="text-xs font-medium text-slate-600">
            Hızlı test etmek veya doğrudan şablon üzerinden başlamak için uyuşmazlık türünü seçin:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {Object.entries(SAMPLE_CASES).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => loadPreset(key)}
                className="text-left p-3.5 rounded-lg border border-[#E5E7EB] hover:border-[#1E3A8A]/50 bg-[#F9FAFB] hover:bg-white transition group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1E3A8A]">
                      {item.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                      {key.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#E5E7EB] flex items-center text-xs font-semibold text-[#1E3A8A]">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-[#B91C1C]" />
                  Bu Örnekle Başla
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: UDF / Metin Yapıştırma */}
      {activeTab === 'paste' && (
        <div className="pt-4 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
            UYAP Arabulucu Portalından veya UDF Editöründen Kopyalanan Başvuru / Görevlendirme Metni:
          </label>
          <textarea
            rows={5}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Örn: T.C. İSTANBUL ARABULUCULUK BÜROSU&#10;Büro Dosya No: 2026/14258&#10;Başvurucu: Ahmet Yılmaz (T.C. 12345678901)..."
            className="w-full text-xs sm:text-sm font-mono p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white focus:outline-none placeholder-slate-400 text-slate-800 transition"
          />
          <div className="flex justify-end">
            <button
              type="button"
              disabled={isLoading || !pastedText.trim()}
              onClick={() => processTextExtraction()}
              className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-bold rounded-lg text-white bg-[#1E3A8A] hover:bg-[#172e6f] disabled:opacity-50 transition shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Metin Analiz Ediliyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
                  Metni İncele ve Bilgileri Çıkar
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: PDF / Görsel Dosya Yükleme */}
      {activeTab === 'upload' && (
        <div className="pt-4 space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.txt"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelected(e.target.files[0]);
              }
            }}
          />

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition ${
              dragActive
                ? 'border-[#1E3A8A] bg-blue-50/50'
                : 'border-[#E5E7EB] hover:border-slate-400 bg-[#F9FAFB]'
            }`}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-slate-600 mb-3 shadow-2xs">
              {selectedFile ? (
                <FileText className="w-6 h-6 text-[#1E3A8A]" />
              ) : (
                <Upload className="w-6 h-6 text-slate-500" />
              )}
            </div>
            {selectedFile ? (
              <div>
                <p className="text-sm font-bold text-slate-900">{selectedFile.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {(selectedFile.size / 1024).toFixed(1)} KB - Dosya hazır, analizi başlatın.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Arabuluculuk Başvuru Belgesini (PDF / Görsel) Sürükleyin veya Seçin
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PDF, JPG, PNG formatlarında görevlendirme tensibi, başvuru formu veya UYAP ekran görüntüsü
                </p>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center font-medium"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Dosyayı Değiştir
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={processFileExtraction}
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-bold rounded-lg text-white bg-[#1E3A8A] hover:bg-[#172e6f] disabled:opacity-50 transition shadow-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    OCR & AI Analizi Yapılıyor...
                  </>
                ) : (
                  <>
                    <FileUp className="w-4 h-4 mr-2 text-amber-300" />
                    Dosyayı Çözümle ve Verileri Çıkar
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Status Feedback */}
      {errorMessage && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start text-xs text-red-800">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
      {successInfo && (
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start text-xs text-emerald-800">
          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 text-emerald-600 mt-0.5" />
          <span>{successInfo}</span>
        </div>
      )}
    </div>
  );
}
