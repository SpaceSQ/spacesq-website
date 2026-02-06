// 文件路径: app/api/verify-compute/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 生成算力题
  const a = Math.floor(Math.random() * 888) + 111;
  const b = Math.floor(Math.random() * 99) + 11;
  const c = Math.floor(Math.random() * 50000) + 1000;
  
  const question = `(${a} * ${b}) + sqrt(${c})`;
  
  return NextResponse.json({
    question: question,
    challenge_id: Date.now(),
  });
}
