import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlantRegisterEntity } from './plant-register.entity';

@Entity({ name: 'plants' })
export class PlantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'binomial_nomenclature', unique: true })
  binomialNomenclature: string;

  @Column({ name: 'common_name' })
  commonName: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @OneToMany(() => PlantRegisterEntity, (plantRegister) => plantRegister.plant)
  plantRegisters: PlantRegisterEntity[];
}
