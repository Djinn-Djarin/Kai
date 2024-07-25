import pandas as pd

def packof_func(df_comb, file_path):
    df = pd.read_excel(file_path)

    # Function to split dataframe into individual row dataframes
    def split_dataframes(df): 
        dataframes = []
        for i in range(len(df)):
            row_df = pd.DataFrame(df.iloc[i]).transpose() 
            dataframes.append(row_df)
        return dataframes

    dataframes = split_dataframes(df)

    # Function to copy specified columns
    def addCopyColumns(original_df, target_df):
        list_of_copy_cols = ["Part NU", "HSN Code", "GST", "Product Weight(kg)", "Key words", 
                             "Dimension", "Description", "Bullet Point 2", "Bullet Point 3", 
                             "Bullet Point 4", "Bullet Point 5", "L", "W", "H", "Material", 
                             "Category", "Design"]

        for col in list_of_copy_cols:
            if col in original_df.columns and col in target_df.columns:
                target_df[col] = target_df[col].ffill()
        return target_df

    # Function to dynamically update data
    def dynamicData(df, packof, colors):
        for i, row in df.iterrows():
            category_value = row['Category']
            material_value = row['Material']
            dimension_value = row['Dimension']
            part_nu_value = row['Part NU']
            single_pack_value = row['Single Pack']

            pieces_value = packof * single_pack_value
            bullet_point_color_str = " | ".join([f"{count} pieces {color}" for color, count in colors.items() if count > 0])
            product_name_color_str = " | ".join([color for color, count in colors.items() if count > 0])
            color_str = ", ".join([color for color, count in colors.items() if count > 0])

            df.at[i, "Bullet Point 1"] = (f"PACKAGE CONTAIN: Pack of {packof} | {category_value} | MATERIAL: {material_value} | DIMENSION: {dimension_value} CM | {bullet_point_color_str} | {part_nu_value}")
            df.at[i, 'Product Name'] = (f"Kuber Industries Pack of {packof} Portable 4 Layer Shoe Storage Organizer | Easy to Install | Detachable | Footwear Organiser with Wheel | Door-Entrance Living-Room Balcony Decor | 203-4LA | {product_name_color_str}")
            df.at[i, "Pack of"] = packof
            df.at[i, "Pieces"] = pieces_value
            df.at[i, "Color"] = color_str

        return df

    # Container for final result
    datacontainer = pd.DataFrame()

    # List of packs and colors
    packof_list = df_comb['Pack_of'].to_list()
    color_list = df_comb.columns[1:].to_list()

    # Processing each dataframe
    for df in dataframes:
        # Add the original row to the final DataFrame
        datacontainer = pd.concat([datacontainer, df], ignore_index=True)

        for packs in packof_list:
            new_df = df.copy()
            result_df = addCopyColumns(df, new_df)

            colors = {color: df_comb.loc[df_comb['Pack_of'] == packs, color].values[0] for color in color_list}
            dy_rows = dynamicData(result_df, packs, colors)

            datacontainer = pd.concat([datacontainer, dy_rows], ignore_index=True)

    return datacontainer

# Example usage:
# df_comb_data = {
#     'Pack_of': [2, 3, 4, 5, 6, 8, 10, 12],
#     'red':     [1, 1, 2, 2, 3, 2, 5, 6],
#     'green':   [1, 1, 2, 2, 3, 2, 5, 0],
#     'yellow':  [0, 1, 0, 1, 0, 2, 0, 6],
#     'white':   [0, 0, 0, 0, 0, 2, 0, 0],
# }

# df_comb = pd.DataFrame(df_comb_data)
# file_path = '/mnt/data/data.xlsx'
# final_df = process_shoe_storage_data(df_comb, file_path)
# final_df
