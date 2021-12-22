import React from "react";

function Tweet({tweet}) {
    const style = {
        backgroundColor: "white",
    }

    const nameStyle = {
        fontWeight: "bold",
    }

    return (
        <div style={style}>
            <div style={nameStyle}>{`@${tweet.username}`}</div>
            {tweet.text}
        </div>
    )
}

export default Tweet;