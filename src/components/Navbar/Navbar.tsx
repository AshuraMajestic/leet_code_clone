'use client';

import { authModalState } from '@/atoms/authModalAtom';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useAtom } from 'jotai';

const Navbar = () => {
	const [authModal,setAuthModal] = useAtom(authModalState);

	const handleSignInClick = () => {
		setAuthModal((prev) => ({ ...prev, isOpen: true }));
	};

	return (
		<div className="flex items-center justify-between sm:px-12 px-2 md:px-24 h-20">
			<Link href="/" className="flex items-center">
				<Image src="/logo.png" alt="LeetClone" width={200} height={200} priority />
			</Link>

			<button
				onClick={handleSignInClick}
				className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
					hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
					transition duration-300 ease-in-out"
			>
				Sign In
			</button>
		</div>
	);
};

export default Navbar;
