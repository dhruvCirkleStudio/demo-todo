import { createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

interface SocketState {
    socket: Socket | null;
}

const initialState: SocketState = {
    socket: null,
};


const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        connectSocket: (state) => {
            if (!state.socket) {
                const socket = io("http://localhost:5000") as any;
                socket.on('connect', () => {
                    console.log('socket connected')
                });
                state.socket = socket
            }
        },
        disconnectSocket: (state) => {
            if (state.socket) {
                state.socket.disconnect();
                state.socket = null;
            }
        },
    },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
