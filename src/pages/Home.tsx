import { useNavigate } from 'react-router-dom'
import { MotionPage } from '../components/MotionPage'
import { Button } from '../components/ui/Button'
import { useProducts } from '../state/useProducts'
import styles from './Home.module.css'
import problemIllustration from '../assets/placeholder-problem-optimized.jpg'
import solutionIllustration from '../assets/solution-uplift-optimized.jpg'
import beforeIllustration from '../assets/before-solution-optimized.jpg'
import afterIllustration from '../assets/after-solution-optimized.jpg'
import previewCoverPage from '../assets/prev-01-optimized.jpg'
import previewIntroPage from '../assets/prev-03.png'
import previewMechanismPage from '../assets/Core_Mechanism_Page (1)_page-0001.jpg'
import ebookCoverAnimation from '../assets/ebook cover animation .mp4'

type PreviewPage = {
  id: string
  page: string
  label: string
  title: string
  lead: string
  bullets: string[]
  note: string
  imageSrc: string
  imageAlt: string
  width: number
  height: number
  accent: 'gold' | 'emerald' | 'ink'
}

type ProofCard = {
  id: string
  name: string
  role: string
  location: string
  result: string
  timeframe: string
  tool: string
  quote: string
}

const heroBullets = [
  'Start earning with just your phone',
  'Proven offers you can sell this week',
  'Templates + checklists included',
]

const problemBullets = [
  'Too many tools -> no income',
  'Random prompts -> inconsistent results',
  'No offer -> nothing to sell',
  'No system -> no repeatable income',
]

const systemSteps = [
  {
    id: 'step-1',
    number: '01',
    title: 'Pick a simple offer',
    detail: 'Choose one service a biashara owner can understand and buy fast.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Use templates to produce fast',
    detail: 'Skip blank-page stress and deliver with prebuilt prompts, layouts, and copy.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Deliver with a checklist',
    detail: 'Make the work feel premium and consistent before the client ever asks for revisions.',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Repeat + scale',
    detail: 'Refine the offer, collect referrals, and raise prices when the workflow is stable.',
  },
]

const beforePoints = [
  'Watching tutorials all day',
  'No clients',
  'No idea what to sell',
  'Making nothing',
]

const afterPoints = [
  '1 simple offer: poster + caption package',
  'First client plan you can execute in 3-7 days',
  'Consistent output using templates',
  'Paid via M-Pesa',
]

const proofCards: ProofCard[] = [
  {
    id: 'proof-1',
    name: 'Amina',
    role: 'Freelance designer',
    location: 'Nairobi',
    result: 'Poster + caption offer launched',
    timeframe: '7-day plan',
    tool: 'Canva',
    quote:
      'I stopped "learning forever" and started selling a simple poster + caption package. The templates made delivery fast and my clients loved the consistency.',
  },
  {
    id: 'proof-2',
    name: 'Brian',
    role: 'Student',
    location: 'Kisumu',
    result: 'First paid gig landed',
    timeframe: 'Within 1 week',
    tool: 'ChatGPT',
    quote:
      'The biggest win was clarity: one offer, one workflow, repeat. I used the scripts to pitch locally and got my first paid gig within a week.',
  },
  {
    id: 'proof-3',
    name: 'Faith',
    role: 'Social media manager',
    location: 'Mombasa',
    result: 'Retainer confidence increased',
    timeframe: 'After tightening delivery',
    tool: 'Notion',
    quote:
      'The quality checklist is gold. It helped me produce content that feels premium, faster, without sounding generic. I increased my monthly retainer.',
  },
]

const offerStack = [
  {
    title: 'Proven AI offers you can sell this week',
    copy: 'Start with simple, fixed-price services that make sense to Kenyan buyers immediately.',
  },
  {
    title: 'Ready-to-use templates',
    copy: 'Use plug-and-play prompts, copy structures, and delivery assets instead of starting from zero.',
  },
  {
    title: 'Step-by-step delivery workflow',
    copy: 'Follow a practical system from idea to client handoff without guessing what comes next.',
  },
  {
    title: 'Quality checklist',
    copy: 'Catch weak outputs before the client sees them so the work feels reliable and premium.',
  },
  {
    title: '30-day path to first income',
    copy: 'Move from setup to outreach to repeatable execution with a plan that is meant to be used.',
  },
]

const previewPages: PreviewPage[] = [
  {
    id: 'page-1',
    page: '01',
    label: 'Hook + positioning',
    title: 'A promise that feels local, immediate, and believable',
    lead: 'The opening page frames AI income for Kenya without hype and makes the opportunity feel actionable now.',
    bullets: [
      'Built for Kenyan youth and job seekers',
      'Phone-first, low-cost, beginner-friendly positioning',
      'Sets up a clear path to first income',
      'Makes the guide feel practical before purchase',
    ],
    note: 'Preview the hook first so buyers can judge the tone, clarity, and practicality before they commit.',
    imageSrc: previewCoverPage,
    imageAlt: 'Cover preview for the AI income guide',
    width: 910,
    height: 1287,
    accent: 'gold',
  },
  {
    id: 'page-2',
    page: '02',
    label: 'Belief shift',
    title: 'Why this works in Kenya right now',
    lead: 'The introduction connects M-Pesa, smartphones, English, and local hustle into one believable advantage.',
    bullets: [
      'Explains why the opportunity fits the market',
      'Turns vague interest into urgency',
      'Positions the buyer for action instead of endless learning',
      'Keeps the message grounded and mobile-first',
    ],
    note: 'This page helps the reader believe the system can work for them, not just for people online.',
    imageSrc: previewIntroPage,
    imageAlt: 'Preview page about why AI income is an opportunity in Kenya',
    width: 910,
    height: 1287,
    accent: 'emerald',
  },
  {
    id: 'page-3',
    page: '03',
    label: 'Mechanism',
    title: 'The simple system behind the offer',
    lead: 'The mechanism page makes the income path easy to understand: prompt, produce, deliver, get paid.',
    bullets: [
      'Shows how the workflow actually works',
      'Makes the guide feel executable, not theoretical',
      'Connects AI outputs to sellable services',
      'Builds confidence before checkout',
    ],
    note: 'This is where the buyer sees the system clearly enough to picture themselves using it this week.',
    imageSrc: previewMechanismPage,
    imageAlt: 'Preview page showing the core AI income mechanism',
    width: 1240,
    height: 1755,
    accent: 'ink',
  },
]

function toKesLabel(amount: number) {
  return `KES ${Math.round(amount).toLocaleString()}`
}

export function Home() {
  const navigate = useNavigate()
  const { activeProducts } = useProducts()

  const featuredGuide = activeProducts.find((product) => product.id === 'p_kenya_ai_money')
  const starterPriceKes =
    activeProducts.length > 0 ? Math.min(...activeProducts.map((product) => product.priceKes)) : 499

  const featuredGuideHref = featuredGuide ? `/p/${featuredGuide.slug}` : '/shop'
  const featuredPriceLabel = toKesLabel(featuredGuide?.priceKes ?? 499)
  const starterPriceLabel = toKesLabel(starterPriceKes)
  const ratingLabel = featuredGuide ? featuredGuide.ratingAvg.toFixed(1) : '4.7'
  const ratingCountLabel = featuredGuide ? featuredGuide.ratingCount.toLocaleString() : '128'

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <MotionPage>
      <div className="container">
        <div className={styles.page}>
          <section className={`glass ${styles.heroShell}`}>
            <div className={styles.hero}>
              <div className={styles.copy}>
                <div className={styles.kicker}>AI income for Kenya</div>
                <h1 className="h1">Turn AI into KES in 7 Days - Even If You Have Zero Experience</h1>
                <p className={`muted ${styles.lede}`}>
                  Step-by-step playbooks, templates, and delivery systems built for Kenya:
                  M-Pesa, mobile-first, and made for people who want income, not more theory.
                </p>

                <ul className={styles.heroBullets} aria-label="Hero highlights">
                  {heroBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className={styles.trustRow} aria-label="Pricing and trust anchors">
                  <span className={styles.pill}>Featured guide: {featuredPriceLabel}</span>
                  <span className={styles.pill}>Start from {starterPriceLabel}</span>
                  <span className={styles.pill}>Mobile + M-Pesa</span>
                  <span className={styles.pill}>No experience needed</span>
                </div>

                <div className={styles.actions}>
                  <Button onClick={() => navigate(featuredGuideHref)}>
                    Start Earning Now ({featuredPriceLabel})
                  </Button>
                  <Button variant="secondary" onClick={() => scrollToSection('income-system')}>
                    See How It Works
                  </Button>
                </div>

                <p className={styles.heroNote}>
                  Start this week. No extra tools required to begin. Built for beginners who want
                  a clear first client plan.
                </p>
              </div>

              <div className={styles.heroPanel}>
                <div className={styles.heroFrame}>
                  <img
                    src="/assets/cover-optimized.jpg"
                    alt="Cover of the featured AI income guide for Kenya"
                    className={styles.bannerImg}
                    width={1024}
                    height={1536}
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>

                <div className={styles.heroStats}>
                  <div className={styles.statCard}>
                    <div className={styles.statNum}>{featuredPriceLabel}</div>
                    <div className={styles.statLabel}>
                      The featured guide includes the 7-day execution plan.
                    </div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNum}>{ratingLabel}/5</div>
                    <div className={styles.statLabel}>
                      Average rating from {ratingCountLabel} readers in the catalog.
                    </div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNum}>7 days</div>
                    <div className={styles.statLabel}>
                      Clear path to your first paying client instead of endless tool hopping.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="problem" className="glass">
            <div className={styles.section}>
              <div className={styles.kicker}>Problem</div>
              <h2 className="h2">You&apos;re Learning AI... But Still Broke</h2>
              <p className={styles.subhead}>
                Too much content. Too little packaging. The issue is not motivation. The issue is
                that nothing is packaged into an offer a client can buy.
              </p>

              <div className={styles.quickGrid}>
                <div className={styles.problemPanel}>
                  <ul className={styles.bullets}>
                    {problemBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  <div className={styles.problemCallout}>
                    You don&apos;t have an income problem. You have a packaging problem.
                  </div>
                </div>

                <div className={styles.imgFrame}>
                  <img
                    className={styles.img}
                    src={problemIllustration}
                    alt="Illustration showing scattered AI tools and overwhelmed learning"
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="income-system" className="glass">
            <div className={styles.section}>
              <div className={styles.kicker}>Solution</div>
              <h2 className="h2">A Simple System That Turns AI Skills into Cash</h2>
              <p className={styles.subhead}>
                The 4-Step AI Income System gives you one offer, one workflow, and one repeatable
                way to produce, deliver, and get paid.
              </p>

              <div className={styles.solutionGrid}>
                <div className={styles.imgFrame}>
                  <img
                    className={styles.img}
                    src={solutionIllustration}
                    alt="Illustration of a simple AI workflow moving from offer to delivery"
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className={styles.systemPanel}>
                  <div className={styles.systemBadge}>The 4-Step AI Income System</div>

                  <div className={styles.stepList}>
                    {systemSteps.map((step) => (
                      <article key={step.id} className={styles.stepCard}>
                        <div className={styles.stepNumber}>{step.number}</div>
                        <div>
                          <h3 className={styles.stepTitle}>{step.title}</h3>
                          <p className={styles.stepText}>{step.detail}</p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <p className={styles.systemNote}>No guessing. No experimenting. Just execute.</p>

                  <div className={styles.actions}>
                    <Button onClick={() => navigate(featuredGuideHref)}>Get the System</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass">
            <div className={styles.section}>
              <div className={styles.kicker}>Transformation</div>
              <h2 className="h2">From Zero to Paid - In 7 Days</h2>
              <p className={styles.subhead}>
                Stop collecting tools. Start selling one clear offer with a delivery system behind
                it.
              </p>

              <div className={styles.storyStats}>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>1 offer</div>
                  <div className={styles.statLabel}>
                    A poster + caption package is enough to start.
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>3-7 days</div>
                  <div className={styles.statLabel}>
                    Fast path to your first client outreach and early response.
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>Mobile-first</div>
                  <div className={styles.statLabel}>
                    Create, deliver, and collect payment without heavy setup.
                  </div>
                </div>
              </div>

              <div className={styles.storyGrid}>
                <article className={styles.storyCard}>
                  <div className={styles.storyLabel}>Before</div>
                  <h3 className={styles.storyTitle}>Learning all day. Selling nothing.</h3>
                  <ul className={styles.bullets}>
                    {beforePoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className={styles.storyMediaFrame}>
                    <img
                      className={styles.img}
                      src={beforeIllustration}
                      alt="Before state showing confusion and stalled progress"
                      width={1536}
                      height={1024}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </article>

                <article className={styles.storyCard}>
                  <div className={styles.storyLabel}>After</div>
                  <h3 className={styles.storyTitle}>One offer. Repeatable delivery. Paid results.</h3>
                  <ul className={styles.bullets}>
                    {afterPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className={styles.storyMediaFrame}>
                    <img
                      className={styles.img}
                      src={afterIllustration}
                      alt="After state showing a clear offer, delivery flow, and paid output"
                      width={1536}
                      height={1024}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="glass">
            <div className={styles.section}>
              <div className={styles.kicker}>Proof</div>
              <h2 className="h2">Specific wins from Kenyan readers</h2>
              <p className={styles.subhead}>
                Proof matters more than theory. These examples make the transformation concrete:
                clearer offer, faster delivery, stronger client trust.
              </p>

              <div className={styles.proofStats}>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{ratingLabel}/5</div>
                  <div className={styles.statLabel}>Average rating for the featured guide.</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{ratingCountLabel}</div>
                  <div className={styles.statLabel}>Catalog ratings giving the offer social proof.</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>7-day plan</div>
                  <div className={styles.statLabel}>
                    Built to move the buyer from study mode into action fast.
                  </div>
                </div>
              </div>

              <div className={styles.proofGrid}>
                {proofCards.map((card) => (
                  <article key={card.id} className={styles.proofCard}>
                    <div className={styles.proofTop}>
                      <div className={styles.proofAvatar} aria-hidden="true">
                        {card.name.slice(0, 1)}
                      </div>
                      <div>
                        <div className={styles.proofName}>{card.name}</div>
                        <div className={styles.proofMeta}>
                          {card.role} | {card.location}
                        </div>
                      </div>
                    </div>

                    <div className={styles.proofTags}>
                      <span className={styles.proofTag}>Result: {card.result}</span>
                      <span className={styles.proofTag}>Timeframe: {card.timeframe}</span>
                      <span className={styles.proofTag}>Tool: {card.tool}</span>
                    </div>

                    <p className={styles.proofQuote}>"{card.quote}"</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="glass">
            <div className={styles.section}>
              <div className={styles.kicker}>What You Get</div>
              <h2 className="h2">Everything you need to start earning - no extra tools required</h2>
              <p className={styles.subhead}>
                This is an offer stack, not a lecture. The guide is built to help a beginner pick
                an offer, deliver with confidence, and start selling fast.
              </p>

              <div className={styles.offerGrid}>
                {offerStack.map((item) => (
                  <article key={item.title} className={styles.offerCard}>
                    <h3 className={styles.offerTitle}>{item.title}</h3>
                    <p className={styles.offerCopy}>{item.copy}</p>
                  </article>
                ))}
              </div>

              <div className={styles.offerBanner}>
                <div className={styles.offerBannerCopy}>
                  <strong>Featured guide: {featuredPriceLabel}</strong>
                  <p>
                    Start with your phone, M-Pesa, and free tools. Designed for beginners and
                    built to help you move toward first income in 7-30 days.
                  </p>
                </div>

                <Button onClick={() => navigate(featuredGuideHref)}>Start with This Guide</Button>
              </div>
            </div>
          </section>

          <section id="preview-pages" className="glass">
            <div className={`${styles.section} ${styles.previewSection}`}>
              <div className={styles.previewHeader}>
                <div className={styles.kicker}>Preview Pages</div>
                <h2 className="h2">See inside before you buy</h2>
                <p className={styles.subhead}>
                  The preview pages stay because they help conversion. They show the buyer the tone,
                  clarity, and mechanism before checkout.
                </p>
              </div>

              <div className={styles.whatYouGetList}>
                {previewPages.map((page) => {
                  const toneClass =
                    page.accent === 'gold'
                      ? styles.whatYouGetGold
                      : page.accent === 'emerald'
                        ? styles.whatYouGetEmerald
                        : styles.whatYouGetInk

                  return (
                    <article
                      key={page.id}
                      className={`${styles.whatYouGetItem} ${toneClass}`}
                    >
                      <div className={styles.whatYouGetVisual}>
                        <div className={styles.whatYouGetVisualFrame}>
                          <img
                            className={styles.whatYouGetImage}
                            src={page.imageSrc}
                            alt={page.imageAlt}
                            width={page.width}
                            height={page.height}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>

                      <div className={styles.whatYouGetContent}>
                        <div className={styles.whatYouGetMeta}>
                          <span className={styles.whatYouGetPage}>Page {page.page}</span>
                          <span className={styles.whatYouGetLabel}>{page.label}</span>
                        </div>

                        <div className={styles.whatYouGetHeading}>
                          <h3 className={styles.whatYouGetTitle}>{page.title}</h3>
                          <p className={styles.whatYouGetLead}>{page.lead}</p>
                        </div>

                        <ul className={styles.whatYouGetBullets}>
                          {page.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>

                        <p className={styles.whatYouGetNote}>{page.note}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="glass">
            <div className={`${styles.cta} ${styles.finalCta}`}>
              <div className={styles.finalCtaInner}>
                <div className={styles.finalCtaCopy}>
                  <div className={styles.kicker}>Final CTA</div>
                  <h2 className="h2">Don&apos;t spend another month learning without income</h2>
                  <p className="muted">
                    Open the guide, pick one offer, and start sending work this week. Beginner
                    friendly, mobile first, and built for action.
                  </p>

                  <div className={styles.actions}>
                    <Button onClick={() => navigate(featuredGuideHref)}>
                      Get the Guide ({featuredPriceLabel})
                    </Button>
                    <Button variant="secondary" onClick={() => scrollToSection('preview-pages')}>
                      See Inside First
                    </Button>
                  </div>

                  <div className={styles.trustRow}>
                    <span className={styles.pill}>Featured guide: {featuredPriceLabel}</span>
                    <span className={styles.pill}>Catalog starts at {starterPriceLabel}</span>
                    <span className={styles.pill}>Built for Kenya</span>
                  </div>
                </div>

                <div className={styles.finalCtaMedia}>
                  <video
                    className={styles.finalCtaVideo}
                    src={ebookCoverAnimation}
                    poster={previewCoverPage}
                    muted
                    playsInline
                    controls
                    preload="none"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MotionPage>
  )
}
