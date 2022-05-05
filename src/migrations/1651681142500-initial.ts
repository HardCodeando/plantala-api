import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1651681142500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE configurations(
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            value TEXT NOT NULL);

        CREATE TABLE gardeners(
            id SERIAL NOT NULL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(320) UNIQUE NOT NULL);
    

        CREATE TABLE plants(
            id SERIAL NOT NULL PRIMARY KEY,
            binomial_nomenclature VARCHAR(100) UNIQUE,
            common_name VARCHAR(50),
            image_url TEXT);

        CREATE TABLE plant_details(
            id SERIAL NOT NULL PRIMARY KEY,
            binomial_nomenclature VARCHAR(100) UNIQUE,
            common_name VARCHAR(50),
            max_temp INTEGER,
            min_temp INTEGER,
            max_light_lux INTEGER,
            min_light_lux INTEGER,
            max_env_humid INTEGER,
            min_env_humid INTEGER,
            image_url TEXT,
            plant_id INTEGER,
            CONSTRAINT fk_plant_id
                FOREIGN KEY(plant_id) 
                    REFERENCES plants(id)
                    ON DELETE SET NULL);   
          
        CREATE TABLE plant_registers(
                id SERIAL NOT NULL PRIMARY KEY,
                register_date TIMESTAMPTZ,
                plant_id INTEGER,
                gardener_id INTEGER,
                CONSTRAINT fk_plant
                    FOREIGN KEY(plant_id) 
                        REFERENCES plants(id)
                        ON DELETE SET NULL,
                CONSTRAINT fk_gardeners
                    FOREIGN KEY(gardener_id) 
                        REFERENCES gardeners(id)
                        ON DELETE SET NULL); 

        CREATE TABLE plant_notifications(
            id SERIAL NOT NULL PRIMARY KEY,
            date TIMESTAMPTZ,
            reason TEXT,
            plant_register_id INTEGER,
            CONSTRAINT fk_plant_register
                FOREIGN KEY(plant_register_id) 
                    REFERENCES plant_registers(id));
       
        CREATE TABLE plant_requests(
            id SERIAL NOT NULL PRIMARY KEY,
            binomial_nomenclature VARCHAR(100),
            common_name VARCHAR(50),
            gardener_id INTEGER,
            CONSTRAINT fk_gardeners
                FOREIGN KEY(gardener_id) 
                    REFERENCES gardeners(id)
                    ON DELETE SET NULL);

        CREATE TABLE reports(
            id SERIAL NOT NULL PRIMARY KEY,
            description TEXT,
            date TIMESTAMPTZ,
            gardener_id INTEGER,
            CONSTRAINT fk_gardeners
                FOREIGN KEY(gardener_id) 
                    REFERENCES gardeners(id)
                    ON DELETE SET NULL);

        CREATE TABLE sensors(
            id SERIAL NOT NULL PRIMARY KEY,
            bondingDate TIMESTAMPTZ,
            synchronized BOOLEAN,
            gardener_id INTEGER,
            CONSTRAINT fk_gardeners
                FOREIGN KEY(gardener_id) 
                    REFERENCES gardeners(id)
                    ON DELETE SET NULL);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE sensors;
        DROP TABLE reports;
        DROP TABLE plant_requests;  
        DROP TABLE plant_notifications;
        DROP TABLE plant_registers;
        DROP TABLE plant_details;
        DROP TABLE plants; 
        DROP TABLE configurations;
        DROP TABLE gardeners;
    `);
  }
}
