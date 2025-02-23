# Career Climb Client-Side Documentation

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Pages](#pages)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Conclusion](#conclusion)

## Overview
Career Climb is a comprehensive platform designed to facilitate the recruitment process and career development for both employers and employees. The client-side application provides real-time dashboards, notifications, and AI-powered features to enhance user experience. Employers can manage job postings, track applications, and schedule meetings, while employees can monitor their application status, receive career guidance, and analyze skill gaps.

## Features

### Employer Dashboard:
Gives a rough idea of the employer activity like number of applications received, total job posts given in last month, notification received and his recent job posts.
### Job Applications Overview:
Employers can view the total number of job applications received, along with the counts of rejections and acceptances. This feature provides a quick snapshot of the recruitment process.
### Job Posts Overview: 
Employers can track the number of job posts created and view monthly trends. This helps in understanding the hiring patterns and planning future job postings.
### Real-Time Application Status: 
Employers can access live updates on the status of each job application, ensuring they are always informed about the progress.
### Notifications: 
Employers receive alerts for key actions such as when an applicant's CV is viewed, when new applications are received, and when decisions are made on applications.
### Applicant CV Viewing: 
When an employer views an applicant's CV, the respective employee receives an instant notification, keeping them informed about the interest in their application.
### Editable User Profile: 
Employers can modify their personal and company details as needed, ensuring their profile is always up-to-date.
### Job Posting Capabilities: 
Employers can create and manage job opportunity listings, making it easy to post new jobs and update existing ones.
### Meeting Scheduler: 
Employers can plan meetings directly from the dashboard, with calendar sync and guest email invitations, integrating seamlessly with Google Calendar.

### Employee Dashboard:
Briefs the employee's activity such as the amount of acceptance he got or rejections he got and again the jobs he applied for.
### Job Application Status: 
Employees can keep track of their job application progress and receive updates on the status of their applications.
### Real-Time Notifications: 
Employees receive instant notifications when employers view their CVs or make decisions on their applications, ensuring they are always informed.
### Profile and CV Management: 
Employees can edit their personal details and upload their CVs effortlessly, making it easy to keep their profile up-to-date.
### Career Roadmaps: 
Employees can access AI-generated pathways from entry-level to advanced roles in various CSE fields, providing guidance on career progression.
### Gap Analysis: 
Employees can input their proficiency in key areas and receive AI feedback on learning timelines and related job suggestions, helping them identify and address skill gaps.
### Dedicated Application Status Page: 
Employees can review detailed statuses of all their job applications in one place, making it easy to track their progress.

## Technologies Used

- **Front-End Framework**: The application is built using React.js, offering a powerful and flexible front-end solution that ensures a smooth user experience.
- **Styling**: Utilizes CSS/SCSS modules or styled-components for scalable and maintainable styling, ensuring a visually appealing and consistent interface using tailwind CSS.
- **Real-Time Communication**: Implemented via supabase real-time, providing real-time updates and notifications to keep users informed instantly.
- **API Communication**: Interfaces with RESTful APIs or GraphQL, facilitating efficient and seamless data exchange between the client and server.
- **Backend Services**: Powered by Express.js and Node.js, delivering robust server-side operations and handling complex business logic.
- **Database**: Supabase is employed for database management and real-time data synchronization, ensuring data integrity and availability.

## Project Structure

The client-side project is organized in a clear and modular structure to streamline development and maintenance:

- **/client**
  - **/.env** – Environment variables for the client-side application.
  - **/.gitignore** – Specifies files and directories to be ignored by Git.
  - **/package.json** – Contains project metadata and dependencies for the client-side application.
  - **/public** – Includes static assets and the primary `index.html` file, serving as the entry point for the application.
    - **/favicon.ico** – Favicon for the application.
    - **/index.html** – Main HTML file for the application.
    - **/logo192.png** – Logo image.
    - **/manifest.json** – Web app manifest file.
    - **/robots.txt** – Robots exclusion protocol file.
  - **/src** – Contains the source code for the client-side application.
    - **/App.js** – Main application component.
    - **/App.test.js** – Test file for the main application component.
    - **/Assets** – Directory for asset files such as images, fonts, etc.
    - **/Auth** – Directory for authentication-related components and utilities.
    - **/Component** – Contains reusable UI components.
      - **/ProfileComponents** – Components related to user profiles.
      - **/RandomComponents** – Miscellaneous components such as login, signup, etc.
      - **/ApplicationComponent** – Components related to job applications.
      - **/LandingComponents** – Components for the landing page.
      - **/CareerComponents** – Components related to career roadmaps and skill boosts.
      - **/DashboardComponents** – Components for the dashboard.
      - **/JobPost** – Components for job posting.
      - **/Roadmap** – Components related to career roadmaps.
    - **/index.css** – Global CSS file.
    - **/index.js** – Entry point for the React application.
    - **/reportWebVitals.js** – Performance measuring utility.
    - **/setupTests.js** – Test setup file.
    - **/UI** – Directory for UI-specific components and utilities.
  - **/tailwind.config.js** – Configuration file for Tailwind CSS.

## Installation

Follow these steps to set up the project:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Career-Climb
   ```
3. Install the necessary dependencies:
   - Using npm:
     ```bash
     npm install
     ```
   - Or using yarn:
     ```bash
     yarn install
     ```
4. Start the development server:
   - Using npm:
     ```bash
     npm start
     ```
   - Or using yarn:
     ```bash
     yarn start
     ```

## Environment Variables

Create a `.env` file in the root of the project and configure the following variables:
- `GEMINI_API_KEY` - API key for Gemini.
- `REACT_APP_API_BASE_URL` – Base URL for API endpoints.
- `REACT_APP_SUPABASE_URL` – URL for Supabase instance.
- `REACT_APP_SUPABASE_ANON_KEY` – Anonymous key for Supabase authentication.
- `REACT_APP_API_URL` – URL for API endpoints.
- `REACT_APP_GOOGLE_ID` – Google client ID for authentication.
- Additional configuration variables for authentication, endpoints, and other services can be added as needed.

## Pages

### Employer-Specific Pages

- **Employer Dashboard**: View applicants statistics, including jobs posted, applications received and total recruited.
- **Profile Page**: Update personal and organizational details.
- **Applicants Detail**: Analyze applicants information to see if he fits for the job and set meeting schedules.
- **Recent Post**: Post a job and edit or delete it.

### Employee-Specific Pages

- **Employee Dashboard**: Track job application statuses, shows user activity like acceptance and rejections of job applications and receive real-time notifications.
- **Profile Page**: Edit personal information and manage CV uploads.
- **Career Roadmaps & Gap Analysis**: Access AI-generated career paths and personalized gap analysis reports.
- **Application Status Page**: See a detailed breakdown of all applications and communication history.

## State Management

The project leverages state management tools like Redux or the Context API to ensure robust data handling:

- **Global State**: Manages core data such as user details, notifications, and live job application statuses.
- **Local State**: Handled within individual components for UI-specific data, ensuring efficient and localized state management.

## API Integration

API interactions are centralized in the services layer:

- **Authentication**: Secure login, registration, and session management.
- **Job Posting & Application Management**: Facilitate CRUD operations on job listings and applications.
- **Notifications**: Ensure real-time updates via RESTful API endpoints.

The separation of concerns keeps business logic apart from presentation layers for easier maintenance and scalability.

## Conclusion

Career Climb’s client-side application is engineered to enhance the recruitment and career development experience through real-time data, comprehensive dashboards, and intelligent AI-assisted features. Its modular design and robust integrations ensure that both employers and employees can seamlessly manage their interactions and advance their professional journeys.


