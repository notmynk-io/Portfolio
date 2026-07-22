import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import contactHandler from './api/contact.js';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-contact-middleware',
        configureServer(server) {
          server.middlewares.use('/api/contact', (req, res) => {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                (req as any).body = body ? JSON.parse(body) : {};
              } catch (e) {
                (req as any).body = {};
              }

              const resMock = res as any;
              resMock.status = (statusCode: number) => {
                res.statusCode = statusCode;
                return resMock;
              };
              resMock.json = (data: any) => {
                if (!res.headersSent) {
                  res.setHeader('Content-Type', 'application/json');
                }
                res.end(JSON.stringify(data));
                return resMock;
              };

              try {
                await contactHandler(req as any, resMock);
              } catch (err: any) {
                console.error('Vite dev API error:', err);
                if (!res.headersSent) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              }
            });
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
