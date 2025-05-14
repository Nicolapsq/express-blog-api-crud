const express = require("express");
const app = express();
const port = 3000;

// importo da routers/posts (registro dentro questo file (app.js))
const postRouter = require("./routers/posts.js");

// routers (include tutte le rotte)
app.use(postRouter);

app.use(express.static("public"));

// importazione dell' array
// const posts = require("./array.js")

// importazione dell' array da posts.js
const posts = require("./data/posts.js");

// rotta / (root)
// app.get("/", (req, res) => {
//     console.log(`richiesta sulla rotta sorgente "/"`);
//     res.send("Server del mio blog");
// });

// // rotta /bacheca
// app.get("/bacheca", (req, res) => {
//     res.json({posts});
// });

// mandiamo in ascolto il server: (npm run dev)
app.listen(port, () => {
    console.log("Server in ascolto su http://localhost:" + port);
});