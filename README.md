# ql_guard

A Credit Card Validation API

## Setup

- Create a `.env` file using the `.env.example` file and set the PORT, HOST and API_KEY to your preferences.
- The `Content-Type` in the request header support only `application/json` and `application/xml`.
- Set the `Api-Key` in the request header to the same value of the `API_KEY` variable in the `.env` file.
- Start the server with `npm start`.

## API Documentation

The API exposes only a single endpoint. This endpoint accepts both JSON and XML payloads depending on the `Content-Type` set in the header.

The endpoint is also provided by an API key which is expected to be provided in the request header.

The path to this endpoint is `/` and the accepted method is `POST`.

### Headers

`Content-Type` can be any of `application/json` or `application/xml`. The endpoint does not support other content types.

`Api-Key` must be the same as the key set in the `.env` file for `API_KEY`

### Payload

For *JSON*, expected payload is:

```json
{
    "card_number": "3344 9900 4738 8393",
    "card_date": "04/21",
    "cvv2": "343",
    "email": "oye@oye.com",
    "mobile_number": "09055444444"
}
```

For *XML*, expected payload is:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<cardInfo>
    <card_number>3344 9900 4738 8393</card_number>
    <email>john.doe@example.com</email>
    <card_date>04/21</card_date>
    <cvv2>343</cvv2>
    <mobile_number>09055444444</mobile_number>
</cardInfo>
```

Expected `card_date` format is `XX/XX` in the MONTH/YEAR format.

In each of these payload types, `mobile_number` is optional. When provided, it's validated.

## Author
*Oyekunle Oloyede* 😎 🤙
