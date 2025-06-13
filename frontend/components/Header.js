import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { HiBars2 } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

export default function Header(){

    //searchbar open and close function
    const [searchOpen, setSearchOpen] = useState(false)

    // for open searchbar
    const openSearch = () => {
        setSearchOpen(!searchOpen)
    }
    // for close searchbar
    const closeSearch = () => {
        setSearchOpen(false)
    }

    // asidebar for mobile devide
    const [aside, setAside] = useState(false)

    const asideOpen = () => {
        setAside(true);
    }

    const asideClose = () => {
        setAside(false);
    }
    // for close asidebar menu when click on link also
    const handleLinkClick = () => {
        setAside(false); 
    }

    // Dark mode on off
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // check local storage for darkmode preference on initial load
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode); 
    }, []);

    useEffect(() => {
        // aply dark mode styles when darkmode state changes
       if (darkMode) {
          document.body.classList.add("dark");
          localStorage.setItem("darkMode", "true");
       } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
       }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // toggle dark mode state
    };

    // search data fetch
    const { alldata, loading } = useFetchData('/api/getblog');

    // filtering publish blogs
    const publishedBlogs = alldata.filter( ab => ab.status === "publish")

    const [searchQuery, setSearchQuery] = useState('');
    // filtering based on search query, search data from title
    const filteredBlogs = searchQuery.trim() === '' ? publishedBlogs : publishedBlogs.filter
    (blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    
    return <>
    <header className="header_sec">
        <div className="container header">
            <div className="logo">
                <Link href="/"><p>Logo</p></Link> 
            </div>
        
            <div className="searchbar">
                <IoSearchSharp/>
                <input onClick={openSearch} type="search" 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Qué te interesa saber?"/>
            </div>

            <div className="nav_list_dark">
                <ul>
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/about">Acerca de</Link></li>
                    <li><Link href="/contact">Contacto</Link></li>
                </ul>
                {/* for mobile device */}
                <div className="navlist_mobile_ul">
                    
                    <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp/> : <LuSun/>}</button>
                    <button onClick={openSearch}><IoSearch/></button>
                    <button onClick={asideOpen}><HiBars2/></button>
                </div>
                <div className="darkmode">
                    <label className="switch">
                        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
                        <span className="slider_header"></span>
                    </label>
                </div>


            </div>
        </div>
        <div className={`search_click ${searchOpen ? 'open' : ''}`}>
            <div className="searchab_input">
                <IoSearchSharp/>
                <input type="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Que te interesa saber?"/>
            </div>
            <div className="search_data text-center">
                <div className="blog">
                    {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">
                        <div className="loader"></div>
                    </div> : <>
                        {searchQuery ? <>
                        {filteredBlogs.slice(0, 3).map((blog) => {
                            return <Link className="blog" key={blog._id} onClick={closeSearch} href={`/blog/${blog.slug}`}>
                                <div className="bloginfo">
                                    <div><h3>{blog.slug}</h3></div>
                                    <p>lorem ipsun asdasd ajbdkajsdb adj baskdb  oasdbnasdjb asdashdoj asdjobasdjoasbd asodjbaosjdb  aosd basodjb</p>
                                </div>
                                
                            </Link>
                        })}
                    </> : <div>No hay resultados de busqueda</div>}
                    </>}
                </div>
            </div>
            <div className="exit_search" onClick={closeSearch}>
                <div><FaXmark/></div>
                <h4>ESC</h4>
            </div>

            {/* mobile navlist */}
        </div>
        <div className={aside ? `navlist_mobile open` : `navlist_mobile`}>
            <div className="navlist_m_title flex flex-sb">
                <h1>TITULOdelBLOG</h1>
                <button onClick={asideClose}><FaXmark/></button>
            </div>
            <hr />
            <h3 className="mt-3">Menu principal</h3>
            <ul onClick={handleLinkClick}>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/about">Acerca de</Link></li>
                <li><Link href="/contact">Contacto</Link></li>
            </ul>
            <hr />
            <h3 className="mt-3">Categorias</h3>            
            <ul onClick={handleLinkClick}>
                <li><Link href="/topics/htmlcssjs">Html Css Js</Link></li>
                <li><Link href="/topics/nextjs">Next Js</Link></li>
                <li><Link href="/topics/database">Database</Link></li>
                <li><Link href="/topics/deployment">Deployment</Link></li>            
            </ul>
        </div>
    </header>
    </>
}