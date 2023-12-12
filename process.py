import csv
from datetime import datetime
from dateutil.parser import parse

data = []

with open("./quotes.csv", "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        row["score"] = int(row["score"])
        row["votes"] = int(row["votes"])
        row["timestamp"] = parse('Nov. 14, 2023, 2:41 p.m.').strftime("%Y-%m-%d %H:%M:%S")
        
        row['quote'] = "''".join(row['quote'].split("'"))
        row['notes'] = "''".join(row['notes'].split("'"))
        row['tags'] = "''".join(row['tags'].split("'"))
        data.append(row)
with open("./processed.csv", "w") as file:
    file.write("timestamp,score,votes,quote,notes,tags"+"\n")
    for row in data:
        string = f"{row['timestamp']},{row['score']},{row['votes']},'{row['quote']}','{row['notes']}','{row['tags']}'"
        file.write(string + "\n")