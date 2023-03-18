// main.ts

import { MarkdownParser } from "./markdownParser";



const markdown = `# Heading 1
This is a *simple* **Markdown** to HTML parser.
[Visit OpenAI](https://www.openai.com)
`;

const parser = new MarkdownParser();
const html = parser.parse(markdown);
console.log(html);
