document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("typewriter-title");
    const title = el ? el.getAttribute("data-title") : "No Title";
    
    if (el) {
        if (sessionStorage.getItem("typewriterDone")) {
            el.textContent = title;
        } else {
            let i = 0;
            function type() {
                if (i <= title.length) {
                    el.textContent = title.slice(0, i);
                    el.innerHTML += '<span class="typewriter-cursor">_</span>';
                    i++;
                    setTimeout(type, 80);
                } else {
                    el.textContent = title;
                    sessionStorage.setItem("typewriterDone", "1");
                }
            }
            type();
        }
    }

    const container = document.querySelector('.container');
    let scrollPos = 0;
    window.addEventListener('scroll', () => {
        if(window.scrollY > scrollPos) {
            container.style.transform = 'translateY(-2px)';
        } else {
            container.style.transform = 'translateY(2px)';
        }
        setTimeout(() => {
            container.style.transform = 'translateY(0)';
        }, 50);
        scrollPos = window.scrollY;
    });

    function setTheme(theme) {
        // Remove all theme classes before adding the selected one
        document.body.classList.remove("light-theme", "dark-theme", "high-contrast");
        if (theme) document.body.classList.add(theme);
    }

    if(localStorage.theme) setTheme(localStorage.theme);

    const select = document.getElementById("theme-picker");
    if (select) {
        if (localStorage.theme) select.value = localStorage.theme;

        select.addEventListener("change", function () {
            setTheme(this.value);
            localStorage.theme = this.value;

            // reset typewriter
            const el = document.getElementById("typewriter-title");
            if (el) {
                el.textContent = title;
                sessionStorage.removeItem("typewriterDone");
            }
        });
    }
});
