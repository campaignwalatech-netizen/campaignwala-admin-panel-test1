# Test Cases for ApproveOffersTable Component

**Component Path:** `src/adminDashboard/forms/ApproveProjectTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `ApproveOffersTable` component, ensuring it provides a seamless experience for admins to manage offer approvals.

---

## Manual Test Case Scenarios

**APT-M-01**
**Category:** Functional
**Title:** Render with Standard Offer Data
**Pre-conditions:**
- The application's theme is set to "light mode".
- The API `getAllOffers` returns a list of 2 or more offers.
**Steps:**
1. Navigate to the page rendering the component.
2. Observe the table.
**Expected Result:**
1. The title "Account Approval Center" is visible.
2. A table with the correct number of rows (offers) is displayed.
3. Each row correctly shows the offer's details like Lead ID, Name, Category, Commissions, Date, and Approval Status.

---

**APT-M-02**
**Category:** Functional
**Title:** Render with an Empty Offer List
**Pre-conditions:**
- The application's theme is set to "light mode".
- The API `getAllOffers` returns an empty array `[]`.
**Steps:**
1. Navigate to the page rendering the component.
2. Observe the table area.
**Expected Result:**
1. The title "Account Approval Center" is visible.
2. The table area should be empty or show a message indicating "No offers found".
3. The "Export to CSV" button should be disabled.

---

**APT-M-03**
**Category:** Functional
**Title:** Approve a Pending Offer
**Pre-conditions:**
- There is at least one pending offer in the table.
**Steps:**
1. Click on the toggle switch for a pending offer.
2. Observe the status of the offer.
**Expected Result:**
1. The toggle switch should move to the "approved" state.
2. The offer's status in the table should change to "Approved".
3. A success message should be displayed (or the change should be visually confirmed).

---

**APT-M-04**
**Category:** Functional
**Title:** Reject an Approved Offer
**Pre-conditions:**
- There is at least one approved offer in the table.
**Steps:**
1. Click on the toggle switch for an approved offer.
2. Observe the status of the offer.
**Expected Result:**
1. The toggle switch should move to the "pending" state.
2. The offer's status in the table should change to "Pending".
3. A success message should be displayed (or the change should be visually confirmed).

---

**APT-M-05**
**Category:** Functional
**Title:** Export Offers to CSV
**Pre-conditions:**
- There are offers available in the table.
**Steps:**
1. Click the "Export to CSV" button.
**Expected Result:**
1. A CSV file named `Offers_Approval_YYYY-MM-DD.csv` should be downloaded.
2. The CSV file should contain the correct offer data.

---

**APT-M-06**
**Category:** Functional
**Title:** Upload a valid CSV file
**Pre-conditions:**
- The user has a valid CSV file with the correct format.
**Steps:**
1. Click on the "Upload CSV File" icon or drag and drop the file.
2. Select a valid CSV file.
**Expected Result:**
1. The file name and size should be displayed.
2. An "Upload Successful!" message should be shown.
3. The "Process Accounts" button should be visible.

---

**APT-M-07**
**Category:** Edge Case
**Title:** Upload an invalid file type
**Pre-conditions:**
- The user has a file that is not a CSV or Excel file (e.g., a `.txt` or `.jpg` file).
**Steps:**
1. Click on the "Upload CSV File" or "Upload Excel File" icon.
2. Select an invalid file.
**Expected Result:**
1. An error message "Please select a valid CSV or Excel file (.csv, .xlsx, .xls)" should be displayed.
2. The upload status should show an error.

---

**APT-M-08**
**Category:** Edge Case
**Title:** Upload a file larger than the size limit
**Pre-conditions:**
- The user has a CSV file larger than 10MB.
**Steps:**
1. Click on the "Upload CSV File" icon.
2. Select a file larger than 10MB.
**Expected Result:**
1. An error message "File size should be less than 10MB" should be displayed.
2. The upload status should show an error.

---

**APT-M-09**
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

**APT-M-10**
**Category:** Accessibility
**Title:** Screen Reader Compatibility
**Pre-conditions:**
- A screen reader is active.
**Steps:**
1. Navigate to the component using the screen reader.
**Expected Result:**
- The screen reader should announce the "Account Approval Center" title, the table headers, and the content of each offer in a logical order.
- All interactive elements (buttons, toggles, file inputs) should be accessible and have proper labels.
