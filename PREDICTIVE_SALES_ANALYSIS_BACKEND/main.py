from ml_model import predict_sales
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# MongoDB Configuration
client = MongoClient("mongodb+srv://janu:1234@cluster0.ao3pboe.mongodb.net/?retryWrites=true&w=majority")
db = client["mydatabase"]
collection = db["customers"]

# Sample route to check if the server is running
@app.get('/')
def index():
    return "FastAPI server is running!"

# Endpoint to predict sales for a given month
@app.get('/api/predict/{month}')
def predict_sales_for_month(month: int):
    try:
        sales_prediction = predict_sales(month)
        return JSONResponse(content={"sales_prediction": sales_prediction})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get all customers
@app.get('/api/customers')
def get_customers():
    customers = list(collection.find({}, {'_id': 0}))
    return JSONResponse(content={"customers": customers})

# Add a new customer
@app.post('/api/customers')
def add_customer(new_customer: dict):
    collection.insert_one(new_customer)
    return JSONResponse(content={"message": "Customer added successfully"})

# Delete a customer by ID
@app.delete('/api/customers/{name}')
def delete_customer(name: str):
    result = collection.delete_one({'name': name})
    if result.deleted_count == 1:
        return JSONResponse(content={"message": "Customer deleted successfully"})
    else:
        raise HTTPException(status_code=404, detail="Customer not found")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
