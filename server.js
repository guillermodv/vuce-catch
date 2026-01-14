import dotenv from "dotenv";
import express from "express";
import { APP_MESSAGES, ERROR_MESSAGES } from "./constants.js";
import { callCatchService } from "./soapClient.js";
import * as utils from "./utils.js";

dotenv.config();
const app = express();
app.use(express.json());

const OK_CODE = 200;

app.get("/catch/status", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: APP_MESSAGES.SERVER_STARTED
  });
});

app.post("/catch/create", async (req, res) => {
  try {
      const { xmlLPCO } = req.body;
      //console.log('req.body', req.body);
      if (!xmlLPCO) {
        return res.status(OK_CODE).json({
          status: "ERROR",
          errorCode: "BAD_REQUEST",
          message: "The 'xmlLPCO' field is required."
        });
      }
      //console.log('xmlLPCO', xmlLPCO)
      const exchangedDocument = utils.decodeBase64(utils.xmlExtractData(xmlLPCO));
      //console.log(exchangedDocument);
      const SOAPAction = "CreateCatchCertificateRequest"

      if (!exchangedDocument) {
        return res.status(OK_CODE).json({
          status: "ERROR",
          errorCode: "BAD_REQUEST",
          message: ERROR_MESSAGES.BAD_REQUEST
        });
      }

    const response = await callCatchService({ exchangedDocument, SOAPAction });
    res.json(response);
  } catch (err) {
    console.error(ERROR_MESSAGES.GENERAL_ERROR, err);
    res.status(OK_CODE).json({
      status: "ERROR",
      errorCode: "INTERNAL_ERROR",
      message: ERROR_MESSAGES.INTERNAL_ERROR
    });
  }
});

app.post("/catch/processing", async (req, res) => {
  try {
    const { xmlLPCO } = req.body;
    const exchangedDocument = utils.decodeBase64(utils.xmlExtractData(xmlLPCO));
    console.log(exchangedDocument);

    const SOAPAction = "createCatchProcessingStatement"

    if (!exchangedDocument) {
      return res.status(OK_CODE).json({
        status: "ERROR",
        errorCode: "BAD_REQUEST",
        message: ERROR_MESSAGES.BAD_REQUEST
      });
    }

    const response = await callCatchService({ exchangedDocument, SOAPAction });
    res.json(response);
  } catch (err) {
    console.error(ERROR_MESSAGES.GENERAL_ERROR, err);
    res.status(OK_CODE).json({
      status: "ERROR",
      errorCode: "INTERNAL_ERROR",
      message: ERROR_MESSAGES.INTERNAL_ERROR
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${APP_MESSAGES.SERVER_LISTENING} : ${PORT}`);
});
