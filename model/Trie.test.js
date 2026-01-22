import { AutoCompleteTrie } from "./Trie.js";

describe("AutoCompleteTrie", () => {
  test("findWord returns false for missing words and true after addWord", () => {
    const trie = new AutoCompleteTrie();

    expect(trie.findWord("cat")).toBe(false);

    trie.addWord("cat");
    expect(trie.findWord("cat")).toBe(true);
    expect(trie.findWord("ca")).toBe(false);
    expect(trie.findWord("cats")).toBe(false);
  });

  test("addWord supports overlapping prefixes", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("car");
    trie.addWord("cart");
    trie.addWord("cat");

    expect(trie.findWord("car")).toBe(true);
    expect(trie.findWord("cart")).toBe(true);
    expect(trie.findWord("cat")).toBe(true);
    expect(trie.findWord("ca")).toBe(false);
  });

  test("predictWord returns all completions for a prefix", () => {
    const trie = new AutoCompleteTrie();
    ["car", "cart", "cat", "dog"].forEach((w) => trie.addWord(w));

    const out = trie.predictWord("ca").slice().sort();
    expect(out).toEqual(["car", "cart", "cat"]);
  });

  test("predictWord includes the prefix itself if it is a word", () => {
    const trie = new AutoCompleteTrie();
    ["a", "an", "and", "ant"].forEach((w) => trie.addWord(w));

    const out = trie.predictWord("an").slice().sort();
    expect(out).toEqual(["an", "and", "ant"]);
  });

  test("predictWord returns [] when the prefix path does not exist", () => {
    const trie = new AutoCompleteTrie();
    ["car", "cart", "cat"].forEach((w) => trie.addWord(w));

    expect(trie.predictWord("zzz")).toEqual([]);
  });
});

