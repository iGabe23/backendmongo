import express from "express"; //importar el modulo de express
import router from "./routes/routes.js"; //importamos las rutas
import cors from "cors";
import morgan from "morgan";

const server = express(); //crear la constante server para crear el servidor
const port = process.env.PORT; //crear la constante port para leer la variable de entorno PORT

server.set("port", port); //establecer la propiedad 'port' para el puerto

server.use(cors());
server.use(morgan("dev"));
server.use(express.json()); //activar la capacidad de trabajo con archivos json, pasando el nombre del metodo express
server.use("/recipes", router); //definimos el uso del enrutador en el tipo de rutas que queremos

//con el metodo get para escuchar solucitudes que vengan del metodo GET, le pasamos 2 argumentos; la ruta raiz: '/', y la funcion flecha con la solicitud de 2 parametros: solicitud y respuesta.
server.get("/", (request, response) => {
  response.json({ message: "Hello from root recipes!" });
});

export default server; //exportar el servidor
