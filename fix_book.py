import re

with open('everything_you_love_is_an_algorithm.html', 'r') as f:
    html = f.read()

# 1. Remove horizontal scroll CSS
html = re.sub(r'/\* HORIZONTAL SCROLL ENGINE \*/.*?/\* HORIZONTAL PAGE COLUMNS \(Shared Base\) \*/', '/* HORIZONTAL SCROLL ENGINE REMOVED */\n/* HORIZONTAL PAGE COLUMNS (Shared Base) */', html, flags=re.DOTALL)

# 2. Modify .book-part and .inner-wrap to be standard vertical
css_replacement = """
.book-part {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 100px;
}

.inner-wrap {
    max-width: 800px;
    margin: 0 auto;
    padding: 50px 20px;
    position: relative;
    z-index: 2;
}

.part-header {
    width: 100%;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 5;
    text-align: center;
    margin-top: 100px;
}
"""
html = re.sub(r'\.book-part \{.*?\.part-header \{.*?\}', css_replacement, html, flags=re.DOTALL)

# 3. Remove horizontal track HTML wrappers
html = html.replace('<div id="horizontal-scroll-container">', '')
html = html.replace('<div class="sticky-viewport">', '')
html = html.replace('<div id="horizontal-track">', '')
# Remove the closing tags (they are the 3 div closers before </main>)
html = html.replace('        </div>\n    </div>\n</div>\n\n</main>', '</main>')

# 4. Remove horizontal JS
html = re.sub(r'const scrollContainer = document.getElementById\(\'horizontal-scroll-container\'\);.*?// reveal on scroll \(Vertical intro\)', '// reveal on scroll (Vertical intro)', html, flags=re.DOTALL)
html = re.sub(r'// reveal horizontal items.*?\}\);', '', html, flags=re.DOTALL)
html = re.sub(r'document\.querySelectorAll\(\'.nav-btn\'\)\.forEach\(btn.*?\}\);', '', html, flags=re.DOTALL)

with open('everything_you_love_is_an_algorithm.html', 'w') as f:
    f.write(html)
print("Fixed!")
