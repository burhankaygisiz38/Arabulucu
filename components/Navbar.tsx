'use client';

import React from 'react';
import { Scale, ShieldCheck, FileCheck2, ExternalLink } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white border-b-2 border-[#B91C1C] sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded bg-[#B91C1C] flex items-center justify-center text-white font-extrabold text-sm tracking-tighter shadow-xs">
              T.C.
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#1E3A8A]">
                  ADALET BAKANLIĞI
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-[#1E3A8A] border border-blue-200">
                  <ShieldCheck className="w-3 h-3 mr-1 text-[#1E3A8A]" />
                  ADB STANDARTLARI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-md">
                Arabuluculuk Daire Başkanlığı Resmi Asistanı (6325 s.K.)
              </p>
            </div>
          </div>

          {/* Right Status & ADB Official Link */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="hidden sm:inline-flex items-center text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Sistem Aktif
            </span>
            <a
              href="https://adb.adalet.gov.tr/Home/SayfaDetay/sablonlar07012021022719"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold text-slate-700 hover:text-[#1E3A8A] bg-[#F9FAFB] hover:bg-slate-100 px-3 py-1.5 rounded-md border border-[#E5E7EB] transition shadow-2xs"
              title="Adalet Bakanlığı Resmi ADB Şablonları Sayfası"
            >
              <FileCheck2 className="w-3.5 h-3.5 mr-1.5 text-[#B91C1C]" />
              <span className="hidden sm:inline">ADB Resmi Şablonları</span>
              <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
