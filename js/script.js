document.addEventListener('DOMContentLoaded', () => {
    // 1. BOOT SEQUENCE
    const overlay = document.getElementById('boot-overlay');
    const bText = document.getElementById('boot-text');
    const bSub = document.getElementById('boot-subtext');
    const app = document.getElementById('app');

    setTimeout(() => { bText.classList.add('visible'); }, 400);
    setTimeout(() => { bSub.classList.add('visible'); }, 1600);
    
    setTimeout(() => {
        overlay.classList.add('boot-hidden');
        setTimeout(() => {
            overlay.style.display = 'none';
            app.classList.add('visible');
        }, 1200);
    }, 3500);

    // 2. INITIAL RENDER
    renderApp();
});

// SPA State
let currentSection = 'profile';

window.switchSection = function(section) {
    currentSection = section;
    renderApp();
    
    // Smoothly scroll back to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

function renderApp() {
    const app = document.getElementById('app');
    let html = '';

    // Navigation HTML
    const navHTML = `
        <nav class="main-nav">
            <button class="nav-btn ${currentSection === 'profile' ? 'active' : ''}" onclick="switchSection('profile')">Profile</button>
            <button class="nav-btn ${currentSection === 'biozig' ? 'active' : ''}" onclick="switchSection('biozig')" style="color: rgba(var(--accent-rgb), 1); font-weight: bold;">BioZig Software Foundation</button>
            <button class="nav-btn ${currentSection === 'works' ? 'active' : ''}" onclick="switchSection('works')">Systems & Works</button>
            <button class="nav-btn ${currentSection === 'theses' ? 'active' : ''}" onclick="switchSection('theses')">Theses</button>
            <button class="nav-btn ${currentSection === 'essays' ? 'active' : ''}" onclick="switchSection('essays')">Essays & Logs</button>
            <button class="nav-btn ${currentSection === 'book' ? 'active' : ''}" onclick="switchSection('book')" style="font-style: italic;">The Book</button>
            <button class="nav-btn ${currentSection === 'timeline' ? 'active' : ''}" onclick="switchSection('timeline')">Timeline & Pubs</button>
        </nav>
    `;

    // HERO SECTION (Always visible, serves as the header/sidebar)
    html += `
        <header class="hero">
            <h1>${portfolioData.about.name} <span style="display: block; font-size: 0.35em; font-family: var(--mono); color: rgba(var(--accent-rgb), 0.8); letter-spacing: 0.15em; margin-top: 15px;">// SULKYSUBJECT37</span></h1>
            <p style="font-family: var(--mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 2rem; margin-top: 2rem;">
                ${portfolioData.about.title}
            </p>
            ${navHTML}
            <div style="margin-top: auto; padding-top: 30px; font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted);">
                <a href="${portfolioData.about.social.github}" target="_blank" style="margin-right: 15px; border-bottom: 1px solid transparent; padding-bottom: 2px;">GitHub</a>
                <a href="${portfolioData.about.social.linkedin}" target="_blank" style="margin-right: 15px; border-bottom: 1px solid transparent; padding-bottom: 2px;">LinkedIn</a>
                <a href="mailto:${portfolioData.about.email}" style="border-bottom: 1px solid transparent; padding-bottom: 2px;">Contact</a>
            </div>
        </header>
        <main class="content-wrapper">
            <div class="content-inner animate-fade-in">
    `;

    // DYNAMIC CONTENT based on currentSection
    if (currentSection === 'profile') {
        html += `
            <div style="max-width: 800px;">
                <h2 class="section-title" style="margin-bottom: 30px;">Initialize Context</h2>
                <p style="font-size: 1.4rem; line-height: 1.7; margin-bottom: 40px; color: var(--text-main);">
                    ${portfolioData.about.bio}
                </p>
                <div style="padding: 30px; border-left: 2px solid rgb(var(--accent-rgb)); background: rgba(var(--accent-rgb), 0.05); margin-bottom: 40px;">
                    <p style="font-family: var(--mono); font-size: 0.95rem; line-height: 1.6;">${portfolioData.about.cruelBio}</p>
                </div>
                
                <h3 class="section-title">Core Directives</h3>
                <div class="card-grid" style="grid-template-columns: 1fr; gap: 20px;">
                    ${portfolioData.quotes.map(q => `
                        <div style="padding: 20px; border: 1px solid var(--border-color); font-family: var(--serif); font-size: 1.2rem; font-style: italic;">
                            "${q.text}" <span style="font-family: var(--sans); font-size: 0.9rem; font-style: normal; color: var(--text-muted); display: block; margin-top: 10px;">— ${q.author}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (currentSection === 'biozig') {
        html += `
            <div style="max-width: 900px;">
                <h2 class="section-title" style="margin-bottom: 20px;">BioZig Software Foundation</h2>
                
                <h3 style="font-family: var(--serif); font-size: 3rem; font-style: italic; font-weight: 300; margin-bottom: 40px; line-height: 1.1;">
                    Biology is not a text generation problem. Stop treating it like one.
                </h3>
                
                <div style="font-size: 1.25rem; line-height: 1.8; color: var(--text-main); display: flex; flex-direction: column; gap: 25px;">
                    <p>
                        The "Pythonification" of the life sciences is a systemic failure. We have taken 3.8 billion years of ruthless, deterministic, atomic-scale engineering and reduced it to fuzzy string matching in a dynamically typed scripting language. 
                    </p>
                    <p>
                        If your pipeline requires a 4GB Docker container full of unpinned dependencies, wrappers around wrappers, and garbage-collected memory just to parse a FASTQ file, you are not doing science. You are doing alchemy. 
                    </p>
                    <p style="padding-left: 20px; border-left: 2px solid rgb(var(--accent-rgb)); font-family: var(--mono); font-size: 1.05rem; color: var(--text-muted); line-height: 1.6;">
                        "DNA is not a string. Protein is not a string. They are discrete, deterministic mathematical structures. BZ discards legacy abstractions and encodes biological reality directly at the bit level."
                    </p>
                    <p>
                        The BioZig Software Foundation (BZSF) is a violent structural rejection of modern bioinformatics bloat. We are returning to the metal. We enforce provable memory safety without a garbage collector. We write deterministic, hardware-sympathetic kernels that run identically on every machine, every time.
                    </p>
                    <p>
                        We do not ask the machine to guess. We command it to compute.
                    </p>
                    <p style="font-weight: 500;">
                        The industry wants you to believe you need a $5,000-a-month cloud cluster and proprietary enterprise software to run genomic analytics. That is a lie designed to sell you compute. BioZig is radically open-source. We engineered it so you can run planetary-scale, HPC-level biology locally, on a standard system. We aren't just democratizing the tools—we are destroying the corporate monopoly on computational biology.
                    </p>
                </div>

                <a href="https://biozig.org" target="_blank" style="display: inline-block; margin-top: 50px; padding: 15px 30px; background: var(--text-main); color: var(--bg-main); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; font-size: 0.9rem; transition: opacity 0.3s;">Explore the Framework / biozig.org ↗</a>
            </div>
        `;
    } else if (currentSection === 'book') {
        html += `
            <div style="max-width: 900px;">
                <h2 class="section-title" style="margin-bottom: 20px;">Everything You Love is an Algorithm</h2>
                
                <h3 style="font-family: var(--serif); font-size: 3rem; font-style: italic; font-weight: 300; margin-bottom: 40px; line-height: 1.1;">
                    The inevitable end of all systems, the curse of time, and the fierce choice to rebel.
                </h3>
                
                <div style="font-size: 1.25rem; line-height: 1.8; color: var(--text-main); display: flex; flex-direction: column; gap: 25px;">
                    <p>
                        A comprehensive six-part arc exploring the intersection of algorithms, humanity, and system design. This is not a collection of blogs; it is a meticulously typeset digital volume.
                    </p>
                    <p>
                        It explores the failure of objective lenses when reality itself has been warped, how the machine's noise degrades our language, and the crisis of the individual navigating this manufactured society.
                    </p>
                    <p style="padding-left: 20px; border-left: 2px solid rgb(var(--accent-rgb)); font-family: var(--mono); font-size: 1.05rem; color: var(--text-muted); line-height: 1.6;">
                        "Typography follows strict print typesetting rules (justified alignment, auto-hyphenation) because standard web text is an unreadable compromise. Engineered for a pure, distraction-free vertical reading experience."
                    </p>
                </div>

                <a href="everything_you_love_is_an_algorithm.html" target="_blank" style="display: inline-block; margin-top: 50px; padding: 15px 30px; background: var(--text-main); color: var(--bg-main); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; font-size: 0.9rem; transition: opacity 0.3s;">Read the Book ↗</a>
            </div>
        `;
    } else if (currentSection === 'works') {
        html += buildSection('Selected Works', portfolioData.projects, (p) => `
            <article class="card project-card">
                ${p.link !== '#' ? `<a href="${p.link}" class="card-link" target="_blank"></a>` : ''}
                <div class="card-meta">SYSTEM // ${p.tech.split(',')[0]}</div>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.cruelDescription || p.description}</p>
                <div class="card-tech">${p.tech}</div>
            </article>
        `);
    } else if (currentSection === 'essays') {
        html += buildSection('Essays & Logs', portfolioData.posts, (p) => `
            <article class="card blog-card">
                <a href="${p.link}" class="card-link"></a>
                <div class="card-meta">LOG // ${p.date}</div>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.summary}</p>
            </article>
        `);
    } else if (currentSection === 'theses') {
        html += buildSection('Theses', portfolioData.theses, (t) => `
            <article class="card blog-card">
                <a href="${t.link}" class="card-link" target="_blank"></a>
                <div class="card-meta">THESIS // ${t.date}</div>
                <h3 class="card-title">${t.title}</h3>
                <p class="card-desc">${t.summary}</p>
            </article>
        `);
    } else if (currentSection === 'timeline') {
        html += buildSection('Experience', portfolioData.experience, (e) => `
            <article class="card exp-card">
                <div class="card-meta">${e.company} // ${e.duration}</div>
                <h3 class="card-title">${e.role}</h3>
                <p class="card-desc">${e.description}</p>
            </article>
        `);

        html += buildSection('Education', portfolioData.education, (e) => `
            <article class="card edu-card">
                <div class="card-meta">${e.institution} // ${e.duration}</div>
                <h3 class="card-title">${e.degree}</h3>
                <p class="card-desc">${e.details}</p>
            </article>
        `);

        html += buildSection('Publications', portfolioData.publications, (pub, index) => {
            return `
            <article class="card pub-card">
                <div class="card-meta">PUB // 0${index + 1}</div>
                <h3 class="card-title" style="font-size: 1.5rem; margin-bottom: 0;">Academic Record</h3>
                <p class="card-desc" style="margin-top: 15px;">${pub}</p>
            </article>
            `;
        });
    }

    html += `
            </div>
        </main>
    `; 
    
    app.innerHTML = html;
}

function buildSection(title, dataArray, templateFn) {
    if(!dataArray || dataArray.length === 0) return '';
    const cards = dataArray.map((item, index) => templateFn(item, index)).join('');
    return `
        <section id="section-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
            <h2 class="section-title" style="margin-top: 40px;">${title}</h2>
            <div class="card-grid">
                ${cards}
            </div>
        </section>
    `;
}
