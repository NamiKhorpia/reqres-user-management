# User Management App
## Overview
A React app for managing users with login, list, edit, delete, and create functionality using the Reqres mock API.

## Features
- **Login**: Use `eve.holt@reqres.in` and `cityslicka` to log in.
- **User List**: Displays 12 users across 2 pages (6 per page).
- **Edit**: Update user details with validation, persists via localStorage.
- **Delete**: Remove users, persists via localStorage.
- **Create**: Add new users (mock IDs), persists via localStorage.
- **Logout**: Clears session and changes.
- **Persistence**: Uses localStorage since Reqres doesn’t save changes.
- **Error Handling**: Shows message if API fetch fails.
- **Styling**: Clean, responsive design with CSS.

## Setup
1. Clone the repo: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Run the app: `npm start`
4. Open `http://localhost:3000` in your browser.

## Testing
Manually tested login, list (pagination), edit, delete, create, and error states.

## Limitations
- Mock API doesn’t persist changes server-side; localStorage used instead.
- Pagination assumes 2 pages; dynamic total pages not implemented.
- Basic styling; could be enhanced with a CSS framework.

