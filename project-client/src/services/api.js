import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/api';

async function fetchHelloWorld() {
  try {
    const response = await axios.get(`${ROOT_URL}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default fetchHelloWorld;
