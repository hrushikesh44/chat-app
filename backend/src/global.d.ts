declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    MONGODB_URI: string;
    PORT: number;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_BUCKET_NAME: string;
  }
}

declare namespace global {
  interface Express {
    Multer: {
      file;
    };
  }
}
