
// Preloader functionality
export function initPreloader() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    
    // Optimize preloader timing based on content load
    const minLoadTime = 1500; // Reduced from 3000ms
    const startTime = performance.now();
    
    // Check if all critical resources are loaded
    function checkResourcesLoaded() {
        return document.readyState === 'complete' && 
               document.fonts.ready;
    }
    
    function hidePreloader() {
        const elapsedTime = performance.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
            preloader.classList.add('hidden');
            mainContent.style.display = 'block';
        }, remainingTime);
    }
    
    // Wait for resources or minimum time
    if (checkResourcesLoaded()) {
        hidePreloader();
    } else {
        Promise.all([
            document.fonts.ready,
            new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve, { once: true });
                }
            })
        ]).then(hidePreloader);
    }
}
