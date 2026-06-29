import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Browser Extension — zkVerify Integration',
};

export default function BrowserExtensionZkVerifyPage() {
  return (
    <Prose>
      <h1>zkVerify Integration</h1>
      <p>
        zkVerify is the verification and attestation backbone for all three privacy shields. The extension
        never verifies proofs locally — it delegates to zkVerify&apos;s Substrate chain, which handles
        Noir/UltraHonk verification in under one second and produces an on-chain attestation receipt that
        any backend can query.
      </p>

      <h2>Why zkVerify instead of on-EVM verification</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>On-EVM (e.g. Ethereum)</th>
            <th>zkVerify</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Gas cost per proof</td><td>200k–300k gas (~$5–60)</td><td>Near-zero (Substrate extrinsic)</td></tr>
          <tr><td>Verification time</td><td>12–30 s (block time)</td><td>&lt; 1 s</td></tr>
          <tr><td>Supported proof systems</td><td>Groth16 (mostly)</td><td>UltraHonk, Groth16, FFLONK, SP1, RISC0</td></tr>
          <tr><td>Proof aggregation</td><td>Manual / expensive</td><td>Native aggregation pallet</td></tr>
          <tr><td>Cross-chain settlement</td><td>Requires bridge</td><td>Built-in (any L1/L2)</td></tr>
        </tbody>
      </table>

      <h2>Proof submission flow</h2>
      <ol>
        <li>
          The Proving Portal generates a Noir UltraHonk proof and sends it to the{' '}
          <strong>Verification API</strong> (<code>POST /api/verify</code>).
        </li>
        <li>
          The API normalizes the proof and verification key, then submits to zkVerify via{' '}
          <code>zkverifyjs</code>:
          <CodeBlock
            code={`import { zkVerifySession, ZkVerifyEvents, Library } from 'zkverifyjs';

const session = await zkVerifySession.start().Volta().withAccount(SEED_PHRASE);
const { events } = await session
  .verify()
  .ultraplonk()  // UltraHonk (Noir output)
  .execute({ proofData: { vk, proof, publicSignals } });

const receipt = await new Promise((resolve) => {
  events.on(ZkVerifyEvents.AttestationConfirmed, resolve);
});`}
          />
        </li>
        <li>
          zkVerify emits an <code>AttestationConfirmed</code> event with a leaf hash. The API stores{' '}
          <code>(nullifier, leafHash, attestationId)</code> in Redis and returns the receipt to the portal.
        </li>
        <li>
          The portal passes the receipt to the Attester Node. The attester verifies the receipt is present
          on-chain before issuing VOPRF-signed tokens.
        </li>
      </ol>

      <h2>Attestation receipt structure</h2>
      <CodeBlock
        code={`interface ZkVerifyReceipt {
  attestationId: number;   // incremental ID on zkVerify chain
  leafHash: string;        // Keccak hash of (proof, vk, publicInputs)
  blockHash: string;       // Substrate block where attestation was anchored
  nullifier: string;       // domain-scoped nullifier (Poseidon hash)
}`}
      />

      <h2>Proof aggregation</h2>
      <p>
        For high-traffic deployments, the Verification API batches multiple user proofs and submits them
        as a single aggregated proof to zkVerify. The aggregation pallet merges proofs off-chain and
        produces one on-chain attestation covering all included proofs — spreading the base submission
        cost across all users in the batch.
      </p>
      <CodeBlock
        code={`// Aggregated submission (batching N user proofs into one tx)
const { events } = await session
  .verify()
  .ultraplonk()
  .withRegisteredVk()       // reuse pre-registered VK to save gas
  .execute({ proofData: aggregatedProofData });`}
      />

      <h2>Cross-chain settlement</h2>
      <p>
        zkVerify publishes attestation Merkle roots to any connected L1/L2 (Ethereum, Arbitrum, Polygon,
        etc.) through its native settlement layer. Partner sites on any chain can verify a Zauth
        attestation by checking the Merkle proof against the published root — without running their own
        ZK verifier contract.
      </p>

      <h2>Network</h2>
      <p>
        Current integrations target the <strong>Volta testnet</strong>. Production will switch to
        zkVerify mainnet when available. The <code>zkverifyjs</code> session call is the only change
        needed (<code>.Volta()</code> → <code>.MainNet()</code>).
      </p>
    </Prose>
  );
}
