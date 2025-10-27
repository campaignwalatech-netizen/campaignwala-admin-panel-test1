# Test Cases for LeadsTable Component

**Component Path:** `src/adminDashboard/forms/LeadsTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `LeadsTable` component, ensuring it provides a seamless experience for admins to manage leads.

---

## Manual Test Case Scenarios

**LT-M-01**
**Category:** Functional
**Title:** Render with Leads Data
**Pre-conditions:**
- The `status` prop is set to "pending".
- The API `leadService.getAllLeads` returns a list of leads.
**Steps:**
1. Navigate to the page rendering the component.
2. Observe the table.
**Expected Result:**
1. The title "Pending Leads" is visible.
2. A table with the correct number of rows (leads) is displayed.
3. Each row correctly shows the lead's details.

---

**LT-M-02**
**Category:** Functional
**Title:** Search for a Lead
**Pre-conditions:**
- There are leads in the table.
**Steps:**
1. Enter a search term in the search bar.
2. Observe the table.
**Expected Result:**
1. The table should be filtered to show only the leads that match the search term.

---

**LT-M-03**
**Category:** Functional
**Title:** Filter Leads by Campaign
**Pre-conditions:**
- There are leads in the table.
**Steps:**
1. Select a campaign from the filter dropdown.
2. Observe the table.
**Expected Result:**
1. The table should be filtered to show only the leads that belong to the selected campaign.

---

**LT-M-04**
**Category:** Functional
**Title:** Change Lead Status
**Pre-conditions:**
- There is a lead with "pending" status in the table.
**Steps:**
1. Click on the status dropdown for a lead and select "approved".
**Expected Result:**
1. An alert `Lead status changed to approved successfully!` should be displayed.
2. The lead's status should be updated in the table (or the table should refresh).

---

**LT-M-05**
**Category:** Functional
**Title:** View Lead Details
**Pre-conditions:**
- There is at least one lead in the table.
**Steps:**
1. Click the "View" button for a lead.
2. Observe the modal.
**Expected Result:**
1. A modal with the title "View Lead Details" should appear.
2. The modal should display all the details of the selected lead.

---

**LT-M-06**
**Category:** Functional
**Title:** Close Lead Details Modal
**Pre-conditions:**
- The lead details modal is open.
**Steps:**
1. Click the "X" button in the modal.
**Expected Result:**
1. The modal should close.

---

**LT-M-07**
**Category:** Functional
**Title:** Export Leads
**Pre-conditions:**
- There are leads in the table.
**Steps:**
1. Click the "Export" button.
**Expected Result:**
1. An alert "Export functionality will be implemented soon!" should be displayed.

---

**LT-M-08**
**Category:** Edge Case
**Title:** Render with No Leads
**Pre-conditions:**
- The API `leadService.getAllLeads` returns an empty array.
**Steps:**
1. Navigate to the page rendering the component.
**Expected Result:**
1. The table should be empty.
2. A message "No pending leads found" should be displayed.

---

**LT-M-09**
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

**LT-M-10**
**Category:** Accessibility
**Title:** Screen Reader Compatibility
**Pre-conditions:**
- A screen reader is active.
**Steps:**
1. Navigate to the component using the screen reader.
**Expected Result:**
- The screen reader should announce the title, search bar, filter, table headers, and the content of each lead in a logical order.
- All interactive elements (buttons, dropdowns, search input) should be accessible and have proper labels.
