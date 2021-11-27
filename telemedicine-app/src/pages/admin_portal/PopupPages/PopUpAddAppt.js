import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow'
import ObjButton from '../../../components/Objects/ObjButton'

const PopUpAddAppt = ( {trigger,setTrigger} ) => {
    //declarations
    const [textPatientID,setPatientID] = React.useState("");
    const [textDoctorID,setDoctorID] = React.useState("");
    const [date,setDate] = React.useState(new Date());
    const [textTime,setTime] = React.useState("");
    const [txtLocSelect,setLocSelect] = React.useState("");
    const [boolShowLocation,setShowLocation] = React.useState(false);
    const [txtLocation,setLocation] = React.useState("");
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    
    //~~~~~~Remove when linked~~~~~
    const listOfPatients =[
        {
            label: "patient1",
            value: "00001",
        },
        {
            label: "patient2",
            value: "00002",
        },
        {
            label: "patient3",
            value: "00003",
        },
        {
            label: "patient4",
            value: "00004",
        },
    ];

    //set patient
    const onPatientSelect = ( event ) => {
        console.log("onPatientSelect - ",event);
        console.log("Value set: ", event.target.value);
        setPatientID(event.target.value);
    }

    //~~~~~~Remove when linked~~~~~
    const listOfDoctors =[
        {
            label: "Doctor1",
            value: "00001",
        },
        {
            label: "Doctor2",
            value: "00002",
        },
        {
            label: "Doctor3",
            value: "00003",
        },
        {
            label: "Doctor4",
            value: "00004",
        },
    ];

    //set Doctor
    const onDoctorSelect = ( event ) => {
        console.log("onDoctorSelect - ",event);
        console.log("Value set: ", event.target.value);
        setDoctorID(event.target.value);
    }

    //~~~~~~Remove when linked~~~~~
    const listOfTimes =[
        {
            label: "09:00AM",
            value: "09:00AM",
        },
        {
            label: "10:00AM",
            value: "10:00AM",
        },
        {
            label: "11:00AM",
            value: "11:00AM",
        },
        {
            label: "12:00PM",
            value: "12:00PM",
        },
    ];

    //set Time
    const onTimeSelect = ( event ) => {
        console.log("onTimeSelect - ",event);
        console.log("Value set: ", event.target.value);
        setTime(event.target.value);
    }

    //Set Type of Visit    
    const onRadioLocSelect = ( event ) => {
        let loc = event.target.value;
        setLocSelect(loc);
        console.log("Radio Loc Select: ",loc);
        let doInPerson = loc == "InPerson";
        setShowLocation(doInPerson);
    }
    
    //~~~~~~Remove when linked~~~~~
    const listOfLocations =[
        {
            label: "Location01",
            value: "00001",
        },
        {
            label: "Location02",
            value: "00002",
        },
        {
            label: "Location03",
            value: "00003",
        },
        {
            label: "Location04",
            value: "00004",
        },
    ];

    //set Location
    const onLocationInput = ( event ) => {
        let loc = event.target.value;
        setLocation(loc);
        console.log("Location: ",loc);
    }

    //create new Apt
    const onSubmit = (event) => {
        console.log(event);
        console.log("patient: ", textPatientID, " doctor: ", textDoctorID, " Date: ", date, " Time: ", textTime);        
        
        if (textPatientID == "_placeholder_" || textDoctorID == "_placeholder_" || textPatientID == "" || 
        textDoctorID == "" || textTime == "_placeholder_" || textTime == "" || txtLocSelect == "") {
            setBoolError(true);
            setError("Missing Patient, Doctor, Location, or Time");
        }else{            
            setBoolError(false);
            setDoctorID("");
            setPatientID("");
            setLocSelect("");
            setTime("");
            setTrigger(false);
        }
    }
    
    return (    
        <PopUpWindow
                trigger = {trigger}
                setTrigger = {setTrigger}
                header = "Add Appointment"
        >  
            {/* Grid Definitions */}
            <div className="popup_container"
                style={{
                    position: "relative",
                    left: "75px",
                    gridTemplateRows: "inherit",
                    gridTemplateColumns: "100px 325px",
                }}
            >
                
                {/* Patient Label */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:1,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Patient:</h5>
                </div>

                {/* Patient Select */}
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:1,
                        gridColumn:2,
                    }}
                >
                    <select
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                        
                        onChange={e=>onPatientSelect(e)}  
                    >
                        <option value="_placeholder_">Select Patient</option>
                        {listOfPatients.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
    
                    </select>
                </div>

                {/* Doctor Label */}
                <div className="popup_label_grid"
                    style={{
                        gridRow:2,
                        gridColumn:1,
                    }}
                >
                    <h5 className="popup_label">Doctor:</h5>
                </div>

                {/* Doctor Select */}
                <div className="popup_inputs_grid"
                    style={{
                        gridRow:2,
                        gridColumn:2,
                    }}
                >
                    <select
                        style={{
                            height: "25px",
                            width: "300px",
                            textAlign: "left",
                        }}
                        
                        onChange={e=>onDoctorSelect(e)}  
                    >
                        <option value="_placeholder_">Select Doctor</option>
                        {listOfDoctors.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}        
                    </select>
                </div>
            
                {/* Date and Time Select */}
                <div className="popup_spread_grid"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gridRow:3,
                        gridColumnStart:1,
                        gridColumnEnd:3,
                        justifyContent: "center",
                        position: 'relative', 
                    }}
                >
                    {/* Date Select */}
                    <div>
                        <DatePicker                            
                            selected={date}
                            onChange={e=>setDate(e)}
                        />
                    </div>

                    {/* spacer */}
                    <pre>     </pre>
                    
                    {/* Time Select */}
                    <select
                        style={{
                            height: "25px",
                            width: "100px",
                            textAlign: "left",
                        }}                        
                        onChange={e=>onTimeSelect(e)}  
                    >
                        <option value="_placeholder_">Time</option>
                        {listOfTimes.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}    
                    </select>
                </div>

                {/* Radio Type of Visit Select */}
                <div className="popup_spread_grid"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gridRow:4,
                        gridColumnStart:1,
                        gridColumnEnd:3,
                        justifyContent: "center",
                        position: 'relative', 
                        top: "-10px"
                    }}
                    onChange={e=>onRadioLocSelect(e)}
                >
                    {/* Btn In Person */}
                    <input
                        type="radio"
                        value="InPerson"
                        name="radioLocation"                        
                    />
                    <pre><p 
                        style={{
                            position:"relative",
                            top: "16px"
                        }}
                    > In Person Visit     </p></pre>
                    
                    {/* Btn Virtual */}
                    <input
                        type="radio"
                        value="Virtual"
                        name="radioLocation"
                    />
                    <pre><p 
                        style={{
                            position:"relative",
                            top: "16px"
                        }}
                    > Virtual Visit</p></pre>                    
                </div>
            
                {/* Location Label */}
                {boolShowLocation == true &&
                    <div className="popup_label_grid"
                        style={{
                            gridRow:5,
                            gridColumn:1,
                        }}
                    >
                        <h5 className="popup_label">Location:</h5>
                    </div>
                } 
                

                {/* Location Select */}
                {boolShowLocation == true &&
                    <div className="popup_inputs_grid"
                        style={{
                            gridRow:5,
                            gridColumn:2,
                        }}
                    >
                        <select
                            style={{
                                height: "25px",
                                width: "300px",
                                textAlign: "left",
                            }}
                            
                            onChange={e=>onLocationInput(e)}  
                        >
                            {listOfLocations.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}        
                        </select>
                    </div>
                }
                

                {/* Button Create */}
                <div className="popup_spread_grid"
                    style={{
                        gridRow:6,
                        gridColumnStart:1,
                        gridColumnEnd:3,
                    }}
                >
                    <ObjButton                     
                        text="Create"
                        onClick={e=>onSubmit(e)}
                    />
                </div>                
            </div>

            {/* Button Error Message */}
            {boolError &&
                <p
                    style={{
                        color: 'red',
                    }}
                >{txtError}</p>
            } 
        </PopUpWindow>
    )
}

export default PopUpAddAppt
