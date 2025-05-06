'use client';
import React, { Fragment, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '../ui/button';
import Typography from '../common/typography';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import useHandleError from '@/hooks/useHandleError';

interface Props {
	user: User;
}

const LoginInfo = ({ user }: Props) => {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const supabase = createClient();
	const handleError = useHandleError();
	const { push } = useRouter();

	const onClickLogout = async () => {
		setIsLoading(true);
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				handleError(error, { toastTitle: '로그아웃 실패' });
				return;
			}
			toast({
				title: '로그아웃 되었습니다',
			});
			push('/');
		} catch (error) {
			handleError(error, { toastTitle: '로그아웃 실패' });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-y-4">
			<Card>
				<CardHeader>
					<CardTitle>{user.email}</CardTitle>
					<CardDescription>
						{user.role === 'authenticated' ? '어드민' : '일반'} 유저
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Typography variant={'p'}>
						가입일 : {dayjs(user.created_at).format('YYYY-MM-DD')}
					</Typography>
				</CardContent>
			</Card>
			<Button variant={'secondary'} disabled={isLoading} onClick={onClickLogout}>
				{isLoading ? (
					<Fragment>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						로그아웃 중이에요
					</Fragment>
				) : (
					'로그아웃'
				)}
			</Button>
		</div>
	);
};

export default LoginInfo;
