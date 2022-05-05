import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { PlantDetails } from 'src/plantbook/domain/models/plant-details.mode';
import { ConfigurationIRepository } from 'src/plantbook/domain/repositories/configuration.irepository';

@Injectable()
export class PlantBookService {
  private readonly plantbookUrl: string;
  private plantbookToken: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    private readonly configurationIRepostory: ConfigurationIRepository,
  ) {
    this.plantbookUrl = configService.get<string>('PLANTBOOK_URL');
    this.authenticate();
  }

  private async authenticate() {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append(
      'client_id',
      this.configService.get<string>('PLANTBOOK_CLIENT_ID'),
    );
    data.append(
      'client_secret',
      this.configService.get<string>('PLANTBOOK_SECRET'),
    );

    const plantbookResponse = await lastValueFrom(
      this.httpService.post(this.plantbookUrl + `/token/`, data),
    );

    this.plantbookToken = plantbookResponse.data.access_token;
    this.configurationIRepostory.setValues(
      'plantbookToken',
      plantbookResponse.data.access_token,
    );
  }

  private getPlantIds(commonName: string) {
    return this.httpService.get(
      this.plantbookUrl + `/plant/search?alias=${commonName}`,
      {
        headers: {
          Authorization: `Bearer ${this.plantbookToken}`,
        },
      },
    );
  }

  private getPlantsDetail(id: string) {
    return this.httpService.get(this.plantbookUrl + `/plant/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${this.plantbookToken}`,
      },
    });
  }

  async getPlants(commonName: string): Promise<PlantDetails[]> {
    try {
      const ids: string[] = await lastValueFrom(
        this.getPlantIds(commonName).pipe(
          map((plantIds) => plantIds.data.results.map((e: any) => e.pid)),
        ),
      );

      const detailsTask = ids.map((id) =>
        lastValueFrom(
          this.getPlantsDetail(id).pipe(
            map((plantDetails) => plantDetails.data),
          ),
        ),
      );

      const details = await Promise.all(detailsTask);

      return details.map(
        (detail) =>
          new PlantDetails(
            0,
            detail.pid,
            detail.alias,
            detail.max_temp,
            detail.min_temp,
            detail.max_light_lux,
            detail.min_light_lux,
            detail.max_env_humid,
            detail.min_env_humid,
            detail.image_url,
          ),
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
