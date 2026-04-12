import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Backend & zkVerify',
};

export default function BackendPage() {
  return (
    <Prose>
      <h1>Backend &amp; zkVerify</h1>
      <p>
        The Node/Express backend issues challenges, stores session state in <strong>Redis</strong>, verifies
        proofs against the live <strong>zkVerify</strong> network (UltraHonk on Volta), and returns JWTs to
        clients. Key implementation files include <code>ultrahonkZkVerify.ts</code>,{' '}
        <code>ultrahonkArtifacts.ts</code>, <code>challenge.ts</code>, and route modules under{' '}
        <code>src/routes/</code>.
      </p>
      <h2>Major routes</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>POST</td>
            <td>
              <code>/api/challenge</code>
            </td>
            <td>Create challenge, store nonce + metadata in Redis</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>
              <code>/api/verify</code>
            </td>
            <td>Accept proof, run zkVerify flow, issue JWT on success</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>
              <code>/api/zkverify/ultrahonk</code>
            </td>
            <td>Direct UltraHonk submission (formatted proof, VK, public inputs)</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>
              <code>/api/health</code>
            </td>
            <td>Health: Redis, zkVerify connectivity, version</td>
          </tr>
        </tbody>
      </table>
      <h2>UltraHonk submission (shape)</h2>
      <p>
        <code>POST /api/zkverify/ultrahonk</code> accepts JSON with a ZK-variant proof hex, 1760-byte VK hex,
        and public inputs. The service uses <code>zkverifyjs</code> sessions (<code>Volta</code>), formats
        proof data for <code>ProofType.ultrahonk</code> with <code>UltrahonkVariant.ZK</code>, and executes{' '}
        <code>verify().ultrahonk(...)</code>.
      </p>
      <CodeBlock
        language="json"
        code={`{
  "proof": { "ZK": "0x..." },
  "vk": "0x...",
  "publicInputs": ["0x0a...", "0x00..."]
}`}
      />
      <h2>Environment variables (representative)</h2>
      <ul>
        <li>
          <code>REDIS_URL</code> — required when Redis is enabled (omit <code>REDIS_DISABLED</code> for full
          captcha flow).
        </li>
        <li>
          <code>JWT_SECRET</code> — signing key for issued tokens.
        </li>
        <li>
          zkVerify-related keys / seeds as required by your deployment (see repo <code>.env.example</code>).
        </li>
        <li>
          Optional: <code>REDIS_KEY_PREFIX</code>, <code>REDIS_CONNECTION_TIMEOUT</code>.
        </li>
      </ul>
      <p>
        Deployments (e.g. Railway) should provision Redis separately and inject <code>REDIS_URL</code> into
        this service.
      </p>
      <h2>Operational notes</h2>
      <ul>
        <li>Rate limits may apply per IP on challenge and verify endpoints.</li>
        <li>
          Verification responses can include <code>_meta</code> with <code>verificationMethod</code>,{' '}
          <code>txHash</code>, and fallback flags — useful for support and telemetry.
        </li>
      </ul>
    </Prose>
  );
}
