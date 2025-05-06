'use client';

import React from 'react';
import PublishPageContent from './publish-page-content';
import { ContentProvider } from './contexts/ContentContext';
import { PlatformProvider } from './contexts/PlatformContext';
import { PublishProvider } from './contexts/PublishContext';

// Context Provider 최소화 - 꼭 필요한 Context만 남기고 react-hook-form으로 전환
const PublishPage: React.FC = () => {
	return (
		<ContentProvider>
			<PlatformProvider>
				<PublishProvider>
					<PublishPageContent />
				</PublishProvider>
			</PlatformProvider>
		</ContentProvider>
	);
};

export default PublishPage;
