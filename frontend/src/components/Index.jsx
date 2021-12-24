import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import "../styles/main.scss";
import Tweet from "./Tweet";
import TweetList from "./TweetList";

function SearchBar({onSearch}) {
    const [hashtag, onChange] = useState(null);
    
    function handleOnClick() {
        onSearch(hashtag)
    }

    return (
        <form className="d-flex">
            <Form.Control
                type="search"
                className="search-input"
                placeholder="Digite a hashtag..."
                onChange={(event) => onChange(event.target.value)}
            />
            <Button className="button" onClick={() => handleOnClick()}>Buscar</Button>
        </form>
    )
}

function Index() {
    const [tweet, onSelect] = useState(null);
    const [hashtag, onSearch] = useState(null);
    const [tweetList, onApprove] = useState([]);

    let element;
    if (tweet === undefined || tweet === null) {
        const hashtagText = hashtag? `#${hashtag}` : "#G1"
        element = (
            <div className="no-tweet">
                <span>Envie seu comentário usando a hashtag </span>
                <span className="hashtag">{ hashtagText }</span>
            </div>
        )
    } else {
        element = (
            <div className="on-screen">
                <Tweet tweet={tweet}/>
            </div>
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            onSelect(tweetList.shift())
        }, 5000);

        return () => clearInterval(interval)

    }, [tweet, hashtag, tweetList])

    function handleOnApprove(tweet) {
        const newTweetList = tweetList.concat([tweet])
        onApprove(newTweetList)
    }

    return (
        <Container>
            <ScreenWrapper>
                <Screen className="screen">
                    {element}
                </Screen>
            </ScreenWrapper>
            <TweetSearchContainer>
                <SearchBar 
                    onSearch={(hashtag) => onSearch(hashtag)} 
                />
                <TweetListWrapper>
                    <TweetListContainer>
                        <TweetList 
                            hashtag={hashtag}
                            onApprove={(tweet) => handleOnApprove(tweet)}
                        />
                    </TweetListContainer>
                </TweetListWrapper>
            </TweetSearchContainer>
        </Container>
    )
}

const Container = styled.div`
    display: inline;
`

const TweetSearchContainer = styled.div`
    width: 50%;
    float: right;
    overflow-y: auto;
    margin: 20px 0px;
    padding: 0px 10px;
`

const ScreenWrapper = styled.div`
    width: 50%;
    margin: 20px 0px;
    position: fixed;
`

const Screen = styled.div`
    width: 95%;
    min-height: 480px;
    margin: 0px auto;
    padding: 20px 10px;
    background-color: black;
    background-repeat: no-repeat;
    background-image: url("rede-globo-logo-4.png");
    background-size: contain;
    background-position: center;
`

const TweetListWrapper = styled.div`
    margin-top: 10px;
`

const TweetListContainer = styled.div`
    border: 2px solid;
    border-radius: 0px;
    border-color: cornflowerblue;
`

export default Index;