# AsyncRace

## UI Deployment link

UI Deployment link : (https://async-race-2024.netlify.app/)
This project was deployed with Netlify.com

## Checklist

Score calculation- (370 points)

### Basic Structure (85 points)

#### 1 View Configuration (30 points)

- [x] Two Views (10 points): App contains two primary views: "Garage" and "Winners".
- [x] Garage View Content (5 points): The "Garage" view displays its name, the current page number, and the total number of cars in the database (how many car user has in his garage).
- [x] Winners View Content (5 points): The "Winners" view similarly displays its name, the current page number, and the total count of records in the database (how many records the winners table contains).
- [x] Persistent State (10 points): The view state remains consistent when navigating between views. This includes preserving page numbers and input states. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc.

#### 2. Garage View Functionality (55 points)

##### Car Management (45 points)

- [x] CRUD Operations (20 points): Enable users to create, update, and delete cars, and display the list of cars. A car has two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners".
- [x] Color Selection (10 points): Allow color selection from an RGB palette (like here), displaying the selected color on the car's image along with its name.
- [x] Management Buttons (5 points): The buttons near each car's image for updating its attributes or deleting it was provided.
- [x] Pagination (10 points): Pagination for the "Garage" view, displaying 7 cars per page was implemented.

##### Car Generation (10 points)

- [x] Random Car Creation (10 points): There is a button to create random cars (100 cars per click). Name assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color also generated randomly.

### Car Animation (50 points)

- [x] Engine Control Buttons (10 points): Exist start/stop engine buttons near each car's image.
- [x] Start Engine Animation (20 points): User clicks to the engine start button -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.
- [x] Stop Engine Animation (10 points): User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place.
- [x] Button States (5 points): Start engine button disabled in case car is already in driving mode. As well as stop engine button disabled when car is on it's initial place.
- [x] Responsive Animation (5 points): Ensure car animations are fluid and responsive on screens as small as 500px.

### Race Animation (35 points)

- [x] Start Race Button (15 points): The button to start the race for all cars on the current page was implemented.
- [x] Reset Race Button (10 points): The button to reset the race, returning all cars to their starting positions was created.
- [x] Winner Announcement (10 points): After some car finishes first user implemented showing the message contains car's name that shows which one has won.

### Winners View (45 points)

- [x] Display Winners (15 points): After some car wins it displayed at the "Winners view" table.
- [x] Pagination for Winners (10 points): Implemented pagination for the "Winners" view, with 10 winners per page.
- [x] Winners Table (10 points): The table include columns for the car's №, image, name, number of wins, and best time in seconds. If the same car wins more than once the number of wins incremented while best time should be saved only if it's better than the stored one.
- [x] Sorting Functionality (10 points): Allow users to sort the table by the number of wins and best time, in ascending or descending order.

### Application Architecture (40 points)

- [x] Modular Design (40 points): The application clearly divided into logical layers, such as API interaction, UI rendering, and state management.

### Dynamic Content Generation (30 points)

- [x] JavaScript-Generated HTML Content (30 points): Content dynamically generated using directives in Angular and dynamic properties and attributes

### Single Page Application (25 points)

- [x] SPA Implementation (25 points): The application a Single Page Application (SPA) was created with using Angular v17.3.4. All content generated using TypeScript with strict and noImplicitAny settings enabled in tsconfig.json, ensuring seamless user experience without page reloads during navigation.

### Bundling and Tooling (20 points)

- [x] Use of Webpack or Similar (20 points): The application was created with using [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4. and include "builder": "@angular-devkit/build-angular:application".

### Code Quality and Standards (15 points)

- [x] Eslint with Airbnb Style Guide (15 points): Code adhere to the Airbnb ESLint configuration to maintain code quality, as outlined in the Airbnb style guide. There are no ESLint errors or warnings. Using 'ng lint' get "All files pass linting."

### Code Organization and Efficiency (15 points)

- [x] Function Modularization (10 points): Code organized into small, clearly named functions with specific purposes. Each function doesn`t have more than 40 lines, reflecting strong typing and avoiding the use of magic numbers or strings.
- [x] Code Duplication and Magic Numbers (5 points): Minimize code duplication and maintain readability by avoiding the use of magic numbers or strings throughout the codebase.

### Prettier and ESLint Configuration (10 points)

- [x] Prettier Setup (5 points): Prettier is correctly set up with two scripts in package.json: format for auto-formatting and ci:format for checking issues.
- [x] ESLint Configuration (5 points): ESLint is configured with the Airbnb style guide. A lint script in package.json runs ESLint checks. Configuration files should reflect strict TypeScript settings as per tsconfig.json.

### Overall Code Quality (..)

(Up to 35 points) Discretionary points awarded by the reviewer based on overall code quality, readability

## General

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

Use UI Deployment link : (https://async-race-2024.netlify.app/)
or
run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

For started server: You should clone the (https://github.com/mikhama/async-race-api) and start server with 'npm start' and keep the server running during the functionality review.
