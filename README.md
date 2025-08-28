# Jobby App  

A robust **Job Search Application** built with React that utilizes API integrations, authentication, routing, and filters to provide users with a seamless job hunting experience.

***

## Project Overview  

In this project, let's build a **Jobby App** by applying the concepts learned so far. Users can login, view a home page, search and filter jobs, check job details, and navigate smoothly through a protected route structure.

***

## Demo Videos  

<div align="center">  
  <h4>Success View</h4>  

https://github.com/user-attachments/assets/2a11af41-86c6-448a-bb49-189a7d8b6b05

  <h4>Failure View</h4>  
  

https://github.com/user-attachments/assets/bbfe8b34-19d8-4007-a893-3b7bb7708f7a



***

## Features  

- **Login & authentication flow** with API validation and error handling  
- **Protected routes**: Login required to access Home, Jobs, and Job Details pages  
- **Home page** with user profile and navigation to Jobs page  
- **Jobs page** with filtering options by employment type, salary range, and search keyword  
- **Job Details page** showing detailed info and similar jobs  
- **Error handling and retry** for API fetch failures  
- **Responsive layout** designed for various screen sizes  

***

## Setup Instructions  

```bash
# Clone the repo
git clone https://github.com/your-username/jobby-app.git
cd jobby-app

# Install dependencies
npm install

# Start the development server
npm start
```

App will run at [http://localhost:3000](http://localhost:3000)

***

## Usage  

- Use valid credentials to login:  
  - Username: `rahul`  
  - Password: `rahul@2021`  
- Navigate between Login, Home, Jobs, and Job Details routes  
- Apply filters on Jobs page and search jobs by title  
- Click on job cards to view details  
- Logout to return to Login page  

***

## API Endpoints  

| Functionality          | Method | Endpoint                         | Description                              |
|-----------------------|--------|---------------------------------|------------------------------------------|
| Login                 | POST   | https://apis.ccbp.in/login       | Authenticate user and receive JWT token |
| Profile               | GET    | https://apis.ccbp.in/profile     | Fetch user profile details               |
| Jobs List             | GET    | https://apis.ccbp.in/jobs        | Fetch list of jobs with filters          |
| Job Details           | GET    | https://apis.ccbp.in/jobs/:id    | Fetch detailed info for a specific job  |

***

## Component Structure  

- `Login` Route: User login & validation  
- `Home` Route: User profile, navigation  
- `Jobs` Route: Job listing with filter/search  
- `JobItemDetails`: Detailed job info and similar jobs  
- `Header`: Navigation and logout  

***

## Accessibility & Testing Notes  

- Loader component wrapped in container with `data-testid="loader"`  
- Search button has `data-testid="searchButton"`  
- Proper alt attributes on all images, e.g.  
  - Profile image `alt="profile"`  
  - Company logos `alt="company logo"`  
  - Job details logo `alt="job details company logo"`  
  - Skill icons use respective skill names for `alt`  

***

## Design & UI  

- Responsive design supporting extra small to extra large screens  
- UI colors include hex codes: `#64748b`, `#4f46e5`, `#f8fafc`, `#272727` and others  
- Font family used: Roboto  
- Images and layout inspired by the provided design assets  

***

## Author  

👤 [Raju Aamanchi] — A React developer building modern, user-friendly web apps.

***

Thanks for checking out the Jobby App! 🚀

***
