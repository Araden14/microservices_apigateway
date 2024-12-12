import time
import json
import requests

def print_banner(message):
    print("\n" + "=" * 80)
    print(message)
    print("=" * 80)

def print_subtitle(message):
    print("\n" + "-" * 80)
    print(message)
    print("-" * 80 + "\n")

def slow_print(message, delay=3):
    # Affiche un message puis attend un certain délai avant de poursuivre
    print(message)
    time.sleep(delay)

def main():
    print_banner("DÉMO : Système de Réservation d'Hôtel via API Gateway et Microservices")

    slow_print("Bienvenue ! Cette démonstration va illustrer comment un client interagit avec une API Gateway,\n"
               "qui, elle, communique avec plusieurs microservices (Rooms, Payment, Customers, Users).", 4)

    # Étape 1 : Le client consulte les chambres disponibles
    print_subtitle("ÉTAPE 1 : Consultation des chambres disponibles (Microservice Rooms via API Gateway)")
    slow_print("Le client pense : « Je souhaite voir les chambres disponibles... »", 3)
    slow_print("Envoi d’une requête GET vers : http://localhost:3000/rooms", 2)
    try:
        response = requests.get("http://localhost:3000/rooms")
        response.raise_for_status()
        rooms_data = response.json()
        slow_print("Réponse reçue (Liste des chambres) :\n" + json.dumps(rooms_data, indent=2, ensure_ascii=False), 4)
    except Exception as e:
        print("Erreur lors de la récupération des chambres :", e)
        return

    # Supposons qu'on a au moins une chambre
    if not rooms_data:
        print("Aucune chambre disponible, la démonstration s'arrête ici.")
        return

    # Le client choisit la chambre C400 par exemple
    selected_room = None
    for room in rooms_data:
        if room.get("roomNumber") == "C400":
            selected_room = room
            break

    if not selected_room:
        print("La chambre C400 n'est pas disponible, veuillez adapter votre code ou la configuration.")
        return

    room_id = selected_room["_id"]

    slow_print(f"Le client pense : « Je souhaite réserver la chambre {selected_room['roomNumber']} »", 3)
    slow_print(f"L’ID de la chambre sélectionnée est {room_id}", 3)

    # Étape 2 : Le client s’enregistre (Microservice Users via API Gateway)
    print_subtitle("ÉTAPE 2 : Enregistrement d’un nouvel utilisateur (Microservice Users)")
    registration_data = {
        "name": "John ie",
        "email": "johndoe@gmeaz.com",
        "password": "mySecurePassword123",
        "dateOfBirth": "1990-01-01"
    }
    slow_print("Le client se dit : « Je dois m’enregistrer afin de créer une réservation. »", 3)
    slow_print(f"Envoi d’une requête POST vers : http://localhost:3000/register avec les données :\n{json.dumps(registration_data, indent=2, ensure_ascii=False)}", 4)
    try:
        reg_response = requests.post("http://localhost:3000/register", json=registration_data)
        reg_response.raise_for_status()
        reg_data = reg_response.json()
        slow_print("Réponse reçue (Données de l’utilisateur) :\n" + json.dumps(reg_data, indent=2, ensure_ascii=False), 4)
    except Exception as e:
        print("Erreur lors de l’enregistrement de l’utilisateur :", e)
        return

    # On récupère l'ID du client (par exemple renvoyé par le service)
    client_id = reg_data["user"]["_id"]

    if not client_id:
        print("Aucun ID client reçu. Impossible de continuer.")
        return

    slow_print(f"ID du client enregistré : {client_id}", 3)

    # Étape 3 : Le client fait une réservation (Microservice Reservation et Payment)
    print_subtitle("ÉTAPE 3 : Réservation d’une chambre (Microservice Reservation & Payment)")
    reservation_data = {
        "client_id": client_id,
        "roomId": room_id,
        "checkInDate": "2024-12-12",
        "checkOutDate": "2024-12-12",
        "totalAmount": 0,
        "currency": "EUR",
        "paymentmethod": "card"
    }
    slow_print("Le client pense : « Maintenant que je suis enregistré, je vais réserver la chambre. »", 3)
    slow_print("Envoi d’une requête POST vers : http://localhost:3000/reservations/reserver avec les données :\n" + json.dumps(reservation_data, indent=2, ensure_ascii=False), 4)

    try:
        reservation_response = requests.post("http://localhost:3000/reservations/reserver", json=reservation_data)
        reservation_response.raise_for_status()
        reservation_info = reservation_response.json()
        slow_print("Réponse reçue (Création de la réservation et du paiement) :\n" + json.dumps(reservation_info, indent=2, ensure_ascii=False), 4)
    except Exception as e:
        print("Erreur lors de la création de la réservation :", e)
        return

    # On suppose que la réponse comprend un champ "reservation" avec "_id"
    reservation_id = reservation_info.get("reservation", {}).get("_id")
    if not reservation_id:
        print("Impossible de récupérer l’ID de la réservation.")
        return

    slow_print(f"ID de la réservation créée : {reservation_id}", 3)

    # Étape 4 : Attente de la confirmation du paiement
    print_subtitle("ÉTAPE 4 : Attente de la confirmation du paiement (Microservice Payment)")
    slow_print("Le client attend la confirmation du paiement...", 2)
    # Simulation d’attente
    slow_print("Veuillez patienter pendant que le service Payment confirme la transaction...", 3)
    # Ici, vous pourriez simuler un poll du service Payment ou un callback
    slow_print("Paiement confirmé !", 2)
    slow_print("La réservation est maintenant confirmée et le statut devrait être mis à jour.", 3)

    # Étape 5 : Vérification des détails de la réservation (Microservice Reservation)
    print_subtitle("ÉTAPE 5 : Vérification des détails de la réservation")
    slow_print("Le client pense : « Je veux vérifier les détails de ma réservation. »", 3)
    reservation_details_url = f"http://localhost:3000/reservations/{reservation_id}"
    slow_print(f"Envoi d’une requête GET vers : {reservation_details_url}", 2)

    try:
        final_reservation_response = requests.get(reservation_details_url)
        final_reservation_response.raise_for_status()
        final_reservation_data = final_reservation_response.json()
        slow_print("Détails de la réservation récupérés :\n" + json.dumps(final_reservation_data, indent=2, ensure_ascii=False), 4)
    except Exception as e:
        print("Erreur lors de la récupération des détails de la réservation :", e)
        return

    slow_print("La démo est terminée. Nous avons vu le parcours complet : consultation des chambres, enregistrement, réservation, paiement, et vérification du statut de réservation !", 5)


if __name__ == "__main__":
    main()
