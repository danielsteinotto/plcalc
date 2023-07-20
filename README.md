# Position Profit/Loss Calculator
A simple service that calculates the potential profit and loss of a position based on quantitity, and entry, take profit, and stop loss levels.
The calculator also computes position risk/reward ratio and other relevant risk management metrics.

## Getting Started
- Generate a 24-hour API token in the Saxo Developer portal and export the token to an environment variable named `SAXO_TRADER_API_TOKEN`
- Import the provided Postman collection
- Start the application (`node main`)
- Open Postman and make some requests

## Future Improvements
- Request mocks and integration tests
- API request parameter and schema validation
- API error codes and messages
- Proper floating point precision
- Multiple currency support
- Allow Saxo client module to initialise with token on import instead of parsing env var
- More calculation options, e.g. take profit level from stop loss and risk/reward ratio