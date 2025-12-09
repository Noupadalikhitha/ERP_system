from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date

class ExpenseCreate(BaseModel):
    category_id: Optional[int] = None
    expense_type: str = "other"  # bills, purchases, payroll, utilities, other
    amount: float
    description: Optional[str] = None
    vendor: Optional[str] = None
    date: date

class ExpenseUpdate(BaseModel):
    category_id: Optional[int] = None
    expense_type: Optional[str] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    vendor: Optional[str] = None
    date: Optional[date] = None

class ExpenseResponse(BaseModel):
    id: int
    category_id: Optional[int]
    category_name: Optional[str] = None
    expense_type: str
    amount: float
    description: Optional[str]
    vendor: Optional[str]
    date: date
    receipt_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class RevenueCreate(BaseModel):
    source: str
    amount: float
    description: Optional[str] = None
    date: date

class RevenueResponse(BaseModel):
    id: int
    source: str
    amount: float
    description: Optional[str]
    date: date
    created_at: datetime
    
    class Config:
        from_attributes = True

class FinancialSummary(BaseModel):
    total_revenue: float
    total_expenses: float
    net_profit: float
    period_start: date
    period_end: date

class ProfitLossReport(BaseModel):
    period_start: date
    period_end: date
    total_revenue: float
    revenue_from_orders: float
    revenue_from_other: float
    total_expenses: float
    expenses_by_type: dict
    expenses_by_category: List[dict]
    net_profit: float
    profit_margin: float  # percentage
    gross_profit: Optional[float] = None
    operating_expenses: Optional[float] = None


