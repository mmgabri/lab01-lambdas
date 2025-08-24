import axios from 'axios';

const apiUser = axios.create({    
  //baseURL: 'http://10.0.2.2:9000/users',
   baseURL: 'https://y4tny8add8.execute-api.us-east-1.amazonaws.com/Prod/users',
   headers: {
    'x-api-key' : ''
  }
});

const apiAnuncio = axios.create({
// baseURL: 'http://10.0.2.2:9000/anuncios',
 baseURL: 'https://y4tny8add8.execute-api.us-east-1.amazonaws.com/Prod/anuncios',
  headers: {
    'x-api-key' : ''
  }
});

const apiChat = axios.create({
  //baseURL: 'http://10.0.2.2:9000/chats',
  baseURL: 'https://y4tny8add8.execute-api.us-east-1.amazonaws.com/Prod/chats',
  headers: {
    'x-api-key': ''
  }
});

export { apiUser, apiAnuncio, apiChat };