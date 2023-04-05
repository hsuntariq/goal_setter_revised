import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading';
const Home = () => {
    const { user,isLoading } = useSelector((state) => state.auth);
    
return (
    <>
        <h1 className='text-center'>Welcome {user && <span className='text-capitalize text-info'>{user.name}</span>} </h1>
    </>
)
}
export default Home