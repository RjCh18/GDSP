import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/app-shell';
import type { AppShell } from '../src/app-shell';
import { employeeService } from '../src/widgets/employee/employee-service';
import type { Employee } from '../src/widgets/employee/employee.types';
import type { EmployeeWidget } from '../src/widgets/employee/employee-widget';

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
    const employeeWidget = shellElement.shadowRoot?.querySelector<EmployeeWidget>('employee-widget');
    const header = shellElement.shadowRoot?.querySelector('header.application-header');
    const eventsStrip = shellElement.shadowRoot?.querySelector('footer.events-strip');
    return { employeeWidget, header, eventsStrip };
  };

  it('should render application header, employee widget, and events strip', () => {
    const { employeeWidget, header, eventsStrip } = getSubcomponents();

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('Employee Management');
    expect(employeeWidget).not.toBeNull();
    expect(eventsStrip).not.toBeNull();
  });

  describe('Shell Event Coordination', () => {
    it('should update last event when employee-added bubbles up from a widget', async () => {
      const { employeeWidget } = getSubcomponents();

      const newEmployee: Employee = {
        identifier: 1,
        fullName: 'Alexander Fleming',
        department: 'Medicine',
        designation: 'Researcher',
        emailAddress: 'alex@lab.org',
      };

      employeeWidget?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-added', {
          detail: { employee: newEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      const lastEvent = shellElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-added');
    });

    it('should update last event when employee-updated bubbles up from a widget', async () => {
      const { employeeWidget } = getSubcomponents();

      const updatedEmployee: Employee = {
        identifier: 1,
        fullName: 'Marie Curie',
        department: 'Physics',
        designation: 'Nobel Laureate',
        emailAddress: 'marie@curie.org',
      };

      employeeWidget?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-updated', {
          detail: { employee: updatedEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      const lastEvent = shellElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-updated');
    });

    it('should update last event when employee-deleted bubbles up from a widget', async () => {
      const { employeeWidget } = getSubcomponents();

      const deletedEmployee: Employee = {
        identifier: 1,
        fullName: 'Nikola Tesla',
        department: 'Invention',
        designation: 'Engineer',
        emailAddress: 'nikola@tesla.org',
      };

      employeeWidget?.dispatchEvent(
        new CustomEvent<{ employee: Employee }>('employee-deleted', {
          detail: { employee: deletedEmployee },
          bubbles: true,
          composed: true,
        }),
      );
      await shellElement.updateComplete;

      const lastEvent = shellElement.shadowRoot?.querySelector('.last-event');
      expect(lastEvent?.textContent).toContain('employee-deleted');
    });
  });
});
