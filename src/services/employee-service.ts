import type { Employee } from '../types/employee';

export class EmployeeService {
  private employees: Employee[] = [];

  constructor(initialEmployees: Employee[] = []) {
    this.employees = [...initialEmployees];
  }

  getAll(): Employee[] {
    return [...this.employees];
  }

  getById(identifier: number): Employee | undefined {
    return this.employees.find((employee) => employee.identifier === identifier);
  }

  add(draft: Omit<Employee, 'identifier'> | (Partial<Employee> & { fullName: string; department: string; emailAddress: string })): Employee {
    const nextIdentifier =
      this.employees.reduce(
        (maximum, existing) => Math.max(maximum, existing.identifier),
        0,
      ) + 1;
    const newEmployee: Employee = {
      identifier: nextIdentifier,
      fullName: draft.fullName,
      department: draft.department,
      designation: draft.designation || '',
      emailAddress: draft.emailAddress,
    };
    this.employees = [...this.employees, newEmployee];
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
    return target;
  }

  save(employee: Employee): { employee: Employee; isNew: boolean } {
    if (employee.identifier === 0) {
      const created = this.add(employee);
      return { employee: created, isNew: true };
    }
    const updated = this.update(employee);
    return { employee: updated ?? employee, isNew: false };
  }

  clear(): void {
    this.employees = [];
  }
}

export const employeeService = new EmployeeService();
