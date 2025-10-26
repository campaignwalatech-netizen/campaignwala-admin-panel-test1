# Test Cases for Modal Components

**Component Path:** `src/adminDashboard/components/Modals.jsx`

**Objective:** To verify the visibility, functionality, and content of the various modal dialogs.

---

## DeleteModal

**DM-M-01**
- **Category:** UI/Visual
- **Title:** Verify Modal Visibility
- **Pre-conditions:** A page that can trigger the `DeleteModal`.
- **Steps:**
  1. Ensure the modal is not visible initially (`isOpen` is `false`).
  2. Trigger an action to open the modal (e.g., click a delete icon).
- **Expected Result:**
  1. The page should appear without the modal.
  2. The modal should appear with a backdrop, centered on the screen.

---

**DM-M-02**
- **Category:** UI/Visual
- **Title:** Verify Modal Content
- **Pre-conditions:** The modal is opened with `itemName` set to "Test Product".
- **Steps:**
  1. Observe the modal's content.
- **Expected Result:**
  1. The title "Confirm Delete" should be visible.
  2. The message "Are you sure you want to delete **Test Product**?" should be displayed.
  3. "Delete" and "Cancel" buttons should be present.

---

**DM-M-03**
- **Category:** Functional
- **Title:** Verify Close and Cancel Buttons
- **Pre-conditions:** The `DeleteModal` is open.
- **Steps:**
  1. Click the 'X' icon in the top-right corner.
  2. Re-open the modal.
  3. Click the "Cancel" button.
- **Expected Result:**
  1. The modal should close, and the `onClose` function should be called.
  2. The modal should close, and the `onClose` function should be called.

---

**DM-M-04**
- **Category:** Functional
- **Title:** Verify Delete Button
- **Pre-conditions:** The `DeleteModal` is open.
- **Steps:**
  1. Click the "Delete" button.
- **Expected Result:** The `onConfirm` function should be called, and the modal should likely close as part of that function's logic.

---

## EditModal

**EM-M-01**
- **Category:** UI/Visual
- **Title:** Verify Modal Visibility and Content
- **Pre-conditions:** The modal is opened with a title and some child components (e.g., a form).
- **Steps:**
  1. Trigger the modal to open.
- **Expected Result:**
  1. The modal should appear with the correct title.
  2. The child components (the form) should be rendered correctly inside the modal.
  3. "Save Changes" and "Cancel" buttons should be present.

---

**EM-M-02**
- **Category:** Functional
- **Title:** Verify Close and Cancel Buttons
- **Pre-conditions:** The `EditModal` is open.
- **Steps:**
  1. Click the 'X' icon.
  2. Re-open the modal.
  3. Click the "Cancel" button.
- **Expected Result:** In both cases, the modal should close, and the `onClose` function should be called.

---

**EM-M-03**
- **Category:** Functional
- **Title:** Verify Save Changes Button
- **Pre-conditions:** The `EditModal` is open.
- **Steps:**
  1. Click the "Save Changes" button.
- **Expected Result:** The `onConfirm` function should be called.

---

## ConfirmModal

**CM-M-01**
- **Category:** UI/Visual
- **Title:** Verify Modal Content
- **Pre-conditions:** The modal is opened with a custom `title`, `message`, and `confirmText`.
- **Steps:**
  1. Observe the modal.
- **Expected Result:** The modal should display the custom title, message, and confirmation button text provided in the props.

---

**CM-M-02**
- **Category:** Functional
- **Title:** Verify Confirmation Button
- **Pre-conditions:** The `ConfirmModal` is open.
- **Steps:**
  1. Click the custom confirmation button.
- **Expected Result:** The `onConfirm` function should be called.

---

**CM-M-03**
- **Category:** UI/Visual
- **Title:** Verify Confirmation Button Color
- **Pre-conditions:** None.
- **Steps:**
  1. Open the modal with `confirmColor` set to "green".
  2. Observe the confirmation button.
  3. Open another modal with `confirmColor` set to "red".
  4. Observe the confirmation button.
- **Expected Result:**
  1. The confirmation button should have a green background.
  2. The confirmation button should have a red background.
