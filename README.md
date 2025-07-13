# LessonLink - Frontend Portfolio Showcase

> **Note**: This repository is a public clone of a collaborative full-stack project, intended solely for showcasing frontend development work to recruiters. The original project was developed as part of a student team effort.

## Live Demo

**Hosted Application**: https://project-lessonlink.onrender.com/

*Note: Initial dashboard load may take 30-60 seconds due to backend hosting on a free Render instance. Subsequent loads are much faster.*

## Project Overview

LessonLink is a comprehensive lesson planning and sharing platform designed for educators to create, organize, and collaborate on teaching materials. This repository showcases the frontend implementation, featuring a modern React application with advanced rich-text editing capabilities.

## Technical Stack

- **Frontend Framework**: React 18 with Vite
- **UI Components**: Chakra UI v2
- **State Management**: Zustand
- **Rich Text Editor**: Custom Tiptap implementation
- **Routing**: React Router v6
- **Styling**: CSS-in-JS with Chakra UI
- **Build Tool**: Vite

## Team & Contributions

This project was developed collaboratively by a student team. Here are the key contributors and their roles:

### **Wally Magill** - Frontend Development Lead
- **Client Architecture**: Designed and implemented the modular frontend architecture
- **Custom Rich-Text Editor**: Built a sophisticated Tiptap-based editor with template and advanced modes
- **State Management**: Implemented Zustand store for global state management
- **UI/UX Logic**: Developed responsive components, dark/light mode, and user interactions
- **Core Features**: Lesson filtering, remixing system, folder organization, and drag-and-drop functionality

### **Team Members** (Roles to be filled in)
- **[Teammate Name]**: [Their specific role/contributions]
- **[Teammate Name]**: [Their specific role/contributions]
- **[Teammate Name]**: [Their specific role/contributions]

## Architecture Highlights

### Custom Editor Implementation
The platform features a sophisticated dual-mode editor built with Tiptap:

- **Template Mode**: Streamlined interface for quick lesson creation with standardized fields
- **Advanced Mode**: Full-featured rich-text editor with Notion-like capabilities
- **Modular Architecture**: Custom nodes, extensions, and UI components for extensibility

### State Management
- **Zustand Store**: Efficient global state management for lessons, user data, and UI state
- **Custom Hooks**: Reusable logic for editor operations, responsive behavior, and user interactions

### Component Architecture
```
src/
├── components/
│   ├── tiptap-ui/          # Custom editor toolbar components
│   ├── tiptap-node/        # Custom content rendering nodes
│   ├── tiptap-extension/   # Editor functionality extensions
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── store/                  # Zustand state management
├── pages/                  # Application routes
└── styles/                 # Global styling and themes
```

## Key Features

### Lesson Management
- **Dual Editor Modes**: Template-based quick creation and advanced rich-text editing
- **Smart Organization**: Folder system with drag-and-drop functionality
- **Advanced Filtering**: Search and filter by author, content, and standards
- **Remixing System**: Fork and customize public lessons while maintaining attribution

### User Experience
- **Responsive Design**: Mobile-first approach with Chakra UI components
- **Theme Support**: Seamless light/dark mode switching
- **Standards Integration**: CCSS standards selection and filtering
- **Sharing Capabilities**: Email sharing and public/private lesson visibility

### Technical Excellence
- **Performance Optimized**: Efficient rendering and state updates
- **Accessibility**: WCAG compliant components and interactions
- **Code Quality**: Modular architecture with reusable components
- **Developer Experience**: Comprehensive TypeScript support and documentation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd project-lessonlink

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Integration

The frontend integrates with a RESTful backend API for:
- User authentication and authorization
- Lesson CRUD operations
- File upload and management
- Email sharing functionality
- User profile management

## Contributing

This repository is for portfolio purposes only. For questions about the original collaborative project, please contact the development team.

## License

This project is for educational and portfolio purposes. All rights reserved by the original development team.
