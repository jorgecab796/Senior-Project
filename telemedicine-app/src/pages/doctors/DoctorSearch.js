import React, {useState, useEffect} from 'react';
import DoctorData from '../doctors/DoctorData';
import '../appointments/appointments.css';
import {Link} from "react-router-dom";


import {Card, Button} from 'react-bootstrap';


import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';


import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment' 


import './doctors.css';

import Axios from 'axios';

import img1 from './avatar_placeholder.png';

import { Modal } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ObjButton from '../../components/Objects/ObjButton'

import PopUpWindow from '../../components/Objects/ObjPopUpWindow'

import ObjLink from '../../components/Objects/ObjLink'

import authUserObject from '../../middleware/authUserObject';

const DoctorSearch = ( {trigger,setTrigger} ) => {

	const [filter, setFilter] = useState('');

	const [show, setShow] = useState(false);
	
	const handleShow = () => setShow(true);

	const [isMobile, setIsMobile] = useState(false)

	const [listOfDoctors, setListOfDoctors] = useState([]);

	 const [textTime,setTime] = React.useState("");

	 const [typeSelect,setTypeSelect] = React.useState("");

	 const [showLocation, setShowLocation] = useState(false);

	 const [txtLocation,setLocation] = React.useState("");

	 const [listOfLocations,setListOfLocations] = React.useState([]);

	 const [listOfApprovedDocFamily, setlistOfApprovedDocFamily] = React.useState([]);

	 const [dateValue, setDateValue] = React.useState(new Date());
     const [txtDateValue, setTxtDateValue] = React.useState(new Date().toLocaleDateString("en-US").split('/').join('-'));

	const searchText = (event) => {
		setFilter(event.target.value);
	}

	const handleResize = () => {
	  if (window.innerWidth < 768) {
		  setIsMobile(true)
	  } else {
		  setIsMobile(false)
	  }
	}

	  const handleClose = () => setShow(false);

	  const [date,setDate] = React.useState(new Date());

	   var userId = String(authUserObject.userId)

	   const [myDocs, setMyDocs] = useState([]);

	   	var listy = [];

		const [listOfNewDocs, setListOfNewDocs] = useState([]);


		var theListyFinal = [];

	useEffect(() => {
	 
	  window.addEventListener("resize", handleResize)
	  
		CreateListOfPatientDocFamily(userId);
	 
        CreateListOfDoctors();

		
		//getLocations();
		
		

		//CreateDocListOfAprrovedFamily();
		//newCreateListOfDoctors();
		//getDocNames();
	    getDocFields();

		CreateDocListOfAprrovedFamily();

		

	}, [])

	
	const CreateListOfDoctors = (  ) => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/users/getDoctors')
            .then((response) => {                
                let data = response.data;           
                console.log("list of docs response:",data);
                data.forEach(e=>{setListOfDoctors(listOfDoctors => [...listOfDoctors, {
                    label: e.firstName + " " + e.lastName,
                    value: e.userUID,
					
                    }]
                )});
            }).catch((err) => {
                console.log(err, "Unable to get Patients");
            });
    }

	/*

	const getDocFields = (  ) => {
      
		let docsWithFields = [];

		listOfDoctors.forEach(e => {

			let idy = e.value;

			Axios.get('https://telemedicine5a-backend.herokuapp.com/doctors/getDoctorInfo/${idy}')
				.then((response) => {                
					console.log("yeahaaah he man: " + response.data)
					
				
				}).catch((err) => {
					console.log(err, "Unable to get Fields");
				});
		
		})
				
            
    }

	*/


	/*
	const getDocFields = (  ) => {
        Axios.get('https://telemedicine5a-backend.herokuapp.com/doctors/getDoctorInfo/')
            .then((response) => {                
                let data = response.data;           
                console.log("list of docs fields response:",data);
				/*
                data.forEach(e=>{setListOfDoctors(listOfDoctors => [...listOfDoctors, {
                    label: e.firstName + " " + e.lastName,
                    value: e.userUID,
					
                    }]
                )});
				
            }).catch((err) => {
                console.log(err, "Unable to get Fields");
            });
    }
	*/


	const getDocFields = (  ) => {
		//console.log("arrData - ",);
        let newList = [];
        //listOfDoctors.forEach(e => {
            //console.log("e: ",e);
            //let id = e.value; //set ID to doctor
            //console.log("id: ",id);
            Axios.get(`https://telemedicine5a-backend.herokuapp.com/doctors/getDoctorInfo/`)
                .then((response) => {
                    let data = response.data;
                    console.log("getID() - response:", data[0].doctorUID);

					console.log(data);

					data.forEach(e => {

						console.log("getID() - responseyyyy:", e.doctorUID);

						let y = e.doctorUID;

						Axios.get(`http://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${y}`)
							.then((response) => {

								let docId = response.data;

								//const result = docId.filter(docId => docId.listOfApprovedDocFamily === "Allergist" || "Pathologist" || "Infectious Disease" || "Neurologist");
								//console.log("result approved doc: ", result);

								docId.forEach(event=>{setMyDocs(myDocs => [...myDocs, {

									label: event.firstName + " " + event.lastName,
									fos: e.fieldOfStudy,
					
								}]
							)});

								
								console.log("red leaf: ", response.data, e.fieldOfStudy);
							
							}).catch((err) => {
								console.log(err, "Unable to dooby of Doctors");
							});
					})

					console.log("you bet   " + listOfApprovedDocFamily);


					//let fos = data.fieldOfStudy;
					console.log("myDocs bro - response:", myDocs.fos);

					

					
                    //let name = data[0].lastName + ", " + data[0].firstName;
                    //console.log("setTheNames() - name:", name);

                    //e.doctorName = name;
                    //console.log("setTheNames() - e.doctorName:", e.doctorName);

                    //console.log("setTheNames() - arrData: ", arrData);
                    //newList = [...newList, e];

					//setMyDocs(newList);
					//console.log("myDocs - " + newList);
                    
                }).catch((err) => {
                    console.log(err, "Unable to set Names of Doctors");
                });

				
			

			
			//console.log("myDocs - " + myDocs);
			
	}

	

	/*const newCreateListOfDoctors = (  ) => {
		Axios.get('https://telemedicine5a-backend.herokuapp.com/doctors/getDoctorInfo')
			.then((response) => {
				let data = response.data; 
				console.log("list of new docs response:",data);
				data.forEach(e=>{setListOfNewDocs(listOfNewDocs => [...listOfNewDocs, {
					label: e.fieldOfStudy,
					value: e.doctorUID,
					id: e._id,
					}]
				)});
			}).catch((err) => {
				console.log(err, "Unable to get Docs");
			});
	}*/

	const [txtLocSelect,setLocSelect] = React.useState("");

	 const onRadioLocSelect = ( event ) => {
        let inPersOrOnline = event.target.value;
		setLocSelect(inPersOrOnline);

       
        console.log("Radio type Select: ", inPersOrOnline);
       
    }

	const onTimeSelect = ( event ) => {
        
        setTime(event.target.value);
    }

	const listOfTimes =[
        {
            label: "09:00AM",
            value: "09:00AM",
        },   
        {
            label: "09:30AM",
            value: "09:30AM",
        },     
        {
            label: "10:00AM",
            value: "10:00AM",
        },
        {
            label: "10:30AM",
            value: "10:30AM",
        },
        {
            label: "11:00AM",
            value: "11:00AM",
        },
        {
            label: "11:30AM",
            value: "11:30AM",
        },
        {
            label: "12:00PM",
            value: "12:00PM",
        },
        {
            label: "12:30PM",
            value: "12:30PM",
        },
        {
            label: "01:00PM",
            value: "01:00PM",
        },
        {
            label: "01:30PM",
            value: "01:30PM",
        },
        {
            label: "02:00PM",
            value: "02:00PM",
        },
        {
            label: "02:30PM",
            value: "02:30PM",
        },
        {
            label: "03:00PM",
            value: "03:00PM",
        },
        {
            label: "03:30PM",
            value: "03:30PM",
        },
        {
            label: "04:00PM",
            value: "04:00PM",
        },
        {
            label: "04:30PM",
            value: "04:30PM",
        },
    ];


	const addAppointment = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/addAppointment', {
                userUID:        userId,
                doctorUID:		doctorID,
                date:           txtDateValue,
                time:           textTime,
				type:			typeSelect,
                locationUID:    txtLocation,
               
            }).then((response) => {
                
				setShowLocation(false);
				setTypeSelect("");
				setLocSelect("");
				setDoctorID('');
				setLocation("");
				setApptInputPopup(false);
				setTime("");
				setMyDocs("");
				setDateValue("");
				setTxtDateValue("");
				

            }).catch((err) => {
                          
            });
    }

	 /*const onDoctorSelect = ( event ) => {
        
        let docID = event.target.value;
      
        setDoctorID(docID);
		getScheduleAvail(docID);
		CreateListOfPatientDocFamily(userId);
        
    }*/

	const [doctorID, setDoctorID] = useState('');

	const onSubmit = (event) => {
        addAppointment();
    }

	const onType = (e) => {

		if (e === 'In Person') {
		
			setShowLocation(true);
			setTypeSelect(e);
			
			console.log(e);
			console.log("in person loc id: " + txtLocation);
			
		}

		if (e === 'Virtual') {
			
			setLocation("6179e7aba30ceaeeec949c21");
			setShowLocation(false);
			setTypeSelect(e);

			console.log(e);
			console.log("virtual loc id: " + txtLocation);	
			
		}
		
	}

	const [apptInputPopup, setApptInputPopup] = React.useState(false);   

	const apptClick = (e) => {

		let docID = e;

        console.log("Appointment Click");
        console.log("click", e);

		setDoctorID(e);
		getScheduleAvail(docID);

        let bPop = !apptInputPopup;
        setApptInputPopup(bPop);
        console.log("Popup is ",bPop);

    }

	const onLocationInput = ( event ) => {
        let loc = event.target.value;
        setLocation(loc);
        console.log("Location: ",loc);
        
    }

	const getLocations = (  ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/location/getLocations`)
            .then((response) => {                
                let data = response.data;           
                console.log("getLocations() - response:",data);
                data.forEach(e=>{setListOfLocations(listOfLocations=>[...listOfLocations,{
                        label: e.name,
                        value: e._id,
                    }]
                )})
            }).catch((err) => {
                console.log(err, "Unable to get Locations");
            });
    }

	const getScheduleAvail = ( docID ) => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/schedule/getScheduled/${docID}`)
            .then((response) => {                
                let data = response.data;           
                console.log("getScheduleAvail() - response:",data);
                
            }).catch((err) => {
                console.log(err, "Unable to get Schedule");
            });
    }

	/* List of approved doctors for the user */

	const CreateListOfPatientDocFamily = ( userID ) => {
			console.log("CreateListOfPatientDocFamily() - userID: ",userID);
			Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${userID}`)        
				.then((response) => {                
					let data = response.data[0].approvedDoctors;           
					console.log("CreateListOfPatientDocFamily - response:",data);
					data.forEach(e=>{setlistOfApprovedDocFamily(listOfApprovedDocFamily=> [...listOfApprovedDocFamily, {
						label:  e,
						value:  e,
						}]
					)});                 
				}).catch((err) => {
					console.log(err, "Unable to get Patients list of Doctors");
				});


				console.log("lit fam: " + listOfApprovedDocFamily);
		}

	function CreateDocListOfAprrovedFamily() {
			/*
			let listy = [];

			//let a = [];
			//a.push(JSON.stringify(myDocs));

			myDocs.forEach(e => {
				console.log("some fos: " + e.fos);
				//let docFOS = e.fos;
				console.log("some fos: " + e.fos);
				if(listOfApprovedDocFamily.includes(e.fos)) {
					listy.push(e);
				} 
			})

			//setMyDocs(listy);
			console.log("My for each loop: " + listy);
			*/
			var count = 0;
			let i;
			for(i = 0; i < myDocs; i++) {
				count += 1;
			}
			console.log("coutn      " + count);
		
			
			
	}

    const dateSelected = ( event ) => {

		setDate(event);
        setDateValue(event);

        //convert date to string
        setTxtDateValue(event.toLocaleDateString("en-US").split('/').join('-'));

		console.log("local string date: " + dateValue);
		console.log("text date value: " + txtDateValue);
    }
	

	return(


		<div className='appointments'>
			<Navbar/>
				<div className='Appointments-container-outer'>
				<div className='Appointments-container-inner'>
					<div className='Doctors-card' data-toggle="modal" data-target="#myModal">


						<div className="py-4 container">
							<div className={isMobile ? " " : "row justify-content-center"}>

							
								
							<div className="search-label"><h1>Find a Specialist</h1></div>
												

							  {myDocs.map((item, index) => {
								return(
						
				
								<div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
				
									<div className="card p-0 overflow-hidden h-100 shadow">
										<img src={img1} className="card-img-top img-fluid" />
										<div className="card-body">
											<h5 className="card-title">{item.label}</h5>
											<p className="card-text">{item.fos}</p>

										
											<Button className="nextButton" onClick={e => apptClick(item.value)}>
												Select
											</Button>

										
									
                    
											<PopUpWindow
													trigger={apptInputPopup}
													setTrigger={setApptInputPopup}
													className="pop-up-window"

												
											>  

											
												<h5><b>Schedule Your Appointment with {}</b></h5>

												

												<h6>Click To Select Date And Time:</h6>

												 <div>
													<DatePicker                            
														selected={date}
														onChange={e=>dateSelected(e)}
													/>

													
												</div>

	

												<select
													style={{
														height: "25px",
														width: "100px",
														textAlign: "left"
													}}                        
													onChange={e=>onTimeSelect(e)} 
													
													onChange={(e) => {
													  const selectedTime = e.target.value;
													  setTime(selectedTime);
													}}
												>
													<option value="_placeholder_">Time</option>
													{listOfTimes.map((option) => (
														<option value={option.value}>{option.label}</option>
													))}    
												</select>

												{/* spacer */}
												<pre>     </pre>
												

												<h6>Select Your Appointment Type:</h6>
											
												
												<p 
													style={{
														position:"relative",
														top: "16px"
													}}
												> In Person Visit     
												</p>

												<input
													type="radio"
													value="inPerson"
													name="radioLocation" 
													onClick={e=>onType('In Person')}
												/>


												{showLocation == true &&
													<h6>Location:</h6>	
												}

												{showLocation == true &&
													
													 <select
														style={{
															height: "25px",
															width: "200px",
															textAlign: "left",
														}}
                            
														onChange={e=>onLocationInput(e)}  
													>
														{listOfLocations.map((option) => (
															<option value={option.value}>{option.label}</option>
														))}        
													</select>

													
												}


											
												<p 
													style={{
														position:"relative",
														top: "16px"
													}}
												> Virtual Visit</p>

												<input
													type="radio"
													value="virtual"
													name="radioLocation"
													onClick={e=>onType('Virtual')}
												/>

											

												<div>

												<Link to={`/NoAppointments`}>
													 <Button                    
														
														onClick={e=>onSubmit(e)}
														className="btnCreateAppnt"
													>
													Create
													</Button>
												</Link>

												</div>

											
											
											</PopUpWindow>
									

										</div>
									</div>
				
								</div>

				
								)

							  })}

							</div>

						</div>

					</div>
 
			  </div>
                      
			</div>
                
		<Footer/>

		</div>

	)
}

export default DoctorSearch;