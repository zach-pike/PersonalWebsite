import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileStorage, FileStorageDocument } from './schemas/fileupload.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { NewFileInfoDTO } from './dto/newfileinfo.dto';

@Injectable()
export class FileStorageService {
    constructor(@InjectModel(FileStorage.name) private readonly fileUploadModel: Model<FileStorageDocument>) {}

    async findFile(id: string) {
        let a = this.fileUploadModel.findById(id);
        let doc = await a.exec();
        return doc;
    }

    async newUpload(
        user: string,
        data: Buffer<ArrayBufferLike>,
        origFileName: string,
        size: number,
    ): Promise<NewFileInfoDTO | null> {
        // create the file stream
        let toc = Date.now();
        let uuid = crypto.randomUUID();
        let extension = path.extname(origFileName);

        let storageFolder = path.join(process.cwd(), 'storage');
        let filename = `${uuid}-${toc}${extension}`;

        try {
            let fstream = fs.createWriteStream(path.join(storageFolder, filename));
            fstream.write(data);
            fstream.end();

            let fileDocObj: FileStorage = {
                fileUUID: uuid,
                originalFileName: origFileName,
                owner: user,
                size: size,
                uploaded: toc
            };

            let fileDoc = new this.fileUploadModel(fileDocObj);
            let saved = await fileDoc.save();

            return {
                id: saved._id as string,
                newName: filename
            };
        } catch(e) {
            return null;
        }


    }
}
