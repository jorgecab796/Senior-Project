import React from 'react'
import PropTypes from 'prop-types'
import ObjButton from './ObjButton'
import { Link } from 'react-router-dom';

const ObjLink = ({ linkInfo, text, onClick, doNewWindow, doLink, data }) => {
    
    // Should this button Link ("true"), or send to the same page ("false").
    doLink = (doLink === "true");
    //console.log("linkInfo:",linkInfo,"doLink",doLink, "data:", data);
    
    // Turn data into a string to pass to another page (see report.js to reportDisplay.js for structure)
    const dataString = JSON.stringify(data);    
    //console.log("dataString", dataString);
    
    
    return (
        <Link 
            to = {doLink ? {
                pathname: `${linkInfo}`,
                state: {
                    data: `${dataString}`,
                }
            } : window.location.pathname}
            target={doNewWindow ? '_blank' : '_self'}
        >
            <ObjButton                
                text={text}
                onClick={onClick}
            />
        </Link>
    )
}

ObjLink.defaultProps = {
    doNewWindow: false,
    doLink: true,
}

ObjLink.propTypes = {
    linkInfo: PropTypes.string,
    doLink: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    doNewWindow: PropTypes.bool,
}

export default ObjLink
