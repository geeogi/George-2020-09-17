# George - 2020-09-17

## Installation

// All the instructions to run the application

- Ensure you have Node 12+ installed.
- Ensure you have Yarn 1.16+ installed.
- Git clone this repo: `git clone <ssh-link>`
- Navigate to the API directory and install the dependencies for the API: `yarn install`.
- Run the API: `yarn dev`. The API is configured to run on localhost:3001.
- Navigate to the APP directory and install the dependencies for the APP: `yarn install`.
- Run the APP: `yarn start`.
- Open [http://localhost:3000](http://localhost:3000) to view the APP in the browser.

### Test

- Enter the test runner: `yarn test`
- Press `a` to run all the tests.

### Build

- Build the app: `yarn build`

This builds the APP for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. You can serve it locally using `npx serve -p 3000 build/`.

## Security

// List security concerns:

### That have been addressed

- File input has image MIME types png and jpg specified to help prevent dangerous files being uploaded
- File uploads are validated to ensure file size isn't enormous before sending to server
- User search box input and file name are sanitised using XSS module to help prevent XSS
- User input is not used in URL or template to help prevent XSS
- Content security policy lists localhost:3000 (APP) and localhost:3001 (API) as the valid script and content src to help prevent malicious content from other domains being downloaded/executed. Webpack has been configured to avoid inline scripts during the build to enable this.
- CORS headers direct browser to allow localhost:3000 only

### That have _not_ been addressed

- API does not validate file type or file size
- API does not sanitise user search term
- HTTPS is not configured
- CSP points to localhost, it should point to a dedicated domain
- Should configure webpack dev server to avoid inline styles so 'unsafe inline' can removed from style-src CSP
- There is no rate limiting on the API, it could be overloaded easily
- APP does not verify the content of API responses

## Improvements

// What could be added to the APP / API?

- Pagination for read requests to improve performance when many documents exist
- Enable the user to preview and rename the uploaded file and retrieve it from the API
- Abort pending search requests when re-searching
- Respond to different errors with different messaging (e.g. 500 vs no network connection)
- Use GraphQL to prevent over fetching (e.g. avoid re-fetching all resources after creation/deletion)
- Update the API so it doesn't expose image paths (currently being used as the `id` field)
- Update the API to use a DB instead of writing files locally
- Give user the option to clear search
- More extensive tests

## Libraries

// What external libraries have you used and why?

- Nock: a good testing util for mocking HTTP responses. Enables us to render the entire APP in our tests.
- Xss: a popular module for sanitising user input.

## API

// Any general observation about the API?

Resources (documents) are returned from the API with the following JSON structure:

```ts
Resource: {
    "id": string, // ID used to identify the image
    "name": string, // name of the image
    "size": number // size of the image in bytes
}
```

The HTTP API can be used to create, delete, list and search resources. Only the metadata for a resource (name, id and size) is returned by the API. The image file associated with a resource is stored locally on the API server however there is currently no way to retrieve the image file itself via the API (the API is fake in many ways and is not production ready). 

### GET /resources -> Resource[]

This endpoint returns all the resources. JSON containing an array of type Resource is returned.

### GET /resources/search?term={string} -> Resource[]

This endpoint returns all the resources which match the search term string. The matching function is very crude and simply matches the filenames which include the search term. JSON containing an array of type Resource is returned.

### POST /resource -> OK

This endpoint can be used to create a resource. This endpoint expects a multipart form with a "file" field containing an image file with MIME type png or jpg and a "name" field of type string. A new resource will be created using the file and name. A 200 status code is returned.

### DELETE /resource/{id} -> OK

This endpoint can be used to delete a resource. The ID of the resource must be specified in the path variable. The resource will be deleted and a 200 status code is returned.

---

## Other notes

// Anything else you want to mention
