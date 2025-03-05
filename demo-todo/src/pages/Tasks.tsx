import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTodo } from "../redux/todoSlice";
import { deleteTodo, fetchTodoData, updateTodo } from "../redux/todoThunks";
import { ToDo } from "../types/ToDo";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { AppDispatch } from "../redux/store";
import { useSocket } from "../context/SocketContext";

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(selectTodo);
  const [editTodo, setEditTodo] = useState<ToDo>({ title: "", description: "", status: "", _id: "" });
  const [modal, setModal] = useState(false);
  const params = useParams();
  const { socket } = useSocket();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditTodo({
      ...editTodo,
      [name]: value,
    });
  };

  const cancelEditTodo = () => {
    setEditTodo({ title: "", description: "", status: "", _id: "" });
    setModal(!modal);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTodo.title !== "" && editTodo.description !== "") {
      dispatch(updateTodo(editTodo));
      setEditTodo({ title: "", description: "", status: "", _id: "" });
      socket?.emit("taskEdited","task Edited successfully!")
      getTodoData();
      setModal(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    dispatch(deleteTodo(id));
    setEditTodo({ title: "", description: "", status: "", _id: "" });
    socket?.emit("taskDeleted","task deleted successfully!")
    getTodoData();
  };

  const getTodoData = useCallback(async () => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  useEffect(() => {
    getTodoData();
  }, [getTodoData]);

  useEffect(()=>{
    socket?.on("taskEdited",()=>{
      getTodoData()
    })
    socket?.on("taskDeleted",()=>{
      getTodoData()
    })
  },[socket])

  if (loading) return <Loader />;
  if (error) return <ErrorAlert />;
  return (
    <div className="mt-10">
      <div className="w-[700px] mx-auto">
        <div className="mt-10 w-full space-y-5">
          {todos?.map((item) => {
            const shouldRender = !params.id || params.id === item._id;
            return shouldRender ? (
              <div className=" w-full p-5 rounded-lg shadow-xl" key={item?._id}>
                <div className="">
                  <p>
                    <span className="font-bold uppercase">title :</span> {item?.title}
                  </p>
                </div>
                <p className="w-full">
                  <span className="font-bold uppercase">description :</span> {item?.description}
                </p>
                <p>
                  <span className="font-bold uppercase">status :</span> {item?.status}
                </p>
                <button
                  className="border mt-2 px-3 rounded border-yellow-500 text-yellow-500 me-2"
                  onClick={() => {
                    setModal(!modal);
                    setEditTodo(item);
                  }}
                >
                  Edit
                </button>
                <button className="border mt-2 px-3 rounded border-red-500 text-red-500" onClick={() => handleDeleteTodo(item._id)}>
                  Delete
                </button>
              </div>
            ) : null;
          })}
        </div>
      </div>

      {/* EDIT TASK MODAL */}
      <div className={`${modal ? "absolute" : "hidden"} absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-sm`}>
        <form onSubmit={handleSave} className="p-5 w-[700px]  rounded-lg shadow-2xl bg-white">
          <input
            type="text"
            className="border w-full p-2 rounded"
            placeholder="Enter title!"
            name="title"
            value={editTodo.title}
            onChange={(e) => {
              handleChange(e);
            }}
          // disabled={editTodo.title === ""}
          />
          <input
            // type="text"
            className="border mt-2 w-full p-2 rounded"
            placeholder="Enter description!"
            name="description"
            value={editTodo.description}
            onChange={(e) => {
              handleChange(e);
            }}
          // disabled={editTodo.description === ""}
          />
          <div className="border flex rounded p-2 mt-2">
            <p className="me-3">Status :</p>
            <div>
              <select name="status" id="" className="border p-1 rounded" onChange={handleChange} value={editTodo.status}>
                <option value="pending">pending</option>
                <option value="success">success</option>
              </select>
            </div>
          </div>
          <button type="button" className="border mt-2 p-1 px-4 me-2 rounded border-red-500 text-red-500" onClick={cancelEditTodo}>
            Cancel
          </button>
          <button type="submit" className="border mt-2 p-1 px-4 rounded border-green-500 text-green-500">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
