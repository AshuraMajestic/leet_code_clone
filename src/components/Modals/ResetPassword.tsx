'use client';

import { auth } from '@/firebase/firebase';
import React, { useState, useEffect } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const ResetPassword: React.FC = () => {
	const [email, setEmail] = useState('');
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email) {
			toast.warning('Please enter your email.', { position: 'top-center' });
			return;
		}

		const success = await sendPasswordResetEmail(email);
		if (success) {
			toast.success('Password reset email sent.', {
				position: 'top-center',
				autoClose: 3000,
				theme: 'dark',
			});
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message, { position: 'top-center' });
		}
	}, [error]);

	return (
		<form
			onSubmit={handleReset}
			className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
		>
			<h3 className="text-xl font-medium text-white">Reset Password</h3>
			<p className="text-sm text-white">
				Forgotten your password? Enter your e-mail address below and we&apos;ll
				send you a link to reset it.
			</p>

			<div>
				<label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
					Your email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="name@example.com"
					required
				/>
			</div>

			<button
				type="submit"
				// disabled={sending}
				className="w-full text-white bg-brand-orange hover:bg-brand-orange-s focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition disabled:opacity-50"
			>
				{sending ? 'Sending...' : 'Reset Password'}
			</button>
		</form>
	);
};

export default ResetPassword;
