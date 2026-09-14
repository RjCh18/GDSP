import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/app-shell';
import type { AppShell } from '../src/app-shell';
import { employeeService } from '../src/services/employee-service';
import type { Employee } from '../src/types/employee';
import type { EmployeeForm } from '../src/components/employee-form';
import type { EmployeeTable } from '../src/components/employee-table';

describe('AppShell Component (Shell Container)', () => {
  let shellElement: AppShell;

  beforeEach(async () => {
    employeeService.clear();
    shellElement = document.createElement('app-shell') as AppShell;
    document.body.appendChild(shellElement);
    await shellElement.updateComplete;
  });

  afterEach(() => {
    shellElement.remove();
    employeeService.clear();
  });

  const getSubcomponents = () => {
    const form = shellElement.shadowRoot?.querySelector<EmployeeForm>('employee-form');
    const table = shellElement.shadowRoot?.querySelector<EmployeeTable>('employee-table');
    const header = shellElement.shadowRoot?.querySelector('header.application-header');
    const eventsStrip = shellElement.shadowRoot?.querySelector('footer.events-strip');
    return { form, table, header, eventsStrip };
  };

  it('should render application header, form container, table container, and events strip', () => {
    const { form, table, header, eventsStrip } = getSubcomponents();

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('Employee Management');
    expect(form).not.toBeNull();
    expect(table).not.toBeNull();
    expect(eventsStrip).not.toBeNull();
  });

  describe('Shell Event Coordination & Notifications', () => {
    it('should display toast and update last event when employee-added event is received', async () => {
      const { form } = getSubcomponents();

      const newEmployee: Employee = {
        identifier: 1,
        fullName: 'Alexander Fleming',
        department: 'Medicine',
        designation: 'Researcher',
        emailAddress: 'alex@lab.org',
      };

      form?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-added', {
          detail: { employee: newEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      const toast = shellElement.shadowRoot?.querySelector('.toast');
      expect(toast).not.toBeNull();
      expect(toast?.textContent).toContain('Employee added successfully!');

      const lastEvent = shellElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-added');
    });

    it('should display toast and update last event when employee-updated event is received', async () => {
      const { form } = getSubcomponents();

      const updatedEmployee: Employee = {
        identifier: 1,
        fullName: 'Marie Curie',
        department: 'Physics',
        designation: 'Nobel Laureate',
        emailAddress: 'marie@curie.org',
      };

      form?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-updated', {
          detail: { employee: updatedEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      const toast = shellElement.shadowRoot?.querySelector('.toast');
      expect(toast?.textContent).toContain('Employee updated successfully!');

      const lastEvent = shellElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-updated');
    });

    it('should display toast and update last event when employee-deleted event is received', async () => {
      const { table } = getSubcomponents();

      const deletedEmployee: Employee = {
        identifier: 1,
        fullName: 'Nikola Tesla',
        department: 'Invention',
        designation: 'Engineer',
        emailAddress: 'nikola@tesla.org',
      };

      table?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-deleted', {
          detail: { employee: deletedEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      const toast = shellElement.shadowRoot?.querySelector('.toast');
      expect(toast?.textContent).toContain('Employee deleted successfully!');

      const lastEvent = shellElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-deleted');
    });

    it('should route edit request from table to form component', async () => {
      const { form, table } = getSubcomponents();

      const targetEmployee: Employee = {
        identifier: 42,
        fullName: 'Ada Lovelace',
        department: 'Computing',
        designation: 'Pioneer',
        emailAddress: 'ada@computing.org',
      };

      table?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-edit-request', {
          detail: { employee: targetEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      expect(form?.employeeToEdit).toEqual(targetEmployee);
    });

    it('should dismiss toast on toast close button click', async () => {
      const { form } = getSubcomponents();

      form?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-added', {
          detail: {
            employee: {
              identifier: 1,
              fullName: 'Test Person',
              department: 'Test Dept',
              designation: 'Tester',
              emailAddress: 'test@test.com',
            },
          },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      let toast = shellElement.shadowRoot?.querySelector('.toast');
      expect(toast).not.toBeNull();

      const closeBtn = toast?.querySelector<HTMLButtonElement>('.toast-close-button');
      closeBtn?.click();
      await shellElement.updateComplete;

      toast = shellElement.shadowRoot?.querySelector('.toast');
      expect(toast).toBeNull();
    });
  });
});
