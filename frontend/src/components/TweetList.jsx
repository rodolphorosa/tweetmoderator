import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

import Tweet from "./Tweet";

function TweetList({hashtag, onApprove}) {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        if (hashtag !== null) {
            fetch(`/tweets?hashtag=${hashtag}`)
            .then((response) => response.json())
            .then((data) => setTweets(data.tweets))
        }
    }, [hashtag])

    function onClick(tweet) {
        onApprove(tweet);
    }

    const domTweets = tweets.map(tweet => {
        return (
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                <Tweet tweet={tweet}/>
                <Button onClick={() => onClick(tweet)}>
                    Aprovar
                </Button>
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup as="ol">
            {domTweets}
        </ListGroup>
    )
}

export default TweetList;