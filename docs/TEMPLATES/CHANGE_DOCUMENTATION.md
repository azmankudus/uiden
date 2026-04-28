# Change Documentation Template

Use this template for documenting all changes to the codebase.

## Change Metadata

**Title:** [Short, descriptive title]
**Date:** [YYYY-MM-DD]
**Type:** [feat | fix | refactor | docs | style | test | chore]
**Agent:** [Agent name]
**Related Issues:** [Issue numbers or references]

---

## Overview

### Problem Statement
[Describe the problem being solved or requirement being met]

### Solution Approach
[Describe the high-level approach taken to solve the problem]

### User Impact
[How users will experience this change]
[What functionality is added or improved]
[What might break or require adjustment]

---

## Files Modified

### Changed Files
List all files that were modified in this change:

- `src/path/to/file1.tsx` - [Description of change]
- `src/path/to/file2.tsx` - [Description of change]
- `src/path/to/file3.tsx` - [Description of change]

### Deleted Files
- `src/path/to/deleted-file.tsx` - [Reason for deletion]

### New Files
- `src/path/to/new-file.tsx` - [Purpose of new file]

### File Statistics
- **Files Changed:** [Number]
- **Lines Added:** [Number]
- **Lines Removed:** [Number]
- **Lines Modified:** [Number]

---

## Technical Approach

### Implementation Strategy
[Describe the technical strategy used]

**Example:**
```
Approach: Replaced hash-based navigation with router-based
Strategy: Use SolidJS navigate() with query params
Rationale: Eliminates browser history pollution from hash changes
```

### Key Technical Decisions
[Document important technical decisions and trade-offs]

**Decision 1:**
- **Choice:** [What was chosen]
- **Alternatives:** [What else was considered]
- **Rationale:** [Why this choice was made]

**Decision 2:**
- **Choice:** [Router-based navigation over hash-based]
- **Alternatives:** Keep hash-based, use state management
- **Rationale:** Cleaner history, better UX, no hash listener complexity

### Dependencies and Resources
- **External Libraries:** [Any new dependencies]
- **Internal Modules:** [Other code modules used]
- **Documentation References:** [Links to relevant docs]

### Code Patterns Used
[Document any patterns or architectural decisions]

**Example:**
```
Pattern: Component composition with props interface
Pattern: Reactive signals with createSignal
Pattern: Router navigation with useNavigate
```

---

## Testing

### Test Methodology
[Describe how changes were tested]

- **Framework:** [Playwright | Manual | Unit tests]
- **Environment:** [Development | Production-like]
- **Test Cases:** [List of test scenarios]

### Test Coverage
**Functional Tests:**
- [ ] [Test case 1]
- [ ] [Test case 2]
- [ ] [Test case 3]

**Regression Tests:**
- [ ] [Existing feature 1 still works]
- [ ] [Existing feature 2 still works]
- [ ] [Existing feature 3 still works]

### Expected Behavior
[What users should experience after this change]

**Before Change:**
```
User does X → Y happens (problem)
```

**After Change:**
```
User does X → Z happens (solution)
```

### Known Limitations
[Are there any known limitations or edge cases?]

### Performance Impact
[Any performance implications?]
- **Memory:** [Increase/decrease]
- **Render Time:** [Faster/slower]
- **Bundle Size:** [Impact on bundle]

---

## Breaking Changes

### API Changes
[Are there API changes?]

- **Removed:** [Removed endpoints/methods]
- **Added:** [New endpoints/methods]
- **Modified:** [Changed endpoints/methods]

### Component Changes
[Are there component prop changes?]

- **Breaking Props:** [Removed or changed props]
- **New Props:** [New props added]
- **Migration Guide:** [How to update usage]

### Database Changes
[Are there schema changes?]

- **Removed Fields:** [Removed database fields]
- **Added Fields:** [New database fields]
- **Migration Required:** [SQL migration needed?]

### Configuration Changes
[Are there config changes?]

- **Removed Config:** [Removed configuration options]
- **Added Config:** [New configuration options]
- **Default Values:** [New defaults]

### Migration Instructions
[If there are breaking changes, provide migration steps]

```markdown
## Migration from [Old Version] to [New Version]

### Step 1: Update component props
Before:
```tsx
<Component hash="profile" />
```

After:
```tsx
<Component tab="profile" />
```

### Step 2: Update event handlers
Replace hash change listeners with router navigation.

### Step 3: Test navigation
Verify all links work with new `?tab=` parameter format.
```

---

## Related Issues

### GitHub Issues
- #[Issue Number] - [Issue title]
- #[Issue Number] - [Issue title]

### Requirements
- [REQ-XXX] - [Requirement description]
- [FEAT-XXX] - [Feature description]

### Dependencies
- [Package Name] - [Version requirement or issue]

---

## Deployment Notes

### Deployment Checklist
- [ ] Code reviewed
- [ ] Documentation complete
- [ ] Tests passing
- [ ] Breaking changes documented
- [ ] Migration steps tested
- [ ] Rollback plan prepared

### Rollback Plan
[If deployment fails, how to rollback?]

```bash
# Rollback commands
git revert [commit-hash]
# or specific file rollback
git checkout HEAD~1 src/path/to/file.tsx
```

### Monitoring
[What to monitor after deployment?]

- **Errors:** Watch for [specific error types]
- **Performance:** Monitor [metrics]
- **User Feedback:** Check [feedback channels]

---

## Future Improvements

### Known Limitations to Address
[What could be improved later?]

- [ ] [Future improvement 1]
- [ ] [Future improvement 2]

### Technical Debt
[Does this introduce technical debt?]

- [ ] [Technical debt item 1]
- [ ] [Technical debt item 2]

---

## Review Checklist

Before submitting for commit, verify:

- [ ] Overview section is complete and clear
- [ ] All files modified are listed
- [ ] Technical approach is well-explained
- [ ] Testing methodology is documented
- [ ] Breaking changes are identified
- [ ] Migration instructions are clear (if needed)
- [ ] Related issues are referenced
- [ ] Documentation is saved in `docs/` directory
- [ ] Template sections are complete (Overview, Files, Approach, Testing, Breaking)

---

**Documentation Status:** [ ] Ready for Review
**Reviewer:** [Agent or user name]
**Review Date:** [YYYY-MM-DD]
