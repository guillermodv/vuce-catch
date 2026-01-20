import axios from 'axios';

const url_base = 'http://127.0.0.1:3000';

const datos = {
  versionTipoLPCO: "1.0",
  codigoARTF: "ARTF0004",
  codigoAreaEmisora: "AE0005",
  codigoTipoLPCO: "LPCOVUCE0030",
  Fecha: "2024-01-13",
  CUIT: "30717104079",
  codigoLPCO: "745158889",
  fechaEmision: "2024-01-13",
  acronym: "AVIF",
  xmlLPCO: "",
  error: ""
};

const xml = `<urn:spsexchangeddocument>
               <urn1:name languageid="en">Catch Certificate</urn1:name>
               <urn1:id schemeagencyid="agency">
               <urn1:typecode name="CATCH_CERTIFICATE">852</urn1:typecode>            
               <urn1:statuscode>39</urn1:statuscode>
               <urn1:issuedatetime>
                  <urn2:datetime>2025-10-28T13:21:53+13:00</urn2:datetime>
               </urn1:issuedatetime>
               <urn1:issuerspsparty>
                  <urn1:name languageid="en">Subsecretario de PESCA y Acuicultura / Dirección Nacional de Coordinación Pesquera</urn1:name>
               </urn1:issuerspsparty>
               <urn1:includedspsnote>
                  <urn1:content>true</urn1:content>
                  <urn1:subjectcode>TRANSPORT_DETAILS_EXPORTER_SIGNATURE_PRESENT</urn1:subjectcode>
               </urn1:includedspsnote>

               <urn1:includedspsnote>
                  <urn1:content>10-Jul-2025</urn1:content>
                  <urn1:subjectcode>EXPORTER_SIGNATURE_DATE</urn1:subjectcode>
               </urn1:includedspsnote>
               
               <urn1:referencespsreferenceddocument>               
                  <urn1:typecode>916</urn1:typecode>
                  <urn1:relationshiptypecode>DM</urn1:relationshiptypecode>
                  <urn1:id>AR-20260113-1000052</urn1:id>
               </urn1:referencespsreferenceddocument>
               <urn1:referencespsreferenceddocument>
                  <urn1:typecode>916</urn1:typecode>
                  <urn1:relationshiptypecode>ALE</urn1:relationshiptypecode>
                  <urn1:id>Regulation (EU) 2023/2842</urn1:id>
               </urn1:referencespsreferenceddocument>
               { /* create this xml element but making with blank values*/ }
               <urn1:signatoryspsauthentication>
                  { /* hardcoded*/ }
                  <urn1:typecode>1</urn1:typecode>
                  <urn1:actualdatetime>
                     { /* when the certificate has been issued*/ }
                     <urn2:datetime>2025-09-09T13:21:54+13:00</urn2:datetime>
                  </urn1:actualdatetime>
                  <urn1:providerspsparty>
                     <urn1:name>
                     { /* hardcoded*/ }
                     <urn1:rolecode>PQ</urn1:rolecode>
                     <urn1:specifiedspsperson>
                        <urn1:name>
                        <urn1:attainedspsqualification>
                           <urn1:name>
                        </urn1:name></urn1:attainedspsqualification>
                     </urn1:name></urn1:specifiedspsperson>
                  </urn1:name></urn1:providerspsparty>
                  <urn1:includedspsclause>
                     <urn1:content>
                  </urn1:content></urn1:includedspsclause>
               </urn1:signatoryspsauthentication>
            </urn1:id></urn:spsexchangeddocument>
            <urn:spsconsignment>
               <urn1:consignorspsparty>
                  <urn1:id>AR_HFC_001</urn1:id>
                  <urn1:name languageid="en">Happy Fish Co Argentina</urn1:name>
                  <urn1:rolecode name="Consignor (Exporter)">EX</urn1:rolecode>
                  <urn1:specifiedspsaddress>
                     <urn1:lineone languageid="en">Banat Street 58</urn1:lineone>
                     <urn1:cityname languageid="en">7600 Mar del Plata</urn1:cityname>
                     <urn1:countryid>AR</urn1:countryid>
                     <urn1:countryname languageid="en">Argentina</urn1:countryname>
                  </urn1:specifiedspsaddress>
               </urn1:consignorspsparty>
               { /* This is the importer */ }
               <urn1:consigneespsparty>
                  <urn1:id>BE002</urn1:id>
                  <urn1:name languageid="en">Belgium company Fish</urn1:name>
                  <urn1:rolecode name="Consignee (Importer)">CN</urn1:rolecode>
                  <urn1:specifiedspsaddress>
                     <urn1:lineone languageid="en">acc</urn1:lineone>
                     <urn1:cityname languageid="en">4990 Trou de Bra</urn1:cityname>
                     <urn1:countryid>BE</urn1:countryid>
                     <urn1:countryname languageid="en">Belgium</urn1:countryname>
                  </urn1:specifiedspsaddress>
               </urn1:consigneespsparty>
               <urn1:exportspscountry>
                  <urn1:id schemeagencyid="agency">AR</urn1:id>
                  <urn1:name languageid="en" languagelocaleid="en-nz">Argentina</urn1:name>
               </urn1:exportspscountry>
               { /* free text but mandatory - From wich port/airport/other place from departure */ }
               <urn1:loadingbaseportspslocation>
                  <urn1:id schemeid="controlled_location_id">AR01</urn1:id>
                  <urn1:name languageid="en" languagelocaleid="en-nz">AR</urn1:name>
               </urn1:loadingbaseportspslocation>
               <urn1:importspscountry>
                  <urn1:id>FR</urn1:id>
                  <urn1:name languageid="en">France</urn1:name>
               </urn1:importspscountry>
               { /* free text but mandatory - point of destination */ }
               <urn1:unloadingbaseportspslocation>
                  <urn1:id schemeid="controlled_location_id">FR01</urn1:id>
                  <urn1:name languageid="en" languagelocaleid="en-nz">FR</urn1:name>
               </urn1:unloadingbaseportspslocation>               
               { /* we blank them all*/ }
               <urn1:examinationspsevent>
                  <urn1:occurrencespslocation>
                     <urn1:name>
                  </urn1:name></urn1:occurrencespslocation>
               </urn1:examinationspsevent>

               <urn1:maincarriagespstransportmovement>
                  <urn1:id schemeid="ship_imo_number_before_bcp">
                  <urn1:modecode name="Maritime transport">1</urn1:modecode>
                  <urn1:usedspstransportmeans>
                     <urn1:name languageid="en" languagelocaleid="en-nz">MSC Express III</urn1:name>
                  </urn1:usedspstransportmeans>
               </urn1:id></urn1:maincarriagespstransportmovement>
               <urn1:utilizedspstransportequipment>
                  <urn1:id schemeid="container_number">CRSU5013413</urn1:id>
                  <urn1:affixedspsseal>
                     <urn1:id schemeid="seal_number">NZMPI0141459</urn1:id>
                  </urn1:affixedspsseal>
               </urn1:utilizedspstransportequipment>
               
               { /* vessels*/ }
               <urn1:includedspsconsignmentitem>
                  <urn1:natureidentificationspscargo>
                     <urn1:typecode>5</urn1:typecode>
                  </urn1:natureidentificationspscargo>
                  <urn1:includedspstradelineitem>
                     <urn1:sequencenumeric format="1">1</urn1:sequencenumeric>
                     <urn1:description languageid="en" languagelocaleid="en">en</urn1:description>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>Law 101</urn1:content>
                        <urn1:subjectcode>CONSERVATION_AND_MANAGEMENT_MEASURES</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>Gutting and filleting</urn1:content>
                        <urn1:subjectcode>TYPE_OF_AUTHORIZED_PROCESSING_ON_BOARD</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">Argos Happy Fishing </urn1:content>
                        <urn1:subjectcode>VESSEL_NAME</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>                     
                     <urn1:additionalinformationspsnote>
                        <urn1:content>AR</urn1:content>
                        <urn1:subjectcode>VESSEL_FLAG</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>AR-01-0018</urn1:content>
                        <urn1:subjectcode>VESSEL_REGISTRATION</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>ARVQ_01</urn1:content>
                        <urn1:subjectcode>CALL_SIGN</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>Arroyo Seco</urn1:content>
                        <urn1:subjectcode>HOME_PORT</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     { /* raise it as one of the fields that could be needed*/ }
                     <urn1:additionalinformationspsnote>
                        <urn1:content>551320</urn1:content>
                        <urn1:subjectcode>PHONE</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>03.11</urn1:content>
                        <urn1:content>03.12</urn1:content>
                        <urn1:content>03.13</urn1:content>
                        <urn1:subjectcode>FISHING_GEAR</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>IS-1000000009</urn1:content>
                        <urn1:content>IS-1000000010</urn1:content>
                        <urn1:subjectcode>FISHING_LICENSE</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content>16-Dec-2026</urn1:content>
                        <urn1:content>17-Dec-2026</urn1:content>
                        <urn1:subjectcode>FISHING_LICENSE_END_DATE</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                  </urn1:includedspstradelineitem>
               </urn1:includedspsconsignmentitem>
               
               { /* products*/ }
               <urn1:includedspsconsignmentitem>
                  <urn1:natureidentificationspscargo>
                     { /* hardcoded */ }
                     <urn1:typecode>12</urn1:typecode>
                  </urn1:natureidentificationspscargo>
                  { /* is the list of products */ }
                  <urn1:includedspstradelineitem>
                     <urn1:sequencenumeric>1</urn1:sequencenumeric>
                     <urn1:description languageid="en">FROZEN HOKI BLOCK - FILLET MSC</urn1:description>
                     <urn1:commonname>Thunnus orientalis</urn1:commonname>
                     <urn1:netweightmeasure unitcode="KGM">18900</urn1:netweightmeasure>
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">AR-01-0018</urn1:content>
                        <urn1:subjectcode>VESSEL_REGISTRATION</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                  
                     { /*new field that needs to be added check with the policy*/ }
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">IS</urn1:content>
                        <urn1:subjectcode>EXCLUSIVE_ECONOMIC_ZONE</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">Erik the Red</urn1:content>
                        <urn1:subjectcode>MASTER_OF_VESSEL</urn1:subjectcode>
                     </urn1:additionalinformationspsnote> 
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">01-Jan-2025</urn1:content>
                        <urn1:subjectcode>START_DATE</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">10-Jan-2025</urn1:content>
                        <urn1:subjectcode>END_DATE</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">21</urn1:content>
                        <urn1:subjectcode>CATCH_AREA</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>
                     { /*new field that needs to be added check with the policy*/ }
                     <urn1:additionalinformationspsnote>
                        <urn1:content languageid="en">21</urn1:content>
                        <urn1:subjectcode>HIGH_SEAS_CATCH_AREA</urn1:subjectcode>
                     </urn1:additionalinformationspsnote>                     
                     <urn1:applicablespsclassification>
                        <urn1:systemid>CN</urn1:systemid>
                        <urn1:systemname languageid="en">CN Code</urn1:systemname>
                        <urn1:classcode>030235</urn1:classcode>
                        <urn1:classname languageid="en">030235 Atlantic and Pacific bluefin tuna (Thunnus thynnus, Thunnus orientalis)</urn1:classname>
                     </urn1:applicablespsclassification>
                        
               
                  </urn1:includedspstradelineitem>
               </urn1:includedspsconsignmentitem>
            </urn:spsconsignment>`;

// Base64 correcto en JS
const b64_xml = Buffer
  .from(xml, 'utf-8')
  .toString('base64');

datos.xmlLPCO = b64_xml;

// POST
axios.post(`${url_base}/catch/create`, datos)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
  });
