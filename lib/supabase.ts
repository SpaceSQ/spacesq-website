import { createClient } from '@supabase/supabase-js';

// 1. 尝试读取环境变量
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. 🛡️ 终极防弹逻辑：
// 无论环境变量读没读到，必须保证传给 createClient 的是一个合法的 URL 字符串。
// 只要不是 undefined 或空字符串，构建就能通过。
const url = (envUrl && envUrl.length > 0) ? envUrl : 'https://placeholder.supabase.co';
const key = (envKey && envKey.length > 0) ? envKey : 'placeholder-key';

// 3. 只有在开发环境才打印日志 (可选)
if (!envUrl) {
  console.warn('⚠️ Supabase URL not found in environment, using placeholder.');
}

// 4. 导出客户端
export const supabase = createClient(url, key);
