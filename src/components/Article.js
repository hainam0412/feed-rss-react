import React from "react";
import { Markup } from "interweave";

const Article = ({ articles, loading, time }) => {
    const { start, end } = time;

    if (articles.feed && !loading) {
        if (start != null && end != null) {
            const filterArticles = articles.feed.entries.filter((article) => {
                return (
                    new Date(article.pubDate).getTime() > new Date(start).getTime() &&
                    new Date(article.pubDate).getTime() < new Date(end).getTime()
                );
            });

            return filterArticles.length > 0 ? (
                <div className="row">
                    {filterArticles.map((article, index) => (
                        <div key={index} className="item mb-5">
                            <h4>{article.title}</h4>
                            <p>{article.pubDate}</p>
                            <div>
                                <Markup content={article.content} />
                            </div>
                            <a href={article.link} target="_blank" rel="noreferrer">
                                More
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No articles in the times</div>
            );
        } else {
            return (
                <div className="row">
                    {articles.feed.entries.map((article, index) => (
                        <div key={index} className="item mb-5">
                            <h4>{article.title}</h4>
                            <p>{article.pubDate}</p>
                            <div>
                                <Markup content={article.content} />
                            </div>
                            <a href={article.link} target="_blank" rel="noreferrer">
                                More
                            </a>
                        </div>
                    ))}
                </div>
            );
        }
    } else {
        return <div>Loading...</div>;
    }
};

export default Article;
