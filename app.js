// Creation serveur via npm i express
// Creation route
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Creation route
app.get('/', (req, res) => {
    res.status(200).send('Agence Immobiliere');
});

// With Router and Controller
const agenceRouter = require('./routes/agence');
const agentRouter = require('./routes/agent');
const acheteurRouter = require('./routes/acheteur');
const bienRouter = require('./routes/bien');
const annonceRouter = require('./routes/annonce');

app.use('/agences', agenceRouter);
app.use('/agents', agentRouter);
app.use('/acheteurs', acheteurRouter);
app.use('/biens', bienRouter);
app.use('/annonces', annonceRouter);

// Running server
app.listen(port, () => {
    console.log('C\'est good, le serveur tourne');
})

module.exports = app;