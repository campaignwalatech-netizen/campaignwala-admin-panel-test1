# Manual Test Cases for RejectedLeads

**Component:** `src/userDashboard/layouts/RejectedLeads.jsx`

**Objective:** To verify the display, filtering, and navigation functionality of the rejected leads page.

---

### Test Case 1: Render the Rejected Leads Page

| Test Case ID | TC_REJECTEDLEADS_01                                |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the page renders correctly with its default elements. |
| **Steps**      | 1. Navigate to the `/user/rejected-leads` page. |
| **Expected Result** | The page should display:<br>- The title "Rejected Leads".<br>- A category filter dropdown.<br>- A search input field.<br>- Tabs for "Pending", "Approved", and "Rejected" leads, with "Rejected" being active.<br>- A table showing the list of rejected leads with columns like "Lead ID", "Name", "Reason", etc. |

---

### Test Case 2: Tab Navigation

| Test Case ID | TC_REJECTEDLEADS_02                                |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the tabs navigate to the correct lead pages. |
| **Steps**      | 1. On the rejected leads page, click the "Pending" tab.<br>2. Go back. Click the "Approved" tab. |
| **Expected Result** | - Clicking the "Pending" tab should navigate the user to `/user/pending-leads`.<br>- Clicking the "Approved" tab should navigate the user to `/user/approved-leads`. |

---

### Test Case 3: Category Filter

| Test Case ID | TC_REJECTEDLEADS_03                                |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the leads can be filtered by category. |
| **Steps**      | 1. Select a specific category from the dropdown (e.g., "HDFC Bank").<br>2. Observe the table. |
| **Expected Result** | The table should update to show only the leads that belong to the selected category. In this case, only the lead for "Jane Smith" should be visible. |

---

### Test Case 4: Search Filter

| Test Case ID | TC_REJECTEDLEADS_04                                |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the leads can be filtered by a search query (name, offer, or contact). |
| **Steps**      | 1. Type a name into the search input (e.g., "Robert").<br>2. Observe the table.<br>3. Clear the search and type a contact number (e.g., "9001122334").<br>4. Observe the table. |
| **Expected Result** | - When searching for "Robert", only the lead for "Robert Johnson" should be visible.<br>- When searching for "9001122334", only the lead for "Maria Garcia" should be visible. |

---

### Test Case 5: No Results Found

| Test Case ID | TC_REJECTEDLEADS_05                                |
|--------------|----------------------------------------------------|
| **Description**  | Verify that a "no results" message is shown when filters yield no matches. |
| **Steps**      | 1. Type "nonexistent" into the search input. |
| **Expected Result** | The table body should display a message like "No rejected leads found." |
