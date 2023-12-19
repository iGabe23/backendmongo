import "dotenv/config"; //importar modulo de acceso a las varibles de entorno
import "./database.js"; //importar modulo de la base de datos
import server from "./server.js"; //importar modulo del servidor

//crear constante para obtener y almacenar puerto del servidor
const port = server.get("port");

//ejecutar un método de escucha para el puerto, y otro método de función flecha con un clg para monitorear el estado del puerto
server.listen(port, () => {
  console.log(`Server working on port: ${port}`);
});
