import axios from 'axios';

const exchangedDocument = `
<urn:SPSExchangedDocument>
  <urn1:Name languageID="en">Catch Certificate</urn1:Name>
  <urn1:ID schemeAgencyID="agency"/>
  <urn1:TypeCode name="CATCH_CERTIFICATE">852</urn1:TypeCode>
  <urn1:StatusCode>39</urn1:StatusCode>
  <urn1:IssueDateTime>
    <urn2:DateTime>2025-10-28T13:21:53+13:00</urn2:DateTime>
  </urn1:IssueDateTime>
  <urn1:IssuerSPSParty>
    <urn1:Name languageID="en">Subsecretario de PESCA y Acuicultura / Dirección Nacional de Coordinación Pesquera</urn1:Name>
  </urn1:IssuerSPSParty>
  <urn1:IncludedSPSNote>
    <urn1:Content>true</urn1:Content>
    <urn1:SubjectCode>TRANSPORT_DETAILS_EXPORTER_SIGNATURE_PRESENT</urn1:SubjectCode>
  </urn1:IncludedSPSNote>
  <urn1:IncludedSPSNote>
    <urn1:Content>10-Jul-2025</urn1:Content>
    <urn1:SubjectCode>EXPORTER_SIGNATURE_DATE</urn1:SubjectCode>
  </urn1:IncludedSPSNote>
  <urn1:ReferenceSPSReferencedDocument>
    <urn1:TypeCode>916</urn1:TypeCode>
    <urn1:RelationshipTypeCode>DM</urn1:RelationshipTypeCode>
    <urn1:ID>AR-20251030-1000002</urn1:ID>
  </urn1:ReferenceSPSReferencedDocument>
  <urn1:ReferenceSPSReferencedDocument>
    <urn1:TypeCode>916</urn1:TypeCode>
    <urn1:RelationshipTypeCode>ALE</urn1:RelationshipTypeCode>
    <urn1:ID>Regulation (EU) 2023/2842</urn1:ID>
  </urn1:ReferenceSPSReferencedDocument>
  <urn1:SignatorySPSAuthentication>
    <urn1:TypeCode>1</urn1:TypeCode>
    <urn1:ActualDateTime>
      <urn2:DateTime>2025-09-09T13:21:54+13:00</urn2:DateTime>
    </urn1:ActualDateTime>
    <urn1:ProviderSPSParty>
      <urn1:Name/>
      <urn1:RoleCode>PQ</urn1:RoleCode>
      <urn1:SpecifiedSPSPerson>
        <urn1:Name/>
        <urn1:AttainedSPSQualification>
          <urn1:Name/>
        </urn1:AttainedSPSQualification>
      </urn1:SpecifiedSPSPerson>
    </urn1:ProviderSPSParty>
    <urn1:IncludedSPSClause>
      <urn1:Content/>
    </urn1:IncludedSPSClause>
  </urn1:SignatorySPSAuthentication>
</urn:SPSExchangedDocument>`;

const data = {
  exchangedDocument
};

axios.post('http://localhost:3000/catch/create', data)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.code);
    });
