import { LitElement, css, html } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import type { Employee } from './employee.types';
import type { EmployeeForm } from './employee-form';
import './employee-form';
import './employee-table';

@customElement('employee-widget')
export class EmployeeWidget extends LitElement {
  @query('employee-form')
  private readonly employeeFormElement!: EmployeeForm;

  static readonly styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      gap: 24px;
    }

    .content-card {
      width: 100%;
      box-sizing: border-box;
      padding: 24px;
      background-color: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 10px;
    }
  `;

  render(): TemplateResult {
    return html`
      ${this.renderFormCard()}
      ${this.renderTableCard()}
    `;
  }

  private renderFormCard(): TemplateResult {
    return html`
      <section class="content-card">
        <employee-form @form-cleared=${this.handleFormCleared}></employee-form>
      </section>
    `;
  }

  private renderTableCard(): TemplateResult {
    return html`
      <section class="content-card">
        <employee-table
          @employee-edit-request=${this.handleEmployeeEditRequest}
          @employee-deleted=${this.handleEmployeeDeleted}
          @employee-add-request=${this.handleAddEmployeeRequest}
        ></employee-table>
      </section>
    `;
  }

  private handleEmployeeDeleted(
    event: CustomEvent<{ employee: Employee }>,
  ): void {
    const isEditingDeletedEmployee =
      this.employeeFormElement.employeeToEdit?.identifier ===
      event.detail.employee.identifier;
    if (isEditingDeletedEmployee) {
      this.employeeFormElement.employeeToEdit = null;
    }
  }

  private handleEmployeeEditRequest(
    event: CustomEvent<{ employee: Employee }>,
  ): void {
    this.employeeFormElement.employeeToEdit = event.detail.employee;
    this.scrollFormIntoView();
  }

  private handleFormCleared(): void {
    this.employeeFormElement.employeeToEdit = null;
  }

  private handleAddEmployeeRequest(): void {
    this.employeeFormElement.employeeToEdit = null;
    this.scrollFormIntoView();
  }

  private scrollFormIntoView(): void {
    this.employeeFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-widget': EmployeeWidget;
  }
}
