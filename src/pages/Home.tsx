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
import previewPageFour from '../assets/preview 4.png'
import previewPageFive from '../assets/preview 5.png'
import bannerImage from '../assets/banner.png'
import brianTestimonialImage from '../assets/testimonial2.png'
import aminaTestimonialImage from '../assets/testimonial3.png'
import faithTestimonialImage from '../assets/testimonial-1.png'
import ebookCoverAnimation from '../assets/ebook cover animation .mp4'

type PreviewPage = {
  id: string
  page: string
  label?: string
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
  avatarSrc?: string
}

type OfferStackItem = {
  id: string
  label: string
  title: string
  copy: string
  imageSrc: string
  imageAlt: string
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
    role: 'Recent graduate',
    location: 'Nairobi',
    result: 'CV writing offer launched',
    timeframe: 'First paid task in 1 week',
    tool: 'ChatGPT',
    quote:
      'I stopped just watching AI videos and started offering CV rewrites. The guide made it easy to package the service and deliver quickly from my phone.',
    avatarSrc: aminaTestimonialImage,
  },
  {
    id: 'proof-2',
    name: 'Brian',
    role: 'Student',
    location: 'Kisumu',
    result: 'Caption bundle sold',
    timeframe: 'Within 7 days',
    tool: 'Canva + ChatGPT',
    quote:
      'The caption templates gave me a simple offer I could explain to local businesses fast. I used the workflow exactly as written and got paid for my first bundle that same week.',
    avatarSrc: brianTestimonialImage,
  },
  {
    id: 'proof-3',
    name: 'Faith',
    role: 'Business assistant',
    location: 'Mombasa',
    result: 'Business content package running',
    timeframe: 'Repeatable weekly workflow',
    tool: 'ChatGPT',
    quote:
      'I now use the system to create simple business content for shops around me. It feels practical, repeatable, and easy to execute without needing a laptop.',
    avatarSrc: faithTestimonialImage,
  },
]

const offerStack: OfferStackItem[] = [
  {
    id: 'offer-1',
    label: 'Offer ideas',
    title: 'Proven AI offers you can sell this week',
    copy: 'Start with simple, fixed-price services that make sense to Kenyan buyers immediately.',
    imageSrc: bannerImage,
    imageAlt: 'Banner illustration of a clear AI offer packaged for paid client work',
  },
  {
    id: 'offer-2',
    label: 'Templates',
    title: 'Ready-to-use templates',
    copy: 'Use plug-and-play prompts, copy structures, and delivery assets instead of starting from zero.',
    imageSrc: previewCoverPage,
    imageAlt: 'Guide preview representing ready-to-use templates and delivery assets',
  },
  {
    id: 'offer-3',
    label: 'Workflow',
    title: 'Step-by-step delivery workflow',
    copy: 'Follow a practical system from idea to client handoff without guessing what comes next.',
    imageSrc: previewMechanismPage,
    imageAlt: 'Preview page showing a step-by-step AI delivery workflow',
  },
  {
    id: 'offer-4',
    label: 'Checklist',
    title: 'Quality checklist',
    copy: 'Catch weak outputs before the client sees them so the work feels reliable and premium.',
    imageSrc: solutionIllustration,
    imageAlt: 'Illustration representing quality review before client delivery',
  },
  {
    id: 'offer-5',
    label: '30-day path',
    title: '30-day path to first income',
    copy: 'Move from setup to outreach to repeatable execution with a plan that is meant to be used.',
    imageSrc: previewIntroPage,
    imageAlt: 'Guide preview representing a structured first-income plan',
  },
]

const previewPages: PreviewPage[] = [
  {
    id: 'page-1',
    page: '01',
    title: 'AI Income in Kenya Starts Here',
    lead: 'Imagine waking up in Nairobi, Kisumu, or Mombasa and earning money before the day ends using just your phone.',
    bullets: [
      'No office. No boss. No expensive course.',
      'Built for Kenyan youth, job seekers, and hustlers',
      'Works with your phone and internet',
      'Uses free tools you can access today',
    ],
    note: 'You do not need more learning. You need a way to start earning.',
    imageSrc: previewCoverPage,
    imageAlt: 'Cover preview for the AI income guide',
    width: 910,
    height: 1287,
    accent: 'gold',
  },
  {
    id: 'page-2',
    page: '02',
    title: 'Why This Works in Kenya Right Now',
    lead: 'Kenya is already set up for this.',
    bullets: [
      'M-Pesa, smartphones, English and Swahili, and internet access make this practical now',
      'AI removes the hardest part: skills and speed',
      'Write content, design posts, create videos, and deliver services faster',
      'The opportunity is not coming. It is already here.',
    ],
    note: 'You do not need years to learn. You can start producing valuable work in hours.',
    imageSrc: previewIntroPage,
    imageAlt: 'Preview page about why AI income is an opportunity in Kenya',
    width: 910,
    height: 1287,
    accent: 'emerald',
  },
  {
    id: 'page-3',
    page: '03',
    title: 'The Simple System Behind the Income',
    lead: 'This is how you turn AI into money: Prompt -> Produce -> Deliver -> Get Paid',
    bullets: [
      'Tell AI what to create',
      'Generate work in minutes',
      'Package it into a service',
      'Send to a client and get paid',
    ],
    note: 'You are not selling AI. You are selling results: captions, designs, CVs, and ready-to-use content people will pay for.',
    imageSrc: previewMechanismPage,
    imageAlt: 'Preview page showing the core AI income mechanism',
    width: 1240,
    height: 1755,
    accent: 'ink',
  },
  {
    id: 'page-4',
    page: '04',
    title: 'What This Looks Like in Real Life',
    lead: 'You do not need big skills to start.',
    bullets: [
      'Offer CV writing, social media posts, captions for businesses, or simple designs',
      'Day 1-3: learn the tools',
      'Day 4-7: send offers',
      'Week 1: get your first response or client',
    ],
    note: 'You are not building a career first. You are getting your first payment first.',
    imageSrc: previewPageFour,
    imageAlt: 'Preview page showing what this looks like in real life',
    width: 1024,
    height: 1536,
    accent: 'gold',
  },
  {
    id: 'page-5',
    page: '05',
    title: 'Start Before You Feel Ready',
    lead: 'You do not need a laptop, a degree, or experience.',
    bullets: [
      'You need a phone',
      'You need internet',
      'You need a decision to start',
      'Open the guide, pick one offer, and start sending work this week',
    ],
    note: 'This works - but only if you execute.',
    imageSrc: previewPageFive,
    imageAlt: 'Preview page showing how to start before you feel ready',
    width: 1024,
    height: 1536,
    accent: 'emerald',
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
  const proofUserCountLabel = `${ratingCountLabel}+`

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
              <h2 className="h2">Proof beats theory. This is what people are actually doing:</h2>

              <div className={styles.proofStats}>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{ratingLabel}/5 rating</div>
                  <div className={styles.statLabel}>
                    From {proofUserCountLabel} real users who bought and used the guide.
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{proofUserCountLabel} users</div>
                  <div className={styles.statLabel}>
                    Already using these methods to offer CV writing, captions, and simple
                    business content with AI.
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>7-day system</div>
                  <div className={styles.statLabel}>
                    Go from learning {'->'} offering {'->'} first paid task using a simple,
                    repeatable
                    workflow.
                  </div>
                </div>
              </div>

              <div className={styles.proofGrid}>
                {proofCards.map((card) => (
                  <article key={card.id} className={styles.proofCard}>
                    <div className={styles.proofTop}>
                      {card.avatarSrc ? (
                        <img
                          className={`${styles.proofAvatar} ${styles.proofAvatarImage}`}
                          src={card.avatarSrc}
                          alt={`${card.name} testimonial`}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div
                          className={styles.proofAvatar}
                          role="img"
                          aria-label={`${card.name} testimonial photo placeholder`}
                        >
                          <span className={styles.proofAvatarLabel}>Photo</span>
                        </div>
                      )}
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

              <p className={styles.proofNote}>
                No theory. No fluff. Just practical steps you can execute immediately using your
                phone.
              </p>
            </div>
          </section>

          <section className="glass">
            <div className={`${styles.section} ${styles.offerSection}`}>
              <div className={styles.kicker}>What You Get</div>
              <h2 className="h2">Everything you need to start earning - no extra tools required</h2>
              <p className={styles.subhead}>
                This is an offer stack, not a lecture. The guide is built to help a beginner pick
                an offer, deliver with confidence, and start selling fast.
              </p>

              <div className={styles.offerFeatureList}>
                {offerStack.map((item, index) => (
                  <article
                    key={item.id}
                    className={`${styles.offerFeature} ${
                      index % 2 === 1 ? styles.offerFeatureReverse : ''
                    }`}
                  >
                    <div className={styles.offerFeatureMedia}>
                      <img
                        className={styles.offerFeatureImage}
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className={styles.offerFeatureContent}>
                      <div className={styles.offerFeatureMeta}>
                        <span className={styles.offerFeatureNumber}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.offerFeatureLabel}>{item.label}</span>
                      </div>

                      <h3 className={styles.offerFeatureTitle}>{item.title}</h3>
                      <p className={styles.offerFeatureCopy}>{item.copy}</p>
                    </div>
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
                  See exactly how the guide helps you start, why it works in Kenya, and what path
                  to follow to turn AI into paid offers.
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
                          {page.label ? (
                            <span className={styles.whatYouGetLabel}>{page.label}</span>
                          ) : null}
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
