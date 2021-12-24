import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import axios from "axios";

import "../styles/main.scss";
import Tweet from "./Tweet";

const DEFAULT_LIST = [
    {
        username: "server",
        text: "Seja bem-vind@ ao moderador de tweets 😉"
    },
    {
        username: "server",
        text: "Para começar a usar, basta digitar uma hashtag na barra de pesquisas acima e clicar em Buscar 🚀🚀",
    },
    {
        username: "server",
        text: "Serão retornados os 10 tweets mais recentes, dos quais você poderá escolher quais serão exibidos no telão",
    },
    {
        username: "server",
        text: "Clique em Aprovar 👇. A cada 5 segundos, um tweet será exibido.",
    }
]

function TweetListItem({tweet, onClick}) {
    const [approved, onApprove] = useState(false);

    useEffect(() => {
        onApprove(false)
    }, [tweet])

    function handleOnClick() {
        onApprove(true);
        onClick(tweet);
    }

    return (
        <div className="tweet-list-item">
            <Tweet tweet={tweet}/>
            <Button 
                className="button"
                disabled={approved}
                onClick={() => handleOnClick()}
            >
                { approved? "Aprovado" : "Aprovar" }
            </Button>
        </div>
    )
}

function TweetList({hashtag, onApprove}) {
    const [tweets, setTweets] = useState(DEFAULT_LIST);

    useEffect(() => {
        if (hashtag !== null) {
            //FIXME: verificar por que utilizar proxy não está funcionando com docker e remover o dns da url
            const url = `http://localhost:3001/tweets?hashtag=${hashtag}`; 
            const headers = {
                "Access-Control-Allow-Origin": "*"
            }
            const options = {
                url: url,
                method: "GET",
                headers: headers
            }
            axios(options)
            .then((response) => {
                setTweets(response.data.tweets)
            })
            .catch((error) => console.error(error))
        }
    }, [hashtag])

    function onClick(tweet) {
        onApprove(tweet);
    }

    let content;
    
    if (tweets.length > 0) {
        content = tweets.map(tweet => {
            return (
                <ListGroup.Item className="d-flex tweet-list-item">
                    <TweetListItem 
                        tweet={tweet}
                        onClick={onClick}
                    />
                </ListGroup.Item>
            )
        })
    } else {
        content = (
            <ListGroup.Item className="d-flex tweet-list-item">
                <TweetListItem 
                    tweet={
                        {
                            username: "server",
                            text: "Seja bem-vind@ ao moderador de tweets!"
                        }
                    }
                />
            </ListGroup.Item>
        )
    }

    return (
        <ListGroup className="no-border-radius">
            {content}
        </ListGroup>
    )
}

export default TweetList;