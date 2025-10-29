# Manual Test Cases for ProfileOverview

**Component:** `src/userDashboard/layouts/ProfileOverview.jsx`

**Objective:** To verify the display and navigation functionality of the user's profile overview page.

---

### Test Case 1: Render the Profile Overview Page

| Test Case ID | TC_PROFILEOVERVIEW_01                              |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the page renders correctly with all its default elements. |
| **Steps**      | 1. Navigate to the `/user/profile-overview` page. |
| **Expected Result** | The page should display:<br>- The title "Profile Settings Overview".<br>- A profile header card with a banner, avatar, user name, email, and phone number.<br>- A KYC verification status card.<br>- An "Update Profile / KYC" button.<br>- A "Campaign Waala Card" section. |

---

### Test Case 2: Navigation to KYC Details

| Test Case ID | TC_PROFILEOVERVIEW_02                              |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the "Update Profile / KYC" button navigates to the correct page. |
| **Steps**      | 1. On the profile overview page, click the "Update Profile / KYC" button. |
| **Expected Result** | The user should be navigated to the `/user/kyc-details` page. |

---

### Test Case 3: Verify Static Content

| Test Case ID | TC_PROFILEOVERVIEW_03                              |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the hardcoded user information is displayed correctly. |
| **Steps**      | 1. Observe the content in the profile header card. |
| **Expected Result** | The card should display the name "John Doe", the email "john.doe@campaignwaala.com", and the phone number "+91 98765 43210". |

---

### Test Case 4: Dark Mode Rendering

| Test Case ID | TC_PROFILEOVERVIEW_04                              |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the page displays correctly in dark mode. |
| **Prerequisites** | The `darkMode` prop is set to `true`. |
| **Steps**      | 1. View the page with dark mode enabled. |
| **Expected Result** | All elements, including the background, text, and cards, should have colors consistent with the dark theme. |
