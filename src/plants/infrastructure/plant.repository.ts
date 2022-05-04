import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from 'src/database/entity/plant.entity';
import { Connection, Repository } from 'typeorm';

export class PlantRepository {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    private readonly connection: Connection,
  ) {}
}
