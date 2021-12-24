const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "./backend.env" });

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

app.get("/", (request, response) => {
    response.json({
        text: "Bem vindo"
    })
})

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

async function requestTweetsByHashtag(hashtag) {
    const token = process.env.TOKEN
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