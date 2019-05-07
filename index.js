const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = require('./routes');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(router);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
