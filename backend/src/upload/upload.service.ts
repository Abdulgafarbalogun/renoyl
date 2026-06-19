import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  private readonly preset: string;

  constructor(private config: ConfigService) {
    this.preset = this.config.get<string>('CLOUDINARY_UPLOAD_PRESET') ?? 'renoyl-preset';
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    return new Promise((resolve, reject) => {
      cloudinary.uploader.unsigned_upload(
        dataUri,
        this.preset,
        { resource_type: 'image' },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        },
      );
    });
  }
}
