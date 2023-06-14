import {BadRequestException, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {Express} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {CloudinaryService} from "./cloudinary/cloudinary.service";
@Controller('images')
export class ImageController {

    constructor(private cloudinaryService: CloudinaryService) {

    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.cloudinaryService.uploadImage(file).catch((error) => {
            console.log(error);
            throw new BadRequestException(error.message);
        })
    }
}