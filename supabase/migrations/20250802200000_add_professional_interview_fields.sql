-- Add additional fields for professional interviews
ALTER TABLE public.interviews ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.interviews ADD COLUMN IF NOT EXISTS topics TEXT[]; -- Array of topic tags
ALTER TABLE public.interviews ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 0.0;
ALTER TABLE public.interviews ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;
ALTER TABLE public.interviews ADD COLUMN IF NOT EXISTS interview_type TEXT DEFAULT 'regular' CHECK (interview_type IN ('regular', 'professional'));

-- Add index for better performance on searches
CREATE INDEX IF NOT EXISTS idx_interviews_category ON public.interviews(category);
CREATE INDEX IF NOT EXISTS idx_interviews_location ON public.interviews(location);
CREATE INDEX IF NOT EXISTS idx_interviews_type ON public.interviews(interview_type);
