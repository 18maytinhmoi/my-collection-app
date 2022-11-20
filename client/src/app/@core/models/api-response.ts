export enum ApiResponseStatus {
  Loading = 'loading',
  Success = 'success',
  Failure = 'failure',
}

export interface ApiResponse<T> {
  status: ApiResponseStatus;
  data: T;
  error: unknown;
}
