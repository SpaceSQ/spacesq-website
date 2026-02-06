import { NextResponse } from 'next/server';

// 模拟发送邮件验证码
export async function POST(request: Request) {
  const { email } = await request.json();
  
  // 真实场景这里会调用 SendGrid/Gmail API
  // 现在为了测试，我们生成一个固定码，但在控制台打印出来
  const code = "114514"; // 示例固定码，或者生成随机数
  
  console.log(`> [MOCK EMAIL SERVICE] Sending code ${code} to ${email}`);
  
  return NextResponse.json({ 
    success: true, 
    message: "Verification code sent via subspace relay." 
  });
}
