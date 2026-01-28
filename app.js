import promptSync from "prompt-sync";
import { AutoCompleteTrie } from "./model/Trie.js";
import { ui } from "./view/ui.js";

const prompt = promptSync();
const trie = new AutoCompleteTrie();

ui.printWelcome();

let running = true;

// this while loop use to run the app on Terminal
while (running) {
  const input = prompt("> ");
  const [command, arg] = input.split(" ");

  switch (command.toLowerCase()) {
    case "help":
      ui.printHelp();
      break;

    case "add":
      if (arg) {
        trie.addWord(arg);
        ui.printAdded(arg);
      }
      break;

    case "find":
      if (arg) {
        const exists = trie.findWord(arg);
        ui.printFound(arg, exists);
      }
      break;

    case "complete":
      if (arg) {
        const suggestions = trie.predictWord(arg);
        ui.printSuggestions(arg, suggestions);
      }
      break;

    case "exit":
      ui.printExit();
      running = false; // שובר את הלולאה ומסיים את התוכנית
      break;

    default:
      if (command !== "") {
        console.log(`Unknown command: ${command}. Type 'help' for commands.\n`);
      }
      break;
  }
}
