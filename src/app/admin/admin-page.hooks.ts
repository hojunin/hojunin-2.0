import useGetUser from '@/app/admin/useGetUser';

export const useAdminPage = () => {
	const { isInitialized, user } = useGetUser();

	return {
		isInitialized,
		user,
	};
};
