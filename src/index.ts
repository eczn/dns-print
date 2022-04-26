import 'colors';
import { program } from 'commander'
import pkgjson from '../package.json';
import { query } from './query';

program
  .name(pkgjson.name)
  .version(pkgjson.version)
  .description(pkgjson.description);

program
  .argument('<hostname>', 'hostname to be queryed')
  .action(query.resolve);

program.parse(process.argv);


// dns.resolve()
