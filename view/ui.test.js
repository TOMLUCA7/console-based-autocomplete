import { jest } from "@jest/globals";
import { ui } from "./ui.js";

describe("ui", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  const loggedLines = () => logSpy.mock.calls.map((call) => call[0]);

  test("printWelcome shows banner and hint", () => {
    ui.printWelcome();
    expect(loggedLines()).toEqual([
      "=== AutoComplete Trie Console ===",
      "Type 'help' for commands\n",
    ]);
  });

  test("printHelp lists commands", () => {
    ui.printHelp();
    expect(loggedLines()).toEqual([
      "Commands:",
      "  add <word>      - Add word to dictionary",
      "  find <word>     - Check if word exists",
      "  complete <prefix> - Get completions",
      "  help            - Show this message",
      "  exit            - Quit program\n",
    ]);
  });

  test("printAdded shows success message", () => {
    ui.printAdded("cat");
    expect(loggedLines()).toEqual(["✔️  Added 'cat' to dictionary\n"]);
  });

  test("printFound reports existence", () => {
    ui.printFound("dog", true);
    ui.printFound("dog", false);
    expect(loggedLines()).toEqual([
      "✔️ 'dog' exists in dictionary\n",
      "❌ 'dog' not found in dictionary\n",
    ]);
  });

  test("printSuggestions renders list and empty state", () => {
    ui.printSuggestions("ca", ["car", "cat"]);
    ui.printSuggestions("zz", []);
    expect(loggedLines()).toEqual([
      "Suggestions for 'ca': car, cat\n",
      "No suggestions found for 'zz'\n",
    ]);
  });

  test("printExit says goodbye", () => {
    ui.printExit();
    expect(loggedLines()).toEqual(["Goodbye!"]);
  });
});

