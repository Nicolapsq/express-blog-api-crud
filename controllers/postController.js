// importazione dell'array posts
const posts = require("../data/posts.js");

// definisco la funzione index
function index(req, res) {
    // vado a leggere i parametri che vado ad inserire all'interno dell'URL
    const filterTag = req.query.tags;
    const filterTitle = req.query.title;
    console.log(filterTag);
    console.log(filterTitle);
    
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
    res.json("creazione di un nuovo oggetto nella lista ");
};

// definisco la funzione update
function update(req, res) {
    res.json("modifica di tutto l'oggetto della lista");
};

// definisco la funzione update
function modify(req, res) {
    res.json("modifica di un solo elemento di un oggetto della lista");
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