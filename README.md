
# Professional AI-Powered Email Template Editor

An advanced, client-side web application for creating, analyzing, and optimizing professional email templates. It features a real-time spam checker, dynamic template variables, and powerful AI enhancements powered by the Google Gemini API to elevate your email marketing campaigns.

All data, including your API key and saved templates, is stored locally in your browser's `localStorage`. No information is ever sent to a server.

## ✨ Key Features

### 📝 Core Editor
*   **Dual-View Editing**: Seamlessly switch between a raw **HTML editor** and a **live WYSIWYG preview**. Changes in one are instantly reflected in the other.
*   **Dynamic Variables**: Define and manage template variables like `{{name}}` or `{{company_name}}` for easy personalization. The preview updates instantly as you change variable values.
*   **Rich Text Toolbar**: A complete set of formatting tools, including bold, italics, lists, alignment, links, and color pickers.
*   **Auto-Save**: Never lose your work. The editor automatically saves your progress to your browser's local storage.

### 🛡️ Advanced Spam Analysis
*   **Real-time Spam Scoring**: As you type, the editor analyzes your content against a comprehensive list of over 400 known spam trigger words and phrases.
*   **Categorized Feedback**: Get a detailed breakdown of potential issues, categorized into areas like _Urgency_, _Shady_, _Money_, and _Overpromise_.
*   **In-Editor Highlighting**: The visual preview highlights potential spam words, making them easy to find and fix.
*   **Custom Spam Words**: Add your own custom keywords and phrases to the spam checker via the Settings page.

### 🤖 Gemini AI-Powered Toolkit
*   **Optimize Content**: One-click optimization to rewrite your entire email for better clarity, engagement, and professionalism.
*   **Get Suggestions**: Receive actionable, expert-level feedback on your subject line, opening, call-to-action, and overall deliverability.
*   **Adjust Tone**: Instantly rewrite your content to match a specific tone, such as "Professional", "Friendly", or "Urgent".
*   **Generate Subject Lines**: Create 5 compelling, high-converting subject line options based on your email's content.
*   **Rewrite Spam Words**: Intelligently replace detected spam words with safer, more effective alternatives without changing the core message.

### 📂 Comprehensive Template Management
*   **Save & Load**: Save your complete templates, including HTML, subject line, and variables, for later use.
*   **Dedicated Templates Library**: A separate page (`templates.html`) to browse, preview, use, delete, and export all your saved templates.
*   **Import/Export**: Backup your templates by exporting them as JSON files, or share them with others.

### ⚙️ In-Depth Configuration
*   **Custom AI Prompts**: Power users can modify the underlying prompts used for every AI feature to tailor the output to their specific needs.
*   **API Configuration**: Set your Gemini API key and adjust the AI's "temperature" (creativity level).
*   **Email Signature**: Define a global HTML email signature that can be quickly inserted into any template.
*   **Full Reset**: Easily reset all application settings to their default state.

## 🚀 Getting Started

This is a pure client-side application. No build process is required.

### Prerequisites
*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   A Google Gemini API Key. You can get one for free from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Setup
1.  Clone this repository or download the source files.
2.  Open the `index.html` file in your web browser.
3.  Click the **Settings** button in the top-right corner.
4.  In the "Gemini API Configuration" section, enter your Gemini API key.
5.  Click **"Save Gemini Configuration"**.

The AI features are now enabled and ready to use!

## 📋 How to Use

1.  **Start Editing**: Begin by editing the default template in the HTML editor on the left or by directly typing into the visual preview on the right.
2.  **Define Variables**: Add or modify the template variables on the left. Use the `{{variable_name}}` syntax in your HTML and subject line.
3.  **Check Spam Score**: As you write, monitor the Spam Checker panel below the HTML editor for real-time feedback and an overall score.
4.  **Enhance with AI**: Use the "AI-Powered Enhancements" buttons to optimize your content, generate subject lines, or get suggestions.
5.  **Save Your Work**: Once you're satisfied, click **"Save Template"** and give it a name.
6.  **Manage Templates**: Click **"Templates Library"** to view and manage all your saved work.

## 🛠️ Technology Stack

*   **Frontend**: HTML5, CSS3, JavaScript (ES6)
*   **Styling**: Tailwind CSS for utility-first styling.
*   **AI**: Google Gemini API via `@google/generative-ai`.
*   **Libraries**: jQuery for DOM manipulation and the `highlight-within-textarea` plugin.

## 📁 File Structure

```
.
├── index.html              # Main editor interface
├── settings.html           # Application settings page
├── templates.html          # Template library page
├── readme.md               # This file
├── shared-styles.css       # CSS styles shared across all pages
├── shared-utils.js         # Shared JavaScript utility functions
└── spam-filter.js          # Contains the spam checker logic and keyword list
```
