# api-gateway-util

Utility for API Gateway.

## Installation

```
npm i api-gateway-util -S
```

## matchByPath(resources, path)

This function finds a resource that match by the argument `path` from `resources`.

### arguments

- `resources`
- `path`

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
