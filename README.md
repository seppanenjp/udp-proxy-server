# UDP-Proxy-Server
UDP Proxy Server to Navisport

###Start server to default port (60709)
```bash
node index.js
```

###Message types

```json
// Passing
{
  packageId: "package1",
  deviceId: "12412",
  type: "Passing",
  payload: {
    chip: "205275",
    timestamp: "2020-01-01T10:00:00Z",
  }
}
```

```json
// Ping
{
  packageId: "package1",
  deviceId: "12412",
  type: "Ping"
}
```

```json
// Acknowledgment
{
  packageId: "package1",
  type: "Acknowledgment"
}
```
