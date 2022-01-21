const express = require('express');

const port = 3003;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    var currentdate = new Date(); 
    var datetime = "req: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    console.log(datetime);
    res.sendFile(__dirname + '/public/window.html');
})

app.listen(port, () => console.log(`Listening to port ${port}`));
