
<center>
<img src="https://ratathune.fr/assets/logo-Qisau-ub.png" height="150px"/>
<h1><a href="https://ratathune.fr">Ratathune</a></h1>
</center>
**Ratathune** is a [tricount](https://www.tricount.com/fr/faire-les-comptes-entre-amis) clone made in [React](https://fr.react.dev) and [Adonis.js](https://adonisjs.com). Ratathune helps you manage your expenses with your colleagues, friends, relatives...
⚠️ This project is a **parody**, don't take it to seriously.
## How to access to the project ?
- [ratathune.fr](https://ratathune.fr)
## How to work on it ?
### 1. Front-end
```bash
git clone https://github.com/Courtcircuits/Rathatune-client
cd Rathatune-client
npm install
npm run dev
```
### 2. Back-end
```bash
git clone https://github.com/Courtcircuits/ratathune-server
cd ratathune-server
```
You then need to create a `.env` file and provide the following values to your environment variables : 
```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=<your-app-key>
DRIVE_DISK=s3
DB_CONNECTION=pg
PG_HOST=0.0.0.0
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB_NAME=ratathune
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=http://localhost:3333/google/callback
FRONTEND_URL=http://localhost:5173
S3_KEY=<your-s3-key>
S3_SECRET=<your-s3-secret>
S3_BUCKET=ratathune
S3_REGION=europe-west1
S3_ENDPOINT=http://localhost:9000
```
Then go back to your terminal and type the following commands : 
```bash
mkdir postgres-data minio-data # to persist your database and s3 data
docker compose up -d # to create your database and s3
node ace migration:run # it will provision your database with the correct schema
npm run dev
```
**🚀 You're all set !**
## About the project
Check the technical documentation of Ratathune on [my Notion](https://courtcircuits.notion.site/Ratathune-78de08a32fb242338f7d3f42a681f9b0?pvs=4).
## How to contribute ?
Please, don't.