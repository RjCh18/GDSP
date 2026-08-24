import { LitElement, css, html } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type UiButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'contrast'
  | 'outline-primary'
  | 'outline-danger';

@customElement('ui-button')
export class UiButton extends LitElement {
  @property({ type: String })
  variant: UiButtonVariant = 'primary';

  @property({ type: Boolean })
  small = false;

  @property({ type: Boolean })
  pill = false;

  @property({ type: Boolean, attribute: 'icon-only' })
  iconOnly = false;

  @property({ type: Boolean })
  disabled = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 18px;
      border-radius: 6px;
      border: 1px solid transparent;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }

    button.small {
      padding: 6px 12px;
      font-size: 0.85rem;
    }

    button.pill {
      border-radius: 999px;
    }

    button.icon-only {
      padding: 7px;
    }

    ::slotted(svg) {
      width: 16px;
      height: 16px;
      display: block;
    }

    button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    button.primary {
      background-color: var(--color-primary, #2563eb);
      color: var(--color-primary-contrast, #ffffff);
    }

    button.primary:hover:enabled {
      background-color: var(--color-primary-hover, #1d4ed8);
    }

    button.secondary {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-text-primary, #111111);
      border-color: var(--color-border, #e2e8f0);
    }

    button.secondary:hover:enabled {
      border-color: var(--color-text-secondary, #64748b);
    }

    button.danger {
      background-color: var(--color-danger, #dc2626);
      color: var(--color-primary-contrast, #ffffff);
    }

    button.danger:hover:enabled {
      background-color: var(--color-danger-hover, #b91c1c);
    }

    button.contrast {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-primary, #2563eb);
    }

    button.contrast:hover:enabled {
      background-color: var(--color-background, #f1f5f9);
    }

    button.outline-primary {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-primary, #2563eb);
      border-color: var(--color-primary, #2563eb);
    }

    button.outline-primary:hover:enabled {
      background-color: var(--color-background, #f1f5f9);
    }

    button.outline-danger {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-danger, #dc2626);
      border-color: var(--color-danger, #dc2626);
    }

    button.outline-danger:hover:enabled {
      background-color: var(--color-background, #f1f5f9);
    }
  `;

  render(): TemplateResult {
    const classNames = [
      this.variant,
      this.small ? 'small' : '',
      this.pill ? 'pill' : '',
      this.iconOnly ? 'icon-only' : '',
    ]
      .filter((className) => className !== '')
      .join(' ');
    return html`
      <button type="button" class=${classNames} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': UiButton;
  }
}
