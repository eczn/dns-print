import dns from 'dns/promises';
import React, { useEffect } from 'react';
import { Text, Box, Newline } from 'ink';
import { Loading } from './components/loading';
import { printRecord } from './utils';
import { usePrintRecord } from './components/print-record';

import 'colors';

export interface AppProps {
  hostname: string;
}

export function App(props: AppProps) {
  const { hostname } = props;
  
  const {
    A, AAAA, CNAME, NS, CAA, MX, NAPTR, PTR, SOA, SRV, TXT,
    mergedLoading
  } = useDnsQuery(hostname);

  const [cost] = useLoadingCost(mergedLoading);

  return (
    <Box flexDirection="column" padding={1}>
        <Box>
          <Text>{`"${props.hostname}" ${mergedLoading ? '?' : ''} `}</Text>
          <Loading loading={mergedLoading} endText={` query done in ${cost} ms `.bgWhite.black} />
          <Newline />
        </Box>

        {A.jsx}
        {AAAA.jsx}
        {CNAME.jsx}
        {NS.jsx}
        {CAA.jsx}
        {MX.jsx}
        {NAPTR.jsx}
        {PTR.jsx}
        {SOA.jsx}
        {SRV.jsx}
        {TXT.jsx}
    </Box>
  );
}

function useDnsQuery(hostname: string) {
  const A = usePrintRecord(1, 'A', () => dns.resolve4(hostname), printRecord)

  const AAAA = usePrintRecord(2, 'AAAA', () => dns.resolve6(hostname), printRecord)

  const CNAME = usePrintRecord(3, 'CNAME', () => dns.resolveCname(hostname), printRecord)

  const NS = usePrintRecord(4, 'NS', () => dns.resolveNs(hostname), printRecord)

  const CAA = usePrintRecord(5, 'CAA', () => dns.resolveCaa(hostname), rsp => {
    if (rsp.length === 0) return '[]'.cyan;
    return rsp.map(r => {
      return printRecord(r)
    }).join(' | ')
  })

  const MX = usePrintRecord(6, 'MX', () => dns.resolveMx(hostname), rsp => {
    if (rsp.length === 0) return '[]'.cyan;

    const jsxs: any[] = [];

    rsp.forEach((r, idx) => {
      if (idx !== 0) jsxs.push(<Newline />)
      jsxs.push(printRecord(r))
    });

    return React.createElement(Text, null, ...jsxs);
  })

  const NAPTR = usePrintRecord(7, 'NAPTR', () => dns.resolveNaptr(hostname), rsp => {
    if (rsp.length === 0) return '[]'.cyan;
    return rsp.map(r => {
      return printRecord(r)
    }).join(' | ')
  });

  const PTR = usePrintRecord(8, 'PTR', () => dns.resolvePtr(hostname), rsp => {
    return rsp.join(' ');
  });

  const SOA = usePrintRecord(9, 'SOA', () => dns.resolveSoa(hostname), rsp => {
    return printRecord(rsp)
  });

  const SRV = usePrintRecord(10, 'SRV', () => dns.resolveSrv(hostname), rsp => {
    if (rsp.length === 0) return '[]'.cyan;
    return rsp.map(r => {
      return printRecord(r)
    }).join(' | ')
  });

  const TXT = usePrintRecord(11, 'TXT', () => dns.resolveTxt(hostname), rsp => {
    if (rsp.length === 0) return '[]'.cyan;
    return rsp.map(r => r.join(',')).join('; ').cyan;
  });

  const mergedLoading = (
    A.query.loading ||
    AAAA.query.loading ||
    CNAME.query.loading ||
    NS.query.loading ||
    CAA.query.loading ||
    MX.query.loading || 
    NAPTR.query.loading || 
    PTR.query.loading ||
    SOA.query.loading ||
    SRV.query.loading ||
    TXT.query.loading
  );

  return {
    A, AAAA, CNAME, NS, CAA, MX, NAPTR, PTR, SOA, SRV, TXT,
    mergedLoading,
  }
}

function useLoadingCost(loading: boolean) {
  const timeRef = React.useRef(0);
  const [cost, setCost] = React.useState(0);

  useEffect(() => {
    if (loading) {
      timeRef.current = Date.now();
    } else {
      setCost(Date.now() - timeRef.current)
    }
  }, [loading]);

  return [cost, setCost, timeRef];
}
