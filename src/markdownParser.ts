// markdownParser.ts
export class MarkdownParser {
  private rules: { [key: string]: RegExp } = {
    heading: /^(\#{1,6})\s+(.*)/,
    bold: /\*\*(.*)\*\*/,
    italic: /\*(.*)\*/,
    link: /\[(.+)\]\((.+)\)/,
  };

  private replaceAll(str: string, find: string, replace: string): string {
    return str.replace(new RegExp(find, "g"), replace);
  }

  private escapeHtml(str: string): string {
    return this.replaceAll(this.replaceAll(this.replaceAll(str, "&", "&amp;"), "<", "&lt;"), ">", "&gt;");
  }

  private parseLine(line: string): string {
    let parsedLine = this.escapeHtml(line);

    for (const rule in this.rules) {
      const regex = this.rules[rule];
      const match = regex.exec(parsedLine);

      if (match) {
        switch (rule) {
          case "heading":
            const level = match[1].length;
            const content = match[2];
            parsedLine = `<h${level}>${content}</h${level}>`;
            break;
          case "bold":
            parsedLine = parsedLine.replace(regex, "<strong>$1</strong>");
            break;
          case "italic":
            parsedLine = parsedLine.replace(regex, "<em>$1</em>");
            break;
          case "link":
            parsedLine = parsedLine.replace(regex, '<a href="$2">$1</a>');
            break;
        }
      }
    }

    return parsedLine;
  }

  public parse(markdown: string): string {
    const lines = markdown.split("\n");
    const parsedLines = lines.map((line) => this.parseLine(line));
    return parsedLines.join("\n");
  }
}