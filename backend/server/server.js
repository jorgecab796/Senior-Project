const express = require('express');
var cors = require('cors')
const connection = require('./dbConfig/db');
const PORT = process.env.PORT || 3003;
const app = express();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

//video call import
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require('path');

const rooms = {};

io.on("connection", socket => {
    socket.on("join room", roomID => {
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
});


// Import models for testing
const UserModel = require('./models/User')
const AppointmentModel = require('./models/Appointment')
const ReportsModel = require('./models/Reports')
const InboxModel = require('./models/Inbox')
const FileModel = require ('./models/file')
const LocationModel = require('./models/Location');

// Initialize MongoDB Atlas connection
connection();

// Initialize middleware
app.use(cors());
app.use(express.json({ extended: false }));
let gfs;
const conn = mongoose.connection;

conn.once("open", function() {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('upload');
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/appointments', require('./routes/appointment'));
app.use('/reports', require('./routes/reports'));
app.use('/inbox', require('./routes/inbox'));
app.use('/file', require('./routes/file'));
app.use('/location', require('./routes/location'));
app.use('/doctors', require('./routes/doctorDemographics'));
app.use('/schedule', require('./routes/scheduled'))
app.use('/daysOff', require('./routes/daysOff'));
app.use('/notifs', require('./routes/notifications'));


//video call

app.listen(PORT, () => {console.log('API Connection SUCCESSFUL')});
server.listen(PORT, () => { console.log('Server Connection SUCCESSFUL') });

module.exports = app;