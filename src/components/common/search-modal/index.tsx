'use client';

import React, { useState } from 'react';
import {
	CommandDialog,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { useFetchFrontMatters, useSearchModalState, useSearchPosts } from './search-modal.hooks';

import Typography from '../typography';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SearchModal() {
	const { open, setOpen } = useSearchModalState();
	const [input, setInput] = useState('');
	const router = useRouter();
	const { data: frontMatters } = useFetchFrontMatters();
	const { suggestions, debouncedSearch, setSuggestions } = useSearchPosts();

	const handleInputChange = (value: string) => {
		const sanitizedValue = value.replace(/[^\p{L}\p{N}\s]/u, '').trim();
		setInput(sanitizedValue);
		debouncedSearch(sanitizedValue);
	};

	const onClickSuggestion = (slug: string) => {
		setOpen(false);
		setInput('');
		setSuggestions([]);
		router.push(`/contents/${slug}`);
	};

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				onClick={() => setOpen(true)}
				className="flex items-center justify-center rounded-md p-2 text-sm text-muted-foreground transition-colors md:mr-4 md:border-none"
			>
				<kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 md:inline-flex">
					<span className="hidden md:inline">Press</span>
					<span className="text-xs">⌘</span>k
				</kbd>
				<SearchIcon className="h-4 w-4 md:hidden" />
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="게시글을 검색해주세요"
					value={input}
					onValueChange={handleInputChange}
				/>
				<CommandList>
					{suggestions.length === 0 ? (
						<div>
							<div className="flex items-center justify-center p-10">
								<Typography variant="p">검색 결과가 없어요</Typography>
							</div>
							<CommandGroup heading="추천하는 글">
								{(frontMatters ?? [])
									.sort(() => 0.5 - Math.random())
									.slice(0, 5)
									.map(suggestion => (
										<CommandItem
											key={suggestion.slug}
											onSelect={() => onClickSuggestion(suggestion.slug)}
										>
											{suggestion.title}
										</CommandItem>
									))}
							</CommandGroup>
						</div>
					) : (
						<CommandGroup heading="검색 결과">
							{suggestions.map(suggestion => (
								<CommandItem
									key={suggestion.slug}
									onSelect={() => onClickSuggestion(suggestion.slug)}
								>
									{suggestion.title}
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
}

export default SearchModal;
