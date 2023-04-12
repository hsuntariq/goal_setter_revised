import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiOutlinePoweroff} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login')
        dispatch(logout())
    }
return (
<>
        <Navbar bg='light' expang='lg' >
            <Navbar.Brand className='ms-3'>
                <img style={{
                    width: '75px',
                }} src="https://static.javatpoint.com/essay/images/my-aim-in-life-essay.png" alt="" />
            </Navbar.Brand>
            <Nav className='ms-auto'>
                {user? <Nav.Link>
                        <img style={{
                        width: '50px',
                        height: '50px',
                        borderRadius:'50%'
                        
                        }} src={user.pic} alt="" />
                        <AiOutlinePoweroff onClick={handleLogout} className="text-danger" style={{fontSize:'2rem'}} />
            </Nav.Link> : (<><Nav.Link>
                <Link to='/login'>
                    Login
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/register'>
                    Register
                </Link>
                        </Nav.Link>
        </>)
            }
            
            </Nav>
        </Navbar>
</>
);
}

export default Header;