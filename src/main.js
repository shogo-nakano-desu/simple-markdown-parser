"use strict";
// main.ts
exports.__esModule = true;
var markdownParser_1 = require("./markdownParser");
var markdown = "# Heading 1\nThis is a *simple* **Markdown** to HTML parser.\n[Visit OpenAI](https://www.openai.com)\n";
var parser = new markdownParser_1.MarkdownParser();
var html = parser.parse(markdown);
console.log(html);
