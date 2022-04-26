import { dnsResolve, printRecord } from './utils';

export const query = new class {
  public resolve = async (hostname: string) => {
    console.log(`query ${hostname} ...`);
    try {
      const start = Date.now();
      const records = await dnsResolve(hostname);
      const cost = Date.now() - start;
      console.log(`querytime: ${cost}ms, ${records.length} records found:`);
      records.forEach(printRecord);
    } catch (error: any) {
      const errroMessage = error?.message || error?.toString() || 'unknown error, please check it or retry it.'
      console.log(errroMessage);
      process.exit(-1);
    }
  }
}
