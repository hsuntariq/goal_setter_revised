import axios from 'axios';
const API_URL = 'http://localhost:2000/'
const postGoals = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    const response = await axios.post(API_URL + 'api/goals', goalData, config);
    return response.data;
}

const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    const response = await axios.get(API_URL + 'api/goals', config);
    return response.data;
    
}



const goalService = {
    postGoals,
    getGoals
}

export default goalService;