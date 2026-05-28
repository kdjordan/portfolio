<template>
  <footer class="footer-shell section-container">
    <div class="footer-top">
      <div>
        <div class="label">KDJORDAN LLC</div>
        <NuxtLink to="/" class="footer-mark">
          KJ<span>&mdash;</span>01
        </NuxtLink>
      </div>

      <div class="elsewhere">
        <a href="https://www.linkedin.com/in/kevin-dean-jordan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/kdjordan" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://x.com/kdjordan_io" target="_blank" rel="noopener noreferrer">X / Twitter</a>
      </div>
    </div>

    <div class="colophon">
      <span>&copy; {{ new Date().getFullYear() }} KDJORDAN LLC / REV 2026.05</span>
      <span>Pacific Northwest</span>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell {
  padding-top: 22px;
  padding-bottom: 48px;
  margin-top: 72px;
  border-top: 2px solid var(--ink);
}

.footer-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.label,
.elsewhere a,
.colophon {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.footer-mark {
  display: inline-block;
  margin-top: 8px;
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.025em;
}

.footer-mark span {
  color: var(--signal);
}

.elsewhere {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.elsewhere a {
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: all 150ms;
}

.elsewhere a:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.colophon {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 48px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
}

@media (max-width: 640px) {
  .footer-top,
  .colophon {
    align-items: flex-start;
    flex-direction: column;
  }

  .elsewhere {
    align-items: flex-start;
  }
}
</style>
