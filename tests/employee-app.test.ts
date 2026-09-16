import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/employee-app';
import type { EmployeeApp } from '../src/employee-app';
import { employeeService } from '../src/widgets/employee/employee-service';
import type { EmployeeWidget } from '../src/widgets/employee/employee-widget';
import type { EmployeeForm } from '../src/widgets/employee/employee-form';
import type { EmployeeTable } from '../src/widgets/employee/employee-table';
import type { UiButton } from '../src/ui/ui-button';
import type { UiInput } from '../src/ui/ui-input';
import type { UiToast } from '../src/ui/ui-toast';

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
    const employeeWidget = appElement.shadowRoot?.querySelector<EmployeeWidget>('employee-widget');
    const header = appElement.shadowRoot?.querySelector('header.application-header');
    const eventsStrip = appElement.shadowRoot?.querySelector('footer.events-strip');
    const form = employeeWidget?.shadowRoot?.querySelector<EmployeeForm>('employee-form');
    const table = employeeWidget?.shadowRoot?.querySelector<EmployeeTable>('employee-table');
    return { employeeWidget, header, eventsStrip, form, table };
  };

  it('should render application header, employee widget (with form and table), and events strip', () => {
    const { employeeWidget, header, eventsStrip, form, table } = getSubcomponents();

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('Employee Management');
    expect(employeeWidget).not.toBeNull();
    expect(form).not.toBeNull();
    expect(table).not.toBeNull();
    expect(eventsStrip).not.toBeNull();
  });

  describe('End-to-End Widget Coordination', () => {
    it('should add an employee through the form, show a toast on the form, and update the events strip', async () => {
      const { form, table } = getSubcomponents();

      const nameInput = form?.shadowRoot?.querySelectorAll<UiInput>('ui-input')[0];
      const departmentInput = form?.shadowRoot?.querySelectorAll<UiInput>('ui-input')[1];
      const emailInput = form?.shadowRoot?.querySelectorAll<UiInput>('ui-input')[3];
      const saveButton = form?.shadowRoot?.querySelectorAll<UiButton>('ui-button')[0];

      const setValue = async (input: UiInput | undefined, value: string) => {
        if (!input) {
          return;
        }
        input.value = value;
        input.dispatchEvent(
          new CustomEvent('value-changed', {
            detail: { name: input.name, value },
            bubbles: true,
            composed: true,
          }),
        );
        await form?.updateComplete;
      };

      await setValue(nameInput, 'Alexander Fleming');
      await setValue(departmentInput, 'Medicine');
      await setValue(emailInput, 'alex@lab.org');

      saveButton?.click();
      await appElement.updateComplete;

      const toast = form?.shadowRoot?.querySelector<UiToast>('ui-toast');
      expect(toast?.message).toBe('Employee added successfully!');

      const lastEvent = appElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-added');

      const rows = table?.shadowRoot?.querySelectorAll('.employee-row');
      expect(rows?.[0]?.textContent).toContain('Alexander Fleming');
    });

    it('should route edit request from table to form component and reset on clear', async () => {
      const created = employeeService.add({
        fullName: 'Ada Lovelace',
        department: 'Computing',
        designation: 'Pioneer',
        emailAddress: 'ada@computing.org',
      });

      const { form, table } = getSubcomponents();
      await table?.updateComplete;

      const editBtn = table?.shadowRoot
        ?.querySelector('.employee-row')
        ?.querySelectorAll<UiButton>('.action-buttons ui-button')[0];
      editBtn?.click();
      await appElement.updateComplete;

      expect(form?.employeeToEdit).toEqual(created);

      const clearButton = form?.shadowRoot?.querySelectorAll<UiButton>('ui-button')[1];
      clearButton?.click();
      await appElement.updateComplete;

      expect(form?.employeeToEdit).toBeNull();
    });

    it('should show a toast on the table and clear the form edit state when the edited employee is deleted', async () => {
      const created = employeeService.add({
        fullName: 'Nikola Tesla',
        department: 'Invention',
        designation: 'Engineer',
        emailAddress: 'nikola@tesla.org',
      });

      const { form, table } = getSubcomponents();
      await table?.updateComplete;
      if (form) {
        form.employeeToEdit = created;
      }
      await appElement.updateComplete;

      const deleteBtn = table?.shadowRoot
        ?.querySelector('.employee-row')
        ?.querySelectorAll<UiButton>('.action-buttons ui-button')[1];
      deleteBtn?.click();
      await appElement.updateComplete;

      const dialog = table?.shadowRoot?.querySelector('ui-dialog');
      dialog?.dispatchEvent(new CustomEvent('dialog-confirm', { bubbles: true, composed: true }));
      await appElement.updateComplete;

      const toast = table?.shadowRoot?.querySelector<UiToast>('ui-toast');
      expect(toast?.message).toBe('Employee deleted successfully!');

      expect(form?.employeeToEdit).toBeNull();

      const lastEvent = appElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-deleted');
    });
  });
});
