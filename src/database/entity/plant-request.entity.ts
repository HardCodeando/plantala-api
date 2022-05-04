import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gardener } from './gardener.entity';

@Entity({ name: 'plant_requests' })
export class PlantRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'binomial_nomenclature' })
  binomialNomenclature: string;

  @Column({ name: 'common_name' })
  commonName: string;

  @ManyToOne(() => Gardener, (gardener) => gardener.plantRequests)
  @JoinColumn({ name: 'gardener_id' })
  gardener: Gardener;
}
