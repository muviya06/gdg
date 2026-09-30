const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const body = request.body || {};
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '');
    const state = String(body.state || '').trim();
    const createAccount = Boolean(body.createAccount);

    if (!username || !password) {
      return response.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    if (!supabase) {
      return response.status(500).json({ success: false, message: 'Supabase is not configured. Add the project keys in Vercel environment variables.' });
    }

    const { data: existingData, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (createAccount) {
      if (existingData) {
        return response.status(409).json({ success: false, message: 'Username already exists.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ username, password_hash: passwordHash, state });

      if (insertError) {
        throw insertError;
      }

      return response.status(200).json({
        success: true,
        username,
        state,
        created: true,
        message: 'Account created successfully.'
      });
    }

    if (!existingData) {
      const passwordHash = await bcrypt.hash(password, 10);
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ username, password_hash: passwordHash, state });

      if (insertError) {
        throw insertError;
      }

      return response.status(200).json({
        success: true,
        username,
        state,
        created: true,
        message: 'New account created on sign in.'
      });
    }

    const passwordMatches = await bcrypt.compare(password, existingData.password_hash);
    if (!passwordMatches) {
      return response.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    if (state) {
      await supabase
        .from('profiles')
        .update({ state })
        .eq('username', username);
    }

    return response.status(200).json({
      success: true,
      username,
      state: state || existingData.state,
      created: false,
      message: 'Login successful.'
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error && error.message ? error.message : 'Unable to process login request.'
    });
  }
};
