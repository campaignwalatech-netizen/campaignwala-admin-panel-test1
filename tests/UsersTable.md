# Test Cases for UsersTable Component

**Component Path:** `src/adminDashboard/forms/UsersTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `UsersTable` component, ensuring it provides a seamless experience for admins to manage users.

---

## Manual Test Case Scenarios

**UT-M-01**
**Category:** Functional
**Title:** Render with Active Users
**Pre-conditions:**
- The `userType` prop is set to "active".
- The API `userService.getAllUsersWithStats` returns a list of active users.
**Steps:**
1. Navigate to the page rendering the component.
2. Observe the table.
**Expected Result:**
1. The title "Active Users" is visible.
2. A table with the correct number of rows (users) is displayed.
3. Each row correctly shows the user's details.

---

**UT-M-02**
**Category:** Functional
**Title:** Search for a User
**Pre-conditions:**
- There are users in the table.
**Steps:**
1. Enter a search term in the search bar.
2. Observe the table.
**Expected Result:**
1. The table should be filtered to show only the users that match the search term.

---

**UT-M-03**
**Category:** Functional
**Title:** Filter Users by Leads
**Pre-conditions:**
- There are users in the table.
**Steps:**
1. Select a lead range from the filter dropdown (e.g., "High Leads").
2. Observe the table.
**Expected Result:**
1. The table should be filtered to show only the users that fall within the selected lead range.

---

**UT-M-04**
**Category:** Functional
**Title:** Change User Status
**Pre-conditions:**
- There is an active user in the table.
**Steps:**
1. Hover over the status of a user.
2. Click on "Hold" from the dropdown.
**Expected Result:**
1. An alert `User has been put on hold!` should be displayed.
2. The user should be removed from the active users table.

---

**UT-M-05**
**Category:** Functional
**Title:** View User Details
**Pre-conditions:**
- There is at least one user in the table.
**Steps:**
1. Click the "View" button for a user.
2. Observe the modal.
**Expected Result:**
1. A modal with the title "View User Details" should appear.
2. The modal should display all the details of the selected user.

---

**UT-M-06**
**Category:** Functional
**Title:** Edit User Details
**Pre-conditions:**
- There is at least one user in the table.
**Steps:**
1. Click the "Edit" button for a user.
2. Observe the modal.
**Expected Result:**
1. A modal with the title "Edit User" should appear.
2. The modal should contain a form with the user's current details.

---

**UT-M-07**
**Category:** Functional
**Title:** Save Edited User Details
**Pre-conditions:**
- The edit user modal is open.
**Steps:**
1. Modify some of the user's details.
2. Click the "Save Changes" button.
**Expected Result:**
1. An alert "User updated successfully!" should be displayed.
2. The modal should close.
3. The user's details in the table should be updated.

---

**UT-M-08**
**Category:** Edge Case
**Title:** Render with No Users
**Pre-conditions:**
- The API `userService.getAllUsersWithStats` returns an empty array for the given `userType`.
**Steps:**
1. Navigate to the page rendering the component.
**Expected Result:**
1. The table should be empty.
2. A message indicating no users were found should be displayed.

---

**UT-M-09**
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

**UT-M-10**
**Category:** Accessibility
**Title:** Screen Reader Compatibility
**Pre-conditions:**
- A screen reader is active.
**Steps:**
1. Navigate to the component using the screen reader.
**Expected Result:**
- The screen reader should announce the title, search bar, filter, table headers, and the content of each user in a logical order.
- All interactive elements should be accessible and have proper labels.
