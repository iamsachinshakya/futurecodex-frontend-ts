import { IUserEntity } from "@/app/modules/users/types/IUserTypes";

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface UserPaginatedData {
    data: IUserEntity[];
    pagination: PaginationMeta;
}