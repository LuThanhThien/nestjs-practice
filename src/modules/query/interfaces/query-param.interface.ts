// https://stackoverflow.com/questions/578380/url-query-string-convention-for-multiple-sort


export interface QueryParams {
    [key: string]: string | number | boolean | string[] | undefined | null;
    sortBy?: string;
    orderAsc?: string;
    pageNumber?: number;
    perPage?: number;
} 