import { google } from 'googleapis';

const SHEET_NAME = 'Sheet1';
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Google Sheets Authentication
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const updateCouponUsage = async (couponCode) => {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
    });

    const rows = response.data.values || [];
    let couponRowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const [code, , , , , usageCount] = rows[i];

      if (code === couponCode) {
        couponRowIndex = i;
        const newUsageCount = parseInt(usageCount, 10) + 1;

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!F${couponRowIndex + 1}`,
          valueInputOption: 'RAW',
          resource: {
            values: [[newUsageCount]],
          },
        });
        break;
      }
    }
  } catch (error) {
    console.error('Error updating coupon usage:', error);
    throw new Error('Failed to update coupon');
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { couponCode } = req.body;

    try {
      await updateCouponUsage(couponCode);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update coupon' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
