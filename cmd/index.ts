import { Command } from 'commander';
import { ILauncher } from './launcher';
import { GoLLauncher } from './launchers/gol';

(async () => {
    const program = new Command();

    program
        .name('automats')
        .description('Automata in TypeScript')
        .helpCommand(false)
        .helpOption(false)
        .arguments('<automaton> [args...]')
        .allowUnknownOption()
        .showHelpAfterError()
        .parse(process.argv);

    const launchers: ILauncher[] = [
        new GoLLauncher(),
    ];

    const automaton = program.args[0];

    const launcher = launchers.find(l => l.getName() === automaton);
    if (launcher) {
        try {
            await launcher.launchAsync(program.args);
        } catch (error) {
            console.error(`Error launching automaton "${automaton}":`, error);
            process.exit(1);
        }
    } else {
        console.error(`Automaton "${automaton}" not found.`);
        console.log("");
        program.help();
        process.exit(1);
    }
})();