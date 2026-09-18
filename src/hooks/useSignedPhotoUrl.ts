import { useState, useEffect } from 'react';
import { getFreshPhotoSignedUrl } from '@/services/approvalService';

export function useSignedPhotoUrl(storageReference: string | null | undefined, fallbackUrl: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(fallbackUrl || null);
  const [loading, setLoading] = useState<boolean>(Boolean(storageReference));

  useEffect(() => {
    let isMounted = true;

    async function resolveUrl() {
      if (!storageReference) {
        setUrl(fallbackUrl || null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const signed = await getFreshPhotoSignedUrl(storageReference);
      if (isMounted) {
        setUrl(signed || fallbackUrl || null);
        setLoading(false);
      }
    }

    resolveUrl();

    return () => {
      isMounted = false;
    };
  }, [storageReference, fallbackUrl]);

  return { url, loading };
}
