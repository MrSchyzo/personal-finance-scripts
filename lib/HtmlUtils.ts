namespace HtmlUtils {
  export function encode(string: string): string {
    return string
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/[/]/g, "&frasl;")
      .replace(/\\/g, "&bsol;");
  }
}
