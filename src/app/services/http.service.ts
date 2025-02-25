import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
import { HttpException } from '../exceptions/http-exception';

export class HttpService {
  public axios: AxiosInstance;

  constructor(config?: CreateAxiosDefaults<any>) {
    this.axios = axios.create(config);
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          const path: string = error.config.url;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (!path.includes('/auth/login')) {
            window.location.href = '/auth/login';
          }
        }
        throw error;
      },
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axios.get<T>(url, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }

  async post<T = any>(
    url: string,
    data?: { [key: string]: any },
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.axios.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }

  async patch<T = any>(
    url: string,
    data?: { [key: string]: any },
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.axios.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }

  async put<T = any>(
    url: string,
    data?: { [key: string]: any },
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.axios.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }

  async delete<T = any>(url: string, config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axios.delete<T>(url, config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(err.response?.data, err.response?.status);
    }
  }
}
