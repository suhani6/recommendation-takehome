from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from pydantic import BaseModel
from typing import List, Optional

from services.llm_service import LLMService
from services.product_service import ProductService

app = FastAPI(title="AI Product Recommendation API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
product_service = ProductService()
llm_service = LLMService()

# Models
class UserPreferences(BaseModel):
    priceRange: str = "all"
    categories: List[str] = []
    brands: List[str] = []

class RecommendationRequest(BaseModel):
    preferences: UserPreferences
    browsing_history: List[str] = []

class Product(BaseModel):
    id: str
    name: str
    category: str
    subcategory: Optional[str]
    price: float
    brand: str
    description: Optional[str]
    features: Optional[List[str]]
    rating: Optional[float]
    inventory: Optional[int]
    tags: Optional[List[str]]

class Recommendation(BaseModel):
    product: Product
    explanation: str
    confidence_score: int

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation]
    count: int

@app.get("/api/products", response_model=List[Product])
async def get_products():
    return product_service.get_all_products()

@app.post("/api/recommendations", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    try:
        user_preferences = request.preferences.dict()
        browsing_history = request.browsing_history
        all_products = product_service.get_all_products()

        recommendations = llm_service.generate_recommendations(
            user_preferences,
            browsing_history,
            all_products
        )

        if "recommendations" not in recommendations or len(recommendations["recommendations"]) == 0:
            raise HTTPException(status_code=404, detail="No recommendations generated based on provided inputs.")

        return recommendations
    
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": str(exc),
            "message": "An error occurred while processing your request"
        }
    )

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5001, reload=True)
