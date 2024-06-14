import { Status } from "../enum/status.enum";

export interface Base {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    status: Status;
}