import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { reset, register } from '../features/authSlice'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
const Register = () => {
    const [formFields, setFormFields] = useState({
    name:'',email:'',password:'',c_password:'',
})

    // initialize the navigate and useDispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get the app states from the authslice using useSelector
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    // destructure the formfields
    const { name, email, password, c_password } = formFields;

    // useEffect to check for state change

    useEffect(() => {
        if (isError) {
            console.log(message);
        }if(isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());  
    }, [user, isError, isSuccess, message, dispatch, navigate]);
    
    // handle the form data
    const handleSubmit = (e)=>{
        e.preventDefault();
        // check for matching passwords
        if (password !== c_password) {
            alert('password do not match');
        } else {
            const userData = {
                name,email,password
            }
            dispatch(register(userData));
        }

    }
    // handle the state values
    const change = (e) => {
        setFormFields((prevVal) => ({
            ...prevVal,
            [e.target.name] : e.target.value,
        }))
    }
    if(isLoading){
        return <Loading/>
    }
return (
    <>
        <Container className="col-lg-4 m-auto mt-4">
            <Form className="p-3 rounded shadow border">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="text"
                name="name"
                placeholder="Please Enter Your Name"
                value={name}
                onChange={change}
                />
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type="email"
                name="email"
                placeholder="Please Enter Your Email"
                value={email}
                onChange={change}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={change}
                />
                <Form.Label>Conform Password</Form.Label>
                <Form.Control 
                type="password"
                name="c_password"
                placeholder="password"
                value={c_password}
                onChange={change}
                />
                <Button onClick={handleSubmit} 
                type="submit"
                variant="success"
                className="w-100 mt-3">
                    Register
                </Button>
            </Form>
        </Container>
    </>
)
}
export default Register