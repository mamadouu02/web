# Backend

## Obtention d'un token d'accès

```js
fetch("http://localhost:3000/login", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "email": "John.Doe@acme.com",
    "password": "1m02P@SsF0rt!"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```