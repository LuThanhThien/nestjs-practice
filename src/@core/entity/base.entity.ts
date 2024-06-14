import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../enum/status.enum";

export class BaseModel {

  @Column()
  @CreateDateColumn({ 
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP(6)" 
  })
  createdAt: string;

  @UpdateDateColumn({ 
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP(6)", 
    onUpdate: "CURRENT_TIMESTAMP(6)" 
  })
  lastModifiedAt: string;

  @Column()
  status: Status = Status.ACTIVE;

  static fromJson<T>(entityClass : T, json: any): T {
    //TODO: Implement fromJson
    return null;
  }

  static toJson(object: any): any {
    return object.toJSON();
  }

}