import dns from 'dns';

export function dnsResolve(hostname: string): Promise<dns.AnyRecord[]> {
  return new Promise((resolve, reject) => {
    dns.resolve(hostname, 'ANY', (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

export function printRecord(record: dns.AnyRecord, idx: number) {
  const strs: string[] = [
    ` ${maskPrefix(idx).grey}${'|'.grey} ${maskPrefix(record.type, '   ').yellow}`,
  ];
  
  const rawRecord: Record<string, any> = record;
  Object.keys(rawRecord).forEach(key => {
    if (key === 'type') return; // 前面处理过

    const colorKey = key.green;
    const colorEq = '='.grey;
    const colorValue = JSON.stringify(rawRecord[key] || null).cyan;

    strs.push(` ${colorKey}${colorEq}${colorValue}`)
  });

  const output = strs.join(' ');
  console.log(output);
}

// maskPrefix(1) ==> '01'
// maskPrefix(7) ==> '07'
// maskPrefix(77) ==> '77'
export function maskPrefix(i: number | string, mask = '00') {
  return (mask + i.toString()).slice(-mask.length);
}
