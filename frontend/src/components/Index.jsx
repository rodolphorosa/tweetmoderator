import { useState } from "react";
import Tweet from "./Tweet";
import TweetList from "./TweetList";

function Index() {
    const [tweet, onSelect] = useState("Algum tweet");

    return (
        <div>
            <Tweet tweet={tweet}/>
            <TweetList onSelect={(tweet) => onSelect(tweet)} />
        </div>
    )
}

export default Index;