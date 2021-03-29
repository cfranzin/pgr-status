import axios from 'axios';

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})
  
export default axios.create({
    baseURL: 'http://192.168.1.109:8080'
})


