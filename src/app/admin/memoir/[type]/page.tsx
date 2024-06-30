'use client';
import React from 'react';

const MemoirDetailAdminPage = ({ params }: { params: { type: string } }) => {
	return <div>{params.type}</div>;
};

export default MemoirDetailAdminPage;
