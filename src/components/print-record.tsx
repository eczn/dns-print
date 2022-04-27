import React, { useEffect } from 'react';
import { Text, Box, Newline } from 'ink';
import { Loading, FRAMES_SHIFT } from './loading';
import { maskPrefix } from '../utils';
import { useQuery } from './use-query';

export interface PrintRecordProps {
  idx: number;
  type: string;
  error: any;
  loading: boolean;
  render: () => string;
}

export function PrintRecord(props: PrintRecordProps) {
  let output: any = '';
  if (props.error) {
    output = (props.error?.code || 'UNKNOWN_QUERY_ERROR').red;
  } else if (props.loading) {
    output = <Loading loading={true} frames={FRAMES_SHIFT} />;
  } else {
    output = props.render();
  }

  return (
    <Box>
      <Box marginRight={0} width={16}>
        <Text>{maskPrefix(props.idx).grey} {'|'.grey} {maskPrefix(props.type, '      ').yellow} {'|'.grey}</Text>
      </Box>
      <Box>
        {typeof output === 'string' ? <Text>{output}</Text> : output}
      </Box>
    </Box>
  );
}

export function usePrintRecord<Rsp>(
  idx: number,
  type: string,
  fn: () => Promise<Rsp>,
  render: (rsp: Rsp) => any
) {
  const query = useQuery<Rsp>(() => fn());

  const jsx = (
    <Box>
      <PrintRecord
        idx={idx}
        type={type}
        loading={query.loading}
        error={query.error}
        render={() => {
          return render(query.result);
        }} />
    </Box>
  )

  return {
    jsx,
    query,
  };
}

