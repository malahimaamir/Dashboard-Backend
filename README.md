✅ Project Name
EmpowerDashboard - Backend
📄 Description
EmpowerDashboard is a backend REST API built with TypeScript, Express.js, and MongoDB using Mongoose. It powers the administrative dashboard of an employee management system, allowing for user authentication, employee CRUD operations, and insightful analytics (e.g., active employees, salary stats, department counts).
The frontend (in a separate repository) connects to this backend to manage, display, and interact with employee and user data in real-time.

🚀 Features
🔐 JWT-based Authentication with Cookies

👥 User Registration and Login

👩‍💼 Employee CRUD (Create, Read, Update, Delete)

📊 Employee Statistics API (Total, Active, On Leave, Avg Salary, etc.)

📅 Recent Employees Endpoint

📁 Modular MVC Structure

✅ TypeScript Support

🌐 MongoDB Integration with Mongoose

🛡️ Protected Routes Middleware

🛠️ Tech Stack
Backend Framework: Express.js

Language: TypeScript

Database: MongoDB + Mongoose

Authentication: JWT with HttpOnly cookies

Hashing: bcryptjs

Environment Management: dotenv

📁 Project Structure
bash
Copy
Edit
├── src/
│   ├── config/             # MongoDB connection setup
│   ├── controllers/        # Auth & Employee logic
│   ├── middleware/         # JWT auth guard
│   ├── models/             # Mongoose models for User & Employee
│   ├── routes/             # API routes for auth & employees
│   ├── services/           # Business logic (register/login)
│   ├── index.ts            # App entrypoint
├── .env
├── package.json
├── tsconfig.json
📦 Setup Instructions
1. Clone the Repository
git clone https://github.com/malahimaamir/Dashboard-Backend.git
cd Dashboard-Backend
2. Install Dependencies
npm install
3. Create .env File
MONGO_URI=mongodb://localhost:27017/empowerDashboard
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
4. Start the Server
npx ts-node src/index.ts
Server will run on http://localhost:5000 by default.

📡 API Endpoints
📌 Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login and get token

📌 Employee Routes
Method	Endpoint	Description
GET	/api/employees	Get all employees
POST	/api/employees	Add new employee
PUT	/api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee
GET	/api/stats	Get employee stats
GET	/api/recent	Get recently added employees

All routes (except auth) are protected by middleware that verifies the JWT cookie.

🧪 Testing
You can use Postman or Thunder Client to test routes.

Register/Login to receive a token.

Use cookies for authenticated endpoints.

Test employee CRUD and statistics.

🧠 Author
Malahima Amir

🌐 Related Repo
👉 Frontend Repository: Provide link here (when ready)
