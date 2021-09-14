const express = require("express");
const cors = require("cors");

const app = express();
const ctrl = require("./controller.js")


app.use(express.json());
app.use(cors());

app.get('/api/houses', ctrl.getHouses)
app.post('/api/houses', ctrl.createHouses)
app.put('/api/houses/:id', ctrl.updateHouses)
app.delete('/api/houses/:id', ctrl.deleteHouses)

const port = 4004;

app.listen(port, console.log(`You're up and running on ${port}`))

