import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { ToDo, newTodoType } from "../types/ToDo";
import { selectTodo } from "../redux/todoSlice";
import { addTodo, fetchTodoData } from "../redux/todoThunks";
import { AppDispatch } from "../redux/store";
import { useSocket } from "../context/SocketContext";

export default function AddTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useSocket();
  const { todos, loading, error } = useSelector(selectTodo);
  const [newTodo, setNewTodo] = useState<newTodoType>({ title: "", description: "" });
  const [search, setSearch] = useState<string>("");
  const [searchedData, setSearchedData] = useState<ToDo[]>();
  const [modal, setModal] = useState(false);
 

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue === "") {
      setSearchedData(todos);
    } else {
      const filteredData = todos?.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
      setSearchedData(filteredData);
    }
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.title !== "" && newTodo.description !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo({ title: "", description: "" });
      socket?.emit("taskAdded","task added in backend!")
      getTodoData();
      setModal(false);
    }
  };
  const getTodoData = useCallback(async () => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  useEffect(() => {
    getTodoData();
  }, [getTodoData]);

  useEffect(() => {
    socket?.on("taskAdded",()=>{
      console.log("task added in the backend")
      getTodoData();
    })
    socket?.on("hello",(arg)=>{
      console.log(arg)
    })
  }, [socket])

  if (loading) return <Loader />;
  if (error) return <ErrorAlert />;
  return (
    <div className="mt-10">
      <div className="w-[700px] mx-auto">
        <div className="flex">
          <button className="me-2 border py-2 px-5 text-white text-nowrap bg-black rounded-lg" onClick={() => setModal(!modal)}>
            Add Task
          </button>
          <input
            type="text"
            className="w-full px-2 border border-black rounded-lg "
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </div>

        <div className="mt-5 w-full space-y-5">
          {!searchedData &&
            todos?.map(({ _id, title }: ToDo, index: number) => {
              return (
                <div className=" w-full p-5 rounded-lg shadow-xl" key={index} onClick={() => navigate(`/Tasks/${_id}`)}>
                  <div className="">
                    <p>
                      <span className="font-bold uppercase">Todo title :</span> {title}
                    </p>
                  </div>
                </div>
              );
            })}
          {searchedData &&
            searchedData?.map(({ _id, title }: ToDo, index) => {
              return (
                <div className=" w-full p-5 rounded-lg shadow-xl" key={index} onClick={() => navigate(`/Tasks/${_id}`)}>
                  <div className="">
                    <p>
                      <span className="font-bold uppercase">Todo title :</span> {title}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* MODAL */}
      <div className={`${modal ? "absolute" : "hidden"} absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-sm`}>
        <div className="w-[700px] absolute bg-white overflow-hidden mt-5 transition ease-in-out">
          <form onSubmit={handleSubmit} className="p-5  rounded-lg shadow-2xl border">
            <input
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Enter title!"
              name="title"
              value={newTodo.title}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              // type="text"
              className="border mt-2 w-full p-2 rounded"
              placeholder="Enter description!"
              name="description"
              value={newTodo.description}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <button type="submit" className="border mt-2 p-1 px-4 me-2 rounded">
              Submit
            </button>
            <button type="button" className="border mt-2 p-1 px-4 rounded" onClick={() => setModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
