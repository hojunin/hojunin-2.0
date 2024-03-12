import { createClient } from '@/lib/supabase/client';

export async function uploadFile(file: File) {
  const supabase = createClient();
  const filePath = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
  const { data, error } = await supabase.storage
    .from('contents')
    .upload(`${filePath}/${file.name}-${file.size}`, file);
  if (error) {
    console.error(error);
    return null;
  }
  return data.path;
}
