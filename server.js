const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// app.get('/favicon.ico', function(req, res) {
//     res.status(204);
// });

// app.get('/', function (req, res) {
//     res.send('Hello World!')
// });

// app.post('/', function (req, res) {
//     res.send('Hello New World!')
// });
app.get('/', verificationController);
app.post('/', messageWebhookController);
app.listen(3000, () => console.log("Chatbot server is listening, port 3000"));