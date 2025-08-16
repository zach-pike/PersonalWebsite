import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageController } from './file-storage.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileStorage, FileStorageSchema } from './schemas/filestorage.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        MongooseModule.forFeature([{ name: FileStorage.name, schema: FileStorageSchema }]),
        ServeStaticModule.forRoot({
          rootPath: path.join(process.cwd(), 'storage'),
          serveRoot: '/file-storage/file/'
        }),
    ],
    providers: [FileStorageService, AuthService],
    controllers: [FileStorageController]
})
export class FileStorageModule {}
