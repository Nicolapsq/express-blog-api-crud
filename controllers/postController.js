// importazione dell'array posts
const posts = require("../data/posts.js");

// definisco la funzione index
function index(req, res) {
    // vado a leggere i parametri che vado ad inserire all'interno dell'URL
    const filterTag = req.query.tags;
    const filterTitle = req.query.title;
    
    // vado a filtrare in base alle chiavi e i parametri che andrò ad inserire

    // creo una nuova variabile con l'array che andro a filtrare
    let filterPosts = posts;
    
    if (filterTag) {
        // vado a filtrare in base alla chiave tags
        filterPosts = filterPosts.filter(post => post.tags.includes(filterTag));
    }
    
    if (filterTitle) {
        // vado a filtrare in base alla chiave title
        filterPosts = filterPosts.filter(post => post.title.includes(filterTitle));
    }
    // console.log(filterTag);
    // console.log(filterTitle);
       res.json({
        message: "lettura della lista dei post",
        // posts,
        // visualizza in json il nuovo array filtrato
        postFiltrati: filterPosts
    });
};

// definisco la funzione show
function show(req, res) {
    const postId = parseInt(req.params.id);
    // cerco il post corrispondente all'id (parametro dinamico)
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res
        .status(404)
        .json(
           {
               errore: "post non trovato"
           }
        );
    };
    res.json({
        message: "lettura del post " + postId,
        post
    });
};

// definisco la funzione store
function store(req, res) {
    // destrutturo l'oggetto creato in postman
    const {title, content, image, tags} = req.body;
    // creazione id per nuovo post:
    // creo un id di appoggio = 0
    let id = 0;
    // paragono gli id partendo dall'id 0,
    for (const post of posts) {
        // se l'id paragonato è maggiore di 0 sostituisce 0
        if (post.id > id) {
            id = post.id;
        }
    }
    // aggiungo l'id al nuovo post
    const newPost = {id: id + 1, title, content, image, tags};
    // inserisco il nuovo post dentro la lista di post
    posts.push(newPost);

    res.status(201)
    res.json({
        message: "creazione di un nuovo oggetto della lista",
        newPost
    });
    console.log({
        meggaggio: "creazione del nuovo post",
        newPost});
};

// definisco la funzione update
function update(req, res) {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res
        .status(404)
        .json(
            {
                errore: "post non trovato"
            }
        );
    };
    // sostituisco l'intero post:
    // prendo larray da postman
    const {title, content, image, tags} = req.body;
    const updatePost = {id: postId, title, content, image, tags};
    // prendo l'indice dell'id trovato
    const index = posts.indexOf(post);
    // rimuovo il post con l'indice in questione e sostituisco con il nuovo post
    posts.splice(index, 1, updatePost);
    // res.status(200);
    res.json({
        message: "modifica di tutto l'oggetto della lista",
        updatePost
    });
}
// definisco la funzione modify
function modify(req, res) {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res
        .status(404)
        .json(
            {
                errore: "post non trovato"
            }
        );
    };
    // sostituisco solo una parte del post
    // prendo larray da postman
    const {title, content, image, tags} = req.body;
    // sostituisco solo il valore nella chiave "title"
    post.title = req.body.title

    res.json({
        message:"modifica di un solo elemento di un oggetto della lista",
        post
    });
     console.log({
        message:"modifica di un solo elemento di un oggetto della lista",
        post
    });
};

function destroy(req, res) {
    const postId = parseInt(req.params.id);
    // cerco il post corrispondente all'id (parametro dinamico)
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res
        .status(404)
        .json(
           {
               errore: "post non trovato"
           }
        );
    };
    // prendo l'indice dell'id trovato
    const index = posts.indexOf(post);
    // rimuovo il post con l'indice in questione
    posts.splice(index, 1);
    console.log("Lista aggiornata", posts);
    res
    .status(204)
    .json(
        {
            message: "eliminazione del post" + postId
        }
    );
};

//esporto le funzioni
module.exports = { index, show, store, update, modify, destroy };