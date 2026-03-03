import HeroSection from "@/components/landing/HeroSection";
import Image from "next/image";
import Link from "next/link";

export default function ContactUsPage() {
    return (
        <div className="bg-white">
            <HeroSection
                title="Let's Explore Our Portfolio"
                description="Explore our recent Web, eCommerce and Mobile app projects"
                badge=""
            />

            {/* Talk To An Expert Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-slate-800">
                        Talk To An <span className="text-primary">Uploader Expert</span>
                    </h2>
                    <p className="mt-6 text-slate-600 max-w-3xl mx-auto">
                        We're ready to answer any questions you might have about existing coverage, a new policy, or any other help you need. You can call us at +088 01756 759642 Or, fill out our information form below and one of our agents will be in touch as soon as possible.
                    </p>

                    {/* Contact Form */}
                    <div
                        className="mt-16 max-w-5xl mx-auto p-8 md:p-12 border border-primary rounded-[2rem] text-left bg-[#CCEFFC]/30">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Name</label>
                                <input
                                    type="text"
                                    placeholder="MD Abir Al"
                                    className="w-full px-4 py-4 bg-slate-50 border border-[#0F4945] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Email</label>
                                <input
                                    type="email"
                                    placeholder="xanin023@gmil.COM"
                                    className="w-full px-4 py-4 bg-slate-50 border border-[#0F4945] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Phone number</label>
                                <input
                                    type="tel"
                                    placeholder="+880 1756 759642"
                                    className="w-full px-4 py-4 bg-slate-50 border border-[#0F4945] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="block text-sm font-bold text-slate-700">Project</label>
                                <select className="w-full px-4 py-4 bg-slate-50 border border-[#0F4945] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                                    <option>What type of project are you interested in ?</option>
                                    <option>Web Development</option>
                                    <option>Mobile App</option>
                                    <option>Cloud Services</option>
                                </select>
                                <div className="absolute right-4 bottom-5 pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-sm font-bold text-slate-700">How can we help you?</label>
                                <textarea
                                    rows={4}
                                    placeholder="What are you building?"
                                    className="w-full px-4 py-4 bg-slate-50 border border-[#0F4945] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 text-center">
                                <button
                                    type="submit"
                                    className="bg-primary text-primary-foreground px-10 py-3 rounded-lg font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition"
                                >
                                    Send Massage
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Info and Map Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-0 rounded-[2rem] overflow-hidden shadow-2xl">
                    {/* Info Side */}
                    <div className="relative w-full md:w-1/2 min-h-[400px]">
                        <Image
                            src="/logicmatrix/contact-bg-left.png"
                            alt="Building"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-white/20"></div>
                        <div className="relative z-10 p-8 md:p-12 h-full flex items-center">
                            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl space-y-6 w-full max-w-sm mx-auto shadow-xl">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-700 font-medium">
                                        Nurjahan Road T-23,<br />
                                        Mohammadpur, Dhaka-1207
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-700 font-medium">+880 17567 59642</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-700 font-medium">info@logicmatrix.com</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-700 font-medium">www.logicmatrix.us</p>
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <Link href="#" className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-lg hover:bg-primary/90 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    </Link>
                                    <Link href="#" className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-lg hover:bg-primary/90 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </Link>
                                    <Link href="#" className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-lg hover:bg-primary/90 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="w-full md:w-1/2 min-h-100 bg-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.605417855018!2d90.3546747171458!3d23.750946274028087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4e8c339589%3A0x6b8f36802e86d080!2sMohammadpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1714654000000!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Buttons */}
            <div className="py-16 flex flex-wrap items-center justify-center gap-8">
                <Link
                    href="#"
                    className="bg-primary text-primary-foreground px-10 py-3 rounded-lg font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition"
                >
                    Hire Us
                </Link>
                <Link
                    href="#"
                    className="text-slate-800 font-bold text-xl border-b-2 border-slate-800 pb-1"
                >
                    Book a Meeting
                </Link>
            </div>
        </div>
    );
}
