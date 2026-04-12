import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'REST API',
};

export default function ApiPage() {
  return (
    <Prose>
      <h1>REST API</h1>
      <p>
        Base URL is your deployed backend (for example <code>https://api.yourdomain.com</code> or{' '}
        <code>http://localhost:3000</code> in development). All paths below are rooted at that host.
      </p>
      <h2>
        <code>POST /api/challenge</code>
      </h2>
      <p>Creates a new challenge and stores the nonce server-side.</p>
      <CodeBlock
        language="json"
        code={`// Request
{ "siteId": "optional-site-id" }

// Response
{
  "challengeId": "uuid",
  "nonce": "hex",
  "difficulty": 10,
  "expiresAt": "2024-01-15T10:30:00.000Z"
}`}
      />
      <h2>
        <code>POST /api/verify</code>
      </h2>
      <p>Submits proof data for the active challenge; backend verifies via zkVerify and returns a JWT.</p>
      <CodeBlock
        language="json"
        code={`// Request
{
  "challengeId": "uuid",
  "proof": {
    "proofData": "0x... or base64 per backend contract",
    "publicInputs": ["0x...", "..."]
  },
  "siteId": "optional"
}

// Success response (shape may include meta)
{
  "success": true,
  "verificationId": "ver_...",
  "token": "eyJ...",
  "expiresAt": "..."
}`}
      />
      <h2>
        <code>POST /api/zkverify/ultrahonk</code>
      </h2>
      <p>Lower-level UltraHonk submission to zkVerify Volta. Used for tooling and debugging; app flows usually go through <code>/api/verify</code>.</p>
      <CodeBlock
        language="json"
        code={`{
  "proof": { "ZK": "0x..." },
  "vk": "0x...",
  "publicInputs": ["0x...", "0x..."]
}`}
      />
      <h2>
        <code>GET /api/health</code>
      </h2>
      <p>Reports process health, dependency status (Redis, zkVerify), and build version.</p>
      <h2>Errors</h2>
      <p>Common error codes include challenge generation failures, expired challenges, invalid proofs, rate limits, and zkVerify rejection. Inspect JSON <code>error</code> / <code>message</code> fields in non-2xx responses.</p>
    </Prose>
  );
}
