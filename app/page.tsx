"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [stock, setStock] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const playVoice = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#]/g, '');
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = "zh-TW";
      utter.onstart = () => { setIsPlaying(true); setIsPaused(false); };
      utter.onend = () => { setIsPlaying(false); setIsPaused(false); };
      utter.onerror = () => { setIsPlaying(false); setIsPaused(false); };
      window.speechSynthesis.speak(utter);
    }
  };

  const handleButtonClick = () => {
    const synth = window.speechSynthesis;
    if (isPlaying) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
    } else if (result) {
      playVoice(result);
    }
  };

  const handleAnalyze = async () => {
    if (!stock) return alert("請輸入股票代號");
    setLoading(true);
    setResult("AI 分析師正在看盤中，請稍候...");
    window.speechSynthesis.cancel();
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockSymbol: stock }),
      });
      const data = await response.json();
      setResult(data.text || "分析失敗");
      if (data.text) playVoice(data.text);
    } catch (err) {
      setResult("連線發生錯誤");
    }
    setLoading(false);
  };

  // 根據狀態決定樣式的邏輯函數
  const getButtonStyle = () => {
    if (!isPlaying) return { backgroundColor: "#10b981", color: "#ffffff" }; // 綠底白字
    if (isPaused) return { backgroundColor: "#f59e0b", color: "#ffffff" };   // 橘底白字
    return { backgroundColor: "#ef4444", color: "#ffffff" };               // 紅底白字
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8 flex flex-col items-center font-sans text-slate-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">📈 AI 股評助理</h1>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <input 
              className="flex-grow border border-slate-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="例如: 2330.TW"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button onClick={handleAnalyze} disabled={loading} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">
              {loading ? "分析中" : "分析"}
            </button>
          </div>

          <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-100 min-h-[180px]">
            <p className="whitespace-pre-wrap leading-relaxed text-slate-700 text-sm">
              {result || "目前的市場數據將在此呈現..."}
            </p>
          </div>

          {/* 🔘 使用 style 屬性強制套用顏色 */}
          {result && !loading && (
            <button 
              onClick={handleButtonClick}
              style={getButtonStyle()}
              className="w-full mt-4 py-4 rounded-xl font-bold transition-all shadow-md border-none flex items-center justify-center gap-2"
            >
              {!isPlaying && <span>📢 重新播放語音報告</span>}
              {isPlaying && isPaused && <span>▶️ 繼續播放</span>}
              {isPlaying && !isPaused && <span>⏸️ 暫停播放</span>}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}