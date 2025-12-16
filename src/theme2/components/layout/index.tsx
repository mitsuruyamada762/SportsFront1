import React from 'react';
import "./index.scss";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='layout-container'>
            <div className='background'></div>
            {children}
        </div>
    )
}