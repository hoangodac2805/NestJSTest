import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private firebaseApp: any;
  private storage: any;

  constructor(private configService: ConfigService) {
    const firebaseConfig = {
      apiKey: this.configService.get<string>('API_KEY'),
      authDomain: this.configService.get<string>('AUTH_DOMAIN'),
      projectId: this.configService.get<string>('PROJECT_ID'),
      storageBucket: this.configService.get<string>('STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('MESSAGING_SENDER_ID'),
      appId: this.configService.get<string>('APP_ID'),
    };

    this.firebaseApp = initializeApp(firebaseConfig);
    this.storage = getStorage(this.firebaseApp);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const storageRef = ref(this.storage, file.originalname);

    // Upload the file
    await uploadBytes(storageRef, file.buffer);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL; // Return the download URL for the uploaded file
  }

  async getFileUrl(fileName: string): Promise<string> {
    const storageRef = ref(this.storage, fileName);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  getFirebaseStorage() {
    return this.storage;
  }
}
