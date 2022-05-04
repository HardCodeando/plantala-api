import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './entity/configuration.entity';
import { Gardener } from './entity/gardener.entity';
import { PlantDetail } from './entity/plant-detail.entity';
import { PlantNotification } from './entity/plant-notification.entity';
import { PlantRegister } from './entity/plant-register.entity';
import { PlantRequest } from './entity/plant-request.entity';
import { Plant } from './entity/plant.entity';
import { Report } from './entity/report.entity';
import { Sensor } from './entity/sensor.entity';

import { TypeOrmConfigService } from './infrastructure/services/type-orm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Configuration,
      Gardener,
      PlantDetail,
      PlantNotification,
      PlantRegister,
      PlantRequest,
      Plant,
      Report,
      Sensor,
    ]),
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class ConfigurationModule {}
