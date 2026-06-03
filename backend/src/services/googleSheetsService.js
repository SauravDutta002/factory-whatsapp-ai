const { google } = require('googleapis');

const SPREADSHEET_ID = '14QSTB1DJeaY44Ec2WTA12znOW6L5AsLALhLLEedwVpI';
const RANGE = 'Sheet1!A:I';

async function getSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    return google.sheets({ version: 'v4', auth });
}

async function appendToSheet(rowData) {
    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[
                rowData.partName,
                rowData.qty,
                rowData.size,
                rowData.material,
                rowData.machine,
                rowData.vendor,
                rowData.requestedBy,
                rowData.receivedAt,
                rowData.demandTimestamp
            ]]
        }
    });
}

async function getSheetRows() {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE
    });
    return response.data.values || [];
}

module.exports = { getSheetsClient, appendToSheet, getSheetRows, SPREADSHEET_ID, RANGE };
