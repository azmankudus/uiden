import sys
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


SNAP_DIR = Path("/tmp/uiden-screenshots/ayam-goreng")
SNAP_DIR.mkdir(parents=True, exist_ok=True)

from playwright.sync_api import sync_playwright, expect

BASE = "http://localhost:3000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
    context = browser.new_context(viewport={"width": 1280, "height": 900})

    # ============================================================
    # /ayam-goreng redirect
    # ============================================================
    print("\n--- /ayam-goreng redirect ---", flush=True)
    page = context.new_page()
    page.goto(f"{BASE}/ayam-goreng", timeout=15000)
    page.wait_for_timeout(2000)
    page.screenshot(path=str(SNAP_DIR / "redirect.png"), full_page=True)

    def test_redirect():
        assert "/ayam-goreng/public" in page.url, (
            f"Expected /ayam-goreng/public, got {page.url}"
        )

    run_test("/ayam-goreng redirects to /ayam-goreng/public", test_redirect)

    # ============================================================
    # PUBLIC: Landing
    # ============================================================
    print("\n--- Public: Landing ---", flush=True)
    page.screenshot(path=str(SNAP_DIR / "public_landing.png"), full_page=True)

    run_test(
        "Landing: PublicNav with links",
        lambda: (
            expect(page.locator("nav")).to_be_visible(),
            expect(page.locator("nav >> a:has-text('Documentation')")).to_be_visible(),
            expect(page.locator("nav >> a:has-text('Help & FAQ')")).to_be_visible(),
            expect(page.locator("nav >> a:has-text('Contact')")).to_be_visible(),
            expect(page.locator("nav >> a:has-text('About')")).to_be_visible(),
        ),
    )

    run_test(
        "Landing: search button",
        lambda: (expect(page.locator("button:has-text('Search')")).to_be_visible(),),
    )

    run_test(
        "Landing: Sign in button",
        lambda: (expect(page.locator('a[href="/user/login"]')).to_be_visible(),),
    )

    def test_landing_cards():
        assert page.locator("h2, h3").count() >= 4

    run_test("Landing: feature cards", test_landing_cards)

    def test_nav_links():
        page.goto(f"{BASE}/ayam-goreng/public/about", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        assert "/ayam-goreng/public/about" in page.url
        page.go_back()
        page.wait_for_timeout(500)

    run_test("Landing: nav links navigate", test_nav_links)

    # ============================================================
    # PUBLIC: Help & FAQ
    # ============================================================
    print("\n--- Public: Help & FAQ ---", flush=True)
    page.goto(f"{BASE}/ayam-goreng/public/help", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "public_help.png"), full_page=True)

    run_test(
        "Help: heading", lambda: expect(page.locator("h1")).to_contain_text("Help")
    )

    def test_help_content():
        assert page.locator("h1, h2, h3, p").count() >= 6

    run_test("Help: content exists", test_help_content)
    run_test(
        "Help: support channels",
        lambda: expect(page.locator("text=Email")).to_be_visible(),
    )

    # ============================================================
    # PUBLIC: Contact
    # ============================================================
    print("\n--- Public: Contact ---", flush=True)
    page.goto(f"{BASE}/ayam-goreng/public/contact", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "public_contact.png"), full_page=True)

    run_test(
        "Contact: heading", lambda: expect(page.locator("h1")).to_contain_text("Touch")
    )

    def test_contact_form():
        assert page.locator('input[type="text"], input[type="email"]').count() >= 2
        assert page.locator("textarea").count() >= 1

    run_test("Contact: form fields", test_contact_form)

    def test_contact_submit():
        page.locator("textarea").fill("Test message")
        page.locator('button:has-text("Send")').click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(SNAP_DIR / "public_contact_sent.png"), full_page=True)

    run_test("Contact: submit button works", test_contact_submit)

    def test_contact_offices():
        assert page.locator("h3, h2, p").count() >= 3

    run_test("Contact: office info", test_contact_offices)

    # ============================================================
    # PUBLIC: About
    # ============================================================
    print("\n--- Public: About ---", flush=True)
    page.goto(f"{BASE}/ayam-goreng/public/about", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "public_about.png"), full_page=True)

    run_test(
        "About: heading", lambda: expect(page.locator("h1")).to_contain_text("About")
    )

    def test_about_values():
        assert page.locator("h2, h3").count() >= 3

    run_test("About: values section", test_about_values)

    def test_about_team():
        avatars = page.locator("[class*='rounded-full'], [class*='rounded-xl']")
        assert avatars.count() >= 3

    run_test("About: team members", test_about_team)

    # ============================================================
    # PUBLIC: Search dialog
    # ============================================================
    print("\n--- Public: Search ---", flush=True)
    page.goto(f"{BASE}/ayam-goreng/public", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)

    def test_search_open():
        page.keyboard.press("Control+k")
        page.wait_for_timeout(300)
        expect(page.locator('input[placeholder*="Search"]')).to_be_visible()
        page.screenshot(path=str(SNAP_DIR / "search_open.png"), full_page=True)
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)

    run_test("Search: opens on click", test_search_open)

    def test_search_results():
        page.keyboard.press("Control+k")
        page.wait_for_timeout(300)
        page.locator('input[placeholder*="Search"]').fill("Help")
        page.wait_for_timeout(300)
        page.screenshot(path=str(SNAP_DIR / "search_results.png"), full_page=True)
        assert page.locator("text=Help").count() >= 1
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)

    run_test("Search: shows results", test_search_results)

    def test_search_navigate():
        page.keyboard.press("Control+k")
        page.wait_for_timeout(300)
        page.locator('input[placeholder*="Search"]').fill("Contact")
        page.wait_for_timeout(300)
        page.locator("button:has-text('Contact')").first.click()
        page.wait_for_timeout(1000)
        assert "/contact" in page.url

    run_test("Search: navigates on click", test_search_navigate)

    # ============================================================
    # PRIVATE: Login helper
    # ============================================================
    def login_as(user, password):
        page.goto(f"{BASE}/user/login", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.evaluate("() => sessionStorage.clear()")
        page.wait_for_timeout(500)
        if "/user/login" not in page.url:
            page.goto(f"{BASE}/user/login", timeout=15000)
            page.wait_for_load_state("networkidle", timeout=15000)
        page.locator('input[autocomplete="username"]').fill(user)
        page.locator('input[autocomplete="current-password"]').fill(password)
        page.locator('button:has-text("Sign in")').click()
        page.wait_for_timeout(3000)

    # ============================================================
    # PRIVATE: Dashboard
    # ============================================================
    print("\n--- Private: Dashboard ---", flush=True)

    def test_private_login():
        login_as("admin", "admin")
        page.goto(f"{BASE}/ayam-goreng/private", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        page.screenshot(path=str(SNAP_DIR / "private_dashboard.png"), full_page=True)
        assert "/ayam-goreng/private" in page.url, f"Got {page.url}"

    run_test("Private: login and load dashboard", test_private_login)

    run_test(
        "Dashboard: welcome with user name",
        lambda: expect(page.locator("main >> text=Administrator")).to_be_visible(),
    )

    def test_dashboard_stats():
        cards = page.locator("[class*='rounded-2xl'], [class*='rounded-xl']")
        assert cards.count() >= 4

    run_test("Dashboard: stat cards", test_dashboard_stats)

    run_test(
        "Dashboard: side navigation",
        lambda: expect(page.locator("aside")).to_be_visible(),
    )
    run_test(
        "Dashboard: top bar user",
        lambda: expect(page.locator('button[title="Profile"]')).to_be_visible(),
    )

    # ============================================================
    # PRIVATE: Side nav
    # ============================================================
    print("\n--- Private: Side Nav ---", flush=True)

    run_test(
        "SideNav: Dashboard link",
        lambda: expect(page.locator("aside >> text=Dashboard")).to_be_visible(),
    )
    run_test(
        "SideNav: Modules group",
        lambda: expect(page.locator("aside >> text=Modules")).to_be_visible(),
    )
    run_test(
        "SideNav: Administration",
        lambda: expect(page.locator("aside >> text=Administration")).to_be_visible(),
    )

    def test_sidenav_expand():
        page.locator("aside >> text=Modules").click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(SNAP_DIR / "sidenav_expanded.png"), full_page=True)
        expect(
            page.locator("aside").get_by_role("button", name="Security")
        ).to_be_visible()
        expect(
            page.locator("aside").get_by_role("button", name="Infrastructure")
        ).to_be_visible()

    run_test("SideNav: expand Modules", test_sidenav_expand)

    def test_sidenav_subtree():
        page.locator("aside").get_by_role("button", name="Security").click()
        page.wait_for_timeout(500)
        expect(
            page.locator("aside").get_by_role("link", name="Firewall Guard")
        ).to_be_visible()
        page.screenshot(path=str(SNAP_DIR / "sidenav_subtree.png"), full_page=True)

    run_test("SideNav: expand Security sub-tree", test_sidenav_subtree)

    def test_sidenav_navigate():
        page.locator("aside").get_by_role("link", name="Firewall Guard").click()
        page.wait_for_timeout(1000)
        assert "/modules/firewall-guard" in page.url

    run_test("SideNav: navigate via tree item", test_sidenav_navigate)

    def test_sidenav_collapse():
        page.goto(f"{BASE}/ayam-goreng/private", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        aside = page.locator("aside")
        full_w = aside.bounding_box()["width"]
        page.locator("aside >> text=Collapse").click()
        page.wait_for_timeout(400)
        col_w = aside.bounding_box()["width"]
        assert col_w < full_w, f"Collapsed {col_w} should < {full_w}"
        page.screenshot(path=str(SNAP_DIR / "sidenav_collapsed.png"), full_page=True)

    run_test("SideNav: collapse button", test_sidenav_collapse)

    # ============================================================
    # PRIVATE: Module page
    # ============================================================
    print("\n--- Private: Module ---", flush=True)
    page.goto(f"{BASE}/ayam-goreng/private/modules/firewall-guard", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "module_firewall.png"), full_page=True)

    run_test(
        "Module: heading",
        lambda: expect(page.locator("h1")).to_contain_text("Firewall Guard"),
    )

    def test_module_status():
        expect(page.locator("text=Active")).to_be_visible()
        expect(page.locator("text=99.98%")).to_be_visible()

    run_test("Module: status info", test_module_status)

    def test_module_notfound():
        page.goto(f"{BASE}/ayam-goreng/private/modules/zzz-nonexistent", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        expect(page.locator("h1:has-text('not found')")).to_be_visible()

    run_test("Module: unknown slug shows not found", test_module_notfound)

    # ============================================================
    # PRIVATE: Admin pages
    # ============================================================
    print("\n--- Private: Admin ---", flush=True)
    page.goto(f"{BASE}/ayam-goreng/private/admin", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "admin_index.png"), full_page=True)

    run_test(
        "Admin: heading", lambda: expect(page.locator("h1")).to_contain_text("Admin")
    )
    run_test(
        "Admin: cards",
        lambda: (
            expect(page.locator("h3:has-text('Users & Groups')")).to_be_visible(),
            expect(page.locator("h3:has-text('Roles & Permissions')")).to_be_visible(),
            expect(page.locator("h3:has-text('Audit Log')")).to_be_visible(),
        ),
    )

    page.goto(f"{BASE}/ayam-goreng/private/admin/users", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "admin_users.png"), full_page=True)

    run_test(
        "Users: heading", lambda: expect(page.locator("h1")).to_contain_text("Users")
    )

    def test_users_content():
        inputs = page.locator("input")
        assert inputs.count() >= 1

    run_test("Users: has filter input", test_users_content)

    page.goto(f"{BASE}/ayam-goreng/private/admin/roles", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "admin_roles.png"), full_page=True)

    run_test(
        "Roles: heading", lambda: expect(page.locator("h1")).to_contain_text("Roles")
    )
    run_test(
        "Roles: Admin role",
        lambda: expect(page.locator("main >> text=Admin")).to_be_visible(),
    )
    run_test(
        "Roles: Staff role",
        lambda: expect(page.locator("main >> text=Staff")).to_be_visible(),
    )

    page.goto(f"{BASE}/ayam-goreng/private/admin/settings", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "admin_settings.png"), full_page=True)

    run_test(
        "Settings: heading",
        lambda: expect(page.locator("h1")).to_contain_text("Settings"),
    )

    def test_settings_inputs():
        assert page.locator("input").count() >= 1

    run_test("Settings: has form inputs", test_settings_inputs)

    page.goto(f"{BASE}/ayam-goreng/private/admin/audit", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.screenshot(path=str(SNAP_DIR / "admin_audit.png"), full_page=True)

    run_test(
        "Audit: heading", lambda: expect(page.locator("h1")).to_contain_text("Audit")
    )

    def test_audit_filters():
        filters = page.locator("main").locator("div.flex.items-center.gap-2 > button")
        assert filters.count() >= 4
        expect(filters.first).to_be_visible()

    run_test("Audit: filter buttons", test_audit_filters)

    # ============================================================
    # PRIVATE: Search with private results
    # ============================================================
    print("\n--- Private: Search ---", flush=True)
    page.goto(f"{BASE}/ayam-goreng/private", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.wait_for_timeout(500)

    def test_search_private():
        page.keyboard.press("Control+k")
        page.wait_for_timeout(300)
        page.locator('input[placeholder*="Search"]').fill("Firewall")
        page.wait_for_timeout(300)
        page.screenshot(path=str(SNAP_DIR / "search_private.png"), full_page=True)
        assert page.locator("text=Firewall").count() >= 1
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)

    run_test("Search: private results include modules", test_search_private)

    # ============================================================
    # PRIVATE: Auth guard
    # ============================================================
    print("\n--- Private: Auth Guard ---", flush=True)

    def test_unauth_redirect():
        anon = context.new_page()
        anon.goto(f"{BASE}/ayam-goreng/private", timeout=15000)
        anon.wait_for_load_state("networkidle", timeout=15000)
        anon.wait_for_timeout(500)
        assert "/user/login" in anon.url, f"Expected /user/login, got {anon.url}"
        anon.close()

    run_test("Unauthenticated redirects to /user/login", test_unauth_redirect)

    # ============================================================
    # PRIVATE: Role-based access
    # ============================================================
    print("\n--- Private: Roles ---", flush=True)

    def test_staff_role():
        page.goto(f"{BASE}/ayam-goreng/private", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.evaluate("() => sessionStorage.clear()")
        page.wait_for_timeout(500)
        login_as("staff", "staff")
        page.goto(f"{BASE}/ayam-goreng/private", timeout=15000)
        page.wait_for_load_state("networkidle", timeout=15000)
        page.wait_for_timeout(500)
        expect(page.locator("main >> text=Staff")).to_be_visible()
        page.screenshot(path=str(SNAP_DIR / "staff_dashboard.png"), full_page=True)

    run_test("Staff can access dashboard", test_staff_role)

    # ============================================================
    page.close()
    context.close()
    browser.close()

summarize()
