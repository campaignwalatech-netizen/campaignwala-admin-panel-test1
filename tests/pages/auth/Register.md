# Manual Test Cases for RegisterPage

**Component:** `RegisterPage.jsx`

**Objective:** To verify the functionality of the user registration flow, which includes phone number submission, OTP verification, and user details submission.

---

### Test Case 1: Render Initial Registration Page (Phone Number Step)

| Test Case ID | TC_REGISTER_01                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the initial registration page renders correctly. |
| **Steps**      | 1. Navigate to the registration page (`/register`).<br>2. Observe the rendered components. |
| **Expected Result** | The page should display:<br>- A "Phone Number" input field.<br>- A "SEND OTP" button.<br>- A link to the "Login" page. |

---

### Test Case 2: Phone Number Submission - Valid Number

| Test Case ID | TC_REGISTER_02                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify that a user can submit a valid phone number to receive an OTP. |
| **Steps**      | 1. Navigate to `/register`.<br>2. Enter a valid 10-digit phone number.<br>3. Click the "SEND OTP" button. |
| **Expected Result** | The user should be advanced to the OTP verification step.<br>An informational message indicating that an OTP has been sent should be displayed. |

---

### Test Case 3: Phone Number Submission - Invalid Number

| Test Case ID | TC_REGISTER_03                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify that an error is shown for an invalid phone number. |
| **Steps**      | 1. Navigate to `/register`.<br>2. Enter an invalid phone number (e.g., "123").<br>3. Click the "SEND OTP" button. |
| **Expected Result** | An error message (e.g., "Please enter a valid 10-digit phone number") should be displayed.<br>The user should remain on the phone number step. |

---

### Test Case 4: OTP Verification - Valid OTP

| Test Case ID | TC_REGISTER_04                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the user can proceed by entering a valid OTP. |
| **Prerequisites** | The user has already submitted a phone number and is on the OTP step. |
| **Steps**      | 1. Enter the correct 4-digit OTP in the input fields.<br>2. Click the "VERIFY OTP" button. |
| **Expected Result** | The user should be advanced to the final registration step (user details).<br>An informational message (e.g., "OTP verified!") should be displayed. |

---

### Test Case 5: OTP Verification - Invalid OTP

| Test Case ID | TC_REGISTER_05                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify that an error is shown for an invalid OTP. |
| **Prerequisites** | The user is on the OTP step. |
| **Steps**      | 1. Enter an incorrect 4-digit OTP.<br>2. Click the "VERIFY OTP" button. |
| **Expected Result** | An error message (e.g., "Invalid OTP") should be displayed.<br>The user should remain on the OTP verification step. |

---

### Test Case 6: Final Registration - Valid Details

| Test Case ID | TC_REGISTER_06                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify that a user can complete registration with valid details. |
| **Prerequisites** | The user has successfully verified their OTP and is on the user details step. |
| **Steps**      | 1. Fill in the "Full Name", "Email Address", and "Password" fields with valid data.<br>2. Click the "COMPLETE REGISTRATION" button. |
| **Expected Result** | The user account is created, and the user is redirected to the appropriate dashboard. |

---

### Test Case 7: Final Registration - Invalid Details

| Test Case ID | TC_REGISTER_07                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify validation on the final registration form. |
| **Prerequisites** | The user is on the user details step. |
| **Steps**      | 1. Leave one or more fields blank.<br>2. Click "COMPLETE REGISTRATION".<br>3. Enter a password shorter than 6 characters.<br>4. Click "COMPLETE REGISTRATION".<br>5. Enter an invalid email format.<br>6. Click "COMPLETE REGISTRATION". |
| **Expected Result** | An appropriate error message should be displayed for each invalid submission scenario.<br>The form should not be submitted. |

---

### Test Case 8: Navigation - Back and Login Links

| Test Case ID | TC_REGISTER_08                                     |
|--------------|----------------------------------------------------|
| **Description**  | Verify that all navigation links work as expected across all steps. |
| **Steps**      | 1. On the phone step, click the "Login" link.<br>2. Go back. Proceed to the OTP step.<br>3. Click the "Try Again" button.<br>4. Go back. Proceed to the details step.<br>5. Click the "Back to OTP" link.<br>6. Go back. Proceed to the details step.<br>7. Click the "Login" link. |
| **Expected Result** | - The "Login" link should always navigate to `/`.<br>- The "Try Again" button on the OTP step should return the user to the phone number step.<br>- The "Back to OTP" link on the details step should return the user to the OTP step. |
