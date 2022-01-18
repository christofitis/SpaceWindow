const express = require('express');

const port = 3003;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/window.html');
})

app.listen(port, () => console.log(`Listening to port ${port}`));
