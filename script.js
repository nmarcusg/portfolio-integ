const blobColors = [
    'rgb(21, 62, 184) none repeat scroll 0% 0% / auto padding-box border-box', // blue
    'rgb(219, 50, 50) none repeat scroll 0% 0% / auto padding-box border-box', // red
    'rgb(59, 192, 59) none repeat scroll 0% 0% / auto padding-box border-box', // green
    'rgb(250, 205, 80) none repeat scroll 0% 0% / auto padding-box border-box', // yellow
    'rgb(207, 58, 207) none repeat scroll 0% 0% / auto padding-box border-box', // magenta
]

const routes = {
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/projects": "/pages/projects.html",
    "/lectures": "/pages/lectures.html",
    "/activities": "/pages/activities.html",
};

let currentPath = '/';

window.addEventListener('popstate', () => {
    loadPage(location.pathname);
});

document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-list').classList.toggle('active');
});

function easeIn() {
    document.body.classList.add('loaded');
}

function modalFunction() {
    const modal = document.getElementById("imageModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.querySelector(".close");

    // Open modal
    openBtn.onclick = function () {
    modal.style.display = "block";
    };

    // Close modal
    closeBtn.onclick = function () {
    modal.style.display = "none";
    };

    // Close if clicking outside the image
    window.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
    };
}

function changeBlobColor() {
    const blob = document.querySelector('.gradient-1');

    if (currentPath === '/') {
        blob.style.background = `${blobColors[0]}`;
    } 
    else if (currentPath === '/about') {
        blob.style.background = `${blobColors[1]}`;
    }
    else if (currentPath === '/projects') {
        blob.style.background = `${blobColors[4]}`;
    } else if (currentPath === '/lectures') {
        blob.style.background = `${blobColors[3]}`;
    } else if (currentPath === '/activities') {
        blob.style.background = `${blobColors[2]}`;
    } else {
        blob.style.background = `${blobColors[0]}`; // Default to blue
    }
}

document.addEventListener('DOMContentLoaded', easeIn);

function pageTransition() {
    const content = document.getElementById('content');
    content.classList.remove('loaded');
    setTimeout(() => {
        content.classList.add('fadeout');
    }, timeout = 250);
    void content.offsetWidth;
    setTimeout(() => {
        content.classList.add('loaded');
    }, timeout = 250);
    setTimeout(() => {
        content.classList.remove('fadeout');
    }, timeout = 500);
  }
  
  function interactiveName() {
    const nameElement = document.getElementById('interactive-name');
    if (!nameElement) return;
  
    const words = nameElement.textContent.trim().split(' ');
  
    const wordHTML = words.map(word => {
      const letterSpans = word
        .split('')
        .map(char => `<span class="letter">${char}</span>`)
        .join('');
  
      return `<div class="word">${letterSpans}</div>`;
    }).join(' '); // Add space between word containers
  
    nameElement.innerHTML = wordHTML;
  }

function setupNavigation() {
    document.body.addEventListener('click', e => {
        if (e.target.matches('a[data-link]')) {
            e.preventDefault();
            const path = e.target.getAttribute('href');
            history.pushState(null, '', path);
            loadPage(path);
        }
    });
}

async function loadPage(path) {
    currentPath = path;
    console.log(path);
    const file = routes[path] || routes['/'];

    try {
        const res = await fetch(file);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const html = await res.text();
        document.getElementById('content').innerHTML = html;
        pageTransition();
        changeBlobColor();
        if (path === '/') {
            interactiveName();
        }
        if (path === '/projects') {
            console.log("modal")
            modalFunction();
        }
    } catch (err) {
        console.error('Error loading page:', err);
        window.location.pathname = '/';
    }
}


window.onload = () => {
    document.body.classList.add('loaded');
    setupNavigation();

    const path = window.location.pathname;
    if (path !== '/' && !Object.keys(routes).includes(path)) {
        window.location.pathname = '/';
        return;
    }

    loadPage(location.pathname);    

}