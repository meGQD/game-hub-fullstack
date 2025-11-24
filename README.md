# 🎮 Game Hub

[![Django Badge](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis Badge](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker Badge](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitLab Badge](https://img.shields.io/badge/GitLab-ffffff?style=for-the-badge&logo=gitlab&logoColor=orange)](https://www.gitlab.com/)
[![Prometheus Badge](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io/)
[![Grafana Badge](https://img.shields.io/badge/Grafana-F2F4F9?style=for-the-badge&logo=grafana&logoColor=orange)](https://grafana.com/)

A full-stack web application for discovering video games, built with a modern, containerized architecture. This platform allows users to browse a vast library of games, view detailed information, and manage their personal favorites.

![Game Hub Demo](assets/Games-demo.gif)

---

## ✨ Features

- **Extensive Game Library:** Browse thousands of games with detailed information powered by the RAWG API.
- **Advanced Search & Filtering:** Easily find games by searching, or filter by genre and platform.
- **User Authentication:** Secure user registration and login system using JWT.

  ![User Registration Demo](assets/Auth-demo.gif)

- **Personalized Profiles:** Users can update their personal information and view their collection of favorite games.
- **Favoriting System:** Logged-in users can add or remove any game from their personal favorites list.
- **Fully Containerized:** The entire application stack (Frontend, Backend, Database, Cache) is containerized with Docker for a seamless and consistent development and production environment.
- **Optimized for Production:** Includes a production-ready setup with Gunicorn, Nginx, and Redis caching.
- **Monitoring & Observability:** Integrated Prometheus for metrics collection and Grafana for visualization, providing real-time insights into database statistics, backend latency, CPU usage, and system resources.

  ![Grafana Dashborad Demo](assets/Grafana-dashboard.gif)

## 🛠️ Tech Stack

The project is built with a modern, decoupled architecture using the following technologies:

### Backend

| Category           | Technology                                                                                                      |
| :----------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Framework**      | [Django](https://www.djangoproject.com/), [Django Rest Framework](https://www.django-rest-framework.org/)       |
| **Authentication** | [Djoser](https://djoser.readthedocs.io/), [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/) |
| **Database**       | [PostgreSQL](https://www.postgresql.org/) with [Psycopg2](https://www.psycopg.org/)                             |
| **Caching**        | [Redis](https://redis.io/) with [django-redis](https://github.com/jazzband/django-redis)                        |
| **Web Server**     | [Gunicorn](https://gunicorn.org/) with [Gevent](http://www.gevent.org/) workers                                 |

### Frontend

| Category             | Technology                                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Framework**        | [React](https://reactjs.org/)                                                                               |
| **Language & Build** | [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)                                  |
| **UI Library**       | [Chakra UI](https://chakra-ui.com/), [React Icons](https://react-icons.github.io/react-icons/)              |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/), [TanStack Query (React Query)](https://tanstack.com/query/latest) |
| **API Client**       | [Axios](https://axios-http.com/)                                                                            |
| **Routing**          | [React Router](https://reactrouter.com/)                                                                    |
| **Form Handling**    | [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation                 |

### Infrastructure

| Category             | Technology                                                                            |
| :------------------- | :------------------------------------------------------------------------------------ |
| **Containerization** | [Docker](https://docker.com/), [Docker Compose](https://docs.docker.com/compose/)     |
| **CI/CD Automation** | [GitLab(CI/CD)](https://www.gitlab.com/)                                              |
| **Web Server/Proxy** | [Nginx](https://www.nginx.com/)                                                       |
| **Monitoring**       | [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/)                 |

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You must have the following software installed on your machine:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Installation & Setup

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/megqd/game-hub-fullstack.git](https://github.com/megqd/game-hub-fullstack.git)
    cd game-hub-fullstack
    ```

2.  **Create the Environment File**
    Create a `.env` file in the root of the project. You can copy the example file:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your database credentials, a Django SECRET_KEY, and your RAWG_API_key.

3.  **Build and Run with Docker Compose**
    This command will build the Docker images for the frontend and backend and start all the necessary services.

    ```bash
    docker-compose up --build -d
    ```

    The application should now be running.

    - **Frontend:** [http://localhost:3001](http://localhost:3001)
    - **Backend API:** [http://localhost:8001/api/](http://localhost:8001/api/)

4.  **One-Time Database Setup (Important)**
    After the containers are running for the first time, you need to set up the database. Open a **new terminal window** and run the following commands:

    - **Seed the Database with Games:** This command will populate the database with games from the RAWG API. This is a long-running process.
      ```bash
      docker compose exec backend python manage.py seed_db
      ```

Your application is now fully set up and ready to use!

---

## 🎈 Usage

- Open your browser and go to `http://localhost:3001`.
- Filter games by Genres and Platforms from the sidebars.
- Use the search bar to find specific games by name.
- Click on a game card to navigate to its detailed view.
- Click on the user icon in the top-right to register a new account or sign in.

**Once signed-in, you can:**

- Click the heart icon on any game to add it to your favorites.
- Access your profile page to change your information or view your list of favorite games.

---

## 🔄 CI/CD Pipeline

This project uses a GitLab CI/CD pipeline to automate builds and deployments. The pipeline is structured into `beta` (automatic) and `prod` (manual) environments.

The pipeline's main jobs are:

* **Build (Automatic):** On every push, new Docker images for the frontend and backend are built and pushed to the GitLab Container Registry.
* **Deploy Beta (Automatic):** The latest build is automatically deployed to the `beta` environment using `docker-compose.yml`.
* **Deploy Prod (Manual):** Requires a manual trigger from the GitLab UI to deploy the `prod` environment using its specific `docker-compose.cicd.yml`.
* **Data Fetch (Manual):** An optional job to run `manage.py seed_db` and populate the database on either environment.

---
## 📊 Monitoring Setup
This project includes a comprehensive monitoring stack using Prometheus and Grafana to provide insights into system performance, resource usage, and application metrics. The setup includes exporters for collecting metrics from the node (system-level) and PostgreSQL database.

### Components and Access
- **Grafana Dashboard:** The primary interface for visualizing metrics. Access it at [http://localhost:3002](http://localhost:3002). Default credentials are usually `admin/admin` (change them after first login). Here, you can view pre-configured dashboards for database table counts, registered users, backend API latency, CPU usage, swap memory, and more.
- **Prometheus:** The metrics storage and querying system. Access the Prometheus UI at [http://localhost:9091](http://localhost:9091) to query raw metrics or check targets.
- **Alertmanager:** Handles alerts generated by Prometheus. Access it at [http://localhost:9095](http://localhost:9095) to view and manage alerts.
- **Node Exporter:** Collects system-level metrics (e.g., CPU, memory, disk). Exposed at [http://localhost:9101/metrics](http://localhost:9101/metrics).
- **Postgres Exporter:** Collects database-specific metrics (e.g., table counts, query performance). Exposed at [http://localhost:9188/metrics](http://localhost:9188/metrics).

### How It Works
- **Metrics Collection:** Prometheus scrapes metrics from the exporters at regular intervals.
- **Visualization:** Grafana connects to Prometheus as a data source and displays interactive dashboards. The provided screenshots show examples of the Database/Backend Latency panel and Node Exporter metrics.
- **Customization:** You can add more panels or alerts in Grafana as needed. For production, consider securing access and persisting data volumes.

You can import grafana dashboard from http://localhost:3002/dashboard/import and choose grafana.json file from the project root.

If you're running in a production environment, ensure ports are properly configured and secured.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/megqd/game-hub-fullstack/issues) if you'd like to contribute.

## 📬 Contact

[MohammadReza Karimi] - [mrk272727mrk@gmail.com]

Project Link: [https://github.com/megqd/game-hub-fullstack](https://github.com/megqd/game-hub-fullstack)
