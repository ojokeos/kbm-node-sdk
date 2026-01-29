import mongoose from "mongoose";
const dbclient = await mongoose
  .connect(
    "mongodb+srv://ojoxdan:ojoxdan@ojoxdan.0swgc0s.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "test" },
  )
  .then(async (e) => {
    console.log("DB CONNECTION SUCCESSFUL");
    const dbcollections = mongoose.connection.listCollections();
    console.log(await dbcollections);
  });

console.log("YEs I can SeE YoU");
