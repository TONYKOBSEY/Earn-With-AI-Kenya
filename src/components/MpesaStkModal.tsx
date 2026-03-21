import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type Step = 'sending' | 'waiting' | 'result'

export type MpesaResult = 'paid' | 'failed' | 'cancelled'

export function MpesaStkModal(props: {
  open: boolean
  phone: string
  amountKes: number
  onClose: () => void
  onResult: (result: MpesaResult) => void
}) {
  const [step, setStep] = useState<Step>('sending')
  const [simulateFailure, setSimulateFailure] = useState(false)

  const safePhone = useMemo(() => props.phone.trim(), [props.phone])

  useEffect(() => {
    if (!props.open) return
    // Reset the simulated payment flow whenever the modal opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep('sending')
    const t1 = window.setTimeout(() => setStep('waiting'), 900)
    const t2 = window.setTimeout(() => setStep('result'), 2600)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [props.open])

  function finish(result: MpesaResult) {
    props.onResult(result)
    props.onClose()
  }

  return (
    <AnimatePresence>
      {props.open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={props.onClose}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 80,
            }}
          />
          <motion.div
            role="dialog"
            aria-label="M-Pesa STK Push (simulated)"
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(520px, 92vw)',
              zIndex: 90,
              borderRadius: 22,
              border: '1px solid rgba(214, 168, 74, 0.22)',
              background: 'rgba(7, 19, 15, 0.92)',
              boxShadow: '0 28px 70px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(14px)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: 18, borderBottom: '1px solid rgba(214, 168, 74, 0.14)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ color: 'var(--text0)', fontWeight: 900 }}>
                    M-Pesa STK Push (simulated)
                  </div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>
                    We're pretending to send a prompt to {safePhone}.
                  </div>
                </div>
                <button
                  type="button"
                  className="focusRing"
                  onClick={props.onClose}
                  style={{
                    cursor: 'pointer',
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: '1px solid rgba(214, 168, 74, 0.18)',
                    background: 'rgba(5, 11, 8, 0.35)',
                    color: 'rgba(246, 245, 242, 0.85)',
                  }}
                >
                  Close
                </button>
              </div>
            </div>

            <div style={{ padding: 18, display: 'grid', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <Pill active={step === 'sending'}>Sending</Pill>
                <Pill active={step === 'waiting'}>Waiting</Pill>
                <Pill active={step === 'result'}>Result</Pill>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 12,
                      color: 'rgba(246, 245, 242, 0.7)',
                      userSelect: 'none',
                    }}
                  >
                    <input
                      checked={simulateFailure}
                      onChange={(e) => setSimulateFailure(e.target.checked)}
                      type="checkbox"
                    />
                    Simulate failure
                  </label>
                </div>
              </div>

              <div className="glass" style={{ padding: 16, borderRadius: 18 }}>
                {step === 'sending' ? (
                  <StatusLine title="Sending STK prompt...">
                    Opening a payment request for <strong>KES {Math.round(props.amountKes)}</strong>.
                  </StatusLine>
                ) : null}
                {step === 'waiting' ? (
                  <StatusLine title="Waiting for confirmation...">
                    Approve the prompt on your phone to complete payment.
                  </StatusLine>
                ) : null}
                {step === 'result' ? (
                  <div style={{ display: 'grid', gap: 10 }}>
                    <div style={{ color: 'var(--text0)', fontWeight: 900, fontSize: 16 }}>
                      {simulateFailure ? 'Payment failed (simulated)' : 'Payment approved (simulated)'}
                    </div>
                    <div className="muted" style={{ fontSize: 13 }}>
                      {simulateFailure
                        ? 'No funds were captured. Try again or change the simulation toggle.'
                        : 'Your order is confirmed. A receipt will be generated.'}
                    </div>

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                      {simulateFailure ? (
                        <>
                          <button
                            type="button"
                            className="focusRing"
                            onClick={() => finish('failed')}
                            style={dangerBtn}
                          >
                            Continue
                          </button>
                          <button
                            type="button"
                            className="focusRing"
                            onClick={() => {
                              setSimulateFailure(false)
                              setStep('sending')
                            }}
                            style={secondaryBtn}
                          >
                            Retry
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="focusRing"
                          onClick={() => finish('paid')}
                          style={primaryBtn}
                        >
                          View receipt
                        </button>
                      )}
                      <button
                        type="button"
                        className="focusRing"
                        onClick={() => finish('cancelled')}
                        style={secondaryBtn}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

function Pill(props: { active: boolean; children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: '6px 10px',
        borderRadius: 999,
        border: `1px solid ${props.active ? 'rgba(242, 200, 107, 0.45)' : 'rgba(214, 168, 74, 0.16)'}`,
        background: props.active ? 'rgba(13, 26, 20, 0.68)' : 'rgba(13, 26, 20, 0.35)',
        color: props.active ? 'var(--text0)' : 'rgba(246, 245, 242, 0.68)',
      }}
    >
      {props.children}
    </span>
  )
}

function StatusLine(props: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <div style={{ color: 'var(--text0)', fontWeight: 900, fontSize: 16 }}>{props.title}</div>
      <div className="muted" style={{ fontSize: 13 }}>
        {props.children}
      </div>
    </div>
  )
}

const primaryBtn: React.CSSProperties = {
  cursor: 'pointer',
  padding: '12px 14px',
  borderRadius: 999,
  border: '1px solid rgba(214, 168, 74, 0.35)',
  background: 'linear-gradient(180deg, rgba(214, 168, 74, 0.22), rgba(214, 168, 74, 0.08))',
  color: 'rgba(246, 245, 242, 0.92)',
  fontWeight: 900,
}

const secondaryBtn: React.CSSProperties = {
  cursor: 'pointer',
  padding: '12px 14px',
  borderRadius: 999,
  border: '1px solid rgba(214, 168, 74, 0.16)',
  background: 'rgba(13, 26, 20, 0.45)',
  color: 'rgba(246, 245, 242, 0.8)',
  fontWeight: 800,
}

const dangerBtn: React.CSSProperties = {
  cursor: 'pointer',
  padding: '12px 14px',
  borderRadius: 999,
  border: '1px solid rgba(255, 92, 92, 0.35)',
  background: 'rgba(255, 92, 92, 0.08)',
  color: 'rgba(246, 245, 242, 0.92)',
  fontWeight: 900,
}

