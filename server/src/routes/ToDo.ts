import express from "express";
import { addTodo, getAllTodos, deleteTodo, editTodo } from "../controllers/ToDo";

const todoRouter = express.Router();

todoRouter.route("/").get(getAllTodos).post(addTodo);
todoRouter.route("/:id").patch(editTodo);
todoRouter.route("/:id").delete(deleteTodo);

export default todoRouter;
