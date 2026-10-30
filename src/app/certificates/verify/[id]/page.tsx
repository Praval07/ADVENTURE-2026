import { Suspense } from 'react';
import CertificateVerifyClient from './verify-client';

// Fully dynamic — certificates are issued at runtime, not build time
export const dynamic = 'force-dynamic';

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
