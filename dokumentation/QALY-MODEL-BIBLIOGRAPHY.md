# QALY Model Bibliography & Statistical Sources

This document provides the research literature and statistical sources underpinning the
Drone AED Coverage Calculator's epidemiological model.

**Last Updated:** January 2026
**Model Version:** 2.0 (Literature-Grounded)

---

## Core Survival Model

### Larsen Multiparameter Survival Model (1993)

The model uses the Larsen et al. multiparameter survival equation for predicting
out-of-hospital cardiac arrest (OHCA) survival:

```
Survival = 67% - 2.3%×(min to CPR) - 1.1%×(min to defib) - 2.1%×(min to ACLS)
```

**Primary Source:**
- Larsen MP, Eisenberg MS, Cummins RO, Hallstrom AP. "Predicting survival from
  out-of-hospital cardiac arrest: a graphic model." *Annals of Emergency Medicine*.
  1993;22(11):1652-1658.
  PMID: [8214853](https://pubmed.ncbi.nlm.nih.gov/8214853/)
  DOI: [10.1016/S0196-0644(05)81302-2](https://doi.org/10.1016/S0196-0644(05)81302-2)

  **Study details:** Analyzed 1,667 cardiac arrest patients in King County, Washington
  with ventricular fibrillation who arrested before EMS arrival. Developed predictive
  model based on time intervals to CPR, defibrillation, and ACLS.

**Validation:**
- Valenzuela TD, et al. "Estimating effectiveness of cardiac arrest interventions:
  a logistic regression survival model." *Circulation*. 1997;96(10):3308-3313.
  DOI: [10.1161/01.cir.96.10.3308](https://doi.org/10.1161/01.cir.96.10.3308)

---

## OHCA Epidemiology

### Incidence Rates

**Model Parameter:** 100 per 100,000 annual incidence (0.1%)

**Sources:**
- Tsao CW, et al. "Heart Disease and Stroke Statistics—2024 Update: A Report From
  the American Heart Association." *Circulation*. 2024;149(8):e347-e913.
  PMID: [38264914](https://pubmed.ncbi.nlm.nih.gov/38264914/)
  DOI: [10.1161/CIR.0000000000001209](https://doi.org/10.1161/CIR.0000000000001209)

- "Heart Disease and Stroke Statistics—2025 Update." *Circulation*. 2025.
  PMID: [39866113](https://pubmed.ncbi.nlm.nih.gov/39866113/)
  DOI: [10.1161/CIR.0000000000001303](https://doi.org/10.1161/CIR.0000000000001303)

  **Data point:** Estimated 263,711 EMS-treated, non-traumatic OHCA cases in US (2024),
  based on CARES registry extrapolation to full US population.

### Shockable Rhythm Percentage

**Model Parameter:** 23% of OHCA present with shockable rhythm (VF/pVT)

**Source:**
- CARES (Cardiac Arrest Registry to Enhance Survival) Annual Reports, 2022-2024.
  https://mycares.net/sitepages/reports.jsp

  **Data point:** Ohio CARES implementation reported 18.0-18.3% initial shockable rhythm.
  National data ranges 18-24% depending on region.

### Witnessed Percentage

**Model Parameter:** 38% of OHCA are witnessed

**Source:**
- CARES Registry 2024 data: Bystander CPR was initiated in 41.7% of OHCA cases,
  including 50.1% of witnessed cases, implying ~38-40% witnessed rate.

---

## EMS Response Times

### Primary Source

**Mell HK, et al. "Emergency Medical Services Response Times in Rural, Suburban,
and Urban Areas."** *JAMA Surgery*. 2017;152(10):983-984.
PMID: [28724118](https://pubmed.ncbi.nlm.nih.gov/28724118/)
DOI: [10.1001/jamasurg.2017.2230](https://doi.org/10.1001/jamasurg.2017.2230)

**Study details:** Analyzed 1,275,529 EMS encounters from 485 agencies across US (2015 data).

**Key findings:**
| Setting | Median Response Time |
|---------|---------------------|
| Urban (>50,000 pop) | 6 minutes |
| Suburban (2,500-50,000) | 6 minutes |
| Rural (<2,500) | 13 minutes |

### Model Parameters (Adjusted for cardiac arrest priority calls)

Based on Mell et al. and regional studies:
- Urban: 7.8 minutes median (priority calls slightly faster than average)
- Suburban: 9.5 minutes median
- Rural: 13.4 minutes median

### Manatee County, Florida Specific Data

- Average EMS response: 8+ minutes countywide
- Rural areas (Lake Manatee): ~11 minutes
- Source: [Manatee County EMS](https://www.mymanatee.org/departments/public_safety/emergency_medical_services___e_m_s_)

---

## Drone AED Delivery: ArcherFRS / Manatee County Program

### Program Overview

**Tampa General Hospital, Manatee County and ArcherFRS** launched the first-in-the-nation
911-integrated drone AED delivery program in May 2024.

**Sources:**
- Tampa General Hospital Press Release, April 2024.
  https://www.tgh.org/news/tgh-press-releases/2024/april/tgh-manatee-county-archerfrs-introduce-first-drone-delivery-emergency-response-equipment

- Manatee County EMS Division.
  https://www.mymanatee.org/connect/news-and-information/news-and-information/article-detail/emergency-medical-services-ems-and-ambulance-division-posts/2024/12/19/new-life-saving-drone-technology

### Drone Specifications: Freefly AltaX

| Specification | Value |
|--------------|-------|
| Maximum Speed | 95+ km/h (60+ mph) |
| Maximum Payload | 15 kg (33 lb) |
| Operating Temp | -20°C to +50°C |
| Flight Testing | 500+ hours, 10,000+ miles BVLOS |
| Safety | ASTM-certified parachute recovery |

**Source:** [Freefly Systems Alta X Specifications](https://freeflysystems.com/alta-x/specs)

### Delivery Performance

| Metric | Value |
|--------|-------|
| Delivery time | 1:45 to 2:10 (target) |
| Average arrival | Under 3 minutes |
| Phase 1 coverage | 3.5 square miles |
| Phase 2 coverage | 35 square miles |
| Operating hours | 6 AM - 10 PM, 7 days/week |

### Calculated Time Advantage (Model Parameters)

Based on Manatee County EMS response times vs drone delivery:

| Setting | EMS Response | Drone Delivery | Time Advantage |
|---------|-------------|----------------|----------------|
| Urban/Suburban | 8 min | 2 min | **6 minutes** |
| Rural | 11+ min | 2-3 min | **8-9 minutes** |

**Model uses conservative estimates:**
- Urban: 2.5 minutes advantage (accounts for variability)
- Suburban: 4 minutes advantage
- Rural: 8 minutes advantage

---

## International Drone AED Research

### Sweden Studies

**Schierbeck S, et al.** "Drone delivery of automated external defibrillators compared
with ambulance arrival in real-life suspected out-of-hospital cardiac arrests:
a prospective observational study in Sweden." *Lancet Digital Health*. 2023;5(12):e862-e871.
PMID: [38000871](https://pubmed.ncbi.nlm.nih.gov/38000871/)
DOI: [10.1016/S2589-7500(23)00161-9](https://doi.org/10.1016/S2589-7500(23)00161-9)

**Key findings:**
- 5 AED-equipped drones covering ~200,000 inhabitants
- 72 deployments during study period (April 2021 - May 2022)
- AED successfully delivered in 58 cases (81%)
- **Drone arrived before ambulance in 67% of cases** (37/55 with both times available)
- Median time benefit: **3 minutes 14 seconds**
- 2 patients defibrillated by drone-delivered AED before ambulance arrival
- 1 achieved 30-day survival

**Earlier publication:**
- Schierbeck S, et al. "Automated external defibrillators delivered by drones to patients
  with suspected out-of-hospital cardiac arrest." *Eur Heart J*. 2022;43:1478–1487.

- Schierbeck S, et al. "Use of a drone-delivered Automated External Defibrillator in an
  out-of-hospital cardiac arrest." *N Engl J Med*. 2022;386(20):1953–4.

### Canada Study

**Cheskes S, et al.** "Improving access to automated external defibrillators in rural
and remote settings: A drone delivery feasibility study." *J Am Heart Assoc*.
2020;9(14):e016687.

---

## Bystander CPR Rates

### US National Average

**Model Parameter:** 40% baseline bystander CPR rate

**Source:**
- CARES Registry 2024: Bystander CPR initiated in 41.7% of OHCA cases.
- CARES Registry 2022: 40.0% bystander CPR rate (147,736 cases).

### Regional Variation

| State | Bystander CPR Rate |
|-------|-------------------|
| Alaska | 79.7% |
| Nevada | 57.5% |
| Oregon | 54.6% |
| Washington | 53.6% |
| National Average | 41.7% |

**Source:** CARES 2024 data via [SCA Foundation](https://www.sca-aware.org/about-sudden-cardiac-arrest/latest-statistics)

### Seattle/King County Benchmark

**Model Parameter:** 73% bystander CPR rate (Seattle benchmark)

Seattle's comprehensive public access defibrillation and CPR training programs
have achieved consistently high bystander intervention rates.

---

## Community First Responder Apps (Naybor SOS Model Basis)

### GoodSAM App Studies

**Smith CM, et al.** "The effect of the GoodSAM volunteer first-responder app on survival
to hospital discharge following out-of-hospital cardiac arrest."
*European Heart Journal: Acute Cardiovascular Care*. 2022;11(1):20-31.
PMID: [35024801](https://pubmed.ncbi.nlm.nih.gov/35024801/)
PMC: [PMC8757292](https://pmc.ncbi.nlm.nih.gov/articles/PMC8757292/)

**Key findings:**
- **Adjusted OR for survival: 3.15** (95% CI: 1.19-8.36, P = 0.021) in London
- **Adjusted OR for survival: 3.19** (95% CI: 1.17-8.73, P = 0.024) in East Midlands
- When responder accepted alert and arrived

### Australian Study (2025)

**Delardes B, et al.** "Smartphone‐activated volunteer responders and survival to
discharge after out‐of‐hospital cardiac arrests in Victoria, 2018–23."
*Medical Journal of Australia*. 2025.
DOI: [10.5694/mja2.52673](https://doi.org/10.5694/mja2.52673)

**Key findings:**
- 9,196 OHCA cases eligible for SAVR activation
- When SAVRs arrived before EMS:
  - **7.6x higher odds of bystander CPR**
  - **16x higher odds of bystander defibrillation**
  - **37% higher odds of survival to discharge** (adjusted)

### Meta-Analysis

Recent meta-analysis (1 RCT + 8 observational studies):
- SAVR activation associated with **OR 1.45** for survival at hospital discharge
  (95% CI: 1.21–1.74)

---

## QALY Valuation

### QALYs per Survivor

**Model Parameter:** 10.8 QALYs per survivor (15 years × 0.72 utility)

### Health Utility Scores

**Nichol G, et al.** "What is the quality of life for survivors of cardiac arrest?
A prospective study." *Academic Emergency Medicine*. 1999;6(2):95-102.
PMID: [10051899](https://pubmed.ncbi.nlm.nih.gov/10051899/)

- Mean health utility: **0.72 (± 0.22)** using Health Utilities Index Mark 3
- Women: 0.87, Men: 0.74

**Graf J, et al.** "Quality of life in the five years after intensive care."
*Critical Care Medicine*. 2003.
PMC: [PMC2875518](https://pmc.ncbi.nlm.nih.gov/articles/PMC2875518/)

- Mean health status index of 5-year survivors: **0.77** (95% CI: 0.70-0.85)

### Life Expectancy Post-Arrest

**Model Parameter:** 15 years average remaining life expectancy

**Source:**
- Moulaert VRM, et al. Critical Care. 2008.
  PMC: [PMC2575575](https://pmc.ncbi.nlm.nih.gov/articles/PMC2575575/)

  - Simulation: Average 21 years per survivor (95% CI: 19-24 years)
  - 110/354 patients (31%) alive at 5 years post-discharge

**Model uses conservative 15-year estimate** accounting for older average age of OHCA patients.

### Cost per QALY

- Total costs per QALY gained: €14,487 (5-year survivors)
- Well within accepted cost-effectiveness thresholds ($50,000-$150,000/QALY in US)

---

## Weather/Operational Constraints

### Drone Operational Availability

**Model Parameter:** 78% weather availability

Based on analysis of:
- Florida weather patterns (thunderstorms, high winds)
- FAA Part 107 operational limitations
- ArcherFRS operational hours (6 AM - 10 PM)

**Supporting research:**
- Homier V, et al. "A cost-effectiveness analysis of drone-delivered automated external
  defibrillators in British Columbia." *Resuscitation*. 2022;172:101-107.
  - Estimates 75-80% operational availability

---

## Florida-Specific Data

### Population

**Model Parameter:** 23,372,215 (July 1, 2024 estimate)

**Source:**
- US Census Bureau. "State Population Totals: 2020-2024." December 2024.
  https://www.census.gov/quickfacts/fact/table/FL/PST045224

- Florida Office of Economic & Demographic Research.
  https://edr.state.fl.us/content/population-demographics/data/2024_Pop_Estimates.pdf

**Key facts:**
- 3rd most populous state (behind Texas, California)
- Added 467,347 residents in 2024
- 411,322 from international migration

### Population Density Distribution

**Model Parameters:**

| Tier | Population | Area (km²) | Density |
|------|-----------|------------|---------|
| High density | 13,600,000 | 16,000 | 850/km² |
| Medium density | 6,500,000 | 38,000 | 171/km² |
| Low density | 3,272,215 | 116,312 | 28/km² |

Based on Census Bureau county-level data and Florida Geographic Data Library.

---

## Model Limitations & Assumptions

### Key Assumptions

1. **Shockable rhythm required:** Only OHCAs with shockable rhythm benefit from AED

2. **Witnessed events only:** Unwitnessed arrests unlikely to benefit from faster
   defibrillation due to prolonged no-flow time

3. **Linear decay:** Larsen model assumes linear survival decay

4. **Weather independence:** Cardiac arrests assumed uniformly distributed across
   weather conditions

5. **Perfect AED use:** Assumes bystander will correctly use drone-delivered AED

### Known Limitations

1. **No neurological outcome modeling:** Does not differentiate by CPC score

2. **Single intervention timing:** Uses average times; actual variation affects outcomes

3. **Urban homogeneity:** "Urban" tier combines varying densities

4. **Static population:** Does not account for Florida seasonal population changes

---

## Additional Reading

### Systematic Reviews

- Bækgaard JS, et al. "The effects of drone-delivered automated external
  defibrillators—A systematic review." *Resuscitation*. 2022;170:275-284.

- Mackle C, et al. "A Systematic Review of Drones for AED Delivery."
  *Int J Environ Res Public Health*. 2020;17(23):8832.

### Economic Analyses

- Saner H, et al. "Drones for Out-of-Hospital Cardiac Arrest: Review of
  Effectiveness and Cost-Effectiveness." *Front Cardiovasc Med*. 2022;9:912605.

---

## Citation

If using this model or bibliography, please cite:

> Lifesaver Labs PBC. "Drone AED Coverage Calculator: QALY Model Bibliography
> & Statistical Sources." Version 2.0. January 2026.
> https://lifesaverlabs.org/drone-coverage-calculator

---

## Contact

For questions about the model methodology or data sources:
- Lifesaver Labs PBC: https://lifesaverlabs.org
- Model source code: Open source at project repository
