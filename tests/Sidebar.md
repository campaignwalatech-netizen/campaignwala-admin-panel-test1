# Test Cases for Sidebar Component

**Component Path:** `src/adminDashboard/components/Sidebar.jsx`

**Objective:** To verify the UI, responsiveness, navigation, and state management of the multi-level sidebar.

---

### Manual Test Case Scenarios

**S-M-01**
- **Category:** UI/Visual
- **Title:** Verify Sidebar on Large Screens
- **Pre-conditions:** The application is viewed on a large screen (desktop).
- **Steps:**
  1. Observe the layout.
- **Expected Result:** The sidebar should be permanently visible on the left, and the main content should be to its right. The floating menu button should not be visible.

---

**S-M-02**
- **Category:** Functional
- **Title:** Open and Close Sidebar on Small Screens
- **Pre-conditions:** The application is viewed on a small screen (mobile).
- **Steps:**
  1. The sidebar should be hidden initially. Click the floating menu icon.
  2. Observe the result.
  3. Click the 'X' icon that appears in the same location.
- **Expected Result:**
  1. The sidebar should slide in from the left.
  2. The sidebar should slide out to the left.

---

**S-M-03**
- **Category:** Functional
- **Title:** Close Sidebar via Backdrop Click
- **Pre-conditions:** On a small screen, the sidebar is open.
- **Steps:**
  1. Click on the semi-transparent backdrop to the right of the sidebar.
- **Expected Result:** The sidebar should close.

---

**S-M-04**
- **Category:** Functional
- **Title:** Expand and Collapse Submenus
- **Pre-conditions:** The sidebar is visible.
- **Steps:**
  1. Click on a menu item with a submenu (e.g., "Manage Account").
  2. Observe the result.
  3. Click the same menu item again.
- **Expected Result:**
  1. The submenu items ("All Offers", etc.) should appear below the parent, and the chevron icon should point down.
  2. The submenu should disappear, and the chevron icon should point right.

---

**S-M-05**
- **Category:** Functional
- **Title:** Verify Direct Link Navigation
- **Pre-conditions:** The sidebar is visible.
- **Steps:**
  1. Click on a menu item without a submenu (e.g., "Payment Withdrawal List").
- **Expected Result:** The application should navigate to the `/admin/payment-withdrawal` page.

---

**S-M-06**
- **Category:** Functional
- **Title:** Verify Submenu Link Navigation
- **Pre-conditions:** A submenu is expanded.
- **Steps:**
  1. Click on a submenu item (e.g., "All Categories").
- **Expected Result:** The application should navigate to the `/admin/all-categories` page.

---

**S-M-07**
- **Category:** UI/Visual
- **Title:** Verify Active Link Highlighting (Direct Link)
- **Pre-conditions:** The user is on the `/admin/payment-withdrawal` page.
- **Steps:**
  1. Observe the "Payment Withdrawal List" menu item.
- **Expected Result:** The item should have a distinct background color and/or font weight to indicate it is active.

---

**S-M-08**
- **Category:** UI/Visual
- **Title:** Verify Active Link Highlighting (Submenu Link)
- **Pre-conditions:** The user is on the `/admin/add-category` page.
- **Steps:**
  1. Observe the "Manage Category" parent item and the "Add Category" submenu item.
- **Expected Result:** The "Add Category" link should be highlighted. The parent menu ("Manage Category") should be expanded.

---

**S-M-09**
- **Category:** Functional
- **Title:** Verify Auto-Expansion of Parent Menu
- **Pre-conditions:** The sidebar is rendered for the first time on a page with a URL corresponding to a submenu item (e.g., `/admin/all-slides`).
- **Steps:**
  1. Observe the sidebar.
- **Expected Result:** The parent menu ("Slide Board") should be automatically expanded to show the active "All Slides" link.

---

**S-M-10**
- **Category:** Functional
- **Title:** Verify Sidebar Closes on Navigation (Small Screen)
- **Pre-conditions:** On a small screen, the sidebar is open.
- **Steps:**
  1. Click any navigation link (e.g., "Dashboard" or a submenu item).
- **Expected Result:** The sidebar should close automatically after the click.

---

**S-M-11**
- **Category:** Accessibility
- **Title:** Verify Keyboard Navigation
- **Pre-conditions:** The sidebar is visible.
- **Steps:**
  1. Use the `Tab` key to navigate through all interactive elements (parent menu buttons, links).
  2. When a parent menu button is focused, press `Enter`.
  3. When a link is focused, press `Enter`.
- **Expected Result:**
  1. Focus should move logically through the sidebar.
  2. The submenu should expand/collapse.
  3. Navigation to the link's path should occur.
