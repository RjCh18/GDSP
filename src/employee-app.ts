import { LitElement, css, html, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Employee } from './types/employee';
import { employeeService } from './services/employee-service';
import './components/employee-form';
import './components/employee-table';
import './ui/ui-button';

@customElement('employee-app')
export class EmployeeApp extends LitElement {
  @state()
  private employeeList: Employee[] = [];

  @state()
  private employeeSelectedForEdit: Employee | null = null;

  @state()
  private toastMessage = '';

  @state()
  private lastEmittedEventName = '';

  private toastTimeoutIdentifier: number | undefined;

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
      font-size: 1.6rem;
    }

    .header-subtitle {
      margin: 4px 0 0;
      font-size: 0.95rem;
      opacity: 0.85;
    }

    .content-card {
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      padding: 24px;
      background-color: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 10px;
    }

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
      font-size: 0.95rem;
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
      font-size: 0.85rem;
    }

    .last-event {
      color: var(--color-primary, #2563eb);
      font-weight: 600;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.refreshEmployeeList();
  }

  render(): TemplateResult {
    return html`
      ${this.renderToast()}
      ${this.renderApplicationHeader()}
      ${this.renderFormCard()}
      ${this.renderTableCard()}
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
        <ui-button variant="contrast" @click=${this.handleAddEmployeeRequest}>
          + Add Employee
        </ui-button>
      </header>
    `;
  }

  private renderFormCard(): TemplateResult {
    return html`
      <section class="content-card">
        <employee-form
          .employeeToEdit=${this.employeeSelectedForEdit}
          @employee-save=${this.handleEmployeeSave}
          @form-cleared=${this.handleFormCleared}
        ></employee-form>
      </section>
    `;
  }

  private renderTableCard(): TemplateResult {
    return html`
      <section class="content-card">
        <employee-table
          .employees=${this.employeeList}
          @employee-edit-request=${this.handleEmployeeEditRequest}
          @employee-delete=${this.handleEmployeeDelete}
          @employee-add-request=${this.handleAddEmployeeRequest}
        ></employee-table>
      </section>
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

  private renderToast(): TemplateResult | typeof nothing {
    if (this.toastMessage === '') {
      return nothing;
    }
    return html`
      <div class="toast" role="status">
        <span class="toast-icon">✓</span>
        <span>${this.toastMessage}</span>
        <button
          type="button"
          class="toast-close-button"
          aria-label="Dismiss notification"
          @click=${this.handleToastClose}
        >
          ✕
        </button>
      </div>
    `;
  }

  private handleEmployeeSave(event: CustomEvent<{ employee: Employee }>): void {
    const { employee, isNew } = employeeService.save(event.detail.employee);
    this.refreshEmployeeList();
    this.showToast(
      isNew
        ? 'Employee added successfully!'
        : 'Employee updated successfully!',
    );
    this.emitDomainEvent(
      isNew ? 'employee-added' : 'employee-updated',
      employee,
    );
    this.employeeSelectedForEdit = null;
  }

  private handleEmployeeDelete(
    event: CustomEvent<{ employee: Employee }>,
  ): void {
    const deletedEmployee = employeeService.delete(
      event.detail.employee.identifier,
    );
    if (deletedEmployee !== null) {
      this.refreshEmployeeList();
      if (
        this.employeeSelectedForEdit?.identifier === deletedEmployee.identifier
      ) {
        this.employeeSelectedForEdit = null;
      }
      this.showToast('Employee deleted successfully!');
      this.emitDomainEvent('employee-deleted', deletedEmployee);
    }
  }

  private handleEmployeeEditRequest(
    event: CustomEvent<{ employee: Employee }>,
  ): void {
    this.employeeSelectedForEdit = event.detail.employee;
    this.scrollFormIntoView();
  }

  private handleFormCleared(): void {
    this.employeeSelectedForEdit = null;
  }

  private handleAddEmployeeRequest(): void {
    this.employeeSelectedForEdit = null;
    this.scrollFormIntoView();
  }

  private refreshEmployeeList(): void {
    this.employeeList = employeeService.getAll();
  }

  private handleToastClose(): void {
    this.toastMessage = '';
    window.clearTimeout(this.toastTimeoutIdentifier);
  }

  private scrollFormIntoView(): void {
    const formElement = this.renderRoot.querySelector('employee-form');
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    window.clearTimeout(this.toastTimeoutIdentifier);
    this.toastTimeoutIdentifier = window.setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  private emitDomainEvent(eventName: string, employee: Employee): void {
    this.lastEmittedEventName = eventName;
    this.dispatchEvent(
      new CustomEvent<{ employee: Employee }>(eventName, {
        detail: { employee },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-app': EmployeeApp;
  }
}
