import OpenAI from "openai";
import { NextResponse } from "next/server";

// 初始化 Groq 客戶端 (使用 OpenAI 相容格式)
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // 改用環境變數讀取
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { stockSymbol } = await req.json();

    // 這裡已更新為 llama-3.1-8b-instant，避免 decommissioned (400) 錯誤
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "你是一位專業的台股分析師，擅長技術面分析，語氣專業中帶點幽默感。"
        },
        {
          role: "user",
          content: `請針對股票代號 ${stockSymbol} 提供簡短的技術面趨勢分析、操作建議，並附上一句犀利的幽默短評。請全程使用繁體中文。`
        }
      ],
      model: "llama-3.1-8b-instant", 
      temperature: 0.7,
    });

    const aiText = completion.choices[0]?.message?.content || "AI 暫時無法回應";

    return NextResponse.json({ text: aiText });

  } catch (error: any) {
    console.error("Groq API 錯誤:", error);
    
    // 如果是因為模型名稱或頻率限制，讓前端知道具體原因
    return NextResponse.json(
      { error: `分析失敗: ${error.message}` },
      { status: 500 }
    );
  }
}