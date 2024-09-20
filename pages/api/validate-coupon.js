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

const validateCouponCode = async (couponCode, amount) => {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return { valid: false, message: 'No coupons available' };
    }

    const currentDate = new Date();
    let couponRowIndex = -1;

    for (let i = 0; i < rows.length; i++) {
      const [code, discountType, discountAmount, duration, expiration, usageCount] = rows[i];

      if (code === couponCode) {
        couponRowIndex = i;

        const expirationDate = new Date(expiration);
        if (duration === 'repeating' && expirationDate < currentDate) {
          return { valid: false, message: 'Coupon has expired' };
        }

        if (duration === 'once' && parseInt(usageCount, 10) >= 1) {
          return { valid: false, message: 'Coupon has already been used' };
        }

        let newAmount = amount;
        if (discountType === 'percentage') {
          newAmount -= amount * (discountAmount / 100);
        } else if (discountType === 'fixed') {
          newAmount -= parseFloat(discountAmount);
        }

        // Round up to the nearest greater whole number
        newAmount = Math.ceil(newAmount);

        const newUsageCount = parseInt(usageCount, 10) + 1;

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!F${couponRowIndex + 1}`,
          valueInputOption: 'RAW',
          resource: {
            values: [[newUsageCount]],
          },
        });

        return { valid: true, newAmount: Math.max(newAmount, 0) };
      }
    }

    return { valid: false, message: 'Invalid coupon code' };
  } catch (error) {
    console.error('Error fetching coupon data:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Error fetching coupon data');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { couponCode, amount } = req.body;

  try {
    const result = await validateCouponCode(couponCode, amount);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
