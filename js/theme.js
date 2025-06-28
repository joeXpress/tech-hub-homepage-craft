
// Dark mode and theme management
export function initTheme() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const body = document.body;
    
    // Check for saved dark mode preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDarkMode = savedDarkMode === 'true' || 
                             (savedDarkMode === null && prefersDark);
    
    if (shouldUseDarkMode) {
        body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }
    
    // Debounced theme toggle
    let toggleTimeout;
    darkModeSwitch.addEventListener('change', function() {
        clearTimeout(toggleTimeout);
        toggleTimeout = setTimeout(() => {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        }, 50);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
            body.classList.toggle('dark-mode', e.matches);
            darkModeSwitch.checked = e.matches;
        }
    });
}
