# 🐳 Docker Multi-Service Web Application

A demonstration of essential Docker and Docker Compose skills, orchestrating a simple three-tier web application stack featuring a web server, a custom API, and a Redis backend.

---

## 💡 Key Docker Skills Demonstrated

This project showcases the following practical Docker competencies:

* **Docker Compose:** Defining, networking, and orchestrating multiple interdependent services (`web`, `api`, `redis`) using a single `docker-compose.yml` file.
* **Multi-Stage Builds:** Utilizing an optimized `Dockerfile` for the custom `api` service to create a small, efficient production image by separating the build environment (installing Node.js dependencies) from the final runtime environment.
* **Internal Networking:** Services communicate securely using their service names as hostnames (e.g., the `api` container connects to the `redis` container using `redis:6379`).
* **Volume Mapping:** Defining a named volume (`redis_data`) to persist data for the Redis container, ensuring that the hit counter data survives container restarts (`volumes` key).
* **Port Mapping:** Exposing specific service ports from the container to the host machine (e.g., mapping port 300 on the host to port 3000 inside the API container).

---

## ⚙️ Application Stack Overview

This application runs three containerized services:

| Service Name | Technology/Image | Exposed Host Port | Internal Container Port | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **web** | `nginx:latest` | `80` | `80` | Serves the static HTML frontend. |
| **api** | Custom Node.js (Express) | `300` | `3000` | Backend API. Handles requests and fetches/updates data from Redis. |
| **redis** | `redis:6.2-alpine` | None | `6379` | Fast, in-memory data store used to track the 'Total Hits' counter. |

---

## 🚀 Setup and Running the Application

### Prerequisites

You must have **Docker Engine** and **Docker Compose** installed on your host machine (e.g., AWS EC2).

### Instructions

1.  **Clone the Repository:**

    ```bash
    git clone [YOUR-GITHUB-REPO-LINK]
    cd docker-multi-service-app
    ```

2.  **Build and Start Services:**

    The `--build` flag ensures the custom Node.js image is built first. The `-d` flag runs the services in detached mode (in the background).

    ```bash
    docker compose up --build -d
    ```

3.  **Verify Functionality:**

    Use your EC2 instance's Public IP address (`54.234.49.78`) to verify the connections:

    * **Frontend (Web Service):** Check the static HTML page:
        `http://54.234.49.78/`

    * **API & Redis (Counter Check):** Visit the API endpoint. **Refresh this page multiple times** to verify that the `Total Hits` value increments, confirming the `api` service is successfully communicating with the `redis` container over the Docker network.
        `http://54.234.49.78:300/api/status`

4.  **Stop and Clean Up:**

    To gracefully stop and remove all containers, networks, and anonymous volumes created by Compose:

    ```bash
    docker compose down
    ```
