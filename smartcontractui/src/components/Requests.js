import request from 'request-json';

var client = request.createClient('https://auction-backend.herokuapp.com/');

export {client};
