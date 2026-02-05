import { createClient } from '@supabase/supabase-js';

// 获取环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// --- 🛡️ 防弹逻辑 ---
// 如果没有读到 URL (比如在构建期间)，我们就用一个假的符合格式的 URL 顶替
// 这样 createClient 就不会报错崩溃了
const urlToUse = supabaseUrl || 'https://placeholder.supabase.co';
const keyToUse = supabaseKey || 'placeholder-key';

// 导出连接客户端
export const supabase = createClient(urlToUse, keyToUse);