import sys
from pathlib import Path
from typing import Callable

PASSED = 0
FAILED = 0
RESULTS = []

SNAP_DIR = Path("/tmp/uiden-screenshots/apps/any-gen")
SNAP_DIR.mkdir(parents=True, exist_ok=True)

def run_test(name: str, fn: Callable[[], None]):
    global PASSED, FAILED
    try:
        fn()
        PASSED += 1
        RESULTS.append(("PASS", name))
        print(f"  PASS  {name}", flush=True)
    except Exception as e:
        FAILED += 1
        RESULTS.append(("FAIL", name, str(e)))
        print(f"  FAIL  {name}\n        {e}", flush=True)

def summarize():
    print(f"\n{'=' * 60}")
    print(f"Results: {PASSED} passed, {FAILED} failed, {PASSED + FAILED} total")
    print(f"{'=' * 60}")
    for r in RESULTS:
        if r[0] == "FAIL":
            print(f"  FAIL: {r[1]} — {r[2]}")
    if FAILED > 0:
        sys.exit(1)

def login_as(page, user: str, password: str):
    page.goto("http://localhost:3000/user/login", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.evaluate("() => sessionStorage.clear()")
    page.wait_for_timeout(500)
    if "/user/login" not in page.url:
        page.goto("http://localhost:3000/user/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
    page.locator('input[autocomplete="username"]').fill(user)
    page.locator('input[autocomplete="current-password"]').fill(password)
    page.locator('button:has-text("Sign in")').click()
    page.wait_for_timeout(2000)

BASE = "http://localhost:3000"

from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-gpu"])
    context = browser.new_context(viewport={"width": 1280, "height": 800})
    page = context.new_page()

    # ============================================================
    # Login as admin
    # ============================================================
    print("\n--- Login as admin ---", flush=True)
    login_as(page, "admin", "admin")

    # ============================================================
    # Public landing page
    # ============================================================
    print("\n--- Public Landing Page ---", flush=True)
    page.goto(f"{BASE}/any-gen/public", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "01_public_landing.png"), full_page=True)

    run_test(
        "Public Landing: shows Any Gen branding",
        lambda: expect(page.locator("h1")).to_contain_text("Any Gen"),
    )
    run_test(
        "Public Landing: shows hero description",
        lambda: expect(page.locator("h1")).to_be_visible(),
    )

    # ============================================================
    # Private dashboard
    # ============================================================
    print("\n--- Private Dashboard ---", flush=True)
    page.goto(f"{BASE}/any-gen/private", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(2000)
    page.screenshot(path=str(SNAP_DIR / "02_dashboard.png"), full_page=True)

    run_test(
        "Dashboard: shows stat cards",
        lambda: expect(page.locator("aside >> .stat-card")).to_be_visible(),
    )
    run_test(
        "Dashboard: shows activity feed",
        lambda: expect(page.locator(".activity-feed")).to_be_visible(),
    )

    # ============================================================
    # Feature pages
    # ============================================================
    print("\n--- Generators Page ---", flush=True)
    page.goto(f"{BASE}/any-gen/private/generators", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "03_generators.png"), full_page=True)

    run_test(
        "Generators: page loads",
        lambda: expect(page.locator("h2, h3").first).to_be_visible(),
    )

    print("\n--- Presets Page ---", flush=True)
    page.goto(f"{BASE}/any-gen/private/presets", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "04_presets.png"), full_page=True)

    run_test(
        "Presets: page loads",
        lambda: expect(page.locator("h2, h3").first).to_be_visible(),
    )

    print("\n--- History Page ---", flush=True)
    page.goto(f"{BASE}/any-gen/private/history", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "05_history.png"), full_page=True)

    run_test(
        "History: page loads",
        lambda: expect(page.locator("h2, h3").first).to_be_visible(),
    )

    page.close()
    context.close()
    browser.close()

    summarize()
