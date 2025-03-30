Documentazione Backend - Blog API

Introduzione
Questa API è stata sviluppata utilizzando Node.js, Express, MongoDB e altre tecnologie per gestire
un'applicazione di blog.
Permette agli utenti di registrarsi, effettuare il login, creare, visualizzare, modificare ed eliminare
post, e caricare immagini tramite Cloudinary.

Tecnologie utilizzate
- Node.js per il backend.
- Express.js per la gestione delle rotte.
- MongoDB come database per gli utenti e i post.
- Cloudinary per il caricamento delle immagini.
- JSON Web Token (JWT) per l'autenticazione.
- bcryptjs per la crittografia delle password.

Variabili d'ambiente
Per configurare correttamente l'applicazione, sono necessarie alcune variabili d'ambiente. Crea un
file .env nella root del progetto e aggiungi le seguenti variabili:
MONGO_URL=mongodb://localhost:27017/blog
JWT_SECRET=il_tuo_secret_key
CLOUDINARY_CLOUD_NAME=il_tuo_nome_cloudinary
CLOUDINARY_API_KEY=la_tua_api_key
CLOUDINARY_API_SECRET=la_tua_api_secret
PORT=5000

Rotte API

1. Registrazione Utente
URL: /api/users/register
Metodo: POST
Body (JSON):
{
 "name": "Nome Utente",
 "email": "email@example.com",
 "password": "password123"
}
Descrizione: Registra un nuovo utente con il nome, email e password. La password sarà criptata
prima di essere salvata nel database.

2. Login Utente
URL: /api/users/login
Metodo: POST
Body (JSON):
{
 "email": "email@example.com",
 "password": "password123"
}
Descrizione: Effettua il login dell'utente. Restituisce un token JWT se le credenziali sono corrette.
Risposta:
{
 "message": "Login effettuato con successo!",
 "token": "JWT_TOKEN"
}

3. Creazione Post
URL: /api/posts
Metodo: POST
Body (JSON):
{
 "title": "Titolo del post",
 "content": "Contenuto del post",
 "authorId": "ID_utente_autore"
}
Descrizione: Crea un nuovo post. È necessario essere autenticati e fornire un token JWT nell'header "Authorization" per poter creare un post.

4. Visualizzazione di Tutti i Post
URL: /api/posts
Metodo: GET
Descrizione: Recupera tutti i post pubblicati.

5. Visualizzazione di un Post
URL: /api/posts/:id
Metodo: GET
Descrizione: Recupera un post specifico tramite l'ID.

6. Modifica Post
URL: /api/posts/:id
Metodo: PUT
Body (JSON):
{
 "title": "Nuovo titolo del post",
 "content": "Nuovo contenuto del post"
}
Descrizione: Modifica un post esistente. L'autore del post deve essere autenticato con il token JWT.

7. Eliminazione Post
URL: /api/posts/:id
Metodo: DELETE
Descrizione: Elimina un post specifico. Solo l'autore del post o un amministratore può eliminarlo.

8. Caricamento Immagini su Cloudinary
URL: /api/upload
Metodo: POST
Body (JSON):
{
 "imageUrl": "https://url_dell_immagine"
}
Descrizione: Carica un'immagine su Cloudinary da un URL. Restituisce l'URL dell'immagine
caricata.

Gestione degli Errori
L'API restituisce messaggi di errore dettagliati per aiutare a comprendere eventuali problemi.
Errore di autenticazione:
{
 "message": "Credenziali non valide!"
}
Errore di server:
{
 "message": "Errore del server!"
}

Autenticazione con JWT
Quando un utente si registra o effettua il login, riceve un token JWT. Questo token deve essere
incluso nell'header "Authorization" per le richieste che richiedono l'autenticazione.
Esempio di richiesta con token JWT:
Authorization: Bearer JWT_TOKEN

Configurazione CORS
L'applicazione utilizza CORS per consentire la comunicazione tra il server e il frontend (che può
essere su un dominio diverso).

Opzioni CORS:
{
 origin: "*", // Accetta richieste da qualsiasi origine
 methods: "GET,POST,PUT,DELETE",
 allowedHeaders: "Content-Type,Authorization",
}

Conclusioni
Questa documentazione descrive le principali rotte e funzioni del backend dell'applicazione blog. Se
ci sono ulteriori modifiche o implementazioni, è possibile espandere questa documentazione
aggiungendo nuove rotte e funzionalità.