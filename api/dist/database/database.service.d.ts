import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    getPool(): Pool;
}
