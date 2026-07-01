"use client"

import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginData, registerSchema, type RegisterData } from 'schemas/auth.schema';
import { useAuth } from 'context/AuthContext';
import { authService } from 'services/auth.js';
 
export default function LoginPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);
   

    //initialze useform with zod resolver and default values
    const { register, handleSubmit, formState: { errors, isSubmitting}, } = useForm<LoginData | RegisterData>({
        resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
        defaultValues:{
            email: '',
            password: '',
            name: '',
        }
    });

    //handle form submission
    const onSubmit = async (data: LoginData | RegisterData) => {
        if(mode === 'login'){
            setMode('signup');

            try{
                const loginResponse = await authService.login(data.email,data.password);
            }
        }
    }
}
