import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { LogbookModule } from './logbook/logbook.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileStorageModule } from './file-storage/file-storage.module';
import { SpotifyModule } from './spotify/spotify.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    BlogModule,
    LogbookModule,
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/personal-website'),
    FileStorageModule,
    SpotifyModule,
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
