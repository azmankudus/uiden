import sys
from pathlib import Path
from typing import Callable

PASSED = 0
FAILED = 0
RESULTS = []

SNAP_DIR = Path("/tmp/uiden-screenshots/auth")
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
    # PAGE: Login (/user/login)
    # ============================================================
    print("\n--- Login Page (/user/login) ---", flush=True)
    page.goto(f"{BASE}/user/login", timeout=15000)
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
        page.goto(f"{BASE}/user/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.locator('input[autocomplete="username"]').fill("nonexistent")
        page.locator('input[autocomplete="current-password"]').fill("wrong")
        page.locator('button:has-text("Sign in")').click()
        page.wait_for_timeout(800)
        page.screenshot(path=str(SNAP_DIR / "03_login_error.png"), full_page=True)
        expect(page.locator("text=User not found")).to_be_visible()

    def test_wrong_password():
        page.goto(f"{BASE}/user/login", timeout=15000)
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
        page.goto(f"{BASE}/user/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.locator('input[autocomplete="username"]').fill("admin")
        page.locator('input[autocomplete="current-password"]').fill("admin")
        page.locator('button:has-text("Sign in")').click()
        page.wait_for_timeout(2000)
        assert "/landing" in page.url

    run_test("Login admin redirects to /landing", test_login_admin)

    # ============================================================
    # Role-based: staff (5), director (15), manager (10)
    # ============================================================

    print("\n--- Role: Staff (5 apps) ---", flush=True)

    def test_staff():
        login_as(page, "staff", "staff")
        page.screenshot(path=str(SNAP_DIR / "14_staff.png"), full_page=True)
        expect(page.locator("text=5 apps")).to_be_visible()

    run_test("Staff sees 5 apps", test_staff)

    print("\n--- Role: Director (15 apps) ---", flush=True)

    def test_director():
        login_as(page, "director", "director")
        page.screenshot(path=str(SNAP_DIR / "15_director.png"), full_page=True)
        expect(page.locator("text=15 apps")).to_be_visible()

    run_test("Director sees 15 apps", test_director)

    print("\n--- Role: Manager (10 apps) ---", flush=True)

    def test_manager():
        login_as(page, "manager", "manager")
        page.screenshot(path=str(SNAP_DIR / "16_manager.png"), full_page=True)
        expect(page.locator("text=10 apps")).to_be_visible()

    run_test("Manager sees 10 apps", test_manager)

    # ============================================================
    # Auth redirects
    # ============================================================
    print("\n--- Auth Redirects ---", flush=True)

    def test_auth_redirect_to_landing():
        login_as(page, "admin", "admin")
        page.goto(BASE, timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        assert "/landing" in page.url
        do_logout(page)

    run_test("Authenticated / redirects to /landing", test_auth_redirect_to_landing)

    def test_unauth_redirect_to_login():
        page.goto(f"{BASE}/landing", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        assert "/user/login" in page.url

    run_test(
        "Unauthenticated /landing redirects to /user/login",
        test_unauth_redirect_to_login,
    )

    # ============================================================
    # Old route redirects
    # ============================================================
    print("\n--- Old Route Redirects ---", flush=True)

    def test_old_login_redirect():
        page.goto(f"{BASE}/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        assert "/user/login" in page.url

    run_test("Old /login redirects to /user/login", test_old_login_redirect)

    def test_old_forgot_password_redirect():
        page.goto(f"{BASE}/login/forgot-password", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        assert "/user/login/forgot-password" in page.url

    run_test("Old /login/forgot-password redirects", test_old_forgot_password_redirect)

    def test_old_register_redirect():
        page.goto(f"{BASE}/login/register", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        assert "/user/login/register" in page.url

    run_test("Old /login/register redirects", test_old_register_redirect)

    def test_old_user_settings_redirect():
        login_as(page, "admin", "admin")
        page.goto(f"{BASE}/user/settings", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(1000)
        assert "/user/setting" in page.url

    run_test(
        "Old /user/settings redirects to /user/setting", test_old_user_settings_redirect
    )

    def test_old_user_settings_redirect2():
        page.goto(f"{BASE}/user-settings", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(1000)
        assert "/user/setting" in page.url

    run_test(
        "Old /user-settings redirects to /user/setting",
        test_old_user_settings_redirect2,
    )

    # ============================================================
    # Forgot Password
    # ============================================================
    print("\n--- Forgot Password ---", flush=True)
    page.goto(f"{BASE}/user/login/forgot-password", timeout=15000)
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
    page.goto(f"{BASE}/user/login/register", timeout=15000)
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
    # User Management (/user/manage)
    # ============================================================
    print("\n--- User Management (/user/manage) ---", flush=True)

    def test_management_page():
        login_as(page, "admin", "admin")
        page.goto(f"{BASE}/user/manage", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(2000)
        page.screenshot(path=str(SNAP_DIR / "17_management.png"), full_page=True)
        expect(page.locator("aside >> text=Users")).to_be_visible()
        expect(page.locator("table")).to_be_visible()

    run_test("Management: page loads with sidenav and table", test_management_page)

    def test_management_user_table():
        expect(page.locator("table")).to_be_visible()
        assert page.locator("table tbody tr").count() >= 5

    run_test("Management: user table with rows", test_management_user_table)

    def test_management_add_user():
        page.locator('button:has-text("Add User")').click()
        page.wait_for_timeout(300)
        expect(page.locator("text=New User")).to_be_visible()
        page.locator('input[placeholder="username"]').fill("test.user")
        page.locator('input[placeholder="Full Name"]').fill("Test User")
        page.locator('input[placeholder="user@company.com"]').fill(
            "test@kentut.superapp"
        )
        page.locator('button:has-text("Create User")').click()
        page.wait_for_timeout(300)
        expect(page.locator("text=@test.user")).to_be_visible()
        page.screenshot(path=str(SNAP_DIR / "18_management_add.png"), full_page=True)

    run_test("Management: add user", test_management_add_user)

    def test_management_roles_tab():
        page.locator("aside >> text=Roles & Permissions").click()
        page.wait_for_timeout(1000)
        expect(page.locator("main >> h3:has-text('Administrator')")).to_be_visible()
        expect(page.locator("main >> h3:has-text('Staff')")).to_be_visible()
        page.screenshot(path=str(SNAP_DIR / "19_management_roles.png"), full_page=True)

    run_test("Management: roles tab", test_management_roles_tab)

    def test_management_expand_role():
        page.locator(
            "main >> h3:has-text('Administrator') >> xpath=ancestor::button"
        ).click()
        page.wait_for_timeout(500)
        expect(
            page.locator("main").locator("span", has_text="Full Access").first
        ).to_be_visible()
        page.screenshot(path=str(SNAP_DIR / "20_role_expanded.png"), full_page=True)

    run_test("Management: expand role shows permissions", test_management_expand_role)

    def test_management_app_access_tab():
        page.locator("aside >> text=App Access Map").click()
        page.wait_for_timeout(1000)
        expect(page.locator("main >> text=Select a user above")).to_be_visible()

    run_test("Management: app access tab", test_management_app_access_tab)

    def test_management_unauth_redirect():
        do_logout(page)
        anon = context.new_page()
        anon.goto(f"{BASE}/user/manage", timeout=15000)
        anon.wait_for_load_state("networkidle", timeout=15000)
        anon.wait_for_timeout(500)
        assert "/user/login" in anon.url, f"Expected /user/login, got {anon.url}"
        anon.close()

    run_test(
        "Management: unauthenticated redirects to /user/login",
        test_management_unauth_redirect,
    )

    page.close()
    context.close()
    browser.close()

    summarize()
