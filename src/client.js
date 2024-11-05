import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    "https://pahhsfrskgnpjamzosdu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaGhzZnJza2ducGphbXpvc2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MDcxNDEsImV4cCI6MjA0NjM4MzE0MX0.om06TLzjpPw9YSzRc-W69uk-_6UtgKpmSCj5z2uybXM"
);