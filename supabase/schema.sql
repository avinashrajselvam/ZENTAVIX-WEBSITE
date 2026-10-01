-- ==============================================================================
-- ZENTAVIX DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ==============================================================================

-- 1. Create Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    details TEXT NOT NULL,
    budget TEXT,
    contact_method TEXT DEFAULT 'Email',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'converted', 'closed')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for querying by status and created_at
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- Policy A: Anyone (public / anonymous visitors) can submit a contact enquiry
CREATE POLICY "Public users can insert enquiries" 
ON public.enquiries 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Policy B: Only Authenticated Admins can view/read enquiries
CREATE POLICY "Admins can view enquiries" 
ON public.enquiries 
FOR SELECT 
TO authenticated 
USING (true);

-- Policy C: Only Authenticated Admins can update enquiries (e.g., status, notes)
CREATE POLICY "Admins can update enquiries" 
ON public.enquiries 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Policy D: Only Authenticated Admins can delete enquiries
CREATE POLICY "Admins can delete enquiries" 
ON public.enquiries 
FOR DELETE 
TO authenticated 
USING (true);

-- 4. Automatically update 'updated_at' column on update
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enquiries_updated_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- ==============================================================================
-- (Optional) Newsletter Subscribers Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can subscribe to newsletter" 
ON public.subscribers 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Admins can view subscribers" 
ON public.subscribers 
FOR SELECT 
TO authenticated 
USING (true);
