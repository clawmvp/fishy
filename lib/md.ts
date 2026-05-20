// Minimal markdown renderer for article bodies (no external deps)

export function renderMd(md: string): string {
  let html = md;

  // Escape HTML
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Tables (very simple — 2 col / 3 col)
  html = html.replace(/(\|.+\|\n)+/g, (block) => {
    const rows = block.trim().split("\n");
    if (rows.length < 2) return block;
    const headers = rows[0]
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    const dataRows = rows.slice(2).map((r) =>
      r
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean)
    );
    const headerHtml = headers.map((h) => `<th>${h}</th>`).join("");
    const bodyHtml = dataRows
      .map(
        (cells) =>
          `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`
      )
      .join("");
    return `<table class="md-table"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>\n`;
  });

  // Headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");

  // Blockquote
  html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic (single underscore or single asterisk)
  html = html.replace(/\b_(.+?)_\b/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Lists — bullet
  html = html.replace(/(^|\n)(- .+(?:\n- .+)*)/g, (_, pre, block) => {
    const items = block
      .split("\n")
      .map((l: string) => l.replace(/^- /, "").trim())
      .filter(Boolean)
      .map((c: string) => `<li>${c}</li>`)
      .join("");
    return `${pre}<ul>${items}</ul>`;
  });

  // Numbered list
  html = html.replace(/(^|\n)(\d+\. .+(?:\n\d+\. .+)*)/g, (_, pre, block) => {
    const items = block
      .split("\n")
      .map((l: string) => l.replace(/^\d+\. /, "").trim())
      .filter(Boolean)
      .map((c: string) => `<li>${c}</li>`)
      .join("");
    return `${pre}<ol>${items}</ol>`;
  });

  // Paragraphs (lines not already wrapped)
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      if (
        block.startsWith("<h") ||
        block.startsWith("<ul") ||
        block.startsWith("<ol") ||
        block.startsWith("<blockquote") ||
        block.startsWith("<table")
      ) {
        return block;
      }
      const trimmed = block.trim();
      if (!trimmed) return "";
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n\n");

  return html;
}
