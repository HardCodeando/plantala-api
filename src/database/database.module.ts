import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationEntity } from './entity/configuration.entity';
import { GardenerEntity } from './entity/gardener.entity';
import { PlantDetailEntity } from './entity/plant-detail.entity';
import { PlantNotificationEntity } from './entity/plant-notification.entity';
import { PlantRegisterEntity } from './entity/plant-register.entity';
import { PlantRequestEntity } from './entity/plant-request.entity';
import { PlantEntity } from './entity/plant.entity';
import { ReportdEntity } from './entity/report.entity';
import { SensorEntity } from './entity/sensor.entity';

import { TypeOrmConfigService } from './infrastructure/services/type-orm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConfigurationEntity,
      GardenerEntity,
      PlantDetailEntity,
      PlantNotificationEntity,
      PlantRegisterEntity,
      PlantRequestEntity,
      PlantEntity,
      ReportdEntity,
      SensorEntity,
    ]),
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService, TypeOrmModule],
})
export class DatabaseModule {}
