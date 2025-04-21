"use client"
import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";

export default function AuthPage(){
	const [authModal, setAuthModal] = useAtom(authModalState);
	// const [user, loading, error] = useAuthState(auth);
	// const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();

	// useEffect(() => {
	// 	if (user) router.push("/");
	// 	if (!loading && !user) setPageLoading(false);
	// }, [user, router, loading]);

	// if (pageLoading) return null;

	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
					<Image src='/hero.png' alt='Hero img' width={700} height={700} />
				</div>
                
				{authModal.isOpen && <AuthModal />}
			</div>
		</div>
	);
};