
# Test Cases for Loader Component

**Component:** `src/components/Loader.jsx`

---

### 1. Basic Rendering

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| LDR-001 | It should render a medium-sized loader with default text. | 1. Render the `Loader` component with default props. | A spinning loader animation should be visible, with the text "Loading..." displayed below it. The loader should have medium size classes. |
| LDR-002 | It should render without text if the `text` prop is an empty string. | 1. Render the component with `text=""`. | Only the spinning loader animation should be visible; no text should be rendered. |

---

### 2. Sizes

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| LDR-003 | It should render a small loader. | 1. Render the component with `size="sm"`. | The loader should have the CSS classes for the small size (`w-4`, `h-4`), and the text should be small (`text-sm`). |
| LDR-004 | It should render a medium loader. | 1. Render the component with `size="md"`. | The loader should have the CSS classes for the medium size (`w-8`, `h-8`), and the text should be medium (`text-base`). |
| LDR-005 | It should render a large loader. | 1. Render the component with `size="lg"`. | The loader should have the CSS classes for the large size (`w-12`, `h-12`), and the text should be large (`text-lg`). |

---

### 3. Customization

| Test Case ID | Description | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| LDR-006 | It should display custom text. | 1. Render the component with `text="Please wait"`. | The text "Please wait" should be displayed below the loader. |
| LDR-007 | It should accept a custom `className`. | 1. Render the component with a `className` prop, e.g., `className="my-custom-loader"`. | The loader's container `div` should have "my-custom-loader" in its class list. |

---
