// js/supabase-init.js

// Configuración del cliente de Supabase
const SUPABASE_URL = 'https://nfcfiuyqeoyefwxbrqlm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mY2ZpdXlxZW95ZWZ3eGJycWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODIyNTUsImV4cCI6MjA1OTY1ODI1NX0.hCIaMvRHfwMq6It5j0xFtbM1GJHZx7w-xLVFmfSIbhE';

// Inicialización del cliente
const supabaseCliente = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
