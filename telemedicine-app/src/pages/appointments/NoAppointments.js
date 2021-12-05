import React, { useState, useEffect }  from 'react';
import './appointments.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import './Tabs.css';
import Chevron from '../../components/inbox components/Chevron.js'
import authUserObject from '../../middleware/authUserObject';
import moment from 'moment'; 


function NoAppointments() {

    const [listOfAppointments, setListOfAppointments] = useState([]);

    const [pastAppointments, setPastAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const [show, setShow] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    //const handleOpen = () => {
    //setShow(!show); // Toggle accordion
    //};

    function handleOpen() {
       setShow(show === "" ? "active" : "");
	}

    const [toggleState, setToggleState] = useState(1);
    const [toggled, setToggled] = useState(false);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const toggleAccordion = (index) => {

        if(toggled === index){
          return setToggled(null);
        }
    
        setToggled(index);
       
    }

     const [date,setDate] = React.useState(new Date());

     

    useEffect(() => {
        Axios.get(`https://telemedicine5a-backend.herokuapp.com/appointments/getAppointments/${authUserObject.userId}`)
        .then((response) => {
            /*setListOfAppointments(response.data);*/

            /*listOfAppointments.map((appnt, idx) => {
                const current = moment(date, 'DD-MM-YYYY').valueOf()
                const apiDate = moment(appnt.date, 'DD-MM-YYYY').valueOf()

                var i = 0;
                
                console.log("Datey: " + apiDate + ", Current: " + current);
                if(current > apiDate) {
                i++;
                    console.log("truey" + " " + i);
                    setPastAppointments(appnt.date);

				} else {
                    setUpcomingAppointments(appnt.date);        
				}
			})*/
            console.log(response.data);


            const past = [];
            const upcoming = [];

            var current = moment(date, 'YYYY-MM-DD').format();
            var currDate = current.slice(0, 10);
            console.log(currDate);
         
            /*var currentDate = y.valueOf;
            console.log("currentDate: " + currentDate);*/


            var currentTime = moment();
            console.log("current time: " + currentTime);

            var hashmap = new Map();

            console.log(response.data.length);

            for(let key in response.data) {
        
                var dataDate = response.data[key].date.slice(0, 10);

                var apiDate = moment(response.data[key].date, 'DD-MM-YYYY').valueOf()

                hashmap.set(response.data[key].date, apiDate);
               
                var apiTime = moment(response.data[key].time, "hh:mm a");
                console.log("apiTime: " + apiTime);
                

                if(moment(currDate).isAfter(dataDate) || moment(currDate).isSame(dataDate)) {
                    if(currentTime > apiTime) {
                        past.push(response.data[key]); 
					} else {
                        upcoming.push(response.data[key]);
					}
                           
				} else {
                    upcoming.push(response.data[key]);        
				}
			}

            const mapSort = new Map([...hashmap.entries()].sort(function(entryA, entryB) {
              return entryB[0] - entryA[0];
            }));

            console.log(hashmap);
            console.log(mapSort);

            mapSort.forEach(function(value, key) {
                console.log(value + " " + key);
			})

            var pastDateList = [];

            for(let i in past) {

                pastDateList.push(past[i].date);
                console.log("past: " + past[i].date);     
			}
            console.log("past: " + past.data);
            console.log("upcoming: " + upcoming.data);

            setPastAppointments(past);
            setUpcomingAppointments(upcoming);

           
        })
        .catch((err) => {
            console.log(err, "Unable to get appointments");
        });
    }, []);
    

   return (

       

       <div className='appointments'>
           <Navbar/>
               <div className='Appointments-container-outer'>
                   <div className='Appointments-container-inner'>
                       <div className='Appointments-card'>


                          <Link to='/DoctorSearch'>
                              <Button className="button">
                                 Create New
                              </Button>
                          </Link>

                        
                          <div className="bloc-tabs">

                            <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                                Upcoming 
                            </button>

                            <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                                Past
                            </button>
        
                          </div>


                          <div className="content-tabs">

                             <div className={toggleState === 1 ? "content  active-content" : "content"}>

                                <h4>All Upcoming Appointments</h4>
                                <hr />

                                {upcomingAppointments.map((appointment, index) => {

                                    return (
                                        
                                        <div className="accordion1">
                    
                                            <div className="accordion1-header" onClick={() => toggleAccordion(index)} key={appointment.index}>
                                                <h5 className="date">{appointment.date}</h5>
                                                <h5 className="time">{appointment.time}</h5>
                                                <h5 className="subject">{appointment.type}</h5>
                                             
                                                
                                                <b>
                                                    {toggled === index ? 
                                                        <Chevron className="accordion__icon" width={15} fill="#fc59ff"/> 
                                                        : <Chevron className="accordion__icon rotate" width={15} fill="#fc59ff"/>
                                                    }
                                                </b>
                                                
                                            </div>
                                           
                                            
                                          
                                            {toggled === index && (

                                                <div className="accordion1-body">
                                                
                                                    <h1 className="doctor">{appointment.doctorUID}</h1>
                                                    <h1 className="address">{appointment.locationUID}</h1>
                                                    
                                                    <Link to='/client'>
                                                        <button className="btnCall">Start Call</button>
                                                    </Link>
                                                    <h1 className="note">Note:</h1>
                                                    
                                                    <textarea className="textarea-edit">
                                                    </textarea>
                                                 
                                                    <h1 className="doctor-notes">Doctor Notes</h1>
                                                    <h1 className="reschedule">Reschedule</h1>
                                                    <h1 className="cancel-appointment">Cancel Appointment</h1>
                             
                                                </div>
                                            )}
                                        
                                        </div> 
                                    );
                                })}
                             </div>


                             <div className={toggleState === 2 ? "content  active-content" : "content"}>

                                <h4>All Past Appointments</h4>
                                <hr />

                                  {pastAppointments.map((appointment, index) => {

                                    return (
                                        
                                        <div className="accordion1">
                    
                                            <div className="accordion1-header" onClick={() => toggleAccordion(index)} key={appointment.index}>
                                                <h5 className="date">{appointment.date}</h5>
                                                <h5 className="time">{appointment.time}</h5>
                                                <h5 className="subject">{appointment.type}</h5>
                                             
                                                
                                                <b>
                                                    {toggled === index ? 
                                                        <Chevron className="accordion__icon" width={15} fill="#fc59ff"/> 
                                                        : <Chevron className="accordion__icon rotate" width={15} fill="#fc59ff"/>
                                                    }
                                                </b>
                                                
                                            </div>
                                           
                                            
                                          
                                            {toggled === index && (

                                                <div className="accordion1-body">
                                                
                                                    <h1 className="doctor">{appointment.doctorUID}</h1>
                                                    <h1 className="address">{appointment.locationUID}</h1>
                                                    
                                                    <Link to='/client'>
                                                        <button className="btnCall">Start Call</button>
                                                    </Link>
                                                    <h1 className="note">Note:</h1>
                                                    
                                                    <textarea className="textarea-edit">
                                                    </textarea>
                                                 
                                                    <h1 className="doctor-notes">Doctor Notes</h1>
                                                    <h1 className="reschedule">Reschedule</h1>
                                                    <h1 className="cancel-appointment">Cancel Appointment</h1>
                             
                                                </div>
                                            )}
                                        
                                        </div> 
                                    );
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

export default NoAppointments;