# WhatToCook API

Below are the steps to make the project API work.


## Installation

### Setting up the database

1. Make sure Docker is installed on your machine.

2. `docker pull postgres`

3. `docker run --name SQLWhatToCook --restart on-failure -e POSTGRES_PASSWORD=<YourPassword> -e POSTGRES_USER=root -e POSTGRES_DB=WhatToCook -p 5432:5432 -d postgres`

### Implementation of the API

1. Change the .env with the IP address and password of the database in the location: HOST && PASSWORD

2. `npm install`

3. `npm run initDB`

4. `npm run dev`
