# Contributing to AlgoViz

Thanks for your interest in contributing! Here's how to help.

## 🐛 Reporting Bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:
- What you expected vs what happened
- Browser + OS
- Steps to reproduce

## 💡 Suggesting Features

Open a [feature request](.github/ISSUE_TEMPLATE/feature_request.md). Good candidates:
- New sorting algorithms (Heap Sort, Radix Sort, etc.)
- New graph algorithms (A*, Bellman-Ford, etc.)
- UI improvements

## 🔧 Making Changes

1. Fork the repo and clone it locally
2. Create a branch: `git checkout -b feature/your-idea`
3. Make your changes in `index.html`
4. Test in Chrome, Firefox, and Safari
5. Push and open a PR with a clear description

## 📐 Code Style

- Use `camelCase` for variables/functions
- Keep animation logic in clearly named functions
- Add a comment block above any new algorithm
- Match the existing color scheme (`var(--accent)` etc.)

## ✅ PR Checklist

- [ ] Tested in at least one modern browser
- [ ] No new console errors
- [ ] Algorithm complexity card updated if needed
- [ ] README updated if new algorithm added
