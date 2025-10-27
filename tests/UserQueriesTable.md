# Test Cases for UserQueriesTable Component

**Component Path:** `src/adminDashboard/forms/UserQueriesTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `UserQueriesTable` component, ensuring it provides a seamless experience for admins to manage user queries.

---

## Manual Test Case Scenarios

**UQT-M-01**
**Category:** Functional
**Title:** Render with User Queries
**Pre-conditions:**
- The application's theme is set to "light mode".
- There are user queries in the mock data.
**Steps:**
1. Navigate to the page rendering the component.
2. Observe the query cards.
**Expected Result:**
1. The title "QUERIES" is visible.
2. A list of query cards is displayed.
3. Each card correctly shows the user's name, date, subject, message, and email.

---

**UQT-M-02**
**Category:** Functional
**Title:** Open Reply Modal for a Query
**Pre-conditions:**
- There is at least one query card.
**Steps:**
1. Click the "Reply" or "Reply Again" button on a query card.
2. Observe the modal.
**Expected Result:**
1. A modal with the title "Reply to Query" should appear.
2. The modal should display the original query details.
3. If there are previous replies, they should be displayed.
4. A textarea for the reply and "Cancel" and "Send Reply" buttons should be visible.

---

**UQT-M-03**
**Category:** Functional
**Title:** Send a Reply
**Pre-conditions:**
- The reply modal is open.
**Steps:**
1. Enter a message in the reply textarea.
2. Click the "Send Reply" button.
**Expected Result:**
1. The modal should close.
2. The status of the query should be updated to "Replied".
3. The "Reply" button on the card should change to "Reply Again".

---

**UQT-M-04**
**Category:** Functional
**Title:** Attempt to Send an Empty Reply
**Pre-conditions:**
- The reply modal is open.
**Steps:**
1. Click the "Send Reply" button without entering a message.
**Expected Result:**
1. The "Send Reply" button should be disabled.
2. The modal should remain open.

---

**UQT-M-05**
**Category:** Functional
**Title:** Close the Reply Modal
**Pre-conditions:**
- The reply modal is open.
**Steps:**
1. Click the "Cancel" button or the "X" button in the modal header.
**Expected Result:**
1. The modal should close.

---

**UQT-M-06**
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

**UQT-M-07**
**Category:** Accessibility
**Title:** Screen Reader Compatibility
**Pre-conditions:**
- A screen reader is active.
**Steps:**
1. Navigate to the component using the screen reader.
**Expected Result:**
- The screen reader should announce the title "QUERIES" and the content of each query card in a logical order.
- All interactive elements (buttons, textarea) should be accessible and have proper labels.
