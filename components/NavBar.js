import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import ConnectWallet from "./ConnectWallet.js";

const NAV_LINKS = [
    { name: "Create Offer", href: "/create" },
    { name: "View Offers", href: "/view" },
]

export const Navbar = () => {
    const router = useRouter();
    return (
        <header>
            <nav>
                <Link href="/">
                    <a className="flex-row">
                        <Image src="/favicon.ico" alt="Vapor Logo" height={20} width={20} />
                        <h1 style={{ marginLeft: "5px" }}>Vapor</h1>
                    </a>
                </Link>
                <ul>
                    {NAV_LINKS.map((link) => (
                        <Link key={link.name} href={link.href}>
                            <a className={router.pathname === link.href ? "card-small-active" : "card-small"} >
                                {link.name}
                            </a>
                        </Link>
                    ))}

                </ul>
                <ConnectWallet getAddress />
            </nav>
        </header >
    );
};

export default Navbar;