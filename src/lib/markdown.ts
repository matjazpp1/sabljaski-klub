import { marked } from 'marked';

/** Izriše Markdown iz polja v glavi datoteke (npr. body_en) v HTML. */
export function renderMarkdown(source: string | undefined): string {
  if (!source) return '';
  return marked.parse(source, { async: false, gfm: true }) as string;
}
