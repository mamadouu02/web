# Backend

## Obtention d'un token d'accès

```js
fetch("http://localhost:3000/login", {
  "method": "GET",
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "email": "bob@gmail.com",
    "password": "12345"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```