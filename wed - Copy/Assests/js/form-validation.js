// Comprehensive form validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.init();
    }

    init() {
        if (!this.form) return;

        // Cache form fields
        this.cacheFields();
        
        // Add event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addFieldListeners();
    }

    cacheFields() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            this.fields[input.name] = input;
            
            // Add blur validation
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    addFieldListeners() {
        Object.values(this.fields).forEach(field => {
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                isValid = this.validateEmail(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'text':
                if (field.name === 'name') {
                    isValid = value.length >= 2;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'password':
                isValid = value.length >= 6;
                errorMessage = 'Password must be at least 6 characters long';
                break;
            case 'textarea':
                isValid = value.length >= 10;
                errorMessage = 'Message must be at least 10 characters long';
                break;
            default:
                isValid = value !== '';
                errorMessage = 'This field is required';
        }

        if (!isValid && value !== '') {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('field-error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('field-error');
        const existingError = field.parentNode.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        Object.values(this.fields).forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            this.showFormError('Please correct the errors above before submitting.');
        }
    }

    submitForm() {
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage('Thank you! Your message has been sent successfully.');
            this.form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    showFormError(message) {
        this.removeExistingMessages();
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error-message';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        this.form.insertBefore(errorElement, this.form.firstChild);
        
        // Scroll to error
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showSuccessMessage(message) {
        this.removeExistingMessages();
        
        const successElement = document.createElement('div');
        successElement.className = 'form-success-message';
        successElement.textContent = message;
        successElement.setAttribute('role', 'status');
        
        this.form.insertBefore(successElement, this.form.firstChild);
        
        // Scroll to success message
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    removeExistingMessages() {
        const existingMessages = this.form.querySelectorAll('.form-error-message, .form-success-message');
        existingMessages.forEach(msg => msg.remove());
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator('contactForm');
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        new FormValidator('registerForm');
    }
});