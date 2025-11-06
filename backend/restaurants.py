from fastapi import APIRouter, Query
from typing import List, Optional

from models import Restaurant
from mock_data import mock_restaurants

router = APIRouter()

@router.get("/api/v1/restaurants", response_model=List[Restaurant])
def get_restaurants(
    max_calories: Optional[int] = Query(None, description="Maximum calories for a menu item"),
    max_distance: Optional[int] = Query(None, description="Maximum distance in meters")
):
    """
    Fetches a list of restaurants, with optional filtering.
    """
    restaurants = mock_restaurants
    if max_calories:
        restaurants = [
            r for r in restaurants if any(m.calories <= max_calories for m in r.menu)
        ]
    if max_distance:
        restaurants = [r for r in restaurants if r.distance <= max_distance]
    return restaurants