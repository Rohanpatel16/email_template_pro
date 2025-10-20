/**
 * Shared Utilities for Email Template Editor
 */

// Constants
const CONSTANTS = {
    // Storage keys
    STORAGE_KEYS: {
        GEMINI_API_KEY: 'gemini-api-key',
        SYSTEM_PROMPT: 'system-prompt',
        EMAIL_TEMPLATES: 'emailTemplates',
        EMAIL_EDITOR_DATA: 'emailEditorData',
        CUSTOM_SPAM_WORDS: 'custom-spam-words',
        EMAIL_SIGNATURE: 'email-signature',
        TEMPLATE_TO_LOAD: 'template-to-load',
        INSERT_SIGNATURE_FLAG: 'insert-signature-flag'
    },
    
    // Timing
    AUTO_SAVE_INTERVAL_MS: 30000, // 30 seconds
    NOTIFICATION_DURATION_MS: 2500,
    COPY_FEEDBACK_DURATION_MS: 2000,
    FOCUS_DELAY_MS: 100,
    BORDER_FLASH_DURATION_MS: 1500,
    DEBOUNCE_DELAY_MS: 300,
    
    // Validation
    MAX_TEMPLATE_NAME_LENGTH: 100,
    MAX_SUBJECT_LINE_LENGTH: 60,
    MIN_SUBJECT_LINE_LENGTH: 5,
    MAX_SUBJECT_LINES: 5,
    
    // AI Model
    DEFAULT_AI_MODEL: 'gemini-2.5-flash-lite',
    
    // Analytics
    SPAM_KEYWORDS_THRESHOLD_HIGH: 2,
    SPAM_KEYWORDS_THRESHOLD_MEDIUM: 0,
    OPTIMAL_EMAIL_WORDS_MIN: 50,
    OPTIMAL_EMAIL_WORDS_MAX: 300
};

// Make constants available globally
window.EMAIL_EDITOR_CONSTANTS = CONSTANTS;

/**
 * Shared utility functions
 */
const EmailEditorUtils = {
    /**
     * Show a notification message
     * @param {string} message - The message to display
     * @param {string} type - Type of notification ('success', 'error', 'warning', 'info')
     * @param {number} duration - Duration in milliseconds
     */
    showNotification(message, type = 'success', duration = CONSTANTS.NOTIFICATION_DURATION_MS) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        if (!notification) {
            console.warn('Notification element not found');
            return;
        }
        
        // Set icon based on type
        let icon = 'fa-check-circle';
        let bgColor = 'var(--color-carrot-orange)';
        
        switch (type) {
            case 'error':
                icon = 'fa-exclamation-circle';
                bgColor = 'var(--color-poppy)';
                break;
            case 'warning':
                icon = 'fa-exclamation-triangle';
                bgColor = 'var(--color-carrot-orange)';
                break;
            case 'info':
                icon = 'fa-info-circle';
                bgColor = 'var(--color-blue-violet)';
                break;
        }
        
        if (notificationText) {
            notificationText.textContent = message;
        } else {
            notification.textContent = message;
        }
        
        notification.style.backgroundColor = bgColor;
        notification.style.display = 'flex';
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.style.display = 'none';
            notification.classList.add('hidden');
        }, duration);
    },
    
    /**
     * Escape HTML to prevent XSS
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, (char) => {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escapeMap[char];
        });
    },
    
    /**
     * Escape string for use in HTML attributes
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeAttr(str) {
        if (!str) return '';
        return String(str).replace(/["'<>&]/g, (char) => {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escapeMap[char];
        });
    },
    
    /**
     * Debounce function to limit execution rate
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait = CONSTANTS.DEBOUNCE_DELAY_MS) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Validate template name
     * @param {string} name - Template name to validate
     * @returns {object} Validation result with isValid and error properties
     */
    validateTemplateName(name) {
        if (!name || !name.trim()) {
            return { isValid: false, error: 'Template name cannot be empty' };
        }
        
        if (name.length > CONSTANTS.MAX_TEMPLATE_NAME_LENGTH) {
            return { 
                isValid: false, 
                error: `Template name cannot exceed ${CONSTANTS.MAX_TEMPLATE_NAME_LENGTH} characters` 
            };
        }
        
        return { isValid: true, error: null };
    },
    
    /**
     * Validate subject line
     * @param {string} subject - Subject line to validate
     * @returns {object} Validation result with isValid, error, and warnings properties
     */
    validateSubjectLine(subject) {
        const warnings = [];
        
        if (!subject || !subject.trim()) {
            return { 
                isValid: true, 
                error: null, 
                warnings: ['Subject line is empty'] 
            };
        }
        
        if (subject.length > CONSTANTS.MAX_SUBJECT_LINE_LENGTH) {
            warnings.push(`Subject line is ${subject.length} characters (recommended: <${CONSTANTS.MAX_SUBJECT_LINE_LENGTH})`);
        }
        
        if (subject.length < CONSTANTS.MIN_SUBJECT_LINE_LENGTH) {
            warnings.push(`Subject line is too short (${subject.length} characters)`);
        }
        
        return { isValid: true, error: null, warnings };
    },
    
    /**
     * Validate variable name
     * @param {string} name - Variable name to validate
     * @returns {object} Validation result with isValid and error properties
     */
    validateVariableName(name) {
        if (!name || !name.trim()) {
            return { isValid: false, error: 'Variable name cannot be empty' };
        }
        
        // Only allow alphanumeric characters and underscores
        if (!/^[a-zA-Z0-9_]+$/.test(name)) {
            return { 
                isValid: false, 
                error: 'Variable name can only contain letters, numbers, and underscores' 
            };
        }
        
        // Cannot start with a number
        if (/^\d/.test(name)) {
            return { 
                isValid: false, 
                error: 'Variable name cannot start with a number' 
            };
        }
        
        return { isValid: true, error: null };
    },
    
    /**
     * Validate URL format
     * @param {string} url - URL to validate
     * @returns {object} Validation result with isValid and error properties
     */
    validateUrl(url) {
        if (!url || !url.trim()) {
            return { isValid: false, error: 'URL cannot be empty' };
        }
        
        try {
            new URL(url);
            return { isValid: true, error: null };
        } catch (e) {
            return { 
                isValid: false, 
                error: 'Invalid URL format. Please include protocol (http:// or https://)' 
            };
        }
    },
    
    /**
     * Get item from localStorage with error handling
     * @param {string} key - Storage key
     * @param {any} defaultValue - Default value if not found or error
     * @returns {any} Stored value or default
     */
    getStorageItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? item : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage (key: ${key}):`, error);
            return defaultValue;
        }
    },
    
    /**
     * Set item in localStorage with error handling
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     * @returns {boolean} Success status
     */
    setStorageItem(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage (key: ${key}):`, error);
            this.showNotification('Failed to save data. Storage might be full.', 'error');
            return false;
        }
    },
    
    /**
     * Get JSON from localStorage with error handling
     * @param {string} key - Storage key
     * @param {any} defaultValue - Default value if not found or error
     * @returns {any} Parsed JSON or default
     */
    getStorageJSON(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error parsing JSON from localStorage (key: ${key}):`, error);
            return defaultValue;
        }
    },
    
    /**
     * Set JSON in localStorage with error handling
     * @param {string} key - Storage key
     * @param {any} value - Value to store as JSON
     * @returns {boolean} Success status
     */
    setStorageJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error saving JSON to localStorage (key: ${key}):`, error);
            this.showNotification('Failed to save data. Storage might be full.', 'error');
            return false;
        }
    }
};

// Make utilities available globally
window.EmailEditorUtils = EmailEditorUtils;

