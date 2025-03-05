import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ToDo } from "../types/ToDo";
import { addTodo, deleteTodo, fetchTodoData, updateTodo } from "./todoThunks";

interface TodoState {
  todos: ToDo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodoData.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong while getting data!";
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong while adding todo!";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => item._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong while deleting todo!";
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((item) => (item?._id == action.payload?._id ? action.payload : item));
        state.loading = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong while updating data";
      });
  },
});

// export const {  } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
