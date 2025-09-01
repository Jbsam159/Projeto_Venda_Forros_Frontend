import axios from "axios"

const API_URL = "http://localhost:5000/orders"

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