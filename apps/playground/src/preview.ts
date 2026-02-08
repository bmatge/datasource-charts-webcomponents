/**
 * Preview HTML generation for the playground iframe
 */

export function getPreviewHTML(code: string): string {
  const origin = window.location.origin;
  // Strip any remote gouv-widgets script tags from the pasted code —
  // the playground always uses the local ESM version (which has latest fixes).
  const cleanedCode = code.replace(/<script[^>]*gouv-widgets[^>]*><\/script>\s*/gi, '');
  return `<!DOCTYPE html>
<html lang="fr" data-fr-theme>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
  <script type="module" src="${origin}/dist/gouv-widgets.esm.js"><\/script>
  <style>
    body { padding: 1rem; font-family: Marianne, arial, sans-serif; }
  </style>
</head>
<body>
${cleanedCode}
</body>
</html>`;
}

export function runPreview(editor: { getValue(): string }, iframeId: string): void {
  const code = editor.getValue();
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  if (iframe) {
    iframe.srcdoc = getPreviewHTML(code);
  }
}
