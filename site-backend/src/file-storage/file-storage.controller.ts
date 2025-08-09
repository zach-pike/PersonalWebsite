import { Controller, Get, HttpException, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage, memoryStorage } from 'multer';
import path from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtUser } from 'src/auth/interfaces/jwtuser.interface';
import { PermissionGuard } from 'src/auth/permission.guard';
import { FileStorageService } from './file-storage.service';

@Controller('file-storage')
export class FileStorageController {
    constructor(private readonly fileStorageService: FileStorageService) {}

    @Get('info/:docId')
    @UseGuards(AuthGuard, PermissionGuard('admin.uploadFile.fileInfo'))
    async getFile(@Param('docId') docId: string) {
        let fileInfo = await this.fileStorageService.findFile(docId);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: {
            fileSize: 100 * 1024 * 1024 // 100 MB
        }
    }))
    @UseGuards(AuthGuard, PermissionGuard('admin.uploadFile'))
    async uploadFile(@Request() { user } : { user: JwtUser }, @UploadedFile() file: Express.Multer.File) {
        let res = await this.fileStorageService.newUpload(user._id, file.buffer, file.originalname, file.size);

        if (!res) throw new HttpException("Failed to save file", 500);
        return res;
    }
}
