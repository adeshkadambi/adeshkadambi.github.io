---
title: "Post Mortem: Maya Health"
date: 2024-03-12
---
Hi there 👋, we’re [Adesh](https://www.linkedin.com/in/akadambi/) and [Shivam](https://www.linkedin.com/in/sdubey97/). Between Oct ‘23 and Feb ‘24 we spent many hours on Maya Health, a startup idea focused on automating medical coding.

We ultimately decided to pivot away from this idea, but we learned a lot through interviewing customers and industry experts, and building the product. We wanted to share some of those learnings with you.

# Part 1. A new tech wave 🌊

When we started exploring potential startup ideas, ChatGPT was close to a year old and there was buzzing excitement around the possibilities of LLMs and Generative AI. Although we were skeptical that a blind adoption of LLMs alone could solve meaningful problems, we were excited by how this tech extended the software toolkit.

We spent time understanding how the core technology worked, mapping out new capabilities that LLMs were uniquely good at, and also it’s noteworthy limitations.

In parallel, we also explored unconventional service and usage-based business models that are made more exciting by LLMs. [EvenUp](https://www.evenuplaw.com/), for example, uses in-house lawyers and paralegals greatly augmented by AI tools to help create ‘demand packages’ for law firms, an essential and time consuming work product for personal injury lawyers.

# Part 2. The medical coding problem

## Exploring the healthcare landscape

We both had worked in healthcare for years and had a few starting hypotheses about how new AI capabilities could help solve major inefficiencies in the industry. In particularly, we knew burnout rates in medicine were startlingly high. A major cause was physicians being tasked with non-clinical work they mostly hated.

> In a [poll](https://opmed.doximity.com/articles/administrative-burden-remains-biggest-driver-of-burnout-doctors-say) conducted by Doximity, 46% of physicians said reducing the admin burden would be _the most effective change to reduce burnout rates_; more impactful than improving work-life balance or reducing clinical caseloads!

We began by [mapping the workflows](https://www.figma.com/file/e8KQEug9e7FtOmcPntYhG3/RCM-User-Journey-Mapping?type=whiteboard&node-id=0%3A1&t=fh73wOoOMCUlzZPJ-1), paying particularly close attention to documentation requirements and money flows.

## Medical coding

We quickly came across a potential candidate for a set of tasks that could be dramatically improved by LLMs: medical coding. Medical coding is the process of translating largely free text physician notes that contain healthcare diagnoses, procedures, and medical services into universal medical alphanumeric codes (e.g., ICD-10, CPT). The codes have expanded as the set of diagnoses and procedures has increased; in 2024 there were close to 100,000 codes across ICD and CPT standards.

Medical coding is a common practice globally, and it’s primarily used to collect standardized data for public health and scientific research. In the US ecosystem however, its role is broader. Medical codes are an integral part of insurance claims that all providers, from independent clinics to massive hospital groups, need to complete for every single patient encounter to get collect revenue.

Medical coding is still largely a manual process, conducted by a combination of in-house coders or consultants. Some key facts we found convincing about the medical coding problem:

- Manual coding is error prone, with the median encounter having a 20% error rate
- Denied claims due to coding errors result in the loss or delay of about $20 billion in the U.S.
- Many claims processing is delayed due to coding backlog which extends the AR cycle
- There is a 30% shortage of medical coders nationwide, with an imminent wave of retirements in the next five years (AMA, 2023)

# Part 3. Validating the idea

We felt it was easier to get feedback on a concrete product pitch so we spun up a mock landing page. This was the primary value proposition we were testing:

> [!NOTE]
>The Maya AI platform automatically codes over 90% of encounters and gets claims ready to bill. Our in-house coding team can complete the rest.

## Customer and expert interviews

Healthcare is a labyrinthian market and is fragmented across provider type, provider size, state, EHR, funding model and medical specialty. We knew the needs of each segment could be markedly different so we wanted to start narrow and interview small to medium sized providers.

We interviewed 10 medical coders and physicians that worked at mid-sized mental health, family physicians and urgent care practices. We also spoke with 6 experts that had worked as medical coding consultants or ran revenue cycle management outsourcing firms.

### 💬 Main themes from customer and expert interviews

1. **Large variation between medical specialty**: Medical coding is more challenging and is a real burden in medical specialties where there is either a wide range of procedures (e.g. Emergency Medicine, Family Medicine, Urgent Care) or particularly complex procedures with a large number of decisions (e.g. Cardiac Surgery, Opthamalogy). However, meaningful segments of the market including specialized outpatient practices such as mental health or radiology don’t feel that medical coding is a challenge.
2. **Midsized clinics offshore most of the medical coding work**: Although there is an informal certificate body called the [AAPC](https://www.aapc.com/), medical coders don’t require a license to practice. This has resulted in an off shoring of a large portion of medical coding work in mid sized clinics to Latin America and South Asia and has drove down cost significantly.
3. **The quality of physician documentation greatly affects coding**: Physicians are often unaware of the medical coding and billing guidelines, they tend to under-document visits, miss documenting certain consultations or procedures, or incorrectly code encounters (at practices where physicians also do medical coding). This leads to under-billing, claim denials, or several follow-ups by the medical coder to assign the correct codes.
4. **Unaware of net impact of medical coding errors**: Many small to mid-sized medical clinics don’t diligently track and attribute the cause of insurance claim denials. As a result, they don’t have a good grasp on the revenue they’re losing out on because of medical coding related errors or delays.
5. **Every individual site requires EHR integration**: Every individual site requires EHR integration which is still a largely manual process that requires expensive software engineers.

## Key product and business model learnings

Along with running customer and expert interviews, we created a medical coding prototype, and a [product market fit canvas](https://www.reforge.com/artifacts/business-hypothesis-canvas-at-reforge) to flesh out other elements of the business.

### 🤔 Product and business model learnings

- **Poor unit economics for mid-market customers**: Every single clinic we deployed our coding automation product to requires a custom EMR integration and dedicated implementation—we estimated these integrations would take 1-3 weeks of software engineering time and cost thousands of dollars. We explored vendors that could help accelerate this process (e.g. [Metriport](https://www.healthjump.com/)), but the cost of goods sold (COGS) remained significant. Also, the downward price pressure created by offshoring medical coding tasks to cheaper talent meant that the per client revenue was compressing over time.
- **Conclusions from prototyping**: The extremely low performance (micro F1 = 0.2) on MIMIC-4 using the out of the box Gemini Pro model highlighted several challenges that would make real-world implementation risky. 
	1. Clinical coding requires exceptional precision since errors can impact patient care, billing accuracy, and regulatory compliance. The high dimensionality of ICD-10 (with over 70,000 codes) combined with complex coding rules and guidelines makes this a particularly challenging task for LLMs. 
	2. Clinicians often document conditions using varied terminology and may include relevant historical context across multiple notes, requiring sophisticated temporal reasoning that current LLMs struggle with. Additionally, many codes require specific documentation elements to be present to justify their use - subtle distinctions that appear to be beyond current model capabilities. 
	3. The hierarchical nature of ICD-10 means that selecting a code that's close but not exactly right can have significant downstream implications. With such a low F1-score, implementing this system would likely ***increase*** the workload for coding professionals, as they would need to verify and correct most of the model's predictions. 

While we could go down the route of fine-tuning the LLM on a large dataset of validated clinical notes and ICD-10 codes, set up robust validation against official ICD-10 documentation, and implement monitoring for code accuracy, we decided against it.

# Part 4. Pivoting away from medical coding

We remain excited about building products for small and midsized medical clinics, and generally are very optimistic about tech driven innovation in healthcare. But we decided to pivot away from medical coding as:

- **Medical coding is not a hair on fire problem**: Small and midsized clinics are often run by physicians who don’t have the time to rigorously understand how much revenue they’ve lost due to medical coding errors. As a result, they’re not actively searching for solutions that improve this element of revenue cycle management.
- **Unattractive economics**: Serving smaller and mid-market clinics with tech that requires EHR integration is challenging because of the large one-time integration cost relative to the annual revenue. This results in long payback periods.
- **Services heavy**: Over the next 5 years, we think medical coding can be close to fully automated in most medical specialities. However, as we’re not certainty how long it will take, the interim solutions require full-time or contracted staff to be in the loop which is expensive and further hurts the economics of the business.
# Part 5. Our key learnings

1. **Solve a top 3 problem:** In a B2B context, a problem that’s not within the top 3 priorities for a buyer won’t get prioritized and solved. We asked customers to stack rank the problems they’re facing using this question, “Given you have 50 things to work on, is this problem top 5, bottom 5, or somewhere in the middle and why?”
2. **Relative product improvement matters**: The goal should be to design a way of completing an existing customer ‘job’ that is, along some axis, dramatically better. Incremental solutions don’t generate the support and energy required to get a new startup off the ground.
3. **Understand macro and micro**: In complex, heavily regulated environments it’s worth investing the time to understand and eventually become an expert in the broader industry. The macro industry context informs the day-to-day decisions related to customer, product and strategy.
4. **Talk to experts**: The quickest way to understand the macro context of an industry is to talk to real experts who will have a large set of experiences that can help you quickly understand the history, influential trends, and red herrings in the industry. Founders and ex-founders are particularly excellent source of insight.
5. **Model unit economics**: The exercise of creating a simple financial model early on in the discovery process sparks questions and conversations that are incredibly valuable. The model itself is almost certainly wrong, but accuracy is not the point anyways.