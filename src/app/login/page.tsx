'use client';
import React, { useEffect, useState } from 'react';

import LoginInfo from '@/components/login/login-info';
import LoginForm from '@/components/login/login-form';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Skeleton } from '@/components/ui/skeleton';

const LoginPage = () => {
	const [isInitialized, setIsInitialized] = useState(false);
	const [user, setUser] = useState<User | undefined>();
	useEffect(() => {
		const supabase = createClient();

		supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user);
			setIsInitialized(true);
		});
	}, []);

	if (!isInitialized) {
		return (
			<div className="flex flex-col gap-y-4">
				<Skeleton className="h-10 w-40" />
				<Skeleton className="w-600 h-10" />
			</div>
		);
	}

	return <div>{!user ? <LoginForm /> : <LoginInfo user={user} />}</div>;
};

export default LoginPage;
