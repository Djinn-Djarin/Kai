import pandas as pd
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


EXCEL_FILE_PATH = os.path.join(BASE_DIR, 'data', 'data.xlsx')


file_path= os.path.join(BASE_DIR, 'data', 'data.xlsx')

df = pd.read_excel(file_path)


df.columns = df.columns.str.strip()
                                                 

colors = ["red", "green", "white"]
packs = [1, 2, 3, 4, 5, 6, 8, 10]

# Generate combinations of colors and packs
combinations = [(color, pack) for color in colors for pack in packs]
x = len(combinations) # to identify number of empty rows to be inserted.                                                     

# Create an empty DataFrame to store all results
final_combined_df = pd.DataFrame()

# Iterate over each row in the input DataFrame
for index, unique_row in df.iterrows():
    # Create a dataframe with x empty rows
    empty_rows = pd.DataFrame(index=range(x), columns=df.columns)   

    # Combine the current row with the empty rows
    combined_df = pd.concat([unique_row.to_frame().T, empty_rows], ignore_index=True)

    # Define the new column names
    new_columns = df.columns

    # Adjust the new columns to match the length of the current columns
    adjusted_columns = new_columns[:len(combined_df.columns)]

    # Assign the new column names to the dataframe
    combined_df.columns = adjusted_columns

    # Define the adjusted columns to be filled with the first row's values
    adjusted_columns_to_fill = [
        "Part NU", "HSN Code", "GST", "Product Weight(kg)", "Key words", 
        "Dimension", "Description", "Bullet Point 2", "Bullet Point 3", 
        "Bullet Point 4", "Bullet Point 5", "L", "W", "H", "Material", "Category", "Single Pack"
    ]

    # Fill the empty rows with the first row's values for the specified columns
    for column in adjusted_columns_to_fill:
        combined_df.loc[1:, column] = unique_row[column]

    # Fill the "Color" and "Pack of" columns with the correct values
    color_values = [color for color in colors for _ in range(len(packs))]
    pack_values = packs * len(colors)

    # Ensure we fill only the required rows to avoid index mismatch
    combined_df.loc[1:x+1, "Color"] = color_values
    combined_df.loc[1:x+1, "Pack of"] = pack_values

    # Extract necessary values from the unique row for the new Bullet Point 1
    category_value = unique_row.get('Category', 'Unknown Category')
    material_value = unique_row.get('Material', 'Unknown Material')
    dimension_value = unique_row.get('Dimension', 'Unknown Dimension')
    part_nu_value = unique_row.get('Part NU', 'Unknown Part NU')

    # Update the Bullet Point 1 column based on the specified format
    combined_df.loc[1:x+1, 'Bullet Point 1'] = combined_df.loc[1:x+1].apply(
        lambda row: f"PACKAGE CONTAIN: Pack of {row['Pack of']} | {category_value} | MATERIAL: {material_value} | DIMENSION: {dimension_value} CM | {row['Color']} | {part_nu_value}",
        axis=1
    )

    # Update the Product Name column based on the specified format
    combined_df.loc[1:x+1, 'Product Name'] = combined_df.loc[1:x+1].apply(
        lambda row: f"Kuber Industries Pack of {row['Pack of']} Portable 4 Layer Shoe Storage Organizer| Easy to Installation Detachable | Footwear Organiser with Wheel |Door-Entrance Living-Room Balcony Decor| 203-4LA | {row['Color']}",
        axis=1
    )

    # Update the Pieces column based on the formula
    combined_df.loc[1:x+1, 'Pieces'] = combined_df.loc[1:x+1].apply(
        lambda row: row['Pack of'] * unique_row['Single Pack'],
        axis=1
    )

    # Append the results to the final_combined_df
    final_combined_df = pd.concat([final_combined_df, combined_df])
    
# Save the updated dataframe to a new CSV file
output_file_path = 'Updated_Dataset_All_Rows.csv'
final_combined_df.to_csv(output_file_path, index=False)
final_combined_df
