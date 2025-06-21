import { ILauncher } from "../launcher";
import { GameOfLife, GoLTorusStrategy } from '../../src';
import { Command } from "commander";

export class GoLLauncher implements ILauncher {
    getName(): string {
        return "gol";
    }

    getDescription(): string {
        return "Conway's Game of Life Cellular Automaton";
    }

    printHelp(): void {
        console.log("Building");
    }

    async launchAsync(opts: string[]): Promise<void> {
        opts = opts || [];
        opts.unshift('gol'); // Ensure the command name is included

        const program = new Command();
        program
            .name('gol')
            .description("Conway's Game of Life Cellular Automaton")
            .arguments('<width> <height> <iterations> [intervalMs]')
            .showHelpAfterError()
            .parse(opts);

        const args = program.args;

        const width = parseInt(args[0], 10);
        const height = parseInt(args[1], 10);
        const iterations = parseInt(args[2], 10);
        const intervalMs = args[3] ? parseInt(args[3], 10) : 1000;
        await this.run(width, height, iterations, intervalMs);
    }

    async run(width: number, height: number, iterations: number, intervalMs: number): Promise<void> {
        const gol = new GameOfLife(
            height,
            width,
            new GoLTorusStrategy()
        );
        gol.reset();
        gol.insert(0, 0, [
            [false, true, false],
            [false, false, true],
            [true, true, true]
        ]);

        gol.printGrid();
        console.log(`Iterating ${iterations} times...`);
        for (let i = 0; i < iterations; i++) {
            await new Promise(resolve => setTimeout(resolve, intervalMs)); // Simulate delay for each generation
            gol.nextGeneration();
            gol.printGrid();
            console.log(`Iteration ${i + 1}/${iterations}`);
        }
        console.log("Game of Life simulation completed.");
    }
}