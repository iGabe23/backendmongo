
import mongoose from "mongoose";//importar la promesa de mongoose 

//como es una promesa, se utilizan los metodos then, catch con clg para verificar el estado de la database
mongoose
  .connect(process.env.MONGO_ATLAS)
  .then((data) => console.info("Connected to DataBase"))
  .catch((error) => console.error("Not connected to DataBase"));

