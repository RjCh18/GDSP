import { describe, it, expect, beforeEach } from 'vitest';
import { EmployeeService } from '../src/services/employee-service';
import type { Employee } from '../src/types/employee';

describe('EmployeeService (CRUD Operations)', () => {
  let service: EmployeeService;

  beforeEach(() => {
    service = new EmployeeService();
  });

  it('should initialize with an empty list by default', () => {
    expect(service.getAll()).toEqual([]);
  });

  it('should initialize with provided initial employees', () => {
    const initialList: Employee[] = [
      {
        identifier: 1,
        fullName: 'Alice Johnson',
        department: 'Engineering',
        designation: 'Staff Engineer',
        emailAddress: 'alice@example.com',
      },
    ];
    const customService = new EmployeeService(initialList);
    expect(customService.getAll()).toEqual(initialList);
  });

  describe('Create (add / save)', () => {
    it('should add a new employee with auto-incremented identifier starting at 1', () => {
      const added = service.add({
        fullName: 'Bob Smith',
        department: 'Product',
        designation: 'Product Manager',
        emailAddress: 'bob@example.com',
      });

      expect(added.identifier).toBe(1);
      expect(added.fullName).toBe('Bob Smith');
      expect(added.department).toBe('Product');
      expect(added.designation).toBe('Product Manager');
      expect(added.emailAddress).toBe('bob@example.com');
      expect(service.getAll()).toHaveLength(1);
    });

    it('should auto-increment identifier based on highest existing identifier', () => {
      service.add({
        fullName: 'First Employee',
        department: 'HR',
        designation: 'Recruiter',
        emailAddress: 'first@example.com',
      });
      const second = service.add({
        fullName: 'Second Employee',
        department: 'Finance',
        designation: 'Analyst',
        emailAddress: 'second@example.com',
      });

      expect(second.identifier).toBe(2);
      expect(service.getAll()).toHaveLength(2);
    });

    it('should default designation to empty string if not provided', () => {
      const added = service.add({
        fullName: 'Charlie Davis',
        department: 'Operations',
        emailAddress: 'charlie@example.com',
      });

      expect(added.designation).toBe('');
    });

    it('should save a new employee when identifier is 0', () => {
      const result = service.save({
        identifier: 0,
        fullName: 'Diana Prince',
        department: 'Design',
        designation: 'Lead Designer',
        emailAddress: 'diana@example.com',
      });

      expect(result.isNew).toBe(true);
      expect(result.employee.identifier).toBe(0);
      expect(result.employee.fullName).toBe('Diana Prince');
      expect(service.getAll()).toHaveLength(1);
    });
  });

  describe('Read (getAll / getById)', () => {
    it('should retrieve an employee by identifier', () => {
      const created = service.add({
        fullName: 'Eva Green',
        department: 'Marketing',
        designation: 'Specialist',
        emailAddress: 'eva@example.com',
      });

      const found = service.getById(created.identifier);
      expect(found).toBeDefined();
      expect(found?.fullName).toBe('Eva Green');
    });

    it('should return undefined for non-existent identifier', () => {
      expect(service.getById(999)).toBeUndefined();
    });

    it('should return an immutable copy of the employees array', () => {
      service.add({
        fullName: 'Frank Wright',
        department: 'Architecture',
        designation: 'Architect',
        emailAddress: 'frank@example.com',
      });

      const list = service.getAll();
      list.pop();
      expect(service.getAll()).toHaveLength(1);
    });
  });

  describe('Update (update / save)', () => {
    it('should update an existing employee', () => {
      const created = service.add({
        fullName: 'Grace Hopper',
        department: 'Engineering',
        designation: 'Senior Developer',
        emailAddress: 'grace@example.com',
      });

      const updated = service.update({
        identifier: created.identifier,
        fullName: 'Grace Hopper (Admiral)',
        department: 'R&D',
        designation: 'Lead Architect',
        emailAddress: 'grace.hopper@example.com',
      });

      expect(updated).not.toBeNull();
      expect(updated?.fullName).toBe('Grace Hopper (Admiral)');
      expect(updated?.department).toBe('R&D');
      expect(updated?.emailAddress).toBe('grace.hopper@example.com');

      const saved = service.getById(created.identifier);
      expect(saved?.fullName).toBe('Grace Hopper (Admiral)');
    });

    it('should return null when updating a non-existent employee', () => {
      const result = service.update({
        identifier: 999,
        fullName: 'Ghost',
        department: 'None',
        designation: 'None',
        emailAddress: 'ghost@example.com',
      });

      expect(result).toBeNull();
    });

    it('should save an existing employee when identifier is greater than 0', () => {
      const created = service.add({
        fullName: 'Henry Ford',
        department: 'Manufacturing',
        designation: 'Director',
        emailAddress: 'henry@example.com',
      });

      const result = service.save({
        identifier: created.identifier,
        fullName: 'Henry Ford II',
        department: 'Manufacturing',
        designation: 'Executive Director',
        emailAddress: 'henry2@example.com',
      });

      expect(result.isNew).toBe(false);
      expect(result.employee.fullName).toBe('Henry Ford II');
    });
  });

  describe('Delete (delete)', () => {
    it('should remove an employee by identifier and return the deleted employee', () => {
      const created = service.add({
        fullName: 'Iris West',
        department: 'Journalism',
        designation: 'Reporter',
        emailAddress: 'iris@example.com',
      });

      const deleted = service.delete(created.identifier);
      expect(deleted).not.toBeNull();
      expect(deleted?.fullName).toBe('Iris West');
      expect(service.getAll()).toHaveLength(0);
      expect(service.getById(created.identifier)).toBeUndefined();
    });

    it('should return null when deleting a non-existent employee', () => {
      const result = service.delete(999);
      expect(result).toBeNull();
    });
  });

  describe('Subscriptions and Reactive Notifications', () => {
    it('should immediately call subscriber with current employees upon subscription', () => {
      service.add({
        fullName: 'Subscriber Test',
        department: 'Testing',
        designation: 'QA',
        emailAddress: 'sub@test.com',
      });

      let receivedList: Employee[] = [];
      const unsubscribe = service.subscribe((list) => {
        receivedList = list;
      });

      expect(receivedList).toHaveLength(1);
      expect(receivedList[0].fullName).toBe('Subscriber Test');
      unsubscribe();
    });

    it('should notify subscribers when employees are added, updated, or deleted', () => {
      let notificationCount = 0;
      let lastList: Employee[] = [];
      const unsubscribe = service.subscribe((list) => {
        notificationCount++;
        lastList = list;
      });

      expect(notificationCount).toBe(1);

      const added = service.add({
        fullName: 'Notify Me',
        department: 'DevOps',
        designation: 'Engineer',
        emailAddress: 'notify@test.com',
      });
      expect(notificationCount).toBe(2);
      expect(lastList).toHaveLength(1);

      service.update({ ...added, designation: 'Senior Engineer' });
      expect(notificationCount).toBe(3);
      expect(lastList[0].designation).toBe('Senior Engineer');

      service.delete(added.identifier);
      expect(notificationCount).toBe(4);
      expect(lastList).toHaveLength(0);

      unsubscribe();

      service.add({
        fullName: 'After Unsubscribe',
        department: 'None',
        designation: 'None',
        emailAddress: 'after@test.com',
      });
      expect(notificationCount).toBe(4);
    });
  });

  describe('Identifier 0 Support', () => {
    it('should support employee with identifier 0 as a valid existing employee', () => {
      const emp0 = service.add({
        identifier: 0,
        fullName: 'Founder Zero',
        department: 'Executive',
        designation: 'Founder',
        emailAddress: 'founder@example.com',
      });

      expect(emp0.identifier).toBe(0);
      expect(service.getById(0)).toEqual(emp0);

      // Next added employee should auto-increment to 1
      const emp1 = service.add({
        fullName: 'Next Person',
        department: 'Eng',
        designation: 'Dev',
        emailAddress: 'next@example.com',
      });
      expect(emp1.identifier).toBe(1);

      // Update employee with identifier 0
      const updatedEmp0 = service.update({
        identifier: 0,
        fullName: 'Founder Zero (Updated)',
        department: 'Executive',
        designation: 'Chairman',
        emailAddress: 'chairman@example.com',
      });
      expect(updatedEmp0?.fullName).toBe('Founder Zero (Updated)');
      expect(service.getById(0)?.fullName).toBe('Founder Zero (Updated)');

      // Save existing employee with identifier 0
      const saveResult = service.save(
        {
          identifier: 0,
          fullName: 'Founder Zero (Saved)',
          department: 'Executive',
          designation: 'Chairman',
          emailAddress: 'chairman@example.com',
        },
        true,
      );
      expect(saveResult.isNew).toBe(false);
      expect(saveResult.employee.fullName).toBe('Founder Zero (Saved)');

      // Delete employee with identifier 0
      const deleted = service.delete(0);
      expect(deleted?.identifier).toBe(0);
      expect(service.getById(0)).toBeUndefined();
      expect(service.getAll()).toHaveLength(1);
    });
  });
});
