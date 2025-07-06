import mongoose from "mongoose";
import app from "./app";
export const port = 3000;
async function main() {
    // Connecting with mongoose
  try {
    await mongoose.connect(
      "mongodb+srv://mongodb:mongodb@cluster0.em4cgxh.mongodb.net/Full_Stack_libray?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Successsfully connected with MongoDB`);
  } catch (error) {
    console.log(`Faild to connect with MongoDB: ${error}`);
  }
      // Connecting with Server
  try {
    app.listen(port, () => {
      console.log(`Server successsfully running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Faild to connect with server: ${error}`);
  }
}
main();