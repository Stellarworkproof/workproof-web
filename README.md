# WorkProof Web

Mobile-first frontend for WorkProof, designed around the flow of a small trade job moving from payment lock to completion.

The interface is intentionally familiar: part WhatsApp thread, part receipt book, part transfer confirmation. It is built for users who may not think of themselves as crypto users but still need trust at the point of work.

## Product goals

- show the client that funds are locked
- show the artisan that the money is real before they leave for site
- make release a single clear action
- leave space for dispute handling without making the happy path feel heavy

## Current MVP

- responsive single-screen flow for `draft`, `locked`, `working`, `released`, and `disputed`
- large amount-first presentation in `NGN`
- Pidgin-friendly status copy
- receipt and chat-style visual system
- clear hooks for share, dispute, and release actions

## Design direction

- primary palette: deep forest green with white receipt surfaces
- warning state: amber only
- tone: familiar, functional, and low-friction
- hero interaction: lock confirmation and release state change

## Tech stack

- React 19
- TypeScript
- Vite
- Lucide icons

## Local development

```bash
npm install
npm run dev
npm run build
```

## Integration status

The current version uses local React state to simulate the escrow lifecycle. It is structured so the next integration pass can replace local transitions with:

- wallet connect
- contract reads
- contract invocation for `create_job`, `release`, and `dispute`
- real shareable job links

## What is intentionally stubbed

- no wallet connection yet
- no live Soroban contract calls yet
- no persisted backend or indexed job history
- no arbitration assignment workflow yet

## Related repos

- `Stellarworkproof/workproof-contract`: Soroban escrow contract
- `Stellarworkproof/workproof-docs`: product framing, architecture notes, and demo context
