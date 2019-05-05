var axios = require('axios');

export default {
    // TESTS
    apiTest: () => {
        return axios.get('/api/test');
    },
    apiUser: () => {
        return axios.get('/getUser');
    },
    // TESTS

    // USER
    apiSignup: () => {
        return axios.get('/_api/signup');
    },
    apiSignin: () => {
        return axios.get('/_api/signin');
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
    }
}