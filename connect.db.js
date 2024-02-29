import mongoose from "mongoose";

const userName = "sumitra";
const password = encodeURIComponent("sumitra123");
const databaseName = "esports-netflix";

const dbURL = `mongodb+srv://${userName}:${password}@cluster0.a7qcnpk.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB connection established...");
  } catch (error) {
    console.log(error.message);
    console.log("DB connection failed...");
  }
};
export default connectDB;
