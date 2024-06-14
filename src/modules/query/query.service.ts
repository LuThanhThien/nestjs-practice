import { Repository, SelectQueryBuilder } from "typeorm";
import { QueryParams } from "./interfaces/query-param.interface";
import { PaginationLinks, QueryResponse } from "./dto/query-response.dto";


export class QueryService<T> {
    public static DEFAULT_PER_PAGE = 5;
    public static DEFAULT_PAGE_NUMBER = 1;
    public static DEFAULT_SORT_BY = "id";
    public static DEFAULT_ORDER_ASC = false;
    public static ALIAS = "table";
    public static EXCLUDES = ["id"]
    public builder: SelectQueryBuilder<T>;
    public params: QueryParams;

    constructor(
        buider: SelectQueryBuilder<T>,
        params: QueryParams,
    ) {
        this.builder = buider;
        this.params = params;
    }

    async getResponse() : Promise<QueryResponse<T>> {
        return {
            data: await this.builder.getMany(),
            links: await this.getLinks(),
            metadata: {
                ...this.params,
                orderAsc: JSON.parse(this.params.orderAsc),
                sortBy: this.params.sortBy,
                pageNumber: +this.params.pageNumber,
                perPage: +this.params.perPage,
            },
        }
    }

    async getLinks() : Promise<PaginationLinks> {
        if (!this.params) return null;
        let self: string, first: string, previous: string, next: string, last: string;
        let common : string = '';
        let { pageNumber, ...others } = this.params;
        for (let other in others) {
            common += `&${other}=${others[other]}`
        }
        const maxPageNumber = Math.ceil((await this.builder.getCount())/this.params.perPage)
        first = `pageNumber=1` + common
        self = `pageNumber=${pageNumber}` + common;
        previous = `pageNumber=${Math.max(1, pageNumber - 1)}` + common;
        next = `pageNumber=${Math.min(maxPageNumber, pageNumber + 1)}` + common;
        last = `pageNumber=${maxPageNumber}` + common;

        return {
            self: self,
            first: first,
            previous: previous,
            next: next,
            last: last,
        }
    }

    static async query<T>(repository: Repository<T>, params: QueryParams, excludes?: string[] ) : Promise<QueryService<T>> {
        if (!excludes) excludes = this.EXCLUDES;
        var queryBuilder = repository.createQueryBuilder(this.ALIAS);
        let { sortBy, orderAsc, pageNumber, perPage, ...others } = params;
        // Search
        for (let param in others) {
            try {
                if (excludes.includes(param)) continue;
                const andWhereString = `${this.ALIAS}.${param} like :${param}`
                console.log(andWhereString);
                queryBuilder = queryBuilder.andWhere(andWhereString, { [param]: `%${params[param]}%` });
            } catch (err) {
                console.error(err)
            }
        }
        // Order
        if (sortBy) {
            try {
                console.log(`${this.ALIAS}.${sortBy} ${JSON.parse(orderAsc) ? 'ASC' : 'DESC'}`)
                queryBuilder = queryBuilder.addOrderBy(`${this.ALIAS}.${sortBy}`, JSON.parse(orderAsc) ? 'ASC' : 'DESC');    
            } catch (err) {
                console.error(err)
                queryBuilder = queryBuilder
                .addOrderBy(`${this.ALIAS}.${this.DEFAULT_SORT_BY}`, this.DEFAULT_ORDER_ASC ? 'ASC' : 'DESC');
            }
        } else { queryBuilder = queryBuilder
            .addOrderBy(`${this.ALIAS}.${this.DEFAULT_SORT_BY}`, this.DEFAULT_ORDER_ASC ? 'ASC' : 'DESC'); }
        // Pagination
        const totalRecords = await queryBuilder.getCount();
        console.log("Total records: ", totalRecords);
        if (perPage && pageNumber) {
            perPage = perPage > 0 ? perPage : this.DEFAULT_PER_PAGE;
            pageNumber = pageNumber > 0 ? pageNumber : this.DEFAULT_PAGE_NUMBER;
            const limit = perPage;
            const offset = perPage  * (pageNumber - 1);
            console.log(`offset: ${offset}`)
            console.log(`limit: ${limit}`)
            queryBuilder = queryBuilder.offset(Math.max(0,offset)).limit(Math.max(0, limit));
        } else {
            const limit = this.DEFAULT_PER_PAGE;
            const offset = this.DEFAULT_PER_PAGE * (this.DEFAULT_PAGE_NUMBER - 1);
            console.log(`offset: ${offset}`)
            console.log(`limit: ${limit}`)
            queryBuilder = queryBuilder.offset(Math.max(0, offset)).limit(Math.max(0, limit));
        }
        return new QueryService(queryBuilder, params);
    }

}