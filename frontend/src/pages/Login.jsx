import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { reset,login } from '../features/authSlice'
const Login = () => {
    const [formFields,setFormFields] = useState({
        email: '',password:'',
    })

    const { email, password } = formFields;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, message, isSuccess, isLoading,isError } = useSelector(state => state.auth);

    const handleChange = (e) => {
        setFormFields((prevVal)=>({
            ...prevVal,
            [e.target.name] : e.target.value,
        }))
    }

    useEffect(() => {
        if (isError) {
            console.log(message)
        } if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset());
    },[user, message, isSuccess, isLoading,isError,navigate,dispatch])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const userData = {
            email,password
        }
        dispatch(login(userData));
    }
    if(isLoading){
        return <Loading/>
    }
return (
    <>
        <Container className="mt-5 col-lg-4 col-md-6 m-auto rounder shadow border">
            <Form className="p-5">
                <h1 className="text-center">
                    Login
                </h1>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Please Enter Your Registerd Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password..."
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button onClick={handleSubmit} className="w-100 mt-2" variant="success">
                    Login
                </Button>

            </Form>
        </Container>
    </>
)
}
export default Login