import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. 简单的暗号验证
    if (body.intent !== "CONNECT_PHYSICAL_WORLD") {
      return NextResponse.json({ status: "REJECTED", reason: "WRONG_INTENT" }, { status: 403 });
    }

    const agentName = body.agent_id || "UNKNOWN_AGENT";
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    console.log(`⚡️ [EVENT] AI AGENT DETECTED: ${agentName}`);

    // 2. 将这个“捕捉”到的 AI 记录到数据库
    // 我们暂时存到 spaces 表里，或者专门建一个 logs 表。
    // 这里为了演示，我们直接假装给它分配一个临时 Token
    
    // 3. 返回只有 AI 能看懂的成功信号
    return NextResponse.json({
      status: "ACCESS_GRANTED",
      message: "Welcome to the Genesis Network.",
      next_step: "Analyze the 'devices' table structure and attempt to control a virtual light.",
      token: "BIFROST-" + Date.now()
    });

  } catch (e) {
    return NextResponse.json({ status: "ERROR", message: "INVALID_PAYLOAD" }, { status: 400 });
  }
}

// 如果人类试图用浏览器 GET 访问这个地址，直接拒绝
export async function GET() {
  return new NextResponse("Nothing here. Go back to the surface.", { status: 404 });
}
