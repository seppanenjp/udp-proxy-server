# UDP-Proxy-Server
UDP Proxy Server to Navisport

### Start server to default port (60709)
```bash
node ./release/index.js
```

### Message types


#### Passing
```json
{
  "packageId": "package1",
  "deviceId": "12412",
  "type": "Passing",
  "payload": {
    "chip": "205275",
    "timestamp": "2020-01-01T10:00:00Z",
  }
}
```

#### Ping
```json
{
  "packageId": "package1",
  "deviceId": "12412",
  "type": "Ping"
}
```

#### Acknowledgment
```json
{
  "packageId": "package1",
  "type": "Acknowledgment"
}
```
