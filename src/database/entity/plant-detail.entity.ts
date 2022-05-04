import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plant_details' })
export class PlantDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'binomial_nomenclature' })
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
  imageUrl: number;
}
