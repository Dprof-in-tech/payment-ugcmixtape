import { google } from 'googleapis';

const SHEET_NAME = 'Sheet1';
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Google Sheets Authentication
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // replace escaped newlines
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Function to add coupon data to Google Sheets
const addCouponToSheet = async (couponData) => {
  const sheets = google.sheets({ version: 'v4', auth });

  // Check if the headers exist
  const headerRow = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:F1`,
  });

  const headers = ['Coupon Code', 'Discount Type', 'Amount', 'Duration', 'Expiration', 'Usage Count', 'Timestamp'];

  // If headers don't exist, add them
  if (!headerRow.data.values || headerRow.data.values[0].length === 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:F1`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [headers] },
    });
  }

  // Append coupon data
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:F`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        [
          couponData.couponCode,
          couponData.discountType,
          couponData.amount,
          couponData.duration,
          couponData.expiration,
          couponData.usageCount,
          new Date().toLocaleString(), // Add timestamp
        ],
      ],
    },
  });
};

export default async function handler(req, res) {
  // Set CORS headers to allow any domain to access the API
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { couponCode, discountType, amount, duration, expiration, usageCount } = req.body;

    try {
      // Add coupon to Google Sheets
      await addCouponToSheet({ couponCode, discountType, amount, duration, expiration, usageCount });
      res.status(200).json({ message: 'Coupon created successfully' });
    } catch (error) {
      console.error('Error adding coupon to sheet:', error);
      res.status(500).json({ message: 'Error creating coupon' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
