### Social Network Graph Analysis Tool

A sophisticated application for analyzing and visualizing social network relationships, developed by Mohit Saxena.

## Overview

This tool solves two fundamental social network analysis problems:

1. **Mutual Connections Detection**
   - Identifies pairs of users who follow each other
   - Visualizes mutual relationships in real-time
   - Optimizes detection using efficient graph algorithms

2. **N-th Degree Connection Analysis**
   - Finds all users exactly N steps away in the network
   - Maps complex relationship chains
   - Provides visual representation of connection levels
### 1. Backend (Spring Boot)

Located in `src/main/java/com/example/apichallenge`, the Spring Boot application handles:

- API communication with the challenge endpoint
- Problem-solving logic for both challenges:
  - Mutual Followers (Finding pairs of users who follow each other)
  - Nth Level Followers (Finding users exactly N levels away in the follow chain)
- Webhook submission with retry mechanism

Key Components:
- `ApiService`: Manages API communication and orchestrates the solution flow
- `ProblemSolver`: Contains the core algorithms for both challenges
- `RestTemplateConfig`: Configures HTTP client settings
- Models: Data structures for requests/responses

### 2. Frontend (React + TypeScript)

Located in `src/`, the React application provides:

- Interactive UI for testing different scenarios
- Visual network graph representation of user relationships
- Real-time solution visualization
- Webhook submission status tracking

Key Components:
- `ApiChallenge`: Main component orchestrating the challenge flow
- `NetworkGraph`: Visual representation of user relationships
- `ApiRequest`: Form for submitting test cases
- `ProblemSolver`: UI for viewing and triggering solutions
- `WebhookSubmission`: Handles solution submission

## Features

1. **Problem Solving**
   - Mutual Followers Detection
   - Nth Level Follower Search
   - Optimized algorithms for both challenges

2. **Visualization**
   - Interactive network graph
   - Dynamic node highlighting
   - Visual representation of relationships

3. **Robust Error Handling**
   - Retry mechanism for webhook submissions
   - Comprehensive error logging
   - User-friendly error messages

4. **Developer Experience**
   - TypeScript for type safety
   - Tailwind CSS for styling
   - Modular component architecture

## Building and Running

### Backend (Spring Boot)

```bash
# Build the project
mvn clean package

# Run the application
java -jar target/api-challenge-0.0.1-SNAPSHOT.jar
```

The backend service will start on `http://localhost:8080`

### Frontend (React)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will be available at `http://localhost:5173`

## Testing

The application includes comprehensive test coverage for both frontend and backend components.

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
npm run test
```

## Configuration

### Backend
Configuration can be modified in `src/main/resources/application.properties`:
- Logging levels
- Server port
- Request timeouts

### Frontend
Environment variables can be set in `.env` files:
- API endpoints
- Development/production modes
### Output

![Screenshot 2025-04-25 180420](https://github.com/user-attachments/assets/b29135e6-684f-4511-b262-f48d9cea03b1)
![Screenshot 2025-04-25 180433](https://github.com/user-attachments/assets/8867903e-f3ff-4710-a10e-4af6959853f9)
![Screenshot 2025-04-25 180449](https://github.com/user-attachments/assets/90a13c81-0795-433a-a10e-238b3375a962)
![Screenshot 2025-04-25 180506](https://github.com/user-attachments/assets/b4341081-04a7-4591-b26a-d777af29b8ff)
![Screenshot 2025-04-25 180514](https://github.com/user-attachments/assets/4501cde2-a47b-494b-9130-e30a32221a7e)



## Author
Mohit Saxena

## License
This project is licensed under the MIT License - see the LICENSE file for details.
