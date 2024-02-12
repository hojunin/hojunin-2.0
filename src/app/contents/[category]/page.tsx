import React from 'react';

const ContentsCategoryPage = ({
  params: { category },
}: {
  params: { category: 'dev' | 'life' | 'money' | 'etc' };
}) => {
  return (
    <div>
      <h1>{category}</h1>
    </div>
  );
};

export default ContentsCategoryPage;
