import { NextRequest, NextResponse } from 'next/server';
import { generateCertificatePdf, CertificateData } from '@/lib/certificateGenerator';
import { INITIAL_CERTIFICATES } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const certId = resolvedParams.id;

    const certRecord = INITIAL_CERTIFICATES.find(
      (c) => c.certificateId.toLowerCase() === certId.toLowerCase()
    ) || {
      id: 'cert-dynamic',
      certificateId: certId,
      participantName: 'Arjun Mehta',
      teamName: 'CineCraft Innovators',
      teamRegId: 'ADV26-TM-1042',
      roleInTeam: 'Team Leader',
      categoryName: 'Startups & Entrepreneurs',
      awardTitle: 'Winner',
      issueDate: '16 November 2026',
      isValid: true,
      verificationUrl: `http://localhost:3000/certificates/verify/${certId}`,
    };

    const host = request.nextUrl.origin || 'http://localhost:3000';
    const certData: CertificateData = {
      certificateId: certRecord.certificateId,
      participantName: certRecord.participantName,
      teamName: certRecord.teamName,
      teamRegId: certRecord.teamRegId,
      roleInTeam: certRecord.roleInTeam,
      categoryName: certRecord.categoryName,
      awardTitle: certRecord.awardTitle,
      issueDate: certRecord.issueDate,
      verificationUrl: `${host}/certificates/verify/${certRecord.certificateId}`,
    };

    const pdfBytes = await generateCertificatePdf(certData);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${certRecord.certificateId}.pdf"`,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
