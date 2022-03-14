import React, { useState, useEffect} from 'react';
import ArticleList from './ArticleList';
import GoTop from './GoTop';

const HomePage = () => {

    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const result = await fetch('/api/articles');
            const data = await result.json();
            console.log(data);
            setArticles(data);
        }
        fetchData();
    }, [])


    function newArticle(Id, title, url, content){
        this.Id = Id;
        this.title = title;
        this.url = url;
        this.content = content;
    }

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');

    const handleChange = (func, e) => {
        func(e.target.value);
    }

    const postData = async (newArticle) => {
        const result = await fetch('/api/articles', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newArticle),
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const contentBank = content.split(/\r?\n/);
        const Id = new Date().valueOf();
        const thisArticle = new newArticle(Id, title, url, contentBank);
        setTitle('');
        setUrl('');
        setContent('');
        postData(thisArticle);
        const newArticles = articles.concat({...thisArticle})
        setArticles(newArticles);
    }


    return (
        <>
            <header>
                <div className='flex head-section'>
                    <div className='flex main-head container'>
                        <div className='flex-item form-head'>
                            <h1 className='title'>Something New</h1>
                        </div>
                        <form onSubmit={handleSubmit} className='form-main flex-item flex flex-col' action="">
                            <div className='flex flex-col form-el'>
                                <label htmlFor="">Title: </label>
                                <input value={title} type="text" onChange={(e)=>handleChange(setTitle, e)} name='title'/>
                            </div>
                            <div className='flex flex-col form-el'>
                                <label htmlFor="">URL: </label>
                                <input value={url} type="text" onChange={(e)=>handleChange(setUrl, e)} />
                            </div>
                            <div className='flex flex-col form-el'>
                                <label htmlFor="">Content: </label>
                                <textarea value={content} type="text" onChange={(e)=>handleChange(setContent, e)} />
                            </div>
                            <button type="submit">Go!</button>
                        </form>
                    </div>
                </div>
            </header>
            <ArticleList articles={articles} setArticles={setArticles}/>
            <GoTop/>
        </>
)}

export default HomePage;
