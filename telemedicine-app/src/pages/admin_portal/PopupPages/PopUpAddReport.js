import React from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import PopUpWindow from '../../../components/Objects/ObjPopUpWindow';
import ObjButton from '../../../components/Objects/ObjButton'
import ObjInputFile from '../../../components/Objects/ObjInputFile';

const PopUpAddReport = ( {trigger,setTrigger, AptInfo} ) => {//userUID, appointmentsUID, doctorUID, txtDate, locationUID, 
    const [textInput, setTextInput] = React.useState("");
    const [file, setFile] = React.useState(new FormData());
    const [boolError,setBoolError] = React.useState(false);
    const [txtError,setError] = React.useState("");

    //Load Patients and Doctors
    useEffect(() => {
        console.log("AptInfo: ",AptInfo);        
    }, []);

    const onTextChange = (event) => {
        //console.log(event);
        //console.log(event.target.value);
        setTextInput(event.target.value)
        //console.log(textInput);
    }

    const readFile = (e) => {
        const name = e[0].name;
		document.getElementById("file-label").textContent = name;
        //console.log(name);
    }

    const fileHandler = (event) => {
        //console.log(event);
        //console.log(event.target);
        // let tempFile = event.target.files[0]; 

        // console.log("tempfile", tempFile);

        // file.append("file",tempFile);

        // console.log("file:", file);
        //for(const [k,v] of file) {console.log("index: ",k," value: ",v)}

        /* let testFile = new FormData();
        testFile.append("file",tempFile);
        console.log("testFile: ",testFile); */

        setBoolError(false);
        setError("");
    }

    const onSubmit = (event) => {
        console.log("Add Report - ",
        "AptInfo.userUID",AptInfo.userUID,
        "AptInfo._id",AptInfo._id,
        "AptInfo.doctorUID",AptInfo.doctorUID,
        "AptInfo.date",AptInfo.date,
        "textInput",textInput,
        "file",file,
        "AptInfo.locationUID",AptInfo.locationUID);
        
        addFile();     
    }

    //send File
    const addFile = (  ) => {
        /* const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };config */
        
        
        Axios.post('https://telemedicine5a-backend.herokuapp.com/file/upload',file, { 
                    headers: {'content-type': 'multipart/form-data'}                      
                }).then((response) => {
                    console.log("Add Report, response: ",response);
                    console.log("Add Report, response: ",response.data.filename);
                    
                    
                }).catch((err) => {
                    //get Error
                    console.log("Org Error: ",err);

                    //error display
                    setError("Unable to add File");
                    setBoolError(true);            
                });
    }

    //Create Apt
    const addReport = () => {
        if (file){
            /* console.log("Report Add -  userUID: ",userUID," appointmentsUID: ",appointmentsUID, " doctorUID: ",doctorUID,
            " txtDate: ",txtDate, " textInput: ",textInput," formData: ",formData, " locationUID: ",locationUID); */
            Axios.post('https://telemedicine5a-backend.herokuapp.com/reports/addReport', {
                    userUID:            AptInfo.userUID,
                    appointmentsUID:    AptInfo._id,
                    doctorUID:          AptInfo.doctorUID,
                    date:               AptInfo.date,
                    details:            textInput,
                }).then((response) => {
                    console.log("Add Report, response: ",response);
                    console.log("Add Report, response reportID: ",response.data.data._id);
                    let reportID = response.data.data._id;
                    addFile(reportID);

                    
                   
                }).catch((err) => {
                    //get Error
                    console.log("Org Error: ",err);

                    //error display
                    setError("Unable to add Report");
                    setBoolError(true);            
                });
            
            
        } else {
            setError("Missing File, please add a file first.");
            setBoolError(true);
        }
    }

    

    //send Notification
    const sendNotification = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/notifs/addNotifications', {
                    userUID: AptInfo.userUID,
                    notif_type: 'report',
                    isRead: false
                }).then((response) => {
                    console.log("Add Report, response: ",response) 
                    
                    //cleanup
                    setBoolError(false);
                    setError("");
                    setTextInput("");
                    
                    setFile([]); 
                    setTrigger(false);
                }).catch((err) => {
                    //get Error
                    console.log("Org Error: ",err);

                    //error display
                    setError("Unable to send notification for Report");
                    setBoolError(true);            
                });
    }
    
    return (
    
            <PopUpWindow
                    trigger = {trigger}
                    setTrigger = {setTrigger}
                    header = "Add Report"
            >                
                <p
                    style={{
                        position:'relative',
                        left:"-193px",
                        top: "15px",
                    }}
                >Doctors Notes:</p>
                <textarea
                    defaultValue={textInput}
                    style={{width:"500px"}}
                    type="text"    
                    onChange={e=>onTextChange(e)}   
                />
                <div>
                    {/* <label className="objbutton" for="inputFile" style={{width:"100px"}}>Upload</label>
                    <input 
                        className="objinputfile-input-hidden" 
                        id="inputFile" 
                        type="file" 
                        style={{visibility:"hidden"}} 
                        onChange={e=>fileHandler(e)}
                    /> */}
                    <iframe name="fileUpload"></iframe>
                    <form target="fileUpload" action="file/upload" method="post" enctype="multipart/form-data">
					<div class="custom-file mb-3">
						<input type="file" class="custom-file-input" name="file" id="file1" onchange={e=>readFile(e)}/>
						<label class="custom-file-label" for="file1" id="file-label">Choose file</label>
					</div>
					<input type="submit" value="Submit" class="btn btn-primary btn-block"/>
				</form>
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

export default PopUpAddReport
