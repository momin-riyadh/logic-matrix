import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import React from "react";

export default function MarketingLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className='min-h-screen bg-slate-50 text-slate-900'>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}
