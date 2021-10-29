# Clips Autoplay

Clips Autoplay is a continuous video player for Twitch Clips.
Search for Twitch Channels, Games or Categories, LiveStreamFail with some filtering options and watch continuosly until there are no more clips in your current search.

## Features

- Autocomplete Search
- API wrapper based on Twitch API
- API wrapper based on Reddit API
- Viewed Clips tracking
- Custom Video Player
- Favourite Searches Saving (Local Storage)
- Settings Saving (Local Storage)
- Continuous Playlist Creation

## Built With

- NodeJS with Express
- MongoDB with mongoose
- TypeScript
- React
- Sass

## Installation

### Server

0. Change to the Server folder
   `cd server`

1. Create a .env file with the following variables:

- TWITCH_CLIENT_ID
- TWITCH_SECRET
- MONGO_URI

For the Twitch variables you need to create your own Twitch Application.

2. Install all dependecies
   `yarn install`

3. Transpile the TypeScript files
   `yarn watch`

4. Start the server in development mode
   `yarn dev`

### Client

0. Change to the Client folder
   `cd client`

1. Create a .env file with a variable 'REACT_APP_API_URI' with the api adress, in development it should be 'http://localhost:4000' since it's the default set by the server.

2. Install all dependecies
   `yarn install`

3. Start the server
   `yarn start`
