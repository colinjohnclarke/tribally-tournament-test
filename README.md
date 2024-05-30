Project Overview
Installation

1. Clone the repository: `git clone https://github.com/example/backend-api-service.git`
2. Install dependencies: `npm install`
3. Set up the environment variables by creating a `.env` file.
4. Add the following variables to your .env file
   PORT = 3600
   MONGODB_URI = mongodb+srv://colinjohnclarke2:FKQpfTSigBsZnb4m@cluster0.y1d45tb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
5. Run the project: `npm run dev`
6. I havent had time for testing unfortuately. However as I have broken functions down into controllers, services, and respositort layers it should be modular enough to test easily. ENJOY!

Usage

# API PlayerEndpoints

- `POST http://localhost:3600/players`: create a new player and saves hashed pasword and email.

Example

request body:

```json
{ "playerName": "Colin Clarke", "email": "colin@colin.com", "password": "123" }
```

reponse:

```json
{
  "message": "player registered successfully",
  "result": {
    "playerName": "Colin Clarke",
    "email": "colin@colin.com",
    "password": "$2b$10$PisOqdoXmq4QgVZ3eDLbWeED9vR.DcACfwN6LqsR92yTo6cFTpJkK",
    "outcomes": {
      "win": 0,
      "lose": 0,
      "draw": 0
    },
    "matchUps": [],
    "rank": null,
    "_id": "665830c97bc367a56db79a90",
    "__v": 0
  }
}
```

- `GET http://localhost:3600/players`: gets all registered players in DB .

- `GET http://localhost:3600/players:playerId`: gets one registered players in DB

example request:

http://localhost:3600/players?playerId=66573e6a3781af7c3c973166

example response

```json
{
  "message": "player(s) data found",
  "player": {
    "outcomes": {
      "win": 1,
      "lose": 1,
      "draw": 1
    },
    "_id": "66573e6a3781af7c3c973166",
    "playerName": "Colin",
    "email": "colin@colin.com",
    "password": "$2b$10$aTEX5wppEikJYcIpJWCVwOco755O5H.YKKziyROBtvwIWmjGJhIVG",
    "matchUps": [
      "66573ece3781af7c3c97316d",
      "66573f753781af7c3c973173",
      "6657407a3781af7c3c97317a"
    ],
    "rank": null,
    "__v": 0
  }
}
```

# API MatchEndpoints

- `POST http://localhost:3600/matchups`: Create a new matchUp, requires date of matchUp and two assigned players, a status of pending is assigned untill match takes place

Example

request body:

```json
{
  "date": "08-08-24",
  "player1": "66573e6a3781af7c3c973166",
  "player2": "66573e733781af7c3c973168"
}
```

example reponse:

```json
{
  "message": "matchup registered successfully",
  "result": {
    "date": "08-08-24",
    "player1": "66573e6a3781af7c3c973166",
    "player2": "66573e733781af7c3c973168",
    "status": "pending",
    "_id": "665834eb7bc367a56db79a93",
    "__v": 0
  }
}
```

- `GET http://localhost:3600/matchups`: Retrieves all match ups from DB

example reponse:

```json
{
  "message": "MatchUp found sucessfully",
  "matchup": [
    {
      "_id": "66573ece3781af7c3c97316d",
      "date": "03-01-24",
      "player1": "66573e6a3781af7c3c973166",
      "player2": "66573e733781af7c3c973168",
      "status": "completed",
      "__v": 0,
      "draw": false,
      "loser": "66573e733781af7c3c973168",
      "result": "2-3",
      "winner": "66573e6a3781af7c3c973166"
    },
    {
      "_id": "66573f753781af7c3c973173",
      "date": "3-06-24",
      "player1": "66573e733781af7c3c973168",
      "player2": "66573e8f3781af7c3c97316a",
      "status": "completed",
      "__v": 0,
      "draw": true,
      "loser": "66573e8f3781af7c3c97316a",
      "result": "0-0",
      "winner": "66573e6a3781af7c3c973166"
    },
    {
      "_id": "6657410f3781af7c3c97317e",
      "date": "10-01-24",
      "player1": "66573e6a3781af7c3c973166",
      "player2": "66573e733781af7c3c973168",
      "status": "pending",
      "__v": 0
    },
    {
      "_id": "665834eb7bc367a56db79a93",
      "date": "08-08-24",
      "player1": "66573e6a3781af7c3c973166",
      "player2": "66573e733781af7c3c973168",
      "status": "pending",
      "__v": 0
    }
  ]
}
```

- `PUT http://localhost:3600/matchups` : Records the result of the matchup to the relevant match up updating status result etc and updates the player objects with the relevant details and increments their win lose or draw values accordingly, and records the matchup they took part in an array.

specify the status as void/completed/pending

Example

request body:

```json
{
  "matchDetails": {
    "matchUpId": "6657410f3781af7c3c97317e",
    "status": "completed",
    "result": "2-5",
    "winner": "66573e6a3781af7c3c973166",
    "loser": "66573e733781af7c3c973168",
    "draw": false
  }
}
```

reponse

```json
{
  "message": "matchup updated successfully",
  "updatedMatchUp": [
    {
      "_id": "6657410f3781af7c3c97317e",
      "date": "10-01-24",
      "player1": "66573e6a3781af7c3c973166",
      "player2": "66573e733781af7c3c973168",
      "status": "completed",
      "__v": 0,
      "draw": false,
      "loser": "66573e733781af7c3c973168",
      "result": "2-5",
      "winner": "66573e6a3781af7c3c973166"
    }
  ]
}
```

Now the player object has be updated also where the win lose or draw value has been updated

```json

from mongo
{
  "_id": { "$oid": "66573e6a3781af7c3c973166" },
  "playerName": "Colin",
  "email": "colin@colin.com",
  "password": "$2b$10$aTEX5wppEikJYcIpJWCVwOco755O5H.YKKziyROBtvwIWmjGJhIVG",
  "outcomes": {
    "win": { "$numberInt": "2" },
    "lose": { "$numberInt": "1" },
    "draw": { "$numberInt": "1" }
  },
  "matchUps": [
    "66573ece3781af7c3c97316d",
    "66573f753781af7c3c973173",
    "6657407a3781af7c3c97317a",
    "6657410f3781af7c3c97317e"
  ],
  "__v": { "$numberInt": "0" }
}
```

# API TournamentEndpoints

- `POST http://localhost:3600/tournaments`: create a new by passing date.

example
request body

```json
{ "tournamentDate": "08-06-26" }
```

result

```json
{
  "message": "tournament created successfully",
  "result": {
    "date": "08-06-26",
    "matchUps": [],
    "_id": "66584500008c1ad1413ccaae",
    "__v": 0
  }
}
```

- `GET http://localhost:3600/tournaments`: get all tournaments

example response

```json
{
  "message": "OK. Tournament found successfully",
  "tournament": [
    {
      "_id": "665844eb008c1ad1413ccaac",
      "date": "04-06-56",
      "matchUps": [
        "66584f00ffa7b29c0869869c",
        "665834eb7bc367a56db79a93",
        "66584f36ffa7b29c086986a0",
        "66584f25ffa7b29c0869869e"
      ],
      "__v": 0
    },
    {
      "_id": "66584500008c1ad1413ccaae",
      "date": "08-06-26",
      "matchUps": [
        "66584f36ffa7b29c086986a0",
        "66584f25ffa7b29c0869869e",
        "66584f00ffa7b29c0869869c",
        "665834eb7bc367a56db79a93"
      ],
      "__v": 0
    }
  ]
}
```

- `GET http://localhost:3600/tournaments:tournamentid`: get specific tournaments

  example request

http://localhost:3600/tournaments?tournamentId=665844eb008c1ad1413ccaac

example response

```json
{
  "message": "OK. Tournament found successfully",
  "tournament": {
    "_id": "665844eb008c1ad1413ccaac",
    "date": "04-06-56",
    "matchUps": [
      "66584f00ffa7b29c0869869c",
      "665834eb7bc367a56db79a93",
      "66584f36ffa7b29c086986a0",
      "66584f25ffa7b29c0869869e"
    ],
    "__v": 0
  }
}
```

- `PUT http://localhost:3600/tournaments`: add match ups to the this tournament.

example

request body

```json
{
  "tournamentDetails": {
    "tournamentId": "66584500008c1ad1413ccaae",
    "matchUpIds": [
      "66584f36ffa7b29c086986a0",
      "66584f25ffa7b29c0869869e",
      "66584f00ffa7b29c0869869c",
      "665834eb7bc367a56db79a93"
    ]
  }
}
```

example response

```json
{
  "message": "OK. Tournament updated successfully",
  "result": {
    "_id": "66584500008c1ad1413ccaae",
    "date": "08-06-26",
    "matchUps": [
      "66584f36ffa7b29c086986a0",
      "66584f25ffa7b29c0869869e",
      "66584f00ffa7b29c0869869c",
      "665834eb7bc367a56db79a93"
    ],
    "__v": 0
  }
}
```

# API LeaderBoardEndpoints

- `GET http://localhost:3600/leaderboards:tournamentId`: Collect the leaderboard for the particular tournament by providing the tournament ID of your choice. Results are collected from matchups from the particular tournament, with 3 points assigned for a win, 1 for draw and 0 for loss.

example request http://localhost:3600/leaderboards?tournamentId=665844eb008c1ad1413ccaac

example response

```json
{
  "message": "OK",
  "result": [
    {
      "playerName": "Colin",
      "playerId": "66573e6a3781af7c3c973166",
      "points": 7
    },
    {
      "playerName": "Paul",
      "playerId": "66573e8f3781af7c3c97316a",
      "points": 4
    },
    {
      "playerName": "John",
      "playerId": "66573e733781af7c3c973168",
      "points": 1
    },
    {
      "playerName": "Colin Clarke",
      "playerId": "665830c97bc367a56db79a90",
      "points": 1
    }
  ]
}
```


