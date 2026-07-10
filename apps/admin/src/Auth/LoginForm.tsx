import { authService } from '../Services/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginData } from '../Schemas/auth.schema';
import adminImage from '../assets/admin.png'; // Import the image


export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();


    //initializing use form with zod resolver and default values
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    //handle form submission
    const onSubmit = async (data: LoginData) => {

        try {
            const response = await authService.login(data.email, data.password);

            const userData = response.data.user;
            const accessToken = response.data.accessToken;

            //security check for role  
            if (userData.role !== 'admin') {
                return;
            }

            //save creds in authcontext
            login(userData, accessToken);
            navigate('/dashboard');

        } catch (error) {
            console.error('Login error:', error);
        }
    };

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
 

     return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex overflow-hidden min-h-120">
 
        {/* Left — Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-9">
            <h1 className="text-2xl font-light text-center text-[#2B5748] tracking-wide uppercase">
              Welcome Admin
            </h1>
          </div>
         

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="yourname@email.com"
                {...register('email')}
                className="w-full px-4 py-3 rounded-full border border-indigo-200 focus:border-indigo-400 focus:outline-none text-sm text-gray-600 placeholder-gray-300 transition-colors"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block pl-2">{errors.email.message}</span>}
            </div>
 
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register('password')}
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
 
            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <button type="button" className="text-sm text-indigo-400 hover:text-indigo-600 transition-colors">
                Forget password?
              </button>
            </div>
 
            {/* Sign In button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-indigo-400 hover:bg-indigo-500 disabled:bg-indigo-300 text-white font-semibold text-sm tracking-wide transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
 
        {/* Right — Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50 p-8">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-72 h-72 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-linear-to-br from-indigo-100 via-purple-50 to-green-100 flex items-center justify-center">
             <img src={adminImage} alt="" className="w-full h-full object-contain" />
             
            </div>
          
          </div>
        </div>
 
      </div>
    </div>
  );

}