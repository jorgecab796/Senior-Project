import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import "./Client.css"
import '../appointments/appointments.css'

import Axios from 'axios'

import ObjLink from '../../components/Objects/ObjLink';


const socket = io.connect('https://video-chat-telemedicine.herokuapp.com/')

function Client() {

	const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

	const [ copyClicked, setCopyClicked] = useState(false)
	const [ captureId, setCaptureId] = useState("")

	const submitId = () => {
        /*Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/updateApptInfo/${apptId}', {
        _id: {idToCall}
        }).then((response) => {
            console.log(response)
        });*/
		window.location.reload(true);
		console.log(me);
		setCopyClicked(true);
		setCaptureId(me);
		
    }

	const idCreate = () => {
		window.location.reload(true);
	}

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream);
				if(myVideo.current) {
				myVideo.current.srcObject = stream
				}
		})

	socket.on("me", (id) => {
			setMe(id)
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			if(userVideo.current) {
				userVideo.current.srcObject = stream
			}
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	let myVid;
	if(stream) {
		myVid = (<video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />);
	}

	let partnerVid;
	if(callAccepted) {
		partnerVid = (<video playsInline ref={userVideo} autoPlay style={{ width: "300px"} } />);
	}

	let incomingCall;
	if(receivingCall) {
		incomingCall = (
			<div className="caller">
			<h1 >{captureId} is calling...</h1>
			<Button variant="contained" color="primary" onClick={answerCall}>
				Answer
			</Button>
			</div>
		)
	}


	return (
		<>

		<div className="video-container-outer">
		<div className="video-container-inner">

		  <h1 style={{ textAlign: "center", color: '#fff' }}>Video Chat</h1>
			<div className="containerVid">
				<div className="video-container">
					<div className="video">
						{myVid}
					</div>
					<div className="video">
						{!callEnded ?
						partnerVid:
						null}
					</div>
				</div>
				<div className="myId">
					<TextField
						id="filled-basic"
						label="Name"
						variant="filled"
						value={name}
						onChange={(e) => setName(e.target.value)}
						style={{ marginBottom: "20px" }}
					/>

					

					<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
						<Button variant="contained" color="primary" onClick={submitId} startIcon={<AssignmentIcon fontSize="large" />}>
							Copy ID
						</Button>
					</CopyToClipboard>

					<div>
						{copyClicked ? (
							<h4>Your Id is {me}</h4>
						) : (null)}
					</div>

					<ObjLink
                        className="view-report-widget-btn"
                        linkInfo = '/reportDisplay'
                        text = "View"
                        doLink = "false"
                        btnWidth = "100px"
                        data = {{
                    
                            id: {idToCall}
                        }}
                    />

					<TextField
						id="filled-basic"
						label="ID to call"
						variant="filled"
						value={captureId}
						onChange={(e) => setIdToCall(e.target.value)}
					/>
					<div className="call-button">
						{callAccepted && !callEnded ? (
							<Button variant="contained" color="secondary" onClick={leaveCall}>
								End Call
							</Button>
						) : (
							<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
								<PhoneIcon fontSize="large" />
								<h4>Call</h4>
							</IconButton>
						)}
						{idToCall}
					</div>
				</div>
				<div>
					{!callAccepted ? (
							incomingCall
					) : null}
				</div>
			</div>
		
		</div>
		</div>
		</>
	)
}

export default Client