import './appointments.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Axios from 'axios'
import {Link, useParams} from "react-router-dom";

const ConfirmSchedule = () => {

    const { doc, type, date, time } = useParams();

    const submitAppointment = () => {
        Axios.post('https://telemedicine5a-backend.herokuapp.com/appointments/addAppointments', {
        doctorUID: doc,
        type: type,
        date: date,
        time: time,
        }).then((response) => {
            console.log(response)
        });
    }

    

    return (
    <div className='appointments'>
        <Navbar/>
        <div className='Appointments-container-outer'>
        <div className='Appointments-container-inner'>

            <h2>{ type } Appointment Scheduled for { date }</h2>
            <h2>at { time } with { doc }</h2>

            <div className="buttons-container">

                <Link to={'/NoAppointments'}>
                    <button type="button" class="btn btn-success" onClick={submitAppointment}>Continue</button>
                </Link>

                {" "}

                <Link to={`/DoctorSearch`}>
                    <button type="button" class="btn btn-primary">Start Over</button>
                </Link>

            </div>
            
        </div>
        </div>
        <Footer/>
    </div>
    )
}

export default ConfirmSchedule;