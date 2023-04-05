import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
return (
    <>
    <Spinner animation="border" role="status" style={{width:'200px',margin:'auto'}}>
        <span className="visually-hidden">Loading...</span>
    </Spinner>
    </>
)
}

export default Loading
