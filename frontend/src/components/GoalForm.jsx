import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { createGoal } from '../features/goalSlice';
import { useDispatch } from 'react-redux';
const GoalForm = () => {
    const [goal, setGoal] = useState('');
    const dispatch = useDispatch();

const handleGoals = (e) => {
        e.preventDefault();
        dispatch(createGoal({goal}))
        setGoal('')
    }
return (
    <>
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
                            <Button onClick={handleGoals} variant="success" className="mt-3 w-100">
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

export default GoalForm
