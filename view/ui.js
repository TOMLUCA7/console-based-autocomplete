export const ui = {
    printWelcome: () => {
        console.log("=== AutoComplete Trie Console ===");
        console.log("Type 'help' for commands\n");
    },

    printHelp: () => {
        console.log("Commands:");
        console.log("  add <word>      - Add word to dictionary");
        console.log("  find <word>     - Check if word exists");
        console.log("  complete <prefix> - Get completions");
        console.log("  help            - Show this message");
        console.log("  exit            - Quit program\n");
    },

    printAdded: (word) => {
        console.log(`✔️  Added '${word}' to dictionary\n`);
    },

    printFound: (word, exists) => {
        if (exists) {
            console.log(`✔️ '${word}' exists in dictionary\n`);
        } else {
            console.log(`❌ '${word}' not found in dictionary\n`);
        }
    },

    printSuggestions: (prefix, list) => {
        if (list.length > 0) {
            console.log(`Suggestions for '${prefix}': ${list.join(", ")}\n`);
        } else {
            console.log(`No suggestions found for '${prefix}'\n`);
        }
    },

    printExit: () => {
        console.log("Goodbye!");
    }
};