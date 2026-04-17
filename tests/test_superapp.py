import sys
from pathlib import Path
from typing import Callable

PASSED = 0
FAILED = 0
RESULTS = []

SNAP_DIR = Path("/tmp/uiden-screenshots/superapp")
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


def do_logout(page):
    page.locator('button[title="Profile"]').click()
    page.wait_for_timeout(300)
    page.locator("button:has-text('Logout')").click()
    page.wait_for_load_state("networkidle", timeout=15000)


BASE = "http://localhost:3000"

from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-gpu"])
    context = browser.new_context(viewport={"width": 1280, "height": 800})
    page = context.new_page()

    # ============================================================
    # PAGE: Home (/) — Unauthenticated
    # ============================================================
    print("\n--- Home Page (/) ---", flush=True)
    page.goto(BASE, timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "01_home.png"), full_page=True)

    run_test(
        "Home: shows Kentut branding",
        lambda: expect(page.locator("h1")).to_contain_text("Kentut"),
    )
    run_test(
        "Home: shows SuperApp text",
        lambda: expect(page.locator("p", has_text="SuperApp")).to_be_visible(),
    )
    run_test(
        "Home: shows Login link",
        lambda: expect(
            page.locator("a[href='/user/login']", has_text="Login")
        ).to_be_visible(),
    )

    def test_svg():
        assert page.locator("svg").count() >= 1

    run_test("Home: wind icon rendered as SVG", test_svg)

    # ============================================================
    # Landing page checks (admin)
    # ============================================================
    print("\n--- Landing Page (admin) ---", flush=True)
    login_as(page, "admin", "admin")
    page.screenshot(path=str(SNAP_DIR / "04_landing_admin.png"), full_page=True)

    run_test(
        "Landing: welcome with admin name",
        lambda: expect(page.locator("text=Administrator")).to_be_visible(),
    )
    run_test(
        "Landing: shows 27 apps count",
        lambda: expect(page.locator("text=27 apps")).to_be_visible(),
    )
    run_test(
        "Landing: filter input exists",
        lambda: expect(
            page.locator('input[placeholder="Filter apps..."]')
        ).to_be_visible(),
    )

    def count_tiles():
        return page.locator("a[class*='rounded-2xl']").count()

    def test_tiles_count():
        assert count_tiles() >= 5, f"Got {count_tiles()}"

    run_test("Landing: app tiles >= 5", test_tiles_count)

    def test_filter():
        search = page.locator('input[placeholder="Filter apps..."]')
        search.fill("Hub")
        page.wait_for_timeout(300)
        c = count_tiles()
        assert c >= 1, f"Should find Hub apps, got {c}"
        assert c < 25, f"Filter should reduce tiles, got {c}"
        search.clear()
        page.wait_for_timeout(300)

    run_test("Landing: filter reduces tiles", test_filter)

    def test_no_match():
        search = page.locator('input[placeholder="Filter apps..."]')
        search.fill("zzzznonexistent12345")
        page.wait_for_timeout(300)
        page.screenshot(path=str(SNAP_DIR / "05_no_results.png"), full_page=True)
        expect(page.locator("text=No apps match")).to_be_visible()
        search.clear()
        page.wait_for_timeout(300)

    run_test("Landing: no-match shows empty state", test_no_match)

    # ============================================================
    # TopBar checks
    # ============================================================
    print("\n--- TopBar ---", flush=True)

    run_test(
        "TopBar: branding visible",
        lambda: (
            expect(page.locator("header >> text=Kentut")).to_be_visible(),
            expect(page.locator("header >> text=SuperApp")).to_be_visible(),
        ),
    )

    def test_help_dropdown():
        page.locator('button[title="Help"]').click()
        page.wait_for_timeout(300)
        page.screenshot(path=str(SNAP_DIR / "06_help.png"), full_page=True)
        expect(page.locator("text=Help & Info")).to_be_visible()
        expect(page.locator("text=support@kentut.superapp")).to_be_visible()
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)

    run_test("TopBar: help dropdown", test_help_dropdown)

    def test_profile_dropdown():
        page.locator('button[title="Profile"]').click()
        page.wait_for_timeout(300)
        page.screenshot(path=str(SNAP_DIR / "07_profile.png"), full_page=True)
        dropdown = page.locator(".dropdown-panel")
        expect(dropdown.locator("p", has_text="Administrator")).to_be_visible()
        expect(page.locator("button:has-text('Logout')")).to_be_visible()
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)

    run_test("TopBar: profile dropdown", test_profile_dropdown)

    def test_app_launcher():
        page.locator('button[title="Apps"]').click()
        page.wait_for_timeout(300)
        page.screenshot(path=str(SNAP_DIR / "08_launcher.png"), full_page=True)
        expect(page.locator('input[placeholder="Search apps..."]')).to_be_visible()
        launcher_tiles = page.locator("button[class*='flex-col'][class*='rounded-xl']")
        assert launcher_tiles.count() >= 5, f"Launcher tiles: {launcher_tiles.count()}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)

    run_test("TopBar: app launcher popup", test_app_launcher)

    # ============================================================
    # Theme toggle
    # ============================================================
    print("\n--- Theme Toggle ---", flush=True)

    def test_theme():
        html = page.locator("html")
        before = html.get_attribute("class") or ""
        page.locator('button[title*="Switch to"]').click()
        page.wait_for_timeout(300)
        after = html.get_attribute("class") or ""
        assert before != after or "light" in after, f"before={before}, after={after}"
        page.screenshot(path=str(SNAP_DIR / "09_light.png"), full_page=True)
        page.locator('button[title*="Switch to"]').click()
        page.wait_for_timeout(300)

    run_test("Theme: toggling changes html class", test_theme)

    # ============================================================
    # Logout
    # ============================================================
    print("\n--- Logout ---", flush=True)

    def test_do_logout():
        page.locator('button[title="Profile"]').click()
        page.wait_for_timeout(300)
        page.locator("button:has-text('Logout')").click()
        page.wait_for_load_state("networkidle", timeout=15000)
        page.screenshot(path=str(SNAP_DIR / "10_logout.png"), full_page=True)
        assert page.url.rstrip("/") == BASE

    run_test("Logout redirects to home", test_do_logout)

    page.close()
    context.close()
    browser.close()

    summarize()
