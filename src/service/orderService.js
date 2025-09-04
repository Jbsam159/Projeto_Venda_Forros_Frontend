import axios from "axios"

const API_URL = "http://localhost:5000/orders"

axios.interceptors.request.use((config) => {

  const token = localStorage.getItem("token")
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config

})

export const createOrder = async (token) =>{

  try {
    
    const response = await axios.post(

      `${API_URL}/add`,
      {},
      {
        headers: {Authorization: `Bearer ${token}`}
      }

    )

    return response.data

  } catch (error) {
    throw error.response ? error.response.data : error;
  }

}

export const getOrderHistory = async() => {

  try{

    const response = await axios.get(`${API_URL}/history`)
    return response.data

  }catch(error){

    throw error.response ? error.response.data : error

  }

}

export const cancelOrder = async(orderId) =>{

  try {
    const response = await axios.patch(`${API_URL}/${orderId}/cancel`)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error;
  }

}

export const reorder = async(orderId) => {

  try {
    const response = await axios.post(`${API_URL}/${orderId}/reorder`)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error;
  }

}