import sys
import os
from pathlib import Path

PASSED = 0
FAILED = 0
RESULTS = []


def run_test(name, fn):
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


SNAP_DIR = Path("/tmp/uiden-screenshots")
SNAP_DIR.mkdir(exist_ok=True)

from playwright.sync_api import sync_playwright, expect

BASE = "http://localhost:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-gpu"])
    context = browser.new_context(viewport={"width": 1280, "height": 800})

    # ============================================================
    # PAGE: Home (/) — Unauthenticated
    # ============================================================
    print("\n--- Home Page (/) ---", flush=True)
    page = context.new_page()
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
            page.locator("a[href='/login']", has_text="Login")
        ).to_be_visible(),
    )

    def test_svg():
        assert page.locator("svg").count() >= 1

    run_test("Home: wind icon rendered as SVG", test_svg)

    # ============================================================
    # PAGE: Login (/login)
    # ============================================================
    print("\n--- Login Page (/login) ---", flush=True)
    page.goto(f"{BASE}/login", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "02_login.png"), full_page=True)

    run_test(
        "Login: shows Sign in heading",
        lambda: expect(page.locator("text=Sign in to your account")).to_be_visible(),
    )
    run_test(
        "Login: username and password inputs",
        lambda: (
            expect(page.locator('input[autocomplete="username"]')).to_be_visible(),
            expect(
                page.locator('input[autocomplete="current-password"]')
            ).to_be_visible(),
        ),
    )
    run_test(
        "Login: Sign in button",
        lambda: expect(page.locator('button:has-text("Sign in")')).to_be_visible(),
    )
    run_test(
        "Login: 4 auth method buttons",
        lambda: (
            expect(page.locator("text=AD / LDAP")).to_be_visible(),
            expect(page.locator("text=SSO / SAML2")).to_be_visible(),
            expect(page.locator("text=OAuth / OIDC")).to_be_visible(),
            expect(page.locator("text=Biometric")).to_be_visible(),
        ),
    )
    run_test(
        "Login: Forgot password and Register links",
        lambda: (
            expect(page.locator("text=Forgot password?")).to_be_visible(),
            expect(page.locator("text=Create one")).to_be_visible(),
        ),
    )

    def test_password_toggle():
        pwd = page.locator('input[autocomplete="current-password"]')
        assert pwd.get_attribute("type") == "password"
        pwd.fill("test123")
        toggle = pwd.evaluate_handle(
            "el => el.closest('div').querySelector('button[type=\"button\"]')"
        ).as_element()
        toggle.click()
        assert pwd.get_attribute("type") == "text"
        toggle.click()
        assert pwd.get_attribute("type") == "password"

    run_test("Login: password toggle works", test_password_toggle)

    # ============================================================
    # FLOW: Invalid credentials
    # ============================================================
    print("\n--- Login: Invalid Credentials ---", flush=True)

    def test_wrong_username():
        page.goto(f"{BASE}/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.locator('input[autocomplete="username"]').fill("nonexistent")
        page.locator('input[autocomplete="current-password"]').fill("wrong")
        page.locator('button:has-text("Sign in")').click()
        page.wait_for_timeout(800)
        page.screenshot(path=str(SNAP_DIR / "03_login_error.png"), full_page=True)
        expect(page.locator("text=User not found")).to_be_visible()

    def test_wrong_password():
        page.goto(f"{BASE}/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.locator('input[autocomplete="username"]').fill("admin")
        page.locator('input[autocomplete="current-password"]').fill("wrongpassword")
        page.locator('button:has-text("Sign in")').click()
        page.wait_for_timeout(800)
        expect(page.locator("text=Invalid password")).to_be_visible()

    run_test("Login error: wrong username", test_wrong_username)
    run_test("Login error: wrong password", test_wrong_password)

    # ============================================================
    # FLOW: Login as admin
    # ============================================================
    print("\n--- Login as admin ---", flush=True)

    def test_login_admin():
        page.goto(f"{BASE}/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.locator('input[autocomplete="username"]').fill("admin")
        page.locator('input[autocomplete="current-password"]').fill("admin")
        page.locator('button:has-text("Sign in")').click()
        page.wait_for_timeout(2000)
        page.screenshot(path=str(SNAP_DIR / "04_landing_admin.png"), full_page=True)
        assert "/landing" in page.url

    run_test("Login admin redirects to /landing", test_login_admin)

    # ============================================================
    # Landing page checks (admin)
    # ============================================================
    print("\n--- Landing Page (admin) ---", flush=True)

    run_test(
        "Landing: welcome with admin name",
        lambda: expect(page.locator("text=Administrator")).to_be_visible(),
    )
    run_test(
        "Landing: shows 100 apps count",
        lambda: expect(page.locator("text=100 apps")).to_be_visible(),
    )
    run_test(
        "Landing: filter input exists",
        lambda: expect(
            page.locator('input[placeholder="Filter apps..."]')
        ).to_be_visible(),
    )

    def count_tiles():
        return page.locator(
            "div[class*='rounded-2xl'][class*='cursor-pointer']"
        ).count()

    def test_tiles_count():
        assert count_tiles() >= 10, f"Got {count_tiles()}"

    run_test("Landing: app tiles >= 10", test_tiles_count)

    def test_filter():
        search = page.locator('input[placeholder="Filter apps..."]')
        search.fill("Firewall")
        page.wait_for_timeout(300)
        c = count_tiles()
        assert c >= 1, f"Should find Firewall Guard, got {c}"
        assert c < 90, f"Filter should reduce tiles, got {c}"
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
            expect(page.locator("button:has-text('Kentut')")).to_be_visible(),
            expect(page.locator("button:has-text('SuperApp')")).to_be_visible(),
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
        assert launcher_tiles.count() >= 10, f"Launcher tiles: {launcher_tiles.count()}"
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

    # ============================================================
    # Forgot Password
    # ============================================================
    print("\n--- Forgot Password ---", flush=True)
    page.goto(f"{BASE}/login/forgot-password", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "11_forgot.png"), full_page=True)

    run_test(
        "Forgot Password: heading and email",
        lambda: (
            expect(page.locator("text=Reset password")).to_be_visible(),
            expect(page.locator('input[type="email"]')).to_be_visible(),
        ),
    )

    def test_forgot_submit():
        page.locator('input[type="email"]').fill("test@company.com")
        page.locator('button:has-text("Send reset link")').click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(SNAP_DIR / "12_forgot_sent.png"), full_page=True)
        expect(page.locator("text=Check your email")).to_be_visible()

    run_test("Forgot Password: submit shows success", test_forgot_submit)
    run_test(
        "Forgot Password: back to login link",
        lambda: expect(page.locator("text=Back to login")).to_be_visible(),
    )

    # ============================================================
    # Register
    # ============================================================
    print("\n--- Register ---", flush=True)
    page.goto(f"{BASE}/login/register", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "13_register.png"), full_page=True)

    def test_register_fields():
        expect(page.locator("text=Create an account")).to_be_visible()
        expect(page.locator('input[placeholder="John"]')).to_be_visible()
        expect(page.locator('input[placeholder="Doe"]')).to_be_visible()
        assert page.locator('input[autocomplete="new-password"]').count() == 2

    run_test("Register: heading and fields", test_register_fields)
    run_test(
        "Register: checkbox and submit",
        lambda: (
            expect(page.locator('input[type="checkbox"]')).to_be_visible(),
            expect(page.locator('button:has-text("Create account")')).to_be_visible(),
        ),
    )

    # ============================================================
    # Role-based: staff (10), director (30), manager (20)
    # ============================================================

    def login_as(user, password, expected_apps):
        page.goto(f"{BASE}/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.evaluate("() => sessionStorage.clear()")
        page.wait_for_timeout(500)
        if "/login" not in page.url:
            page.goto(f"{BASE}/login", timeout=15000)
            page.wait_for_load_state("networkidle", timeout=15000)
        page.locator('input[autocomplete="username"]').fill(user)
        page.locator('input[autocomplete="current-password"]').fill(password)
        page.locator('button:has-text("Sign in")').click()
        page.wait_for_timeout(2000)
        assert "/landing" in page.url, f"Expected /landing, got {page.url}"

    def do_logout():
        page.locator('button[title="Profile"]').click()
        page.wait_for_timeout(300)
        page.locator("button:has-text('Logout')").click()
        page.wait_for_load_state("networkidle", timeout=15000)

    print("\n--- Role: Staff (10 apps) ---", flush=True)

    def test_staff():
        login_as("staff", "staff", 10)
        page.screenshot(path=str(SNAP_DIR / "14_staff.png"), full_page=True)
        expect(page.locator("text=10 apps")).to_be_visible()
        c = page.locator("div[class*='rounded-2xl'][class*='cursor-pointer']").count()
        assert c == 10, f"Expected 10 tiles, got {c}"
        do_logout()

    run_test("Staff sees 10 apps", test_staff)

    print("\n--- Role: Director (30 apps) ---", flush=True)

    def test_director():
        login_as("director", "director", 30)
        page.screenshot(path=str(SNAP_DIR / "15_director.png"), full_page=True)
        expect(page.locator("text=30 apps")).to_be_visible()
        c = page.locator("div[class*='rounded-2xl'][class*='cursor-pointer']").count()
        assert c == 30, f"Expected 30 tiles, got {c}"
        do_logout()

    run_test("Director sees 30 apps", test_director)

    print("\n--- Role: Manager (20 apps) ---", flush=True)

    def test_manager():
        login_as("manager", "manager", 20)
        page.screenshot(path=str(SNAP_DIR / "16_manager.png"), full_page=True)
        expect(page.locator("text=20 apps")).to_be_visible()
        c = page.locator("div[class*='rounded-2xl'][class*='cursor-pointer']").count()
        assert c == 20, f"Expected 20 tiles, got {c}"
        do_logout()

    run_test("Manager sees 20 apps", test_manager)

    # ============================================================
    # Auth redirects
    # ============================================================
    print("\n--- Auth Redirects ---", flush=True)

    def test_auth_redirect_to_landing():
        login_as("admin", "admin", 100)
        page.goto(BASE, timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        assert "/landing" in page.url
        do_logout()

    run_test("Authenticated / redirects to /landing", test_auth_redirect_to_landing)

    def test_unauth_redirect_to_login():
        page.goto(f"{BASE}/landing", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        assert "/login" in page.url

    run_test(
        "Unauthenticated /landing redirects to /login", test_unauth_redirect_to_login
    )

    # ============================================================
    page.close()
    context.close()
    browser.close()

summarize()
