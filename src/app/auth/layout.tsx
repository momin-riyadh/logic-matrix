import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return <div className='min-h-screen bg-gray-50'>{children}</div>;
};

export default layout;
