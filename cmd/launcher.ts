export interface ILauncher {
    launchAsync(opts: string[]): Promise<void>;
    printHelp(): void;
    getName(): string;
    getDescription(): string;
}
