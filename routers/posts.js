const express = require("express");
const router = express.Router();

// importazione dell'array posts
const posts = require("../data/posts");

// importazione delle funzioni all'interno del file postController.js
const postController = require("../controllers/postController.js")

// definisco tutte le rotte crud

// rotta per index (lista completa)
router.get("/", postController.index);

// rotta per show (solo un oggetto della lista)
router.get("/:id", postController.show);

// rotta per store (creazione di un nuovo oggetto nella lista)
router.post("/", postController.store);

// rotta per update (modifica completa)
router.put("/:id", postController.update);

// rotta per modify (modifica parziale)
router.patch("/:id", postController.modify);

// rotta per destroy
router.delete("/:id", postController.destroy);

module.exports = router;