# Coronavirus API
 A free to use COVID19 data API updated time to time!
 
 It has been built using [TypeScript](https://www.typescriptlang.org/) 
 using a server backend built using [Express](https://expressjs.com/) in
 [NodeJS](https://nodejs.org/en/) environment. The data is being fetch and processed every minute to ensure accurate and updated data!
 
 ## Endpoints
 API requests can be made to this url: `` https://coronavirus-node.herokuapp.com/``
 
 1. ``GET /all`` will provide you with data of (almost) all countries as well as total confirmed cases, deaths and total recoveries. It even fetches timeline of confirmed cases, deaths and recoveries.
 2. ``GET /country/:country-name`` will fetch you details specific to the country itself.
 3. ``GET /total`` will fetch you only total cases, deaths and recovered cases and nothing else.
 
 ## Credits
 Data is being fetched and restructured from the infamous [Novel Coronavirus (COVID-19) Cases, provided by JHU CSSE](https://github.com/CSSEGISandData/COVID-19) every minute.
 Also big props to [Omaroid](https://github.com/Omaroid) as his [API](https://github.com/Omaroid/Covid-19-API) served me a big inspiration to built this API.
 
 ## Required Technology
 1. [NodeJS](https://nodejs.org/en/)
 
 ## Installation and Running
 1. ``git clone https://github.com/khatrivarun/coronavirus-node.git``
 2. Run ``npm install`` to install all dependencies and dev dependencies.
 3. Run ``npm run start`` in project root to start up the server.
 4. All requests can then be fetched on ``localhost:3000``
 
 ## License
 This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for detai
