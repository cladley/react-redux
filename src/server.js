import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(() => {
        io.emit('state', store.getState().toJS());
    });


    io.on('connection', (socket) => {
        console.log("Connection made");
        // Sending to the client
        socket.emit('state', store.getState().toJS());

        // Coming from the client
        socket.on('action', store.dispatch.bind(store));
    });
}