import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PlantRegister } from './plant-register.entity';
import { PlantRequest } from './plant-request.entity';
import { Report } from './report.entity';
import { Sensor } from './sensor.entity';

@Entity({ name: 'gardeners' })
export class Gardener {
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

  @OneToMany(() => PlantRegister, (plantRegister) => plantRegister.plant)
  registeredPlants: PlantRegister[];

  @OneToMany(() => PlantRequest, (plantRequest) => plantRequest.gardener)
  plantRequests: PlantRequest[];

  @OneToMany(() => Report, (report) => report.gardener)
  reports: Report[];

  @OneToMany(() => Sensor, (sensor) => sensor.gardener)
  sensors: Sensor[];
}
