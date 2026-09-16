import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/widgets/employee/employee-widget';
import type { EmployeeWidget } from '../src/widgets/employee/employee-widget';
import { employeeService } from '../src/widgets/employee/employee-service';
import type { Employee } from '../src/widgets/employee/employee.types';
import type { EmployeeForm } from '../src/widgets/employee/employee-form';
import type { EmployeeTable } from '../src/widgets/employee/employee-table';

describe('EmployeeWidget Component (Form/Table Composition)', () => {
  let widgetElement: EmployeeWidget;

  beforeEach(async () => {
    employeeService.clear();
    widgetElement = document.createElement('employee-widget') as EmployeeWidget;
    document.body.appendChild(widgetElement);
    await widgetElement.updateComplete;
  });

  afterEach(() => {
    widgetElement.remove();
    employeeService.clear();
  });

  const getSubcomponents = () => {
    const form = widgetElement.shadowRoot?.querySelector<EmployeeForm>('employee-form');
    const table = widgetElement.shadowRoot?.querySelector<EmployeeTable>('employee-table');
    return { form, table };
  };

  it('should render both the employee form and the employee table', () => {
    const { form, table } = getSubcomponents();
    expect(form).not.toBeNull();
    expect(table).not.toBeNull();
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
    await widgetElement.updateComplete;

    expect(form?.employeeToEdit).toEqual(targetEmployee);
  });

  it('should reset the form edit state when form-cleared is emitted', async () => {
    const { form } = getSubcomponents();

    const targetEmployee: Employee = {
      identifier: 1,
      fullName: 'Grace Hopper',
      department: 'Engineering',
      designation: 'Admiral',
      emailAddress: 'grace@navy.mil',
    };
    if (form) {
      form.employeeToEdit = targetEmployee;
    }
    await widgetElement.updateComplete;

    form?.dispatchEvent(new CustomEvent('form-cleared', { bubbles: true, composed: true }));
    await widgetElement.updateComplete;

    expect(form?.employeeToEdit).toBeNull();
  });

  it('should reset the form edit state when an add-employee request is received from the table', async () => {
    const { form, table } = getSubcomponents();

    const targetEmployee: Employee = {
      identifier: 1,
      fullName: 'Grace Hopper',
      department: 'Engineering',
      designation: 'Admiral',
      emailAddress: 'grace@navy.mil',
    };
    if (form) {
      form.employeeToEdit = targetEmployee;
    }
    await widgetElement.updateComplete;

    table?.dispatchEvent(new CustomEvent('employee-add-request', { bubbles: true, composed: true }));
    await widgetElement.updateComplete;

    expect(form?.employeeToEdit).toBeNull();
  });

  it('should clear the form edit state when the employee currently being edited is deleted', async () => {
    const { form, table } = getSubcomponents();

    const deletedEmployee: Employee = {
      identifier: 1,
      fullName: 'Nikola Tesla',
      department: 'Invention',
      designation: 'Engineer',
      emailAddress: 'nikola@tesla.org',
    };
    if (form) {
      form.employeeToEdit = deletedEmployee;
    }
    await widgetElement.updateComplete;

    table?.dispatchEvent(
      new CustomEvent<{ employee: Employee }>('employee-deleted', {
        detail: { employee: deletedEmployee },
        bubbles: true,
        composed: true,
      }),
    );
    await widgetElement.updateComplete;

    expect(form?.employeeToEdit).toBeNull();
  });

  it('should leave the form edit state untouched when a different employee is deleted', async () => {
    const { form, table } = getSubcomponents();

    const editedEmployee: Employee = {
      identifier: 1,
      fullName: 'Nikola Tesla',
      department: 'Invention',
      designation: 'Engineer',
      emailAddress: 'nikola@tesla.org',
    };
    const deletedEmployee: Employee = {
      identifier: 2,
      fullName: 'Someone Else',
      department: 'Sales',
      designation: 'Rep',
      emailAddress: 'someone@else.org',
    };
    if (form) {
      form.employeeToEdit = editedEmployee;
    }
    await widgetElement.updateComplete;

    table?.dispatchEvent(
      new CustomEvent<{ employee: Employee }>('employee-deleted', {
        detail: { employee: deletedEmployee },
        bubbles: true,
        composed: true,
      }),
    );
    await widgetElement.updateComplete;

    expect(form?.employeeToEdit).toEqual(editedEmployee);
  });

  it('should let employee-added, employee-updated, and employee-deleted events bubble out to the host', async () => {
    const { form, table } = getSubcomponents();

    const addedSpy: string[] = [];
    widgetElement.addEventListener('employee-added', () => addedSpy.push('employee-added'));
    widgetElement.addEventListener('employee-deleted', () => addedSpy.push('employee-deleted'));

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
    table?.dispatchEvent(
      new CustomEvent<{ employee: Employee }>('employee-deleted', {
        detail: {
          employee: {
            identifier: 2,
            fullName: 'Another Person',
            department: 'Test Dept',
            designation: 'Tester',
            emailAddress: 'another@test.com',
          },
        },
        bubbles: true,
        composed: true,
      }),
    );

    expect(addedSpy).toEqual(['employee-added', 'employee-deleted']);
  });
});
