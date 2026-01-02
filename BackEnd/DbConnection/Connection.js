import mongoose from "mongoose";

export const DbConnection = async () => {
  try {
    const MONGO_URL =
      "mongodb+srv://Dbpratice:practice123@expressdb.sv7yipa.mongodb.net/StudyTracker";
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to Db`);
  } catch (error) {
    console.log(`Failed to connect into DB${error}`);
  }
};
