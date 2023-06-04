import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const DailyAverage = mongoose.model("statsSchema", statsSchema);

export default DailyAverage;
