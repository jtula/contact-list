import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactSchema } from './schema/contact.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:admin@localhost:27017', { dbName: 'contactdb'}), 
            MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
