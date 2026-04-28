# Agent Documentation Workflow

## Overview

This document defines the workflow agents must follow when making changes to the codebase, ensuring all changes are properly documented before committing and pushing.

## Pre-Commit Requirements

All agents MUST document changes before requesting commits to maintain project history and knowledge base.

### When to Document

**ALWAYS document when:**
- Feature implementations (new functionality)
- Bug fixes (any severity)
- Refactoring affecting multiple files
- Breaking changes or API changes
- Workflow or agent behavior changes
- Major architectural decisions

**MAY document when:**
- Simple bug fixes (single file, obvious fix)
- Typos or trivial changes
- Configuration updates only

## Documentation Standards

### Documentation Location

**Individual Changes:** `docs/[feature-name].md`

Organized by feature/component name for easy lookup:
- `docs/back-button-fix.md`
- `docs/search-icon-button.md`
- `docs/router-based-navigation.md`

**Accumulated Log:** `CHANGELOG.md`

All changes appended with date and summary:
```markdown
## [YYYY-MM-DD] - [Change Title]

### Description
Brief description of what changed

### Files Changed
- file1.tsx - Description
- file2.tsx - Description

### Breaking Changes
List any breaking changes
```

### Documentation Template

See `docs/TEMPLATES/CHANGE_DOCUMENTATION.md` for the structured template all agents must use.

## Documentation Content Requirements

Each change documentation MUST include:

### 1. Overview
- What was changed and why
- Problem being solved or feature being added
- User impact

### 2. Files Modified
- List of all files changed
- Brief description of each change
- Type of change (add/modify/delete/refactor)

### 3. Technical Approach
- Implementation strategy used
- Key technical decisions made
- Trade-offs considered and why chosen approach was selected
- Dependencies or external resources used

### 4. Testing
- How changes were tested
- Test framework used (Playwright, manual, etc.)
- Expected behavior verification
- Edge cases considered

### 5. Breaking Changes
- List any breaking changes
- Migration instructions if needed
- Deprecation notices if applicable

### 6. Related Issues
- References to GitHub issues or requirements
- Related changes or dependencies

## Major Change Workflow

### Before Committing Major Changes

1. **Create comprehensive documentation** in `docs/[feature-name].md`
2. **Update CHANGELOG.md** with entry summary
3. **Review documentation** for completeness and accuracy
4. **Verify all requirements met** from documentation standards above

### Review Process

Agent MUST show documentation to user for review:
```markdown
Documentation created for: [Change Name]

Files documented:
- [List of files]

Key points:
- [Summary of approach]
- [Testing performed]

Is this documentation complete and accurate?
```

### Commit Message Format

For major changes, use detailed commit messages referencing documentation:

```
[type]: [scope] description

[Detailed bullet points]

Files: [list of files]

Docs: docs/[feature-name].md

Co-authored-by: [agent-name]
```

Examples:
```
feat: (settings) fix back button navigation

- Replaced hash-based navigation with router-based
- Added referrer tracking for smart back button
- Reset active tab state on unmount
- Removed hash change event listeners

Files:
- src/routes/user/setting/index.tsx
- src/shell/components/AppHeader.tsx

Docs: docs/back-button-fix.md
```

### Before Pushing

1. **Review all accumulated documentation** since last push
2. **Update README.md** if agent capabilities changed
3. **Update AGENTS.md** if workflows changed
4. **Create summary documentation** for the batch of changes
5. **Obtain user confirmation** before pushing

## Enforcement Mode: STRICT

Agents MUST refuse to commit or push if:

1. **No documentation exists** for the changes
2. **Documentation incomplete** (missing required sections)
3. **User rejects documentation** during review phase
4. **Breaking changes not documented**

## Agent Behavior Configuration

### When User Requests Commit

Agent follows this workflow:

```
User: "Commit [change name]"
Agent: 1. Check if docs/[change-name].md exists
      2. If NO → Create documentation using template
      3. Show documentation for review
      4. Ask: "Is this documentation complete?"
      5. If YES → Commit
      6. If NO → Allow user to edit → Re-ask
```

### When User Requests Push

Agent follows this workflow:

```
User: "Push these changes"
Agent: 1. Show git log of recent commits
      2. Show all documentation for commits being pushed
      3. Create summary: "Pushing [n] changes"
      4. Ask: "Ready to push to origin/main?"
      5. If YES → Execute git push
```

## Documentation Review Checklist

Before requesting commit, agent verifies documentation includes:

- [ ] Overview section with clear problem statement
- [ ] Complete list of files modified
- [ ] Technical approach explained
- [ ] Testing methodology described
- [ ] Breaking changes identified
- [ ] Related issues referenced
- [ ] Documentation saved in `docs/` directory

## Documentation Maintenance

Keep documentation current:

- **Weekly**: Review and update AGENTS.md
- **Monthly**: Review and update README.md
- **Per Release**: Create release notes in CHANGELOG.md
- **Per Major Feature**: Update capability sections in documentation

## Troubleshooting

### Documentation Not Found

If agent cannot find documentation for changes:
1. Prompt user: "I don't see documentation for these changes. Should I create it?"
2. If user says no → Allow commit with note: `[Documentation needed]`
3. If user says yes → Create documentation first

### Documentation Outdated

If agent finds outdated documentation:
1. Prompt user: "This documentation is from [date]. Should I update it?"
2. If user says yes → Update documentation
3. If user says no → Use existing as-is with note

## Tools and Commands

### Creating Documentation
- Template: `docs/TEMPLATES/CHANGE_DOCUMENTATION.md`
- Location: `docs/[feature-name].md`
- Format: Markdown

### Checking Documentation
```bash
# Check if documentation exists
ls docs/[feature-name].md

# Review documentation
cat docs/[feature-name].md
```

### Git Integration
```bash
# Stage documentation with code
git add docs/[feature-name].md src/

# Commit with documentation reference
git commit -m "[type]: [scope] description

Docs: docs/[feature-name].md"
```

## Best Practices

1. **Document Early**: Create documentation while implementing, not after
2. **Be Specific**: Include exact file paths, line numbers, function names
3. **Explain Why**: Don't just describe what, explain the reasoning
4. **Include Context**: Why this approach? What alternatives were considered?
5. **Test Documentation**: Verify documentation is accurate and complete
6. **Keep Synced**: Ensure docs match actual implementation
7. **Archive Old**: Move old docs to `docs/archive/` if needed

## Version Control for Documentation

### Documentation File Versioning

When updating existing documentation:
1. Keep previous version: `docs/archive/[feature-name]-[date].md`
2. Add changelog at top of updated file
3. Update "Last Updated" date

### When Feature is Removed

1. Move documentation to `docs/archive/`
2. Add deprecation note to main CHANGELOG
3. Update related README sections

## Support and Questions

If workflow is unclear or needs clarification:
1. Review this document (`docs/AGENT_WORKFLOW.md`)
2. Check `docs/TEMPLATES/CHANGE_DOCUMENTATION.md` for template
3. Review `AGENTS.md` for agent capabilities
4. Ask clarifying questions before implementing

## Document Workflow

Last Updated: 2025-04-28
Version: 1.0
