import { useAuthContext } from 'contexts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { z } from 'zod';

function useIdentifier({ setValue }: { setValue: any }) {
  const { verifiedEmail, setVerifiedEmail } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      const identifier = query.identifier as string;
      const isValidVerifiedEmail = z.string().email().safeParse(identifier).success;
      if (!identifier || !isValidVerifiedEmail) {
        router.push('/verify');
        return;
      }
      setVerifiedEmail(identifier);
      setValue('email', identifier);
    }

    return () => {};
  }, [router, setValue, setVerifiedEmail]);

  return verifiedEmail;
}
export { useIdentifier };
