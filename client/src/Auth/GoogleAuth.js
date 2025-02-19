import React, { useState, useEffect } from 'react';
import { supabase } from './SupabaseClient.js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


const GoogleAuth = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Log session from getSession
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
    if (!session) {
        return (
            <div className="auth-container">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={['google']}
                />
            </div>
        );
    }

    return (
        <div className="logged-in">
            <h2>Welcome {session.user.email}!</h2>
            <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
    );
};

export default GoogleAuth;
