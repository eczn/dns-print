import 'colors';
import { program } from 'commander'
import pkgjson from '../package.json';
import { mount } from './mount';
import { queryAll } from './query-all';

program
  .name(pkgjson.name)
  .version(pkgjson.version)
  .description(pkgjson.description);

program
  .argument('<hostname>', 'hostname to be queryed')
  .option('-s, --silent', 'query all in background')
  .action((hostname: string) => {
    const options = program.opts();
    if (options.silent) {
      queryAll.resolve(hostname);
    } else {
      mount(hostname!);
    }
  });

program.parse(process.argv);
