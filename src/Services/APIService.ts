import axios from "axios";

interface IAPIServicesResponse<T> {
    success : boolean;
    data?: T;
    error?: string;
}

export default class APIService {
  api = axios.create({
    baseURL: "http://localhost:3000",
  });

  getRequest = async <T>(endPoint : string , queryParams?: Record<string, string>) : Promise<IAPIServicesResponse<T>> => {
    try{
        const response = await this.api.get<T>(endPoint, { params: queryParams });
        return response.data as IAPIServicesResponse<T>;
    } catch(error){
        console.log("Error in getRequest:", error);
        return { success: false, error: "Something went wrong" };
    }
  }
  postRequest = async <T>(endPoint : string , body?: Record<string, any>) : Promise<IAPIServicesResponse<T>> => {
    try{
        const response = await this.api.post<T>(endPoint, body);
        return response.data as IAPIServicesResponse<T>;
    } catch(error){
        console.log("Error in postRequest:", error);
        return { success: false, error: "Something went wrong" };
    }
  }
}
