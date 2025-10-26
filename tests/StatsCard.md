# Test Cases for StatsCard Component

**Component Path:** `src/adminDashboard/components/StatsCard.jsx`

**Objective:** To verify the UI and data presentation of the `StatsCard` component.

---

### Manual Test Case Scenarios

**SC-M-01**
- **Category:** UI/Visual
- **Title:** Verify Card Rendering with Standard Data
- **Pre-conditions:** The component is rendered with a standard `stat` object prop containing a title, value, icon, color, and change percentage.
- **Steps:**
  1. Observe the component.
- **Expected Result:**
  1. The card should display the title, value, and change percentage in their designated places.
  2. An icon should be visible within a colored circle.
  3. The background color of the icon circle should match the `color` property from the prop.

---

**SC-M-02**
- **Category:** UI/Visual
- **Title:** Verify Hover Effect
- **Pre-conditions:** The component is rendered.
- **Steps:**
  1. Hover the mouse cursor over the card.
- **Expected Result:** The card should slightly increase in size (scale up) to provide visual feedback.

---

**SC-M-03**
- **Category:** UI/Visual
- **Title:** Verify with Different Data
- **Pre-conditions:** Render multiple `StatsCard` components with different `stat` objects (e.g., different titles, values, icons, colors).
- **Steps:**
  1. Observe all the rendered cards.
- **Expected Result:** Each card should correctly display its own unique data, and the icon colors should vary as defined in their respective props.

---

**SC-M-04**
- **Category:** Edge Case
- **Title:** Verify with Incomplete Data
- **Pre-conditions:** The component is rendered with a `stat` object where some properties are missing (e.g., `change` is null, `title` is an empty string).
- **Steps:**
  1. Observe the component.
- **Expected Result:** The component should not crash. It should render gracefully, simply not displaying the elements for which data is missing. For example, if `change` is missing, the percentage change element should not be rendered.
