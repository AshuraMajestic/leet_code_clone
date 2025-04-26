'use client';

import { useAtom } from 'jotai';
import { authModalState } from '@/atoms/authModalAtom';
import { auth,firestore } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { toast } from 'react-toastify';

const Signup: React.FC = () => {
	const [authModal,setAuthModal] = useAtom(authModalState);
	const router = useRouter();
	const [inputs, setInputs] = useState({
		email: '',
		displayName: '',
		password: '',
	});
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password, displayName } = inputs;

		if (!email || !password || !displayName) {
			toast.warning('Please fill in all fields', {
				position: 'top-center',
				autoClose: 3000,
			});
			return;
		}

		try {
			toast.loading('Creating your account...', {
				position: 'top-center',
				toastId: 'registering',
			});

			const newUser = await createUserWithEmailAndPassword(email, password);
			if (!newUser) return;

			const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				displayName,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
			};

			await setDoc(doc(firestore, 'users', newUser.user.uid), userData);
			router.push('/');
		} catch (err: any) {
			toast.error(err.message, { position: 'top-center' });
		} finally {
			toast.dismiss('registering');
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message, { position: 'top-center' });
		}
	}, [error]);

	const switchToLogin = () => {
		setAuthModal((prev) => ({ ...prev, type: 'login' }));
	};

	return (
		<form className="space-y-6 px-6 pb-4" onSubmit={handleSubmit}>
			<h3 className="text-xl font-medium text-white">Register to LeetClone</h3>

			{/* Email */}
			<div>
				<label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={inputs.email}
					onChange={handleChange}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="name@example.com"
				/>
			</div>

			{/* Display Name */}
			<div>
				<label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
					Display Name
				</label>
				<input
					type="text"
					id="displayName"
					name="displayName"
					value={inputs.displayName}
					onChange={handleChange}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="John Doe"
				/>
			</div>

			{/* Password */}
			<div>
				<label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					value={inputs.password}
					onChange={handleChange}
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="••••••••"
				/>
			</div>

			{/* Register Button */}
			<button
				type="submit"
				className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s focus:ring-2 focus:ring-orange-400 transition"
			>
				{loading ? 'Registering...' : 'Register'}
			</button>

			{/* Login Switch */}
			<div className="text-sm font-medium text-gray-300 text-center">
				Already have an account?{' '}
				<button
					type="button"
					onClick={switchToLogin}
					className="text-blue-500 hover:underline"
				>
					Log In
				</button>
			</div>
		</form>
	);
};

export default Signup;
