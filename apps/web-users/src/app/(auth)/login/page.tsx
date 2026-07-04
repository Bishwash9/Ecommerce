"use client"

import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginData, registerSchema, type RegisterData } from '../../schemas/auth';
import { authService } from '../../services/authService';
import { useRouter } from 'next/navigation';
import adminImage from '../../assets/admin.png'; // Import the image
import Image from "next/image";

export default function LoginPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const isLoginmode = mode === "login";


    //initialze useform with zod resolver and default values
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginData | RegisterData>({
        resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        }
    });

    //handle form submission
    const onSubmit = async (data: LoginData | RegisterData) => {
        try {
            if (mode === "login") {

                await authService.login(data.email, data.password);

                router.push('/home');
            } else {
                const registerData = data as RegisterData;
                await authService.register(registerData.name, registerData.email, registerData.password);

                //once success
                setMode("login");
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    }

    const EyeOffIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );

    const EyeIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

    const switchMode = (newMode: 'login' | 'signup') => {
        setMode(newMode);
    }


    return (

        <main className='min-h-screen flex items-center justify-center bg-gray-100 p-6'>
            <div className='bg-white rounded-2xl shadow-lg w-full max-w-4xl flex overflow-hidden min-h-120'>
                <div className='w-full md:w-1/2 p-10 flex flex-col justify-center'>

                    <div className='mb-7'>
                        <h1 className='text-2xl font-extrabold text-gray-800 tracking-wide uppercase'>
                            {isLoginmode ? 'Login' : 'Sign Up'}
                        </h1>
                        <p className='text-sm text-gray-500 mt-1'>
                            {isLoginmode ? (
                                <>
                                    Don&apos;t have an account?{" "}|
                                    <button
                                        type='button'
                                        onClick={() => switchMode('signup')}
                                        className='text-indigo-400 font-medium hover:text-indigo-600 transition-colors duration-200'
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        type='button'
                                        onClick={() => switchMode('login')}
                                        className='text-indigo-400 font-medium hover:text-indigo-600 transition-colors duration-200'
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                        {!isLoginmode && (
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                                <input
                                    type='text'
                                    placeholder='Your Name'
                                    {...register('name')}
                                    required
                                    className='w-full px-4 py-3 rounded-full border border-indigo-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-600 placeholder-gray-300 transition-colors'
                                />
                            </div>
                        )}

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                            <input
                                type='email'
                                placeholder='Your Email'
                                {...register('email')}
                                required
                                className='w-full px-4 py-3 rounded-full border border-indigo-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-600 placeholder-gray-300 transition-colors'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Your Password'
                                    {...register('password')}
                                    required
                                    className="w-full px-4 py-3 rounded-full border border-indigo-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-600 placeholder-gray-300 transition-colors pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                </button>
                            </div>
                            {errors.password && <span className="text-red-500 text-xs mt-1 block pl-2">{errors.password.message}</span>}
                        </div>

                        {isLoginmode && (
                            <div className='flex justify-end -mt-1'>
                                <button
                                type='button'
                                className='text-sm text-indigo-400 hover:text-indigo-600 transition-colors ' 
                                >
                                    Forget password?
                                </button>
                            </div>
                        )}

                        <button
                        type='submit'
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-full bg-indigo-400 hover:bg-indigo-500 disabled:bg-indigo-300 text-white font-semibold text-sm tracking-wide transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (isLoginmode ? 'Loggin in...' : 'Signing up...'): (isLoginmode ? 'Login' : 'Sign Up')}
                        </button>

                    </form>

                </div>
                <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50 p-8">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-72 h-72 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-linear-to-br from-indigo-100 via-purple-50 to-green-100 flex items-center justify-center">
             <Image src={adminImage} alt="Admin" className="w-full h-full object-contain" />
             
            </div>
          
          </div>
        </div>
            </div>

        </main>

    )



}
