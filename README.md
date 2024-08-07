# 3D Graphics App

## Overview

This project is a 3D graphics application developed using TypeScript and Three.js. The application renders real-time animated 3D models of crystal lattice structures and robotic parts. Users can interact with these models, which are displayed with realistic lighting and shadows. The project employs an MVC architecture and incorporates AJAX for dynamic data updates.

## Features

- Real-time 3D rendering using Three.js
- MVC architecture for clear separation of concerns
- Dynamic data fetching and updating using AJAX
- Realistic lighting and shadow effects
- Interactive camera controls
- Animated crystal lattice and robotic parts
- Technologies Used
- TypeScript
- Three.js
- Webpack
- Express
- Nodemon
- AJAX

## Installation

- Clone the repository

```bash
git clone 
cd project
Install dependencies
```

```bash
npm install
```

- Build the application

```bash
npm run build
```

- Start the development server

```bash
npm run dev
```

- The application will be running at <http://localhost:3000>.

```bash
Project Structure
3d-graphics-app/
│
├── src/
│   ├── controller/
│   │   ├── AnimationController.ts
│   │   └── CameraController.ts
│   ├── model/
│   │   ├── CrystalLattice.ts
│   │   ├── RoboticPart.ts
│   │   └── SceneModel.ts
│   ├── view/
│   │   └── index.html
│   ├── app.ts
│   └── main.ts
│
├── public/
│   └── assets/
│       └── omos.png
│
├── dist/
│   └── public/
│       └── index.html
│
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

-

### Scripts

- npm run build: Compile TypeScript files and bundle the application using Webpack.
- npm run dev: Start the development server with Nodemon for automatic restarts on file changes.
- npm run start: Start the production server.

### API Endpoints

- GET /: Serve the main application page.
- GET /shape-data: Fetch random shape data for the application.

### Usage

- Initial Setup
- Install dependencies: Ensure you have Node.js and npm installed. Run npm install to install the project dependencies.

- Run the application: Start the development server with npm run dev. The application will be accessible at <http://localhost:3000>.

### Interactions

- View and interact with the 3D models: The application renders a 3D scene containing a crystal lattice and robotic parts. Use your mouse or touch input to rotate and zoom the camera.
- Dynamic data updates: The application periodically fetches new shape data from the server and updates the 3D models in real-time.
- Customization
- Lighting: The lighting setup in the scene is defined in SceneModel.ts. You can customize the ambient light, directional light, and point light to achieve different visual effects.
- Shapes and animations: The shape generation and animation logic is implemented in CrystalLattice.ts and RoboticPart.ts. Modify these files to change the appearance and behavior of the 3D models.

## Output

![](./src/public/assets/threejs.gif)
