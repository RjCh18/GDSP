import { LitElement, css, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-input')
export class UiInput extends LitElement {
  @property({ type: String })
  label = '';

  @property({ type: String })
  name = '';

  @property({ type: String })
  type = 'text';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  static readonly styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-text-primary, #111111);
    }

    .required-marker {
      color: var(--color-danger, #dc2626);
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 8px;
      background-color: var(--color-surface, #ffffff);
    }

    .input-wrapper:focus-within {
      border-color: var(--color-primary, #2563eb);
    }

    .input-wrapper.invalid {
      border-color: var(--color-danger, #dc2626);
    }

    ::slotted(svg) {
      width: 18px;
      height: 18px;
      color: var(--color-text-secondary, #64748b);
      flex-shrink: 0;
    }

    input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      padding: 0;
      background: transparent;
      color: var(--color-text-primary, #111111);
      font-family: inherit;
      font-size: 0.95rem;
    }

    input::placeholder {
      color: var(--color-text-secondary, #64748b);
    }

    .error-text {
      margin: 0;
      font-size: 0.8rem;
      color: var(--color-danger, #dc2626);
    }
  `;

  render(): TemplateResult {
    return html`
      ${this.renderLabel()}
      ${this.renderInputField()}
      ${this.renderErrorText()}
    `;
  }

  private renderLabel(): TemplateResult | typeof nothing {
    if (this.label === '') {
      return nothing;
    }
    return html`
      <label for="input-field">
        ${this.label}${this.required
          ? html`<span class="required-marker"> *</span>`
          : nothing}
      </label>
    `;
  }

  private renderInputField(): TemplateResult {
    return html`
      <div class="input-wrapper ${this.errorMessage !== '' ? 'invalid' : ''}">
        <slot name="icon"></slot>
        <input
          id="input-field"
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.handleInput}
        />
      </div>
    `;
  }

  private renderErrorText(): TemplateResult | typeof nothing {
    if (this.errorMessage === '') {
      return nothing;
    }
    return html`<p class="error-text">${this.errorMessage}</p>`;
  }

  private handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.dispatchEvent(
      new CustomEvent<{ name: string; value: string }>('value-changed', {
        detail: { name: this.name, value: inputElement.value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-input': UiInput;
  }
}
