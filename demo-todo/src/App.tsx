import "./App.css";
import { SocketProvider } from "./context/SocketContext.js";
import Router from "./route/Router.jsx";
// import { SocketProvider } from "./context/socketContext.js";
// import { useEffect } from "react";
// import { useAppDispatch } from "./redux/hooks.js";
// import { connectSocket, disconnectSocket } from "./redux/soketSlice.js";



function App() {

  // const dispatch = useAppDispatch();
  //   useEffect(() => {
  //       dispatch(connectSocket());
  //       return () => {
  //           dispatch(disconnectSocket());

  //       };
  //   }, [dispatch]);

  return (
    <>
      <SocketProvider>
        <Router />
      </SocketProvider>

    </>
  );
}

export default App;
