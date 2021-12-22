import React from "react";
import { useEffect, useState } from "react";

function TweetList({onSelect}) {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        fetch("/tweets")
        .then((response) => response.json())
        .then((data) => setTweets(data.tweets))
    })

    const domTweets = tweets.map(tweet => {
        return (
            <li key={tweet}>
                <span>{tweet}</span>
                <button onClick={() => onSelect(tweet)} />
            </li>
        )
    })

    return (
        <div>
            <ul>
                {domTweets}
            </ul>
        </div>
    )
}

export default TweetList;