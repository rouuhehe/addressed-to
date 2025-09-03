# Api REST - Addressed To

Node.js Api REST inspired by `THE UNSENT PROJECT`, click [here](https://theunsentproject.com/) for reference!

### .env:

I know this isn't right, but it's easier this way...

```env
PORT=3000
PATH=localhost
DB_PATH=./db.sqlite
JWT_SECRET=pablito_clavo_un_clavito
```

### Entities:

- `letter` 💌
  
| Attribute   | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| id          | UUID    | Unique identifier                 |
| content     | String  | The body of the letter            |
| addressedTo | String  | A name that others can search for |
| hidden      | Boolean | Post status                       |


- `admin` 👤
  
| Attribute | Type   | Description       |
| --------- | ------ | ----------------- |
| id        | UUID   | Unique identifier |
| email     | String | Login email       |
| password  | String | Hashed password   |

