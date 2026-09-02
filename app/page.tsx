'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import DocumentUploadSection from '@/components/DocumentUploadSection';
import CaseDataForm from '@/components/CaseDataForm';
import DocumentViewer from '@/components/DocumentViewer';
import AiLegalModal from '@/components/AiLegalModal';
import Chat from '@/components/Chat';
import { SAMPLE_CASES } from '@/lib/sampleData';
import { MediationCaseData, ScenarioType, GeneratedDocument } from '@/types/mediation';
import { generateAllDocuments } from '@/lib/adbTemplates';
import { Scale, FileCheck, Award, BookOpen, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  // Initial state loaded from default sample (İşçi İşveren)
  const defaultSample = SAMPLE_CASES.isci_isveren.data;
  const [caseData, setCaseData] = useState<MediationCaseData>(defaultSample);
  const [scenario, setScenario] = useState<ScenarioType>('davet');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generated documents (Initial default: Only Davet Mektubu - Süreç Başlangıcı)
  const [documents, setDocuments] = useState<GeneratedDocument[]>(() =>
    generateAllDocuments(defaultSample, 'davet')
  );

  // AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [activeDocForAi, setActiveDocForAi] = useState<GeneratedDocument | null>(null);

  // Handle extracted data from OCR / text analysis
  const handleDataExtracted = (extracted: MediationCaseData) => {
    setCaseData(extracted);
    // Regenerate documents with extracted data
    const newDocs = generateAllDocuments(extracted, scenario);
    setDocuments(newDocs);
  };

  // Trigger manual generation
  const handleGenerateDocuments = () => {
    const newDocs = generateAllDocuments(caseData, scenario);
    setDocuments(newDocs);

    // Smooth scroll to documents section
    setTimeout(() => {
      const el = document.getElementById('documents-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Update specific document content (e.g. from live editor)
  const handleUpdateDocumentContent = (docId: string, newContent: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              contentPlainText: newContent,
              contentMarkdown: newContent,
            }
          : doc
      )
    );
  };

  // AI modal handler
  const handleOpenAiHelper = (doc: GeneratedDocument) => {
    setActiveDocForAi(doc);
    setIsAiModalOpen(true);
  };

  const handleInsertClause = (clauseText: string) => {
    if (!activeDocForAi) return;
    const updated = activeDocForAi.contentPlainText + clauseText;
    handleUpdateDocumentContent(activeDocForAi.id, updated);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] flex flex-col selection:bg-blue-100 selection:text-[#1E3A8A] font-sans">
      <Navbar />

      {/* Hero Sub-header */}
      <div className="bg-white border-b border-[#E5E7EB] py-6 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-[#B91C1C] text-xs font-bold mb-2">
              <Scale className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>T.C. Adalet Bakanlığı Arabuluculuk Daire Başkanlığı (ADB) Standartları</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Resmi Arabuluculuk Belgesi & Süreç Yönetim Asistanı
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed font-normal">
              6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu ve ilgili mevzuat uyarınca; başvuru belgelerinden verileri otomatik çıkarın, resmi ADB Davet Mektubu, Bilgilendirme ve İlk Oturum Tutanağı, Son Tutanak ve İlam Niteliğinde Anlaşma Belgelerini %100 uyumlu formatta üretin.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 text-center min-w-[120px] shadow-2xs">
              <div className="text-lg font-extrabold text-[#1E3A8A]">6325 s.K.</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">HUAK Mevzuatı</div>
            </div>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 text-center min-w-[120px] shadow-2xs">
              <div className="text-lg font-extrabold text-emerald-700">Word / UDF</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Matbu Form</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Step 1: Dosya / Metin Yükleme & Veri Çıkarma */}
        <DocumentUploadSection
          onDataExtracted={handleDataExtracted}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        {/* Step 2: Veri İnceleme & Senaryo Seçimi */}
        <CaseDataForm
          data={caseData}
          setData={setCaseData}
          scenario={scenario}
          setScenario={(newScenario) => {
            setScenario(newScenario);
            const newDocs = generateAllDocuments(caseData, newScenario);
            setDocuments(newDocs);
          }}
          onGenerate={handleGenerateDocuments}
        />

        {/* Step 3: Üretilen Resmi ADB Evrakları */}
        <div id="documents-section">
          <DocumentViewer
            documents={documents}
            caseData={caseData}
            scenario={scenario}
            setScenario={(newScenario) => {
              setScenario(newScenario);
              const newDocs = generateAllDocuments(caseData, newScenario);
              setDocuments(newDocs);
            }}
            onUpdateDocumentContent={handleUpdateDocumentContent}
            onOpenAiHelper={handleOpenAiHelper}
            onBackToStep1={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToStep2={() => {
              const el = document.getElementById('case-data-form');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>
      </main>

      {/* AI Legal Modal */}
      <AiLegalModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        currentDoc={activeDocForAi}
        caseData={caseData}
        onInsertClause={handleInsertClause}
      />

      {/* Floating Server-Side AI Chat Assistant */}
      <Chat />

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#E5E7EB]">
            <div className="flex items-center space-x-2 mb-2">
              <Scale className="w-4 h-4 text-[#B91C1C]" />
              <span className="font-bold text-slate-900">ADB Standartları ve Yasal Dayanak</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Üretilen tüm tutanak ve belgeler Adalet Bakanlığı Arabuluculuk Daire Başkanlığı matbu formlarına (6325 s.K. m. 15, 17, 18, 18/A, 18/B ve 7036 s.K. m.3) %100 uygundur.
            </p>
          </div>

          <div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#E5E7EB]">
            <div className="flex items-center space-x-2 mb-2">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-slate-900">UYAP ve Word Uyumluluğu</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Evraklar doğrudan Microsoft Word (.docx) olarak indirilebilir veya UDF Editörü ile UYAP Arabulucu Portalına yapıştırılmaya hazır düzgün metin formatında sunulur.
            </p>
          </div>

          <div className="bg-[#F9FAFB] p-4 rounded-lg border border-[#E5E7EB]">
            <div className="flex items-center space-x-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#1E3A8A]" />
              <span className="font-bold text-slate-900">Gizlilik & Güvenlik</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              6325 sayılı Kanun m. 5 gereğince arabuluculuk sürecindeki tüm gizlilik ilkelerine ve KVKK kurallarına azami özen gösterilmektedir.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>T.C. Adalet Bakanlığı Arabuluculuk Daire Başkanlığı Resmi Standartları</span>
          <span>6325 Sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu Uyumlu</span>
        </div>
      </footer>
    </div>
  );
}
