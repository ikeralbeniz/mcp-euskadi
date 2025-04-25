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

3. Add a .env with the environment variable with a valid google maps api key
```
GOOGLE_MAPS_API_KEY=your-api-key
```

## Running the Application

To start the server:
```bash
npm start
```

The server will start and connect to the MCP transport layer.

## Available Tools

The server provides the following tools:

1. `zaragoza-tram-estimations`: Get real-time arrival estimations for a specific tram station
   - Parameters: `station` (number)
   - Returns: JSON with arrival times

2. `zaragoza-tram-stations`: Get a list of all tram stations in Zaragoza
   - Parameters: none
   - Returns: JSON with station information

3. `zaragoza-bus-stops`: Get all bus stops in Zaragoza
   - Parameters: none
   - Returns: JSON with bus stop locations

4. `zaragoza-bus-estimations`: Get real-time arrival estimations for a specific bus stop
   - Parameters: `stop` (number)
   - Returns: JSON with arrival times

5. `zaragoza-bizi-stations`: Get all Bizi stations in Zaragoza
   - Parameters: none
   - Returns: JSON with Bizi station locations

6. `zaragoza-bizi-estimations`: Get real-time availability of bikes and free slots in a Bizi station
   - Parameters: `station` (number)
   - Returns: JSON with bikes and parking availability

7. `google-maps-link`: Get a Google Maps link for a specific location
   - Parameters: `latitude` (number), `longitude` (number)
   - Returns: Google Maps URL

8. `geolocation-from-address`: Get the geolocation (latitude and longitude) from an address and the formatted address that was found
   - Parameters:
     - `address` (string): The address to geolocate (e.g., "Plaza del Pilar, Zaragoza, Spain")
   - Returns: JSON with the latitude, longitude, confidence level, and formatted address

## Dependencies

- @modelcontextprotocol/sdk: ^1.9.0


## Example

There is an screenshot with example using Claude Desktop

![Screenshot of an example using Claude Desktop, asking in spanish to get the tram estimations for Romareda station](./docs/sample.png)