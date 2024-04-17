//Importar las funcionalidades de mongoose: Schema, model
import { Schema, model } from "mongoose";

/*la funcionalidad Schema sirve para definir la estructura de los documentos en la base de datos. 
[new] es un como un molde para crear schemas, en este caso la estructura es un ejemplo, 
en este se definen los datos y sus propiedades/tipos. requiered espara que sea obligatorio*/
const schemaRecipes = new Schema(
  {
    id: { type: String, require: true },
    name: { type: String, required: true },
    ingredients: { type: [String], required: false },
    steps: { type: [String], required: false },
    description: { type: String, required: false },
    source: { type: String, required: false },
    serves: { type: Number, required: false },
    time: { type: Number, required: false },
    tags: { type: String, required: false },
    notes: { type: String, required: false },
    fav: { type: Boolean, require: false },
  },
  { versionKey: false, timestamps: true }
);
//versionKey: false,elimina la propiedad v:# que crea mongoose y timestamps: true añade la hora de create or update

//exportamos el modelo con su nombre y su schema
export default model("Recipes", schemaRecipes);
