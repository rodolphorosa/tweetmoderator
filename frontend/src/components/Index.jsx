import React, { useEffect } from "react";
import { useState } from "react";
import { 
    Button,
    Form,
    Col,
    Row
} from "react-bootstrap";
import styled from "styled-components";

import Tweet from "./Tweet";
import TweetList from "./TweetList";

function Header({onSearch}) {
    const [hashtag, onChange] = useState(null);

    return (
        <form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Hashtag"
                className="me-2"
                aria-label="Buscar"
                onChange={(event) => onChange(event.target.value)}
            />
            <Button onClick={() => onSearch(hashtag)}>Buscar</Button>
        </form>
    )
}

function Index() {
    const [tweet, onSelect] = useState(null);
    const [hashtag, onSearch] = useState(null);
    const [tweetList, onApprove] = useState([]);

    let element;
    if (tweet === undefined || tweet === null) {
        element = (
            <div>
                {`Envie seu comentário usando a hashtag #${hashtag}`}
            </div>
        )
    } else {
        element = (<Tweet tweet={tweet}/>)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(tweetList);
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
            <Row>
                <Header onSearch={(hashtag) => onSearch(hashtag)} />
            </Row>
            <Row>
                <Col>
                    <Screen>
                        {element}
                    </Screen>
                </Col>
                <Col>
                    <TweetListContainer>
                        <TweetList 
                            hashtag={hashtag}
                            onApprove={(tweet) => handleOnApprove(tweet)}
                        />
                    </TweetListContainer>
                </Col>
            </Row>
        </Container>
    )
}

const Container = styled.div`
    font-family: Consolas;
    background-color: #E7E9EB;
    padding: 30px 10px;
`

const Screen = styled.div`
    height: 480px;
    background-color: black;
    padding: 20px 15px;
`

const TweetListContainer = styled.div`
    height: 480px;
    overflow-y: scroll;
`

export default Index;