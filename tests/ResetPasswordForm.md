# Test Cases for ResetPasswordForm Component

**Component Path:** `src/adminDashboard/forms/ResetPasswordForm.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `ResetPasswordForm` component, ensuring it provides a secure and reliable way for admins to reset user passwords.

---

## Manual Test Case Scenarios

**RPF-M-01**
**Category:** Functional
**Title:** Successfully Reset Password
**Pre-conditions:**
- The application's theme is set to "light mode".
**Steps:**
1. Navigate to the page rendering the component.
2. Fill in the Phone Number, New Password, Confirm Password, and OTP fields with valid data.
3. Ensure New Password and Confirm Password match.
4. Ensure OTP is a 6-digit number.
5. Click the "Reset Password" button.
**Expected Result:**
1. An alert "Password reset successfully!" should be displayed.

---

**RPF-M-02**
**Category:** Functional
**Title:** Attempt to Reset Password with Mismatched Passwords
**Pre-conditions:**
- The application's theme is set to "light mode".
**Steps:**
1. Fill in the form with valid data, but with different values for New Password and Confirm Password.
2. Click the "Reset Password" button.
**Expected Result:**
1. An alert "Passwords do not match!" should be displayed.

---

**RPF-M-03**
**Category:** Functional
**Title:** Attempt to Reset Password with Invalid OTP
**Pre-conditions:**
- The application's theme is set to "light mode".
**Steps:**
1. Fill in the form with valid data, but with an OTP that is not a 6-digit number.
2. Click the "Reset Password" button.
**Expected Result:**
1. An alert "Please enter a valid 6-digit OTP!" should be displayed.

---

**RPF-M-04**
**Category:** Functional
**Title:** Attempt to Submit an Empty Form
**Pre-conditions:**
- The application's theme is set to "light mode".
**Steps:**
1. Click the "Reset Password" button without filling in any fields.
**Expected Result:**
1. The browser's default validation should prevent form submission and highlight the required fields.

---

**RPF-M-05**
**Category:** Functional
**Title:** Cancel Password Reset
**Pre-conditions:**
- The application's theme is set to "light mode".
**Steps:**
1. Fill in some data in the form.
2. Click the "Cancel" button.
**Expected Result:**
1. The form should ideally clear, or the user should be navigated away from the form, depending on the expected application behavior.

---

**RPF-M-06**
**Category:** UI/Visual
**Title:** Verify Dark Mode Styling
**Pre-conditions:**
- The application's theme is set to "dark mode".
**Steps:**
1. Render the component.
2. Observe the component's styling.
**Expected Result:**
- The component's background, text, and border colors should change to the specified dark mode styles.

---

**RPF-M-07**
**Category:** Accessibility
**Title:** Screen Reader Compatibility
**Pre-conditions:**
- A screen reader is active.
**Steps:**
1. Navigate to the component using the screen reader.
**Expected Result:**
- The screen reader should announce the title "Reset User Password" and the labels for all form fields.
- All interactive elements (input fields, buttons) should be accessible and have proper labels.
