import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  Hammer,
  Lock,
  MessageCircle,
  ReceiptText,
  Share2,
  ShieldCheck,
  UnlockKeyhole,
} from "lucide-react";
import "./styles.css";

type JobState = "draft" | "locked" | "working" | "released" | "disputed";

const steps: Array<{ key: JobState; label: string }> = [
  { key: "draft", label: "Create" },
  { key: "locked", label: "Locked" },
  { key: "working", label: "Work" },
  { key: "released", label: "Paid" },
];

function App() {
  const [state, setState] = useState<JobState>("draft");
  const [amount, setAmount] = useState("40000");
  const amountNumber = Number(amount || 0);

  const formattedAmount = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(Number.isFinite(amountNumber) ? amountNumber : 0),
    [amountNumber],
  );

  const statusCopy = {
    draft: "Ready to lock",
    locked: "Funds don lock",
    working: "Artisan dey site",
    released: "Payment sent",
    disputed: "Dispute open",
  }[state];

  const nextAction = () => {
    if (state === "draft") setState("locked");
    if (state === "locked") setState("working");
    if (state === "working") setState("released");
    if (state === "disputed") setState("released");
  };

  return (
    <main className="app-shell">
      <section className="receipt-panel">
        <div className="brand-strip">
          <div>
            <p className="eyebrow">WORKPROOF ESCROW</p>
            <h1>Pay when work complete.</h1>
          </div>
          <ShieldCheck aria-hidden="true" />
        </div>

        <div className={`lock-hero ${state}`}>
          <div className="lock-ring">
            {state === "released" ? <UnlockKeyhole aria-hidden="true" /> : <Lock aria-hidden="true" />}
          </div>
          <p>{statusCopy}</p>
          <strong>{formattedAmount}</strong>
          <span>USDC/local stablecoin equivalent held on Stellar</span>
        </div>

        <div className="step-row" aria-label="Job progress">
          {steps.map((step, index) => {
            const activeIndex = state === "disputed" ? 1 : steps.findIndex((item) => item.key === state);
            const isDone = activeIndex >= index;
            return (
              <div className={isDone ? "step done" : "step"} key={step.key}>
                <span>{isDone ? <Check aria-hidden="true" /> : index + 1}</span>
                <small>{step.label}</small>
              </div>
            );
          })}
        </div>

        <form className="job-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Job amount
            <input inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <label>
            Job note
            <input defaultValue="2 bedroom tiling, Lekki Phase 1" />
          </label>
          <label>
            Artisan phone
            <input defaultValue="+234 803 000 1040" />
          </label>
        </form>

        <div className="action-grid">
          <button className="primary-action" onClick={nextAction}>
            {state === "draft" && <CircleDollarSign aria-hidden="true" />}
            {state === "locked" && <Hammer aria-hidden="true" />}
            {(state === "working" || state === "disputed") && <ClipboardCheck aria-hidden="true" />}
            {state === "released" && <ReceiptText aria-hidden="true" />}
            {state === "draft" && "Lock funds"}
            {state === "locked" && "Mark work started"}
            {state === "working" && "Release payment"}
            {state === "disputed" && "Accept ruling"}
            {state === "released" && "Receipt ready"}
          </button>
          <button className="icon-action" type="button" aria-label="Share job link" title="Share job link">
            <Share2 aria-hidden="true" />
          </button>
          <button
            className="icon-action amber"
            type="button"
            aria-label="Open dispute"
            title="Open dispute"
            onClick={() => setState("disputed")}
          >
            <AlertTriangle aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="phone-panel" aria-label="Artisan view">
        <div className="phone-top">
          <span>WorkProof</span>
          <span>09:41</span>
        </div>
        <div className="chat-thread">
          <div className="bubble inbound">
            <MessageCircle aria-hidden="true" />
            New job from Mrs Ade. Tap to accept.
          </div>
          <div className="bubble outbound">I don see am. Funds dey locked?</div>
          <div className={`transfer-card ${state}`}>
            <p>TRANSFER CONFIRMATION</p>
            <strong>{formattedAmount}</strong>
            <span>{statusCopy}</span>
            <small>Ref: WPF-240517-AJAH</small>
          </div>
          <div className="receipt-lines">
            <p><span>Client</span><b>Mrs Ade</b></p>
            <p><span>Trade</span><b>Tiling</b></p>
            <p><span>Arbitration</span><b>3 verified tilers</b></p>
            <p><span>Fee</span><b>Fractions of a naira</b></p>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
