#!/usr/bin/env python3
"""
Test runner for Kentut SuperApp
Run all tests or specific test suites.

Usage:
    python3 tests/run.py              # Run all tests
    python3 tests/run.py superapp     # Run superapp tests only
    python3 tests/run.py auth         # Run auth tests only
    python3 tests/run.py apps         # Run all app tests
    python3 tests/run.py share-insight  # Run specific app test
"""

import sys
import subprocess
from pathlib import Path

TESTS_DIR = Path(__file__).parent

# Define test suites
SUITES = {
    "superapp": ["tests/test_superapp.py"],
    "auth": ["tests/test_auth.py"],
    "apps": [
        "tests/test_share-insight.py",
        "tests/test_base-insight.py",
        "tests/test_middle-hub.py",
        "tests/test_web-hub.py",
        "tests/test_cert-hub.py",
        "tests/test_secret-hub.py",
        "tests/test_patch-hub.py",
        "tests/test_auto-hub.py",
        "tests/test_software-hub.py",
        "tests/test_ticket-hub.py",
        "tests/test_metrics-hub.py",
        "tests/test_log-hub.py",
        "tests/test_virtual-hub.py",
        "tests/test_ip-hub.py",
        "tests/test_dr-hub.py",
        "tests/test_keep-hub.py",
        "tests/test_send-hub.py",
        "tests/test_asset-hub.py",
        "tests/test_user-hub.py",
        "tests/test_remote-hub.py",
        "tests/test_runtime-hub.py",
        "tests/test_doc-hub.py",
        "tests/test_any-gen.py",
        "tests/test_lucky-hub.py",
        "tests/test_time-hub.py",
        "tests/test_event-hub.py",
        "tests/test_mark-hub.py",
    ],
}

ALL_TESTS = []
for suite_tests in SUITES.values():
    ALL_TESTS.extend(suite_tests)


def run_test_file(test_file):
    """Run a single test file and return the result."""
    print(f"\n{'=' * 60}")
    print(f"Running: {test_file}")
    print(f"{'=' * 60}\n", flush=True)
    result = subprocess.run(
        ["python3", test_file],
        cwd=TESTS_DIR.parent,
        capture_output=False,
    )
    return result.returncode == 0


def main():
    # Parse arguments
    if len(sys.argv) == 1:
        # No arguments, run all tests
        targets = ALL_TESTS
    elif sys.argv[1] == "help" or sys.argv[1] == "--help" or sys.argv[1] == "-h":
        print(__doc__)
        sys.exit(0)
    elif sys.argv[1] in SUITES:
        # Run specific suite
        targets = SUITES[sys.argv[1]]
    elif sys.argv[1] == "apps":
        # Run all app tests
        targets = SUITES["apps"]
    else:
        # Try to find specific app test
        app_name = sys.argv[1]
        possible_test = TESTS_DIR / f"test_{app_name}.py"
        if possible_test.exists():
            targets = [str(possible_test)]
        else:
            print(f"Unknown test suite: {app_name}")
            print(f"\nAvailable suites: {', '.join(SUITES.keys())}")
            print("\nOr specify an app name (e.g., share-insight)")
            sys.exit(1)

    # Run tests
    failed = []
    for test_file in targets:
        if not run_test_file(test_file):
            failed.append(test_file)

    # Summary
    print(f"\n{'=' * 60}")
    print(f"Overall Results")
    print(f"{'=' * 60}")
    print(f"Total test files: {len(targets)}")
    print(f"Passed: {len(targets) - len(failed)}")
    print(f"Failed: {len(failed)}")

    if failed:
        print(f"\nFailed test files:")
        for f in failed:
            print(f"  - {f}")
        sys.exit(1)
    else:
        print(f"\nAll tests passed!")
        sys.exit(0)


if __name__ == "__main__":
    main()
