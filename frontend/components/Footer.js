import Link from 'next/link';
export default function Footer() {
  return (
    <>
    <div className="footer">
        <div className="container flex flex-sb flex-wrap flex-left">
            <div className="footer_logo">
                <h2>PERIFERIA DIGITAL</h2>
                <h4>&copy; 2025 todos los derechos reservados</h4>
            </div>
            <div className="q_links">
                <h3>Legales y demás</h3>
                <ul>
                    <li><Link href="/">Privacidad</Link></li>
                    <li><Link href="/">Politicas de Cookies</Link></li>
                    <li><Link href="/">Terminos de servicios</Link></li>
                </ul>
            </div>
            <div className="q_links">
                <h3>Social Media</h3>
                <ul>
                    <li><Link href="/">Github</Link></li>
                    <li><Link href="/">X</Link></li>
                    <li><Link href="/">Instagram</Link></li>
                </ul>
            </div>
        </div>
    </div>
    </>
  
  )

}