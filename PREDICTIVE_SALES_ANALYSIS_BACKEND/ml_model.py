import pandas as pd
from datetime import datetime
import calendar

def predict_sales(data):
    # Read the CSV file into a DataFrame
    df = pd.read_csv('data.csv')

    # Convert the 'Date' column to datetime format
    df['Date'] = pd.to_datetime(df['Date'])

    # Filter the DataFrame to include only the current month's data
    current_month = datetime.now().month
    current_year = datetime.now().year
    print(df['Date'].dt.month[0])
    current_month_data = df[(df['Date'].dt.month == data)]

    if not current_month_data.empty:
        # Group by 'Product' and sum the 'Qty' for each product
        product_sales = current_month_data.groupby('Product')['Qty'].sum()

        # Get the product with the maximum sales in the current month
        most_selling_product = product_sales.idxmax()
        sales_quantity = product_sales.max()

        return (f"The most selling product in the {calendar.month_name[data]} is {most_selling_product} with a total of {sales_quantity} units sold.")
    else:
        return("There are no sales data available for the month.")
