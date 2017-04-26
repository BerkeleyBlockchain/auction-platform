import request from "request-json";

const client = request.createClient('https://auction-backend.herokuapp.com/');

export {client};
