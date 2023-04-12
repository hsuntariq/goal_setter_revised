import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { reset, register } from '../features/authSlice'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import userImage from '../assets/user.webp'
import '../css/styles.css'
import {BsPlusCircleFill} from 'react-icons/bs'
const Register = () => {
    // image upload
    const [image,setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const validateImage = e => {
        const file = e.target.files[0];
        if(file > 102484320){
            alert('file size should be smaller')
        } else {
            const img = URL.createObjectURL(file);
            setImagePreview(img);
            setImage(file);
        }
    }
    const [formFields, setFormFields] = useState({
    name:'',email:'',password:'',c_password:''
})

    // validate the image
    
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
    
    // upload to cloudinary
    
    const uploadImage = async() => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'vgvxg0kj');
        let res = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
            method: 'post',
            body:data,
        })
        const urlData = await res.json();
        return urlData.url;
    }

    // handle the form data
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // url for image
        const pic = await uploadImage(image);
        // check for matching passwords
        if (password !== c_password) {
            alert('password do not match');
        } else {
            const userData = {
                name,email,password,pic
            }
            dispatch(register(userData));
        }
        // console.log(url)
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
                <div className="image-container">
                    <img width="100%" name="image" src={imagePreview?imagePreview:userImage} alt="" />
                    <input name='image' type="file" onChange={validateImage} accept="image/png,image/jpg" />
                    <BsPlusCircleFill className='icon'/>
                </div>
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