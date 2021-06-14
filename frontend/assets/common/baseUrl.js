import { Platform } from 'react-native';

//Production
//let baseURL = 'https://shoply-server-matan.herokuapp.com/api/v1/';

let baseURL = 'http://870248e19f8d.ngrok.io/api/v1/';
// let baseURL = '';

// {Platform.OS == 'android' 
// ? baseURL = 'http://10.0.2.2:3000/api/v1/'
// : baseURL = 'http://localhost:3000/api/v1/'
// }

export default baseURL;