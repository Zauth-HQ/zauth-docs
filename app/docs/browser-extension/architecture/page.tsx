import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Browser Extension — Architecture',
};

export default function BrowserExtensionArchitecturePage() {
  return (
    <Prose>
      <h1>Architecture</h1>
      <p>
        The extension is built on <strong>Chrome Manifest V3 (MV3)</strong>. The core challenge with MV3 is
        that background scripts run as ephemeral service workers that can be killed at any moment — which
        rules out long-running WASM proving or blocking crypto operations inside the extension itself. The
        architecture resolves this with three key design decisions.
      </p>

      <h2>Component overview</h2>

      <CodeBlock
        code={`Browser Extension (MV3)
├── background.ts       — Service Worker: vault orchestrator, IPC hub, proxy routing, token spending
├── offscreen.ts        — Offscreen Document: PBKDF2 key derivation, AES-GCM vault ops
├── content.ts          — Content Script: SDK bridge, form interception, WebRTC shield
└── popup.tsx           — Popup UI: vault dashboard, token balance, proxy toggle, credential manager

Proving Portal (Full Browser Tab — zauth.co/portal)
└── bb.js Web Worker    — Multi-threaded WASM: Noir UltraHonk proof generation

Zauth Infrastructure
├── Attester Node       — VOPRF server: blind evaluation + DLEQ proof generation
├── Verification API    — Express + Redis: challenge mgmt, zkVerify submission, JWT issuance
├── zkVerify Chain      — Substrate: UltraHonk verifier pallet, proof aggregation, attestation
└── Proxy Registry      — SOCKS5 node list for dVPN routing`}
      />

      <h2>Component responsibilities</h2>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Runtime</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Service Worker</strong></td>
            <td>MV3 ephemeral</td>
            <td>Vault orchestrator, proxy routing, IPC hub, token unblinding via <code>@noble/curves</code></td>
          </tr>
          <tr>
            <td><strong>Offscreen Document</strong></td>
            <td>MV3 offscreen</td>
            <td>Long-running crypto (PBKDF2 100k iterations, AES-GCM), created on-demand by the service worker</td>
          </tr>
          <tr>
            <td><strong>Content Script</strong></td>
            <td>Page isolated world</td>
            <td>SDK bridge, WebRTC leak shield, form interception, presence indicator injection</td>
          </tr>
          <tr>
            <td><strong>Popup</strong></td>
            <td>Ephemeral (on click)</td>
            <td>Vault dashboard, token balance display, proxy toggle, credential manager UI</td>
          </tr>
          <tr>
            <td><strong>Proving Portal</strong></td>
            <td>Full browser tab (COOP/COEP)</td>
            <td>Multi-threaded <code>bb.js</code> WASM proving — runs once to mint a token batch</td>
          </tr>
          <tr>
            <td><strong>Attester Node</strong></td>
            <td>Server (Node/Express)</td>
            <td>VOPRF blind evaluation, DLEQ proof generation, zkVerify receipt verification</td>
          </tr>
        </tbody>
      </table>

      <h2>Why a separate Proving Portal?</h2>
      <p>
        Multi-threaded WebAssembly requires <code>SharedArrayBuffer</code>, which in turn requires both{' '}
        <code>Cross-Origin-Opener-Policy: same-origin</code> and{' '}
        <code>Cross-Origin-Embedder-Policy: require-corp</code> response headers. Chrome extensions cannot
        set these headers on their own pages in MV3. A dedicated website tab (<code>zauth.co/portal</code>)
        can set these headers and spin up a <code>bb.js</code> Web Worker with full multi-threading — cutting
        Noir UltraHonk proof generation time by ~80% versus single-threaded WASM.
      </p>
      <p>
        Proving only happens <em>once per token batch</em>. After that, the extension spends tokens
        locally with sub-1ms EC arithmetic — no proving on the hot path.
      </p>

      <h2>IPC message flow</h2>
      <CodeBlock
        code={`// Content Script → Service Worker (token spend request)
chrome.runtime.sendMessage({ type: 'SPEND_TOKEN', domain: window.location.hostname })

// Service Worker → Offscreen Document (vault unlock)
chrome.runtime.sendMessage({ type: 'VAULT_DECRYPT', ciphertext, iv, salt })

// Proving Portal → Service Worker (token delivery after mint)
chrome.runtime.sendMessage({ type: 'TOKEN_BATCH', tokens: [...] })

// Service Worker → Host Backend (token redemption)
fetch('/api/verify-token', { headers: { 'X-Zauth-Token': spentToken } })`}
      />

      <h2>State persistence & rehydration</h2>
      <p>
        Vault state (encrypted token store, proxy preferences, credential entries) lives in{' '}
        <code>chrome.storage.local</code> with the <code>unlimitedStorage</code> permission. On{' '}
        <code>runtime.onStartup</code>, the service worker reloads vault state, re-applies WebRTC policies,
        and restores proxy connections — so the extension behaves consistently across browser restarts
        without requiring a user unlock on every session.
      </p>
    </Prose>
  );
}
