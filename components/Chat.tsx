'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  Trash2,
  Loader2,
  Copy,
  Check,
  Scale,
  Sparkles,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatProps {
  initialOpen?: boolean;
  className?: string;
}

export default function Chat({ initialOpen = false, className = '' }: ChatProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        'Merhaba! Ben **Arabulucu & Hukuk AI Asistanınızım**.\n\n6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu, dava şartı / ihtiyari arabuluculuk süreçleri, tutanak maddeleri, ibra metinleri veya arabuluculuk ücret tarifesi hakkında bana soru sorabilirsiniz.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage.trim();
    if (!textToSend || isLoading) return;

    setErrorMessage(null);

    const userMessageId = `user-${Date.now()}`;
    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    if (!customPrompt) setInputMessage('');
    setIsLoading(true);

    try {
      // Backend API'ye sadece fetch() ile POST isteği atılır.
      // Kesinlikle istemci tarafında AI kütüphaneleri veya API anahtarları kullanılmaz.
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Yapay zeka yanıt verirken bir hata oluştu.');
      }

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.message || data.reply || 'Yanıt alınamadı.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errText =
        err instanceof Error ? err.message : 'Mesaj gönderilirken bir sorun oluştu.';
      setErrorMessage(errText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          'Sohbet geçmişi temizlendi. Arabuluculuk mevzuatı veya tutanak oluşturma ile ilgili yeni bir soru sorabilirsiniz.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMessage(null);
  };

  const sampleQuestions = [
    '6325 sayılı Kanuna göre işçi alacaklarında dava şartı süresi ne kadardır?',
    'Arabuluculuk anlaşma belgesi için icra edilebilirlik şerhi nasıl alınır?',
    'Kira uyuşmazlığında tahliye ve kira bedeli anlaşma maddesi örneği yaz.',
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-[#1E3A8A] hover:bg-[#172e6f] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 border-2 border-white/20 group cursor-pointer ${className}`}
          aria-label="Arabulucu AI Asistanı Aç"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#1E3A8A] animate-pulse"></span>
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide">Arabulucu AI Chat</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden ${
            isMinimized
              ? 'bottom-6 right-6 w-80 h-14'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[460px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#1E3A8A] text-white px-4 py-3 flex items-center justify-between border-b border-blue-900 select-none">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B91C1C] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-sm tracking-tight text-white">Arabulucu AI Asistanı</h3>
                  <span className="bg-blue-800 text-blue-200 text-[10px] px-1.5 py-0.5 rounded font-medium">
                    Server-Side
                  </span>
                </div>
                <p className="text-[11px] text-blue-200">6325 sayılı HUAK & ADB Hukuk Botu</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {!isMinimized && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Sohbeti Temizle"
                  className="p-1.5 text-blue-200 hover:text-white hover:bg-blue-800/60 rounded-md transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Genişlet' : 'Küçült'}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-blue-800/60 rounded-md transition"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Kapat"
                className="p-1.5 text-blue-200 hover:text-white hover:bg-red-700/80 rounded-md transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 text-xs sm:text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white shadow-2xs ${
                        msg.role === 'user' ? 'bg-[#1E3A8A]' : 'bg-[#B91C1C]'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>

                    {/* Content Box */}
                    <div
                      className={`group relative max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                        msg.role === 'user'
                          ? 'bg-[#1E3A8A] text-white rounded-tr-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-xs max-w-none text-slate-800 leading-relaxed font-sans prose-p:my-1 prose-headings:my-1.5 prose-strong:text-slate-900">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap leading-relaxed font-sans">{msg.content}</p>
                      )}

                      <div
                        className={`flex items-center justify-between gap-2 mt-1.5 pt-1 border-t text-[10px] ${
                          msg.role === 'user'
                            ? 'border-blue-700/50 text-blue-200'
                            : 'border-slate-100 text-slate-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>

                        {msg.role === 'assistant' && (
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-slate-800 inline-flex items-center space-x-1"
                            title="Yanıtı Kopyala"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span className="text-[10px]">
                              {copiedId === msg.id ? 'Kopyalandı' : 'Kopyala'}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center space-x-2 text-slate-500 text-xs bg-white border border-slate-200 p-3 rounded-xl w-fit shadow-2xs">
                    <Loader2 className="w-4 h-4 animate-spin text-[#1E3A8A]" />
                    <span>Mevzuat inceleniyor ve yanıt hazırlanıyor...</span>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                    <p className="font-bold">Bir hata oluştu:</p>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions (Shown if only welcome message exists) */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200">
                  <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1 mb-1.5">
                    <Sparkles className="w-3 h-3 text-[#B91C1C]" /> Örnek Sorular:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {sampleQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="text-left text-[11px] text-slate-700 bg-white hover:bg-blue-50 hover:text-[#1E3A8A] hover:border-blue-300 p-2 rounded-lg border border-slate-200 transition line-clamp-1 shadow-2xs"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Footer */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Arabuluculuk ile ilgili bir soru veya madde isteği yazın... (Enter ile gönder)"
                    rows={2}
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white resize-none transition"
                  />

                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="p-3 bg-[#1E3A8A] hover:bg-[#172e6f] disabled:opacity-50 text-white rounded-xl transition shadow-xs flex items-center justify-center cursor-pointer shrink-0"
                    title="Gönder"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Sunucu taraflı güvenli API (GEMINI_API_KEY)</span>
                  <span>Shift + Enter: Alt Satır</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
