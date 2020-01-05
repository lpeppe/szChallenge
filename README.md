# SZCHALLENGE
Questa repository contiene la soluzione al business case proposto.
Lo stack utilizzato è il seguente:
* Angular per la SPA
* AdonisJs per il backend

Ho utilizzato Docker Compose per orchestrare le componenti del sistema e per eseguire i test e2e con Cypress.
## Esecuzione
L'applicazione può essere eseguita in due diverse modalità, a seconda di se si vuole utilizzare il SSR o semplicemente fare il serving dei file compilati.
### Senza SSR
```
docker-compose -f docker-compose.yml up --build
```
### Con SSR
```
docker-compose -f docker-compose.yml -f docker-compose.ssr.yml up --build
```
In entrambi i casi l'applicazione sarà accessibile su `http://localhost:4200`
## Testing
Sono stati implementati i seguenti test:
* Unit test per il backend
* Functional test per il backend
* Unit test per il frontend
* E2E tests

> N.B. I test case implementati non rappresentano una suite di test esaustiva ma sono soltanto un piccolo esempio per mostrare le tecniche di testing che conosco.

Di seguito sono riportate le istruzioni per eseguire le varie suite.
### Unit e Functional tests per il backend
```
docker-compose run backend adonis test
```

### Unit test per il frontend
```
cd frontend/
npm i
ng test
```

### E2E tests
```
cd e2e/
docker-compose up --build --exit-code-from=cypress
```

## Documentazione
La documentazione per l'applicazione frontend si trova in `frontend/documentation/index.html`.


