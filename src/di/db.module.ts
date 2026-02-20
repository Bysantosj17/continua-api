import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceConfig } from "src/data/database/db.datasorce";

@Module({
    imports:[TypeOrmModule.forRoot(DataSourceConfig)]
})
export class DbModule {}
