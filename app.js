const express = require("express");
const app = express();
const port = 3000;

const postRouter = require("./routers/posts.js");

// importazione dell' array da posts.js
const posts = require("./data/posts.js");

// routers (include tutte le rotte) -middleware-

// routers (include tutte le rotte statiche) -middleware-
app.use(express.static("public"));

// registro in express i body-parser (cosi posso leggere l'oggetto req.body) -middleware-
app.use(express.json());

// importo da routers/posts (registro dentro questo file (app.js))
// da posizionare sempre dopo i middleware
app.use(postRouter);

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