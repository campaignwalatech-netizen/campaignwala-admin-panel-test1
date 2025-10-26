# Test Cases for AdminSidebar Component

**Component Path:** `src/adminDashboard/components/AdminSidebar.jsx`

**Objective:** To verify the functionality, UI, responsiveness, and accessibility of the `AdminSidebar` component.

---

### Manual Test Case Scenarios

**AS-M-01**
- **Category:** UI/Visual
- **Title:** Verify Sidebar on Large Screens
- **Pre-conditions:** The application is viewed on a large screen (desktop).
- **Steps:**
  1. Navigate to a page where the `AdminSidebar` is displayed.
- **Expected Result:** The sidebar should be permanently visible on the left side of the screen.

---

**AS-M-02**
- **Category:** UI/Visual
- **Title:** Verify Sidebar is Hidden on Small Screens
- **Pre-conditions:** 
  - The application is viewed on a small screen (mobile or tablet).
  - The sidebar is initially closed (`sidebarOpen` is `false`).
- **Steps:**
  1. Navigate to a page where the `AdminSidebar` is present.
- **Expected Result:** The sidebar should be hidden off-screen.

---

**AS-M-03**
- **Category:** Functional
- **Title:** Open and Close Sidebar on Small Screens
- **Pre-conditions:** The application is viewed on a small screen.
- **Steps:**
  1. Open the sidebar (e.g., by clicking a menu button in the header).
  2. Observe the sidebar.
  3. Click the 'X' button at the top of the sidebar.
- **Expected Result:**
  1. The sidebar should slide in from the left and become visible.
  2. The sidebar should slide out to the left and become hidden.

---

**AS-M-04**
- **Category:** Functional
- **Title:** Verify Navigation Link Clicks
- **Pre-conditions:** The sidebar is visible.
- **Steps:**
  1. Click on a navigation link (e.g., "Users").
- **Expected Result:** 
  1. The application should navigate to the corresponding path (e.g., `/admin/users`).
  2. On small screens, the sidebar should close automatically after the click.

---

**AS-M-05**
- **Category:** UI/Visual
- **Title:** Verify Active Navigation Link Highlighting
- **Pre-conditions:** The application is currently on a specific path (e.g., `/admin/users`).
- **Steps:**
  1. Observe the sidebar navigation links.
- **Expected Result:** The link corresponding to the current path ("Users") should have a different background color and text color to indicate it is active.

---

**AS-M-06**
- **Category:** Functional
- **Title:** Verify Logout Button
- **Pre-conditions:** The sidebar is visible.
- **Steps:**
  1. Click the "Logout" button at the bottom of the sidebar.
- **Expected Result:** The `handleLogout` function should be called, initiating the user logout process.

---

**AS-M-07**
- **Category:** UI/Visual
- **Title:** Verify User Information Display
- **Pre-conditions:** The `userPhone` prop is passed a valid phone number (e.g., "1234567890").
- **Steps:**
  1. Observe the user info section at the bottom of the sidebar.
- **Expected Result:** The user's initial ('1') and the full phone number should be displayed correctly.

---

**AS-M-08**
- **Category:** Edge Case
- **Title:** Verify User Info with Missing `userPhone`
- **Pre-conditions:** The `userPhone` prop is `null` or `undefined`.
- **Steps:**
  1. Observe the user info section.
- **Expected Result:** The user initial should default to 'U', and no phone number should be displayed. The component should not crash.

---

**AS-M-09**
- **Category:** UI/Visual
- **Title:** Verify Dark Mode Styling
- **Pre-conditions:** The application's theme is set to "dark mode".
- **Steps:**
  1. Render the component in dark mode.
- **Expected Result:** The sidebar background, text, and button colors should change to the specified dark mode styles.

---

**AS-M-10**
- **Category:** Accessibility
- **Title:** Screen Reader Compatibility
- **Pre-conditions:** A screen reader is active.
- **Steps:**
  1. Navigate through the sidebar elements using the screen reader.
- **Expected Result:** The screen reader should announce the logo, each navigation link's purpose, the user's information, and the logout button clearly and logically.
