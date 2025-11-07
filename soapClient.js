import axios from "axios";
import dotenv from "dotenv";
import { ERROR_MESSAGES } from "./constants.js";

dotenv.config();

export async function callCatchService(data) {
  const { SOAP_URL, SOAP_USER, SOAP_PASS } = process.env;

  const { exchangedDocument, SOAPAction } = data;

  const soapBody = `<?xml version="1.0" encoding="UTF-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                    xmlns:v4="http://ec.europa.eu/sanco/tracesnt/base/v4" 
                    xmlns:v3="http://ec.europa.eu/tracesnt/body/v3" 
                    xmlns:oas="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" 
                    xmlns:v1="http://ec.europa.eu/tracesnt/certificate/catch/submission/v1" 
                    xmlns:urn="urn:un:unece:uncefact:data:standard:SPSCertificate:17" 
                    xmlns:urn1="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:21" 
                    xmlns:urn2="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:21">
    <soapenv:Header>
    <v4:LanguageCode>${process.env.SOAP_LANGUAGE}</v4:LanguageCode>
    <v3:BodyIdentity>
      <AuthorityActivityAccessIdentifier>${process.env.SOAP_AUTHORITY_ID}</AuthorityActivityAccessIdentifier>
    </v3:BodyIdentity>
    <v4:WebServiceClientId>${SOAP_USER}</v4:WebServiceClientId>
    <oas:Security>
      <oas:UsernameToken>
        <oas:Username>${SOAP_USER}</oas:Username>
        <oas:Password>${SOAP_PASS}</oas:Password>
      </oas:UsernameToken>
    </oas:Security>
  </soapenv:Header>
    <soapenv:Body>
      <v1:CreateCatchCertificateRequest>
        <urn:SPSCertificate>
          ${exchangedDocument}
        </urn:SPSCertificate>
      </v1:CreateCatchCertificateRequest>
    </soapenv:Body>
  </soapenv:Envelope>`;

  try {
    const { data: responseXML } = await axios.post(SOAP_URL, soapBody, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        SOAPAction: SOAPAction || "CreateCatchCertificateRequest",
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
