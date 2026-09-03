import { AppShell } from './app-shell';

export { AppShell };
export { AppShell as EmployeeApp };

if (!customElements.get('employee-app')) {
  customElements.define('employee-app', class extends AppShell {});
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-app': AppShell;
    'app-shell': AppShell;
  }
}
