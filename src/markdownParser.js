"use strict";
exports.__esModule = true;
exports.MarkdownParser = void 0;
// markdownParser.ts
var MarkdownParser = /** @class */ (function () {
    function MarkdownParser() {
        this.rules = {
            heading: /^(\#{1,6})\s+(.*)/,
            bold: /\*\*(.*)\*\*/,
            italic: /\*(.*)\*/,
            link: /\[(.+)\]\((.+)\)/
        };
    }
    MarkdownParser.prototype.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find, "g"), replace);
    };
    MarkdownParser.prototype.escapeHtml = function (str) {
        return this.replaceAll(this.replaceAll(this.replaceAll(str, "&", "&amp;"), "<", "&lt;"), ">", "&gt;");
    };
    MarkdownParser.prototype.parseLine = function (line) {
        var parsedLine = this.escapeHtml(line);
        for (var rule in this.rules) {
            var regex = this.rules[rule];
            var match = regex.exec(parsedLine);
            if (match) {
                switch (rule) {
                    case "heading":
                        var level = match[1].length;
                        var content = match[2];
                        parsedLine = "<h".concat(level, ">").concat(content, "</h").concat(level, ">");
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
    };
    MarkdownParser.prototype.parse = function (markdown) {
        var _this = this;
        var lines = markdown.split("\n");
        var parsedLines = lines.map(function (line) { return _this.parseLine(line); });
        return parsedLines.join("\n");
    };
    return MarkdownParser;
}());
exports.MarkdownParser = MarkdownParser;
