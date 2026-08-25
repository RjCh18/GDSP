import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: 'src/employee-app.ts',
      name: 'EmployeeManagementWidget',
      fileName: 'employee-management-widget',
      formats: ['es'],
    },
    outDir: 'dist-widget',
    emptyOutDir: true,
  },
});
