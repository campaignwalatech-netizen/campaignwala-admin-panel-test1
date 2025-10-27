# Test Cases for AddOffersForm Component

**Component Path:** `src/adminDashboard/forms/AddProjectForm.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `AddOffersForm` component, ensuring it provides a seamless experience for adding new offers.

---

## Manual Test Case Scenarios

**OFFER-M-01**
**Category:** Functional
**Title:** Render "Add New Offers" Form
**Pre-conditions:**
- The user navigates to the "Add New Offers" page.
**Steps:**
1.  Navigate to the page for adding a new offer.
2.  Observe the form's title and the information alert.
**Expected Result:**
- The form title should be "Add New Offers".
- An alert with "Bonus & Commission Information" should be visible.

---

**OFFER-M-02**
**Category:** Functional
**Title:** Successfully Add a New Offer
**Pre-conditions:**
- The user is on the "Add New Offers" page.
- Categories have been loaded successfully.
**Steps:**
1.  Fill in all required fields: "Offer Name", "Category", "Commission 1 (%)", and "Offer Description".
2.  Fill in optional fields like "Link", "Commission 1 Comment", "Commission 2 (%)", "Commission 2 Comment", "Video Link", and "Terms and Conditions".
3.  Click the "Add Offer" button.
**Expected Result:**
- A success message "✅ Offer created successfully!" is displayed.
- The form fields are cleared after a 2-second delay.

---

**OFFER-M-03**
**Category:** Validation
**Title:** Submit Form with Missing Required Fields
**Pre-conditions:**
- The user is on the "Add New Offers" page.
**Steps:**
1.  Leave the "Offer Name" or "Commission 1 (%)" field empty.
2.  Click the "Add Offer" button.
**Expected Result:**
- An error message is displayed (e.g., "⚠️ Commission 1 is required!").
- The form is not submitted.

---

**OFFER-M-04**
**Category:** Functional
**Title:** Category Dropdown Loading and Population
**Pre-conditions:**
- The component is mounting.
**Steps:**
1.  Observe the "Category" dropdown while categories are being fetched.
2.  Observe the "Category" dropdown after categories have been fetched.
**Expected Result:**
1.  The dropdown should initially show "Loading categories..." and be disabled.
2.  After loading, the dropdown should be enabled and populated with a list of active categories.

---

**OFFER-M-05**
**Category:** Functional
**Title:** Cancel Form Submission
**Pre-conditions:**
- The user has filled in some data in the form.
**Steps:**
1.  Click the "Cancel" button.
**Expected Result:**
- All form fields are reset to their initial empty state.
- Any success or error messages are cleared.

---

**OFFER-M-06**
**Category:** Validation
**Title:** Handle API Error on Category Fetch
**Pre-conditions:**
- The `getAllCategories` API call fails.
**Steps:**
1.  Load the "Add New Offers" page.
**Expected Result:**
- An error message "Failed to load categories" is displayed.
- The "Category" dropdown shows "Select Category" and is disabled.

---

**OFFER-M-07**
**Category:** Validation
**Title:** Handle API Error on Offer Creation
**Pre-conditions:**
- The `createOffer` API call fails on form submission.
**Steps:**
1.  Fill in all required fields.
2.  Click the "Add Offer" button.
**Expected Result:**
- An error message (e.g., "Failed to create offer. Please try again.") is displayed.
- The `loading` state is set to `false`, and the "Add Offer" button is re-enabled.