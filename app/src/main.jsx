import { StrictMode } from 'react'; // Import StrictMode from React to highlight potential issues in the app
import { createRoot } from 'react-dom/client'; // Import createRoot from ReactDOM to create a root for rendering
import App from './App.jsx'; // Import the App component, which is the root component of the application
import './index.css'; // Import global CSS styles

// Create a root for the React application and render the App component inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Render the App component inside StrictMode to help detect potential problems */}
  </StrictMode>,
);
