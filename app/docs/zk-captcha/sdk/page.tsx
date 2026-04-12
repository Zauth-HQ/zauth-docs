import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { Prose } from '@/components/Prose';
import { CAPTCHA_SDK_NPM } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Captcha SDK',
};

export default function SdkPage() {
  return (
    <Prose>
      <h1>
        <code>@zauth/captcha-sdk</code>
      </h1>
      <p>
        TypeScript SDK for ZK CAPTCHA: fetch challenges from your backend, generate UltraHonk-compatible
        proofs in the browser (Noir WASM + bundled artifacts), and submit verification requests. Install from{' '}
        <a href={CAPTCHA_SDK_NPM} target="_blank" rel="noreferrer">
          <code>@zauth/captcha-sdk</code> on npm
        </a>
        .
      </p>
      <h2>Install</h2>
      <CodeBlock code="npm install @zauth/captcha-sdk" />
      <p>
        Package exports: default <code>@zauth/captcha-sdk</code> (core) and{' '}
        <code>@zauth/captcha-sdk/react</code> for the React hook. Requires Node 18+; React 18+ as a peer for the
        hook export.
      </p>
      <h2>
        Core: <code>ZkCaptcha</code>
      </h2>
      <p>Construct with your API base URL and optional site id, artifact URL, and timeout.</p>
      <CodeBlock
        language="ts"
        code={`import ZkCaptcha from '@zauth/captcha-sdk';

const captcha = new ZkCaptcha({
  backendUrl: 'https://your-api.example.com',
  siteId: 'my-site',
  // optional: artifactUrl: 'https://.../circuit.json',
  // optional: timeout: 30000,
});

await captcha.initialize();
const challenge = await captcha.getChallenge();
const proof = await captcha.generateProof(challenge, {
  onProgress: (p) => console.log(p),
});
const result = await captcha.verify(challenge.challengeId, proof);
// result.token — JWT from backend; result._meta may include txHash, verificationMethod, etc.

await captcha.destroy();`}
      />
      <h3>Methods (summary)</h3>
      <ul>
        <li>
          <code>initialize()</code> — load embedded or remote circuit artifacts; initializes WASM prover.
        </li>
        <li>
          <code>setArtifactData(data)</code> — supply circuit bytes manually when needed.
        </li>
        <li>
          <code>getChallenge(siteId?)</code> — <code>POST /api/challenge</code>.
        </li>
        <li>
          <code>generateProof(challenge, options?)</code> — real ZK proof when WASM path succeeds; otherwise
          falls back to a mock proof (development only — not verifiable on-chain).
        </li>
        <li>
          <code>verify(challengeId, proof)</code> — <code>POST /api/verify</code>.
        </li>
        <li>
          <code>getCurrentChallenge()</code> / <code>destroy()</code> — session helpers.
        </li>
      </ul>
      <h2>React: <code>useZkCaptcha</code></h2>
      <CodeBlock
        language="tsx"
        code={`import { useZkCaptcha } from '@zauth/captcha-sdk/react';

function CaptchaButton() {
  const { generateProof, fetchChallenge, status, token, error, challenge, progress, reset } =
    useZkCaptcha({
      backendUrl: 'https://your-api.example.com',
      siteId: 'my-site',
      autoChallenge: false,
      onSuccess: (jwt) => console.log('ok', jwt),
      onError: (e) => console.error(e),
    });

  return (
    <div>
      <button type="button" onClick={() => void fetchChallenge()} disabled={status === 'loading'}>
        Get challenge
      </button>
      <button type="button" onClick={() => void generateProof()} disabled={status === 'processing'}>
        Prove & verify
      </button>
      {progress > 0 && <p>Progress: {progress}%</p>}
      {token && <p>Token issued</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}`}
      />
      <p>
        The hook creates a <code>ZkCaptcha</code> instance, calls <code>initialize()</code> on mount, and
        destroys it on unmount. <code>generateProof</code> fetches a challenge if needed, runs proving, then
        verification in one flow.
      </p>
      <h2>Types (high level)</h2>
      <ul>
        <li>
          <code>Challenge</code> — <code>challengeId</code>, <code>nonce</code>, <code>difficulty</code>,{' '}
          <code>expiresAt</code>
        </li>
        <li>
          <code>Proof</code> — <code>proofData</code>, <code>publicInputs</code>
        </li>
        <li>
          <code>VerificationResult</code> — <code>success</code>, <code>verificationId</code>,{' '}
          <code>token</code>, <code>expiresAt</code>, optional <code>_meta</code> (zkVerify metadata)
        </li>
      </ul>
    </Prose>
  );
}
