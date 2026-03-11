'use client';

import {navLinks} from './landing-data';
import Link from "next/link";
import Image from 'next/image';
import {Menu} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {

    return (
        <header className='shadow-sm'>
            {/*Top Header Part*/}
            <div className='flex w-full lg:max-w-[75%] justify-self-end rounded-none lg:rounded-bl-full bg-primary'>
                <div className='mx-auto lg:mr-[17%] w-full text-white'>
                    <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-2'>
                        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium'>
              <span className='inline-flex items-center gap-2'>
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7'
                     strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <rect x='3' y='5' width='18' height='14' rx='2'/>
                  <path d='m3 7 9 6 9-6'/>
                </svg>
                <span className='hidden sm:inline'>mail@logicmatrix.com</span>
              </span>
                            <span className='inline-flex items-center gap-2'>
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7'
                     strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <path
                      d='M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 3.2 8.8 19.8 19.8 0 0 1 0 0.2 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L6 8.9a16 16 0 0 0 7.1 7.1l2.5-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 1.9z'/>
                </svg>
                <span className='hidden sm:inline'>+880 123456 76</span>
              </span>
                            <span className='inline-flex items-center gap-2'>
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7'
                     strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
                  <circle cx='12' cy='7' r='4'/>
                </svg>
                <span className='hidden sm:inline'>Hire Us Today</span>
              </span>
                            <span className='inline-flex items-center gap-2'>
                <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7'
                     strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                  <path d='M12 3v12'/>
                  <path d='m7 10 5 5 5-5'/>
                  <path d='M5 21h14'/>
                </svg>
                <span className='hidden sm:inline'>Brochure</span>
              </span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <a className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-semibold'
                               href='#' aria-label='Facebook'>
                                f
                            </a>
                            <a className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-semibold'
                               href='#' aria-label='LinkedIn'>
                                in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/*Top Header Part*/}

            <div className='bg-white'>
                <div
                    className='mx-auto flex w-full max-w-none items-center justify-between gap-6 px-6 py-4 lg:max-w-[75%]'>
                    <Link className='flex items-center gap-3' href={"/"}>
                        <Image src={"/logo.svg"} width={180} height={50} alt={"logo"}/>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className='hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex'
                         aria-label='Primary'>
                        {navLinks.map((link) =>
                            link.children ? (
                                // Dropdown menu with hover-only activation
                                <div className='group relative' key={link.label}>
                                    {/* The parent link is clickable while the dropdown shows on hover */}
                                    <a
                                        href={link.href}
                                        className='inline-flex items-center gap-1 hover:text-slate-900'>
                                        {link.label}
                                        <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor'
                                             strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
                                             aria-hidden='true'>
                                            <path d='m6 9 6 6 6-6'/>
                                        </svg>
                                    </a>
                                    {/* Dropdown menu shown on hover with smooth transition */}
                                    <div
                                        className='invisible absolute left-0 top-full z-10 mt-1 w-56 translate-y-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-xl shadow-slate-200/40 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'>
                                        {link.children.map((child) => (
                                            <a className='block rounded-lg px-3 py-2 hover:bg-slate-100'
                                               href={child.href} key={child.label}>
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <a className='hover:text-slate-900' href={link.href} key={link.label}>
                                    {link.label}
                                </a>
                            ),
                        )}
                    </nav>

                    <div className='flex items-center gap-3'>
                        <Link
                            href="/contact-us"
                            className='inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90'
                        >
                            Contact Us
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <button
                                    className='inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-sm font-semibold text-slate-700 lg:hidden'
                                    type='button'
                                    aria-label='Toggle menu'
                                >
                                    <Menu className="h-6 w-6"/>
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="text-left">
                                        <Image src={"/logo.svg"} width={150} height={40} alt={"logo"}/>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className='mt-8 flex flex-col gap-4 text-sm font-semibold text-slate-700'
                                     aria-label='Mobile'>
                                    {navLinks.map((link) =>
                                        link.children ? (
                                            <details className='group rounded-lg px-3 py-2 hover:bg-slate-100'
                                                     key={link.label}>
                                                <summary
                                                    className='flex cursor-pointer list-none items-center justify-between'>
                                                    {link.label}
                                                    <svg
                                                        className='h-4 w-4 text-slate-500 transition group-open:rotate-180'
                                                        viewBox='0 0 24 24' fill='none' stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                                                        <path d='m6 9 6 6 6-6'/>
                                                    </svg>
                                                </summary>
                                                <div
                                                    className='mt-2 flex flex-col gap-2 pl-3 text-sm font-medium text-slate-600'>
                                                    {link.children.map((child) => (
                                                        <a className='rounded-md px-2 py-1 hover:bg-slate-100'
                                                           href={child.href}
                                                           key={child.label}>
                                                            {child.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </details>
                                        ) : (
                                            <a className='rounded-lg px-3 py-2 hover:bg-slate-100' href={link.href}
                                               key={link.label}>
                                                {link.label}
                                            </a>
                                        ),
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
