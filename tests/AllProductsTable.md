# Test Cases for AllOffersTable Component

**Component Path:** `src/adminDashboard/forms/AllProductsTable.jsx`

**Objective:** To verify the functionality, UI, and robustness of the `AllOffersTable` component, ensuring admins can manage offers effectively.

---

## Manual Test Case Scenarios

**OFFER-TABLE-M-01**
**Category:** Functional
**Title:** Render and Fetch Offers
**Pre-conditions:**
- User is authenticated as an admin.
- The API is expected to return a list of offers.
**Steps:**
1.  Navigate to the page containing the `AllOffersTable` component.
2.  Observe the initial state and the final rendered table.
**Expected Result:**
- A loading indicator is shown initially.
- The title "All Offers" is visible.
- Once loaded, the table is populated with offer data, showing columns like Image, Date, Offers Name, Category, etc.

---

**OFFER-TABLE-M-02**
**Category:** Functional
**Title:** Search for an Offer
**Pre-conditions:**
- The offers table is populated.
**Steps:**
1.  Enter a known offer name into the search input field.
2.  Observe the table.
**Expected Result:**
- The table updates to show only the offers that match the search term.

---

**OFFER-TABLE-M-03**
**Category:** Functional
**Title:** Filter Offers by Approval Status
**Pre-conditions:**
- The table is populated with both approved and pending offers.
**Steps:**
1.  Click the filter dropdown and select "Approved".
2.  Observe the table.
3.  Change the filter to "Pending Approval".
**Expected Result:**
1.  The table displays only offers with an "Approved" status.
2.  The table displays only offers with a "Pending" status.

---

**OFFER-TABLE-M-04**
**Category:** Functional
**Title:** Edit an Offer (Open and Cancel Modal)
**Pre-conditions:**
- The offers table is populated.
**Steps:**
1.  Click the `Edit2` (pencil) icon on an offer row.
2.  Observe the modal.
3.  Click the "Cancel" button or the "X" icon.
**Expected Result:**
1.  An "Edit Offer" modal opens, pre-populated with the data of the selected offer.
2.  The modal closes without saving any changes.

---

**OFFER-TABLE-M-05**
**Category:** Functional
**Title:** Confirm and Execute Edit
**Pre-conditions:**
- The "Edit Offer" modal is open.
**Steps:**
1.  Modify a field, such as the "Offer Name".
2.  Click the "Update Offer" button.
**Expected Result:**
- A loading indicator appears on the button.
- A success alert appears: `"<Offer Name>" updated successfully!`.
- The table row for the offer is updated with the new data.
- The modal closes.

---

**OFFER-TABLE-M-06**
**Category:** Functional
**Title:** Delete an Offer (Open and Cancel Modal)
**Pre-conditions:**
- The offers table is populated.
**Steps:**
1.  Click the `Trash2` (trash can) icon on an offer row.
2.  Observe the confirmation modal.
3.  Click the "Cancel" button.
**Expected Result:**
1.  A modal appears with the title "Confirm Delete".
2.  The modal closes, and no action is taken.

---

**OFFER-TABLE-M-07**
**Category:** Functional
**Title:** Confirm and Execute Deletion
**Pre-conditions:**
- The delete confirmation modal is open.
**Steps:**
1.  Click the "Delete" button inside the modal.
**Expected Result:**
- A loading indicator appears on the button.
- A success alert appears: `"<Offer Name>" deleted successfully!`.
- The offer row is removed from the table.
- The modal closes.

---

**OFFER-TABLE-M-08**
**Category:** Functional
**Title:** Copy Offer Link
**Pre-conditions:**
- An offer in the table has a valid link.
**Steps:**
1.  Click the `LinkIcon` in the "Link" column for that offer.
**Expected Result:**
- A success alert appears: "Link copied to clipboard!".
- The offer's link is copied to the user's clipboard.

---

**OFFER-TABLE-M-09**
**Category:** Functional
**Title:** Export Offers
**Pre-conditions:**
- The offers table is populated.
**Steps:**
1.  Click the "Export" button.
**Expected Result:**
- A CSV file named `offers_YYYY-MM-DD.csv` is downloaded.
- A success alert "Offers exported successfully!" is shown.
