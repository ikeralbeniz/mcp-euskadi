# DNDzgz MCP Server

This is an MCP (Model Context Protocol) server that provides information about the Zaragoza tram system, including real-time tram arrival estimations and station information using the [DNDzgz](https://www.dndzgz.com/) API.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/danilat/mcp-dndzgz.git
cd mcp-dndzgz
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the server:
```bash
npm start
```

The server will start and connect to the MCP transport layer.

## Available Tools

The server provides two main tools:

1. `zaragoza-tram-estimations`: Get real-time arrival estimations for a specific tram station
   - Parameters: `station` (string)
   - Returns: JSON with arrival times

2. `zaragoza-tram-stations`: Get a list of all tram stations in Zaragoza
   - Parameters: none
   - Returns: JSON with station information

## Dependencies

- @modelcontextprotocol/sdk: ^1.9.0


## Example

There is an screenshot with example using Claude Desktop

![Screenshot of an example using Claude Desktop, asking in spanish to get the tram estimations for Romareda station](./docs/sample.png)