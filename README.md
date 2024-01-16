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

1. Create a file with the extension `.env.local` or simply copy and paste from the `.env.local.example` file.

2. Download and run the back-end available at this link: [BackEnd](https://github.com/rocketseat-education/pizzashop-api), add the BackEnd URL in the file `.env.local`.

3. Fill in the BackEnd URL.

```bash
VITE_API_URL= URL BACKEND


Example:
VITE_API_URL=http://localhost:3333
```

To run the project locally, simply run the command below:

```bash
npm run dev
```
