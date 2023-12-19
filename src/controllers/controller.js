import Model from "../modules/modules.js";

// CRUD: Create, Read, Update, Delete
const Controller = {
 create: async (req, res) => {
    try {
        const newSomething = new Model(req.body);
        const created = await newSomething.save();
        if (created._id) {
            res.json({
                result: 'fine',
                message: 'something created!',
                data: created._id

            });
        }
    } catch (error) {
        res.json({
            result: 'bad',
            message: 'something went wrong',
            data: 'null'
        });
    }
 },

  read: async (request, response) => {
    try {
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

export default Controller;
