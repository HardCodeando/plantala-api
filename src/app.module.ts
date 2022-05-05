import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GardenModule } from './garden/garden.module';
import { PlantsModule } from './plants/plants.module';
import { SensorsModule } from './sensors/sensors.module';
import { TypeOrmConfigService } from './database/infrastructure/services/type-orm.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    DatabaseModule,
    AuthModule,
    GardenModule,
    PlantsModule,
    SensorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
