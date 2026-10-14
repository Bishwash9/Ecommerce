'use client'

import { useState, useEffect, useRef, useId} from "react";
import { ImagePlus, RefreshCw, Settings } from 'lucide-react';

interface ProfileSettingsProps {
    onChangePicture?: () => void;
    onUploadPicture?: () => void;
}

export default function ProfileSettings({ onChangePicture, onUploadPicture }: ProfileSettingsProps) {

    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownId = useId();

    //close when click outside of dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectOption = (action?: () => void) => {
        setIsOpen(false);
        buttonRef.current?.focus();
        action?.();
    }

    return (
        <div ref={wrapperRef} className='absolute left-4 top-4 z-20 sm:left-5 sm:top-5' 
        onKeyDown={(e) =>{
            if(e.key === 'Escape') {
                setIsOpen(false);
                buttonRef.current?.focus();
            }
        }}>

            <button
             ref={buttonRef}
             onClick={() => setIsOpen(!isOpen)}
             type='button'
             aria-expanded={isOpen}
             aria-controls={dropdownId}
             className='flex items-center justify-center rounded-full text-stone-500 transform-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500'>

                <Settings size={18} aria-hidden="true" />
            </button>
            
              {isOpen && (
                <div
                    id={dropdownId}
                    role="group"
                    aria-label="Profile picture options"
                    className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg"
                >
                    <button
                        type="button"
                        onClick={() => selectOption(onChangePicture)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-stone-500"
                    >
                        <RefreshCw size={16} aria-hidden="true" />
                        Change picture
                    </button>

                    <button
                        type="button"
                        onClick={() => selectOption(onUploadPicture)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-stone-500"
                    >
                        <ImagePlus size={16} aria-hidden="true" />
                        Upload picture
                    </button>
                </div>
            )}

        </div>
    )
}