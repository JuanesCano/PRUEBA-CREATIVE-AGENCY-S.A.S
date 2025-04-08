import requests
from pymongo import MongoClient, errors

API_URL = "https://jsonplaceholder.typicode.com/users"

MONGO_URI = "mongodb+srv://juan:123@clusterprueba.bofgmi9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPrueba"
DB_NAME = "pythonTest"
COLLECTION_NAME = "users"

def fetch_users():
    try:
        response = requests.get(API_URL, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exeptions.RequestsExeption as e:
            print("Error al consultar la api")
            return []

def setup_mongo():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS = 5000)
        client.server_info()
        db = client[DB_NAME]
        return db[COLLECTION_NAME]
    except Exception as e:
        print("error al conectar con la db")
        return None
    
def save_users(collection,users):
    try:
        for user in users:
            collection.update_one(
                {"id": user["id"]},
                {"$set": user},
                upsert = True
            )
        print("Usuarios guardados correctamente")
    except Exception as e:
        print("Error al guardar usuarios")
           
def main():
    print("Consultando API...")
    users = fetch_users()
    if not users:
        print("No se pudieron obtener los usuarios")
        return
    print("Conectando a mongo")
    collection = setup_mongo()
    if collection is None:
        print("No se pudo conectar con mongo")
        return
    print("Guardando users en mongo")
    save_users(collection, users)
    print("Listo se guardo")
if __name__ == "__main__":
    main()