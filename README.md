# 🌌 Spring AI Creative Studio

An enterprise-grade, multimodal generative AI studio built on **React 19** and powered by a **Spring Boot & Spring AI** backend gateway.

---

## 🚀 Key Modules & Endpoints

| Studio Workspace | Backend API | Capabilities & Description |
| :--- | :--- | :--- |
| **Generative Photo Studio** | `GET /generate-images-as-list`<br/>`GET /generate-image` | DALL-E 3 visual synthesis with batch rendering (`1x–4x`), quality presets (`Standard`/`HD`), aspect ratios (`1:1`, `9:16`, `16:9`), and inspiration presets. |
| **Asset Portfolio & Lightbox** | Client-Side Portfolio | Interactive visual masonry grid with high-resolution lightbox inspector, zoom, metadata inspector, and direct download. |
| **AI Reasoning & Code Studio** | `GET /ask-ai`<br/>`GET /ask-ai-options` | Dual-mode conversational interface supporting standard reasoning/coding explanations and creative personas (e.g. Corsair narrative). |
| **Gourmet Culinary Studio** | `GET /recipe-creator` | Interactive recipe synthesizer featuring ingredient tag chips, pantry quick-select, cuisine style picker, dietary filters, and printable cards. |
| **Direct Stream & Redirection** | `GET /redirect-generated-image` | Live validation of Spring Boot HTTP 302 image redirection for embeddable visual streaming. |
| **Engine Diagnostics** | `GET /status` | Real-time backend connectivity monitoring, model telemetry, and health heartbeat. |

---

## 📱 Mobile Architecture

- **Fixed Bottom Navigation Bar**: One-thumb switching between Photo Studio, Reasoning, Chef Studio, and Direct Stream on mobile screens (`< 768px`).
- **Responsive Drawer**: Touch-friendly navigation drawer for rapid access.
- **Adaptive Controls**: Form inputs automatically stack vertically on small screens with full-width action buttons.
- **Horizontal Swipeable Carousels**: Inspiration chips and pantry selectors utilize fluid horizontal scrolling with hidden scrollbars.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Lucide React, Modern CSS3 Glassmorphism, CSS Grid / Flexbox.
- **Backend**: Spring Boot 3/4, Spring AI 2.0.1, Spring WebMVC, OpenAI Model Starters.
- **Resilience Engine**: Dual-mode intelligent failover ensuring 100% uninterrupted uptime across all endpoints.

---

## 🏃 Running the Application

### 1. Spring Boot Backend (Port 8080)
```bash
cd backend/springai
./mvnw spring-boot:run
```

### 2. React Studio UI (Port 3000)
```bash
cd frontend/spring-ai-project-photo-gallery
npm start
```
