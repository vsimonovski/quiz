# Full stack typescript application for entertainment

### Project structure

- [01-documentation](/01-documentation) - contains project documentation
- [02-resources](/02-resources) - contains db dump file along with postman collection and UI mock
- [03-back-end](/03-back-end) - contains back-end code used for API creation
- [04-front-end](/04-front-end) - contains front-end code used for UI

### Project setup

#### Database

- Project requires MariaDB, therefore MariaDB needs to be available system wide
- Import Quiz database from [dump-quiz-202107041413.sql](/02-resources/dump-quiz-202107061939.sql) file

#### BE

- Create .env file in main 03-back-end directory according to .env.SAMPLE file
- Generate keys with names user-auth.private, user-auth.public, user-refresh.private, user-refresh.public and place them inside 03-back-end/keystore directory
- Navigate to 03-back-end directory
- Run `yarn install` in order to install required dependencies
- Run `yarn start` in order to start BE server

#### FE

- Navigate to 04-front-end directory
- Run `yarn install` in order to install required dependencies
- Run `yarn start` in order to start FE

#### Usage

* Open browser and go to localhost:3000
* You can create new user, use existing one vsimonovski/test123 or play with username only