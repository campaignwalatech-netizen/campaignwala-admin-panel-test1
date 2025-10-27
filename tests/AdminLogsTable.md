# Test Cases for AdminLogsTable Component

**Component Path:** `src/adminDashboard/forms/AdminLogsTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `AdminLogsTable` component, ensuring it correctly displays admin activity logs and allows for detailed inspection.

---

## Manual Test Case Scenarios

**LOG-M-01**
**Category:** Functional
**Title:** Render Admin Logs Table
**Pre-conditions:**
- User is authenticated as an admin.
- User navigates to the admin logs page.
**Steps:**
1.  Navigate to the page containing the `AdminLogsTable` component.
2.  Observe the table and its header.
**Expected Result:**
- The title "Admin Activity Logs" is visible.
- An "Export Logs" button is present.
- The table displays with the correct columns: ID, Admin, Action, Timestamp, IP Address, Severity, and Details.
- The table is populated with the hardcoded log data.

---

**LOG-M-02**
**Category:** UI/Visual
**Title:** Verify Severity Color Coding
**Pre-conditions:**
- The logs table is rendered with data.
**Steps:**
1.  Examine the "Severity" column for different log entries.
**Expected Result:**
- The severity badges have the correct background and text colors based on the severity level:
  - `info`: Blue
  - `success`: Green
  - `warning`: Yellow
  - `error`: Red

---

**LOG-M-03**
**Category:** Functional
**Title:** View Log Details Modal
**Pre-conditions:**
- The logs table is rendered with data.
**Steps:**
1.  Click the "View Details" button on any log row.
2.  Observe the modal that appears.
**Expected Result:**
- A modal titled "Admin Log Details" opens.
- The modal displays detailed information about the selected log, including Log ID, Admin, Action, Timestamp, IP Address, Severity, and a Detailed Description.
- A "Close" button is visible in the modal footer.

---

**LOG-M-04**
**Category:** Functional
**Title:** Close Log Details Modal
**Pre-conditions:**
- The log details modal is open.
**Steps:**
1.  Click the "Close" button in the modal footer.
2.  Re-open the modal and click the "X" icon in the header.
**Expected Result:**
- In both cases, the modal closes, and the user is returned to the main logs table view.

---

**LOG-M-05**
**Category:** Functional
**Title:** Export Logs Button
**Pre-conditions:**
- The logs table is rendered.
**Steps:**
1.  Click the "Export Logs" button.
**Expected Result:**
- Although not implemented, the button should be clickable. In a real-world scenario, this would trigger a file download (e.g., CSV or PDF) of the logs.

---

**LOG-M-06**
**Category:** UI/Visual
**Title:** Responsive Behavior
**Pre-conditions:**
- The logs table is rendered.
**Steps:**
1.  Resize the browser window to a smaller width (e.g., mobile device width).
2.  Observe the table's layout.
**Expected Result:**
- The table should become horizontally scrollable if the content exceeds the viewport width, ensuring all data is accessible without breaking the page layout.
