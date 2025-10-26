# Test Cases for DummyForms Components

**Component Path:** `src/adminDashboard/components/DummyForms.jsx`

**Objective:** To verify the UI and basic functionality of the various dummy form and view components.

---

## DistributeLeadsForm

**DLF-M-01**
- **Category:** UI/Visual
- **Title:** Verify Form Rendering
- **Pre-conditions:** The `DistributeLeadsForm` component is rendered.
- **Steps:**
  1. Observe the component.
- **Expected Result:** 
  1. The title "Distribute Leads" should be visible.
  2. A dropdown for "Select Team Member", a number input for "Number of Leads", and a dropdown for "Priority" should be displayed.
  3. A "Distribute" button should be present.

---

**DLF-M-02**
- **Category:** Functional
- **Title:** Verify Form Interaction
- **Pre-conditions:** The `DistributeLeadsForm` component is rendered.
- **Steps:**
  1. Select an option from the "Select Team Member" dropdown.
  2. Enter a number in the "Number of Leads" input.
  3. Select an option from the "Priority" dropdown.
- **Expected Result:** All fields should accept input without errors.

---

## UploadLeadsForm

**ULF-M-01**
- **Category:** UI/Visual
- **Title:** Verify Form Rendering
- **Pre-conditions:** The `UploadLeadsForm` component is rendered.
- **Steps:**
  1. Observe the component.
- **Expected Result:** 
  1. The title "Upload Fresh Leads" should be visible.
  2. A file input for "Upload CSV File", a text input for "Campaign Name", and a textarea for "Description" should be displayed.
  3. An "Upload Leads" button should be present.

---

**ULF-M-02**
- **Category:** Functional
- **Title:** Verify Form Interaction
- **Pre-conditions:** The `UploadLeadsForm` component is rendered.
- **Steps:**
  1. Click the file input and select a CSV file.
  2. Enter text in the "Campaign Name" input.
  3. Enter text in the "Description" textarea.
- **Expected Result:** All fields should accept their respective inputs without errors.

---

## ApproveAccountForm

**AAF-M-01**
- **Category:** UI/Visual
- **Title:** Verify Component Rendering
- **Pre-conditions:** The `ApproveAccountForm` component is rendered.
- **Steps:**
  1. Observe the component.
- **Expected Result:** 
  1. The title "Approve Account" should be visible.
  2. A list of user accounts with a "Pending" status should be displayed.
  3. Each account should have an "Approve" and a "Reject" button.

---

**AAF-M-02**
- **Category:** Functional
- **Title:** Verify Button Clickability
- **Pre-conditions:** The `ApproveAccountForm` component is rendered.
- **Steps:**
  1. Click the "Approve" button for an account.
  2. Click the "Reject" button for an account.
- **Expected Result:** Both buttons should be clickable. (As this is a dummy component, no further action is expected).

---

## AddAccountForm

**ACF-M-01**
- **Category:** UI/Visual
- **Title:** Verify Form Rendering
- **Pre-conditions:** The `AddAccountForm` component is rendered.
- **Steps:**
  1. Observe the component.
- **Expected Result:** 
  1. The title "Add New Account" should be visible.
  2. Inputs for "Full Name", "Email", "Phone", a dropdown for "Role", and a textarea for "Address" should be displayed.
  3. An "Add Account" button should be present.

---

**ACF-M-02**
- **Category:** Functional
- **Title:** Verify Form Interaction
- **Pre-conditions:** The `AddAccountForm` component is rendered.
- **Steps:**
  1. Enter text into all text inputs and the textarea.
  2. Select an option from the "Role" dropdown.
- **Expected Result:** All fields should accept input without errors.

---

## DefaultView

**DV-M-01**
- **Category:** UI/Visual
- **Title:** Verify View Rendering
- **Pre-conditions:** The `DefaultView` component is rendered.
- **Steps:**
  1. Observe the component.
- **Expected Result:** The welcome message "Welcome to Campaignwala Admin Dashboard" and the instruction "Select a menu item from the sidebar to get started" should be visible.
