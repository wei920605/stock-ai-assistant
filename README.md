#  AI 股評助理 (Taiwan Stock AI Assistant)

這是一個整合 **Next.js 15**、**Llama 3.1 LLM** 與 **Groq 高速推理引擎** 的即時台股分析工具。使用者只需輸入台股代號，即可獲得專業且具備幽默感的技術面分析報告，並支援語音朗讀互動。

🔗 **Live Demo:** [https://stock-ai-assistant-chi.vercel.app](https://stock-ai-assistant-chi.vercel.app)

---

##  核心特色
* **極速 AI 回應**：採用 Groq LPU 推理技術，Llama 3.1 模型的生成速度低於 1 秒。
* **智慧語音互動**：整合 Web Speech API 實現文字轉語音 (TTS)，並具備動態 UI 狀態回饋。
* **響應式設計**：使用 Tailwind CSS 打造完美適配手機與桌機的 UI 介面。
* **安全性實踐**：後端處理 API 請求，嚴格保護環境變數 (Environment Variables)。

##  技術棧 (Tech Stack)
* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **AI Model**: Llama 3.1 8B (via Groq Cloud)
* **Deployment**: Vercel

##  快速啟動 (Local Development)

1. **複製專案**:
   ```bash
   git clone [https://github.com/wei920605/stock-ai-assistant.git](https://github.com/wei920605/stock-ai-assistant.git)
   
2.安裝依賴:
 ```bash
npm install

3.在根目錄建立 .env.local 並填入你的 API Key：
GROQ_API_KEY=你的_GROQ_API_金鑰

4.啟動開發伺服器:
 ```bash
npm run dev

##  挑戰與收穫
安全性優化：實踐了從環境變數管理到後端路由封裝的完整安全流程，防止敏感金鑰外洩。

互動設計：克服了 Web Speech API 在不同瀏覽器間的相容性，並透過狀態機邏輯設計了直觀的 UI 視覺回饋。
