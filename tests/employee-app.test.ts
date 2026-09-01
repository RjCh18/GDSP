import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../src/employee-app';
import type { EmployeeApp } from '../src/employee-app';
import { employeeService } from '../src/services/employee-service';
import type { Employee } from '../src/types/employee';
import type { EmployeeForm } from '../src/components/employee-form';
import type { EmployeeTable } from '../src/components/employee-table';

describe('EmployeeApp Component (Shell & Integration)', () => {
  let appElement: EmployeeApp;

  beforeEach(async () => {
    employeeService.clear();
    appElement = document.createElement('employee-app') as EmployeeApp;
    document.body.appendChild(appElement);
    await appElement.updateComplete;
  });

  afterEach(() => {
    appElement.remove();
    employeeService.clear();
  });

  const getSubcomponents = () => {
    const form = appElement.shadowRoot?.querySelector<EmployeeForm>('employee-form');
    const table = appElement.shadowRoot?.querySelector<EmployeeTable>('employee-table');
    const header = appElement.shadowRoot?.querySelector('header.application-header');
    const eventsStrip = appElement.shadowRoot?.querySelector('footer.events-strip');
    return { form, table, header, eventsStrip };
  };

  it('should render application header, form, table, and events strip', () => {
    const { form, table, header, eventsStrip } = getSubcomponents();

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('Employee Management');
    expect(form).not.toBeNull();
    expect(table).not.toBeNull();
    expect(eventsStrip).not.toBeNull();
  });

  describe('CRUD Workflow Integration', () => {
    it('should handle Create: save new employee, refresh list, show toast, emit employee-added event', async () => {
      const addedSpy = vi.fn();
      appElement.addEventListener('employee-added', addedSpy);

      const { form, table } = getSubcomponents();
      expect(table?.employees).toEqual([]);

      const newEmployee: Employee = {
        identifier: 0,
        fullName: 'Alexander Fleming',
        department: 'Medicine',
        designation: 'Researcher',
        emailAddress: 'alex@lab.org',
      };

      // Simulate form saving new employee
      form?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-save', {
          detail: { employee: newEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await appElement.updateComplete;

      // Check service & table
      expect(employeeService.getAll()).toHaveLength(1);
      expect(employeeService.getAll()[0].fullName).toBe('Alexander Fleming');
      expect(table?.employees).toHaveLength(1);

      // Check toast
      const toast = appElement.shadowRoot?.querySelector('.toast');
      expect(toast).not.toBeNull();
      expect(toast?.textContent).toContain('Employee added successfully!');

      // Check emitted event
      expect(addedSpy).toHaveBeenCalledTimes(1);
      const emittedDetail = addedSpy.mock.calls[0][0].detail;
      expect(emittedDetail.employee.fullName).toBe('Alexander Fleming');
      expect(emittedDetail.employee.identifier).toBe(1);

      // Check events strip
      const lastEvent = appElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-added');
    });

    it('should handle Update: edit employee, save, refresh list, show toast, emit employee-updated event', async () => {
      const created = employeeService.add({
        fullName: 'Marie Curie',
        department: 'Physics',
        designation: 'Professor',
        emailAddress: 'marie@curie.org',
      });
      // Force app to refresh list
      appElement.connectedCallback();
      await appElement.updateComplete;

      const updatedSpy = vi.fn();
      appElement.addEventListener('employee-updated', updatedSpy);

      const { form, table } = getSubcomponents();

      // Trigger edit request from table
      table?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-edit-request', {
          detail: { employee: created },
          bubbles: true,
          composed: true,
        }),
      );
      await appElement.updateComplete;

      expect(form?.employeeToEdit).toEqual(created);

      // Save updated employee
      const updatedData: Employee = {
        ...created,
        designation: 'Nobel Laureate',
      };
      form?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-save', {
          detail: { employee: updatedData },
          bubbles: true,
          composed: true,
        }),
      );
      await appElement.updateComplete;

      // Verify service & table
      expect(employeeService.getById(created.identifier)?.designation).toBe('Nobel Laureate');
      expect(table?.employees[0].designation).toBe('Nobel Laureate');

      // Check toast
      const toast = appElement.shadowRoot?.querySelector('.toast');
      expect(toast?.textContent).toContain('Employee updated successfully!');

      // Check event
      expect(updatedSpy).toHaveBeenCalledTimes(1);
      expect(updatedSpy.mock.calls[0][0].detail.employee.designation).toBe('Nobel Laureate');

      // Form edit state should be reset to null
      expect(form?.employeeToEdit).toBeNull();
    });

    it('should handle Delete: table delete event removes employee from service, shows toast, emits employee-deleted event', async () => {
      const created = employeeService.add({
        fullName: 'Nikola Tesla',
        department: 'Invention',
        designation: 'Engineer',
        emailAddress: 'nikola@tesla.org',
      });
      appElement.connectedCallback();
      await appElement.updateComplete;

      const deletedSpy = vi.fn();
      appElement.addEventListener('employee-deleted', deletedSpy);

      const { table } = getSubcomponents();

      // Table emits delete event
      table?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-delete', {
          detail: { employee: created },
          bubbles: true,
          composed: true,
        }),
      );
      await appElement.updateComplete;

      // Verify service & table
      expect(employeeService.getAll()).toHaveLength(0);
      expect(table?.employees).toHaveLength(0);

      // Check toast
      const toast = appElement.shadowRoot?.querySelector('.toast');
      expect(toast?.textContent).toContain('Employee deleted successfully!');

      // Check event
      expect(deletedSpy).toHaveBeenCalledTimes(1);
      expect(deletedSpy.mock.calls[0][0].detail.employee.fullName).toBe('Nikola Tesla');
    });

    it('should dismiss toast on close button click', async () => {
      const newEmployee: Employee = {
        identifier: 0,
        fullName: 'Test Person',
        department: 'Test Dept',
        designation: 'Tester',
        emailAddress: 'test@test.com',
      };

      const { form } = getSubcomponents();
      form?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-save', {
          detail: { employee: newEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await appElement.updateComplete;

      let toast = appElement.shadowRoot?.querySelector('.toast');
      expect(toast).not.toBeNull();

      const closeBtn = toast?.querySelector<HTMLButtonElement>('.toast-close-button');
      closeBtn?.click();
      await appElement.updateComplete;

      toast = appElement.shadowRoot?.querySelector('.toast');
      expect(toast).toBeNull();
    });

    it('should reset employeeSelectedForEdit on form-cleared or add employee request', async () => {
      const created = employeeService.add({
        fullName: 'Ada Lovelace',
        department: 'Computing',
        designation: 'Pioneer',
        emailAddress: 'ada@computing.org',
      });
      appElement.connectedCallback();
      await appElement.updateComplete;

      const { form, table } = getSubcomponents();

      // Select for edit
      table?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-edit-request', {
          detail: { employee: created },
          bubbles: true,
          composed: true,
        }),
      );
      await appElement.updateComplete;
      expect(form?.employeeToEdit).toEqual(created);

      // Emit form-cleared
      form?.dispatchEvent(new CustomEvent('form-cleared', { bubbles: true, composed: true }));
      await appElement.updateComplete;
      expect(form?.employeeToEdit).toBeNull();
    });
  });
});
