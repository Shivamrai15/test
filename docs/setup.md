Here's the revised version of your text with grammatical errors corrected:

---

# **Project Setup**

## 1. Initial Setup

- Clone this repo:

```bash
https://github.com/gulatiy/iic-employee-management-backend
```

- Run the following command:

```bash
npm i
```

## 2. Database (MongoDB) Setup

- Sign up to [MongoDB](https://account.mongodb.com/account/login)

- Click on the "Create" button
<p align="center">
    <img src="../assets/Screenshot 2025-04-03 185851.png" alt="Logo">
</p>

- Create a free cluster with the following configuration:
<p align="center">
    <img src="../assets/Screenshot 2025-04-03 190252.png" alt="Logo">
</p>

- Obtain a connection string.
- Store the connection string in a `.env` file:

```bash
DATABASE_URL="{connection_string}/iic"
```

## 3. ORM (Prisma) Setup

Run the following commands to push the schema to the database:

```bash
npx prisma generate
npx prisma db push
```

## 4 Email provider (Resend) Setup

- Sign up to [Resend](https://resend.com/signup)
- Click on Add API Key button
<p align="center">
    <img src="../assets/Screenshot 2025-04-07 201915.png" alt="Logo">
</p>

- Store the API key in the `.env` file

```bash
RESEND_API_KEY="{api_key}"
```

## 5. env File Setup

Add random token and origin in the `.env` file

```bash
ORIGIN='http://localhost:3000'
JWT_SECRET="98qw27hdkhewwed82hjdwu2jkwdl023p"
JWT_ISSUER="http://localhost:3000"
```

## 6. Start the Server

To start the server, run:

```bash
npm run start
```
