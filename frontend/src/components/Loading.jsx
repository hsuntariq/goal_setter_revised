import React from 'react'
import { Spinner } from 'react-bootstrap'
import './spinner.css'
const Loading = () => {
return (
    <>
    <div className="container-spinner">
    <Spinner animation="border" role="status" style={{width:'50px',height:'50px',margin:'auto'}}>
        <span className="visually-hidden">Loading...</span>
            </Spinner>
    </div>
    </>
)
}

export default Loading
