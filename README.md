# Project Name: Open Source Finder

## Description

Open Source Finder is an open-source application that allows users to search for open-source components for their projects. It provides a user-friendly interface to discover and explore various open-source repositories based on specific criteria such as license and platform. With Open Source Finder, developers can easily find and integrate open-source components into their projects, saving time and effort.

## Usage

Open Source Finder provides the following features:

1. **Search for Open Source Components**: Users can search for open-source repositories using keywords relevant to their project requirements. The application displays a list of matching repositories along with relevant details.

2. **Apply Filters**: Users can apply filters to refine their search results based on specific criteria such as license type (e.g., MIT, Apache) and platform (e.g., Python, JavaScript).

3. **Bookmark Repositories**: Users can bookmark repositories they find interesting or relevant for future reference. Bookmarked repositories can be easily accessed from the user's profile or bookmarked section.

4. **User Profiles**: Users can create profiles to personalize their experience within the application. Profiles include information such as username, bio, and a list of bookmarked repositories.

## Installation

### Prerequisites

Before you begin, ensure that you have the following software installed on your system:

1. MySQL:

- Visit the MySQL website and download the installer.
- Run the installer and follow the on-screen instructions to complete the installation.

2. Node.js:

- Visit the Node.js website and download the Windows installer.
- Run the installer and follow the on-screen instructions to complete the installation.

3. Python:

- Visit the Python website and download the latest version of Python for Windows.
- Run the installer and select the option to add Python to your system's PATH.

### Setting Up Application

Clone or download the project repository.

1. Backend Setup:

- Open a terminal or command prompt.
- Navigate to the directory of the project.
- Create a Virtual Environment - It is recommended to create a virtual environment to isolate your project dependencies. Run the following command to create a virtual environment:  
  ```
  python -m venv venv
  ```
- Activate the Virtual Environment:
  venv\Scripts\activate
- Install Flask and MySQL Connector:
  - While the virtual environment is active, install Flask and MySQL Connector using the following command:  
  ```
  pip install -r requirements.txt
  ```
- Run the Flask App:
  - In the terminal or command prompt, navigate to the backend directory of your project.
  - Make sure the virtual environment is activated.
  - Run the following command to start the Flask app:  
  ```
  flask run
  ```

2. Running MySQL Server:

- Open a terminal or command prompt.
- Start the MySQL server by running the following command:  
  ```
  mysql.server start
  ```

3. Running React App:

- Open a terminal or command prompt.
- Navigate to the frontend directory of your React app.
- Run the following command to install the required dependencies:  
  ```
  npm install
  ```
- Once the installation is complete, run the following command to start the React app:  
  ```
  npm start
  ```

If the browser doesn't open automatically, you can access the React app by visiting http://localhost:3000 in your web browser.
