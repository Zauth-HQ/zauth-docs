import type { Metadata } from 'next';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Circuits & proving',
};

export default function CircuitsPage() {
  return (
    <Prose>
      <h1>Circuits &amp; proving</h1>
      <p>
        The ZAuth Captcha circuit is written in{' '}
        <a href="https://noir-lang.org/" target="_blank" rel="noreferrer">
          Noir
        </a>{' '}
        and proved with{' '}
        <a href="https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg" target="_blank" rel="noreferrer">
          Barretenberg
        </a>{' '}
        (<code>bb</code>) using the <strong>UltraHonk</strong> scheme. Proving runs natively (CLI or server);
        the browser SDK uses Noir WASM / bundled artifacts for client-side proving.
      </p>
      <h2>zkVerify requirements (critical)</h2>
      <p>Volta testnet enforces strict UltraHonk settings. The combination below is mandatory:</p>
      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Value</th>
            <th>Flag / note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proof variant</td>
            <td>ZK only</td>
            <td>
              <code>--zk</code>
            </td>
          </tr>
          <tr>
            <td>Oracle hash</td>
            <td>Keccak256</td>
            <td>
              <code>--oracle_hash keccak</code>
            </td>
          </tr>
          <tr>
            <td>VK size</td>
            <td>1760 bytes</td>
            <td>achieved with Keccak configuration</td>
          </tr>
          <tr>
            <td>Public inputs</td>
            <td>≤ 32 field elements</td>
            <td>circuit exposes 2 public: difficulty, timestamp</td>
          </tr>
        </tbody>
      </table>
      <p>
        Without <code>--zk</code> and <code>--oracle_hash keccak</code>, proofs or VKs may be rejected (e.g.
        wrong VK length or proof variant).
      </p>
      <h2>Circuit IO (summary)</h2>
      <p>
        <strong>Private inputs:</strong> <code>secret</code> (32 bytes), <code>nonce</code> (32 bytes),{' '}
        <code>expected_hash</code> (32 bytes). <strong>Public inputs:</strong> <code>difficulty</code> (u32),{' '}
        <code>timestamp</code> (u64) for auditability; hash checks stay private in-circuit.
      </p>
      <h2>Repository layout</h2>
      <pre>
        <code>{`circuits/
├── src/main.nr, hash.nr
├── Nargo.toml
├── Prover.toml
├── scripts/prove-ultrahonk.sh, convert-zkv-hex.sh
└── target/   # compiled JSON, proof, vk`}</code>
      </pre>
      <h2>Toolchain (typical)</h2>
      <ul>
        <li>
          Nargo <code>1.0.0-beta.6</code> (recommended in repo docs)
        </li>
        <li>
          bb <code>0.84.0</code>–<code>0.85.0</code>
        </li>
      </ul>
      <h2>Prove pipeline (abbreviated)</h2>
      <pre>
        <code>{`cd circuits
nargo compile
nargo execute
bb write_vk -s ultra_honk -b ./target/zauth_captcha.json -o ./target --oracle_hash keccak
bb prove -s ultra_honk -b ./target/zauth_captcha.json -w ./target/zauth_captcha.gz \\
  -o ./target --zk --oracle_hash keccak`}</code>
      </pre>
      <p>
        Use <code>scripts/convert-zkv-hex.sh</code> (or the Makefile target <code>prove-ultrahonk</code>) to
        align hex formats expected by zkVerify and the backend normalizers.
      </p>
    </Prose>
  );
}
