import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GardenerEntity } from './gardener.entity';

@Entity({ name: 'plant_requests' })
export class PlantRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'binomial_nomenclature' })
  binomialNomenclature: string;

  @Column({ name: 'common_name' })
  commonName: string;

  @ManyToOne(() => GardenerEntity, (gardener) => gardener.plantRequests)
  @JoinColumn({ name: 'gardener_id' })
  gardener: GardenerEntity;
}
