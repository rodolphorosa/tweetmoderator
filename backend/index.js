const path = require("path")
const express = require("express")

const PORT = process.env.PORT || 8001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get("/tweets", (request, response) => {
    response.json({
        tweets: [
            // lista de tweets
        ]
    })
})

app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});