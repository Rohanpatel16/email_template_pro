# Template Editor Pro

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A professional, feature-rich email template editor with live preview, real-time spam checking, and powerful AI enhancements powered by the Google Gemini API.

## Key Features

-   **Rich Editor & Live Preview:** Edit your email in a rich text editor or directly in HTML and see a live, interactive preview that updates as you type.
-   **Dynamic Variables:** Define and use custom variables like `{{full_name}}` or `{{company_name}}` that are dynamically replaced in the preview.
-   **Real-Time Spam Analysis:** Get an instant spam score and see potential trigger words highlighted directly in your content as you write.
-   **AI-Powered Enhancements (Gemini API):**
    -   **Optimize Content:** Rewrite your email for better engagement and clarity.
    -   **Get Suggestions:** Receive actionable feedback on your subject line, opening, CTA, and deliverability.
    -   **Adjust Tone:** Instantly change the tone of your email (e.g., professional, casual, urgent).
    -   **Generate Subject Lines:** Create multiple compelling subject line options from your email content.
    -   **Rewrite Spam Words:** Automatically replace spammy phrases with safer alternatives.
-   **Template Management:** Save, load, and manage your templates in a dedicated library.
-   **Highly Customizable:** Configure your Gemini API key, AI prompts, custom spam words, and email signature through a detailed settings page.

## Getting Started

This is a pure HTML, CSS, and JavaScript application with no server-side dependencies. You can run it directly in your browser.

### 1. Run Locally

The easiest way to run the app is to use a simple local server to avoid any potential browser restrictions with `file:///` URLs.

**Using VS Code Live Server:**
1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in Visual Studio Code.
2.  Open the project folder in VS Code.
3.  Right-click on `index.html` and select "Open with Live Server".

**Using a simple Python server:**
1.  Navigate to the project directory in your terminal.
2.  Run the command: `python -m http.server` (for Python 3) or `python -m SimpleHTTPServer` (for Python 2).
3.  Open your browser and go to `http://localhost:8000`.

### 2. Configure Your API Key

Before you can use the AI features, you need to add your Google Gemini API key.

1.  Open the application and click the **Settings** button in the top-right corner (or navigate directly to `settings.html`).
2.  In the "Gemini API Configuration" section, paste your API key into the input field. You can get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Click **"Save Gemini Configuration"**. The key is saved securely in your browser's local storage.

You're all set! You can now use all the AI-powered features in the editor.
