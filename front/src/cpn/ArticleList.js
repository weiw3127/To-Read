import React, { useEffect, useState } from "react";
import Masonry from 'react-masonry-css';
import { Link } from "react-router-dom";

const ArticleList = ({ articles, setArticles }) => {

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    const handleOnclick = async (thisArt) => {
        const newArticles = articles.filter(art => art !== thisArt);
        setArticles(newArticles);
        await fetch(`/api/delete/articles/${thisArt.Id}`, {
            method: 'POST', 
            header: {'Content-Type': 'application/json'}, 
        })
    }

    return (
        <>
            <div className="arts-section ">
                <div className="arts-container">
                    <h1 className="arts-title">The Sprinkles</h1>
                    <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                        {
                           
                            articles.map((art, i) => (
                                <div className="arts" key={i}>
                                    <button onClick={()=>handleOnclick(art)} className="close">x</button>
                                    <Link to={`/article/${art.Id}`}>
                                        <h2 className="art-title">{art.title}</h2>
                                    </Link>
                                    <p>{art.content[0].substring(0, 200) + ' ......'}</p>
                                </div>
                            
                            
                        ))}
                    </Masonry>
                </div>
            </div>
        </>
    )
}


export default ArticleList;
