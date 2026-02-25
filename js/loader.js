async function loadComponents() {
    // Header
    const header = document.getElementById('site-header');
    if (header) {
        const res = await fetch('components/header.html');
        header.innerHTML = await res.text();
    }
    // Footer
    const footer = document.getElementById('site-footer');
    if (footer) {
        const res = await fetch('components/footer.html');
        footer.innerHTML = await res.text();
    }

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }


    // Re-init AOS once components are in
    if (window.AOS) AOS.init();
}

loadComponents();