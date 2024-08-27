import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://konlirdkcqpzknwqyxsv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbmxpcmRrY3Fwemtud3F5eHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyNzg2MDQsImV4cCI6MjAzODg1NDYwNH0.rWOTaFg9dqR9FnZaxC0lae6YpOk_2f4_b8I4JamLRgg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
