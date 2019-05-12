const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedChartsSchema = new Schema({
  symbol: { type: String, required: true },
  title: { type: String },
  body:  { type: String },
  user_id: Number,
  date: { type: String }
});

const SavedCharts = mongoose.model("SavedCharts", savedChartsSchema);

module.exports = SavedCharts;
