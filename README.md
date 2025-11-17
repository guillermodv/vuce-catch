# Servicio REST de Integración con CATCH

Este servicio expone un endpoint REST que actúa como intermediario entre clientes HTTP y un servicio SOAP llamado **CATCH**.

## 🚀 Ejecución

```bash
npm install
npm start
```

## 📡 Endpoints principales

- `GET /catch/status` → Devuelve el estado del servicio.
- `POST /catch/create` → Recibe datos JSON, llama al servicio SOAP CATCH y devuelve la respuesta estandarizada.
- `POST /catch/processing` → Recibe datos JSON, llama al servicio SOAP CATCH y devuelve la respuesta estandarizada.

## ⚙️ Configuración
Configurar las variables del archivo `.env`:

```
PORT=3000
SOAP_URL=https://api.catch.com/soap/service
SOAP_METHOD=getCatchData
SOAP_USER=usuario123
SOAP_PASS=claveSecreta
```

curl -X POST http://localhost:3000/catch/create \
-H "Content-Type: application/json" \
-d '{"exchangedDocument": "AR-20251030-1000002"}'

curl -X GET http://localhost:3000/catch/status 

---
Autor: GDV
Versión: 1.0 (Noviembre 2025)
