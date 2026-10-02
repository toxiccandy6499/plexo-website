-- ==============================================================================
-- PLEXO WAITLIST DATABASE SCHEMA & SECURITY DEFENSE (PostgreSQL / Supabase)
-- ==============================================================================
-- Copy and paste this entire script into your Supabase SQL Editor and click RUN.
-- This creates a secure, leak-proof waitlist table with Row Level Security (RLS).
-- ==============================================================================

-- 1. Create the Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) >= 2 AND char_length(full_name) <= 80),
    email TEXT NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone TEXT NOT NULL CHECK (char_length(trim(phone)) >= 10 AND char_length(trim(phone)) <= 16),
    age INTEGER NOT NULL CHECK (age >= 13 AND age <= 120),
    occupation TEXT NOT NULL CHECK (occupation IN ('Student', 'Working Individual', 'Other')),
    waitlist_number BIGSERIAL,
    ip_hash TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Indexes for Query Performance & Unique Lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);

-- ==============================================================================
-- 3. SECURITY DEFENSE & ANTI-LEAK ENFORCEMENT (Row Level Security - RLS)
-- ==============================================================================
-- By enabling RLS, all access is denied by default.
-- We explicitly grant ONLY INSERT access to the public anon key.
-- Any attempt to SELECT, UPDATE, or DELETE from the frontend will be blocked by PostgreSQL!
-- ==============================================================================

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can submit waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.waitlist;

-- Allow public frontend (anon & authenticated) to INSERT only with validation
CREATE POLICY "Enable insert for everyone" 
ON public.waitlist 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (
    char_length(trim(full_name)) >= 2
    AND char_length(full_name) <= 80
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND char_length(trim(phone)) >= 10
    AND char_length(trim(phone)) <= 16
    AND age >= 13
    AND age <= 120
    AND occupation IN ('Student', 'Working Individual', 'Other')
);

-- Notice: NO SELECT, UPDATE, or DELETE policies are granted to 'anon' or 'authenticated'!
-- Result: If an attacker opens Chrome DevTools and runs:
-- supabase.from('waitlist').select('*')
-- PostgreSQL will return an empty list [] with 0 records. User data CANNOT be leaked.

-- ==============================================================================
-- 4. SECURE RPC FUNCTION (SECURITY INVOKER, zero elevated rights, no count leak)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.join_waitlist(
    p_full_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_age INTEGER,
    p_occupation TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.waitlist (full_name, email, phone, age, occupation)
    VALUES (p_full_name, p_email, p_phone, p_age, p_occupation);

    RETURN jsonb_build_object('success', true);
EXCEPTION
    WHEN unique_violation THEN
        RETURN jsonb_build_object('success', false, 'error', 'This email is already registered on the waitlist!');
    WHEN check_violation THEN
        RETURN jsonb_build_object('success', false, 'error', 'Invalid submission data. Please verify your details.');
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'error', 'Could not complete registration. Please try again.');
END;
$$;

GRANT EXECUTE ON FUNCTION public.join_waitlist TO anon, authenticated;


