import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/router";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'

export default function Blog(
    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        blogcategory: existingBlogcategory,
        description: existingDescription,
        tags: existingTags,
        status: existingStatus,
    }
){

    const [redirect, setRedirect] = useState(false)
    const router = useRouter()

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || '');

    async function createProduct(ev){
        ev.preventDefault();

        const data = {title, slug, description, blogcategory, tags, status };

        if(_id){
            await axios.put('/api/blogapi', {...data, _id})
        } else {
            await axios.post('/api/blogapi', data)
        }

        setRedirect(true)
    }

    if(redirect){
        router.push('/')
        return null;
    }

    // this function for every space in the spelling will be replaced by -
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-');

        setSlug(newSlug);
    }

    return(
        <>

        <form onSubmit={createProduct} className="addWebsiteform">
            {/* blog title*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Titulo</label>
                <input type="text" 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingresa un titulo"/>
            </div>

            {/* blog slug */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Slug</label>
                <input type="text"
                 id="slug"
                 value={slug}
                 onChange={handleSlugChange}
                 placeholder="Ingresa la url del Slug" required/>
            </div>

            {/* blog category */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Category</label>
                <select name="category"
                    id="category"
                    value={blogcategory}
                    onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions, 
                    option => option.value))}
                    multiple>
                    <option value="htmlcssjs">Html, css & Js</option>
                    <option value="nextjs">Nextjs</option>
                    <option value="database">Database</option>
                    <option value="deployment">Deployment</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">
                    Seleccionado: {Array.isArray(existingBlogcategory) && existingBlogcategory.map(category => 
                        (<span>{category}</span>)
                    )}
                </p>
            </div>

            {/* markdown description contect */}
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description">Contenido del Blog</label>
                <MarkdownEditor 
                
                        value={description}
                        onChange={(ev) => setDescription(ev.text)}
                        style={{ width: '100%', height: '400px' }} //adjust the height as your device needs
                        
                        renderHTML={text => {
                            return (
                                <ReactMarkdown
                                    components={{
                                        code: ({ node, inline, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            if (inline) {
                                                return <code>{children}</code>
                                            } else if (match) {
                                                return (
                                                    <div style={{ position: 'relative' }}>
                                                        <pre style={{
                                                            padding: '1rem',
                                                            borderRadius: '5px',
                                                            backgroundColor: '#f6f8fa',
                                                            overflowX: 'auto',
                                                            whiteSpace: 'pre-wrap'
                                                        }} {...props}>
                                                            <code>{children}</code>
                                                        </pre>
                                                        <button
                                                            style={{
                                                                position: 'absolute',
                                                                top: '0.5rem',
                                                                right: '0.5rem',
                                                                padding: '0.25rem 0.5rem',
                                                                fontSize: '0.875rem',
                                                                borderRadius: '0.25rem',
                                                                border: '1px solidrgb(17, 17, 17)'
                                                            }}
                                                            onClick={() => navigator.clipboard.writeText(children)}
                                                        >

                                                            <p className="text-black">Copiar</p>
                                                        </button>
                                                    </div>
                                                );
                                            }
                                            return <code {...props}>{children}</code>
                                        }
                                    }}
                                >
                                    {text}
                                </ReactMarkdown>
                            );
                        }}
                
                />
            </div>

            {/* tags */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="tags">Etiquetas</label>
                <select name="tags" 
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(Array.from(e.target.selectedOptions, 
                    option => option.value))}
                    multiple>
                    <option value="html">Html</option>
                    <option value="css">css</option>
                    <option value="javascript">Javascript</option>
                    <option value="nextjs">Nextjs</option>
                    <option value="database">Database</option>
                </select>
                 
                <p className="existingcategory flex gap-1 mt-1 mb-1">
                    Seleccionado: {Array.isArray(existingTags) && existingTags.map(category => 
                        (<span>{category}</span>)
                    )}
                </p>
            </div>

            {/* Status */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="status">Estado</label>
                <select name="status" 
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option value="">No seleccionado</option>    
                    <option value="draft">Borrador</option>
                    <option value="publish">Publicado</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">
                    Estado:<span>{existingStatus}</span>
                </p>
            </div> 
            
            {/* save button */}
            <div className="w-100 mb-2">
                <button type="submit" className="w-100 addwebbtn flex-center">GUARDAR BLOG</button>
            </div>

            
        </form>
        </>
    )
}