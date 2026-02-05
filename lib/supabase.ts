import { createClient } from '@supabase/supabase-js';

// 1. 获取原始内容
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 2. 🧹 强力清洗逻辑 (洗掉引号、空格)
// 这一步能解决 99% 的配置错误
const cleanUrl = rawUrl.replace(/["']/g, '').trim();
const cleanKey = rawKey.replace(/["']/g, '').trim();

// 3. ✅ 合法性检查
// 如果清洗后的 URL 不是以 http 开头，说明还是坏的，就用假的占位符顶替
// 这样构建器就不会崩溃了
const urlToUse = cleanUrl.startsWith('http') ? cleanUrl : 'https://placeholder.supabase.co';
const keyToUse = cleanKey.length > 0 ? cleanKey : 'placeholder-key';

// 4. 创建客户端
export const supabase = createClient(urlToUse, keyToUse);
