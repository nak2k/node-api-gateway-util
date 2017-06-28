# api-gateway-util

Utility for API Gateway.

## Installation

```
npm i api-gateway-util -S
```

## matchByPath(resources, path[, callback])

This function finds a resource that match by the argument `path` from `resources`.

### arguments

- `resources`
- `path`
- `callback(err, result)`

### returning value

This function returns the following array

``` javascript
[err, result]
```

- `err`
- `result`
- `result.resource`
- `result.pathParameters`

## License

MIT
