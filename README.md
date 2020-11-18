# DigiBonds

## Getting Started

In the `package.json` file, following 'scripts' are available:

`dev` - Runs `next dev` which starts Next.js in development mode
`build` - Runs `next build` which builds the application for production usage
`start` - Runs `next start` which starts a Next.js production server

## Fetch Source code and Install Packages

Clone the project
```sh
$ git clone git@github.com:Kundestyrt-G17/digibonds.git
```

Enter the bonds folder
```sh
$ cd digibonds
```

Install dependencies
```sh
$ yarn
```

## Database

There are many ways of getting hold of a development mongodb database. The easiest way is to run a docker container with mongodb. For this, you need docker and docker-compose installed.

`Docker` - Install from https://docs.docker.com/get-docker
`docker-compose` - Install from https://docs.docker.com/compose/install

The project comes with a `docker-compose.yml` that will start the mongodb database.
```sh
$ docker-compose up -d
```

Another solution is to create a development database on a cloud service like Atlas https://www.mongodb.com/cloud/atlas. Atlas can be used to host both development and production databases.

## Environment Variables
There are a few environment variables needed to allow the backend to speak to the database, and an application secret needed to ensure that session tokens work securely. These secrets should be located in \texttt{.env} file in the root of the project.

```sh
# Copy shell .env-local file to .env
$ cp .env-local .env

# Use a text editor to edit the following fields
# The DATEBASE_X fields are your database credentials
# The APPLICATION_SECRET is a random string you should generate
DATABASE_USER=<INSERT>
DATABASE_PASSWORD=<INSERT>
DATABASE_NAME=<INSERT>
APPLICATION_SECRET=<RANDOM STRING>
```


## Build and Run Project
Use the following commands to run and build the project
```sh
# Start development server
$ yarn dev

# Build production build
$ yarn build

# Run production server
$ yarn start
```

Open `http://localhost:5000` to view the development or production server.
