# EU Fintech Regulations — Reference Knowledge Base

> Last updated: 2026-05-04 (verification pass completed same day — 43 of 47 original markers resolved)
> Sources: EUR-Lex, European Commission (finance.ec.europa.eu, digital-strategy.ec.europa.eu), EBA, ESMA, EIOPA, EDPB, AMLA, Council of the EU, European Parliament; secondary cite mirrors (lewik, lexparency, better-regulation, AI Act Service Desk, KPMG/DLA Piper analyses) used where EUR-Lex consolidated-text endpoints returned empty bodies.
> Purpose: Reference data for Regulus compliance reports. Every fact below is sourced. Items marked `[NEEDS VERIFICATION]` were not confirmed against an official source within this build and must be checked before use in client-facing output.

## Table of contents

1. GDPR — Regulation (EU) 2016/679
2. AML Package — 5AMLD, 6AMLD, AMLR, AMLD6 (2024), AMLA Regulation, Travel Rule
3. PSD2 / PSD3 / PSR — Directive (EU) 2015/2366 and 2023 proposals
4. MiCA — Regulation (EU) 2023/1114
5. DORA — Regulation (EU) 2022/2554 + Directive (EU) 2022/2556
6. EU AI Act — Regulation (EU) 2024/1689
7. Applicability matrix by Regulus business type

---

## 1. GDPR

### 1.1 Identity & status
- Full title: Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- CELEX: 32016R0679 [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Entry into force: 24 May 2016 [source: https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en]
- Date of application: 25 May 2018 [source: https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en]
- 2025 GDPR Procedural Regulation agreed to streamline cross-border enforcement, without changing substantive rights or obligations [source: https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en]

### 1.2 Scope
- Applies to processing of personal data of data subjects in the Union by a controller or processor established in the Union, regardless of whether the processing takes place in the Union (Art. 3(1)) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Applies to controllers/processors not established in the Union where processing relates to offering goods/services to data subjects in the Union or monitoring their behaviour (Art. 3(2)) — extra-territorial reach relevant for non-EU fintechs serving EU customers [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]

### 1.3 Key obligations (fintech focus)
- Art. 6 — lawful basis required for any processing (consent, contract, legal obligation, vital interests, public task, legitimate interests) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 9 — special categories (incl. biometric data used for unique identification, health data) prohibited unless one of the Art. 9(2) conditions is met; relevant to KYC face-match/biometric onboarding [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 22 — right not to be subject to a decision based solely on automated processing, including profiling, that produces legal effects or similarly significantly affects the data subject; directly relevant to automated credit scoring and AI lending decisions [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 30 — records of processing activities (ROPA) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 32 — security of processing (appropriate technical and organisational measures, encryption, integrity, availability, resilience) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 33 — notification of personal data breach to supervisory authority within 72 hours of awareness [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 34 — communication of breach to data subjects without undue delay where high risk [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 35 — Data Protection Impact Assessment (DPIA) required for high-risk processing (incl. systematic, extensive automated decision-making and large-scale special-category processing) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Art. 37 — appointment of a Data Protection Officer (DPO) where core activities consist of regular and systematic monitoring on a large scale, or large-scale processing of special categories [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Arts. 44–49 — international transfers; lawful only via adequacy decision (Art. 45), Standard Contractual Clauses or BCRs (Art. 46), or derogations (Art. 49). Post-Schrems II, transfer impact assessments are required [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]

### 1.4 Thresholds & amounts
- Breach notification: 72 hours to supervisory authority (Art. 33) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- DPO mandatory thresholds: "core activities" + "large scale" + "regular and systematic monitoring" or special categories (Art. 37) — no fixed numerical threshold [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]

### 1.5 Supervision & reporting
- National Data Protection Authorities (DPAs) supervise; one-stop-shop for cross-border processing via the lead supervisory authority [source: https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en]
- European Data Protection Board (EDPB) ensures consistent application across the EU [source: https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en]

### 1.6 Penalties (Art. 83)
- Tier 1 — up to €10,000,000 or 2% of total worldwide annual turnover (whichever higher) for infringements of Arts. 8, 11, 25–39, 42–43 [source: https://gdpr-info.eu/art-83-gdpr/]
- Tier 2 — up to €20,000,000 or 4% of total worldwide annual turnover (whichever higher) for infringements of Arts. 5–7, 9, 12–22, 44–49, and non-compliance with supervisory authority orders [source: https://gdpr-info.eu/art-83-gdpr/]

### 1.7 Country implementation notes
- Germany: federal BfDI ("Die Bundesbeauftragte für den Datenschutz und die Informationsfreiheit") plus Länder DPAs; BDSG supplements GDPR [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- France: CNIL ("Commission Nationale de l'Informatique et des Libertés") is the supervisory authority; Loi Informatique et Libertés as amended [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- Ireland: Data Protection Commission (DPC) — lead authority for many US tech and fintech firms with EU HQ in Ireland [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- Netherlands: Autoriteit Persoonsgegevens (AP) [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- Estonia: Andmekaitse Inspektsioon (Estonian Data Protection Inspectorate) [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- Lithuania: Valstybinė duomenų apsaugos inspekcija (State Data Protection Inspectorate) [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- Malta: Office of the Information and Data Protection Commissioner (IDPC) [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- Luxembourg: Commission Nationale pour la Protection des Données (CNPD) [source: https://www.edpb.europa.eu/about-edpb/who-we-are/members_en]
- Exact national implementing-law section numbers (e.g. specific BDSG paragraphs) are not enumerated here; consult the relevant national statute for client-specific cites [NEEDS VERIFICATION — national-law section numbers]

### 1.8 Common founder pitfalls
- Treating "legitimate interests" as a fallback without documenting a balancing test — Art. 6(1)(f) requires LIA [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Relying on consent for credit decisioning — consent must be freely given, which is rarely the case where service is conditional on processing (Art. 7(4)) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Missing the 72-hour breach clock — starts at awareness of the breach, not at full forensic confirmation (Art. 33) [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]
- Cross-border SaaS transfers without TIA (Schrems II) — using SCCs alone is insufficient where local laws (e.g. US FISA 702) undermine essential equivalence [source: https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en]

### 1.9 Sources
- https://eur-lex.europa.eu/eli/reg/2016/679/oj
- https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en
- https://gdpr-info.eu/art-83-gdpr/ (mirror of OJ text — used solely to extract Art. 83 figures)

---

## 2. AML Package (5AMLD, 6AMLD, 2024 Package, Travel Rule)

### 2.1 Identity & status
- 5AMLD — Directive (EU) 2018/843 amending Directive (EU) 2015/849 [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- 6AMLD (criminalisation) — Directive (EU) 2018/1673 [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- AMLR — Regulation (EU) 2024/1624 (single rulebook for the private sector); CELEX 32024R1624 [source: https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng]
- AMLD6 — Directive (EU) 2024/1640 (national supervisors and FIUs) [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- AMLA Regulation — Regulation (EU) 2024/1620 establishing the Anti-Money Laundering Authority [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Travel Rule (TFR) — Regulation (EU) 2023/1113 on information accompanying transfers of funds and certain crypto-assets, applicable from 30 December 2024 [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- AMLR application date: 10 July 2027 (some entities phased to 10 July 2029) [source: https://eur-lex.europa.eu/EN/legal-content/summary/preventing-abuse-of-the-financial-system-for-money-laundering-and-terrorism-purposes-from-2027.html]
- AMLD6 transposition deadline: 10 July 2027 [source: https://eur-lex.europa.eu/EN/legal-content/summary/preventing-abuse-of-the-financial-system-for-money-laundering-and-terrorism-purposes-from-2027-member-states-mechanisms.html]

### 2.2 Scope
- Obliged entities include credit institutions, financial institutions, payment institutions, EMIs, crypto-asset service providers (CASPs), auditors, notaries, real-estate agents, gambling operators, and crowdfunding service providers [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- CASPs explicitly designated as obliged entities under AMLR — same CDD and reporting standards as banks [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]

### 2.3 Key obligations
- Customer Due Diligence (CDD): identification, verification, beneficial owner identification, ongoing monitoring [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Enhanced Due Diligence for high-risk relationships, PEPs, and high-risk third countries [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Beneficial ownership registers maintained by Member States; access subject to legitimate-interest test post-CJEU C-37/20 [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Suspicious Transaction Reports (STR) to the national FIU [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Travel Rule: CASPs must collect and transmit originator and beneficiary information for every crypto-asset transfer, with no de minimis threshold [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]

### 2.4 Thresholds & amounts
- EU-wide cash payment limit: €10,000 (under AMLR) [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Occasional transactions trigger CDD at €10,000 (general) [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Wire transfers: CDD trigger €1,000 (Funds Transfer Regulation) [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- CASP occasional transactions: €1,000 trigger for CDD under AMLR [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Travel Rule: applies to all crypto-asset transfers (no minimum) [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]

### 2.5 Supervision & reporting
- AMLA — seat in Frankfurt am Main, Germany [source: https://www.consilium.europa.eu/en/press/press-releases/2024/02/22/frankfurt-to-host-the-eus-new-anti-money-laundering-authority-amla/]
- AMLA direct supervision: up to 40 selected obliged entities (financial sector, including high-risk CASPs) operating in at least 6 Member States, selected in 2027, supervised from 2028 [source: https://www.amla.europa.eu/amla-takes-major-step-toward-harmonised-eu-supervision_en]
- Indirect supervision of all other obliged entities continues via national competent authorities and FIUs [source: https://www.amla.europa.eu/about-amla_en]

### 2.6 Penalties
- Maximum administrative pecuniary sanctions for serious, repeated or systematic breaches under AMLR: at least €10,000,000 or 10% of total annual turnover for legal persons (raised from the 5AMLD baseline of €5M / 5%) [source: https://www.dlapiper.com/en/insights/publications/2024/12/the-new-anti-money-laundering-rules-what-you-need-to-know]
- Criminal penalties for ML offences: maximum term of imprisonment of "at least four years" for the offences referred to in Art. 3(1) and (5) of Directive (EU) 2018/1673 (Art. 5) [source: https://eur-lex.europa.eu/eli/dir/2018/1673/oj/eng]

### 2.7 Country implementation notes
- Germany — BaFin supervises AML for credit/financial institutions; the FIU (Zentralstelle für Finanztransaktionsuntersuchungen) sits at the General Customs Directorate (Generalzolldirektion) [source: https://www.bafin.de/EN/Aufsicht/ZahlungsdienstePSD2/ZulassungsverfahrenundLaufendeAufsicht/ZulassungsverfahrenundLaufendeAufsicht_node_en.html]
- France — ACPR (banking/payments) and AMF (markets) share AML supervision; TRACFIN is the FIU [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Netherlands — DNB (prudential) and AFM (conduct) supervise; FIU-Nederland is the financial intelligence unit [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Ireland — Central Bank of Ireland; FIU Ireland sits within An Garda Síochána [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Estonia — under the Crypto-Assets Market Act (KrüTS, in force 1 July 2024) Finantsinspektsioon (Estonian FSA) replaced the Financial Intelligence Unit as licensing authority for CASPs; historically Estonia's FIU-led VASP regime was among the strictest in the EU [source: https://www.fi.ee/en/investeerimine/investeerimisvaldkonna-tegevuslubade-taotlemine/kruptovaraturu-tegevusluba]
- Lithuania — Bank of Lithuania supervises payment/EMI/CASP entities; FCIS (Finansinių nusikaltimų tyrimo tarnyba) is the FIU; popular hub for EMI passporting [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Malta — MFSA supervises financial institutions and CASPs; FIAU (Financial Intelligence Analysis Unit) is the FIU and AML supervisor working alongside MFSA [source: https://fiaumalta.org/app/uploads/2025/02/The-AMLCFT-Regulation-AMLR.pdf]
- Luxembourg — CSSF supervises AML for the financial sector; CRF (Cellule de Renseignement Financier) is the FIU [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]

### 2.8 Common founder pitfalls
- Assuming Travel Rule has a de minimis — there is no minimum for crypto-asset transfers under TFR [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Treating MiCA authorisation as AML authorisation — they are separate regimes; CASPs are obliged entities under AMLR independently of MiCA [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Underestimating the 2027 cliff — AMLR applies directly (no national transposition) on 10 July 2027 [source: https://eur-lex.europa.eu/EN/legal-content/summary/preventing-abuse-of-the-financial-system-for-money-laundering-and-terrorism-purposes-from-2027.html]
- Misreading the cash limit — €10,000 is an EU-wide ceiling; Member States may set lower national limits [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]

### 2.9 Sources
- https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng
- https://eur-lex.europa.eu/EN/legal-content/summary/preventing-abuse-of-the-financial-system-for-money-laundering-and-terrorism-purposes-from-2027.html
- https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en
- https://www.amla.europa.eu/about-amla_en
- https://www.amla.europa.eu/amla-takes-major-step-toward-harmonised-eu-supervision_en
- https://www.consilium.europa.eu/en/press/press-releases/2024/02/22/frankfurt-to-host-the-eus-new-anti-money-laundering-authority-amla/
- https://www.consilium.europa.eu/en/press/press-releases/2024/05/30/anti-money-laundering-council-adopts-package-of-rules/

---

## 3. PSD2 / PSD3 / PSR

### 3.1 Identity & status
- PSD2 — Directive (EU) 2015/2366 of the European Parliament and of the Council of 25 November 2015 on payment services in the internal market [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/payment-services-directive_en]
- PSD2 transposition / application date: 13 January 2018 [source: https://www.europarl.europa.eu/legislative-train/theme-an-economy-that-works-for-people/file-revision-of-eu-rules-on-payment-services]
- Commission Delegated Regulation (EU) 2018/389 — RTS on SCA and CSC [source: https://eur-lex.europa.eu/eli/reg_del/2018/389/oj]
- PSD3 / PSR proposals: COM(2023) 367 (PSD3 directive) and COM(2023) 366 (PSR regulation) published 28 June 2023 [source: https://www.europarl.europa.eu/legislative-train/theme-an-economy-that-works-for-people/file-revision-of-eu-rules-on-payment-services]
- Provisional political agreement on PSR/PSD3 reached by Parliament and Council on 27 November 2025; formal adoption pending [source: https://www.europarl.europa.eu/news/en/press-room/20251121IPR31540/payment-services-deal-more-protection-from-online-fraud-and-hidden-fees]

### 3.2 Scope
- Payment services listed in Annex I PSD2: account services, execution of payment transactions, card-issuing, acquiring, money remittance, payment initiation services (PIS), account information services (AIS) [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/payment-services-directive_en]
- Applies to payment institutions (PIs), electronic money institutions (EMIs), credit institutions, third-party providers (TPPs) under open banking [source: https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money]

### 3.3 Key obligations
- Strong Customer Authentication (Art. 97) — required for electronic remote payments and access to payment accounts; two of three independent factors (knowledge, possession, inherence) [source: https://eur-lex.europa.eu/eli/reg_del/2018/389/oj]
- Open banking access — Account Servicing PSPs must allow Payment Initiation Service access (Art. 66) and Account Information Service access (Art. 67), with explicit PSU consent and non-discriminatory treatment vs. direct PSU requests [source: https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202006_psd2_afterpublicconsultation_en.pdf]
- Safeguarding of user funds (Art. 10) — segregation in a separate account at a credit institution / investment in secure low-risk assets, or coverage by insurance policy or comparable guarantee from an authorised insurer or credit institution [source: https://service.betterregulation.com/document/208751]
- Authorisation regime for PIs and EMIs (Title II) including initial capital, governance, and outsourcing requirements [source: https://www.eba.europa.eu/eba-publishes-final-guidelines-on-authorisation-and-registration-under-psd2]
- Incident reporting (Art. 96) — payment service providers must, "without undue delay", notify the home Member State competent authority of any major operational or security incident; the NCA forwards relevant details to EBA and ECB [source: https://service.betterregulation.com/document/208855]
- Liability cap on unauthorised transactions arising from a lost / stolen / misappropriated payment instrument: maximum €50 for the payer (Art. 74), subject to fraud / gross-negligence carve-outs [source: https://service.betterregulation.com/document/208827]

### 3.4 Thresholds & amounts (SCA exemptions, RTS 2018/389)
- Contactless: single transaction up to €50; cumulative cap €150 or 5 consecutive transactions before SCA required (Art. 11) [source: https://eur-lex.europa.eu/eli/reg_del/2018/389/oj]
- Unattended terminals (transport / parking): €50 per transaction (Art. 12) [source: https://eur-lex.europa.eu/eli/reg_del/2018/389/oj]
- Low-value remote: single payment up to €30; cumulative €100 or 5 consecutive transactions (Art. 16) [source: https://eur-lex.europa.eu/eli/reg_del/2018/389/oj]
- Trusted beneficiaries (Art. 13) and recurring transactions (Art. 14) — exempt after first SCA [source: https://eur-lex.europa.eu/eli/reg_del/2018/389/oj]
- Initial capital for PIs (PSD2 Art. 7): €20,000 (money remittance only); €50,000 (PIS only); €125,000 (other payment services listed in Annex I points 1–5) [source: https://www.lewik.org/term/16177/initial-capital-article-7-psd2/]
- Initial capital for EMIs (Directive 2009/110/EC Art. 4): not less than €350,000 [source: https://eur-lex.europa.eu/eli/dir/2009/110/oj/eng]

### 3.5 Supervision & reporting
- National Competent Authority (NCA) supervises PIs/EMIs; EBA maintains the EU-wide register of authorised payment and e-money institutions [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
- EBA-ECB Joint Report on Payment Fraud (December 2025) — strong authentication remains effective but fraud is adapting [source: https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money]

### 3.6 Penalties
- Penalties set by Member States; PSD2 Art. 103 requires Member States to lay down rules on penalties for infringements of the national transposing law and ensure they are "effective, proportionate and dissuasive" [source: https://lexparency.org/eu/32015L2366/ART_103/]

### 3.7 Country implementation notes
- Germany — BaFin authorises PIs/EMIs under the ZAG (Zahlungsdiensteaufsichtsgesetz) [source: https://www.bafin.de/EN/Aufsicht/ZahlungsdienstePSD2/ZulassungsverfahrenundLaufendeAufsicht/ZulassungsverfahrenundLaufendeAufsicht_node_en.html]
- France — ACPR authorises PIs/EMIs; AMF for related conduct rules [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
- Netherlands — DNB authorises PIs/EMIs (prudential); AFM for conduct supervision [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
- Lithuania — Bank of Lithuania authorises and supervises PIs/EMIs; popular hub for passporting EMIs into the EU [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
- Ireland — Central Bank of Ireland authorises PIs/EMIs [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
- Malta — MFSA authorises PIs/EMIs [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]

### 3.8 Common founder pitfalls
- Assuming AISP is a "light" licence — it requires registration, governance, security, professional indemnity insurance under EBA Guidelines [source: https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money]
- Misapplying SCA exemptions across regulated and unregulated flows; the issuer (not merchant) decides whether to apply an exemption [source: https://eur-lex.europa.eu/eli/reg_del/2018/389/oj]
- Treating PSR/PSD3 timeline as imminent — provisional agreement reached November 2025; application typically 18 months after entry into force, so earliest realistic application date is 2027–2028 [source: https://www.europarl.europa.eu/news/en/press-room/20251121IPR31540/payment-services-deal-more-protection-from-online-fraud-and-hidden-fees]
- Assuming MiCA replaces PSD2 for stablecoin payment flows — EBA Opinion on the interplay between PSD2 and MiCA confirms both regimes can apply simultaneously [source: https://www.eba.europa.eu/sites/default/files/2025-06/e2958c99-a1b0-4b07-9d31-bcba0a28dbe7/Opinion%20on%20the%20interplay%20between%20PSD2%20and%20MiCA.pdf]

### 3.9 Sources
- https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/payment-services-directive_en
- https://eur-lex.europa.eu/eli/reg_del/2018/389/oj
- https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money
- https://www.eba.europa.eu/eba-publishes-final-guidelines-on-authorisation-and-registration-under-psd2
- https://www.europarl.europa.eu/legislative-train/theme-an-economy-that-works-for-people/file-revision-of-eu-rules-on-payment-services
- https://www.europarl.europa.eu/news/en/press-room/20251121IPR31540/payment-services-deal-more-protection-from-online-fraud-and-hidden-fees

---

## 4. MiCA — Regulation (EU) 2023/1114

### 4.1 Identity & status
- Full title: Regulation (EU) 2023/1114 of the European Parliament and of the Council of 31 May 2023 on markets in crypto-assets [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/markets-crypto-assets-regulation_en]
- CELEX: 32023R1114 [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/markets-crypto-assets-regulation_en]
- Application of Titles III (ARTs) and IV (EMTs): 30 June 2024 [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Full application (incl. CASP authorisation, Titles I, II, V–VII): 30 December 2024 [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]

### 4.2 Scope
- Three categories of crypto-assets:
  - Asset-Referenced Tokens (ARTs) — referencing multiple values/rights (Title III)
  - E-Money Tokens (EMTs) — referencing a single official currency (Title IV)
  - Other crypto-assets (Title II) [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Excluded under Art. 2(4): crypto-assets that qualify as financial instruments within MiFID II, deposits, funds (except where they qualify as e-money tokens), securitisation positions, and non-life / life insurance and pension products. Unique and non-fungible NFTs are also outside scope, but bulk-issued or fractionalised NFTs with comparable rights may be in scope under a substance-over-form test [source: https://www.whitecase.com/insight-alert/mica-regulation-new-regulatory-framework-crypto-assets-issuers-and-crypto-asset]

### 4.3 Key obligations
- White paper requirements (Art. 6 for crypto-assets other than ARTs/EMTs; Art. 19 for ARTs; Art. 51 for EMTs) — disclosure document notified to NCA before public offer or trading admission [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- CASP authorisation (Title V) — passport across EU once authorised in home Member State [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Marketing communications must be fair, clear, not misleading and consistent with white paper [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- ART/EMT issuers must hold prudent reserve of assets and grant redemption rights at par [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Market abuse rules (Title VI) — insider dealing, unlawful disclosure, market manipulation prohibited [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/markets-crypto-assets-regulation_en]

### 4.4 Thresholds & amounts (Art. 67 — CASP own-funds)
- Class 1 (e.g. execution of orders, placing, transfer, advice, portfolio management): €50,000 minimum [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Class 2 (custody, exchange of crypto for funds or other crypto): €125,000 minimum [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Class 3 (operation of a trading platform): €150,000 minimum [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Significant ART thresholds (Art. 43(1)) — at least three of the following criteria trigger significance and EBA supervision: number of holders > 10 million; value of token issued / market capitalisation / reserve assets > €5 billion; > 2.5 million transactions per day or > €500 million daily transaction volume on average; international-scale activity / interconnectedness with the financial system [source: https://www.eba.europa.eu/sites/default/files/document_library/Publications/Other%20publications/2023/1062227/EBA%20advice%20on%20MICAR%20CfA%20on%20significance%20criteria%20and%20supervisory%20fees.pdf]
- Significant EMT thresholds (Art. 56) — apply the same Art. 43(1) criteria to e-money tokens [source: https://www.mica.law/what-are-significant-arts-and-emts-under-mica]

### 4.5 Supervision & reporting
- National competent authorities authorise and supervise CASPs and ART issuers; ESMA provides Union-level convergence [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- EBA supervises significant ART/EMT issuers [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/markets-crypto-assets-regulation_en]
- Public registers maintained by ESMA: authorised CASPs, ART/EMT issuers, white papers [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]

### 4.6 Penalties
- MiCA Arts. 111–112 — administrative penalties harmonised across Member States; for the most serious breaches the maximum fine for legal persons reaches €15,000,000 or up to 12.5% of total annual turnover (depending on the provision breached), and at least €5,000,000 for natural persons [source: https://kpmglaw.ie/insight-micar-regime.html] [NEEDS VERIFICATION — per-provision percentage tier in Art. 111(2)]

### 4.7 Country implementation notes — Article 143(3) grandfathering
- Article 143(3) general: providers operating before 30 December 2024 may continue until 1 July 2026 or until grant/refusal of authorisation, whichever is sooner. ESMA Chair Verena Ross urged Member States to limit the optional period to 12 months [source: https://www.esma.europa.eu/sites/default/files/2024-12/ESMA75-453128700-1396_Statement_on_MiCA_transitional_measures.pdf]
- ESMA maintains the official list of grandfathering periods chosen by each Member State [source: https://www.esma.europa.eu/document/list-grandfathering-periods-decided-member-states-under-mica]
- Member State grandfathering periods chosen under Art. 143(3), per the ESMA list:
  - Belgium — TBA
  - Germany — 12 months
  - France — 18 months
  - Netherlands — 6 months
  - Ireland — 12 months
  - Estonia — 18 months
  - Lithuania — 12 months
  - Luxembourg — 18 months
  - Malta — 18 months
  - Spain — 18 months
  - Italy — 18 months (entities in the Italian VASP register or their group must apply for MiCA authorisation by 30 December 2025 to benefit)
  - Portugal — TBA
  - Greece, Croatia, Cyprus, Romania — 18 months
  - Latvia, Hungary, Poland, Slovenia, Finland, Netherlands — 6 months
  - Austria, Slovakia — 12 months
  - Sweden — 9 months
  - Bulgaria, Czechia, Denmark — 18 months (with national application deadlines: Bulgaria — apply by 8 Oct 2025; Czechia — by 31 July 2025; Denmark — by 30 December 2024)
  [source: https://www.esma.europa.eu/sites/default/files/2024-12/List_of_MiCA_grandfathering_periods_art._143_3.pdf]
- National authorities for CASP authorisation (confirmed against national designations / ESMA register coverage):
  - Germany — BaFin (under FinmadiG, end of 2024) [source: https://www.fintecharbor.com/mica-regulation-across-the-eu-country-implementation-overview-2025/]
  - France — AMF (with ACPR for prudential aspects) [source: https://www.amf-france.org/en/news-publications/depth/mica]
  - Netherlands — AFM (conduct) and DNB (prudential) [source: https://www.fintecharbor.com/mica-regulation-across-the-eu-country-implementation-overview-2025/]
  - Ireland — Central Bank of Ireland [source: https://www.algoodbody.com/insights-publications/mica-department-of-finance-decides-on-national-discretions-reducing-the-transitional-period-to-12-months]
  - Estonia — Finantsinspektsioon (Estonian Financial Supervision Authority), under the Crypto-Assets Market Act (KrüTS) in force 1 July 2024 [source: https://www.fi.ee/en/investeerimine/investeerimisvaldkonna-tegevuslubade-taotlemine/kruptovaraturu-tegevusluba]
  - Lithuania — Bank of Lithuania [source: https://www.fintecharbor.com/mica-regulation-across-the-eu-country-implementation-overview-2025/]
  - Malta — MFSA, with comprehensive MiCA Rulebook in effect from March 2025 [source: https://www.fintecharbor.com/mica-regulation-across-the-eu-country-implementation-overview-2025/]
  - Luxembourg — CSSF [source: https://www.fintecharbor.com/mica-regulation-across-the-eu-country-implementation-overview-2025/]

### 4.8 Common founder pitfalls
- Assuming a national VASP registration auto-converts to MiCA CASP authorisation — it does not; full re-application is required, only the timeline benefits from grandfathering [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Misclassifying a stablecoin — single-fiat-pegged tokens are EMTs (Title IV) and require EMI or credit institution authorisation in addition to MiCA, not just CASP licence [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Treating MiCA white paper as marketing collateral — it is a regulated disclosure document with civil liability attached [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]
- Forgetting AML overlay — CASP authorisation does not exempt from AMLR/Travel Rule obligations [source: https://finance.ec.europa.eu/financial-crime/anti-money-laundering-and-countering-financing-terrorism-eu-level_en]
- Underestimating iXBRL reporting obligations effective 23 December 2025 [source: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica]

### 4.9 Sources
- https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/markets-crypto-assets-regulation_en
- https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica
- https://www.esma.europa.eu/sites/default/files/2024-12/ESMA75-453128700-1396_Statement_on_MiCA_transitional_measures.pdf
- https://www.esma.europa.eu/document/list-grandfathering-periods-decided-member-states-under-mica

---

## 5. DORA — Regulation (EU) 2022/2554 + Directive (EU) 2022/2556

### 5.1 Identity & status
- Regulation (EU) 2022/2554 — Digital Operational Resilience Act [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]
- Directive (EU) 2022/2556 — amends sectoral directives to align with DORA [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/digital-operational-resilience-regulation_en]
- Entry into force: 16 January 2023 (DORA was published in the OJ on 27 December 2022) [source: https://www.ey.com/en_gr/technical/tax/tax-alerts/dora-regulation-2022-2554-countdown-to-compliance]
- Application date: 17 January 2025 [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]
- Level 2 RTS on subcontracting (24 March 2025), Joint Examination Teams (16 December 2024), Incident Notifications (23 October 2024) adopted [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/digital-operational-resilience-regulation_en]

### 5.2 Scope
- 20+ categories of "financial entities" in Art. 2: credit institutions, payment institutions, EMIs, investment firms, CASPs, central securities depositories, CCPs, trading venues, trade repositories, AIFMs, UCITS managers, insurance and reinsurance undertakings, intermediaries, IORPs, credit rating agencies, crowdfunding service providers, securitisation repositories, and ICT third-party service providers [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]
- Microenterprises (Commission Recommendation 2003/361/EC: <10 staff and ≤€2M turnover) get a simplified ICT risk framework under Art. 16 [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]

### 5.3 Key obligations
- Chapter II — ICT risk management framework, governance by management body [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]
- Arts. 17–23 — ICT-related incident management, classification, reporting to competent authority [source: https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/operational-resilience/joint-technical-standards-major-incident-reporting]
- Arts. 24–27 — digital operational resilience testing programme, including vulnerability assessments, penetration tests, and Threat-Led Penetration Testing (TLPT) for selected entities at least every 3 years [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]
- Chapter V (Arts. 28–44) — third-party ICT risk: register of information, contractual terms, exit strategies, and Union-level oversight of "critical ICT third-party providers" by lead overseer (ESA) [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]
- Art. 45 — voluntary information and intelligence sharing among financial entities [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]

### 5.4 Thresholds & amounts (RTS on incident classification)
- Major incident classification triggers: a "major" incident is one where "Critical services affected" is met AND either (i) malicious unauthorised access (Data loss criterion) is identified or (ii) materiality thresholds of any other two criteria are met [source: https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/operational-resilience/regulatory-technical-standards-criteria-classification-ict-related-incidents]
- Seven classification criteria: clients/financial counterparts/transactions affected; reputational impact; duration and service downtime; geographical spread; data losses; critical services affected; economic impact [source: https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/operational-resilience/regulatory-technical-standards-criteria-classification-ict-related-incidents]
- Reporting timelines: initial notification — 4 hours after classification as major and 24 hours after detection; intermediate report — 72 hours; final report — 1 month [source: https://www.eba.europa.eu/sites/default/files/2024-01/4f2654f4-3152-48b6-af01-431215400f9f/JC%202023%2083%20-%20Final%20Report%20on%20draft%20RTS%20on%20classification%20of%20major%20incidents%20and%20significant%20cyber%20threats.pdf]
- TLPT cycle: at least every 3 years for in-scope financial entities [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]

### 5.5 Supervision & reporting
- Sectoral NCAs supervise; the three ESAs (EBA, ESMA, EIOPA) coordinate; lead overseer designated for each critical ICT TPP [source: https://www.esma.europa.eu/press-news/esma-news/esas-publish-first-set-rules-under-dora-ict-and-third-party-risk-management]
- Joint Examination Teams (RTS, 16 December 2024) carry out oversight of critical TPPs [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/digital-operational-resilience-regulation_en]

### 5.6 Penalties
- Member States set effective, proportionate, dissuasive penalties under Arts. 50–52; for critical ICT third-party providers, the Lead Overseer may impose periodic penalty payments of up to 1% of the average daily worldwide turnover of the CTPP in the preceding business year, accruing on a daily basis for a maximum of 6 months until compliance is achieved (Art. 35(6)) [source: https://www.digital-operational-resilience-act.com/Article_35.html]

### 5.7 Country implementation notes
- DORA is a directly-applicable Regulation; sectoral NCAs are the same authorities that supervise each financial-entity type domestically:
  - Germany — BaFin (with Deutsche Bundesbank for credit institutions) [source: https://www.bafin.de/EN/Aufsicht/ZahlungsdienstePSD2/ZulassungsverfahrenundLaufendeAufsicht/ZulassungsverfahrenundLaufendeAufsicht_node_en.html]
  - France — ACPR (banking/payments/insurance) and AMF (markets) [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
  - Netherlands — DNB (prudential) and AFM (conduct) [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
  - Ireland — Central Bank of Ireland [source: https://www.eba.europa.eu/risk-and-data-analysis/data/registers/payment-institutions-register]
  - Estonia — Finantsinspektsioon; Lithuania — Bank of Lithuania; Malta — MFSA; Luxembourg — CSSF [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]

### 5.8 Common founder pitfalls
- Assuming microenterprise carve-out applies to all small fintechs — it requires <10 staff AND ≤€2M turnover under Recommendation 2003/361/EC [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]
- Treating cloud SLA as DORA-compliant — DORA mandates specific contractual terms (Art. 30) including audit, sub-outsourcing, exit, security obligations — most off-the-shelf hyperscaler MSAs need addenda [source: https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/digital-operational-resilience-regulation_en]
- Missing the 4-hour clock — initial notification is 4 hours after the entity classifies the incident as major (and 24h after detection) — not 4h after detection [source: https://www.eba.europa.eu/sites/default/files/2024-01/4f2654f4-3152-48b6-af01-431215400f9f/JC%202023%2083%20-%20Final%20Report%20on%20draft%20RTS%20on%20classification%20of%20major%20incidents%20and%20significant%20cyber%20threats.pdf]
- Forgetting the Register of Information — every financial entity must maintain a register of all contractual arrangements with ICT TPPs and report it annually [source: https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html]

### 5.9 Sources
- https://eur-lex.europa.eu/EN/legal-content/summary/digital-operational-resilience-for-the-financial-sector.html
- https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/digital-operational-resilience-regulation_en
- https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/operational-resilience/regulatory-technical-standards-criteria-classification-ict-related-incidents
- https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/operational-resilience/joint-technical-standards-major-incident-reporting
- https://www.esma.europa.eu/press-news/esma-news/esas-publish-first-set-rules-under-dora-ict-and-third-party-risk-management

---

## 6. EU AI Act — Regulation (EU) 2024/1689

### 6.1 Identity & status
- Full title: Regulation (EU) 2024/1689 of the European Parliament and of the Council laying down harmonised rules on artificial intelligence [source: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng]
- CELEX: 32024R1689 [source: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng]
- Entry into force: 1 August 2024 [source: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai]
- Phased application:
  - Prohibitions (Art. 5) and AI literacy (Art. 4): 2 February 2025
  - GPAI obligations and governance: 2 August 2025
  - High-risk systems under Annex III: 2 August 2026
  - Full application incl. Annex I high-risk: 2 August 2027
  [source: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai]

### 6.2 Scope
- Applies to providers placing AI systems on the EU market (regardless of establishment), to deployers established or located in the EU, and where output is used in the EU [source: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng]
- Risk tiers: prohibited, high-risk, limited-risk (transparency), minimal-risk; plus a separate regime for General-Purpose AI (GPAI) models [source: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai]

### 6.3 Key obligations (fintech focus)
- Art. 5 — prohibited practices: social scoring by public/private actors, exploitative manipulation, certain biometric categorisation, untargeted facial-recognition database scraping [source: https://artificialintelligenceact.eu/article/99/]
- Annex III high-risk for fintech:
  - Point 5(b): "AI systems intended to be used to evaluate the creditworthiness of natural persons or establish their credit score, with the exception of AI systems used for the purpose of detecting financial fraud" [source: https://artificialintelligenceact.eu/annex/3/]
  - Point 5(c): "AI systems intended to be used for risk assessment and pricing in relation to natural persons in the case of life and health insurance" [source: https://artificialintelligenceact.eu/annex/3/]
  - Fraud detection AI explicitly excluded from high-risk [source: https://artificialintelligenceact.eu/annex/3/]
- Provider obligations (Chapter III): risk management system, data governance, technical documentation, logging, transparency, human oversight, accuracy/robustness/cybersecurity, conformity assessment, CE marking [source: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai]
- Deployer obligations (Art. 26): use system per instructions, ensure human oversight, monitor operation, manage input data, keep logs ≥6 months, inform providers/authorities of risks/incidents, inform natural persons of being subject to the system; for points 5(b) and 5(c) — perform Fundamental Rights Impact Assessment (Art. 27) [source: https://artificialintelligenceact.eu/article/26/]
- Art. 50 — transparency obligations for limited-risk systems (chatbots, synthetic content disclosure) [source: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai]

### 6.4 Thresholds & amounts (Art. 99 penalties)
- Prohibited practices breach: up to €35,000,000 or 7% of total worldwide annual turnover (whichever higher) [source: https://artificialintelligenceact.eu/article/99/]
- Other obligations breach: up to €15,000,000 or 3% of total worldwide annual turnover [source: https://artificialintelligenceact.eu/article/99/]
- Supplying incorrect, incomplete or misleading information to authorities: up to €7,500,000 or 1% of turnover [source: https://artificialintelligenceact.eu/article/99/]
- SMEs and start-ups: lower of the two amounts applies (proportionality) [source: https://artificialintelligenceact.eu/article/99/]

### 6.5 Supervision & reporting
- AI Office (within European Commission) for GPAI; market surveillance authorities at national level for high-risk and other AI; coordination via European Artificial Intelligence Board [source: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai]
- Serious incident reporting by providers to market surveillance authorities (Art. 73) — general timeline: not later than 15 days after awareness; widespread or critical incidents: not later than 2 days; fatal incidents: not later than 10 days; an incomplete initial report is permitted [source: https://artificialintelligenceact.eu/article/73/]

### 6.6 Penalties
- Three-tier fine structure described above (Art. 99). Member States may add criminal sanctions [source: https://artificialintelligenceact.eu/article/99/]

### 6.7 Country implementation notes
- Member States must establish or designate at least one notifying authority and at least one market surveillance authority and make their contact details public by 2 August 2025; biennial reporting on resource adequacy begins on the same date (Art. 70) [source: https://artificialintelligenceact.eu/article/70/]
- National designations under Art. 70 are still in flux; as of the build date many Member States have not yet finalised the designation of a single AI market-surveillance authority. The following reflects current public expectations rather than confirmed designations:
  - Germany — BNetzA expected to take the central market-surveillance role with sectoral input from BaFin for financial-sector AI [NEEDS VERIFICATION — final designation pending]
  - France — CNIL plays a central role for AI involving personal data; designation of an over-arching national AI authority is still pending [NEEDS VERIFICATION — final designation pending]
  - Most other Member States — designation in progress per AI Office tracking; consult the European Commission's AI Act Service Desk for the current state [source: https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26]

### 6.8 Common founder pitfalls
- Assuming a credit-decision model trained pre-2024 is grandfathered — high-risk obligations apply to systems placed on the market or put into service after 2 August 2026 regardless of training date; legacy systems get only narrow grandfathering [source: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai]
- Treating fraud-detection AI as high-risk by default — the Annex III credit-scoring entry explicitly excludes financial-fraud-detection AI; but it can still be high-risk under other Annex III entries (e.g. biometric ID, employment) [source: https://artificialintelligenceact.eu/annex/3/]
- Confusing provider and deployer roles — a deployer becomes a provider under Art. 25 if it (a) puts its name or trademark on a high-risk system already on the market, (b) makes a substantial modification while the system remains high-risk, or (c) modifies the intended purpose of a non-high-risk system (incl. GPAI) so it becomes high-risk [source: https://artificialintelligenceact.eu/article/25/]
- Skipping the FRIA — deployers of credit-scoring or insurance pricing AI must complete a Fundamental Rights Impact Assessment before first use (Art. 27) [source: https://artificialintelligenceact.eu/article/26/]
- Forgetting GDPR overlay — Art. 22 GDPR still applies to automated decisions even where the AI Act says the system is permitted [source: https://eur-lex.europa.eu/eli/reg/2016/679/oj]

### 6.9 Sources
- https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng
- https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- https://artificialintelligenceact.eu/annex/3/ (mirror of OJ Annex III text, used solely for direct quotes)
- https://artificialintelligenceact.eu/article/26/ (mirror of OJ Art. 26)
- https://artificialintelligenceact.eu/article/99/ (mirror of OJ Art. 99)
- https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26
- https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3

---

## 7. Applicability matrix by Regulus business type

| Business type | GDPR | AML | PSD2/3 | MiCA | DORA | AI Act | Why it applies (one-line) |
|---|---|---|---|---|---|---|---|
| **Neobank** | Yes | Yes | Yes | If offers crypto | Yes | If credit scoring AI | Holds funds → PSD2/credit-institution licensing; processes personal data → GDPR; obliged entity → AML; financial entity → DORA. |
| **Embedded Finance** | Yes | Yes | Yes | Conditional | Yes | Conditional | Provides regulated payment/lending rails to non-bank brands; primary licence-holder triggers PSD2/AML; DORA applies to the financial-entity layer. |
| **Open Banking** | Yes | Yes (light) | Yes | No | Yes | Conditional | AISP/PISP licensed under PSD2; processes account-information → GDPR Art. 9 risks; DORA for ICT resilience. |
| **Payments App** | Yes | Yes | Yes | If stablecoin | Yes | Limited | PI/EMI under PSD2/EMD2; SCA + open banking; AML obliged entity; DORA financial entity. |
| **B2B Finance** | Yes | Yes | Often | Conditional | Often | Conditional | Invoice finance, treasury, virtual cards typically operate under PSD2 EMI/PI; AML obliged entity; DORA where licensed. |
| **Payroll & HR** | Yes | Limited | If holding funds | No | Conditional | If using AI for hiring/credit | GDPR-heavy (special categories incl. health, union membership); employment-AI is Annex III high-risk; PSD2 if money is held. |
| **Consumer Lending (BNPL)** | Yes | Yes | If payment account | No | Yes (if licensed credit institution / CCD2 entity) | Yes — credit scoring | GDPR Art. 22 + AI Act Annex III 5(b) for credit decisioning; AML obliged entity; CCD2 layer outside this knowledge base. |
| **PropTech Finance** | Yes | Yes | If payment service | No | If financial entity | Conditional | AML real-estate scope; mortgage brokering / credit decisioning may be high-risk AI. |
| **Wealthtech** | Yes | Yes | If payment service | If crypto | Yes | Conditional | MiFID II/IFR layer outside this scope; DORA covers investment firms; AML obliged entity. |
| **Crypto & DeFi** | Yes | Yes (CASP) | Conditional (EMT) | Yes | Yes (CASP financial entity) | Limited | Direct MiCA scope; CASP is AMLR obliged entity; Travel Rule; DORA covers CASPs. |
| **Insurtech** | Yes (Art. 9 health) | Limited | If payment service | No | Yes (insurance undertakings/intermediaries) | Yes — life/health pricing | Annex III 5(c) high-risk for life/health pricing AI; DORA scope per Art. 2; IDD/Solvency II layer outside this knowledge base. |
| **Regtech** | Yes (processor) | Indirect (provides tooling) | Indirect | Indirect | Often (as ICT TPP) | Conditional (AML AI / KYC biometrics) | Usually a processor under GDPR; may be ICT third-party provider under DORA, with possible "critical TPP" oversight. |

Notes on the matrix:
- "Conditional" means applicability turns on whether the firm holds an EU licence, processes funds, or uses in-scope AI. Use the regulation-specific scope tests above.
- This matrix is non-exhaustive; sector-specific regimes (MiFID II, IDD, Solvency II, CCD2, EMD2, Crowdfunding Regulation) apply on top and are out of scope of this document.

---

## Items marked NEEDS VERIFICATION (residual after May 2026 verification pass)

The 2026-05-04 verification pass resolved the bulk of markers via EDPB, ESMA, EBA, and EUR-Lex equivalents. Residual items where a specific source could not be obtained:

1. GDPR (1.7) — exact section numbers in national implementing statutes (e.g. BDSG paragraphs, French Loi Informatique articles, Irish Data Protection Act 2018 sections). The DPA names themselves are now confirmed against the EDPB members register.
2. MiCA (4.6) — Art. 111(2) per-provision percentage tier (the precise mapping of which breaches attract €15M/12.5% vs €5M/5% caps depends on the article being breached and was not extracted from the consolidated OJ text in this pass).
3. AI Act (6.7) — final per-country market-surveillance authority designations under Art. 70; many Member States had not formally completed designation as of the May 2026 build, so entries for Germany (BNetzA expected), France (CNIL playing a central role), and most others remain prospective rather than confirmed.

EUR-Lex consolidated-text endpoints (`/legal-content/EN/TXT/?uri=CELEX:...` and ELI variants) repeatedly returned empty bodies during this pass; secondary sources (better-regulation.com, lewik.org, lexparency, EBA Single Rulebook, EBA technical advice on MiCAR, ESMA grandfathering PDF, AI Act Service Desk) were used instead. For client-facing output, re-confirm each cite directly against the OJ PDF at the time of delivery.
