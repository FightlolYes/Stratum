const socketUtils = () =>{
    const handleSocketConnection = (socket) => {
        console.log('Connected to socket server')

        socket.emit('message', 'Hello from server')

        setInterval(() => {
            socket.emit('message', 'Message from dashboard')
        }, 2000)

        socket.on('message', (data) => {
            console.log(data)
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server')
        })
    }

    return {
        handleSocketConnection
    }
}

export default socketUtils