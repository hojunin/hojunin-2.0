import React from 'react';
import CategoryCard from '../../components/contents/category-card';
import Callout from '@/components/common/callout';
import { createClient } from '@/lib/supabase/server';
import CommonError from '@/components/common/common-error';

const ContentsPage = async () => {
	const supabase = createClient();
	const { data: categories, error } = await supabase.from('contents_tag').select('name, path');

	if (error || !categories) {
		return <CommonError />;
	}

	return (
		<div>
			<Callout title="공사중" type="info">
				뭘 넣는게 좋을까~
			</Callout>

			<section className="mt-5 flex w-full gap-x-4">
				{categories.map(({ name, path }) => (
					<CategoryCard category={name} path={path} key={`${name}-${path}`} />
				))}
			</section>
		</div>
	);
};

export default ContentsPage;
