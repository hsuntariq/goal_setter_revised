import axios from 'axios'
const API_URL = 'http://localhost:2000';

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/api/user/register`,userData);
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data; 
}

const logout = ()=>{
    return localStorage.removeItem('user');
}

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/api/user/login`,userData);
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data; 
}

const authService = {
    register,
    logout,
    login
}

export default authService;