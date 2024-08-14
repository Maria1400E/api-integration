import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Api } from './entities/api.entity';

@Injectable()
export class ApiService {
  constructor(@InjectModel('Api') private readonly apiModel: Model<Api>) {}

  async create(api: Api): Promise<Api> {
    const createdUser = new this.apiModel(api);
    return createdUser.save();
  }

  async findAll(): Promise<Api[]> {
    return this.apiModel.find().exec();
  }

  async fetchAndSaveDataFromAPI(): Promise<Api[]> {
    try {
      const { data } = await axios.get('https://retoolapi.dev/K9xduq/data');
      const apis = data.map((api) => ({
        id: api.id,
        name: api.name,
        email: api.email,
        lastname: api.lastname,
        profession: api.profession,
      }));
      const insertedApis = await Promise.all(apis.map(async (api) => {
        try {
          const updatedApi = await this.apiModel.findOneAndUpdate(
            { email: api.email },
            api,
            { upsert: true, new: true }
          );
          return updatedApi.toObject();
        } catch (error) {
          console.error(`Error updating API with email 😁 ${api.email}: ${error.message}`);
          return null;
        }
      }));
  
      return insertedApis.filter(api => api !== null) as Api[];
    } catch (error) {
      throw new Error(`Error fetching and saving data from API: ${error.message}`);
    }
  }
  
}



