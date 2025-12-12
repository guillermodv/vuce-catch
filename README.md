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
SOAP_USER=usuario123
SOAP_PASS=claveSecreta
```
curl -X POST "http://localhost:3000/catch/create" -H "Content-Type: application/json" -d '{"versionTipoLPCO":"1.0","codigoARTF":"ARTF0004","codigoAreaEmisora":"AE0005","codigoTipoLPCO":"LPCOVUCE0030","Fecha":"2025-11-05","CUIT":"30717104079","codigoLPCO":"745158889","fechaEmision":"2025-10-23","acronym":"AVIF","xmlLPCO":"PExQQ08+PElEPjc0NTE1ODg4OTwvSUQ+PEV4cGlyYXRpb25EYXRlVGltZT4yNC8wOS8yMDI2PC9FeHBpcmF0aW9uRGF0ZVRpbWU+PEltcG9ydGVyPjxJRD4zMDcxNzEwNDA3OTwvSUQ+PE5hbWU+UFVOVE8gTk9SVEUgU0FTPC9OYW1lPjwvSW1wb3J0ZXI+PENvbnNpZ25tZW50PjxDb25zaWdubWVudEl0ZW0+PEdvb2RzTWVhc3VyZT48QXV0aG9yaXplZFF1YW50aXR5PjQ8L0F1dGhvcml6ZWRRdWFudGl0eT48QXV0aG9yaXplZFF1YW50aXR5VW5pdENvZGU+MDc8L0F1dGhvcml6ZWRRdWFudGl0eVVuaXRDb2RlPjxBdXRob3JpemVkUXVhbnRpdHlVbml0RGVzY3JpcHRpb24+VU5JREFEPC9BdXRob3JpemVkUXVhbnRpdHlVbml0RGVzY3JpcHRpb24+PC9Hb29kc01lYXN1cmU+PC9Db25zaWdubWVudEl0ZW0+PC9Db25zaWdubWVudD48L0xQQ08+","error":""}'

curl -X GET http://localhost:3000/catch/status 

---
Autor: GDV
Versión: 1.0 (Noviembre 2025)
