import readline from 'readline';
import { AutoCompleteTrie } from './model/Trie.js';
import { ui } from './view/ui.js';

const trie = new AutoCompleteTrie();

 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

ui.printWelcome();


const handleInput = (input) => {
    const command = input;
    switch (command) {
        case "help":
            ui.printHelp();
            break;
        case "add":
            rl.question("Enter a word: ", (word) => {
                trie.addWord(word);
                ui.printAdded(word);
            });
            break;
        case "find":
            rl.question("Enter a word: ", (word) => {
                ui.printFound(word, trie.findWord(word));
            });
            break;
        case "complete":
            rl.question("Enter a prefix: ", (prefix) => {
                ui.printSuggestions(prefix, trie.predictWord(prefix));
            });
            break;
        case "exit":
            ui.printExit();
            rl.close();
            break;
        default:
            if (command !== "") {
                console.log(`Unknown command: ${command}. Type 'help' for commands.\n`);
            }
            break;
    }
}

handleInput(rl.question("> "));

// rl.on('line', (input) => {
//     handleInput(input);
// });