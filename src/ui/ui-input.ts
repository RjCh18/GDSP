import { LitElement, css, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-input')
export class UiInput extends LitElement {
  @property()
  label = '';

  @property()
  name = '';

  @property()
  type = 'text';

  @property()
  value: string | number | null | undefined = '';

  @property()
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ attribute: 'error-message' })
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

    .input-wrapper.disabled {
      background-color: var(--color-background, #f1f5f9);
      opacity: 0.65;
      cursor: not-allowed;
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

    input:disabled {
      cursor: not-allowed;
      color: var(--color-text-secondary, #64748b);
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
    const wrapperClasses = [
      'input-wrapper',
      this.errorMessage !== '' ? 'invalid' : '',
      this.disabled ? 'disabled' : '',
    ]
      .filter((className) => className !== '')
      .join(' ');

    const displayValue =
      this.value === null || this.value === undefined ? '' : String(this.value);

    return html`
      <div class=${wrapperClasses}>
        <slot name="icon"></slot>
        <input
          id="input-field"
          type=${this.type}
          .value=${displayValue}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
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

  validate(): boolean {
    const stringValue =
      this.value === null || this.value === undefined
        ? ''
        : String(this.value).trim();

    if (this.required && stringValue === '') {
      const fieldDescriptor =
        this.label !== ''
          ? this.label
          : this.placeholder !== ''
            ? this.placeholder
            : 'Field';
      this.errorMessage = `${fieldDescriptor} is required`;
      return false;
    }

    if (this.type === 'email' && stringValue !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(stringValue)) {
        this.errorMessage = 'Enter a valid email';
        return false;
      }
    }

    this.errorMessage = '';
    return true;
  }

  clear(): void {
    this.value = '';
    this.errorMessage = '';
  }

  private handleInput(event: Event): void {
    if (this.disabled) {
      return;
    }
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const nextValue = target.value;
    this.value = nextValue;
    if (this.errorMessage !== '') {
      this.validate();
    }
    this.dispatchEvent(
      new CustomEvent<{ name: string; value: string }>('value-changed', {
        detail: { name: this.name, value: nextValue },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleBlur(): void {
    if (this.disabled) {
      return;
    }
    if (this.value !== '' && this.value !== null && this.value !== undefined) {
      this.validate();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-input': UiInput;
  }
}
