# Manual Test Cases for UserDashboardLayout

**Component:** `src/userDashboard/layouts/UserDashboardLayout.jsx`

**Objective:** To verify that the main user dashboard layout correctly orchestrates its child components (Navbar, Sidebar, etc.) and manages the sidebar's state.

---

### Test Case 1: Render the Main Layout

| Test Case ID | TC_LAYOUT_01                                       |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the layout renders all its primary child components. |
| **Steps**      | 1. Log in as a 'user' and navigate to any page within the user dashboard (e.g., `/user`). |
| **Expected Result** | The page should display:<br>- The `Navbar` component at the top.<br>- The `Sidebar` component on the left.<br>- The main content area, which renders the child route via `<Outlet />`.<br>- The `Footer` component at the bottom. |

---

### Test Case 2: Sidebar Toggle Functionality

| Test Case ID | TC_LAYOUT_02                                       |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the sidebar can be collapsed and expanded from both the `Navbar` and the `Sidebar` itself. |
| **Steps**      | 1. Click the collapse button (left arrow) inside the `Sidebar`.<br>2. Observe the layout.<br>3. Click the expand button (right arrow) inside the `Sidebar`.<br>4. Observe the layout.<br>5. On a mobile-sized screen, click the hamburger menu icon in the `Navbar`.<br>6. Observe the layout. |
| **Expected Result** | - Clicking the collapse/expand button in the `Sidebar` should toggle its width, and the main content area's margin should adjust accordingly.<br>- Clicking the hamburger icon in the `Navbar` should also toggle the sidebar's state. The `toggleSidebar` function should be correctly passed as a prop and triggered. |

---

### Test Case 3: Dark Mode Propagation

| Test Case ID | TC_LAYOUT_03                                       |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the dark mode state is correctly passed down to child components. |
| **Steps**      | 1. In the `Navbar`, click the theme toggle button to enable dark mode. |
| **Expected Result** | The `darkMode` prop should be passed down to `Navbar`, `Sidebar`, and `Footer`, and their appearances should all update to reflect the dark theme. |

---

### Test Case 4: Child Route Rendering (Outlet)

| Test Case ID | TC_LAYOUT_04                                       |
|--------------|----------------------------------------------------|
| **Description**  | Verify that the `<Outlet />` correctly renders the content of the active child route. |
| **Steps**      | 1. Navigate to `/user/dashboard`.<br>2. Navigate to `/user/all-leads`. |
| **Expected Result** | - When at `/user/dashboard`, the content of the `Dashboard` component should be visible in the main content area.<br>- When at `/user/all-leads`, the content of the `AllLeads` component should be visible in the main content area. |
