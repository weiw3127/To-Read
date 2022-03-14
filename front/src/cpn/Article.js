import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "./ArticleList";
import GoTop from "./GoTop";


const Article = () => {
    const params = useParams();
    const Id = params.Id
    const [articleInfo, setArticleInfo] = useState({"Id":"", "title":"", "url":"", "content":[]});

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

    useEffect(()=>{
        const fetchData = async () => {
            const result = await fetch(`/api/article/${Id}`);
            const data = await result.json();
            console.log(data);
            setArticleInfo(data);
        }
        fetchData();
    }, [Id])

    return(
        <>
            <div className='art-page'>
                <div className='container'>
                    <div className="art-head">
                        <h1>{articleInfo.title}</h1>
                        <a className='art-source' href={articleInfo.url} target="_blank" rel="noopener noreferrer">Source</a>
                    </div>
                    <div>{articleInfo.content.map((para, i) => (
                        <p className='art-content' key={i}>{para}</p>
                    ))}</div>
                </div>
            </div>
            <ArticleList articles={articles} setArticles={setArticles}/>
            <GoTop/>
        </>
        
    )
}

export default Article;
