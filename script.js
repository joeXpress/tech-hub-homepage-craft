
// Legacy compatibility layer - loads the new modular system
// This file maintains backward compatibility while loading the new architecture

// Check if modules are supported
if (typeof(Storage) !== "undefined" && 'noModule' in HTMLScriptElement.prototype) {
    // Modern browsers - load ES6 modules
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './js/main.js';
    document.head.appendChild(script);
} else {
    // Fallback for older browsers - load concatenated version
    console.warn('ES6 modules not supported, loading fallback version');
    // Here you would load a transpiled/concatenated version for older browsers
    // For now, we'll just load the modules sequentially
    loadScriptsSequentially([
        './js/preloader.js',
        './js/theme.js',
        './js/hero-slider.js',
        './js/navigation.js',
        './js/forms.js',
        './js/animations.js',
        './js/delivery.js',
        './js/main.js'
    ]);
}

function loadScriptsSequentially(scripts) {
    let index = 0;
    
    function loadNext() {
        if (index >= scripts.length) return;
        
        const script = document.createElement('script');
        script.src = scripts[index];
        script.onload = () => {
            index++;
            loadNext();
        };
        script.onerror = () => {
            console.error(`Failed to load script: ${scripts[index]}`);
            index++;
            loadNext();
        };
        document.head.appendChild(script);
    }
    
    loadNext();
}

// Immediate performance optimizations
(function() {
    // Preload critical resources
    const preloadLinks = [
        { href: './styles.css', as: 'style' },
        { href: './js/main.js', as: 'script' }
    ];
    
    preloadLinks.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = link.href;
        preloadLink.as = link.as;
        document.head.appendChild(preloadLink);
    });
    
    // Add critical CSS inline for faster rendering
    const criticalCSS = `
        .preloader { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: #1a1a1a; 
            z-index: 9999; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
        }
        .preloader.hidden { 
            display: none; 
        }
        body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
})();
