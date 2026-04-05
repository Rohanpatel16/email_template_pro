# Email Template Pro - Issue Report

This document outlines the bugs, usability issues, and UI inconsistencies identified during a comprehensive audit of the Email Template Pro application.

## 🔴 High Priority: Bugs & Functional Issues

### 1. Missing Notification System (Silent Failures)
- **Problem**: The application calls `this.showNotification()` (e.g., when copying AI responses or encountering errors), but the method is not defined in `index.html`. This leads to silent failures and a poor user experience as they receive no feedback on their actions.
- **Impact**: Users don't know if a copy was successful or why an AI request failed.
- **Proposed Fix**: Implement a standard toast notification system in `index.html` and ensure the `#notification` container exists.

### 2. Highlighting Misalignment in Editor
- **Problem**: The spam highlighting backdrop (powered by `highlight-within-textarea`) often loses alignment with the actual text in the textarea, especially during window resizing or long content scrolling.
- **Impact**: Highlights appear over the wrong words, making the spam filter confusing or useless.
- **Proposed Fix**: Sync `line-height`, `font-family`, `padding`, and `scrollbar` behavior perfectly between the textarea and the backdrop. Add a resize listener to re-calculate alignment.

### 3. AI Error Handling (API Issues)
- **Problem**: If the Gemini API key is missing or invalid, the error is logged to the console but not shown to the user.
- **Impact**: Users might think the "AI is working..." indefinitely or that the button is broken.
- **Proposed Fix**: Update `initGeminiClient` and AI action methods to catch errors and display them via the notification system.

### 4. Template Library Functionality (Deletion & Preview)
- **Problem**: The "Delete" button in the Templates Library (`templates.html`) does not remove templates. Additionally, the "Preview" and "Export HTML" buttons are completely non-functional.
- **Impact**: Users cannot manage their template library effectively.
- **Proposed Fix**: Correct the event listeners and logic in `templates.html` to properly handle deletion from `localStorage` and implement the preview/export modals.

### 5. Spam Filter Case Sensitivity & Common Keywords
- **Problem**: The current spam keyword list misses some common spam variations (e.g., "CASH" vs "cash") or doesn't consistently flag phrases.
- **Impact**: Inconsistent spam scores.
- **Proposed Fix**: Ensure all regex matches in `spam-filter.js` use the `i` (case-insensitive) flag. Expand the `SPAM_KEYWORDS` list based on modern industry standards.

---

## 🟡 Medium Priority: UI & Usability Improvements

### 6. Spam Breakdown Visibility
- **Problem**: The detailed breakdown of why a score is high is often hidden or not descriptive enough for "borderline" cases.
- **Impact**: Users see a score but don't know exactly which words triggered it or why.
- **Proposed Fix**: Make the breakdown panel always visible if any keywords are detected. Show the category name next to highlighted words in the breakdown list.

### 7. Tailwind `@apply` Warnings
- **Problem**: Several "Unknown at rule @apply" warnings appear in the head of `index.html`. This is because the Tailwind CDN doesn't support `@apply` in raw `<style>` blocks.
- **Impact**: Potential styling inconsistencies if some `@apply` rules fail to resolve (though most atomic classes work fine).
- **Proposed Fix**: Replace `@apply` in CSS with standard CSS or atomic Tailwind classes in the HTML.

### 8. Variable Placeholder UX
- **Problem**: Variables in the editor (e.g., `{{full_name}}`) look like plain text.
- **Impact**: Hard to distinguish variables from regular text at a glance.
- **Proposed Fix**: Use a subtle background color or font weight for detected variables in the textarea backdrop (highlighter).

### 9. Template Save Modal Latency
- **Problem**: The "Save Template" modal sometimes fails to capture the full input string if typing begins immediately after the modal appears.
- **Impact**: Frustrated users having to re-type template names.
- **Proposed Fix**: Add a small autofocus delay or ensure the input is focused correctly once the modal animation finishes.

---

## 🟢 Low Priority: Tech Debt & Polish

### 8. HTML Source Editor Polish
- **Problem**: The black textarea for HTML editing is functional but lacks syntax highlighting and advanced editing features.
- **Proposed Fix**: Integrate a lightweight code editor like `Prism.js` or `CodeMirror` if advanced HTML editing is a core requirement.

### 9. Duplicate Variable Logic
- **Problem**: Adding variables with the same name might cause unpredictable behavior in the replacement logic.
- **Proposed Fix**: Add a check to prevent duplicate variable keys.
