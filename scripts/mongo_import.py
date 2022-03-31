import pymongo

import json

client = pymongo.MongoClient()

db = client.judge


FOLDER = 'output/2022.03.30'
tables = ["appconfigs", "contestants", "contests", "difflog", "downloads", "forum", "imessages", "loginlog", "logs", "pages", "problemimages", "problemlocales", "problems", "schools", "solutions", "tasks", "testcodes", "tokens", "upfiles", "users", "vclasses", "vclassstudents", "vclasstemplates"]

def main ():
    for table in tables:
        filename = f'{FOLDER}/{table}.json'
        with open(filename, 'r') as f:
            data = json.load(f)
            if len(data) == 0:
                continue
            db[table].delete_many({})
            db[table].insert_many(data)
    


if __name__ == '__main__':
    main()