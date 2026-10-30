import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

export interface CertificateData {
  certificateId: string;
  participantName: string;
  teamName: string;
  teamRegId: string;
  roleInTeam: string;
  categoryName: string;
  awardTitle: string;
  issueDate: string;
  verificationUrl: string;
}

export async function generateCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  // Create a new PDF document in Landscape format (842 x 595 pt - A4 landscape)
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  // Load and embed official college emblem
  let collegeLogoImage = null;
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'rec-pratapgarh-logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      collegeLogoImage = await pdfDoc.embedPng(logoBytes);
    }
  } catch (err) {
    console.warn('Could not load college logo for PDF embedding:', err);
  }

  // Load Standard Fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  // Background and Decorative Borders
  // Dark luxury background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.05, 0.06, 0.07), // #0d0f12
  });

  // Outer Gold Border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: rgb(0.96, 0.62, 0.04), // #f59e0b
    borderWidth: 2,
  });

  // Inner Orange Accent Border
  page.drawRectangle({
    x: 26,
    y: 26,
    width: width - 52,
    height: height - 52,
    borderColor: rgb(1, 0.36, 0.15), // #ff5b26
    borderWidth: 1,
  });

  // Generate QR Code data URL
  const qrDataUrl = await QRCode.toDataURL(data.verificationUrl, {
    margin: 1,
    width: 120,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });
  const qrImage = await pdfDoc.embedPng(qrDataUrl);

  // Header Title
  const instName = 'BHARAT RATNA BABASAHEB BHIMRAO AMBEDKAR REC, PRATAPGARH';
  const instWidth = helveticaBold.widthOfTextAtSize(instName, 12);
  page.drawText(instName, {
    x: (width - instWidth) / 2,
    y: height - 60,
    size: 12,
    font: helveticaBold,
    color: rgb(0.96, 0.62, 0.04),
  });

  const organizerText = "INSTITUTION'S INNOVATION COUNCIL (IIC) × SKILL DEVELOPMENT CELL (SDC)";
  const orgWidth = helvetica.widthOfTextAtSize(organizerText, 9);
  page.drawText(organizerText, {
    x: (width - orgWidth) / 2,
    y: height - 76,
    size: 9,
    font: helvetica,
    color: rgb(0.7, 0.7, 0.7),
  });

  // Certificate Headline
  const certTitle = 'CERTIFICATE OF MERIT & EXCELLENCE';
  const titleWidth = helveticaBold.widthOfTextAtSize(certTitle, 24);
  page.drawText(certTitle, {
    x: (width - titleWidth) / 2,
    y: height - 120,
    size: 24,
    font: helveticaBold,
    color: rgb(1, 0.36, 0.15),
  });

  // Event Name
  const eventName = 'ADVENTURE 2026 – The Entrepreneurship Ad Film Challenge';
  const eventWidth = helveticaBold.widthOfTextAtSize(eventName, 14);
  page.drawText(eventName, {
    x: (width - eventWidth) / 2,
    y: height - 145,
    size: 14,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  // Presentation text
  const presentedText = 'This is proudly presented to:';
  const presWidth = timesRomanItalic.widthOfTextAtSize(presentedText, 14);
  page.drawText(presentedText, {
    x: (width - presWidth) / 2,
    y: height - 185,
    size: 14,
    font: timesRomanItalic,
    color: rgb(0.8, 0.8, 0.8),
  });

  // Participant Name (Big Display)
  const pName = data.participantName.toUpperCase();
  const nameWidth = helveticaBold.widthOfTextAtSize(pName, 26);
  page.drawText(pName, {
    x: (width - nameWidth) / 2,
    y: height - 230,
    size: 26,
    font: helveticaBold,
    color: rgb(1, 0.85, 0.3),
  });

  // Citation Description
  const citationLine1 = `For outstanding demonstration of commercial creativity, storytelling mastery, and marketing strategy`;
  const citationLine2 = `as ${data.roleInTeam} of Team "${data.teamName}" (${data.teamRegId}) in the "${data.categoryName}" category.`;
  const cit1Width = helvetica.widthOfTextAtSize(citationLine1, 11);
  const cit2Width = helveticaBold.widthOfTextAtSize(citationLine2, 11);

  page.drawText(citationLine1, {
    x: (width - cit1Width) / 2,
    y: height - 280,
    size: 11,
    font: helvetica,
    color: rgb(0.85, 0.85, 0.85),
  });
  page.drawText(citationLine2, {
    x: (width - cit2Width) / 2,
    y: height - 300,
    size: 11,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  // Honor / Award Banner
  const awardText = `AWARD LEVEL: ${data.awardTitle.toUpperCase()}`;
  const awardWidth = helveticaBold.widthOfTextAtSize(awardText, 13);
  page.drawText(awardText, {
    x: (width - awardWidth) / 2,
    y: height - 340,
    size: 13,
    font: helveticaBold,
    color: rgb(0.96, 0.62, 0.04),
  });

  // Embed QR Code on bottom right
  page.drawImage(qrImage, {
    x: width - 150,
    y: 50,
    width: 80,
    height: 80,
  });
  page.drawText('Scan to Verify', {
    x: width - 142,
    y: 38,
    size: 8,
    font: helvetica,
    color: rgb(0.7, 0.7, 0.7),
  });

  // Certificate ID & Date on bottom left
  page.drawText(`Certificate ID: ${data.certificateId}`, {
    x: 50,
    y: 65,
    size: 9,
    font: helveticaBold,
    color: rgb(0.8, 0.8, 0.8),
  });
  page.drawText(`Issue Date: ${data.issueDate}`, {
    x: 50,
    y: 50,
    size: 8,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  });
  page.drawText('Organized under MoE Innovation Cell Guidelines', {
    x: 50,
    y: 38,
    size: 7,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Signatures
  page.drawText('Prof. R. K. Srivastava', {
    x: width / 2 - 120,
    y: 65,
    size: 10,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });
  page.drawText('President, IIC BRBBARECP', {
    x: width / 2 - 120,
    y: 52,
    size: 8,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  });

  // Draw Official Institutional Seal between signatures
  if (collegeLogoImage) {
    page.drawImage(collegeLogoImage, {
      x: width / 2 - 25,
      y: 36,
      width: 50,
      height: 50,
    });
    page.drawText('OFFICIAL SEAL', {
      x: width / 2 - 22,
      y: 26,
      size: 6,
      font: helveticaBold,
      color: rgb(0.96, 0.62, 0.04),
    });
  }

  return await pdfDoc.save();
}
