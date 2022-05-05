import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationEntity } from 'src/database/entity/configuration.entity';
import { ConfigurationIRepository } from 'src/plantbook/domain/repositories/configuration.irepository';

import { Connection, Repository } from 'typeorm';

export class ConfigurationRepository implements ConfigurationIRepository {
  constructor(
    @InjectRepository(ConfigurationEntity)
    private readonly configurationRepository: Repository<ConfigurationEntity>,
    private readonly connection: Connection,
  ) {}

  async setValues(name: string, value: string): Promise<void> {
    await this.configurationRepository.upsert(
      [
        {
          name,
          value,
        },
      ],
      ['name'],
    );
  }

  async getValues(name: string): Promise<string> {
    const config = await this.configurationRepository.findOne({
      where: {
        name,
      },
    });
    return config.name;
  }
}
