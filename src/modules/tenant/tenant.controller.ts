
import { Body, Controller, Get, Post, Param, Query } from "@nestjs/common";
import { TenantService } from "./tenant.service";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { QueryParams } from "../query/interfaces/query-param.interface";

@Controller('/api/v1/tenant')
export class TenantController {

    constructor(
        private tenantService: TenantService
    ) {}

    @Post('create')
    login(@Body() createTenantDto: CreateTenantDto) {
        return this.tenantService.create(createTenantDto);
    }

    @Get()
    findAll(@Query() params: QueryParams) {
        console.log("Search by query: ", params)
        return this.tenantService.findAllByQuery(params);
    }
}