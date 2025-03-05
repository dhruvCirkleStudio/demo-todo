import { createContext, useContext, useEffect, useRef, ReactNode, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {

    socketRef.current = io("http://localhost:5000");
    const socketInstance = socketRef.current;

    socketInstance.on("connect", () => {
      console.log("Connected:", socketInstance.id);
      setSocket(socketInstance);                                
    });
    
    socketInstance.on("disconnect", () => {
      console.log("Disconnected");
      setSocket(null);
    });

    return () => {
      socket?.disconnect();
    };

  }, []);
  
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);