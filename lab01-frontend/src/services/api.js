import axios from 'axios';

const apiUser = axios.create({    
  baseURL: 'http://10.0.2.2:9000/users',
   //baseURL: 'https://7by5338q75.execute-api.us-east-1.amazonaws.com', 
   headers: {
    'x-api-key': 'r3dyO2gc4764VraHmaedLay80GjJfTid4Z4VcwIF'
  }
});

const apiAnuncio = axios.create({
  baseURL: 'http://10.0.2.2:9000/anuncios',
  //baseURL: 'https://7by5338q75.execute-api.us-east-1.amazonaws.com',
  headers: {
    'x-api-key': 'r3dyO2gc4764VraHmaedLay80GjJfTid4Z4VcwIF'
  }
});

const apiChat = axios.create({
  baseURL: 'http://10.0.2.2',
  //baseURL: 'https://7by5338q75.execute-api.us-east-1.amazonaws.com',
  headers: {
    'x-api-key': 'r3dyO2gc4764VraHmaedLay80GjJfTid4Z4VcwIF'
  }
});

export { apiUser, apiAnuncio, apiChat };