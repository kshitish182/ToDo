import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
// const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
// const SHEET_ID = process.env.REACT_APP_SHEET_ID;
// const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
// const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

const SPREADSHEET_ID = "1Bf49j8h0IgTUjkaN_jJBU4kXlinn0bzXyx87sUK-98c";
const SHEET_ID = "0";
const CLIENT_EMAIL = "demoapp@dummyproject-283014.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCeSyMeurwRnX/c\nP2R6+JzReNs0tLVwjPfH5/6kDaqPsFylO/YBw0q/5/rQcvHbu93sgJNFjxG28SBe\n8x6wsQDsjGcKwTf63GvTpFSn6lPliWwIttVv32EYGwqpkL5nZmQiLbGKPBN0JLPr\nLU6N4gmcoPR+AbO8kLOsMSL5x6AIYBEFZ5Gf9mWyEErW8XfMV/KLMdD/KgIXGwNQ\n/PsZir09fRk7xJV72XJfl+bpDy/tvbSs8t49Bhhm8P2Nv8CxqFXV5rc5b/ookJMI\n1sLcYI+Yv9QVCbiSfTSUaY8dStKVboDlm+l0BAY6aF//roiXu+5KeXkJu46AsR5U\n5MmTMXAjAgMBAAECggEAB4pox+P5ZZVtK97ROJJzVf894grhwdTVUO6aUNJd1659\nG1n55CebffzdE+UF5IPUlJmjamLgYyildCB8y8oC00H0/qwpsIejk1d2uPEOwhaD\n0P50uHmZtH5FScKdb2uPRZmLpZwrCRNehsuHvHaSIqYAP6hxGYCDLqbAlcmOtBdc\nNyESdwpFmZeU1ui0UuketzxOJmwAd4ye6HIjqre7Z53ft7tCedE5wxyADHTuw4X5\nNzO9bzoiSAEB0HLWtPC0HUgu+Y8Lrm4Re8G7wn3hqAOeoupXixRmfEMeCGOB0Blr\n2tPwEZ9AHTCv2AhodpMbVUb7X+dW5alQ6gwJtBVZUQKBgQDb5PXwtAvSSbIA7/Ei\n6HQoDjmTaWtxf0DXLbgCNQ4MAjgKyrOA8RmwmPvDQdRXdnvwHyIwmRvutsnxsi98\nqC84Motj0LlrqGjW+2/MIPXWiZxeOcfnKRSSIPr8GPuq/hFjKnhP5vKnXkSPOlAu\nWF/NU6IZ1XRQuhk9LHl9B4sQbQKBgQC4SNh8/zUkZH/fbYQ/miL16xedTMDJs3qG\nP7gW1XLXqQsOT136YMpJib7Pxacl1dKuUWK/b8yFBftGHxOybOdmSkgd942enYgC\nF/ZWUvrdT6Yc7Q13GLoDUa5YWKRAtxP6H4XCwCB63grNmJOcbACgMdrDK4cieFlZ\na5R7mlLIzwKBgCGLxnFYJk2IbJ1z/WeD6uSJdwMkG/4Omce5885yZZgzZnVPAx9y\nqKamUBIzor9NFg9F0KN1WCuMuzYiJthvl/SM0XMCzqa75HKXnTCY/qgiCjbdvb9o\nJvk8Cs4WyZ4GcISeYAhghTg/S1pGXSEU3limn54tUDdYjK0mcco/MlnpAoGAeQ+5\n0FujYJX4/yEl6NZsMxtOtxJN7/NNAVZoq+9q80vkrHDtLudY3Hh19m5FAPD353Yl\npddfBuBIEuele+hZF3Si7bTLvzCDwcRWGp2Gmc6SNJxx5RREVpvZKcaJmM3sfLsq\nlya5751ggXHDPtYgjxxRNzeoHbfsEnc+4vgdfDcCgYAM83PgSrF9dQorw/fan1vS\n0ZqMR6bl/LFDk7gsXKYwLy7yg0mo0e1U/Fh0rYkcPC1/k694dUYnl3Y6chPwhKYI\nUxDWeZugfnYJvA0eN4l4FqM7mRYUoUwI+Xbw85j6l0KSgZ+Y0JeEE8+fysBvbdVO\nLOL8b4yR0y69M75ZFvRxDw==\n-----END PRIVATE KEY-----\n";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row: any) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow(row);

    console.log(result);
  } catch (e) {
    console.error("Error: ", e);
  }
};

const newRow = { id: "3", first_name: "new value" };

export default appendSpreadsheet(newRow);

// {
//   /* <html>
//   <head>
//     <script src="https://apis.google.com/js/api.js"></script>
//     <script>
//       function start() {
//         // Initializes the client with the API key and the Translate API.
//         gapi.client.init({
//           'apiKey': 'AIzaSyCfiWlA-OeFG-eRo7Dpi-hGxumgp7IS5qA',
//           'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
//         }).then(function() {
//           // Executes an API request, and returns a Promise.
//           return gapi.client.sheets.spreadsheets.values.get({
//   spreadsheetId: '1Bf49j8h0IgTUjkaN_jJBU4kXlinn0bzXyx87sUK-98c',
//   range: 'sheet1'
// })}).then((response) => {
//   var result = response.result;
//   var numRows = result.values ? result.values.length : 0;
//   console.log(`${numRows} rows retrieved.`, result);
// });
// }

//       // Loads the JavaScript client library and invokes `start` afterwards.
//       gapi.load('client', start);
//     </script>
//   </head>
//   <body>
//     <div id="results"></div>
//   </body>
// </html> */
// }
