import SupabaseProvider from '@/context/supabase-provider';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<SupabaseProvider>{children}</SupabaseProvider>
		</div>
	);
};

export default AdminLayout;
