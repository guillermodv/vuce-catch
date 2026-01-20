import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import { ERROR_MESSAGES } from "./constants.js";

dotenv.config();

function generateWSSecurity(password) {
  const nonce = crypto.randomBytes(16);
  const created = new Date().toISOString();

  const sha1 = crypto.createHash("sha1");
  sha1.update(Buffer.concat([
    nonce,
    Buffer.from(created, "utf8"),
    Buffer.from(password, "utf8"),
  ]));

  const passwordDigest = sha1.digest("base64");

  return {
    passwordDigest,
    nonceBase64: nonce.toString("base64"),
    created,
  };
}

export async function callCatchService(data) {
  const { SOAP_URL, SOAP_USER, SOAP_PASS } = process.env;
  const { exchangedDocument, SOAPAction } = data;

  if (!SOAPAction) throw new Error("No SOAPAction defined");

  const { passwordDigest, nonceBase64, created } = generateWSSecurity(SOAP_PASS);

  const soapBody = `<soapenv:Envelope 
                  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:urn="urn:un:unece:uncefact:data:standard:SPSCertificate:17"
                  xmlns:urn1="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:21"
                  xmlns:urn2="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:21"
                  xmlns:urn3="http://ec.europa.eu/tracesnt/certificate/catch/submission/v1"
                  xmlns:v3="http://ec.europa.eu/tracesnt/bocd/v3"
                  xmlns:v4="http://ec.europa.eu/sanco/tracesnt/base/v4"
                  xmlns:v1="http://ec.europa.eu/tracesnt/certificate/catch/submission/v1">
  <soapenv:Header>
    <wsse:security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
      <wsu:timestamp wsu:id="TS-B9B948D56B6C01D9DD217689192697186">
        <wsu:created>2026-01-20T14:27:49.718Z</wsu:created>
        <wsu:expires>2026-01-20T14:28:49.718Z</wsu:expires>
      </wsu:timestamp>
      <wsse:usernametoken wsu:id="UsernameToken-B9B948D56B6C01D9DD217689192697185">
        <wsse:username>${SOAP_USER}</wsse:username>
        <wsse:password type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">
          ${passwordDigest}
        </wsse:password>
        <wsse:nonce encodingtype="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">
          ${nonceBase64}
        </wsse:nonce>
        <wsu:created>${created}</wsu:created>
      </wsse:usernametoken>
    </wsse:security>
  </soapenv:Header>
  <soapenv:Body>
    <v1:CreateCatchCertificateRequest>
        ${exchangedDocument}
    </v1:CreateCatchCertificateRequest>
  </soapenv:Body>
</soapenv:Envelope>`;

  try {
    if (!SOAPAction) throw new Error("No SOAPaction");
    const { data: responseXML } = await axios.post(SOAP_URL, soapBody, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        SOAPAction: SOAPAction,
      },
      timeout: 20000,
    });

    return {
      status: "OK",
      timestamp: new Date().toISOString(),
      rawResponse: responseXML,
    };
  } catch (error) {
    console.error(ERROR_MESSAGES.SOAP_ERROR, error.message);
    return {
      status: "ERROR",
      message: ERROR_MESSAGES.SOAP_ERROR + " " + error.message,
      details: error.response?.data || null,
    };
  }
}
