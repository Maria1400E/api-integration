import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('create')
  async create(@Body() createApiDto: CreateApiDto) {
    return this.apiService.create(createApiDto);
  }

  @Get('all')
  async findAll() {
    return this.apiService.findAll();
  }

  @Get('fetch-and-save')
  async fetchAndSaveDataFromAPI() {
    return this.apiService.fetchAndSaveDataFromAPI();
  }
}


