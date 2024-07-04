'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

const useGetUser = () => {
	const [isInitialized, setIsInitialized] = useState(false);
	const [user, setUser] = useState<User | undefined>();
	useEffect(() => {
		const supabase = createClient();

		supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user);
			setIsInitialized(true);
		});
	}, []);

	return { isInitialized, user };
};

export default useGetUser;
