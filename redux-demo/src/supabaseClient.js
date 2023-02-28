import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cdxsdwnftgeqyydfqpoa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkeHNkd25mdGdlcXl5ZGZxcG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0NTY1MjIsImV4cCI6MTk5MzAzMjUyMn0.Up-JO2gFWKymxNBb9MP-pzMfYpXSbjndOa2Md6YLI04'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;