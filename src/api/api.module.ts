import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ApiSchema } from './entities/api.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Api', schema: ApiSchema }])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule implements OnModuleInit {
  constructor(private readonly apiService: ApiService) {}

  async onModuleInit() {
    try {
      await this.apiService.fetchAndSaveDataFromAPI();
      console.log('Data from API saved successfully.');
    } catch (error) {
      console.error('Error fetching and saving data from API:', error);
    }
  }
}

