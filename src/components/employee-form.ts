import { LitElement, css, html } from 'lit';
import type { PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Employee } from '../types/employee';
import '../ui/ui-input';
import '../ui/ui-button';

interface EmployeeFormErrorMessages {
  fullName: string;
  department: string;
  emailAddress: string;
}

@customElement('employee-form')
export class EmployeeForm extends LitElement {
  @property({ attribute: false })
  employeeToEdit: Employee | null = null;

  @state()
  private draftFullName = '';

  @state()
  private draftDepartment = '';

  @state()
  private draftDesignation = '';

  @state()
  private draftEmailAddress = '';

  @state()
  private errorMessages: EmployeeFormErrorMessages = {
    fullName: '',
    department: '',
    emailAddress: '',
  };

  static readonly styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-fields {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .form-fields ui-input {
      flex: 1 1 200px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `;

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('employeeToEdit') && this.employeeToEdit !== null) {
      this.draftFullName = this.employeeToEdit.fullName;
      this.draftDepartment = this.employeeToEdit.department;
      this.draftDesignation = this.employeeToEdit.designation;
      this.draftEmailAddress = this.employeeToEdit.emailAddress;
      this.errorMessages = { fullName: '', department: '', emailAddress: '' };
    }
  }

  render(): TemplateResult {
    return html`
      ${this.renderFormFields()}
      ${this.renderFormActions()}
    `;
  }

  private renderFormFields(): TemplateResult {
    return html`
      <div class="form-fields">
        <ui-input
          name="fullName"
          placeholder="Full Name"
          required
          .value=${this.draftFullName}
          error-message=${this.errorMessages.fullName}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderPersonIcon()}
        </ui-input>
        <ui-input
          name="department"
          placeholder="Department"
          required
          .value=${this.draftDepartment}
          error-message=${this.errorMessages.department}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderBuildingIcon()}
        </ui-input>
        <ui-input
          name="designation"
          placeholder="Designation"
          .value=${this.draftDesignation}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderBadgeIcon()}
        </ui-input>
        <ui-input
          name="emailAddress"
          type="email"
          placeholder="Email"
          required
          .value=${this.draftEmailAddress}
          error-message=${this.errorMessages.emailAddress}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderMailIcon()}
        </ui-input>
      </div>
    `;
  }

  private renderFormActions(): TemplateResult {
    return html`
      <div class="form-actions">
        <ui-button variant="primary" @click=${this.handleSaveClick}>
          ${this.employeeToEdit === null ? 'Save' : 'Update'}
        </ui-button>
        <ui-button variant="secondary" @click=${this.handleClearClick}>
          Clear
        </ui-button>
      </div>
    `;
  }

  private renderPersonIcon(): TemplateResult {
    return html`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    `;
  }

  private renderBuildingIcon(): TemplateResult {
    return html`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 10h.01M9 14h.01M15 10h.01M15 14h.01" />
      </svg>
    `;
  }

  private renderBadgeIcon(): TemplateResult {
    return html`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M15 8h4M15 12h4M7 16h10" />
      </svg>
    `;
  }

  private renderMailIcon(): TemplateResult {
    return html`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    `;
  }

  private handleFieldValueChanged(
    event: CustomEvent<{ name: string; value: string }>,
  ): void {
    const { name, value } = event.detail;
    if (name === 'fullName') {
      this.draftFullName = value;
    } else if (name === 'department') {
      this.draftDepartment = value;
    } else if (name === 'designation') {
      this.draftDesignation = value;
    } else if (name === 'emailAddress') {
      this.draftEmailAddress = value;
    }
  }

  private handleSaveClick(): void {
    if (!this.validateForm()) {
      return;
    }
    const employee: Employee = {
      identifier: this.employeeToEdit === null ? 0 : this.employeeToEdit.identifier,
      fullName: this.draftFullName.trim(),
      department: this.draftDepartment.trim(),
      designation: this.draftDesignation.trim(),
      emailAddress: this.draftEmailAddress.trim(),
    };
    this.dispatchEvent(
      new CustomEvent<{ employee: Employee }>('employee-save', {
        detail: { employee },
        bubbles: true,
        composed: true,
      }),
    );
    this.clearFormFields();
  }

  private handleClearClick(): void {
    this.clearFormFields();
    this.dispatchEvent(
      new CustomEvent('form-cleared', { bubbles: true, composed: true }),
    );
  }

  private clearFormFields(): void {
    this.draftFullName = '';
    this.draftDepartment = '';
    this.draftDesignation = '';
    this.draftEmailAddress = '';
    this.errorMessages = { fullName: '', department: '', emailAddress: '' };
  }

  private validateForm(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nextErrorMessages: EmployeeFormErrorMessages = {
      fullName: '',
      department: '',
      emailAddress: '',
    };
    if (this.draftFullName.trim() === '') {
      nextErrorMessages.fullName = 'Name is required';
    }
    if (this.draftDepartment.trim() === '') {
      nextErrorMessages.department = 'Department is required';
    }
    if (this.draftEmailAddress.trim() === '') {
      nextErrorMessages.emailAddress = 'Email is required';
    } else if (!emailPattern.test(this.draftEmailAddress.trim())) {
      nextErrorMessages.emailAddress = 'Enter a valid email';
    }
    this.errorMessages = nextErrorMessages;
    return (
      nextErrorMessages.fullName === '' &&
      nextErrorMessages.department === '' &&
      nextErrorMessages.emailAddress === ''
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-form': EmployeeForm;
  }
}
