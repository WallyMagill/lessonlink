# LessonLink Client

This is the frontend (client) application for the LessonLink platform, built with React and Vite.

Hosted Link: https://project-lessonlink.onrender.com/

*Please note the dashboard may take 30secs - 1 minute to load at first. This is due to the backend being run on a free instance of Render; it should be quick after first load.*

## Project Structure

- `src/`: Source code directory;
  - `components/`: Reusable UI components;
    - `tiptap-*/`: Premade components from tiptap library (needed for custom editor);
    - `ui/`: Premade components from chakra-ui v2;
  - `hooks/`: Hooks made for proper interactions in custom editor;
  - `img/`: Custom logo for light and dark mode, as well as an image we uploaded for Technigala;
  - `lib/`: Necessary for tiptap;
  - `pages/`: Fully designed pages that users can be routed to;
  - `store/`: Global Zustand state management;
  - `styles/`: Global styles and themes;
  - `App.jsx`: Handles React Router configuration.

## Setup Instructions

1. Install dependencies: `npm install`
2. Start development client: `npm run dev`

## Key Features

- Modern, responsive UI with Chakra-UI based components;
- Searching and filtering by lessons and lesson authors;
- Folder oragnization of lessons;
- Drag-and-drop to lesson folder;
- Simple and consistent lesson creation in template mode;
- Advanced lesson creation in custom editor (similar to Notion editing);
- Move from template-based lesson editing to custom editing, updates one way only;
- Lesson standards integration, filterable and selectable CCSS Kindergarten-12th grade;
- Lesson sharing via email (must have email set up in the application);
- Lesson remixing (forking, i.e. make a copy of a public lesson, original author can view changes);
- Lesson printing;
- Lesson private/public view;
- Lesson card color selection;
- Global View;
- Light and Dark mode;
- User authenticaion;

## Key Features explanation
TLDR at bottom: 

From dashboard view, lessons are filterable by author and by lesson details. Folders can be made for teachers to better organize their lessons however they see fit. Lessons can be dragged and dropped into a folder and removed via selection. Select a folder to see only lessons in that folder.

When creating a lesson, a user is taken to a standard template view. This view is meant to be as straightforward as possible to ensure that substitutes or any teacher new to a lesson can see critical information in an easy to digest way. All CCSS Standards are available in a dropdown to the left of template view. Each standard can be selected, with codes appearing at the top.

There is advanced lesson creation available in the custom editor. On first use of custom editor, the template-based lesson is ported over and prefilled in giving teachers an outline of their lesson and allowing them to make changes. Note that changes made in custom view will not change the template view to ensure a consistant template experience.

Lessons can be shared via email or copying a link. When finding a lesson from global view, a user can choose to remix that lesson (available via edit); a remix creates a copy of the lesson and automatically shares it with the original creator. The user can then make changes without worrying about the original version, and the first author can see improvements to consider in the future. These remixed lessons will show up in both users' home view (original author and remix author).

Each lesson can be private or public, with public lessons available to everyone through the global view of dashboard. The private view allows only the author and, if the lesson was remixed, the original author to view. Light and dark mode can be toggled in the settings dropdown from the home screen.

Through their profile settings, a user can change their username, the school at which they teach, the grades they teach, and the subjects.

*TLDR:* User can make lessons, share lessons, view lessons, remix others' lessons, add standards to lessons, organize their lessons, edit their lessons in a template way and a custom way. If a lesson is remixed, it will always be visible to the original creator.
