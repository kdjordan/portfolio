<template>
  <header class="nav-shell">
    <div class="section-container">
      <div class="nav-top">
        <NuxtLink to="/" class="nav-mark">
          KJ<span>&mdash;</span>01
        </NuxtLink>

        <nav aria-label="Primary navigation" class="nav-links">
          <NuxtLink to="/#work">Work</NuxtLink>
          <NuxtLink to="/#services">Services</NuxtLink>
          <NuxtLink to="/blog">Writing</NuxtLink>
          <NuxtLink to="/#about">About</NuxtLink>
          <NuxtLink to="/#contact" class="active">Contact</NuxtLink>
        </nav>
      </div>
      <hr>
      <div class="double-rule"></div>
    </div>
  </header>
</template>

<style scoped>
.nav-shell {
  padding-top: 18px;
}

.nav-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 14px;
}

.nav-mark {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.015em;
}

.nav-mark span {
  color: var(--signal);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-links a {
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: border-color 150ms, color 150ms;
}

.nav-links a:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.nav-links a.active {
  color: var(--signal);
}

hr {
  border: 0;
  border-top: 1px solid var(--rule);
  margin: 0;
}

.double-rule {
  height: 5px;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}

@media (max-width: 720px) {
  .nav-top {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 8px 18px;
  }
}
</style>
