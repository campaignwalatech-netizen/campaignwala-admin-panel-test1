# Manual Test Cases for Dashboard (User)

**Component:** `src/userDashboard/components/Dashboard.jsx`

**Objective:** To verify the display and functionality of the user dashboard, including stats, categories, and navigation.

---

### Test Case 1: Render the Dashboard

| Test Case ID | TC_DASHBOARD_01                                    |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the dashboard renders correctly in its default state. |
| **Steps**      | 1. Log in as a 'user' and navigate to the user dashboard (`/user`). |
| **Expected Result** | The page should display:<br>- A welcome message (e.g., "Welcome Back, #user!").<br>- A set of statistics cards (e.g., "Current Balance", "Total Earnings").<br>- A banner section.<br>- A section for product/category cards. |

---

### Test Case 2: API Loading State

| Test Case ID | TC_DASHBOARD_02                                    |
|--------------|----------------------------------------------------|
| **Description**  | Verify that a loading indicator is shown while categories are being fetched. |
| **Steps**      | 1. Navigate to the user dashboard.<br>2. Observe the category section while the API call is in progress (a delay may need to be simulated). |
| **Expected Result** | A loading spinner and the text "Loading categories..." should be displayed in the category section. |

---

### Test Case 3: API Success - Categories Displayed

| Test Case ID | TC_DASHBOARD_03                                    |
|--------------|----------------------------------------------------|
| **Description**  | Verify that categories are displayed correctly after a successful API call. |
| **Prerequisites** | The categories API should return a list of categories. |
| **Steps**      | 1. Navigate to the user dashboard. |
| **Expected Result** | A grid of category cards should be displayed, each showing the category's name and description. |

---

### Test Case 4: API Failure or No Categories - Fallback Display

| Test Case ID | TC_DASHBOARD_04                                    |
|--------------|----------------------------------------------------|
| **Description**  | Verify that a fallback set of offers is displayed if the API fails or returns no categories. |
| **Prerequisites** | The categories API returns an error or an empty list. |
| **Steps**      | 1. Navigate to the user dashboard. |
| **Expected Result** | A grid of hardcoded fallback offer cards should be displayed instead of the category cards. |

---

### Test Case 5: Stats Card Navigation

| Test Case ID | TC_DASHBOARD_05                                    |
|--------------|----------------------------------------------------|
| **Description**  | Verify that clicking on the statistics cards navigates to the correct pages. |
| **Steps**      | 1. On the dashboard, click the "Current Balance" card.<br>2. Go back. Click the "Total Earnings" card. |
| **Expected Result** | - Clicking "Current Balance" should navigate to `/user/wallet-withdrawl`.<br>- Clicking "Total Earnings" should navigate to `/user/total-balance`. |

---

### Test Case 6: Category Card Navigation

| Test Case ID | TC_DASHBOARD_06                                    |
|--------------|----------------------------------------------------|
| **Description**  | Verify that clicking on a category card navigates to the category-specific offers page. |
| **Prerequisites** | The dashboard has successfully loaded and displayed category cards. |
| **Steps**      | 1. Click on any of the category cards. |
| **Expected Result** | The user should be navigated to `/user/category-offers/:categoryId`, and the category details should be passed in the route's state. |

---

### Test Case 7: Dark Mode

| Test Case ID | TC_DASHBOARD_07                                    |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the component renders correctly in dark mode. |
| **Prerequisites** | The `darkMode` prop is set to `true`. |
| **Steps**      | 1. View the dashboard with dark mode enabled. |
| **Expected Result** | The component should have dark background colors and light text colors, consistent with the dark mode theme. All elements should be clearly visible. |
