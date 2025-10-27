# Test Cases for KYCReview Component

**Component Path:** `src/adminDashboard/forms/KYCReview.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `KYCReview` component, ensuring it provides a seamless experience for admins to review and manage user KYC applications.

---

## Manual Test Case Scenarios

**KYC-M-01**
**Category:** Functional
**Title:** Render with Pending KYC Applications
**Pre-conditions:**
- The application's theme is set to "light mode".
- There are pending KYC applications in the mock data.
**Steps:**
1. Navigate to the page rendering the component.
2. Observe the table.
**Expected Result:**
1. The title "KYC Review - Pending Applications" is visible.
2. A table with the correct number of rows (users) is displayed.
3. Each row correctly shows the user's ID, Full Name, Email, Phone, Date, and Status.

---

**KYC-M-02**
**Category:** Functional
**Title:** Search for a User
**Pre-conditions:**
- There are pending KYC applications in the table.
**Steps:**
1. Enter a user's name, email, or ID in the search bar.
2. Observe the table.
**Expected Result:**
1. The table should be filtered to show only the users that match the search term.

---

**KYC-M-03**
**Category:** Functional
**Title:** View User KYC Details
**Pre-conditions:**
- There is at least one user in the table.
**Steps:**
1. Click the "View Details" button for a user.
2. Observe the view.
**Expected Result:**
1. The view should switch to the details view.
2. The title should change to "KYC Review - [User's Full Name]".
3. The user's details, PAN card details, and bank account details should be displayed correctly.
4. "Back to List", "Reject KYC", and "Approve KYC" buttons should be visible.

---

**KYC-M-04**
**Category:** Functional
**Title:** Approve a KYC Application
**Pre-conditions:**
- The admin is in the details view for a user.
**Steps:**
1. Click the "Approve KYC" button.
**Expected Result:**
1. An alert `KYC approved for [User's Full Name]` should be displayed.
2. The view should return to the table view.

---

**KYC-M-05**
**Category:** Functional
**Title:** Reject a KYC Application with a Reason
**Pre-conditions:**
- The admin is in the details view for a user.
**Steps:**
1. Click the "Reject KYC" button.
2. Enter a reason in the prompt and click "OK".
**Expected Result:**
1. An alert `KYC rejected for [User's Full Name]` should be displayed.
2. The view should return to the table view.

---

**KYC-M-06**
**Category:** Functional
**Title:** Reject a KYC Application without a Reason
**Pre-conditions:**
- The admin is in the details view for a user.
**Steps:**
1. Click the "Reject KYC" button.
2. Click "Cancel" in the prompt or leave the reason empty and click "OK".
**Expected Result:**
1. No alert should be displayed.
2. The view should remain in the details view.

---

**KYC-M-07**
**Category:** Functional
**Title:** Go Back to Table View from Details View
**Pre-conditions:**
- The admin is in the details view for a user.
**Steps:**
1. Click the "Back to List" button or the arrow button in the header.
**Expected Result:**
1. The view should return to the table view of pending KYC applications.

---

**KYC-M-08**
**Category:** Edge Case
**Title:** Search for a Non-existent User
**Pre-conditions:**
- There are pending KYC applications in the table.
**Steps:**
1. Enter a search term that does not match any user.
**Expected Result:**
1. The table should be empty.
2. A message "No KYC applications found matching your search." should be displayed.

---

**KYC-M-09**
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

**KYC-M-10**
**Category:** Accessibility
**Title:** Screen Reader Compatibility
**Pre-conditions:**
- A screen reader is active.
**Steps:**
1. Navigate to the component using the screen reader.
**Expected Result:**
- The screen reader should announce the title, search bar, table headers, and the content of each user in a logical order.
- All interactive elements (buttons, search input) should be accessible and have proper labels.
