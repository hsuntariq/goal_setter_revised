import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
const Home = () => {
    const [goal, setGoal] = useState('');
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    },[user,navigate])
return (
    <>
        <h1 className='text-center'>Welcome {user && <span className='text-capitalize text-info'>{user.name}</span>} </h1>
        <Container>
            <Row>
                <Col lg={4} md={6}  className="m-auto shadow p-4">
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Enter Your Goal For Today
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your Goal..."
                                value={goal}
                                onChange = {(e)=>setGoal(e.target.value)}
                            />
                            <Button variant="success" className="mt-3 w-100">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
)
}
export default Home