# Expense Tracker - Full Stack Expense Management App

Expense Tracker is a full-featured expense management application built with cutting-edge technologies to provide a seamless experience for tracking and visualizing financial data. The app leverages the power of **Next.js** for fast server-side rendering, **Redux** and **RTK Query** for state management and data fetching, **Prisma** as the ORM for database management, and several other modern tools to enhance the app's functionality. Authentication is handled using **Auth.js**, while forms are validated with **Zod** and **React Hook Form**. Expense data visualization is provided by **React Chart**.

## Features

- **Expense Management:** Track, add, edit, and delete expenses efficiently.
- **Data Visualization:** Graphical representation of your spending habits using charts.
- **Authentication:** Secure user login and signup with Auth.js.
- **Server-Side Rendering:** Fast and SEO-optimized using Next.js.
- **Form Handling and Validation:** Utilize React Hook Form and Zod for robust form validation.
- **State Management:** Powered by Redux and RTK Query for smooth data handling and caching.
- **Database Management:** Prisma as an ORM for seamless interaction with the database.

## Demo

Check out the live version of Expense Tracker: [Expense Tracker Demo](#)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sunder-kirei/expense-tracker.git
   cd expense-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    DATABASE_URL=<postgres-url>;
    AUTH_SECRET=<authjs-secret>;
    AUTH_GOOGLE_ID=<google_client_id>;
    AUTH_GOOGLE_SECRET=<google_client_secret>;
    ```

4. Set up the database using Prisma:

   ```bash
       npx prisma migrate dev
   ```

5. Run the development server:

   ```bash
       npm run dev
   ```

## Technologies Used

- ### Frontend:

  - **Next.js** - React framework for server-side rendering and static site generation.
  - **Redux** - State management library.
  - **RTK Query** - Tool for efficient data fetching and caching.
  - **React Hook Form** - Library for handling form inputs and validation.
  - **Zod** - TypeScript-first schema declaration and validation.
  - **React Chart** - Charting library for data visualization.

- ### Backend:

  - **Prisma** - ORM for interacting with the database.

- ### Authentication:

  - **Auth.js** - Handles authentication and authorization.

## Contributing

Contributions are welcome! If you'd like to improve Expense Tracker, feel free to fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.
