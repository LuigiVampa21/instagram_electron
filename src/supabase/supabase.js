import { createClient } from "@supabase/supabase-js"
import config from "../../config"

const supabaseUrl = config.supabase_url;
const supabaseApiKey = config.supabase_api_key;


export const supabase = createClient(supabaseUrl, supabaseApiKey);