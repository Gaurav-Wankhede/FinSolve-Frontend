# FinSolve Technologies RAG-RBAC Assistant Frontend

## Project Overview

This is the frontend application for the FinSolve Technologies RAG-RBAC Assistant - a role-based chatbot system that enables different departments to access relevant information through a natural language interface. The frontend provides an intuitive user experience for accessing the chatbot while enforcing role-based access controls.

## Features

### User Authentication

- Secure login with JWT authentication
- Role-based access management
- Session persistence using Next-Auth

### Role-Based Dashboard

- Customized interface based on user role
- Dynamic sidebar navigation with role-specific options
- Admin panel for C-Level executives with additional management capabilities

### Chat Interface

- Clean, modern chat UI with message history
- Real-time interaction with the RAG backend
- Support for multiple LLM models with selection option
- Citation of source documents for transparent responses
- Mobile-responsive design for all devices

### Document Management

- Upload interface for adding new documents (admin only)
- Role assignment for document access
- Document browsing and viewing based on user permissions

## Technology Stack

- **Next.js 15**: React framework with App Router architecture
- **React 19**: UI library for component-based development
- **TypeScript**: Type-safe JavaScript for robust code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Next-Auth**: Authentication solution for Next.js
- **Radix UI**: Unstyled, accessible UI components
- **Lucide React**: Icon library
- **Shadcn UI**: Component system built on Radix UI

## Project Structure

```
frontend/
├── app/                  # Next.js app router pages
│   ├── (landing)/       # Landing page routes
│   ├── api/             # API routes for auth
│   ├── dashboard/       # Dashboard and chatbot interface
│   ├── login/           # Authentication pages
│   └── layout.tsx       # Root layout
├── components/          # Reusable React components
│   ├── chat/            # Chat interface components
│   ├── ui/              # UI components (buttons, cards, etc.)
│   └── ...              # Other shared components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared logic
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- Backend API running (see backend README.md)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/finsolve-rag.git
   cd finsolve-rag/frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   BACKEND_URL=http://127.0.0.1:8000
   ```

### Running the Application

Start the development server:

```
npm run dev
# or
pnpm dev
```

The application will be available at http://localhost:3000.

## Key Components

### Authentication Flow

The application uses Next-Auth for authentication with a custom credential provider that connects to the backend API. Upon successful login, the user's role and access token are stored in the session.

### Dashboard Layout

The dashboard layout adapts to the user's role, showing different navigation options and features based on the permissions:

- **C-Level Executives**: Full access to all features
- **Department Roles**: Access to role-specific information and features
- **Regular Employees**: Access to general company information only

### Chat Interface

The chat interface enables users to:

1. Ask natural language questions
2. Receive answers based on their role permissions
3. See citations to source documents
4. Select different LLM models for responses
5. View chat history

## User Roles and Access

The frontend enforces the same role-based permissions as the backend:

- **Finance Team**: Access to financial data and reports
- **Marketing Team**: Access to marketing campaigns and metrics
- **HR Team**: Access to personnel and policy information
- **Engineering Department**: Access to technical documentation
- **C-Level Executives**: Full access to all information
- **Employees**: Access to general company information only

## Role-Specific Features

### Admin Features (C-Level Executives)

- Upload and manage documents
- Manage user accounts and roles
- Access all company data across departments

### Department-Specific Features

Each role has customized views and interactions tailored to their needs:

- Relevant document suggestions
- Role-optimized query recommendations
- Department-specific analytics (when available)

## Deployment

The frontend can be deployed to various platforms:

### Static Export

```
npm run build
npm run export
```

### Vercel Deployment

```
vercel
```

## Browser Support

The application supports all modern browsers:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*This frontend application is part of the Codebasics Resume Project Challenge: "Build a RAG-Based Assistant for FinSolve Technologies"*
