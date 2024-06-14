import { Inject, Injectable } from "@nestjs/common";
import { Tenant } from "./tenant.entity";
import { Repository } from "typeorm";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { QueryParams } from "src/modules/query/interfaces/query-param.interface";
import { QueryService } from "src/modules/query/query.service";
import { QueryResponse } from "../query/dto/query-response.dto";

@Injectable()
export class TenantService {
    constructor(
        @Inject('TENANTS_REPOSITORY')
        private tenantRepository: Repository<Tenant>,
    ) {}

    async findAll(): Promise<Tenant[]> {
        return this.tenantRepository.find();
    }

    async findAllByQuery(params: QueryParams) : Promise<QueryResponse<Tenant>> {
        let queryBuilder = await QueryService.query(this.tenantRepository, params);
        return await queryBuilder.getResponse();
    }

    async findById(id: number): Promise<Tenant> {
        return this.tenantRepository.findOneBy({
            id: id
        });
    }

    async findByEmail(email: string): Promise<Tenant> {
        return this.tenantRepository.findOneBy({
            email: email
        });
    }

    async create(tenantDto: CreateTenantDto): Promise<Tenant> {
        const tenant = this.tenantRepository.create(tenantDto);
        return this.tenantRepository.save(tenant);
    }

    async updateAndGet(id: number, userData: Partial<Tenant>): Promise<Tenant> {
        await this.tenantRepository.update(id, userData);
        return this.tenantRepository.findOneBy({
            id: id
        });
    }
}