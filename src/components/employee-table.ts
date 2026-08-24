import { LitElement, css, html } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Employee } from '../types/employee';
import '../ui/ui-input';
import '../ui/ui-button';

@customElement('employee-table')
export class EmployeeTable extends LitElement {
  @property({ attribute: false })
  employees: Employee[] = [];

  @state()
  private searchTerm = '';

  @state()
  private currentPageNumber = 1;

  private readonly pageSize = 5;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .table-toolbar {
      display: flex;
      justify-content: flex-end;
    }

    .search-field {
      flex: 0 1 260px;
    }

    .table-scroll {
      overflow-x: auto;
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 8px;
    }

    .table-grid {
      display: flex;
      flex-direction: column;
      min-width: 640px;
    }

    .employee-row,
    .employee-header-row {
      display: grid;
      grid-template-columns: 2.2fr 1.5fr 1.5fr 2.2fr 1.2fr;
      gap: 16px;
      align-items: center;
      padding: 12px 16px;
    }

    .employee-header-row {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--color-text-secondary, #64748b);
      background-color: var(--color-background, #f1f5f9);
      border-bottom: 1px solid var(--color-border, #e2e8f0);
    }

    .employee-row {
      background-color: var(--color-surface, #ffffff);
    }

    .employee-row + .employee-row {
      border-top: 1px solid var(--color-border, #e2e8f0);
    }

    .cell-value {
      color: var(--color-text-primary, #111111);
      overflow-wrap: anywhere;
    }

    .employee-identity {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .employee-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--color-primary, #2563eb);
      color: var(--color-primary-contrast, #ffffff);
      font-size: 0.72rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 40px 16px;
      text-align: center;
      border: 1px dashed var(--color-border, #e2e8f0);
      border-radius: 8px;
    }

    .empty-state-icon {
      font-size: 2.4rem;
    }

    .empty-state-title {
      margin: 0;
      font-size: 1.05rem;
      color: var(--color-text-primary, #111111);
    }

    .empty-state-description {
      margin: 0 0 8px;
      color: var(--color-text-secondary, #64748b);
    }

    .table-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      color: var(--color-text-secondary, #64748b);
      font-size: 0.9rem;
    }

    .pagination-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
  `;

  render(): TemplateResult {
    const filteredEmployees = this.computeFilteredEmployees();
    return html`
      ${this.renderTableToolbar()}
      ${this.renderTableBody(filteredEmployees)}
    `;
  }

  private renderTableToolbar(): TemplateResult {
    return html`
      <div class="table-toolbar">
        <ui-input
          class="search-field"
          name="searchTerm"
          placeholder="Search employees..."
          .value=${this.searchTerm}
          @value-changed=${this.handleSearchValueChanged}
        >
          ${this.renderSearchIcon()}
        </ui-input>
      </div>
    `;
  }

  private renderTableBody(filteredEmployees: Employee[]): TemplateResult {
    if (this.employees.length === 0) {
      return this.renderEmptyState();
    }
    if (filteredEmployees.length === 0) {
      return this.renderNoSearchMatches();
    }
    const totalPages = Math.max(
      1,
      Math.ceil(filteredEmployees.length / this.pageSize),
    );
    const activePageNumber = Math.min(this.currentPageNumber, totalPages);
    const startIndex = (activePageNumber - 1) * this.pageSize;
    const visibleEmployees = filteredEmployees.slice(
      startIndex,
      startIndex + this.pageSize,
    );
    return html`
      <div class="table-scroll">
        <div class="table-grid">
          ${this.renderHeaderRow()}
          ${visibleEmployees.map((employee) => this.renderEmployeeRow(employee))}
        </div>
      </div>
      ${this.renderTableFooter(
        filteredEmployees.length,
        startIndex,
        visibleEmployees.length,
        totalPages,
        activePageNumber,
      )}
    `;
  }

  private renderHeaderRow(): TemplateResult {
    return html`
      <div class="employee-header-row">
        <span>Name</span>
        <span>Department</span>
        <span>Designation</span>
        <span>Email</span>
        <span>Actions</span>
      </div>
    `;
  }

  private renderEmployeeRow(employee: Employee): TemplateResult {
    return html`
      <div class="employee-row">
        <span class="cell-value employee-identity">
          <span class="employee-avatar">
            ${this.computeInitials(employee.fullName)}
          </span>
          ${employee.fullName}
        </span>
        <span class="cell-value">${employee.department}</span>
        <span class="cell-value">${employee.designation}</span>
        <span class="cell-value">${employee.emailAddress}</span>
        <span class="action-buttons">
          <ui-button
            variant="outline-primary"
            small
            icon-only
            aria-label="Edit employee"
            @click=${() => this.handleEditClick(employee)}
          >
            ${this.renderPencilIcon()}
          </ui-button>
          <ui-button
            variant="outline-danger"
            small
            icon-only
            aria-label="Delete employee"
            @click=${() => this.handleDeleteClick(employee)}
          >
            ${this.renderTrashIcon()}
          </ui-button>
        </span>
      </div>
    `;
  }

  private renderEmptyState(): TemplateResult {
    return html`
      <div class="empty-state">
        <span class="empty-state-icon">📁</span>
        <h3 class="empty-state-title">No employees found</h3>
        <p class="empty-state-description">
          Add your first employee to get started.
        </p>
        <ui-button variant="primary" @click=${this.handleAddEmployeeClick}>
          + Add Employee
        </ui-button>
      </div>
    `;
  }

  private renderNoSearchMatches(): TemplateResult {
    return html`
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <h3 class="empty-state-title">No employees match your search</h3>
        <p class="empty-state-description">
          Try a different search term.
        </p>
      </div>
    `;
  }

  private renderTableFooter(
    totalCount: number,
    startIndex: number,
    visibleCount: number,
    totalPages: number,
    activePageNumber: number,
  ): TemplateResult {
    return html`
      <div class="table-footer">
        <span>
          Showing ${startIndex + 1} to ${startIndex + visibleCount}
          of ${totalCount} employees
        </span>
        <span class="pagination-controls">
          <ui-button
            variant="secondary"
            small
            pill
            .disabled=${activePageNumber === 1}
            @click=${() => this.handlePageChange(activePageNumber - 1)}
          >
            ‹
          </ui-button>
          ${Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => html`
              <ui-button
                variant=${pageNumber === activePageNumber
                  ? 'primary'
                  : 'secondary'}
                small
                pill
                @click=${() => this.handlePageChange(pageNumber)}
              >
                ${pageNumber}
              </ui-button>
            `,
          )}
          <ui-button
            variant="secondary"
            small
            pill
            .disabled=${activePageNumber === totalPages}
            @click=${() => this.handlePageChange(activePageNumber + 1)}
          >
            ›
          </ui-button>
        </span>
      </div>
    `;
  }

  private renderSearchIcon(): TemplateResult {
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
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    `;
  }

  private renderPencilIcon(): TemplateResult {
    return html`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    `;
  }

  private renderTrashIcon(): TemplateResult {
    return html`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="m19 6-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
      </svg>
    `;
  }

  private computeFilteredEmployees(): Employee[] {
    const normalizedSearchTerm = this.searchTerm.trim().toLowerCase();
    if (normalizedSearchTerm === '') {
      return this.employees;
    }
    return this.employees.filter((employee) => {
      return (
        employee.fullName.toLowerCase().includes(normalizedSearchTerm) ||
        employee.department.toLowerCase().includes(normalizedSearchTerm) ||
        employee.designation.toLowerCase().includes(normalizedSearchTerm) ||
        employee.emailAddress.toLowerCase().includes(normalizedSearchTerm)
      );
    });
  }

  private computeInitials(fullName: string): string {
    return fullName
      .split(' ')
      .filter((namePart) => namePart !== '')
      .slice(0, 2)
      .map((namePart) => namePart[0].toUpperCase())
      .join('');
  }

  private handleSearchValueChanged(
    event: CustomEvent<{ name: string; value: string }>,
  ): void {
    this.searchTerm = event.detail.value;
    this.currentPageNumber = 1;
  }

  private handlePageChange(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
  }

  private handleEditClick(employee: Employee): void {
    this.dispatchEvent(
      new CustomEvent<{ employee: Employee }>('employee-edit-request', {
        detail: { employee },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleDeleteClick(employee: Employee): void {
    this.dispatchEvent(
      new CustomEvent<{ employee: Employee }>('employee-delete-request', {
        detail: { employee },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleAddEmployeeClick(): void {
    this.dispatchEvent(
      new CustomEvent('employee-add-request', { bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-table': EmployeeTable;
  }
}
