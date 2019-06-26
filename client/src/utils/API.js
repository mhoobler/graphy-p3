var axios = require('axios');

export default {
    // TESTS
    // apiTest: () => {
    //     return axios.get('/api/test');
    // },
    getUser: () => {
        return axios.get('/getUser');
    },
    // TESTS

    // USER
    apiSignup: (data) => {
        console.log(data);
        return axios.post('/_api/signup', data);
    },
    apiSignin: (data) => {
        console.log("signin");
        return axios.post('/_api/signin', data);
    },
    //USER

    //CHART
    apiName: (term) => {
        return axios.get('/api/search/' + term);
    },
    apiTicker: (term) => {
        return axios.get('/api/tickers/' + term);
    },
    apiAlpha: (term) => {
        return axios.get('/api/alpha/' + term);
    },
    getPins: (symbol) => {
        return axios.get('/api/pin/'+ symbol);
    },
    postPin: (data) => {
        return axios.post('/api/pin', data);
    }
}