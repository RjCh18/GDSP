import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../src/ui/ui-button';
import '../src/ui/ui-input';
import '../src/ui/ui-dialog';
import '../src/ui/ui-toast';
import type { UiButton } from '../src/ui/ui-button';
import type { UiInput } from '../src/ui/ui-input';
import type { UiDialog } from '../src/ui/ui-dialog';
import type { UiToast } from '../src/ui/ui-toast';

describe('UI Primitives Components', () => {
  describe('UiButton Component', () => {
    let buttonElement: UiButton;

    beforeEach(async () => {
      buttonElement = document.createElement('ui-button') as UiButton;
      document.body.appendChild(buttonElement);
      await buttonElement.updateComplete;
    });

    afterEach(() => {
      buttonElement.remove();
    });

    it('should render button with default primary variant', () => {
      const nativeButton = buttonElement.shadowRoot?.querySelector('button');
      expect(nativeButton).not.toBeNull();
      expect(nativeButton?.classList.contains('primary')).toBe(true);
    });

    it('should apply variant classes correctly', async () => {
      buttonElement.variant = 'danger';
      await buttonElement.updateComplete;
      let nativeButton = buttonElement.shadowRoot?.querySelector('button');
      expect(nativeButton?.classList.contains('danger')).toBe(true);

      buttonElement.variant = 'outline-primary';
      await buttonElement.updateComplete;
      nativeButton = buttonElement.shadowRoot?.querySelector('button');
      expect(nativeButton?.classList.contains('outline-primary')).toBe(true);
    });

    it('should apply small, pill, and iconOnly classes', async () => {
      buttonElement.small = true;
      buttonElement.pill = true;
      buttonElement.iconOnly = true;
      await buttonElement.updateComplete;

      const nativeButton = buttonElement.shadowRoot?.querySelector('button');
      expect(nativeButton?.classList.contains('small')).toBe(true);
      expect(nativeButton?.classList.contains('pill')).toBe(true);
      expect(nativeButton?.classList.contains('icon-only')).toBe(true);
    });

    it('should set disabled attribute on native button', async () => {
      buttonElement.disabled = true;
      await buttonElement.updateComplete;

      const nativeButton = buttonElement.shadowRoot?.querySelector('button');
      expect(nativeButton?.disabled).toBe(true);
    });
  });

  describe('UiInput Component', () => {
    let inputElement: UiInput;

    beforeEach(async () => {
      inputElement = document.createElement('ui-input') as UiInput;
      document.body.appendChild(inputElement);
      await inputElement.updateComplete;
    });

    afterEach(() => {
      inputElement.remove();
    });

    it('should render label and required indicator when required is true', async () => {
      inputElement.label = 'Work Email';
      inputElement.required = true;
      await inputElement.updateComplete;

      const label = inputElement.shadowRoot?.querySelector('label');
      expect(label).not.toBeNull();
      expect(label?.textContent).toContain('Work Email');
      expect(label?.querySelector('.required-marker')).not.toBeNull();
    });

    it('should emit value-changed event when user inputs text', async () => {
      inputElement.name = 'fullName';
      await inputElement.updateComplete;

      let eventDetail: { name: string; value: string } | undefined;
      inputElement.addEventListener('value-changed', (event: Event) => {
        eventDetail = (event as CustomEvent<{ name: string; value: string }>).detail;
      });

      const nativeInput = inputElement.shadowRoot?.querySelector('input');
      if (nativeInput) {
        nativeInput.value = 'Alan Turing';
        nativeInput.dispatchEvent(new Event('input'));
      }

      expect(eventDetail).toEqual({ name: 'fullName', value: 'Alan Turing' });
      expect(inputElement.value).toBe('Alan Turing');
    });

    it('should display error message and apply invalid class when errorMessage is set', async () => {
      inputElement.errorMessage = 'Email is required';
      await inputElement.updateComplete;

      const wrapper = inputElement.shadowRoot?.querySelector('.input-wrapper');
      expect(wrapper?.classList.contains('invalid')).toBe(true);

      const errorText = inputElement.shadowRoot?.querySelector('.error-text');
      expect(errorText?.textContent).toBe('Email is required');
    });

    it('should handle disabled state correctly on input and wrapper', async () => {
      inputElement.disabled = true;
      await inputElement.updateComplete;

      const wrapper = inputElement.shadowRoot?.querySelector('.input-wrapper');
      expect(wrapper?.classList.contains('disabled')).toBe(true);

      const nativeInput = inputElement.shadowRoot?.querySelector('input');
      expect(nativeInput?.disabled).toBe(true);

      // Verify input events are ignored when disabled
      const changeSpy = vi.fn();
      inputElement.addEventListener('value-changed', changeSpy);
      if (nativeInput) {
        nativeInput.value = 'Ignored Input';
        nativeInput.dispatchEvent(new Event('input'));
      }
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should self-validate required field and set appropriate error message', async () => {
      inputElement.label = 'Full Name';
      inputElement.required = true;
      inputElement.value = '';
      await inputElement.updateComplete;

      const isValid = inputElement.validate();
      expect(isValid).toBe(false);
      expect(inputElement.errorMessage).toBe('Full Name is required');

      // Setting valid value clears error on validate
      inputElement.value = 'John Smith';
      expect(inputElement.validate()).toBe(true);
      expect(inputElement.errorMessage).toBe('');
    });

    it('should self-validate email format when type="email"', async () => {
      inputElement.type = 'email';
      inputElement.value = 'not-an-email';
      await inputElement.updateComplete;

      expect(inputElement.validate()).toBe(false);
      expect(inputElement.errorMessage).toBe('Enter a valid email');

      inputElement.value = 'valid@example.com';
      expect(inputElement.validate()).toBe(true);
      expect(inputElement.errorMessage).toBe('');
    });

    it('should reset value and error message on clear()', async () => {
      inputElement.value = 'temporary value';
      inputElement.errorMessage = 'Some error';
      await inputElement.updateComplete;

      inputElement.clear();
      await inputElement.updateComplete;

      expect(inputElement.value).toBe('');
      expect(inputElement.errorMessage).toBe('');
    });

    it('should accept numbers, strings, and null/undefined as value', async () => {
      inputElement.value = 12345;
      await inputElement.updateComplete;

      const nativeInput = inputElement.shadowRoot?.querySelector('input');
      expect(nativeInput?.value).toBe('12345');

      inputElement.value = null;
      await inputElement.updateComplete;
      expect(nativeInput?.value).toBe('');

      inputElement.value = 'Text value';
      await inputElement.updateComplete;
      expect(nativeInput?.value).toBe('Text value');
    });
  });

  describe('UiDialog Component', () => {
    let dialogElement: UiDialog;

    beforeEach(async () => {
      dialogElement = document.createElement('ui-dialog') as UiDialog;
      document.body.appendChild(dialogElement);
      await dialogElement.updateComplete;
    });

    afterEach(() => {
      dialogElement.remove();
    });

    it('should not render backdrop or panel when open is false', () => {
      dialogElement.open = false;
      const backdrop = dialogElement.shadowRoot?.querySelector('.dialog-backdrop');
      expect(backdrop).toBeNull();
    });

    it('should render backdrop, panel, and heading when open is true', async () => {
      dialogElement.open = true;
      dialogElement.heading = 'Confirm Deletion';
      dialogElement.confirmLabel = 'Yes, Delete';
      dialogElement.cancelLabel = 'No, Keep';
      await dialogElement.updateComplete;

      const backdrop = dialogElement.shadowRoot?.querySelector('.dialog-backdrop');
      expect(backdrop).not.toBeNull();

      const heading = dialogElement.shadowRoot?.querySelector('.dialog-heading');
      expect(heading?.textContent).toBe('Confirm Deletion');

      const buttons = dialogElement.shadowRoot?.querySelectorAll<UiButton>('ui-button');
      expect(buttons?.[0]?.textContent?.trim()).toBe('No, Keep');
      expect(buttons?.[1]?.textContent?.trim()).toBe('Yes, Delete');
    });

    it('should emit dialog-cancel on backdrop click, cancel button click, or close icon click', async () => {
      dialogElement.open = true;
      await dialogElement.updateComplete;

      const cancelSpy = vi.fn();
      dialogElement.addEventListener('dialog-cancel', cancelSpy);

      // Click close button
      const closeBtn = dialogElement.shadowRoot?.querySelector<HTMLButtonElement>('.dialog-close-button');
      closeBtn?.click();
      expect(cancelSpy).toHaveBeenCalledTimes(1);

      // Click cancel button
      const cancelBtn = dialogElement.shadowRoot?.querySelectorAll<UiButton>('.dialog-actions ui-button')?.[0];
      cancelBtn?.click();
      expect(cancelSpy).toHaveBeenCalledTimes(2);

      // Click backdrop
      const backdrop = dialogElement.shadowRoot?.querySelector<HTMLDivElement>('.dialog-backdrop');
      backdrop?.click();
      expect(cancelSpy).toHaveBeenCalledTimes(3);
    });

    it('should prevent backdrop click when clicking inside the panel', async () => {
      dialogElement.open = true;
      await dialogElement.updateComplete;

      const cancelSpy = vi.fn();
      dialogElement.addEventListener('dialog-cancel', cancelSpy);

      const panel = dialogElement.shadowRoot?.querySelector<HTMLDivElement>('.dialog-panel');
      panel?.click();

      expect(cancelSpy).not.toHaveBeenCalled();
    });

    it('should emit dialog-confirm on confirm button click', async () => {
      dialogElement.open = true;
      await dialogElement.updateComplete;

      const confirmSpy = vi.fn();
      dialogElement.addEventListener('dialog-confirm', confirmSpy);

      const confirmBtn = dialogElement.shadowRoot?.querySelectorAll<UiButton>('.dialog-actions ui-button')?.[1];
      confirmBtn?.click();

      expect(confirmSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('UiToast Component', () => {
    let toastElement: UiToast;

    beforeEach(async () => {
      toastElement = document.createElement('ui-toast') as UiToast;
      document.body.appendChild(toastElement);
      await toastElement.updateComplete;
    });

    afterEach(() => {
      toastElement.remove();
    });

    it('should render nothing when message is empty', () => {
      const toast = toastElement.shadowRoot?.querySelector('.toast');
      expect(toast).toBeNull();
    });

    it('should render the message when set', async () => {
      toastElement.message = 'Saved successfully!';
      await toastElement.updateComplete;

      const toast = toastElement.shadowRoot?.querySelector('.toast');
      expect(toast).not.toBeNull();
      expect(toast?.textContent).toContain('Saved successfully!');
    });

    it('should emit toast-dismissed and stop rendering on close button click', async () => {
      toastElement.message = 'Saved successfully!';
      await toastElement.updateComplete;

      const dismissSpy = vi.fn();
      toastElement.addEventListener('toast-dismissed', dismissSpy);

      const closeBtn = toastElement.shadowRoot?.querySelector<HTMLButtonElement>('.toast-close-button');
      closeBtn?.click();

      expect(dismissSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit toast-dismissed automatically after the configured duration', async () => {
      vi.useFakeTimers();
      try {
        toastElement.durationMs = 1000;
        toastElement.message = 'Auto dismiss me';
        await toastElement.updateComplete;

        const dismissSpy = vi.fn();
        toastElement.addEventListener('toast-dismissed', dismissSpy);

        vi.advanceTimersByTime(1000);
        expect(dismissSpy).toHaveBeenCalledTimes(1);
      } finally {
        vi.useRealTimers();
      }
    });
  });
});
