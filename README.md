# api-gateway-util

Utility for API Gateway.

## Installation

```
npm i api-gateway-util -S
```

## matchBy(resources, options, callback = Array)

This function finds a resource that match by the argument `options` from `resources`.

### arguments

- `resources`
    - An array of resources are returned by `getResources` of [APIGateway](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html).
- `options.path`
    - A path of the resource to find.
- `options.method`
    - A method that the resource to find has.
- `callback(err, result)`
    - A function called when the search is completed or an error occurs.
    - `err`
        - An error object when an error occurs.
        - When successful, `null` passed into this argument.
    - `result`
        - An object of a resource matched by path.
        - If not matched, `null` passed into this argument.

### returning value

If `callback` is omitted, this function returns the following array.

``` javascript
[err, result]
```

For the definition of `err` and `result`, see the description of `callback`.

## License

MIT
