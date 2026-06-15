import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom plugin to inline CSS into HTML and remove the original link tag and CSS file
function inlineCSS() {
  return {
    name: 'inline-css',
    enforce: 'post' as const,
    generateBundle(_options: any, bundle: any) {
      const htmlFile = 'index.html';
      const htmlAsset = bundle[htmlFile];
      if (!htmlAsset || htmlAsset.type !== 'asset') return;

      let htmlContent = htmlAsset.source.toString();
      const cssFiles = Object.keys(bundle).filter(key => key.endsWith('.css'));

      for (const cssFile of cssFiles) {
        const cssAsset = bundle[cssFile];
        if (cssAsset && cssAsset.type === 'asset') {
          const cssContent = cssAsset.source.toString();
          const escapedCssFile = cssFile.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const regex = new RegExp(`<link[^>]*href="[^"]*${escapedCssFile}"[^>]*>`, 'gi');

          if (regex.test(htmlContent)) {
            htmlContent = htmlContent.replace(regex, `<style>${cssContent}</style>`);
            delete bundle[cssFile];
          }
        }
      }
      htmlAsset.source = htmlContent;
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    inlineCSS()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion';
          }
        }
      }
    }
  }
})
