## Nurse Data API

#### Instruction

##### Using NPM
- Installing dependencies:
```npm install```
- Starting the server:
```npm start```
- Starting the server in dev mode (changes are updated on save and will be reflected immediately):
```npm run dev```

##### Using Yarn
- Installing dependencies:
```yarn```
- Starting the server:
```yarn start```
- Starting the server in dev mode (changes are updated on save and will be reflected immediately):
```yarn run dev```

#### API Routes
- Get many: `GET /v1/nurses`
- Get 1 by id: `GET /v1/nurse/:id`
- Create new record: `POST /v1/nurse/`
- Update an existing record: `PUT /v1/nurse/:id`
- Delete a record: `DELETE /v1/nurse/:id`

#### Tech Stacks
- Node.js
- SQLite3