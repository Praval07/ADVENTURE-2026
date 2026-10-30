import { Suspense } from 'react';
import CertificateVerifyClient from './verify-client';
import { INITIAL_CERTIFICATES } from '@/lib/store';

export async function generateStaticParams() {
  return INITIAL_CERTIFICATES.map((cert) => ({
    id: cert.certificateId,
  }));
}

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090b0e] flex items-center justify-center text-white text-xs">
          Authenticating Certificate...
        </div>
      }
    >
      <CertificateVerifyClient certId={id} />
    </Suspense>
  );
}
