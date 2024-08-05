'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

const UserInfoButton = () => {
	const [user, setUser] = useState<User | undefined>();
	useEffect(() => {
		const supabase = createClient();

		supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user);
		});
	}, []);

	if (!user) {
		return null;
	}
	return (
		<Avatar>
			<Link href={'/admin'}>
				<AvatarImage
					src="https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/prod/hojun.jpeg-33426?t=2024-07-04T15%3A44%3A09.111Z"
					alt="인호준"
				/>
			</Link>
		</Avatar>
	);
};

export default UserInfoButton;
