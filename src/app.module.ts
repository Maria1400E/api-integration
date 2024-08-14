import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/api-integration'), 
  ApiModule],
})
export class AppModule {}
