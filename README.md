# Inset — gestion de catalogue

Application pratique Angular 19 standalone et API Spring Boot pour gérer un catalogue de produits. Le projet contient le front Angular, l’API REST et une base H2 locale persistante.

## Dépendances

- Node.js 18+ et npm
- Java 21 et Maven 3.9+
- Angular 19.2, Bootstrap 5, Bootstrap Icons et RxJS (installés par npm)
- Spring Boot 3.4.3, Spring Web, Spring Data JPA, Validation et H2 (Maven)

## Démarrage

Ouvrir le dossier `inset-app` dans IntelliJ IDEA. Le front et le backend peuvent être ouverts comme projets séparés dans la même fenêtre.

1. Dans un terminal IntelliJ, démarrer l’API :

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   L’API démarre sur `http://localhost:8083`. Les trois produits d’exemple sont insérés au premier lancement. Les modifications sont conservées dans `backend/data/`.

2. Dans un second terminal, démarrer Angular :

   ```bash
   npm install
   npm start
   ```

   Ouvrir `http://localhost:4200`.

Le backend autorise les appels CORS depuis `http://localhost:4200`. L’API expose `GET /products`, `POST /products`, `DELETE /products/{id}` et `PATCH /products/{id}/selection`.

## Vérifier les compilations

```bash
npm run build
cd backend && mvn package
```

Si le catalogue signale une erreur de connexion, vérifier que le backend est lancé sur le port 8083. La base H2 locale se trouve dans `backend/data/`.
