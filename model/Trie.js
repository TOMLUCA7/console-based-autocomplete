export class AutoCompleteTrie {
    constructor(value = "", endOfWord = false) {
        this.value = value;
        this.children = {};
        this.endOfWord = endOfWord;
    }

    addWord(word) {
        let current = this;
        for (const char of word) {
            if (!current.children[char]) {
                current.children[char] = new AutoCompleteTrie(char);
            }
            current = current.children[char];
        }
        current.endOfWord = true;
    }

    findWord(word) {
        let current = this;
        for (const char of word) {
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return current.endOfWord;
    }

    predictWord(prefix) {
        let current = this;
        for (const char of prefix) {
            if (!current.children[char]) {
                return [];
            }
            current = current.children[char];
        }
        return this._getRemainingTree(current);
    }

    _getRemainingTree(prefix, node) {
        let current = node;
        for (const char of prefix) {
            if (!current.children[char]) return null;
            current = current.children[char];
        }
        return current;
    }

    _allWordsHelper(node, prefix, allWords) {
        if (node.endOfWord) {
            allWords.push(prefix);
        }
        for (const key in node.children) {
            this._allWordsHelper(node.children[key], prefix + key, allWords);
        }
    }
}