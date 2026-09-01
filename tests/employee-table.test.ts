import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../src/components/employee-table';
import type { EmployeeTable } from '../src/components/employee-table';
import type { Employee } from '../src/types/employee';
import type { UiInput } from '../src/ui/ui-input';
import type { UiButton } from '../src/ui/ui-button';
import type { UiDialog } from '../src/ui/ui-dialog';

describe('EmployeeTable Component', () => {
  let tableElement: EmployeeTable;

  const sampleEmployees: Employee[] = [
    {
      identifier: 1,
      fullName: 'Alice Johnson',
      department: 'Engineering',
      designation: 'Staff Engineer',
      emailAddress: 'alice@example.com',
    },
    {
      identifier: 2,
      fullName: 'Bob Smith',
      department: 'Marketing',
      designation: 'Growth Lead',
      emailAddress: 'bob@example.com',
    },
    {
      identifier: 3,
      fullName: 'Charlie Davis',
      department: 'Sales',
      designation: 'Account Exec',
      emailAddress: 'charlie@example.com',
    },
    {
      identifier: 4,
      fullName: 'Diana Prince',
      department: 'Design',
      designation: 'UI/UX Designer',
      emailAddress: 'diana@example.com',
    },
    {
      identifier: 5,
      fullName: 'Eva Green',
      department: 'Finance',
      designation: 'CFO',
      emailAddress: 'eva@example.com',
    },
    {
      identifier: 6,
      fullName: 'Frank Wright',
      department: 'Operations',
      designation: 'Director',
      emailAddress: 'frank@example.com',
    },
    {
      identifier: 7,
      fullName: 'Grace Hopper',
      department: 'Engineering',
      designation: 'Fellow',
      emailAddress: 'grace@example.com',
    },
  ];

  beforeEach(async () => {
    tableElement = document.createElement('employee-table') as EmployeeTable;
    document.body.appendChild(tableElement);
    await tableElement.updateComplete;
  });

  afterEach(() => {
    tableElement.remove();
  });

  describe('Empty State', () => {
    it('should render empty state when no employees are present', async () => {
      tableElement.employees = [];
      await tableElement.updateComplete;

      const emptyState = tableElement.shadowRoot?.querySelector('.empty-state');
      expect(emptyState).not.toBeNull();
      expect(emptyState?.textContent).toContain('No employees found');
    });

    it('should dispatch employee-add-request when clicking Add Employee in empty state', async () => {
      tableElement.employees = [];
      await tableElement.updateComplete;

      const addSpy = vi.fn();
      tableElement.addEventListener('employee-add-request', addSpy);

      const addBtn = tableElement.shadowRoot?.querySelector<UiButton>('.empty-state ui-button');
      addBtn?.click();

      expect(addSpy).toHaveBeenCalled();
    });
  });

  describe('Employee Rows Rendering & Avatar Initials', () => {
    it('should render header row and first page (5 items) of employees', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      const headerRow = tableElement.shadowRoot?.querySelector('.employee-header-row');
      expect(headerRow).not.toBeNull();

      const rows = tableElement.shadowRoot?.querySelectorAll('.employee-row');
      expect(rows?.length).toBe(5);

      const firstRow = rows?.[0];
      expect(firstRow?.textContent).toContain('Alice Johnson');
      expect(firstRow?.textContent).toContain('Engineering');
      expect(firstRow?.textContent).toContain('Staff Engineer');
      expect(firstRow?.textContent).toContain('alice@example.com');
    });

    it('should compute avatar initials correctly', async () => {
      tableElement.employees = [
        {
          identifier: 1,
          fullName: 'John Doe',
          department: 'Eng',
          designation: 'Dev',
          emailAddress: 'j@d.com',
        },
        {
          identifier: 2,
          fullName: 'Cher',
          department: 'Music',
          designation: 'Singer',
          emailAddress: 'cher@d.com',
        },
        {
          identifier: 3,
          fullName: 'Mary Jane Watson',
          department: 'Press',
          designation: 'Model',
          emailAddress: 'mj@d.com',
        },
      ];
      await tableElement.updateComplete;

      const avatars = tableElement.shadowRoot?.querySelectorAll('.employee-avatar');
      expect(avatars?.[0]?.textContent?.trim()).toBe('JD');
      expect(avatars?.[1]?.textContent?.trim()).toBe('C');
      expect(avatars?.[2]?.textContent?.trim()).toBe('MJ');
    });
  });

  describe('Search & Filtering', () => {
    it('should filter employees by name, department, designation, or email', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      const searchInput = tableElement.shadowRoot?.querySelector<UiInput>('.search-field');
      expect(searchInput).not.toBeNull();

      // Search by department
      searchInput?.dispatchEvent(
        new CustomEvent('value-changed', {
          detail: { name: 'searchTerm', value: 'Engineering' },
          bubbles: true,
          composed: true,
        }),
      );
      await tableElement.updateComplete;

      const rows = tableElement.shadowRoot?.querySelectorAll('.employee-row');
      expect(rows?.length).toBe(2);
      expect(rows?.[0]?.textContent).toContain('Alice Johnson');
      expect(rows?.[1]?.textContent).toContain('Grace Hopper');
    });

    it('should show "No employees match your search" when no query matches', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      const searchInput = tableElement.shadowRoot?.querySelector<UiInput>('.search-field');
      searchInput?.dispatchEvent(
        new CustomEvent('value-changed', {
          detail: { name: 'searchTerm', value: 'NonExistentXYZ' },
          bubbles: true,
          composed: true,
        }),
      );
      await tableElement.updateComplete;

      const emptyState = tableElement.shadowRoot?.querySelector('.empty-state');
      expect(emptyState?.textContent).toContain('No employees match your search');
    });
  });

  describe('Pagination', () => {
    it('should correctly paginate 7 items into 2 pages', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      const footer = tableElement.shadowRoot?.querySelector('.table-footer');
      expect(footer?.textContent?.replace(/\s+/g, ' ')).toContain('Showing 1 to 5 of 7 employees');

      const pageButtons = tableElement.shadowRoot?.querySelectorAll<UiButton>('.pagination-controls ui-button');
      // Prev, Page 1, Page 2, Next
      expect(pageButtons?.length).toBe(4);

      // Page 2 button is at index 2
      const page2Btn = pageButtons?.[2];
      page2Btn?.click();
      await tableElement.updateComplete;

      expect(footer?.textContent?.replace(/\s+/g, ' ')).toContain('Showing 6 to 7 of 7 employees');
      const rows = tableElement.shadowRoot?.querySelectorAll('.employee-row');
      expect(rows?.length).toBe(2);
      expect(rows?.[0]?.textContent).toContain('Frank Wright');
      expect(rows?.[1]?.textContent).toContain('Grace Hopper');
    });

    it('should disable previous button on page 1 and next button on last page', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      const pageButtons = tableElement.shadowRoot?.querySelectorAll<UiButton>('.pagination-controls ui-button');
      const prevBtn = pageButtons?.[0];
      const nextBtn = pageButtons?.[3];

      expect(prevBtn?.disabled).toBe(true);
      expect(nextBtn?.disabled).toBe(false);

      // Click next
      nextBtn?.click();
      await tableElement.updateComplete;

      expect(prevBtn?.disabled).toBe(false);
      expect(nextBtn?.disabled).toBe(true);
    });
  });

  describe('Edit & Delete Operations with Encapsulated Dialog', () => {
    it('should dispatch employee-edit-request when clicking Edit button', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      let editDetail: { employee: Employee } | undefined;
      tableElement.addEventListener('employee-edit-request', (event: Event) => {
        editDetail = (event as CustomEvent<{ employee: Employee }>).detail;
      });

      const firstRow = tableElement.shadowRoot?.querySelector('.employee-row');
      const editBtn = firstRow?.querySelectorAll<UiButton>('.action-buttons ui-button')?.[0];
      editBtn?.click();

      expect(editDetail?.employee.identifier).toBe(1);
      expect(editDetail?.employee.fullName).toBe('Alice Johnson');
    });

    it('should open delete confirmation dialog on Delete button click and close on Cancel', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      const deleteSpy = vi.fn();
      tableElement.addEventListener('employee-delete', deleteSpy);

      const dialog = tableElement.shadowRoot?.querySelector<UiDialog>('ui-dialog');
      expect(dialog?.open).toBe(false);

      // Click delete on first row
      const firstRow = tableElement.shadowRoot?.querySelector('.employee-row');
      const deleteBtn = firstRow?.querySelectorAll<UiButton>('.action-buttons ui-button')?.[1];
      deleteBtn?.click();
      await tableElement.updateComplete;

      expect(dialog?.open).toBe(true);

      // Cancel dialog
      dialog?.dispatchEvent(new CustomEvent('dialog-cancel', { bubbles: true, composed: true }));
      await tableElement.updateComplete;

      expect(dialog?.open).toBe(false);
      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('should dispatch employee-delete with confirmed employee when confirming dialog', async () => {
      tableElement.employees = sampleEmployees;
      await tableElement.updateComplete;

      let deletedDetail: { employee: Employee } | undefined;
      tableElement.addEventListener('employee-delete', (event: Event) => {
        deletedDetail = (event as CustomEvent<{ employee: Employee }>).detail;
      });

      const dialog = tableElement.shadowRoot?.querySelector<UiDialog>('ui-dialog');

      // Click delete on first row
      const firstRow = tableElement.shadowRoot?.querySelector('.employee-row');
      const deleteBtn = firstRow?.querySelectorAll<UiButton>('.action-buttons ui-button')?.[1];
      deleteBtn?.click();
      await tableElement.updateComplete;

      expect(dialog?.open).toBe(true);

      // Confirm dialog
      dialog?.dispatchEvent(new CustomEvent('dialog-confirm', { bubbles: true, composed: true }));
      await tableElement.updateComplete;

      expect(dialog?.open).toBe(false);
      expect(deletedDetail?.employee.identifier).toBe(1);
      expect(deletedDetail?.employee.fullName).toBe('Alice Johnson');
    });
  });
});
