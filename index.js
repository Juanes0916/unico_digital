const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Parasito = require("./models/parasito");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/parasito", (req, res) => {
  Parasito.find({}, (err, parasito) => {
    if (err) return res.status(500).send("ERROR");
    if (!parasito) return res.status(404).send("No hay Parasitos");

    res.send({ parasito });
  });
});

app.get("/parasito/:name", (req, res) => {
  let parasitoId = req.params.parasitoId;

  Parasito.findById(parasitoId, (err, parasito) => {
    if (err) return res.status(500).send("Error al realizar la peticion");
    if (!parasito) return res.status(404).send("El parasito no existe");

    res.status(200).send({ parasito });
  });
});

app.post("/parasito", (req, res) => {
  console.log("POST /parasito");
  console.log(req.body);

  let parasito = new Parasito(req.body);
  parasito.name = req.body.name;
  parasito.description = req.body.description;
  parasito.save((err, parasitoStored) => {
    if (err) res.status(500).send("Error al guardar en la base de datos");

    res.status(200).send({ parasito: parasitoStored });
  });
});

app.put("/parasito/id", (req, res) => {});

app.delete("/parasito/id", (req, res) => {});

mongoose.connect(
  "mongodb://localhost:27017/atlas_de_parasitologia",
  (err, res) => {
    if (err) {
      return console.log(`Error al conectar a la base de datos ${err}`);
    }
    console.log("CONEXION ESTABLECIDA");

    app.listen(port, () => {
      console.log(`API REST corriendo en http://localhost:${port}`);
    });
  }
);
