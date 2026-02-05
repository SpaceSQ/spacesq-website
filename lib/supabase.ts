import { createClient } from '@supabase/supabase-js';

// ⚠️ 暴力测试模式：直接把真实的 URL 和 Key 填在这里
// 注意：不要把这个文件长期留在 GitHub 上，测试完我们再改回环境变量模式
const hardcodedUrl = 'https://ajmcstwhrblnbcavlqlq.supabase.co'; 
const hardcodedKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbWNzdHdocmJsbmJjYXZscWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNzU2MTUsImV4cCI6MjA4NTg1MTYxNX0.KpC9KtTWJLb7_QzwNr6aWVQiwe1rgTpz1CgP4pp_9bk';

export const supabase = createClient(hardcodedUrl, hardcodedKey);
