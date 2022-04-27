import dns from 'dns/promises';
import { CaaRecord, MxRecord, NaptrRecord, SoaRecord, } from 'dns';
import React from 'react';

export function useQuery<Rsp>(fn: () => Promise<Rsp>) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);
  const [result, setResult] = React.useState<Rsp>();

  React.useEffect(() => {
    setLoading(true)
    fn()
      .then(result => {
        setResult(result);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    result: result as Rsp,
    error,
  }
}

