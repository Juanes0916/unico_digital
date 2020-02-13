"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ParistoSchema = Schema(
  {
    name: String,
    description: String
  },
  {
    collection: "protozoos_intestinales"
  }
);

module.exports = mongoose.model("Parasito", ParistoSchema);
