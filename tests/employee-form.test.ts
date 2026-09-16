import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../src/widgets/employee/employee-form';
import type { EmployeeForm } from '../src/widgets/employee/employee-form';
import type { UiInput } from '../src/ui/ui-input';
import type { UiButton } from '../src/ui/ui-button';
import type { UiToast } from '../src/ui/ui-toast';
import type { Employee } from '../src/widgets/employee/employee.types';

describe('EmployeeForm Component & Validation Logic', () => {
  let formElement: EmployeeForm;

  beforeEach(async () => {
    formElement = document.createElement('employee-form') as EmployeeForm;
    document.body.appendChild(formElement);
    await formElement.updateComplete;
  });

  afterEach(() => {
    formElement.remove();
  });

  const getInputs = () => {
    const inputs = formElement.shadowRoot?.querySelectorAll<UiInput>('ui-input');
    return {
      nameInput: inputs?.[0] as UiInput,
      departmentInput: inputs?.[1] as UiInput,
      designationInput: inputs?.[2] as UiInput,
      emailInput: inputs?.[3] as UiInput,
    };
  };

  const getButtons = () => {
    const buttons = formElement.shadowRoot?.querySelectorAll<UiButton>('ui-button');
    return {
      saveButton: buttons?.[0] as UiButton,
      clearButton: buttons?.[1] as UiButton,
    };
  };

  const setInputValue = async (input: UiInput, value: string) => {
    input.value = value;
    input.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { name: input.name, value },
        bubbles: true,
        composed: true,
      }),
    );
    await formElement.updateComplete;
  };

  describe('Form Rendering', () => {
    it('should render all input fields and action buttons', () => {
      const { nameInput, departmentInput, designationInput, emailInput } = getInputs();
      const { saveButton, clearButton } = getButtons();

      expect(nameInput).toBeDefined();
      expect(departmentInput).toBeDefined();
      expect(designationInput).toBeDefined();
      expect(emailInput).toBeDefined();
      expect(saveButton).toBeDefined();
      expect(clearButton).toBeDefined();
      expect(saveButton.textContent?.trim()).toBe('Save');
      expect(clearButton.textContent?.trim()).toBe('Clear');
    });

    it('should update draft state on input value changes', async () => {
      const { nameInput, departmentInput, designationInput, emailInput } = getInputs();

      await setInputValue(nameInput, 'John Doe');
      await setInputValue(departmentInput, 'Engineering');
      await setInputValue(designationInput, 'Software Engineer');
      await setInputValue(emailInput, 'john@example.com');

      expect(nameInput.value).toBe('John Doe');
      expect(departmentInput.value).toBe('Engineering');
      expect(designationInput.value).toBe('Software Engineer');
      expect(emailInput.value).toBe('john@example.com');
    });
  });

  describe('Validation Logic', () => {
    it('should show error when Name is empty or only whitespace', async () => {
      const { nameInput, departmentInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      await setInputValue(nameInput, '   ');
      await setInputValue(departmentInput, 'Engineering');
      await setInputValue(emailInput, 'test@example.com');

      const saveSpy = vi.fn();
      formElement.addEventListener('employee-save', saveSpy);

      saveButton.click();
      await formElement.updateComplete;

      expect(saveSpy).not.toHaveBeenCalled();
      expect(nameInput.errorMessage).toBe('Full Name is required');
    });

    it('should show error when Department is empty or only whitespace', async () => {
      const { nameInput, departmentInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      await setInputValue(nameInput, 'John Doe');
      await setInputValue(departmentInput, '   ');
      await setInputValue(emailInput, 'test@example.com');

      const saveSpy = vi.fn();
      formElement.addEventListener('employee-save', saveSpy);

      saveButton.click();
      await formElement.updateComplete;

      expect(saveSpy).not.toHaveBeenCalled();
      expect(
        departmentInput.getAttribute('error-message') || departmentInput.errorMessage,
      ).toBe('Department is required');
    });

    it('should show error when Email is empty or only whitespace', async () => {
      const { nameInput, departmentInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      await setInputValue(nameInput, 'John Doe');
      await setInputValue(departmentInput, 'Engineering');
      await setInputValue(emailInput, '   ');

      const saveSpy = vi.fn();
      formElement.addEventListener('employee-save', saveSpy);

      saveButton.click();
      await formElement.updateComplete;

      expect(saveSpy).not.toHaveBeenCalled();
      expect(emailInput.getAttribute('error-message') || emailInput.errorMessage).toBe(
        'Email is required',
      );
    });

    it.each([
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'John Doe <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      'email@example',
      'missingdot@domain',
    ])('should show error "Enter a valid email" for invalid email: %s', async (invalidEmail) => {
      const { nameInput, departmentInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      await setInputValue(nameInput, 'John Doe');
      await setInputValue(departmentInput, 'Engineering');
      await setInputValue(emailInput, invalidEmail);

      const saveSpy = vi.fn();
      formElement.addEventListener('employee-save', saveSpy);

      saveButton.click();
      await formElement.updateComplete;

      expect(saveSpy).not.toHaveBeenCalled();
      expect(emailInput.getAttribute('error-message') || emailInput.errorMessage).toBe(
        'Enter a valid email',
      );
    });

    it('should show errors for multiple invalid fields simultaneously', async () => {
      const { nameInput, departmentInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      const saveSpy = vi.fn();
      formElement.addEventListener('employee-save', saveSpy);

      saveButton.click();
      await formElement.updateComplete;

      expect(saveSpy).not.toHaveBeenCalled();
      expect(nameInput.errorMessage).toBe('Full Name is required');
      expect(departmentInput.errorMessage).toBe('Department is required');
      expect(emailInput.errorMessage).toBe('Email is required');
    });

    it('should pass validation and dispatch employee-save when all fields are valid', async () => {
      const { nameInput, departmentInput, designationInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      await setInputValue(nameInput, '  Jane Doe  ');
      await setInputValue(departmentInput, '  Product  ');
      await setInputValue(designationInput, '  Lead Designer  ');
      await setInputValue(emailInput, '  jane@example.com  ');

      let emittedEmployee: Employee | undefined;
      formElement.addEventListener('employee-save', (event: Event) => {
        emittedEmployee = (event as CustomEvent<{ employee: Employee }>).detail.employee;
      });

      saveButton.click();
      await formElement.updateComplete;

      expect(emittedEmployee).toBeDefined();
      expect(typeof emittedEmployee?.identifier).toBe('number');
      expect(emittedEmployee?.fullName).toBe('Jane Doe');
      expect(emittedEmployee?.department).toBe('Product');
      expect(emittedEmployee?.designation).toBe('Lead Designer');
      expect(emittedEmployee?.emailAddress).toBe('jane@example.com');
    });
  });

  describe('Edit Mode Pre-population', () => {
    it('should populate fields and change button label when employeeToEdit is set', async () => {
      const employeeToEdit: Employee = {
        identifier: 42,
        fullName: 'Clark Kent',
        department: 'News',
        designation: 'Reporter',
        emailAddress: 'clark@dailyplanet.com',
      };

      formElement.employeeToEdit = employeeToEdit;
      await formElement.updateComplete;

      const { nameInput, departmentInput, designationInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      expect(nameInput.value).toBe('Clark Kent');
      expect(departmentInput.value).toBe('News');
      expect(designationInput.value).toBe('Reporter');
      expect(emailInput.value).toBe('clark@dailyplanet.com');
      expect(saveButton.textContent?.trim()).toBe('Update');
    });

    it('should emit employee-save with preserved identifier when editing', async () => {
      const employeeToEdit: Employee = {
        identifier: 42,
        fullName: 'Clark Kent',
        department: 'News',
        designation: 'Reporter',
        emailAddress: 'clark@dailyplanet.com',
      };

      formElement.employeeToEdit = employeeToEdit;
      await formElement.updateComplete;

      const { nameInput } = getInputs();
      await setInputValue(nameInput, 'Superman');

      let savedDetail: { employee: Employee } | undefined;
      formElement.addEventListener('employee-save', (event: Event) => {
        savedDetail = (event as CustomEvent<{ employee: Employee }>).detail;
      });

      const { saveButton } = getButtons();
      saveButton.click();
      await formElement.updateComplete;

      expect(savedDetail?.employee.identifier).toBe(42);
      expect(savedDetail?.employee.fullName).toBe('Superman');
      expect(savedDetail?.employee.emailAddress).toBe('clark@dailyplanet.com');
    });
  });

  describe('Clear Action', () => {
    it('should clear all fields and error messages and emit form-cleared on Clear button click', async () => {
      const { nameInput, departmentInput, designationInput, emailInput } = getInputs();
      const { clearButton, saveButton } = getButtons();

      // Trigger error first
      saveButton.click();
      await formElement.updateComplete;
      expect(nameInput.errorMessage).toBe('Full Name is required');

      await setInputValue(nameInput, 'Some name');
      await setInputValue(departmentInput, 'Some dept');
      await setInputValue(designationInput, 'Some title');
      await setInputValue(emailInput, 'some@email.com');

      const clearSpy = vi.fn();
      formElement.addEventListener('form-cleared', clearSpy);

      clearButton.click();
      await formElement.updateComplete;

      expect(clearSpy).toHaveBeenCalled();
      expect(nameInput.value).toBe('');
      expect(departmentInput.value).toBe('');
      expect(designationInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(nameInput.errorMessage).toBe('');
    });

    it('should display a success toast after adding a new employee', async () => {
      const { nameInput, departmentInput, emailInput } = getInputs();
      const { saveButton } = getButtons();

      await setInputValue(nameInput, 'New Hire');
      await setInputValue(departmentInput, 'Engineering');
      await setInputValue(emailInput, 'new.hire@example.com');

      saveButton.click();
      await formElement.updateComplete;

      const toast = formElement.shadowRoot?.querySelector<UiToast>('ui-toast');
      expect(toast).not.toBeNull();
      expect(toast?.message).toBe('Employee added successfully!');
    });

    it('should display a success toast after updating an existing employee', async () => {
      const employeeToEdit: Employee = {
        identifier: 7,
        fullName: 'Bruce Wayne',
        department: 'Security',
        designation: 'Director',
        emailAddress: 'bruce@wayne.com',
      };

      formElement.employeeToEdit = employeeToEdit;
      await formElement.updateComplete;

      const { saveButton } = getButtons();
      saveButton.click();
      await formElement.updateComplete;

      const toast = formElement.shadowRoot?.querySelector<UiToast>('ui-toast');
      expect(toast?.message).toBe('Employee updated successfully!');
    });

    it('should correctly support editing and updating an employee with identifier 0', async () => {
      const employeeZero: Employee = {
        identifier: 0,
        fullName: 'Founder Zero',
        department: 'Executive',
        designation: 'Founder',
        emailAddress: 'founder@example.com',
      };

      formElement.employeeToEdit = employeeZero;
      await formElement.updateComplete;

      const { nameInput } = getInputs();
      await setInputValue(nameInput, 'Founder Zero (Updated)');

      let savedDetail: { employee: Employee } | undefined;
      formElement.addEventListener('employee-save', (event: Event) => {
        savedDetail = (event as CustomEvent<{ employee: Employee }>).detail;
      });

      const { saveButton } = getButtons();
      saveButton.click();
      await formElement.updateComplete;

      expect(savedDetail?.employee.identifier).toBe(0);
      expect(savedDetail?.employee.fullName).toBe('Founder Zero (Updated)');
    });
  });
});
