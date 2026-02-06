// app/api/space-state/route.ts
import { NextResponse } from 'next/server';
import { SpaceElement } from '@/lib/element-protocol';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 🛡️ 哲学过滤器 (The Philosophy Filter)
    // 严禁上传设备层信息，只接受环境层信息
    const forbiddenKeys = ['device', 'brand', 'switch', 'mac_address', 'philips', 'xiaomi'];
    const keys = Object.keys(body);
    
    for (const key of keys) {
      if (forbiddenKeys.some(forbidden => key.toLowerCase().includes(forbidden))) {
        return NextResponse.json(
          { 
            error: "PROTOCOL VIOLATION", 
            message: "SpaceSQ rejects device-level data. Please upload physical state only (Lux, Temp, dB)." 
          },
          { status: 400 }
        );
      }
    }

    // 💾 模拟存入时序数据库 (Time-Series DB)
    // 在真实生产环境，这里会写入 InfluxDB 或 Supabase
    console.log(`[STSD] Recording Time-Series for Space: ${body.spaceId}`);
    console.log(`       Elements: ${JSON.stringify(body.elements)}`);

    return NextResponse.json({
      status: "RECORDED",
      timestamp: Date.now(),
      note: "State preserved in Genesis History."
    });

  } catch (e) {
    return NextResponse.json({ status: "ERROR" }, { status: 500 });
  }
}
