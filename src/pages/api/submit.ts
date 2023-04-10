import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function submitSheetGoogle(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { email, name: nome } = body as RequestSheetGoogle;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL as string,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID as string,
      range: 'A1:B1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[nome, email]],
      },
    });
    res.status(201).json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: `Erro: ${(err as Error).message}` });
  }
}
