import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useFetchData from "@/hooks/useFetchData";
import { FaGit, FaHtml5 } from 'react-icons/fa6';
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import blogImgFront from "@/public/computer-and-coffee.png"

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1); // page number
  const [perPage] = useState(3); // tres blogs por página

  const { alldata, loading } = useFetchData('/api/getblog');

  // function to handle page change
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  }

  // Primero filtrar blogs publicados
  const publishedBlogs = alldata.filter(ab => ab.status === "publish");
  
  // Luego calcular la paginación
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = publishedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  
  // Usar length de publicados para el total de páginas
  const totalPages = Math.ceil(publishedBlogs.length / perPage);
  
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  function extractFirstImageUrl(markdownContent){
    // check if markdownconetnt is provided and non-empty
    if(!markdownContent || markdownContent !== 'string'){
      return null;
    }

    // regular expression to match image urls in markdown format ![alt text](imageurl)
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
    
  }
  return (
    <>
      <Head>
        {/* Metadatos específicos para la página de inicio */}
        <title>Periferia</title>
        <meta name="description" content="Bienvenido a mi blog personal donde comparto mis experiencias y conocimientos" />
        <meta property="og:title" content="Inicio - Mi Blog Personal" />
        <meta property="og:description" content="Bienvenido a mi blog personal donde comparto mis experiencias y conocimientos" />
      </Head>

      <section className='header_data_section'>
        <div className='container flex flex-sb w-100'>
          <div className='leftheader_info'>
            <h1>Blog Full-Stack moderno <span>optimizado para SEO </span></h1>
            <h3>Desarrollado con React, Next.js y MongoDB</h3>
            <div className='flex gap-2'>
              <Link href='/contact'><button>Comienza Hoy!</button></Link>
              <Link href='/contact'><button>Sobre nosotros</button></Link>
            </div>
          </div>
          
            <div className='rightheader_img'>
              <div className='image_bg_top'></div>
              <div className='image_bg_top2'></div>
              <img src={`${blogImgFront.src}`} alt="blogging"/>
          </div>
        </div>
      </section>

      <section className='main_blog_section'>
        <div className='container flex flex-sb flex-left flex-wrap'>
          <div className='leftblog_sec'>
            <h2>Publicado recientemente</h2>
            <div className='blogs_sec'>
            {loading ? <div className='wh-100 flex flex-center mt-2 pb-5'>
              <div className='loader'></div>
            </div> : <>
            {currentBlogs.map((blog) => {
              //in the markdown content first image show here
              const firstImageUrl = extractFirstImageUrl(blog.description);
              return <div className='blog' key={blog._id}>
                <div className='blogimg'>
                  {/*If not image in markdown show no image */}
                  <Link href={`/blog/${blog.slug}`}>
                    <img src={firstImageUrl || "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_1280.png"} alt={blog.title} />
                  </Link>
                </div>
                <div className="bloginfo">
                  <Link href={`/tag/${blog.tags[0]}`}>
                    <div className="blogtag">{blog.tags[0]}</div>
                  </Link>
                  <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                  <p>lorem ipsum dolor sit asdf onecasdfado asdoiasbd asdljabsd quiwee sel ia  del sek alsdkan asdjk a dkbj</p>
                    <div className='blogauthor flex gap-1'>
                      <div className='blogaimg'>
                        {/*<img src={`${blogImgFront}`} alt="blogging"/>*/}
                      </div>

                      <div className='flex flex-col flex-left gap-05'>
                        <h4>Leonardo González</h4>
                        <span>{new Date(blog.createdAt).toLocaleDateString('es-AR', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                      </div>
                    </div>
                </div>
              </div>
            })}
            </>
              
            }
          </div>

          <div className="blogpagination">
          
                        <div className="blogpagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(
                              number => (
                                <button key={number} onClick={() => paginate(number)} className={currentPage === number? 
                                  'active' : ''}>{number}</button>
                              ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastBlog >= publishedBlogs.length}>Next</button>
                        </div>
          
          </div>
          </div>

          <div className='rightblog_info'>
            <div className='topics_sec'>
              <h2>Topics</h2>
              <div className='topics_list'>
                <Link href='/topics/htmlcssjs'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <FaHtml5/>
                    </div>
                    <h3>Html, Css & Javascript</h3>
                  </div>
                </Link>
                <Link href='/topics/nextjs'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <TbBrandNextjs />
                    </div>
                    <h3>Next JS, React JS</h3>
                  </div>
                </Link>
                <Link href='/topics/database'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <FiDatabase/>
                    </div>
                    <h3>Database</h3>
                  </div>
                </Link>
                <Link href='/topics/deployment'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>

            <div className='tags_sec mt-3'>
              <h2>Tags</h2>
              <div className='tags_list'>
                <Link href='/tag/html'>#html</Link>
                <Link href='/tag/css'>#css</Link>
                <Link href='/tag/javascript'>#javaScript</Link>
                <Link href='/tag/nextjs'>#nextjs</Link>
                <Link href='/tag/reactjs'>#reactjs</Link>
                <Link href='/tag/database'>#database</Link>
              </div>
            </div>

            <div className='letstalk_sec mt-3'>
              <h2>Let's Talk</h2>
              <div className='talk_sec'>
                <h4>Want to find out how i can solve problems specific to your business? let's talk</h4>
                <div className='social_talks flex flex-center gap-1 mt-2'>
                  <div className='st_icon'>
                    <FaGithub/>
                  </div>
                  <div className='st_icon'>
                    <FaXTwitter/>
                  </div>
                  <div className='st_icon'>
                    <FaInstagram/>
                  </div>
                </div>
              </div>
            </div>

          </div>
         
        </div>
      </section>
    
    </>
  );
}
