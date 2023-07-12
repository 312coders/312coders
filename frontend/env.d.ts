/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string,
  readonly VITE_FIREBASE_AUTH_DOMAIN: string,
  readonly VITE_FIREBASE_PROJECT_ID: string,
  readonly VITE_FIREBASE_STORAGE_BUCKET: string,
  readonly VITE_FIREBASE_MESSAGE_SENDER_ID: string,
  readonly VITE_FIREBASE_APP_ID: string,
  readonly VITE_FIREBASE_MEASUREMENT_ID: string,
  readonly VITE_MONGO_REALM_APP_ID: string,
  readonly VITE_MONGO_CLUSTER_NAME: string,
  readonly VITE_MONGO_DB_NAME: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}