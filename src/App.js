import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Article from "./components/Article";
import Form from "./components/Form";
import parser from "rss-parser";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const URL = "https://vnexpress.net/rss/suc-khoe.rss";

const App = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            await parser.parseURL(CORS_PROXY + URL, (err, feed) => {
                if (err) throw err;
                setArticles(feed);
                setLoading(false);
            });
        };
        fetchArticles();
    }, []);

    const handleTime = (time) => {
        setTime(time);
    };

    return (
        <div className="App">
            <h1 className="text-center mb-5">Feed Articles from RSS</h1>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Form loading={loading} handleTime={handleTime} />
                    </div>
                    <div className="col-8">
                        <div className="container">
                            <Article articles={articles} loading={loading} time={time} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
