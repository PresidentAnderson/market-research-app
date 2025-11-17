// lib/marketResearchSteps.ts

export type MarketResearchStepDefinition = {
  order: number;
  title: string;
  notes: string;
};

export const MR_STEPS: MarketResearchStepDefinition[] = [
  {
    order: 1,
    title: "Define Decision Context & Research Objectives",
    notes:
      "Clarify which concrete decisions this research must inform (e.g., go-to-market, pricing, investor deck, " +
      "product scope, market entry sequence). Define 3–5 precise research questions and success metrics. " +
      "Output: a 1–2 page Research Brief that states the decisions, questions, and key assumptions to validate."
  },
  {
    order: 2,
    title: "Define Market Definition & Boundaries",
    notes:
      "Precisely define the market: geography, customer segments, use cases, verticals, and explicit exclusions. " +
      "Clarify whether this is a product category, a problem space, or a specific buyer segment. " +
      "Output: a written market definition plus a simple in-scope / out-of-scope diagram."
  },
  {
    order: 3,
    title: "Draft Initial Hypotheses & Key Metrics",
    notes:
      "Write the working hypotheses about market size, growth, customer behavior, willingness to pay, competitive " +
      "pressure, adoption bottlenecks, and buying process. Identify the key metrics to be validated (e.g., TAM/SAM/SOM, " +
      "ARPU, CAC proxies, conversion rates, usage frequency). Output: a short hypothesis + metric list that will shape " +
      "both secondary and primary research."
  },
  {
    order: 4,
    title: "Build Source Map (Databases, Reports, Competitors)",
    notes:
      "Identify and list the key data sources you will consult: official statistics (e.g., UNWTO, StatsCan), " +
      "industry reports, analyst / consulting reports, competitor filings and investor decks, trade associations, " +
      "academic papers, news, and internal analytics. For each, capture where it lives, how to access it, and any paywalls. " +
      "Output: a Source Map inventory connected to the Source Log."
  },
  {
    order: 5,
    title: "Secondary Research – Market Size & Growth",
    notes:
      "Collect external data on market size, historical and projected growth (CAGR), regional splits, structural trends, " +
      "and key demand drivers. Extract only the figures you will actually use and log them with full citations in the Source Log. " +
      "Output: a structured set of market size and growth inputs (TAM/SAM candidates) with clear assumptions and provenance."
  },
  {
    order: 6,
    title: "Secondary Research – Competitors & Benchmarks",
    notes:
      "Map direct, indirect, and substitute competitors. Capture their positioning, pricing models, feature depth, " +
      "target segments, traction signals, and go-to-market motions. Benchmark key metrics (e.g., average commission rates, " +
      "typical price bands, adoption curves) and record them as sources. Output: a competitor matrix and narrative summary " +
      "of differentiation gaps and incumbency risks."
  },
  {
    order: 7,
    title: "Ethics, Compliance & Data Privacy",
    notes:
      "Confirm that planned primary research (interviews, surveys, panels) complies with privacy laws, platform policies, " +
      "and ethical standards. Decide what PII you will collect, how it will be stored, and for how long. Draft consent language " +
      "and participant messaging if needed. Output: a short Ethics & Data Handling note and any consent templates."
  },
  {
    order: 8,
    title: "Research Design – Primary Methods & Sampling",
    notes:
      "Choose the primary research methods (e.g., expert interviews, customer interviews, focus groups, surveys, diary studies), " +
      "sample sizes, and target profiles (ICP, segments, geographies). Align this design with the hypotheses and metrics from Step 3. " +
      "Output: a Research Design document describing methods, sampling, and how each question will be answered."
  },
  {
    order: 9,
    title: "Instrument Design (Surveys, Guides, Screens)",
    notes:
      "Design the instruments needed to run primary research: interview guides, survey questionnaires, screeners for participant " +
      "recruitment, and any task prompts. Questions should be traceable back to the hypotheses and metrics. " +
      "Output: finalized instruments ready for pilot (files and links logged in the Source Log)."
  },
  {
    order: 10,
    title: "Pilot & Refine Research Instruments",
    notes:
      "Run a small pilot (typically 5–10 participants or a small subset of the target sample) to test the clarity and flow of your " +
      "instruments. Identify confusing or biased questions, technical issues, and drop-off points. Refine wording, order, and length. " +
      "Output: updated instruments with a brief note on what changed and why."
  },
  {
    order: 11,
    title: "Fieldwork – Qualitative (Interviews, Groups)",
    notes:
      "Execute qualitative research: interviews, expert calls, or small groups. Record sessions where consented, take structured notes, " +
      "and code key themes (needs, pains, language, buying triggers, objections). Link transcripts, recordings, and summaries into the " +
      "Source Log. Output: coded qualitative findings mapped to hypotheses and segments."
  },
  {
    order: 12,
    title: "Fieldwork – Quantitative (Surveys, Panels)",
    notes:
      "Launch quantitative research (surveys, panels, experiments). Ensure sample quality (screening, completion checks), monitor " +
      "response rates, and check for obvious bias or fraud. Output: a clean raw dataset (or export) plus a brief summary of sample " +
      "composition and any caveats."
  },
  {
    order: 13,
    title: "Data Validation, Cleaning & Coding",
    notes:
      "Clean and validate all collected data. Handle missing values, outliers, and inconsistent units. Normalize categories, code open-ended " +
      "responses where needed, and prepare analysis-ready tables. Document major cleaning decisions. Output: analysis-ready datasets with " +
      "a short Data Cleaning log."
  },
  {
    order: 14,
    title: "TAM / SAM / SOM & Segmentation Modeling",
    notes:
      "Using both secondary and primary data, build your TAM/SAM/SOM model and define the key market segments (e.g., by geography, " +
      "property type, company size, psychographics). Document all formulas, filters, and multipliers. Output: a working TAM/SAM/SOM model, " +
      "segment definitions, and a short explanation of each assumption, with every input tied back to a logged source."
  },
  {
    order: 15,
    title: "Pricing & Revenue Modeling",
    notes:
      "Analyze willingness-to-pay data, competitor price benchmarks, and internal cost structures. Propose price bands and monetization logic " +
      "(e.g., commission %, subscription tiers, usage-based fees, enterprise pricing). Output: one or more pricing + revenue scenarios " +
      "(conservative, base, aggressive) and a short write-up of the rationale and trade-offs."
  },
  {
    order: 16,
    title: "Triangulation & Sensitivity Analysis",
    notes:
      "Cross-check key figures across independent sources. Stress-test the model by varying fragile assumptions (e.g., penetration rates, " +
      "growth rates, pricing bands) to produce low/base/high scenarios. Highlight which assumptions have the largest impact and which are " +
      "most uncertain. Output: a sensitivity table or chart plus notes on model robustness."
  },
  {
    order: 17,
    title: "Insights Synthesis, Story & Narrative",
    notes:
      "Synthesize the research into a clear narrative: what is true about this market, what is changing, where value is shifting, and why now. " +
      "Distill 5–10 headline insights that speak directly to strategy and product decisions. Output: an insights summary and story outline " +
      "that can feed decks, memos, and the Master Brief."
  },
  {
    order: 18,
    title: "Strategic Recommendations & Implementation Implications",
    notes:
      "Translate insights into concrete strategic recommendations: ideal customer profile, positioning, sequencing of markets or segments, " +
      "pricing choices, product bets, and risk mitigations. Clarify what you recommend doing, not doing, and testing next. " +
      "Output: a concise recommendations section with clear links to research evidence and explicit trade-offs."
  },
  {
    order: 19,
    title: "Documentation, Source Log & Knowledge Base Update",
    notes:
      "Finalize documentation: ensure all sources are logged with citations, all models and datasets are stored in the correct locations, " +
      "and the research run is summarized in the central knowledge base (e.g., Master Brief, LexChronos, Notion). " +
      "Output: updated Source Log entries, linked files (decks, models, raw data), and a run-level summary so future projects can reuse this work."
  }
];
