# 🍕 pizza.shop

Front-end of the food delivery app (also known as IFood/Uber Eats). Developed with React and TypeScript.

## Install and run the project

Running pizza.shop on your local machine is an extremely simple task. Clone the project to your local repository.

Global dependencies

You need to have a main dependency installed:

- Node.js LTS v18 (or any higher version)

Do you use `nvm?` Then you can run `nvm install` in the project folder to install and use the most appropriate version of Node.js.

Local dependencies

So after downloading the repository, don't forget to install the project's local dependencies:

```bash
npm install
```

Run the project

- Create a file with the extension `.env.local` or simply copy and paste from the `.env.local.example` file.

- Download and run the back-end available at this link: [BackEnd](https://github.com/rocketseat-education/pizzashop-api), add the BackEnd URL in the file `.env.local`.

- Fill in the BackEnd URL.

```bash
VITE_API_URL= URL BACKEND


Example:
VITE_API_URL=http://localhost:3333
```

To run the project locally, simply run the command below:

```bash
npm run dev
```

## Features

- it should be able to register a new restaurant
- it should be able to sign in as a restaurant manager
- it should be able to register as a new customer
- it should be able to crete an order to the restaurant
- it should be able to manage the restaurant menu
- it should be able to manage the restaurant evaluations
- it should be able to leave an evaluation
- it should be able to manage the restaurant orders
- it should be able to update the restaurant public profile
- it should be able to open/close the restaurant
- it should be able to list metrics from the restaurant
