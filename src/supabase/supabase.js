import { createClient } from "@supabase/supabase-js"
import config from "../../config"

const supabaseUrl = config.supabase_url;
const supabaseApiKey = config.supabase_api_key;

console.log(supabaseUrl,supabaseApiKey);

export const supabase = createClient(supabaseUrl, supabaseApiKey);