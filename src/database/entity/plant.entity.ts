import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantDetail } from './plant-detail.entity';
import { PlantRegister } from './plant-register.entity';

@Entity({ name: 'plants' })
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'binomial_nomenclature' })
  binomialNomenclature: string;

  @Column({ name: 'common_name' })
  commonName: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @OneToMany(() => PlantRegister, (plantRegister) => plantRegister.plant)
  plantRegisters: PlantRegister[];

  @OneToOne(() => PlantDetail)
  @JoinColumn({ name: 'plant_detail_id' })
  plantDetail: PlantDetail;
}
