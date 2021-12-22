const path = require("path");
const axios = require("axios");
const express = require("express");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const PORT = process.env.PORT || 8001;
const app = express();

async function requestTweetsByHashtag(hashtag) {
    const token = "AAAAAAAAAAAAAAAAAAAAAEw2XQEAAAAANvEBABbvfZAPu2sQUVkSub0fpxU%3DIKjYoBbVsWpEIV7th6jJ5FsJM5MrAuon7A7vmnElhkMYuAHrcy"
    const url = `https://api.twitter.com/2/tweets/search/recent?query=%23${hashtag}&expansions=author_id`
    const headers = {
        Authorization: `Bearer ${token}`
    }

    let tweets = []
    let response = await axios({
        url: url,
        method: "get",
        headers: headers
    })

    const data = response.data.data
    const users = response.data.includes.users
    try {
        tweets = data.map(info => {
            const text = info.text
            const authorId = info.author_id
            const user = users.find(user => user.id === authorId)
            
            return {
                username: user.username,
                text: text
            }
        })
    } catch (error) {
        console.error("Ocorreu um erro ao formatar os tweets")
    }

    return tweets
}

app.use(express.static(path.resolve(__dirname, '../frontend/build')))

app.get("/tweets", (request, response) => {
    const hashtag = request.query.hashtag
    
    requestTweetsByHashtag(hashtag)
    .then((tweets) => {
        response.json({
            tweets: tweets
        })
    })
    .catch((error) => {
        console.log(error);
        response.json({
            tweets: [
                {username: "server", text: "#server Digite alguma hashtag e clique em Buscar :)"}
            ]
        })
    })
})

app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})