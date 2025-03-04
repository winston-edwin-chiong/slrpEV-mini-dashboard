import Link from "next/link";

export default function Header() {
    return (
        <header className="flex">
            <Link href="/">HOME</Link>
            <Link href="/data">DATA</Link>
            <Link href="/about">ABOUT</Link>
        </header>
    );
}
