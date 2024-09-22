import React from "react";
export default function Header() {
    return (
        <div className="w-full p-5" style={{ height: '15vh' }}>
            <header className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/img/logo.png" alt="Logo" className="w-12 h-12" />
                    <div className="ml-4">
                        <p className="font-lato font-bold text-lg">Syeimee</p>
                        <p className="font-lato font-bold text-lg">Portfolio</p>
                    </div>
                </div>
                <ul className="flex items-center space-x-4">
                    <li className="font-lato font-bold text-lg">About</li>
                    <li>/</li>
                    <li className="font-lato font-bold text-lg">Works</li>
                    <li>/</li>
                    <li className="font-lato font-bold text-lg">Blog</li>
                    <li>
                        <img src="/img/Instagram.svg" alt="Instagram" className="w-6 h-6 ml-4" />
                    </li>
                    <li>
                        <img src="/img/Github.svg" alt="GitHub" className="w-6 h-6" />
                    </li>
                </ul>
                <div className="flex items-center">
                    <img src="/img/Contact.png" alt="Contact" className="w-10 h-10" />
                </div>
            </header>
        </div>
    );
}