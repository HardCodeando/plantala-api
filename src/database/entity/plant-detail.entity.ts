import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantEntity } from './plant.entity';

@Entity({ name: 'plant_details' })
export class PlantDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'binomial_nomenclature', unique: true })
  binomialNomenclature: string;

  @Column({ name: 'common_name' })
  commonName: string;

  @Column({ name: 'max_temp' })
  maxTemp: number;

  @Column({ name: 'min_temp' })
  minTemp: number;

  @Column({ name: 'max_light_lux' })
  maxLightLux: number;

  @Column({ name: 'min_light_lux' })
  minLightLux: number;

  @Column({ name: 'max_env_humid' })
  maxEnvHumid: number;

  @Column({ name: 'min_env_humid' })
  minEnvHumid: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @OneToOne(() => PlantEntity)
  @JoinColumn({ name: 'plant_id' })
  plant: PlantEntity;
}
