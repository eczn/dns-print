import { resolver, printRecord } from './utils';

export const queryAll = new class {
  public resolve = async (hostname: string) => {
    console.log(`query ${hostname} ...`);
    try {
      const start = Date.now();
      const records = await resolver.resolve(hostname, 'ANY');
      const cost = Date.now() - start;
      console.log(`querytime: ${cost}ms, ${records.length} records found:`);
      records.forEach((r, idx) => {
        const str = printRecord(r, idx);
        console.log(str);
      });
    } catch (error: any) {
      const errroMessage = error?.message || error?.toString() || 'unknown error, please check it or retry it.'
      console.log(errroMessage);
      process.exit(-1);
    }
  }
}
