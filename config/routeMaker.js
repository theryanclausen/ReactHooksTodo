const express = require("express");

module.exports = (db, resource) => {
  const truthyConverter = obj => {
    return { ...obj, complete: !!obj.complete };
  };
  const sendError = (
    res,
    status = 500,
    errorMessage = "server error, try again"
  ) => {
    res.status(status).json({ error: errorMessage });
  };
  const route = express.Router();

  if (resource === "all") {
    route.get("/", async (req, res) => {
      try {
        let todos = await db("todos");
        let subitems = await db('subitems')
        subitems = subitems.map(subitem => truthyConverter(subitem))
        todos = todos.map(todo => truthyConverter(todo))
        todos = todos.map(todo =>{
          let subs = subitems.filter(subitem => subitem.todo_id === todo.id)
          subs = subs.map(sub => {return {name:sub.name, id:sub.id, complete:sub.complete}})
          return {...todo, subitems: subs}
        })
        
        
        res.status(200).json(todos)
      } catch (err) {
        sendError(res);
      }
    });

  } else {
    route.get("/", async (req, res) => {
      try {
        let items = await db(resource);
        items = items.map(item => truthyConverter(item));
        res.status(200).json(items);
      } catch (err) {
        sendError(res);
      }
    });

    route.get("/:id", async (req, res) => {
      const { id } = req.params;
      try {
        let item = await db(resource)
          .where({ id })
          .first();
        item = truthyConverter(item);
        if (resource === "todos") {
          let subitems = await db("subitems")
            .where({ todo_id: id })
            .select("id", "name", "complete");
          subitems = subitems.map(item => truthyConverter(item));
          item = { ...item, subitems };
        }
        res.status(200).json(item);
      } catch (err) {
        sendError(res);
      }
    });

    route.post("/", async (req, res) => {
      const { body } = req;
      if (!body.name || body.name.length >= 155) {
        sendError(res, 400, "Must have name less than 155 characters.");
        return;
      }
      if (body.complete && typeof body.complete !== "boolean") {
        sendError(res, 400, "Complete status must be boolean.");
      }
      if (resource === "todos") {
        if (body.description && body.description.length >= 555) {
          sendError(res, 400, "Description must be less than 555 characters.");
          return;
        }
      }
      if (resource === "subitems") {
        if (!body.todo_id) {
          sendError(res, 400, "Subitem must have todo_id");
          return;
        }
      }

      try {
        const id = await db(resource).insert(body);
        const newItem = await db(resource)
          .where({ id: id[0] })
          .first();
        res.status(201).json(truthyConverter(newItem));
      } catch (err) {
        sendError(res);
      }
    });

    route.put("/:id", async (req, res) => {
      const { id } = req.params;
      const { body } = req;
      if (body.name && body.name.length >= 155) {
        sendError(res, 400, "Name must have less than 155 characters.");
        return;
      }
      if (body.complete && typeof body.complete !== "boolean") {
        sendError(res, 400, "Complete status must be boolean.");
      }
      if (resource === "todos") {
        if (body.description && body.description.length >= 555) {
          sendError(res, 400, "Description must be less than 555 characters.");
          return;
        }
      }
      try {
        const count = await db(resource)
          .where({ id })
          .update(body);
        if (!count) {
          sendError(res, 400, "Item was not updated");
          return;
        }
        const updatedItem = await db(resource)
          .where({ id })
          .first();
        res.status(201).json(truthyConverter(updatedItem));
      } catch (err) {
        sendError(res);
      }
    });

    route.delete("/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const count = await db(resource)
          .where({ id })
          .del();
        if (count) {
          res.status(200).json({ message: "Item deleted" });
        }
      } catch (err) {
        sendError(res, 500, "Item could not be removed.");
      }
    });
  }
  return route;
};
