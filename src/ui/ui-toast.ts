import { LitElement, css, html, nothing } from 'lit';
import type { PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const DEFAULT_TOAST_DURATION_MS = 3000;

@customElement('ui-toast')
export class UiToast extends LitElement {
  @property({ type: String })
  message = '';

  @property({ type: Number, attribute: 'duration-ms' })
  durationMs = DEFAULT_TOAST_DURATION_MS;

  private dismissTimeoutIdentifier: number | undefined;

  static readonly styles = css`
    .toast {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 18px;
      border-radius: 8px;
      border: 1px solid var(--color-success, #16a34a);
      background-color: var(--color-success-surface, #f0fdf4);
      color: var(--color-text-primary, #111111);
      z-index: 200;
    }

    .toast-icon {
      color: var(--color-success, #16a34a);
      font-weight: 700;
    }

    .toast-close-button {
      border: none;
      background: none;
      padding: 2px;
      cursor: pointer;
      color: var(--color-text-secondary, #64748b);
      font-size: 15.2px;
    }
  `;

  protected updated(changedProperties: PropertyValues<this>): void {
    if (!changedProperties.has('message')) {
      return;
    }
    window.clearTimeout(this.dismissTimeoutIdentifier);
    if (this.message !== '') {
      this.dismissTimeoutIdentifier = window.setTimeout(() => {
        this.dispatchDismissed();
      }, this.durationMs);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.dismissTimeoutIdentifier);
  }

  render(): TemplateResult | typeof nothing {
    if (this.message === '') {
      return nothing;
    }
    return html`
      <div class="toast" role="status">
        <span class="toast-icon">✓</span>
        <span>${this.message}</span>
        <button
          type="button"
          class="toast-close-button"
          aria-label="Dismiss notification"
          @click=${this.handleCloseClick}
        >
          ✕
        </button>
      </div>
    `;
  }

  private handleCloseClick(): void {
    window.clearTimeout(this.dismissTimeoutIdentifier);
    this.dispatchDismissed();
  }

  private dispatchDismissed(): void {
    this.dispatchEvent(
      new CustomEvent('toast-dismissed', { bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-toast': UiToast;
  }
}
