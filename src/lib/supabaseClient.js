import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  : null;

/**
 * Submits applicant to the Supabase PostgreSQL waitlist table.
 * Protected by Row Level Security (RLS) - write-only for public clients.
 */
export async function submitWaitlistEntry({ fullName, email, phone, age, occupation, honeypot }) {
  // 1. Invisible bot honeypot trap: if filled, quietly drop request
  if (honeypot) {
    console.warn('Bot submission blocked via honeypot.');
    return { success: true, waitlistNumber: 9999, isSpam: true };
  }

  // 2. Client-side sanitation
  const cleanName = fullName.trim().slice(0, 80);
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim();
  const cleanAge = parseInt(age, 10);
  const validOccupations = ['Student', 'Working Individual', 'Other'];
  const cleanOccupation = validOccupations.includes(occupation) ? occupation : 'Student';

  // 3. Fallback mock if Supabase credentials are not yet added to .env
  if (!isSupabaseConfigured || !supabase) {
    console.info('Supabase credentials not configured in .env; using local preview confirmation.');
    const mockNumber = Math.floor(1200 + Math.random() * 500);
    return { success: true, waitlistNumber: mockNumber, isMock: true };
  }

  try {
    // 4. Attempt Secure RPC call (Zero table SELECT permission required for anon key)
    const { data: rpcData, error: rpcError } = await supabase.rpc('join_waitlist', {
      p_full_name: cleanName,
      p_email: cleanEmail,
      p_phone: cleanPhone,
      p_age: cleanAge,
      p_occupation: cleanOccupation
    });

    if (!rpcError && rpcData) {
      if (rpcData.success) {
        return { success: true, waitlistNumber: rpcData.waitlist_number };
      }
      return { success: false, error: rpcData.error || 'Failed to submit.' };
    }

    // 5. Direct table insert fallback (if RPC is not yet created in SQL editor)
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([
        {
          full_name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          age: cleanAge,
          occupation: cleanOccupation
        }
      ]);

    if (insertError) {
      if (insertError.code === '23505') {
        return { success: false, error: 'This email is already registered on the waitlist!' };
      }
      console.error('Supabase waitlist insert error:', insertError);
      return { success: false, error: insertError.message || 'Failed to submit. Please check your details.' };
    }

    return { 
      success: true, 
      waitlistNumber: Math.floor(1200 + Math.random() * 500) 
    };
  } catch (err) {
    console.error('Unexpected waitlist submission error:', err);
    return { success: false, error: 'Network error. Please try again later.' };
  }
}
