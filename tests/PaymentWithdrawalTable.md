# Test Cases for PaymentWithdrawalTable Component

**Component Path:** `src/adminDashboard/forms/PaymentWithdrawalTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `PaymentWithdrawalTable` component, ensuring it provides a seamless experience for admins to manage payment withdrawal requests.

---

## Manual Test Case Scenarios

**PWT-M-01**
**Category:** Functional
**Title:** Render with Withdrawal Requests
**Pre-conditions:**
- The application's theme is set to "light mode".
- There are withdrawal requests in the mock data.
**Steps:**
1. Navigate to the page rendering the component.
2. Observe the table and statistics.
**Expected Result:**
1. The title "Payment Withdrawal Requests" is visible.
2. The statistics for total, approved, pending, and rejected requests are displayed correctly.
3. A table with the correct number of rows (requests) is displayed.
4. Each row correctly shows the request's details.

---

**PWT-M-02**
**Category:** Functional
**Title:** Search for a Request
**Pre-conditions:**
- There are withdrawal requests in the table.
**Steps:**
1. Enter a Lead ID or Name in the search bar.
2. Observe the table.
**Expected Result:**
1. The table should be filtered to show only the requests that match the search term.

---

**PWT-M-03**
**Category:** Functional
**Title:** Filter Requests by Status
**Pre-conditions:**
- There are withdrawal requests in the table.
**Steps:**
1. Select a status from the filter dropdown.
2. Observe the table.
**Expected Result:**
1. The table should be filtered to show only the requests that have the selected status.

---

**PWT-M-04**
**Category:** Functional
**Title:** View Withdrawal Details
**Pre-conditions:**
- There is at least one request in the table.
**Steps:**
1. Click the "View Details" button for a request.
2. Observe the modal.
**Expected Result:**
1. A modal with the title "Withdrawal Details" should appear.
2. The modal should display the withdrawal information and bank details of the selected request.

---

**PWT-M-05**
**Category:** Functional
**Title:** Approve a Withdrawal Request
**Pre-conditions:**
- The withdrawal details modal is open for a pending request.
**Steps:**
1. Click the "Approve" button.
2. Enter a transaction ID in the input field.
3. Click the "Confirm Approval" button.
**Expected Result:**
1. The modal should close.
2. The status of the request in the table should change to "Approved".
3. The details of the request should be updated with the transaction ID.

---

**PWT-M-06**
**Category:** Functional
**Title:** Reject a Withdrawal Request
**Pre-conditions:**
- The withdrawal details modal is open for a pending request.
**Steps:**
1. Click the "Reject" button.
2. Enter a reason for rejection in the textarea.
3. Click the "Confirm Rejection" button.
**Expected Result:**
1. The modal should close.
2. The status of the request in the table should change to "Rejected".
3. The details of the request should be updated with the rejection reason.

---

**PWT-M-07**
**Category:** Edge Case
**Title:** Approve a Request without Transaction ID
**Pre-conditions:**
- The withdrawal details modal is open for a pending request.
**Steps:**
1. Click the "Approve" button.
2. Click the "Confirm Approval" button without entering a transaction ID.
**Expected Result:**
1. An alert "Please enter transaction ID" should be displayed.
2. The modal should remain open.

---

**PWT-M-08**
**Category:** Edge Case
**Title:** Reject a Request without a Reason
**Pre-conditions:**
- The withdrawal details modal is open for a pending request.
**Steps:**
1. Click the "Reject" button.
2. Click the "Confirm Rejection" button without entering a reason.
**Expected Result:**
1. An alert "Please enter rejection reason" should be displayed.
2. The modal should remain open.

---

**PWT-M-09**
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

**PWT-M-10**
**Category:** Accessibility
**Title:** Screen Reader Compatibility
**Pre-conditions:**
- A screen reader is active.
**Steps:**
1. Navigate to the component using the screen reader.
**Expected Result:**
- The screen reader should announce the title, statistics, search bar, filter, table headers, and the content of each request in a logical order.
- All interactive elements should be accessible and have proper labels.
