
export interface QueryResponse<T> {
    data: T[],
    links: PaginationLinks,
    metadata: QueryMeta,
}

export interface PaginationLinks {
    self: string,
    first: string,
    previous: string,
    next: string,
    last: string,
}

export interface QueryMeta {
    sortBy?: string;
    orderAsc?: string;
    pageNumber?: number;
    perPage?: number;
}