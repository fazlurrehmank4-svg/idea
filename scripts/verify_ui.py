import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    # 1. Homepage
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # 2. Search for AI
    search_input = page.get_by_placeholder("Search 'AI healthcare', 'Robotics', 'Quantum', or 'School Science'...")
    search_input.fill("AI")
    page.wait_for_timeout(500)
    search_input.press("Enter")
    page.wait_for_timeout(1000)

    # 3. Explore page - click first idea
    page.get_by_role("heading", level=3).first.click()
    page.wait_for_timeout(1000)

    # 4. Save idea
    save_button = page.get_by_role("button", name="Save Idea").first
    if save_button.is_visible():
        save_button.click()
        page.wait_for_timeout(1000)

    # Take screenshot at the end
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
