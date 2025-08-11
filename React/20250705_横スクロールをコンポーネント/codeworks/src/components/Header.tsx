import React from "react";
import Link from 'next/link';
import { PAGE_META } from "@/constants/common/meta";
export default function Header() {
    return (
        <div className="p-2 mb-2" style={{ height: '8vh' }}>
            <header className="flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center">
                        <img src="/img/logo.png" alt="Logo" className="w-12 h-12" />
                        <div className="ml-4">
                            <h3 className="font-lato font-bold text-l">{PAGE_META.header.title1}</h3>
                            <h3 className="font-lato font-bold text-l">{PAGE_META.header.title2}</h3>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center">
                    <ul className="flex items-center space-x-4">
                        <li>
                            <img src="/img/Instagram.svg" alt="Instagram" className="w-6 h-6 ml-4" />
                        </li>
                        <Link href="http://github.com/syeimee">
                            <li>
                                <img src="/img/Github.svg" alt="GitHub" className="w-6 h-6" />
                            </li>
                        </Link>
                    </ul>

                    <Link className="pl-4" href="/contact">
                        <img src="/img/Contact.png" alt="Contact" className="w-10 h-10" />
                    </Link>
                </div>
            </header>
        </div>
    );
}