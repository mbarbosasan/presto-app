import { Injectable } from '@nestjs/common';
import {UploadApiResponse, UploadApiErrorResponse, v2} from "cloudinary";
import toStream = require("buffer-to-stream");

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((err, res) => {
                if (err) reject(err);
                resolve(res);
            })
            toStream(file.buffer).pipe(upload);
        });
    }
}
