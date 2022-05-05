import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlantBookModule } from 'src/plantbook/plantbook.module';
import { PlantsController } from './api/controllers/plants.controller';
import { PlantIRepository } from './domain/repositories/plant.irepository';
import { PlantRepository } from './infrastructure/repositories/plant.repository';
import { GetPlantsInteractor } from './interactor/get-plants';

@Module({
  imports: [DatabaseModule, HttpModule, PlantBookModule],
  controllers: [PlantsController],
  providers: [
    GetPlantsInteractor,
    {
      provide: PlantIRepository,
      useClass: PlantRepository,
    },
  ],
})
export class PlantsModule {}
