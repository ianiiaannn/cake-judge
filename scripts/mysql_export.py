import mysql.connector
import pandas as pd
import sqlalchemy
import datetime
import json
import os

SQLDUMP_FILENAME = '2022.3.29.dump.sql'

OUTPUT_FOLDER = 'output'

DB_HOST = "localhost"
DB_USER = "root"
DB_PASS = None
DB = "judge"

db = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASS,
    database=DB
)

engine = sqlalchemy.create_engine(f'mysql://{DB_USER}{f":{DB_PASS}" if DB_PASS else ""}@{DB_HOST}/{DB}')

def get_tables() -> list:
    cursor = db.cursor()
    cursor.execute("Show tables;")
    tables = cursor.fetchall()
    tables = [table_name_tuple[0] for table_name_tuple in tables]
    return tables


def get_data(table):
    return pd.read_sql(table, engine)
    cursor = db.cursor()
    cursor.execute(f'SELECT * FROM {table};')
    print(cursor.description)

    # cursor.description
    '''
	(
		column_name,
		type,
		None,
		None,
		None,
		None,
		null_ok,
		column_flags
	)
	'''
    return


def main():
    os.system(f'mysql -u {DB_USER} -D {DB} < {SQLDUMP_FILENAME}')
    time = datetime.datetime.now()
    subfolder = time.strftime("%Y.%m.%d")
    os.makedirs(f'{OUTPUT_FOLDER}/{subfolder}', exist_ok=True)


    tables = get_tables()
    with open(f'{OUTPUT_FOLDER}/{subfolder}/tables.json', 'w') as f:
        json.dump(tables, f)

    for table in tables:
        if table == 'tomcat_sessions':
            continue

        df = get_data(table)

        if table == 'problemimages':
            df = df.drop('file', axis=1)

        if table == 'users':
            df = df.drop('pictureblob', axis=1)



        try:
            df.to_json(f'{OUTPUT_FOLDER}/{subfolder}/{table}.json', force_ascii=False, orient='records')
        except:
            '''
                problemimages
                tomcat_sessions
                users
            '''

            print(table)
            # print(df.dtypes)




if __name__ == '__main__':
    main()
