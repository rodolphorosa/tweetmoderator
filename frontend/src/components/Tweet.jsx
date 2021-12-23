import React from "react";
import "../styles/main.scss";

function Tweet({tweet}) {
    return (
        <div className="tweet">
            <div className="tweet-username">{`@${tweet.username}`}</div>
            <div className="tweet-text">
                {tweet.text}
            </div>
        </div>
    )
}

export default Tweet;