# juskart

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v0.12.0
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.


### Creating new models 
1. npm install -g yo grunt-cli generator-expressjs-api


####App

Sets up a new ExpressJS API Boilerplate with best practices

Usage:

Usage:
  yo expressjs-api:app [options] [<name>]

Options:
  -h,   --help          # Print the generator's options and usage
        --skip-cache    # Do not remember prompt answers                        Default: false
        --skip-install  # Do not install dependencies                           Default: false
        --app-suffix    # Allow a custom suffix to be added to the module name  Default: App

Arguments:
  name    Type: String  Required: false
Example:

yo expressjs-api
Endpoint

Generates a new API endpoint.

Usage:

Usage:
  yo expressjs-api:endpoint [options] <name>

Options:
  -h,   --help               # Print the generator's options and usage
        --skip-cache         # Do not remember prompt answers           Default: false
        --route              # URL for the endpoint
        --models             # Specify which model(s) to use
        --endpointDirectory  # Parent directory for enpoints

Arguments:
  name    Type: String  Required: true
Example:

yo expressjs-api:endpoint message
[?] What will the url of your endpoint be? /api/messages
Produces:

server/api/message/index.js
server/api/message/index.spec.js
server/api/message/message.controller.js
server/api/message/message.integration.js
server/api/message/message.model.js  (optional)
server/api/message/message.events.js (optional)
server/api/message/message.socket.js (optional)