import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getGoals, reset } from '../features/goalSlice';
const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading,isSuccess,isError,message } = useSelector((state) => state.goals);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        if (!user) {
            navigate('/login')
        }
        dispatch(getGoals());
        dispatch(reset());
    }, [user,navigate,isError,message,dispatch,goals])

    if (isLoading) {
        return <Loading/>
    }

return (
    <>
        <h1 className='text-center'>Welcome {user && <span className='text-capitalize text-info'>{user.name}</span>} </h1>
        <GoalForm/>
        <Container>
            {goals.length > 0 ? (
                goals.map((goal)=>{
                    return (
                        <>
                            <Row>
                                <Col lg={4} md={3}>
                                    <Card>
                                        {goal.goal}
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )
                })
            ) : (
                <h4 className="text-center mt-3">You haven't set any goals</h4>
            )}
        </Container>
    </>
)
}
export default Home