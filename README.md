# rebuff

Email message re-buffer proof of concept using Netlify, Stream, Mailgun in microservices

# Local Development

## Server with Lambda Server Tunneling

```
netlify dev
ngrok http 34567 -subdomain=dthyresson
```

```
npm start
ngrok http 34567 -subdomain=dthyresson
```

## Mailgun Receive Route with Tunneling

```
ngrok http 34567 -subdomain=dthyresson
https://dthyresson.ngrok.io/.netlify/functions/messages/listen
```

## Identity Setup

### Webhooks

```
Webhook

We’ll send a POST request to the URL you define with any subscribed events.

URL: https://dthyresson.ngrok.io/.netlify/functions/webhooks/identity
Secret:
Events: validate / signup / login

```

requestContext: { identity: {} },

```

```
