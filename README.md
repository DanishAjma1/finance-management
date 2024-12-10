# finance-manager
This is an open-source project for organizing expenses and income. This tool categorizes my spending and helps me analyze my inflow and outflow.

The initial wireframes could be taken from [splitwise](splitwise.com) but feel free to suggest new design and ideas on the way.

## Technical Aspects:
### Framework:
The application is built using Next.js, a React-based framework, to leverage server-side rendering (SSR) and client-side rendering (CSR) capabilities for optimal performance and scalability.

### Programming Language:
The project is developed in TypeScript, ensuring type safety, improved maintainability, and reduced runtime errors.

### Styling Framework:
Styling and theming are handled using Material-UI (MUI), providing a sleek, modern, and responsive design out of the box. MUI's extensive library of components ensures a consistent and professional look and feel.

### Form Validation:
The application utilizes Yup, a robust schema validation library, to enforce data validation rules across all forms. This guarantees that user input adheres to predefined standards, ensuring a smooth and error-free experience.

### Modular Architecture:
The application is structured with a modular architecture to ensure scalability and maintainability, allowing for future enhancements and integrations.

### Purpose:
The Finance Manager aims to simplify expense tracking and account management, catering to individuals who seek a straightforward yet powerful solution for personal finance management. It bridges functionality with aesthetics, ensuring both practicality and an enjoyable user experience.

This description covers both the functional and technical aspects of your project effectively. Let me know if you’d like to refine it further!

## Contribution Guidelines:
To contribute to the Finance Manager project, follow these steps:

### Branching Strategy:

Always create a new branch from the main branch before starting work.
Use meaningful branch names that describe your task, e.g., feature/account-management or fix/validation-bug.

### Security Practices:
Ensure all code passes existing linting and formatting checks.
Run all tests locally before submitting changes to avoid breaking existing functionality.
Review and follow best practices for TypeScript, MUI components, and schema validation using Yup.

### Pull Request (PR) Requirements:
Submit a PR from your feature branch to the main branch.
Include a clear description of changes made and their purpose.
Ensure PR includes relevant tests and passes CI/CD checks.
Address any code review feedback promptly to maintain project quality.

### Testing:
Add tests for all new features or fixes using the existing testing framework.
Ensure 100% test coverage for critical features.

### Security and Data Integrity:
Follow security guidelines to protect sensitive information, such as proper handling of user data and secure input validation.
Avoid committing sensitive information or credentials to the repository.
