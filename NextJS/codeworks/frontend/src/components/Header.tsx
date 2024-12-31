import React from "react";
import Link from 'next/link';
export default function Header() {
    return (
        <div className="w-full p-5" style={{ height: '15vh' }}>
            <header className="flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center">
                        <img src="/img/logo.png" alt="Logo" className="w-12 h-12" />
                        <div className="ml-4">
                            <p className="font-lato font-bold text-lg">Syeimee</p>
                            <p className="font-lato font-bold text-lg">Portfolio</p>
                        </div>
                    </div>
                </Link>
                <ul className="flex items-center space-x-4">
                    <li className="font-lato font-bold text-lg">
                        <Link href="/about"><a>About</a></Link>
                    </li>
                    <li>/</li>
                    <li className="font-lato font-bold text-lg">
                        <Link href="/work"><a>Work</a></Link>
                    </li>
                    <li>/</li>
                    <li className="font-lato font-bold text-lg">
                        <Link href="/blog"><a>Blog</a></Link>
                    </li>
                    <li>
                        <img src="/img/Instagram.svg" alt="Instagram" className="w-6 h-6 ml-4" />
                    </li>
                    <li>
                        <img src="/img/Github.svg" alt="GitHub" className="w-6 h-6" />
                    </li>
                </ul>
                <div className="flex items-center">
                    <Link href="/contact">
                        <img src="/img/Contact.png" alt="Contact" className="w-10 h-10" />
                    </Link>
                </div>
            </header>
        </div>
    );
}