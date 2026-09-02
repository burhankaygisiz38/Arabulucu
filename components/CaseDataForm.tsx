'use client';

import React from 'react';
import {
  MediationCaseData,
  ScenarioType,
  DisputeType,
  ProcessType,
  OFFICIAL_DISPUTE_TYPES,
} from '@/types/mediation';
import {
  FileText,
  User,
  Building,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Handshake,
  XCircle,
  Mail,
  Files,
  Layers,
  Scale
} from 'lucide-react';

interface CaseDataFormProps {
  data: MediationCaseData;
  setData: React.Dispatch<React.SetStateAction<MediationCaseData>>;
  scenario: ScenarioType;
  setScenario: (scenario: ScenarioType) => void;
  onGenerate: () => void;
}

export default function CaseDataForm({
  data,
  setData,
  scenario,
  setScenario,
  onGenerate,
}: CaseDataFormProps) {
  const [activeAccordion, setActiveAccordion] = React.useState<'dosya' | 'taraflar' | 'oturum' | 'anlasma'>('dosya');

  const updateField = <K extends keyof MediationCaseData>(field: K, value: MediationCaseData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateParty = (party: 'basvurucu' | 'karsiTaraf', field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [party]: {
        ...prev[party],
        [field]: value,
      },
    }));
  };

  const updateMediator = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      arabulucu: {
        ...prev.arabulucu,
        [field]: value,
      },
    }));
  };

  const updateAgreement = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      anlasmaSartlari: {
        ...prev.anlasmaSartlari,
        [field]: value,
      },
    }));
  };

  return (
    <div id="case-data-form" className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs p-4 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 pb-4 border-b border-[#E5E7EB] mb-5">
        <span className="flex items-center justify-center w-6 h-6 rounded bg-[#1E3A8A] text-white font-bold text-xs shadow-2xs">
          2
        </span>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Süreç, Dosya ve Taraf Bilgilerini İncele / Düzenle
        </h2>
      </div>

      {/* Scenario / Document Request Selector Banner */}
      <div className="mb-6 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center">
              <Layers className="w-4 h-4 mr-1.5 text-[#1E3A8A]" />
              Talep Edilen Evrak / Tutanak Türünü Seçin:
            </label>
            <p className="text-[11px] text-slate-500 mt-0.5">
              İhtiyaç duyduğunuz resmi ADB evrağı talep ettiğinizde üretilir. Süreç aşamasına göre istediğiniz evrağı seçebilirsiniz.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
            Seçili: <strong className="text-[#1E3A8A]">
              {scenario === 'davet' && 'İlk Toplantı Davet Mektubu'}
              {scenario === 'ilk_oturum' && 'Bilgilendirme ve İlk Oturum Tutanağı'}
              {scenario === 'anlasma' && 'Son Tutanak (Anlaşma) + Anlaşma Belgesi'}
              {scenario === 'anlasmama' && 'Son Tutanak (Anlaşamama)'}
              {scenario === 'katilmama' && 'Son Tutanak (Toplantıya Katılmama)'}
              {scenario === 'anlasma_belgesi' && 'İlam Niteliğinde Anlaşma Belgesi'}
              {scenario === 'hepsi' && 'Tüm Evrak Paketi'}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {/* 1. Davet Mektubu */}
          <button
            type="button"
            onClick={() => setScenario('davet')}
            className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs ${
              scenario === 'davet'
                ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white ring-2 ring-blue-300/40'
                : 'bg-white border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Mail className={`w-4 h-4 ${scenario === 'davet' ? 'text-blue-200' : 'text-[#1E3A8A]'}`} />
              <span className="font-bold text-xs sm:text-sm">1. İlk Toplantı Davet Mektubu</span>
            </div>
            <p className={`text-[11px] mt-1 ${scenario === 'davet' ? 'text-blue-100' : 'text-slate-500'}`}>
              Süreç başlangıcı, toplantı gün/saat daveti ve yasal ihtaratlar
            </p>
          </button>

          {/* 2. İlk Oturum Tutanağı */}
          <button
            type="button"
            onClick={() => setScenario('ilk_oturum')}
            className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs ${
              scenario === 'ilk_oturum'
                ? 'bg-sky-800 border-sky-800 text-white ring-2 ring-sky-300/40'
                : 'bg-white border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText className={`w-4 h-4 ${scenario === 'ilk_oturum' ? 'text-sky-200' : 'text-sky-700'}`} />
              <span className="font-bold text-xs sm:text-sm">2. İlk Oturum Tutanağı</span>
            </div>
            <p className={`text-[11px] mt-1 ${scenario === 'ilk_oturum' ? 'text-sky-100' : 'text-slate-500'}`}>
              Toplantı başlangıcında aydınlatma, bilgilendirme ve müzakereye geçiş
            </p>
          </button>

          {/* 3. Son Tutanak (Anlaşma) */}
          <button
            type="button"
            onClick={() => setScenario('anlasma')}
            className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs ${
              scenario === 'anlasma'
                ? 'bg-emerald-700 border-emerald-700 text-white ring-2 ring-emerald-300/40'
                : 'bg-white border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Handshake className={`w-4 h-4 ${scenario === 'anlasma' ? 'text-emerald-200' : 'text-emerald-700'}`} />
              <span className="font-bold text-xs sm:text-sm">3. Son Tutanak (Anlaşma)</span>
            </div>
            <p className={`text-[11px] mt-1 ${scenario === 'anlasma' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Müzakerelerin olumlu bitmesi durumunda Son Tutanak + Anlaşma Belgesi
            </p>
          </button>

          {/* 4. Son Tutanak (Anlaşamama) */}
          <button
            type="button"
            onClick={() => setScenario('anlasmama')}
            className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs ${
              scenario === 'anlasmama'
                ? 'bg-[#B91C1C] border-[#B91C1C] text-white ring-2 ring-red-300/40'
                : 'bg-white border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <XCircle className={`w-4 h-4 ${scenario === 'anlasmama' ? 'text-red-200' : 'text-[#B91C1C]'}`} />
              <span className="font-bold text-xs sm:text-sm">4. Son Tutanak (Anlaşamama)</span>
            </div>
            <p className={`text-[11px] mt-1 ${scenario === 'anlasmama' ? 'text-red-100' : 'text-slate-500'}`}>
              6325 s.K. m.17 uyarınca anlaşamama ile sona erme tutanağı
            </p>
          </button>

          {/* 5. Son Tutanak (Katılmama / Mazeretsiz Gelmeme) */}
          <button
            type="button"
            onClick={() => setScenario('katilmama')}
            className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs ${
              scenario === 'katilmama'
                ? 'bg-amber-800 border-amber-800 text-white ring-2 ring-amber-300/40'
                : 'bg-white border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <XCircle className={`w-4 h-4 ${scenario === 'katilmama' ? 'text-amber-200' : 'text-amber-700'}`} />
              <span className="font-bold text-xs sm:text-sm">5. Son Tutanak (Katılmama)</span>
            </div>
            <p className={`text-[11px] mt-1 ${scenario === 'katilmama' ? 'text-amber-100' : 'text-slate-500'}`}>
              6325 s.K. m.18/A f.11 mazeretsiz katılmama sebebiyle sona erme
            </p>
          </button>

          {/* 6. Tüm Evrak Paketi */}
          <button
            type="button"
            onClick={() => setScenario('hepsi')}
            className={`p-3 rounded-lg border text-left transition flex flex-col justify-between shadow-2xs ${
              scenario === 'hepsi'
                ? 'bg-slate-800 border-slate-800 text-white ring-2 ring-slate-400/40'
                : 'bg-white border-[#E5E7EB] text-slate-700 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Files className={`w-4 h-4 ${scenario === 'hepsi' ? 'text-amber-300' : 'text-slate-700'}`} />
              <span className="font-bold text-xs sm:text-sm">Tüm Evrakları Oluştur (Paket)</span>
            </div>
            <p className={`text-[11px] mt-1 ${scenario === 'hepsi' ? 'text-slate-200' : 'text-slate-500'}`}>
              Tüm ADB resmi şablonlarını tek seferde paket halinde üret
            </p>
          </button>
        </div>
      </div>

      {/* Accordion Tabs for Detail Editing */}
      <div className="space-y-4">
        {/* SECTION 1: Dosya ve Süreç Bilgileri */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveAccordion(activeAccordion === 'dosya' ? 'dosya' : 'dosya')}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-semibold text-xs sm:text-sm text-slate-800 border-b border-slate-200"
          >
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-blue-700" />
              <span>1. Dosya & Süreç Türü Bilgileri</span>
            </div>
            <span className="text-xs text-slate-500">{data.buroAdi} - {data.arabuluculukDosyaNo}</span>
          </button>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white text-xs">
            {/* Süreç Türü */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Süreç Türü</label>
              <select
                value={data.processType}
                onChange={(e) => updateField('processType', e.target.value as ProcessType)}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 bg-white"
              >
                <option value="dava_sarti">Dava Şartı Arabuluculuk</option>
                <option value="ihtiyari">İhtiyari Arabuluculuk</option>
              </select>
            </div>

            {/* Uyuşmazlık Türü (Resmi Dosya Türleri) */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Dosya / Uyuşmazlık Türü (Resmi ADB)
              </label>
              <select
                value={data.disputeType}
                onChange={(e) => {
                  const newType = e.target.value as DisputeType;
                  const matched = OFFICIAL_DISPUTE_TYPES.find((d) => d.id === newType);
                  if (matched) {
                    setData((prev) => ({
                      ...prev,
                      disputeType: newType,
                      processType: matched.defaultProcessType,
                    }));
                  } else {
                    updateField('disputeType', newType);
                  }
                }}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 bg-white font-medium"
              >
                {OFFICIAL_DISPUTE_TYPES.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Büro Adı */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Arabuluculuk Bürosu</label>
              <input
                type="text"
                value={data.buroAdi}
                onChange={(e) => updateField('buroAdi', e.target.value)}
                placeholder="Örn: İstanbul Arabuluculuk Bürosu"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Büro Dosya No */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Büro Dosya No</label>
              <input
                type="text"
                value={data.buroDosyaNo}
                onChange={(e) => updateField('buroDosyaNo', e.target.value)}
                placeholder="Örn: 2026/14258"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Arabuluculuk Dosya No */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Arabuluculuk Dosya No</label>
              <input
                type="text"
                value={data.arabuluculukDosyaNo}
                onChange={(e) => updateField('arabuluculukDosyaNo', e.target.value)}
                placeholder="Örn: 2026/3890"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Başvuru Tarihi */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Başvuru Tarihi</label>
              <input
                type="text"
                value={data.basvuruTarihi}
                onChange={(e) => updateField('basvuruTarihi', e.target.value)}
                placeholder="GG.AA.YYYY"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Uyuşmazlık Konusu */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block font-semibold text-slate-700 mb-1">Uyuşmazlık Konusu & Talepler</label>
              <input
                type="text"
                value={data.disputeSubject}
                onChange={(e) => updateField('disputeSubject', e.target.value)}
                placeholder="Örn: Kıdem tazminatı, ihbar tazminatı, fazla mesai alacağı"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Taraf ve Arabulucu Bilgileri */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveAccordion(activeAccordion === 'taraflar' ? 'dosya' : 'taraflar')}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-semibold text-xs sm:text-sm text-slate-800 border-b border-slate-200"
          >
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-emerald-700" />
              <span>2. Taraflar & Arabulucu Bilgileri</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-500">
              <span className="text-xs">{data.basvurucu.adSoyadUnvan || 'Başvurucu'} vs {data.karsiTaraf.adSoyadUnvan || 'Karşı Taraf'}</span>
              {activeAccordion === 'taraflar' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {activeAccordion === 'taraflar' && (
            <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-5 bg-white text-xs">
              {/* Başvurucu */}
              <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100 space-y-2.5">
                <div className="font-bold text-blue-900 border-b border-blue-200 pb-1 flex items-center justify-between">
                  <span>Başvurucu (Talep Eden)</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Taraf 1</span>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">Adı Soyadı / Unvanı</label>
                  <input
                    type="text"
                    value={data.basvurucu.adSoyadUnvan}
                    onChange={(e) => updateParty('basvurucu', 'adSoyadUnvan', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">T.C. / VKN</label>
                  <input
                    type="text"
                    value={data.basvurucu.tcVkn}
                    onChange={(e) => updateParty('basvurucu', 'tcVkn', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">Adresi</label>
                  <input
                    type="text"
                    value={data.basvurucu.adres}
                    onChange={(e) => updateParty('basvurucu', 'adres', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="pt-1 border-t border-blue-200/60">
                  <label className="block text-slate-600 font-medium mb-0.5">Vekili (Varsa)</label>
                  <input
                    type="text"
                    value={data.basvurucu.vekilAdi || ''}
                    onChange={(e) => updateParty('basvurucu', 'vekilAdi', e.target.value)}
                    placeholder="Av. ..."
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-medium mb-0.5">Baro</label>
                    <input
                      type="text"
                      value={data.basvurucu.vekilBaro || ''}
                      onChange={(e) => updateParty('basvurucu', 'vekilBaro', e.target.value)}
                      placeholder="İstanbul"
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-0.5">Baro Sicil</label>
                    <input
                      type="text"
                      value={data.basvurucu.vekilBaroSicilNo || ''}
                      onChange={(e) => updateParty('basvurucu', 'vekilBaroSicilNo', e.target.value)}
                      placeholder="12345"
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Karşı Taraf */}
              <div className="p-3 bg-amber-50/40 rounded-lg border border-amber-100 space-y-2.5">
                <div className="font-bold text-amber-900 border-b border-amber-200 pb-1 flex items-center justify-between">
                  <span>Karşı Taraf (Muhatap)</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Taraf 2</span>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">Adı Soyadı / Unvanı</label>
                  <input
                    type="text"
                    value={data.karsiTaraf.adSoyadUnvan}
                    onChange={(e) => updateParty('karsiTaraf', 'adSoyadUnvan', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">T.C. / VKN</label>
                  <input
                    type="text"
                    value={data.karsiTaraf.tcVkn}
                    onChange={(e) => updateParty('karsiTaraf', 'tcVkn', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">Adresi</label>
                  <input
                    type="text"
                    value={data.karsiTaraf.adres}
                    onChange={(e) => updateParty('karsiTaraf', 'adres', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="pt-1 border-t border-amber-200/60">
                  <label className="block text-slate-600 font-medium mb-0.5">Vekili (Varsa)</label>
                  <input
                    type="text"
                    value={data.karsiTaraf.vekilAdi || ''}
                    onChange={(e) => updateParty('karsiTaraf', 'vekilAdi', e.target.value)}
                    placeholder="Av. ..."
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-medium mb-0.5">Baro</label>
                    <input
                      type="text"
                      value={data.karsiTaraf.vekilBaro || ''}
                      onChange={(e) => updateParty('karsiTaraf', 'vekilBaro', e.target.value)}
                      placeholder="İstanbul"
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-0.5">Baro Sicil</label>
                    <input
                      type="text"
                      value={data.karsiTaraf.vekilBaroSicilNo || ''}
                      onChange={(e) => updateParty('karsiTaraf', 'vekilBaroSicilNo', e.target.value)}
                      placeholder="12345"
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Arabulucu */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
                <div className="font-bold text-slate-900 border-b border-slate-200 pb-1 flex items-center justify-between">
                  <span>Görevli Arabulucu</span>
                  <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">ADB Sicilli</span>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">Arabulucu Adı Soyadı</label>
                  <input
                    type="text"
                    value={data.arabulucu.adSoyad}
                    onChange={(e) => updateMediator('adSoyad', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">ADB Sicil Numarası</label>
                  <input
                    type="text"
                    value={data.arabulucu.sicilNo}
                    onChange={(e) => updateMediator('sicilNo', e.target.value)}
                    placeholder="Örn: 18492"
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-medium mb-0.5">Telefon</label>
                    <input
                      type="text"
                      value={data.arabulucu.telefon || ''}
                      onChange={(e) => updateMediator('telefon', e.target.value)}
                      placeholder="0532..."
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-0.5">E-posta</label>
                    <input
                      type="email"
                      value={data.arabulucu.eposta || ''}
                      onChange={(e) => updateMediator('eposta', e.target.value)}
                      placeholder="arabulucu@..."
                      className="w-full p-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-0.5">Çalışma Ofisi Adresi</label>
                  <input
                    type="text"
                    value={data.arabulucu.adres || ''}
                    onChange={(e) => updateMediator('adres', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Oturum ve Toplantı Bilgileri */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveAccordion(activeAccordion === 'oturum' ? 'dosya' : 'oturum')}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-semibold text-xs sm:text-sm text-slate-800 border-b border-slate-200"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-700" />
              <span>3. Oturum & Toplantı Yeri / Zamanı</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-500">
              <span className="text-xs">{data.toplantiTarihi} - {data.toplantiSaati}</span>
              {activeAccordion === 'oturum' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {activeAccordion === 'oturum' && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Toplantı / Oturum Tarihi</label>
                <input
                  type="text"
                  value={data.toplantiTarihi}
                  onChange={(e) => updateField('toplantiTarihi', e.target.value)}
                  placeholder="GG.AA.YYYY"
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Toplantı / Oturum Saati</label>
                <input
                  type="text"
                  value={data.toplantiSaati}
                  onChange={(e) => updateField('toplantiSaati', e.target.value)}
                  placeholder="14:00"
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Oturum Biçimi</label>
                <select
                  value={data.toplantiTuru}
                  onChange={(e) => updateField('toplantiTuru', e.target.value as 'fiziki' | 'telekonferans' | 'karma')}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  <option value="fiziki">Fiziki Oturum</option>
                  <option value="telekonferans">Telekonferans / Online</option>
                  <option value="karma">Karma (Fiziki + Online)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block font-semibold text-slate-700 mb-1">Toplantı Yeri / Adresi</label>
                <input
                  type="text"
                  value={data.toplantiYeri}
                  onChange={(e) => updateField('toplantiYeri', e.target.value)}
                  placeholder="Örn: İstanbul Arabuluculuk Bürosu Görüşme Odası 2 (Şişli / İSTANBUL)"
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {scenario === 'anlasmama' && (
                <div className="sm:col-span-3 pt-2">
                  <label className="block font-semibold text-rose-800 mb-1">Anlaşmama Gerekçesi (Son Tutanağa Yazılacak İfade):</label>
                  <textarea
                    rows={2}
                    value={data.anlasmamaNedeni || ''}
                    onChange={(e) => updateField('anlasmamaNedeni', e.target.value)}
                    placeholder="Örn: Taraflar uyuşmazlık konusu alacak kalemleri ve miktarları üzerinde yapılan müzakereler sonucunda mutabakata varamamışlardır."
                    className="w-full p-2 border border-rose-300 rounded-md focus:ring-1 focus:ring-rose-800 bg-rose-50/30"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 4: Anlaşma Şartları (Eğer Anlaşma veya Hepsi Seçiliyse) */}
        {(scenario === 'anlasma' || scenario === 'hepsi') && (
          <div className="border border-emerald-200 rounded-lg overflow-hidden bg-emerald-50/20">
            <button
              type="button"
              onClick={() => setActiveAccordion(activeAccordion === 'anlasma' ? 'dosya' : 'anlasma')}
              className="w-full px-4 py-3 bg-emerald-100/60 hover:bg-emerald-100 flex items-center justify-between font-semibold text-xs sm:text-sm text-emerald-950 border-b border-emerald-200"
            >
              <div className="flex items-center space-x-2">
                <Handshake className="w-4 h-4 text-emerald-700" />
                <span>4. Anlaşma Şartları, Ödeme Takvimi & İbra Hükümleri</span>
              </div>
              <div className="flex items-center space-x-1 text-emerald-800">
                <span className="text-xs font-bold">{data.anlasmaSartlari?.odenecekTutar || 'Anlaşma Bedeli'}</span>
                {activeAccordion === 'anlasma' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {activeAccordion === 'anlasma' && (
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Anlaşılan Toplam Tutar (Net)
                  </label>
                  <input
                    type="text"
                    value={data.anlasmaSartlari?.odenecekTutar || ''}
                    onChange={(e) => updateAgreement('odenecekTutar', e.target.value)}
                    placeholder="Örn: 285.000,00 TL (İki Yüz Seksen Beş Bin Türk Lirası)"
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Ödeme Şekli
                  </label>
                  <input
                    type="text"
                    value={data.anlasmaSartlari?.odemeSekli || ''}
                    onChange={(e) => updateAgreement('odemeSekli', e.target.value)}
                    placeholder="Örn: 2 eşit taksitte banka havalesi ile"
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Ödeme Vadesi / Taksit Takvimi
                  </label>
                  <input
                    type="text"
                    value={data.anlasmaSartlari?.odemeTarihleri || ''}
                    onChange={(e) => updateAgreement('odemeTarihleri', e.target.value)}
                    placeholder="Örn: 1. Taksit: 25.09.2026 tarihinde 142.500 TL, 2. Taksit: 25.10.2026 tarihinde 142.500 TL"
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Alacaklı Banka ve Şubesi
                  </label>
                  <input
                    type="text"
                    value={data.anlasmaSartlari?.alacakliBanka || ''}
                    onChange={(e) => updateAgreement('alacakliBanka', e.target.value)}
                    placeholder="Örn: Garanti BBVA Şişli Şubesi"
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Alacaklı IBAN Numarası
                  </label>
                  <input
                    type="text"
                    value={data.anlasmaSartlari?.alacakliIban || ''}
                    onChange={(e) => updateAgreement('alacakliIban', e.target.value)}
                    placeholder="TR00 0000 0000 0000 0000 0000 00"
                    className="w-full p-2 border border-slate-300 rounded-md font-mono focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    İbra ve Feragat Hükmü (ADB Formatında)
                  </label>
                  <textarea
                    rows={3}
                    value={data.anlasmaSartlari?.ibraVeFeragatMetni || ''}
                    onChange={(e) => updateAgreement('ibraVeFeragatMetni', e.target.value)}
                    placeholder="Başvurucu, belirtilen bedelin tam olarak ödenmesi kaydıyla karşı tarafı gayrikabili rücu ibra ettiğini kabul ve beyan eder..."
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5E7EB]">
        <div className="flex items-center text-xs text-slate-500">
          <Scale className="w-4 h-4 mr-1.5 text-[#1E3A8A]" />
          <span>6325 sayılı Kanun m. 15, 17 ve 18 resmi şablon kuralları otomatik uygulanır.</span>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white bg-[#1E3A8A] hover:bg-[#172e6f] font-bold text-sm shadow-xs transition transform active:scale-98"
        >
          <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
          ADB Resmi Evraklarını Oluştur
        </button>
      </div>
    </div>
  );
}
