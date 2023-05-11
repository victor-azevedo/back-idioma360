| [:gb:](README.md) | [:brazil:](README_pt.md) |

# Idioma 360 - Back-end

Back-end for Idioma 360, a language course manager. :earth_americas:

![Cover ](/../../../../front-idioma360/blob/main/doc/cover.png)

## About

Idioma 360 is a comprehensive web application designed for the management of a language course platform. This versatile platform caters to two distinct user roles: administrators and students.

With Idioma 360, administrators have full control over the platform's functionalities. They can effortlessly create, edit, and delete courses, classes, selection processes, and exams. This ensures that administrators have the necessary tools to maintain and enhance the learning experience for students.

Students, on the other hand, benefit from the user-friendly interface of Idioma 360. They have the ability to apply for various selection processes and participate in corresponding tests. This empowers students to actively engage in the language learning journey and showcase their knowledge and skills.

Idioma 360 aims to facilitate selection processes for both organizers and participants. This platform is designed to streamline and simplify the entire selection process experience, benefiting both the organizers and the participants involved.

You can access the front-end repository at [Front-End APP](https://github.com/victor-azevedo/front-idioma360)

## Deploy

You can access the application deploy [here](https://idioma360.vercel.app).
Please note that, as it is a free deployment, there might be a longer loading time when starting the application ⏳. We appreciate your patience 🙏!

## How to run

### Locally Option:

#### Requirements

Have Node.js (recommended version: 16.20.0) and PostgresSQL (recommended version: 15.2) installed in your machine.

1. Clone this repository;

```bash
git clone git@github.com:victor-azevedo/back-idioma360.git
cd back-idioma360/
```

2. Install all dependencies:

```bash
npm i
```

3. Create a `.env` file based in `.env.example`;

4. Compile Typescript code, migrate and seed database:

```bash
npm run build && npm run migration:run && npm run seed
```

5. Start application:

```bash
npm start
```

Application default PORT: 4000.

### Docker Option:

#### Requirements

Have Docker and Docker Compose installed.

1. Clone this repository;

```bash
git clone git@github.com:victor-azevedo/back-idioma360.git
cd back-idioma360/
```

2. Create a `.env` file based in `.env.example`;

3. Run Docker Compose file:

```bash
sudo docker compose up
```

Application default PORT: 4000.
