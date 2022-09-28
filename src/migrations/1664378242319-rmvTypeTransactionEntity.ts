import { MigrationInterface, QueryRunner } from "typeorm";

export class rmvTypeTransactionEntity1664378242319 implements MigrationInterface {
    name = 'rmvTypeTransactionEntity1664378242319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "type"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "type" character varying NOT NULL`);
    }

}
