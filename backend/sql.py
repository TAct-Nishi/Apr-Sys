import psycopg2


def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="aprdb",
        user="myuser",
        password="baisen0519"
    )
    return conn


def save_application(data):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO applications (name, description) VALUES (%s, %s)",
        (data['name'], data['description'])
    )
    conn.commit()
    cur.close()
    conn.close()


def get_applications():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT id, name, description, created_at FROM applications ORDER BY created_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    applications = [
        {
            "id": row[0],
            "name": row[1],
            "description": row[2],
            "created_at": row[3].isoformat() if row[3] else None
        }
        for row in rows
    ]
    return applications
