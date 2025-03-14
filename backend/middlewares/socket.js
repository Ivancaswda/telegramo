import express from 'express'
import {Server} from "socket.io";
import http from 'http'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://tg-puce-six.vercel.app']
    }
})
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}
const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('Пользователь подключен', socket.id)

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id // we will display it in frontend console
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap))


    socket.on('disconnect', () => {
        console.log('Пользователь отключён', socket.id)
        delete userSocketMap[userId]
        // this property let everybody know online or offline user
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })


})


export {app, server, io}
