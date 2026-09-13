import axios from "axios";

interface IAPIServicesResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export default class APIService {
  api = axios.create({
    baseURL: "http://localhost:3000",
  });

  getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  };

  getRequest = async <T>(
    endPoint: string,
    queryParams?: Record<string, string | number>
  ): Promise<IAPIServicesResponse<T>> => {
    try {
      const response = await this.api.get<T>(endPoint, {
        params: queryParams,
        headers: this.getAuthHeaders(),
      });

      return response.data as IAPIServicesResponse<T>;
    } catch (error) {
      console.log("Error in getRequest:", error);
      return {
        success: false,
        error: "Something went wrong",
      };
    }
  };

  postRequest = async <T>(
    endPoint: string,
    body?: Record<string, any>
  ): Promise<IAPIServicesResponse<T>> => {
    try {
      const response = await this.api.post<T>(endPoint, body, {
        headers: this.getAuthHeaders(),
      });

      return response.data as IAPIServicesResponse<T>;
    } catch (error) {
      console.log("Error in postRequest:", error);
      return {
        success: false,
        error: "Something went wrong",
      };
    }
  };
}