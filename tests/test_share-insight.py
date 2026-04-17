import sys
from pathlib import Path
from typing import Callable

PASSED = 0
FAILED = 0
RESULTS = []

SNAP_DIR = Path("/tmp/uiden-screenshots/apps/share-insight")
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
    page.goto(f"{BASE}/share-insight/public", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "01_public_landing.png"), full_page=True)

    run_test(
        "Public Landing: shows Share Insight branding",
        lambda: expect(page.locator("h1")).to_contain_text("Share Insight"),
    )
    run_test(
        "Public Landing: shows hero description",
        lambda: expect(page.locator("text=collaborate securely")).to_be_visible(),
    )

    # ============================================================
    # Private dashboard
    # ============================================================
    print("\n--- Private Dashboard ---", flush=True)
    page.goto(f"{BASE}/share-insight/private", timeout=15000)
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
    run_test(
        "Dashboard: shows quick actions",
        lambda: expect(page.locator("text=Quick Actions")).to_be_visible(),
    )

    # ============================================================
    # Scans page
    # ============================================================
    print("\n--- Scans Page ---", flush=True)
    page.goto(f"{BASE}/share-insight/private/scans", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "03_scans.png"), full_page=True)

    run_test(
        "Scans: shows table with scan records",
        lambda: expect(page.locator("table")).to_be_visible(),
    )
    run_test(
        "Scans: shows search input",
        lambda: expect(page.locator('input[placeholder*="Search"]')).to_be_visible(),
    )

    # ============================================================
    # Folders page
    # ============================================================
    print("\n--- Folders Page ---", flush=True)
    page.goto(f"{BASE}/share-insight/private/folders", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "04_folders.png"), full_page=True)

    run_test(
        "Folders: shows folder cards",
        lambda: expect(page.locator(".card-grid")).to_be_visible(),
    )

    # ============================================================
    # Permissions page
    # ============================================================
    print("\n--- Permissions Page ---", flush=True)
    page.goto(f"{BASE}/share-insight/private/permissions", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "05_permissions.png"), full_page=True)

    run_test(
        "Permissions: shows permission list",
        lambda: expect(page.locator("table")).to_be_visible(),
    )

    # ============================================================
    # Reports page
    # ============================================================
    print("\n--- Reports Page ---", flush=True)
    page.goto(f"{BASE}/share-insight/private/reports", timeout=15000)
    page.wait_for_load_state("networkidle", timeout=15000)
    page.screenshot(path=str(SNAP_DIR / "06_reports.png"), full_page=True)

    run_test(
        "Reports: shows report table",
        lambda: expect(page.locator("table")).to_be_visible(),
    )

    page.close()
    context.close()
    browser.close()

    summarize()
