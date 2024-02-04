from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

# MongoDB Configuration
app.config['MONGO_URI'] = 'mongodb://localhost:27017/customer_db'
mongo = PyMongo(app)

# Sample route to check if the server is running
@app.route('/')
def index():
    return "Flask server is running!"

# Customer CRUD operations
@app.route('/api/customers', methods=['GET'])
def get_customers():
    customers = list(mongo.db.customers.find({}, {'_id': 0}))
    return jsonify(customers)

@app.route('/api/customers', methods=['POST'])
def add_customer():
    new_customer = request.json
    mongo.db.customers.insert_one(new_customer)
    return jsonify({'message': 'Customer added successfully'})

@app.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    mongo.db.customers.delete_one({'id': customer_id})
    return jsonify({'message': 'Customer deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)

