'use client';

import { PAGE_META } from '@/constants/common/meta';
import Link from 'next/link';
import { useState } from 'react';

const Menus = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    return (
        <div className="z-50  bottom-2 right-2">
            {/* ハンバーガー画像ボタン */}
            <button onClick={toggleMenu} className="p-4 z-50 fixed right-0 bottom-2" aria-label="メニューを開く/閉じる">
                {isOpen ? <img src="/img/close.png" alt="menu" className="w-10 h-10 " /> : <img src="/img/menu.png" alt="menu" className="w-10 h-10 " /> }
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-white/80 z-40"
                    onClick={closeMenu}
                >
                    {/* メニュー本体 */}
                    <div
                        className="absolute bottom-20 right-0  flex flex-col space-y-2 p-4 w-30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul>
                            <li onClick={closeMenu} className="font-lato font-bold text-lg hover:underline">
                                <Link href="/about">{PAGE_META.about.title}</Link>
                            </li>
                            <li onClick={closeMenu} className="font-lato font-bold text-lg hover:underline">
                                <Link href="/work">{PAGE_META.work.title}</Link>
                            </li>
                            <li onClick={closeMenu} className="font-lato font-bold text-lg hover:underline">
                                <Link href="/blog">{PAGE_META.qiita.title}</Link>
                                {/* <Link href="https://qiita.com/syeimee">{PAGE_META.qiita.title}</Link> */}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Menus;