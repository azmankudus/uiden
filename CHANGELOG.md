# Change Log

All notable changes to Kentut SuperApp are documented in this file.

## [2025-04-28] - Simple Brand Animation

### Description
Replaced complex Tron-style door animation with simple 3-phase fade in/out sequence. Brand now smoothly fades in (1s), displays for 2.5s, then fades out (1.5s) as landing page reveals. All code significantly simplified and more maintainable.

### Files Changed
- `src/routes/index.tsx` - Simplified to 3-phase animation (removed 400+ lines of complex code)
- `src/app.css` - Replaced all Tron styles with simple fade animations (removed 400+ lines of complex CSS)
- `docs/simple-brand-animation.md` - Renamed and updated documentation

### Breaking Changes
None - Just removed complex animation, no breaking changes

### Related Issues
N/A


## [2025-04-28] - User Management System Implementation

### Description
Implemented complete user management system with four integrated tabs (Users, Groups, Permissions, Auth Config) and updated login flow to support three-page authentication (SSO → AD/LDAP → Local). Provides administrators with comprehensive tools for managing user accounts, groups, role-based permissions, and authentication provider configurations.

### Files Changed
- `src/routes/user/management/index.tsx` - Refactored main management page (543 → 100 lines)
- `src/routes/user/management/components/*` - 8 new components for tabs and forms
- `src/routes/user/management/lib/*` - 4 core infrastructure files with types, constants, store, mock data
- `src/routes/user/login/index.tsx` - Converted to SSO provider page (Page 1)
- `src/routes/user/login/ad-ldap.tsx` - New AD/LDAP credentials page (Page 2)
- `src/routes/user/login/local.tsx` - New local account page (Page 3)
- `src/routes/user/manage/index.tsx` - Added redirect to new management route
- `docs/user-management-system.md` - Comprehensive implementation documentation

### Key Features
- Users tab with CRUD operations, search, and filtering
- Groups management with membership assignment
- Role-based permission matrix for fine-grained access control
- Auth provider configuration (AD/LDAP, SAML2, OIDC)
- Three-page login flow with progressive authentication
- LocalStorage persistence with unified `MANAGEMENT_STORE` API
- Full TypeScript typing and responsive design

### Breaking Changes
- Login flow restructured from single page to three pages
- `/user/manage` now redirects to `/user/management`
- Storage keys standardized with consistent prefixes

### Related Issues
Production implementation requires backend API integration for real user data storage.


## [2025-04-28] - Settings Back Button Fix

### Description
Fixed back button behavior in settings page by replacing hash-based navigation with router-based navigation. Back button now correctly navigates to previous page or `/landing` without going through multiple history entries.

### Files Changed
- `src/routes/user/setting/index.tsx` - Migrated to router-based navigation, added tab state cleanup
- `src/shell/components/AppHeader.tsx` - Added referrer tracking, smart back button logic
- `docs/back-button-fix.md` - Comprehensive change documentation
- `docs/AGENT_WORKFLOW.md` - Agent documentation workflow standards
- `docs/TEMPLATES/CHANGE_DOCUMENTATION.md` - Documentation template
- `CHANGELOG.md` - Started change log with entry for back button fix
- `AGENTS.md` - Added documentation workflow section
- `README.md` - Added agent documentation workflow overview

### Breaking Changes
None

### Related Issues
N/A

