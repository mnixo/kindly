import { defineConfig } from 'cypress';
import 'dotenv/config';

module.exports = defineConfig({
  projectId: '93d52w',
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://localhost:3000',
    env: {
      loginEmail: 'user@mail.com',
      loginPassword: 'password123',
    },
  },
});
