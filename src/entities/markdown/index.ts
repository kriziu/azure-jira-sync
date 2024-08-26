import { marked } from 'marked';

export function convertJiraMarkupToHtml(jiraMarkup: string) {
  // Convert Jira markup to Markdown-like syntax
  const markdown = jiraMarkup
    .replace(/h1\./g, '# ') // Convert h1. to #
    .replace(/h2\./g, '## ') // Convert h2. to ##
    .replace(/h3\./g, '### ') // Convert h3. to ###
    .replace(/h4\./g, '#### ') // Convert h4. to ####
    .replace(/h5\./g, '##### ') // Convert h5. to #####
    .replace(/h6\./g, '###### ') // Convert h6. to ######
    .replace(/\*([^*]+)\*/g, '**$1**') // Convert *text* to **text** for bold
    .replace(/_([^_]+)_/g, '*$1*') // Convert _text_ to *text* for italic
    .replace(/!\[([^\]]+)\|([^!]+)!/g, '<img src="$1" alt="$2" />') // Convert !image|options! to <img> tags
    .replace(/\n/g, '\n\n'); // Ensure new lines are respected

  // Convert the Markdown-like syntax to HTML
  const html = marked(markdown);

  return html;
}
