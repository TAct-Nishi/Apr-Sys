import psycopg2


def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="aprdb",
        user="myuser",
        password="baisen0519"
    )
    return conn
