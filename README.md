# George - 2020-09-17

## Installation

// All the instructions to run the APPlication

### `yarn start`

Runs the APP in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-APP/docs/running-tests) for more information.

### `yarn build`

Builds the APP for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your APP is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-APP/docs/deployment) for more information.

## Security

// List security concerns:
// - that have been addressed

- File input has image MIME types png and jpg specified to help prevent dangerous files being uploaded
- File uploads are validated to ensure file size isn't enormous before sending to server
- User search box input and file name are sanitised using XSS module to help prevent XSS
- User input is not used in URL or template to help prevent XSS
- Content security policy lists localhost:3000 (APP) and localhost:3001 (API) as the valid script and content src to help prevent malicious content from other domains being downloaded/executed
- CORS headers direct browser to allow localhost:3000 only

// - that have _not_ been addressed

- API does not validate file type or file size
- API does not sanitise user search term
- HTTPS is not configured
- CSP points to localhost, it should point to a dedicated domain
- There is no rate limiting on the API, it could be overloaded easily
- APP does not verify the content of API responses

## Improvements

// What could be added to the APP / API?

- Pagination for read requests

## Libraries

// What external libraries have you used and why?

### nock

A good testing util for mocking HTTP responses. Enables us to render the entire APP in our tests.

### xss

A popular module for sanitising user input.

## API

// Any general observation about the API?
// document each endpoint using the following template:

```


### GET /resources
// Description of the endpoint:
// - what does the endpoint do?
// - what does it return?
// - does it accept specific parameters?
```

---

## Other notes

// Anything else you want to mention
