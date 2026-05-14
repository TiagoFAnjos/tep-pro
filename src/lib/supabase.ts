import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://andxxwwnrdiruqvbsizw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZHh4d3ducmRpcnVxdmJzaXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzk2ODQsImV4cCI6MjA5Mzk1NTY4NH0.ofzIKRWLFw6tKJ2PdERSp14uY-rr-WnkXYZ_20pVc2c'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)