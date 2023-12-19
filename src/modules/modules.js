//Importar las funcionalidades de mongoose: Schema, model 
import { Schema, model } from "mongoose";

/*la funcionalidad Schema sirve para definir la estructura de los documentos en la base de datos. 
[new] es un como un molde para crear schemas, en este caso la estructura es un ejemplo, 
en este se definen los datos y sus propiedades/tipos. requiered espara que sea obligatorio*/
const schemaSomething = new Schema(
  {
    recipient: { type: String, required: true },
    name: { type: String, required: true },
    delivered: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true }
);
//versionKey: false,elimina la propiedad v:# que crea mongoose y timestamps: true añade la hora de create or update

//exportamos el modelo con su nombre y su schema
export default model("Something", schemaSomething);
