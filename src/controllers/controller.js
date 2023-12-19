//Importando el modelo de la carpeta de modelos en otro folder
import Model from "../modules/modules.js";

//Crear el objeto controllador para crear los métodos CRUD: Create, Read, Update, Delete
const Controller = {
  //creamos un método para cada una de las rutas establecidas en el enrutador
 //dentro del metodo utilizamos una estructura de trycatch para manejar los errores
  create: async (req, res) => {
    //dentro del try intenta crear un nuevo "algo" mediante la funcionalidad new, pasandole los datos del modelo definido anteriormente
    try {
        const newSomething = new Model(req.body);
        //una vez creado el nuevo objeto es guardado en la base de datos con el metodo .save
        const created = await newSomething.save();
        //si todo salió bien, el objeto creado debe tener un id, si lo tiene entonces responde así
        if (created._id) {
            res.json({
                result: 'fine',
                message: 'something created!',
                data: created._id

            });
        }
    } catch (error) { //Si algo sale mal entonces responde así
        res.json({
            result: 'bad',
            message: 'something went wrong',
            data: 'null'
        });
    }
 },
//otra vez creamos un método con una función, esta vez para leer un solo objeto y otro para leerlos todos
  read: async (request, response) => {
    try {
      //declarando la constante para el objeto, utilizamos un método find para que busque en la base de datos
      const something = await Model.findById(request.params.id);
      response.json({
        result: "good",
        message: "Hello from READ!",
        data: something,
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong",
        data: null,
      });
    }
  },
  readAll: async (request, response) => {
    try {
      const all = await Model.find();
      response.json({
        result: "good",
        message: "Hello from READALL!",
        data: all,
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong",
        data: null,
      });
    }
  },
/*metodo para actulizar: declaramos la constante de usamos el metodo findByIdAndUpdate, le pasamos 2 argumentos, 
primero el id y luego el cuerpo de la peticion nuevo para actualizar el viejo, se lo envía al metodo, 
actualiza el objeto en la base de datos y luego lo retorna a la constante, con eso le respondemos al cliente diciendo que todo salió bien*/
  update: async (request, response) => {
    try {
      const updated = await Model.findByIdAndUpdate(
        request.params.id,
        request.body
      );
      response.json({
        result: "good",
        message: "something was updated!",
        data: updated,
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong",
        data: null,
      });
    }
  },
/*metodo para borrar, le asignamos la función asíncrona como siempre. del Modelos utilizmaos el método FindByIdAndDelete, 
ese metedo necesita un id obtenido de los parametros de la solicitud, el metodo reporna la información a la variable, 
si todo sale bien simplemente respondemos con un json que todo salio bien */
  delete: async (request, response) => {
    try {
      const deleted = await Model.findByIdAndDelete(request.params.id);
      response.json({
        result: "good",
        message: "something was deleted!",
        data: deleted,
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong",
        data: null,
      });
    }
  },
};

//exportar el controlador de las rutas 
export default Controller;
