# Test Cases for ProductsTable Component

**Component Path:** `src/adminDashboard/components/ProductsTable.jsx`

**Objective:** To verify the UI, data display, and basic actions of the `ProductsTable` component.

---

### Manual Test Case Scenarios

**PT-M-01**
- **Category:** UI/Visual
- **Title:** Verify Table and Toolbar Rendering
- **Pre-conditions:** The `ProductsTable` component is rendered.
- **Steps:**
  1. Observe the component.
- **Expected Result:** 
  1. The title "ALL Offers 18" should be visible.
  2. A toolbar with "Filter", "Sort Asc", "Sort Desc", "More", and "Export" buttons should be present.
  3. A table with a header row (IMAGE, DATE, LATEST STAGE, etc.) should be displayed.

---

**PT-M-02**
- **Category:** UI/Visual
- **Title:** Verify Table Row Data
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. Inspect the first row of the table.
- **Expected Result:** The first row should correspond to the first item in the `Offers` array, displaying the Google logo, the correct date, stage, commission, etc.

---

**PT-M-03**
- **Category:** Functional
- **Title:** Verify Export Button
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. Click the "Export" button.
- **Expected Result:** An alert with the message "Exporting campaigns data..." should appear.

---

**PT-M-04**
- **Category:** Functional
- **Title:** Verify Toolbar Action Buttons
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. Click the "Filter" button.
  2. Click the "Sort Asc" button.
  3. Click the "Sort Desc" button.
- **Expected Result:** All buttons should be clickable. (As this is a dummy component, no further action is expected).

---

**PT-M-05**
- **Category:** Functional
- **Title:** Verify Row Action Button
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. Click the `MoreVertical` icon (action button) in any row.
- **Expected Result:** The button should be clickable. (No further action is expected).

---

**PT-M-06**
- **Category:** UI/Visual - Responsiveness
- **Title:** Verify Responsive Column Hiding
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. View the table on a large screen (desktop).
  2. Resize the browser window to a medium width (tablet size).
  3. Resize the browser window to a small width (mobile size).
- **Expected Result:**
  1. All columns, including "INTEGRATIONAL BONUS" and "WITHDR", should be visible.
  2. The "INTEGRATIONAL BONUS" column should be visible, but the "WITHDR" column should be hidden.
  3. Both the "INTEGRATIONAL BONUS" and "WITHDR" columns should be hidden.
