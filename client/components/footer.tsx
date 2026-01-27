
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container px-4 py-12 mx-auto md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold tracking-tighter">
                                BD Web Services
                            </span>
                        </Link>
                        <p className="mb-4 text-muted-foreground max-w-xs">
                            Professional website development services tailored for your business growth. We build fast, secure, and modern websites.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                            Services
                        </h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    E-commerce
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    UI/UX Design
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    SEO Optimization
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                            Legal
                        </h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} BD Web Services. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Optional: Add payment icons or extra links here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
