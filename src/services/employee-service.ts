import type { Employee } from '../types/employee';

export type EmployeeListener = (employees: Employee[]) => void;

export class EmployeeService {
  private employees: Employee[] = [];
  private listeners: Set<EmployeeListener> = new Set();

  constructor(initialEmployees: Employee[] = []) {
    this.employees = [...initialEmployees];
  }

  subscribe(listener: EmployeeListener): () => void {
    this.listeners.add(listener);
    listener(this.getAll());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const current = this.getAll();
    for (const listener of this.listeners) {
      listener(current);
    }
  }

  getAll(): Employee[] {
    return [...this.employees];
  }

  getById(identifier: number): Employee | undefined {
    return this.employees.find((employee) => employee.identifier === identifier);
  }

  add(
    draft:
      | Omit<Employee, 'identifier'>
      | (Partial<Employee> & {
          fullName: string;
          department: string;
          emailAddress: string;
        }),
  ): Employee {
    let assignedIdentifier: number;

    if (
      'identifier' in draft &&
      typeof draft.identifier === 'number' &&
      !this.employees.some((e) => e.identifier === draft.identifier)
    ) {
      assignedIdentifier = draft.identifier;
    } else {
      const maxIdentifier = this.employees.reduce(
        (maximum, existing) => Math.max(maximum, existing.identifier),
        0,
      );
      assignedIdentifier = this.employees.length === 0 ? 1 : maxIdentifier + 1;
    }

    const newEmployee: Employee = {
      identifier: assignedIdentifier,
      fullName: draft.fullName,
      department: draft.department,
      designation: draft.designation || '',
      emailAddress: draft.emailAddress,
    };
    this.employees = [...this.employees, newEmployee];
    this.notify();
    return newEmployee;
  }

  update(employee: Employee): Employee | null {
    const targetIndex = this.employees.findIndex(
      (existing) => existing.identifier === employee.identifier,
    );
    if (targetIndex === -1) {
      return null;
    }
    const updatedEmployee: Employee = { ...employee };
    this.employees = this.employees.map((existing) =>
      existing.identifier === employee.identifier ? updatedEmployee : existing,
    );
    this.notify();
    return updatedEmployee;
  }

  delete(identifier: number): Employee | null {
    const target = this.employees.find(
      (existing) => existing.identifier === identifier,
    );
    if (!target) {
      return null;
    }
    this.employees = this.employees.filter(
      (existing) => existing.identifier !== identifier,
    );
    this.notify();
    return target;
  }

  save(
    employee: Employee | Omit<Employee, 'identifier'>,
    isEdit?: boolean,
  ): { employee: Employee; isNew: boolean } {
    const shouldUpdate =
      isEdit !== undefined
        ? isEdit
        : 'identifier' in employee &&
          typeof employee.identifier === 'number' &&
          this.employees.some((e) => e.identifier === employee.identifier);

    if (shouldUpdate && 'identifier' in employee && typeof employee.identifier === 'number') {
      const updated = this.update(employee as Employee);
      return { employee: updated ?? (employee as Employee), isNew: false };
    }

    const created = this.add(employee);
    return { employee: created, isNew: true };
  }

  clear(): void {
    this.employees = [];
    this.notify();
  }
}

export const employeeService = new EmployeeService();
