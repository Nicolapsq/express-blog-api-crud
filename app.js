// importazione di express
const express = require("express");
// importazione di tutte le rotte
const postRouter = require("./routers/posts.js");

// importazione dell' array da posts.js
const posts = require("./data/posts.js");

// importazione della funzione di errore da error.js
const notFound = require("./middlerwares/notFound.js");

const chechError = require("./middlerwares/errorHandler.js");

// configurazione
const app = express();
const port = 3000;


// http://127.0.0.1:3000/pippo/stocazzo

// routers - (include tutte le rotte) -middleware-

// routers - (include tutte le rotte statiche) -middleware-
app.use(express.static("public"));

// registro in express i body-parser (cosi posso leggere l'oggetto req.body) -middleware-
app.use(express.json());

// app.get('/', (req, res) => {
//     console.lg('ciao');
//     res.send('Hello');
// });

// tutte le rotte - importo da routers/posts (registro dentro questo file (app.js))
// da posizionare sempre dopo i middleware
app.use('/posts', postRouter); // app.get('/posts/*', (req, res) => {})


// middleware degli errori (da mettere sempre dopo app.use(postRouter)

// middleware della gestione delle pagine non esistenti (da posizionare sempre sotto le rotte)
app.use(notFound); // app.get('/*', (req, res) => {})

// middleware della gestione degli errori (da posizionare sempre sotto le rotte)
app.use(chechError);





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