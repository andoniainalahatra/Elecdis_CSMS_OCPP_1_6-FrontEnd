import axiosInstance from "@/lib/axiosInstance";

export const loginUser = async (data) => {
    // Simuler un délai de 3 secondes
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    const response = await axiosInstance.post("/token", data);
    return response.data;
  };