'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, HelpCircle, Zap, FileText, Menu, X } from 'lucide-react';

function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    useEffect(() => {
        console.log(pathname);
    }, [pathname]);

    const navigationItems = [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/dashboard/questions", label: "Questions", icon: FileText },
        { href: "/dashboard/upgrade", label: "Upgrade", icon: Zap },
        { href: "/dashboard/how", label: "How it Works?", icon: HelpCircle },
    ];

    const isActive = (href) => pathname === href;

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Image 
                                src={'/logo.svg'} 
                                width={160} 
                                height={100} 
                                alt="Interview Ready Logo"
                                className="h-8 w-auto"
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                        isActive(item.href)
                                            ? 'text-blue-600 bg-blue-50 border border-blue-200 shadow-sm'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 transition-colors duration-200 ${
                                        isActive(item.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                                    }`} />
                                    {item.label}
                                    {isActive(item.href) && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Button */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 rounded-full ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-200"
                                    }
                                }}
                            />
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3 ${
                                            isActive(item.href)
                                                ? 'text-blue-600 bg-blue-50 border border-blue-200'
                                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 ${
                                            isActive(item.href) ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <div className="pt-4 border-t border-gray-200">
                                <div className="px-3 py-2">
                                    <UserButton 
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8 rounded-full ring-2 ring-gray-200"
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;