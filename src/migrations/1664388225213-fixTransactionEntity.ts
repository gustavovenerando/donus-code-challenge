import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTransactionEntity1664388225213 implements MigrationInterface {
    name = 'fixTransactionEntity1664388225213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "targetUserId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "targetUserId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "type"`);
    }

}
