//Importando el modelo de la carpeta de modelos en otro folder
import Model from "../modules/modulesRecipes.js";

//Crear el objeto controllador para crear los métodos CRUD: Create, Read, Update, Delete
const Controller = {
  //creamos un método para cada una de las rutas establecidas en el enrutador
  //dentro del metodo utilizamos una estructura de trycatch para manejar los errores
  create: async (req, res) => {
    //dentro del try intenta crear un nuevo "algo" mediante la funcionalidad new, pasandole los datos del modelo definido anteriormente
    try {
      // Obtén los datos del cuerpo de la solicitud
      const requestData = req.body;

      // Separa los strings en las propiedades 'ingredients' y 'steps' por cada "\n"
      requestData.ingredients = requestData.ingredients
        ? requestData.ingredients.split("\n")
        : [];
      requestData.steps = requestData.steps
        ? requestData.steps.split("\n")
        : [];

      // Crea un nuevo objeto del modelo con los datos modificados
      const newRecipes = new Model(requestData);
      //una vez creado el nuevo objeto es guardado en la base de datos con el metodo .save

      const created = await newRecipes.save();
      //si todo salió bien, el objeto creado debe tener un id, si lo tiene entonces responde así
      if (created._id) {
        res.json({
          result: "good",
          message: "Recipe was created!",
          data: created,
        });
      }
    } catch (error) {
      //Si algo sale mal entonces responde así
      res.json({
        result: "bad",
        message: "Something went wrong at creating a new recipe",
        data: error,
      });
    }
  },
  //otra vez creamos un método con una función, esta vez para leer un solo objeto y otro para leerlos todos
  read: async (request, response) => {
    try {
      //declarando la constante para el objeto, utilizamos un método find para que busque en la base de datos
      const recipe = await Model.findById(request.params.id);
      response.json({
        result: "good",
        message: "Reading single Recipe!",
        data: {
          id: recipe._id,
          name: recipe.name,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          description: recipe.description,
          source: recipe.source,
          serves: recipe.serves,
          time: recipe.time,
          tags: recipe.tags,
          notes: recipe.notes,
        },
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong at reading single recipe by id",
        data: error,
      });
    }
  },
  readAllByUserId: async (request, response) => {
    try {
      //declarando la constante para el objeto, utilizamos un método find para que busque en la base de datos
      const id = request.params.id;
      const recipe = await Model.find({ id: id });
      if (recipe.length === 0) {
        response.json({
          result: "bad",
          message: "Can't find any of your Recipes!",
          data: null,
        });
      } else {
        response.json({
          result: "good",
          message: "Reading All your Recipes!",
          data: recipe.map((recipe) => ({
            id: recipe._id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            description: recipe.description,
            source: recipe.source,
            serves: recipe.serves,
            time: recipe.time,
            tags: recipe.tags,
            notes: recipe.notes,
            fav: recipe.fav,
          })),
        });
      }
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong at reading all recipes by user id",
        data: error,
      });
    }
  },
  readAll: async (request, response) => {
    try {
      const allRecipes = await Model.find();
      const recipe = [];
      for (let i = 0; i < allRecipes.length; i++) {
        const object = {
          id: allRecipes[i]._id,
          name: allRecipes[i].name,
        };
        recipe.push(object);
      }
      response.json({
        result: "good",
        message: "Hello from READALL!",
        data: allRecipes,
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong at reading all recipes",
        data: error,
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
        message: "Recipe was updated!",
        data: updated,
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong at updating a recipe",
        data: error,
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
        message: "Recipe was deleted!",
        data: deleted,
      });
    } catch (error) {
      response.json({
        result: "bad",
        message: "something went wrong at deleting your recipe",
        data: error,
      });
    }
  },
};

//exportar el controlador de las rutas
export default Controller;
