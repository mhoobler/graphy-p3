var axios = require('axios');

export default {
    apiTest: () => {
        return axios.get('/api/test');
    },
    apiUser: () => {
        return axios.get('/getUser');
    }
}