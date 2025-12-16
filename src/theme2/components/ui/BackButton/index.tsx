import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

import './index.scss'

export const BackButton: React.FC<{ variant?: 'default' | 'white' }> = ({ variant = 'default' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleBack = () => {
        // If we're on the home page or at the root, do nothing or go to home
        if (location.pathname === '/') {
            return;
        }
        
        // Check if we're on a sport page (e.g., /sports/Soccer)
        // If so, go back to home
        if (location.pathname.match(/^\/sports\/[^/]+$/)) {
            navigate('/');
            return;
        }
        
        // Otherwise, use browser history to go back
        navigate(-1);
    };
    
    return (
        <button type='button' className={`btn-back ${variant} pr-8`} onClick={handleBack}>
            <ChevronLeftIcon className='w-4 h-4' />
            <div className='flex items-center leading-4'>
                Return
            </div>

        </button>
    )
}