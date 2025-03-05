import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToDo, newTodoType } from "../types/ToDo";
import axios from "axios";

export const fetchTodoData = createAsyncThunk<ToDo[], void, { rejectValue: string }>("todo/fetchTodoData", async (_, thunkAPI) => {
  try {
    const data = await axios.get("http://localhost:5000/task");
    return data.data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch todos");
  }
});

export const addTodo = createAsyncThunk<ToDo, newTodoType, { rejectValue: string }>("todo/addTodo", async (newTodo, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/task", newTodo);
    return response?.data?.newTodo;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to add todo");
  }
});

export const updateTodo = createAsyncThunk<ToDo, ToDo, { rejectValue: string }>("todo/updateTodo", async (editTodo, thunkAPI) => {
  try {
    const response = await axios.patch(`http://localhost:5000/task/${editTodo._id}`, editTodo);
    return response.data.todo;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete todo");
  }
});

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>("todo/deleteTodo", async (id, thunkAPI) => {
  try {
    // console.log(id);
    await axios.delete(`http://localhost:5000/task/${id}`);
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete todo");
  }
});
