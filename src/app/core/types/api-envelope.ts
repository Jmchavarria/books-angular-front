// Para respuestas de un solo objeto (GET por ID, POST, PUT, etc.)
export interface ApiSingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Para respuestas de listas paginadas
export interface ApiPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    data: T[];
    total: number;
    page: number;
    limit: number;
  };
}
