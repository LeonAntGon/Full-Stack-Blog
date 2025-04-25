import Link from "next/link"
import { IoSearchSharp } from "react-icons/io5"

export default function Header(){
    return <>
    <header className="header_sec">
        <div className="container header">
            <div className="logo">
                <Link href="/"><p>Logo</p></Link> 
            </div>
        
            <div className="searchbar">
                <IoSearchSharp/>
                <input type="search" placeholder="Descubre articulos de tu interes!"/>
            </div>

            <div className="nav_list_dark">
                <ul>
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/about">Acerca de</Link></li>
                    <li><Link href="/contact">Contacto</Link></li>
                </ul>
            </div>
        </div>
    </header>
    </>
}