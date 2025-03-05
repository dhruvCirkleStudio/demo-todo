import { ToDo } from "../models/Task.model";
import { Request, Response } from "express";

// interface returnType {
//   error: string;
//   todo?: {
//     _id: string;
//     title: string;
//     description: string;
//     status: string;
//     createdAt?: string;
//     updatedAt?: string;
//     __v?: number;
//   };
// }

export const addTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description } = req.body;

    if (!title && !description) {
      return res.status(400).json({ error: "Title and Description are required" });
    }
    if (typeof title !== "string" || typeof description !== "string") {
      return res.status(400).json({ error: "Title and description must be strings" });
    }

    const response = await ToDo.insertOne({
      title: title.trim(),
      description: description.trim(),
      status: "pending",
    });

    return res.status(201).json({ status: "data added successfully!", newTodo: response });
  } catch (error) {
    console.log("Error adding data into Database!", error);
    return res.status(500).json({ error: "An error occurred while adding the todo!" });
  }
};

export const getAllTodos = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await ToDo.find({});
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error getting all todo data:", error);
    return res.status(500).json({ error: "An error occurred while fetching all todo!" });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "id missing!" });
    }
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Id is not in appropriate formate!" });
    }

    const deletedData = await ToDo.findByIdAndDelete(id);
    return res.status(200).json({ status: "Data Deleted", deletedData });
  } catch (error) {
    console.log("Error deleting todo", error);
    return res.status(500).json({ error: "An error occurred while deleting todo" });
  }
};

export const editTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const { title, description, status } = req.body;
    if (!id) {
      return res.status(400).json({ error: "id missing!" });
    }
    if (!title && !description && !status) {
      return res.status(400).json({ error: "fields are missing!" });
    }
    const response = await ToDo.findByIdAndUpdate(id, {
      title: title.trim(),
      description: description.trim(),
      status: status.trim(),
    });
    // console.log(response);
    return res.status(200).json({ status: "Data edited", todo: response });
  } catch (error) {
    console.log("Error updating todo", error);
    return res.status(500).json({ error: "An error occurred while updating todo" });
  }
};
