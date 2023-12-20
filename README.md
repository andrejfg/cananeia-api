# 🚀 API Template with Bun and Elysia 

This project is a starting point for building a robust API, using modern technologies to provide an efficient development experience.

## Included Technologies

### [Bun](https://bun.sh/) 
Bun is the chosen JavaScript runtime environment for this project.

### [ElysiaJS](https://elysia.dev/)
ElysiaJS is the web framework used, focused on providing the best development experience with minimal overhead. Supercharged by Bun, it comes with built-in support for Swagger, making API documentation accessible at "/swagger".

### [Prisma](https://www.prisma.io/)
Prisma is the chosen ORM for data management. It simplifies database interaction, offering a powerful and efficient abstraction layer.

### [Eslint](https://eslint.org/)
Eslint is configured to ensure consistent development and follow code standards. Keep your code clean and organized with this linting tool.

### Database: PostgreSQL
PostgreSQL is used as the database for this project. It provides a robust and scalable solution for managing data.

### MVC Pattern
This template follows the Model-View-Controller (MVC) pattern to organize code in a modular way, making project maintenance and expansion easier.

## Getting Started

This project depends on Bun and Docker. With both installed, follow the steps below:

1. Clone the project:
   ```sh
   git clone https://github.com/your-username/template-api.git
   ```
2. Install dependencies:
   ```sh
   bun i
   ```
3. Start Postgres Docker and initialize database
   ```sh
   docker-compose up -d
   bun migrate
   ```
4. Start application
   ```sh
   bun dev
   ```

## Post configurations

### Docker
  Set your own postgres password and make sure your .env is updated to the new password.

## Why Elysia?

![ElysiaJS](https://elysiajs.com/assets/feature-sheet.webp)

## Contribution
  Open to contributions! If you have ideas to improve this API template, you are welcome!

📬 Contact
- Name: André Felipe Guimarães
- Email: [andrefg.dev@gmail.com](mailto:andrefg.dev@gmail.com)
- LinkedIn: [andrefg](https://www.linkedin.com/in/andrefg/)