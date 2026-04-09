
// ========================================================
// CORE EDITOR FUNCTIONALITY (unchanged)
// ========================================================

// Get DOM elements
const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const outputFrame = document.getElementById('outputFrame');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const explainBtn = document.getElementById('explainBtn');
const toggleExplainBtn = document.getElementById('toggleExplain');
const explainContent = document.getElementById('explainContent');
const codeTabs = document.querySelectorAll('.code-tab');
const statusBar = document.getElementById('statusBar');

// Mobile-specific elements
const outputBackBtn = document.getElementById('outputBackBtn');
const explainBackBtn = document.getElementById('explainBackBtn');

// Track active tab
let activeTab = 'html';

// Tab switching functionality
codeTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        activeTab = this.getAttribute('data-tab');

        codeTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        document.getElementById('htmlEditor').style.display = activeTab === 'html' ? 'block' : 'none';
        document.getElementById('cssEditor').style.display = activeTab === 'css' ? 'block' : 'none';
        document.getElementById('jsEditor').style.display = activeTab === 'js' ? 'block' : 'none';

        statusBar.textContent = `Editing ${activeTab.toUpperCase()} code`;
    });
});

// Run code function
function runCode() {
    const htmlCode = htmlEditor.value;
    const cssCode = cssEditor.value;
    const jsCode = jsEditor.value;

    const fullDocument = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>${cssCode}</style>
                </head>
                <body>
                    ${htmlCode}
                    <script>${jsCode}<\/script>
                </body>
                </html>
            `;

    outputFrame.contentDocument.open();
    outputFrame.contentDocument.write(fullDocument);
    outputFrame.contentDocument.close();

    statusBar.textContent = 'Code executed successfully';

    if (isMobile()) {
        switchToMobileView('output');
    }
}

// Clear all code function
function clearAllCode() {
    if (confirm('Clear all code in all editors?')) {
        htmlEditor.value = '';
        cssEditor.value = '';
        jsEditor.value = '';

        outputFrame.contentDocument.open();
        outputFrame.contentDocument.write('');
        outputFrame.contentDocument.close();

        explainContent.textContent = 'All code cleared. Write new code to get explanations.';

        statusBar.textContent = 'All code cleared';

        htmlEditor.focus();
    }
}

// Toggle explanation panel visibility (desktop only)
function toggleExplanationPanel() {
    if (explainContent.style.display === 'none') {
        explainContent.style.display = 'block';
        toggleExplainBtn.textContent = 'Hide';
        statusBar.textContent = 'Explanation panel shown';
    } else {
        explainContent.style.display = 'none';
        toggleExplainBtn.textContent = 'Show';
        statusBar.textContent = 'Explanation panel hidden';
    }
}

// ========================================================
// MOBILE RESPONSIVENESS FUNCTIONS (unchanged)
// ========================================================

// Check if device is mobile (width < 768px)
function isMobile() {
    return window.innerWidth < 768;
}

// Switch between mobile views
function switchToMobileView(viewName) {
    const codeSection = document.querySelector('.code-section');
    const outputSection = document.querySelector('.output-section');
    const explainSection = document.querySelector('.explain-section');

    codeSection.classList.remove('mobile-active');
    outputSection.classList.remove('mobile-active');
    explainSection.classList.remove('mobile-active');

    if (viewName === 'code') {
        codeSection.classList.add('mobile-active');
        statusBar.textContent = 'Editing code. Write HTML, CSS, or JavaScript.';
    } else if (viewName === 'output') {
        outputSection.classList.add('mobile-active');
        statusBar.textContent = 'Viewing output. Click "Back to Editor" to continue coding.';
    } else if (viewName === 'explain') {
        explainSection.classList.add('mobile-active');
        statusBar.textContent = 'Viewing explanation. Click "Back to Editor" to continue coding.';
    }
}

// ========================================================
// IMPROVED EXPLANATION FUNCTIONS (Better Structure)
// ========================================================

// Explain code function
function explainCode() {
    let code = '';
    let explanation = '';

    // Get code from the active editor
    if (activeTab === 'html') {
        code = htmlEditor.value;
        explanation = explainHTML(code);
    } else if (activeTab === 'css') {
        code = cssEditor.value;
        explanation = explainCSS(code);
    } else if (activeTab === 'js') {
        code = jsEditor.value;
        explanation = explainJavaScript(code);
    }

    // Update explanation content
    explainContent.textContent = explanation;

    // Mobile/desktop handling
    if (isMobile()) {
        switchToMobileView('explain');
    } else {
        explainContent.style.display = 'block';
        toggleExplainBtn.textContent = 'Hide';
        statusBar.textContent = `Explained ${activeTab.toUpperCase()} code`;
    }
}

// HTML explanation - IMPROVED STRUCTURE
function explainHTML(htmlCode) {
    // No code
    if (!htmlCode.trim()) {
        return "Your HTML editor is empty.\nWrite HTML code to create a web page.";
    }

    let explanation = "";

    // Check for HTML tags
    const hasHeading = /<h[1-6]/.test(htmlCode);
    const hasDiv = /<div/.test(htmlCode);
    const hasSection = /<section/.test(htmlCode);
    const hasMain = /<main/.test(htmlCode);
    const hasArticle = /<article/.test(htmlCode);
    const hasForm = /<form/.test(htmlCode);
    const hasInput = /<input/.test(htmlCode);
    const hasTextarea = /<textarea/.test(htmlCode);
    const hasSelect = /<select/.test(htmlCode);
    const hasLabel = /<label/.test(htmlCode);
    const hasButton = /<button/.test(htmlCode);
    const hasImg = /<img/.test(htmlCode);
    const hasAnchor = /<a /.test(htmlCode);
    const hasParagraph = /<p/.test(htmlCode);
    const hasList = /<(ul|ol)/.test(htmlCode);
    const hasListItem = /<li/.test(htmlCode);
    const hasTable = /<table/.test(htmlCode);
    const hasClass = /class=/.test(htmlCode);
    const hasId = /id=/.test(htmlCode);
    const hasOnclick = /onclick=/.test(htmlCode);

    // Build natural explanation with varied sentence starters
    explanation = "Here's what your HTML code does:\n\n";

    // Page structure and layout
    if (hasDiv || hasSection || hasMain || hasArticle) {
        explanation += "• It organizes content into sections and containers\n";
    }

    // Headings and text
    if (hasHeading) {
        explanation += "• It displays headings to structure the page content\n";
    }
    if (hasParagraph) {
        explanation += "• It shows paragraphs of text for reading\n";
    }

    // User interaction elements
    if (hasForm || hasInput || hasTextarea || hasSelect || hasLabel) {
        explanation += "• It provides input fields for users to enter information\n";
    }

    if (hasButton) {
        explanation += "• It creates buttons that users can click to take action\n";
    }

    if (hasAnchor) {
        explanation += "• It adds clickable links to navigate to other pages\n";
    }

    // Media and lists
    if (hasImg) {
        explanation += "• It displays images on the page\n";
    }

    if (hasList && hasListItem) {
        explanation += "• It presents information in organized lists\n";
    }

    if (hasTable) {
        explanation += "• It arranges data in a table format\n";
    }

    // Styling and behavior hooks
    if (hasClass) {
        explanation += "• It marks elements for styling with CSS\n";
    }

    if (hasId) {
        explanation += "• It gives unique names to elements for reference\n";
    }

    if (hasOnclick) {
        explanation += "• It makes elements respond when clicked\n";
    }

    // Additional observations
    if (!hasHeading && !hasParagraph && !hasButton && !hasInput && !hasDiv) {
        explanation += "\nYour HTML creates a custom page structure with specialized elements.";
    }

    return explanation;
}

// CSS explanation - IMPROVED STRUCTURE
function explainCSS(cssCode) {
    // No code
    if (!cssCode.trim()) {
        return "Your CSS editor is empty.\nWrite CSS code to style your web page.";
    }

    let explanation = "";

    // Check for CSS properties
    const hasColor = /color:/.test(cssCode);
    const hasBackground = /background(-color)?:/.test(cssCode);
    const hasFontSize = /font-size:/.test(cssCode);
    const hasFontFamily = /font-family:/.test(cssCode);
    const hasTextAlign = /text-align:/.test(cssCode);
    const hasMargin = /margin:/.test(cssCode);
    const hasPadding = /padding:/.test(cssCode);
    const hasBorder = /border:/.test(cssCode);
    const hasWidth = /width:/.test(cssCode);
    const hasHeight = /height:/.test(cssCode);
    const hasDisplay = /display:/.test(cssCode);
    const hasFlex = /flex/.test(cssCode);
    const hasGrid = /grid/.test(cssCode);
    const hasPosition = /position:/.test(cssCode);
    const hasMediaQuery = /@media/.test(cssCode);
    const hasHover = /:hover/.test(cssCode);
    const hasClassSelector = /\.\w/.test(cssCode);
    const hasIdSelector = /#\w/.test(cssCode);

    // Build natural explanation with varied sentence starters
    explanation = "Here's what your CSS code does:\n\n";

    // Colors and backgrounds
    if (hasColor || hasBackground) {
        explanation += "• It changes colors and backgrounds to make the page visually appealing\n";
    }

    // Text styling
    if (hasFontSize || hasFontFamily || hasTextAlign) {
        explanation += "• It controls how text appears, including size, font, and alignment\n";
    }

    // Layout and spacing
    if (hasMargin || hasPadding) {
        explanation += "• It adds spacing around and inside elements for better organization\n";
    }

    if (hasWidth || hasHeight) {
        explanation += "• It sets the size of elements on the page\n";
    }

    if (hasDisplay || hasFlex || hasGrid) {
        explanation += "• It arranges elements in specific layouts for better presentation\n";
    }

    if (hasPosition) {
        explanation += "• It positions elements precisely on the page\n";
    }

    // Borders and visual effects
    if (hasBorder) {
        explanation += "• It adds borders to define element boundaries\n";
    }

    // Responsive design
    if (hasMediaQuery) {
        explanation += "• It adapts the layout for different screen sizes\n";
    }

    // Interactive states
    if (hasHover) {
        explanation += "• It changes appearance when users hover over elements\n";
    }

    // Selector types
    if (hasClassSelector) {
        explanation += "• It styles groups of elements that share the same class\n";
    }

    if (hasIdSelector) {
        explanation += "• It styles individual elements with unique IDs\n";
    }

    return explanation;
}

// JavaScript explanation - IMPROVED STRUCTURE
function explainJavaScript(jsCode) {
    // No code
    if (!jsCode.trim()) {
        return "Your JavaScript editor is empty.\nWrite JavaScript code to make your page interactive.";
    }

    let explanation = "";

    // Check for JavaScript patterns
    const hasConsoleLog = /console\.log/.test(jsCode);
    const hasAlert = /alert\s*\(/.test(jsCode);
    const hasPrompt = /prompt\s*\(/.test(jsCode);
    const hasConfirm = /confirm\s*\(/.test(jsCode);
    const hasGetElement = /document\.(getElementById|querySelector)/.test(jsCode);
    const hasEventListener = /addEventListener/.test(jsCode);
    const hasFunction = /function\s+\w+\s*\(/.test(jsCode);
    const hasArrowFunction = /=>/.test(jsCode);
    const hasIfStatement = /if\s*\(/.test(jsCode);
    const hasLoop = /(for|while)\s*\(/.test(jsCode);
    const hasVariable = /(let|const|var)\s+\w+/.test(jsCode);
    const hasAssignment = /\w+\s*=/.test(jsCode);
    const hasReturn = /return/.test(jsCode);
    const hasMath = /[+\-*/]/.test(jsCode);

    // Build natural explanation with varied sentence starters
    explanation = "Here's what your JavaScript code does:\n\n";

    // Output and debugging
    if (hasConsoleLog) {
        explanation += "• It outputs information to the browser console for debugging\n";
    }

    // User interaction and dialogs
    if (hasAlert || hasPrompt || hasConfirm) {
        explanation += "• It displays popup messages to communicate with users\n";
    }

    // DOM manipulation
    if (hasGetElement) {
        explanation += "• It finds and works with elements on the page\n";
    }

    // Event handling
    if (hasEventListener) {
        explanation += "• It responds to user actions like clicks and keystrokes\n";
    }

    // Code organization
    if (hasFunction || hasArrowFunction) {
        explanation += "• It organizes code into reusable blocks for better structure\n";
    }

    // Logic and decision making
    if (hasIfStatement) {
        explanation += "• It makes decisions based on conditions\n";
    }

    // Repetition
    if (hasLoop) {
        explanation += "• It repeats actions multiple times efficiently\n";
    }

    // Data handling
    if (hasVariable || hasAssignment) {
        explanation += "• It stores and manages data in variables\n";
    }

    if (hasReturn) {
        explanation += "• It provides results from functions\n";
    }

    // Calculations
    if (hasMath) {
        explanation += "• It performs calculations and processes data\n";
    }

    return explanation;
}

// ========================================================
// EVENT LISTENERS (unchanged)
// ========================================================

// Main button event listeners
runBtn.addEventListener('click', runCode);
clearBtn.addEventListener('click', clearAllCode);
explainBtn.addEventListener('click', explainCode);

// Desktop-only: Explanation toggle
toggleExplainBtn.addEventListener('click', toggleExplanationPanel);

// Mobile-only: Back to editor buttons
outputBackBtn.addEventListener('click', function () {
    if (isMobile()) {
        switchToMobileView('code');
    }
});

explainBackBtn.addEventListener('click', function () {
    if (isMobile()) {
        switchToMobileView('code');
    }
});

// Keyboard shortcut (Ctrl+Enter) for running code
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'Enter') {
        runCode();
        event.preventDefault();
    }
});

// Update status when user is typing
function updateStatusOnTyping() {
    if (!isMobile()) {
        statusBar.textContent = 'Typing... (Press Ctrl+Enter to run)';
    }
}

// Add typing event listeners to all editors
htmlEditor.addEventListener('input', updateStatusOnTyping);
cssEditor.addEventListener('input', updateStatusOnTyping);
jsEditor.addEventListener('input', updateStatusOnTyping);

// Initial setup
statusBar.textContent = 'Ready. Write HTML, CSS, and JavaScript code, then click "Run Code".';
htmlEditor.focus();

// Handle window resize for mobile/desktop switching
window.addEventListener('resize', function () {
    if (isMobile()) {
        const activeViews = document.querySelectorAll('.mobile-active');
        if (activeViews.length === 0) {
            switchToMobileView('code');
        }
    }
});

// Add a simple example on first load if all editors are empty
window.addEventListener('load', function () {
    const isEmpty = !htmlEditor.value && !cssEditor.value && !jsEditor.value;

    if (isEmpty) {
        // Add a very simple example
        htmlEditor.value = '<h1>Hello World</h1>\n<p>Edit the code to see changes</p>\n<button id="demoBtn">Click Me</button>';
        cssEditor.value = 'body { font-family: Arial, sans-serif; padding: 20px; }\nh1 { color: #333; }\nbutton { background: #555; color: white; padding: 10px; border: none; }';
        jsEditor.value = 'document.getElementById("demoBtn").onclick = function() {\n  alert("JavaScript is working!");\n};';

        statusBar.textContent = 'Loaded example. Click "Run Code" to see it work.';
    }
});
