'use client';

import { authModalState } from '@/atoms/authModalAtom';
import { useAtom } from 'jotai';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
	const [authModal,setAuthModal] = useAtom(authModalState);
	const router = useRouter();
	const [inputs, setInputs] = useState({ email: '', password: '' });
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password } = inputs;

		if (!email || !password) {
			toast.warning('Please fill in all fields', {
				position: 'top-center',
				autoClose: 3000,
			});
			return;
		}

		try {
			const userCred = await signInWithEmailAndPassword(email, password);
			if (!userCred) return;
			router.push('/');
		} catch (err: any) {
			toast.error(err.message, {
				position: 'top-center',
				autoClose: 3000,
				theme: 'dark',
			});
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message, {
				position: 'top-center',
				autoClose: 3000,
				theme: 'dark',
			});
		}
	}, [error]);

	const switchView = (type: 'login' | 'register' | 'forgotPassword') => {
		setAuthModal((prev) => ({ ...prev, type }));
	};

	return (
		<form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
			<h3 className="text-xl font-semibold text-white">Sign in to LeetClone</h3>

			{/* Email */}
			<div>
				<label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
					Your Email
				</label>
				<input
					id="email"
					name="email"
					type="email"
					value={inputs.email}
					onChange={handleInputChange}
					className="border-2 outline-none sm:text-sm rounded-lg
					focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
					bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="name@example.com"
				/>
			</div>

			{/* Password */}
			<div>
				<label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
					Your Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					value={inputs.password}
					onChange={handleInputChange}
					className="border-2 outline-none sm:text-sm rounded-lg
					focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
					bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="••••••••"
				/>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
				bg-brand-orange hover:bg-brand-orange-s focus:ring-2 focus:ring-orange-400 transition"
			>
				{loading ? 'Loading...' : 'Log In'}
			</button>

			{/* Forgot Password */}
			<div className="flex justify-end">
				<button
					type="button"
					onClick={() => switchView('forgotPassword')}
					className="text-sm text-brand-orange hover:underline"
				>
					Forgot Password?
				</button>
			</div>

			{/* Register Link */}
			<div className="text-sm font-medium text-gray-300 text-center">
				Not Registered?{' '}
				<button
					type="button"
					onClick={() => switchView('register')}
					className="text-blue-500 hover:underline"
				>
					Create account
				</button>
			</div>
		</form>
	);
};

export default Login;
