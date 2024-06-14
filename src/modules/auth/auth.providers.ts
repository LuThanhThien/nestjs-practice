import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { RolesGuard } from "./guards/role.guard";

function createAuthGuard(useClass: any) {
    return {
        provide: APP_GUARD,
        useClass: useClass
    }
}

export const AuthProviders = [
    createAuthGuard(AuthGuard),
    createAuthGuard(RolesGuard)
]