import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigurationIRepository } from './domain/repositories/configuration.irepository';
import { ConfigurationRepository } from './infrastructure/repositories/configuration.repository';
import { PlantBookService } from './infrastructure/services/plantbook.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [
    PlantBookService,
    {
      provide: ConfigurationIRepository,
      useClass: ConfigurationRepository,
    },
  ],
  exports: [PlantBookService],
})
export class PlantBookModule {}
