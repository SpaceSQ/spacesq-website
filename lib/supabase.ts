import { createClient } from '@supabase/supabase-js';

// 1. 获取环境变量
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 2. 清洗数据 (去除引号和空格)
const cleanUrl = rawUrl.replace(/["']/g, '').trim();
const cleanKey = rawKey.replace(/["']/g, '').trim();

// 3. 兜底策略
const urlToUse = cleanUrl.startsWith('http') ? cleanUrl : 'https://placeholder.supabase.co';
const keyToUse = cleanKey.length > 0 ? cleanKey : 'placeholder-key';

export const supabase = createClient(urlToUse, keyToUse);
