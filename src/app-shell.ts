import { LitElement, css, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './widgets/employee/employee-widget';

@customElement('app-shell')
export class AppShell extends LitElement {
  @state()
  private lastEmittedEventName = '';

  static readonly styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      padding: 32px 16px;
    }

    .application-header {
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 24px;
      border-radius: 10px;
      background: linear-gradient(
        135deg,
        var(--color-primary, #2563eb),
        var(--color-primary-hover, #1d4ed8)
      );
      color: var(--color-primary-contrast, #ffffff);
    }

    .header-title {
      margin: 0;
      font-size: 25.6px;
    }

    .header-subtitle {
      margin: 4px 0 0;
      font-size: 15.2px;
      opacity: 0.85;
    }

    .events-strip {
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px 16px;
      padding: 12px 16px;
      border: 1px dashed var(--color-border, #e2e8f0);
      border-radius: 8px;
      color: var(--color-text-secondary, #64748b);
      font-size: 13.6px;
    }

    .last-event {
      color: var(--color-primary, #2563eb);
      font-weight: 600;
    }
  `;

  render(): TemplateResult {
    return html`
      ${this.renderApplicationHeader()}
      ${this.renderWidgets()}
      ${this.renderEventsStrip()}
    `;
  }

  private renderApplicationHeader(): TemplateResult {
    return html`
      <header class="application-header">
        <div>
          <h1 class="header-title">Employee Management</h1>
          <p class="header-subtitle">Manage your organization employees</p>
        </div>
      </header>
    `;
  }

  private renderWidgets(): TemplateResult {
    return html`
      <employee-widget
        @employee-added=${this.handleEmployeeAdded}
        @employee-updated=${this.handleEmployeeUpdated}
        @employee-deleted=${this.handleEmployeeDeleted}
      ></employee-widget>
    `;
  }

  private renderEventsStrip(): TemplateResult {
    return html`
      <footer class="events-strip">
        <span>
          Events: employee-added, employee-updated, employee-deleted
        </span>
        ${this.lastEmittedEventName === ''
          ? nothing
          : html`<span class="last-event">
              Last event: ${this.lastEmittedEventName}
            </span>`}
      </footer>
    `;
  }

  private handleEmployeeAdded(_event: Event): void {
    this.lastEmittedEventName = 'employee-added';
  }

  private handleEmployeeUpdated(_event: Event): void {
    this.lastEmittedEventName = 'employee-updated';
  }

  private handleEmployeeDeleted(_event: Event): void {
    this.lastEmittedEventName = 'employee-deleted';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-shell': AppShell;
  }
}
