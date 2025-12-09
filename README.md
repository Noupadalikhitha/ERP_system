# AI-Powered ERP System

A full-stack enterprise resource planning (ERP) system with intelligent AI capabilities, built with React, FastAPI, PostgreSQL, and Groq API (Llama 3.1 70B).

## Features

### Core Modules
- **Authentication & Role Management**: JWT-based auth with role-based access control (Admin, Manager, Staff)
- **Inventory Management**: Product CRUD, stock tracking, low stock alerts, analytics
- **Sales & Orders**: Order management, customer tracking, sales reports
- **Employee Management (HR)**: Employee records, attendance tracking, payroll
- **Finance**: Revenue and expense tracking, financial reports, budget categories
- **Admin Dashboard**: System overview, user management, KPIs
- **AI Assistant**: Natural language queries, SQL generation, forecasting, recommendations

### AI Features
- **Natural Language to SQL Conversion**: Ask questions in plain English, the AI converts them to SQL queries
- **Conversational AI**: Chat with the AI assistant for business questions and insights
- **Sales Forecasting**: Predict future sales trends based on historical data
- **Stock-out Predictions**: Know when products will run out of stock
- **Reorder Recommendations**: Get intelligent suggestions on inventory reorder quantities
- **Anomaly Detection**: Automatically detect unusual patterns in expenses and attendance
- **Business Insights**: Get AI-generated summaries and recommendations from your data

#### AI Assistant Workflow
1. **User Input**: Ask natural language questions like:
   - "Show low-stock products"
   - "Which employee worked the most last week?"
   - "What was my revenue this month?"
   - "Forecast my sales for the next 30 days"

2. **AI Processing**:
   - Analyzes the question using Llama 3.1 70B model
   - Generates appropriate SQL queries
   - Executes queries on PostgreSQL database
   - Generates natural language summaries of results

3. **Results & Insights**:
   - Returns structured data with AI-generated insights
   - Provides forecasts and recommendations
   - Explains findings in business-friendly language

#### Example AI Response
```
User Query: "How will my sales perform next month?"

AI Response:
"Based on the last 90 days of sales data, your monthly sales average is $45,230. 
Using trend analysis, I forecast a 12% increase next month, bringing estimated 
revenue to $50,657. I recommend increasing inventory for Category A products by 
15% to meet the expected demand."
```

#### Technologies Behind AI
- **LLM**: Groq API with Llama 3.1 70B (faster and cheaper than alternatives)
- **SQL Generation**: Context-aware prompting with database schema
- **Processing**: Real-time NLP with efficient prompt engineering
- **Data Analysis**: Pandas and NumPy for trend analysis and forecasting

## Tech Stack

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic (migrations)
- JWT Authentication
- Groq API (Llama 3.1 70B)
- Natural Language Processing
- SQL Generation

### Frontend
- React 18
- Vite
- TailwindCSS
- Redux Toolkit
- React Query
- Recharts
- Axios

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 13+
- Groq API Key (free tier available at https://console.groq.com)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Update `.env` with your configuration:
```
DATABASE_URL=postgresql://user:password@localhost:5432/erp_db
SECRET_KEY=your-secret-key-here
GROQ_API_KEY=your-groq-api-key
FRONTEND_URL=http://localhost:5173
HOST=0.0.0.0
PORT=8000
```

6. Initialize database:
```bash
python scripts/init_db.py
```

7. Run migrations:
```bash
alembic upgrade head
```

8. Start server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
VITE_API_URL=http://localhost:8000/api/v1
```

4. Start development server:
```bash
npm run dev
```

### Docker Setup

1. Create `.env` file in root with your database and API credentials:
```
DATABASE_URL=postgresql://user:password@localhost:5432/erp_db
SECRET_KEY=your-secret-key-here
GROQ_API_KEY=your-groq-api-key
FRONTEND_URL=http://localhost:5173
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Default Roles

The system initializes with three default roles:
- **Admin**: Full system access
- **Manager**: Management access
- **Staff**: Standard user access

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── api/v1/        # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic & AI services
│   ├── alembic/            # Database migrations
│   ├── scripts/             # Utility scripts
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/            # API clients
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   └── App.jsx
│   └── package.json
└── docker-compose.yml
```

## Deployment

### Backend (Render/Railway)
1. Connect your repository
2. Set environment variables
3. Build command: `pip install -r requirements.txt && alembic upgrade head`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variable: `VITE_API_URL`

### Database (Supabase/Neon)
1. Create PostgreSQL database
2. Update `DATABASE_URL` in backend environment variables
3. Run migrations: `alembic upgrade head`

## Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret key
- `GROQ_API_KEY`: Groq API key (get from https://console.groq.com)
- `FRONTEND_URL`: Frontend URL for CORS
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration (default: 30)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)

### Frontend
- `VITE_API_URL`: Backend API URL

## Security Notes

- Change `SECRET_KEY` in production
- Use strong passwords for database
- Enable HTTPS in production
- Implement rate limiting
- Regular security updates

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.



