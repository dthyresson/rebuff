# rebuff

Email message re-buffer proof of concept using Netlify, Stream, Mailgun in microservices

# Local Development

## Server with Lambda Server Tunneling

```
netlify dev
ngrok http 34567 -subdomain=dthyresson
```

## Mailgun Receive Route with Tunneling

```
ngrok http 34567 -subdomain=dthyresson
https://dthyresson.ngrok.io/.netlify/functions/parse-email
```

## Identity Setup

### Webhooks

```
https://dthyresson.ngrok.io/.netlify/functions/identity
```
