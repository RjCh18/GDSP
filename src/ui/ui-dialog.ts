import { LitElement, css, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './ui-button';

@customElement('ui-dialog')
export class UiDialog extends LitElement {
  @property({ type: Boolean })
  open = false;

  @property({ type: String })
  heading = '';

  @property({ type: String, attribute: 'confirm-label' })
  confirmLabel = 'Confirm';

  @property({ type: String, attribute: 'cancel-label' })
  cancelLabel = 'Cancel';

  static styles = css`
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background-color: var(--color-backdrop, rgb(0 0 0 / 0.45));
      z-index: 100;
    }

    .dialog-panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      max-width: 420px;
      padding: 24px;
      box-sizing: border-box;
      background-color: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 10px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .dialog-heading {
      margin: 0;
      font-size: 1.15rem;
      color: var(--color-text-primary, #111111);
    }

    .dialog-close-button {
      border: none;
      background: none;
      padding: 4px;
      font-size: 1.1rem;
      cursor: pointer;
      color: var(--color-text-secondary, #64748b);
    }

    .dialog-body {
      color: var(--color-text-secondary, #64748b);
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `;

  render(): TemplateResult | typeof nothing {
    if (!this.open) {
      return nothing;
    }
    return html`
      <div class="dialog-backdrop" @click=${this.handleCancel}>
        <div class="dialog-panel" @click=${this.handlePanelClick}>
          ${this.renderDialogHeader()}
          <div class="dialog-body"><slot></slot></div>
          ${this.renderDialogActions()}
        </div>
      </div>
    `;
  }

  private renderDialogHeader(): TemplateResult {
    return html`
      <div class="dialog-header">
        <h2 class="dialog-heading">${this.heading}</h2>
        <button
          type="button"
          class="dialog-close-button"
          aria-label="Close dialog"
          @click=${this.handleCancel}
        >
          ✕
        </button>
      </div>
    `;
  }

  private renderDialogActions(): TemplateResult {
    return html`
      <div class="dialog-actions">
        <ui-button variant="secondary" @click=${this.handleCancel}>
          ${this.cancelLabel}
        </ui-button>
        <ui-button variant="danger" @click=${this.handleConfirm}>
          ${this.confirmLabel}
        </ui-button>
      </div>
    `;
  }

  private handlePanelClick(event: Event): void {
    event.stopPropagation();
  }

  private handleCancel(): void {
    this.dispatchEvent(
      new CustomEvent('dialog-cancel', { bubbles: true, composed: true }),
    );
  }

  private handleConfirm(): void {
    this.dispatchEvent(
      new CustomEvent('dialog-confirm', { bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-dialog': UiDialog;
  }
}
