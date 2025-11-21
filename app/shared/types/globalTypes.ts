export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    statusCode: number;
    meta?: any;
    errors?: any;
}
