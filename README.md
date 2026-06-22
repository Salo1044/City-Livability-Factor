# City Livabiility Factor
A full-stack web application that ranks U.S. cities by livability using a weighted scoring system based on crime rates and access to various transportation methods

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Frontend:** Javascript, HTML, CSS

## How It Works
Cities are scored using a weighted formula across five metrics, ranked from most to least important:

| Metric | Weight |
|---|---|
| Violent Crime Rate | 5 |
| Property Crime Rate | 4 |
| Walk Score | 3 |
| Transit Score | 2 |
| Bike Score | 1 |

Crime rates are normalized and inverted so lower crime rates result in better scores. Walk, Transit, and Bike scores use Walk Score's 0-100 scale. The final livability score is a weighted sum of all normalized metrics.

## Setup
### Prerequisites
- Node.js
- MySQL

### Installation
1. Clone the repository
```bash
   git clone https://github.com/Salo1044/City-Livability-Factor.git
   cd City-Livability-Factor
```

2. Install dependencies
```bash
   npm install
```

3. Set up database using provided schema
```bash
   mysql -u root -p < schema.sql
```

4. Create a `.env` file in the root directory using `.env.example` as a reference

5. Start the server
```bash
   node server.js
```

6. Visit `http://localhost:3000` in your browser

## Security
- Database credentials are managed via environment variables and never committed to the repository
- API endpoints are rate limited to 100 requests per 15 minutes
- Database user is configured with read-only permissions

## Data Sources
- Walkability metrics: [Walk Score](https://www.walkscore.com/)
- Crime rate data (most recent data 2024): [NeighborhoodScout](https://www.neighborhoodscout.com/)

Manually entered the data from sources listed above

## Future Plans
- Include population filter (i.e. Only list cities with population above 200k)
- Include sources page on application frontend
- Add picture of city to each entry
- Cost of Living metric addition
