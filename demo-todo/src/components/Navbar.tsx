import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-[70px] border">
      <div className="h-full">
        <ul className="h-full pe-10 gap-x-2 flex items-center justify-end border border-black">
          <li className="rounded ">
            <NavLink to="/" className={({ isActive }) => `${isActive && "bg-slate-200"} px-3 py-2 rounded hover:bg-slate-200`}>
              Add task
            </NavLink>
          </li>
          <li className="rounded ">
            <NavLink to="/Tasks" className={({ isActive }) => `${isActive && "bg-slate-200"} px-3 py-2 rounded hover:bg-slate-200`}>
              Tasks
            </NavLink>
          </li>
          {/* <li className="rounded ">
            <NavLink to="/EditTodos" className={({ isActive }) => `${isActive && "bg-slate-200"} px-3 py-2 rounded hover:bg-slate-200`}>
              Edit Todos
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
