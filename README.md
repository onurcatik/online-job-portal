# Full-Stack Online Job Portal Application

## Overview
This project is a **full-stack online job portal** built from the ground up using modern technologies. The application provides a seamless job search and hiring experience for **clients** (job seekers) and **admins** (job creators).

The system includes:
- **Job Listings & Filtering**
- **User Authentication & Session Management**
- **Resume Upload & Storage**
- **Company Management**
- **Application Tracking System**
- **Email Notifications for Application Status**

The application is built with **Next.js**, **ShadCN UI**, **Clerk Authentication**, **Prisma ORM**, **MongoDB**, **UploadThing** for file storage, and **Google Generative AI** for content generation. The application is deployed on **Vercel**.

---
## Technologies Used

| Technology      | Purpose                                      |
|----------------|----------------------------------------------|
| **Next.js**   | Full-stack React framework for frontend and backend |
| **ShadCN UI** | UI components for a materialistic design     |
| **Clerk**     | User authentication & session management     |
| **Prisma ORM** | Database ORM for interacting with MongoDB   |
| **MongoDB**   | NoSQL database for job and user data storage |
| **UploadThing** | File storage solution for resumes & attachments |
| **Google Generative AI** | AI-generated job descriptions & company details |
| **Framer Motion** | Smooth animations for filtering and UI interactions |
| **Vercel**    | Deployment platform for hosting the application |
| **BEE Free**  | Email template generation for application notifications |

---
## Features
### 1. **Client Side (Job Seekers)**
- View job listings with search and filtering options (title, category, experience, job type, remote/hybrid, etc.).
- Save favorite jobs and companies.
- Apply for jobs with an uploaded resume.
- Manage multiple resumes and set a "live resume" for applications.
- Track applied jobs and follow companies.
- Update user profile information (name, email, etc.).

### 2. **Admin Side (Job Creators & Managers)**
- Create, update, and delete jobs.
- Manage companies and their details.
- Track job applicants and review resumes.
- Change job status (publish/unpublish).
- Generate job descriptions using AI based on keywords.
- Send email notifications for selected/rejected candidates.

---
## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB database (local or cloud)
- Vercel CLI (optional for deployment)

### 1. Clone the Repository
```sh
 git clone https://github.com/your-repo/job-portal.git
 cd job-portal
```

### 2. Install Dependencies
```sh
 npm install
 # or
 yarn install
```

### 3. Configure Environment Variables
Create a **.env.local** file in the root directory and add the required environment variables:
```sh
DATABASE_URL=mongodb+srv://your-mongodb-url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_PUBLIC_KEY=your-uploadthing-public
NEXT_PUBLIC_GOOGLE_AI_KEY=your-google-ai-key
EMAIL_SERVICE_USER=your-email@example.com
EMAIL_SERVICE_PASSWORD=your-email-password
```

### 4. Run Database Migrations
```sh
 npx prisma migrate dev --name init
```

### 5. Start the Development Server
```sh
 npm run dev
 # or
 yarn dev
```
The application should now be running on `http://localhost:3000`

---
## Deployment
### Deploy on Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Login to Vercel:
   ```sh
   vercel login
   ```
3. Deploy the project:
   ```sh
   vercel
   ```

---
## Usage Guide
### 1. **Client Perspective**
- **Landing Page**: Lists top companies, recommended jobs, and job categories.
- **Search & Filters**: Jobs can be searched by keywords or filtered by category, experience, work mode, etc.
- **Job Details**: View job descriptions, company details, and apply with an uploaded resume.
- **Profile Management**: Edit personal information, manage resumes, and track job applications.

### 2. **Admin Perspective**
- **Dashboard**: Manage jobs, companies, and applicants.
- **Job Creation**: Add a job with AI-generated descriptions and tags.
- **Manage Applicants**: Review resumes, change job status, and send email notifications.

---
## API Routes
### Authentication (Clerk)
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login user
- `POST /api/auth/logout` – Logout user

### Jobs
- `GET /api/jobs` – Fetch all jobs
- `GET /api/jobs/:id` – Fetch a single job by ID
- `POST /api/jobs` – Create a new job (admin only)
- `PUT /api/jobs/:id` – Update job details (admin only)
- `DELETE /api/jobs/:id` – Delete job (admin only)

### Applications
- `POST /api/applications` – Apply for a job
- `GET /api/applications/:userId` – Get user’s applications
- `PUT /api/applications/:id` – Update application status (admin only)

### Companies
- `GET /api/companies` – Fetch all companies
- `POST /api/companies` – Create a new company (admin only)
- `PUT /api/companies/:id` – Update company details

### Resumes
- `POST /api/resumes/upload` – Upload resume
- `DELETE /api/resumes/:id` – Delete resume

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature-branch`)
5. Create a Pull Request

