import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlantRegisterEntity } from './plant-register.entity';
import { PlantRequestEntity } from './plant-request.entity';
import { ReportdEntity } from './report.entity';
import { SensorEntity } from './sensor.entity';

@Entity({ name: 'gardeners' })
export class GardenerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @OneToMany(() => PlantRegisterEntity, (plantRegister) => plantRegister.plant)
  registeredPlants: PlantRegisterEntity[];

  @OneToMany(() => PlantRequestEntity, (plantRequest) => plantRequest.gardener)
  plantRequests: PlantRequestEntity[];

  @OneToMany(() => ReportdEntity, (report) => report.gardener)
  reports: ReportdEntity[];

  @OneToMany(() => SensorEntity, (sensor) => sensor.gardener)
  sensors: SensorEntity[];
}
