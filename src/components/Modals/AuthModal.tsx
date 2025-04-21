'use client';

import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect, useCallback } from 'react';
import { IoClose } from 'react-icons/io5';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Signup from './Signup';
import { useAtom } from 'jotai';


const AuthModal = () => {
	const [authModal, setAuthModal] = useAtom(authModalState);

  if (!authModal.isOpen) return null;

	// const closeModal = useCloseModal();

	return (
		<>
			{/* Background Overlay */}
			<div
				className="fixed inset-0 z-40 bg-black bg-opacity-60"
				// onClick={closeModal}
			></div>

			{/* Modal Container */}
			<div className="fixed z-50 top-1/2 left-1/2 w-full sm:w-[450px] transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center px-4">
				<div className="relative w-full">
					{/* Modal Content */}
					<div className="bg-gradient-to-b from-brand-orange to-slate-900 text-white rounded-lg shadow-lg p-4">
						{/* Close Button */}
						<div className="flex justify-end">
							<button
								type="button"
								className="text-white hover:text-gray-300"
								// onClick={closeModal}
							>
								<IoClose className="w-6 h-6" />
							</button>
						</div>
						{/* Auth Views */}
						{authModal.type === 'login' ? (
							<Login />
						) : authModal.type === 'register' ? (
							<Signup />
						) : (
							<ResetPassword />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthModal;

// function useCloseModal() {
	// const setAuthModal = useSetRecoilState(authModalState);

	// const closeModal = useCallback(() => {
	// 	setAuthModal((prev) => ({ ...prev, isOpen: false, type: 'login' }));
	// }, [setAuthModal]);

// 	useEffect(() => {
// 		const handleEsc = (e: KeyboardEvent) => {
// 			if (e.key === 'Escape') closeModal();
// 		};
// 		window.addEventListener('keydown', handleEsc);
// 		return () => window.removeEventListener('keydown', handleEsc);
// 	}, [closeModal]);

// 	return closeModal;
// }
