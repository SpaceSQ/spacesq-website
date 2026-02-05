import { createClient } from '@supabase/supabase-js';

// 1. 获取原始内容
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL'';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY'';

// 2. 🧹 强力清洗 (洗掉可能存在的引号和空格)
const cleanUrl = rawUrl.replace(/["']/g, '').trim();
const cleanKey = rawKey.replace(/["']/g, '').trim();

// 3. ✅ 兜底策略
// 如果读不到(构建时)或者格式不对，用假地址顶替，防止构建崩溃
const urlToUse = cleanUrl.startsWith('http') ? cleanUrl : 'https://placeholder.supabase.co';
const keyToUse = cleanKey.length > 0 ? cleanKey : 'placeholder-key';

export const supabase = createClient(urlToUse, keyToUse);
