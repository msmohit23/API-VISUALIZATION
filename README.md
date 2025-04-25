# API Challenge Solution

A comprehensive solution for the API challenge, implemented using both Spring Boot (backend) and React + TypeScript (frontend).

## Project Structure

The project consists of two main components:

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

## Author
Mohit Saxena

## License
This project is licensed under the MIT License - see the LICENSE file for details.