import dns from 'dns/promises';

export const resolver = new dns.Resolver({});

export function printRecord(record: any, idx?: number) {
  if (Array.isArray(record)) return JSON.stringify(record).cyan;

  const strs: string[] = [];
  if (typeof idx === 'number' && record.type) {
    strs.push(` ${maskPrefix(idx).grey}${'|'.grey} ${maskPrefix(record.type, '       ').yellow}`);
  }

  const rawRecord: Record<string, any> = record;
  Object.keys(rawRecord).forEach(key => {
    if (key === 'type') return; // 前面处理过
    const colorKey = key.green;
    const colorEq = '='.grey;
    const colorValue = JSON.stringify(rawRecord[key] || null).cyan;
    strs.push(`${colorKey}${colorEq}${colorValue}`)
  });

  const output = strs.join(' ');
  return output;
}

// maskPrefix(1) ==> '01'
// maskPrefix(7) ==> '07'
// maskPrefix(77) ==> '77'
export function maskPrefix(i: number | string = '', mask = '00') {
  return (mask + i.toString()).slice(-mask.length);
}
