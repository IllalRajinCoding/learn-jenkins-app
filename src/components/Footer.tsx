export function Footer() {
  return (
    <footer class="border-t border-line-soft">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <p class="font-mono text-xs text-ink-faint">
          <span class="text-accent">$</span> tail -f learn-jenkins — build #142 passing
        </p>
        <ul class="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-ink-soft">
          <li>Jenkinsfile</li>
          <li>ci.yml</li>
          <li>Dockerfile</li>
          <li>DESIGN.md</li>
        </ul>
      </div>
    </footer>
  );
}