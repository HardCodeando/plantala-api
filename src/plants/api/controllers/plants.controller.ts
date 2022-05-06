import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPlantsInteractor } from '../../interactor/get-plants';

@ApiTags('Plants')
@Controller('plants')
export class PlantsController {
  constructor(private readonly getPlansInteractor: GetPlantsInteractor) {}

  @Get()
  async getPlants(@Query('commonName') commonName: string) {
    const plants = await this.getPlansInteractor.handle({
      commonName,
    });

    return plants;
  }
}
