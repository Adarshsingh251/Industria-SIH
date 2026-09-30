// INDUSTRIA - Deterministic Industrial Approval Discovery Engine

export const APPROVAL_CATALOG = [
  {
    id: "appr-factory-lic",
    name: "Factory License (Form No. 2)",
    department: "Directorate of Industrial Safety & Health (DISH), Labour Dept.",
    category: "Operational & Safety",
    description: "Statutory license required under the Factories Act, 1948 for industrial manufacturing premises employing 10 or more workers with power or 20 without power.",
    estimatedDuration: "15-21 Working Days",
    validity: "1 to 5 Years (Renewable)",
    feeRange: "₹8,000 - ₹25,000 (Based on HP & Manpower)",
    statutoryActs: "The Factories Act, 1948 & Maharashtra Factories Rules, 1963",
    requiredDocuments: [
      "Certificate of Incorporation & PAN",
      "MIDC Land Allotment / Lease Agreement",
      "Approved Factory Building Layout Plan",
      "List of Machinery with Installed Horsepower (HP)",
      "Employee Roster with ESIC/EPF Registration",
      "Partnership Deed / Memorandum & Articles of Association"
    ],
    stages: ["Online Application", "Document Scrutiny", "Site Safety Inspection", "Factory Inspector Approval", "License Grant"]
  },
  {
    id: "appr-fire-noc",
    name: "Fire Safety Approval & Final NOC",
    department: "Maharashtra Fire Services / MIDC Fire Prevention Wing",
    category: "Life Safety & Building",
    description: "Mandatory Fire Safety Clearance and NOC for industrial premises, factory sheds, hazardous storage, and high-occupancy manufacturing zones.",
    estimatedDuration: "10-15 Working Days",
    validity: "Annual Renewal (Subject to half-yearly audits)",
    feeRange: "₹10,000 - ₹35,000 (Based on Built-up Area)",
    statutoryActs: "Maharashtra Fire Prevention and Life Safety Measures Act, 2006",
    requiredDocuments: [
      "Architectural Site Plan & Fire Evacuation Layout",
      "Fire Hydrant & Sprinkler Ring Blueprint",
      "Fire Fighting Equipment OEM Calibration Certificates",
      "Form A / Form B Certificate from Licensed Fire Agency",
      "Water Storage Capacity Proof for Fire Fighting"
    ],
    stages: ["Provisional NOC Application", "Plan Verification", "Hydrant & Pressure Testing", "CFO Site Inspection", "Final NOC Issuance"]
  },
  {
    id: "appr-mpcb-cto",
    name: "MPCB Consent to Operate (CTO - Air & Water Acts)",
    department: "Maharashtra Pollution Control Board (MPCB)",
    category: "Environmental",
    description: "Mandatory statutory consent required before commencing manufacturing operations to control trade effluents and air emissions under Orange/Red/Green categories.",
    estimatedDuration: "25-30 Working Days",
    validity: "5 Years (Renewable)",
    feeRange: "₹25,000 - ₹1,00,000 (Based on Capital Investment)",
    statutoryActs: "Water (Prevention & Control of Pollution) Act 1974 & Air Act 1981",
    requiredDocuments: [
      "Consent to Establish (CTE) Copy or Prior Approval",
      "Effluent Treatment Plant (ETP/STP) Process Flow Diagram",
      "Air Pollution Control Equipment (Chimney/Scrubber/DG Stack) Specs",
      "CA Certificate of Fixed Capital Investment on Plant & Machinery",
      "Hazardous Waste Generation & Safe Disposal Plan (Form 1)"
    ],
    stages: ["Form I Submission", "Technical Desk Scrutiny", "Sub-Regional Officer Inspection", "Board Committee Review", "Consent Order Grant"]
  },
  {
    id: "appr-dish-plan",
    name: "Factory Building & Machinery Layout Plan Approval",
    department: "Directorate of Industrial Safety & Health (DISH)",
    category: "Structural Safety & Zoning",
    description: "Prior approval of architectural drawings, machinery layout, internal aisle widths, and emergency exits before constructing or altering any factory building.",
    estimatedDuration: "14-20 Working Days",
    validity: "Permanent (Until architectural alteration)",
    feeRange: "₹5,000 - ₹15,000",
    statutoryActs: "Maharashtra Factories Rules, 1963 (Rule 3)",
    requiredDocuments: [
      "Detailed Layout Plan in 1:100 scale showing machinery locations",
      "Structural Stability Certificate signed by Chartered Structural Engineer",
      "Ventilation, Natural Lighting & Exhaust Calculation Sheet",
      "Manufacturing Flow Process and Material Movement Chart"
    ],
    stages: ["Drawing Lodgement", "Safety Officer Scrutiny", "Structural Joint Verification", "Plan Approval & Stamping"]
  },
  {
    id: "appr-msedcl-ht",
    name: "High Tension (HT) Industrial Electricity Sanction & Energization",
    department: "Maharashtra State Electricity Distribution Co. Ltd. (MSEDCL)",
    category: "Utility & Power",
    description: "Power load sanction and substation energization for commercial manufacturing units requiring >= 100 kVA contract demand.",
    estimatedDuration: "20-30 Working Days",
    validity: "Permanent Contract with Monthly Tariff",
    feeRange: "Demand Note based on sanctioned kVA (Security Deposit)",
    statutoryActs: "The Electricity Act, 2003 & Maharashtra Electricity Regulatory Commission (MERC)",
    requiredDocuments: [
      "Land Ownership / Possession Proof",
      "Single Line Diagram (SLD) Approved by Electrical Inspector",
      "Transformer and Switchgear Safety Clearance Certificate",
      "Contractor Test Report (Form A)",
      "Agreement on High Tension Supply (A-1 Form)"
    ],
    stages: ["Load Application", "Feasibility Survey", "Demand Note Issuance & Payment", "Transformer Testing", "Meter Installation & Power Energization"]
  },
  {
    id: "appr-boiler-clearance",
    name: "Boiler & High-Pressure Vessel Registration / Inspection Certificate",
    department: "Directorate of Steam Boilers, Maharashtra",
    category: "Pressure Vessel & Heavy Safety",
    description: "Statutory registration and annual inspection certificate for all steam boilers and high-pressure steam pipelines operating above atmospheric pressure.",
    estimatedDuration: "12-18 Working Days",
    validity: "Annual (Mandatory yearly hydraulic test)",
    feeRange: "₹6,000 - ₹20,000",
    statutoryActs: "The Indian Boilers Act, 1923",
    requiredDocuments: [
      "Manufacturer's Test Certificates (Form II, III, IV)",
      "Boiler Inspector Pipeline Isometric Drawings",
      "Welder Qualification Test Certificates",
      "Certified Boiler Attendant Appointment Letter"
    ],
    stages: ["Registration Filing", "Hydraulic Pressure Test", "Safety Valve Floating Test", "Boiler Certificate Issuance"]
  },
  {
    id: "appr-weights-measures",
    name: "Verification & Stamping of Commercial Weights & Measures",
    department: "Legal Metrology Department, Govt. of Maharashtra",
    category: "Commercial Metrology",
    description: "Mandatory periodic verification and official lead stamping of industrial weighbridges, platform scales, and precision measuring instruments.",
    estimatedDuration: "5-7 Working Days",
    validity: "1 to 2 Years (Renewable)",
    feeRange: "₹2,000 - ₹8,000",
    statutoryActs: "Legal Metrology Act, 2009",
    requiredDocuments: [
      "Model Approval Certificate of Weighing Scales",
      "Purchase Invoices of Platform Scales/Weighbridge",
      "Factory Premises Proof & GSTIN"
    ],
    stages: ["Application Submission", "Inspector Field Visit & Test Stamping", "Stamping Certificate Issued"]
  },
  {
    id: "appr-cgwa-noc",
    name: "Ground Water Abstraction NOC (CGWA / GSDA)",
    department: "Central Ground Water Authority / Maharashtra GSDA",
    category: "Natural Resource Compliance",
    description: "Statutory NOC required for extracting groundwater via borewells/tubewells for industrial processes in notified/semi-critical talukas.",
    estimatedDuration: "45-60 Working Days",
    validity: "3 Years",
    feeRange: "₹10,000 - ₹50,000 + Water Abstraction Charges",
    statutoryActs: "Environment (Protection) Act, 1986 & CGWA Guidelines",
    requiredDocuments: [
      "Hydrogeological Report by Certified Geologist",
      "Rainwater Harvesting Plan with Storage Recharge Pit Design",
      "Digital Water Flow Meter Installation Proof with Telemetry"
    ],
    stages: ["Online CGWA Portal Submission", "GSDA District Scrutiny", "Field Verification", "NOC Issuance"]
  }
];

export function discoverApprovals(profile) {
  const {
    industry = "Manufacturing",
    manufacturing = true,
    employeeCount = 128,
    investment = 18.0,
    hazardousMaterial = "Minimal",
    constructionRequired = true,
    electricityLoad = "450 kVA",
    waterUsage = "Moderate"
  } = profile;

  const required = [];
  const potentiallyRequired = [];
  const infoNeeded = [];

  // Rule 1: Factory License
  if (manufacturing || industry === "Manufacturing" || industry === "Chemicals" || industry === "Food Processing" || industry === "Textiles" || industry === "Electronics") {
    if (employeeCount >= 10) {
      required.push({
        approval: APPROVAL_CATALOG.find(a => a.id === "appr-factory-lic"),
        category: "REQUIRED",
        reason: `Manufacturing activity with ${employeeCount} workers exceeds the statutory threshold of 10+ employees with electric power (The Factories Act, 1948).`,
        urgency: "HIGH",
        currentStatus: "Under Review (Application MH-LAB-2026-09-8812)"
      });
    } else {
      potentiallyRequired.push({
        approval: APPROVAL_CATALOG.find(a => a.id === "appr-factory-lic"),
        category: "POTENTIALLY_REQUIRED",
        reason: "Applicable if workforce expands beyond 10 workers with electric power or 20 without power.",
        urgency: "MEDIUM"
      });
    }
  }

  // Rule 2: Fire Safety Approval & Final NOC
  if (manufacturing || constructionRequired || employeeCount >= 20 || investment >= 5) {
    required.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-fire-noc"),
      category: "REQUIRED",
      reason: "Industrial manufacturing plant setup with workforce >= 20 requires certified fire suppression systems and MIDC Fire NOC.",
      urgency: "HIGH",
      currentStatus: "Documents Required (Application MH-FIRE-2026-09-3104)"
    });
  }

  // Rule 3: MPCB Consent to Operate (CTO)
  if (manufacturing || industry === "Manufacturing" || industry === "Chemicals" || hazardousMaterial !== "None") {
    required.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-mpcb-cto"),
      category: "REQUIRED",
      reason: `Industrial production with coolant/effluent discharge falls under MPCB Orange Category classification requiring Consent to Operate.`,
      urgency: "HIGH",
      currentStatus: "Inspection Scheduled for 02 Oct (Application MPCB-CTO-2026-08-1194)"
    });
  }

  // Rule 4: Factory Building & Layout Approval
  if (constructionRequired || manufacturing) {
    required.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-dish-plan"),
      category: "REQUIRED",
      reason: "Structural expansion or new machine installation requires prior DISH factory architectural clearance (Rule 3 of MH Factory Rules).",
      urgency: "MEDIUM",
      currentStatus: "Submitted (Application DISH-PN-2026-09-5091)"
    });
  }

  // Rule 5: High Tension Electricity Sanction
  const parsedLoad = parseInt(electricityLoad) || 450;
  if (parsedLoad >= 100 || electricityLoad.includes("kVA") || electricityLoad.includes("450")) {
    required.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-msedcl-ht"),
      category: "REQUIRED",
      reason: `Contract demand of ${electricityLoad} requires dedicated HT 11/22 kV substation sanction and Electrical Inspector clearance.`,
      urgency: "LOW",
      currentStatus: "Approved (Active Sanction MSEDCL-HT-2026-06-4410)"
    });
  }

  // Rule 6: Boiler & Pressure Vessel Clearance
  if (industry === "Chemicals" || industry === "Food Processing" || profile.hasBoiler || profile.hasPressureVessel) {
    required.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-boiler-clearance"),
      category: "REQUIRED",
      reason: "Operation of steam boilers or compressed air receivers > 10 bar requires annual Directorate of Steam Boilers certification.",
      urgency: "MEDIUM"
    });
  } else {
    potentiallyRequired.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-boiler-clearance"),
      category: "POTENTIALLY_REQUIRED",
      reason: "Required if high-pressure steam boilers or compressors above 7 kg/cm² are deployed in CNC tooling or washing lines.",
      urgency: "LOW"
    });
  }

  // Rule 7: Weights & Measures
  if (manufacturing || industry === "Manufacturing" || industry === "Textiles" || industry === "Food Processing") {
    potentiallyRequired.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-weights-measures"),
      category: "POTENTIALLY_REQUIRED",
      reason: "Applicable if raw materials or finished components are weighed for commercial commercial transaction/invoicing.",
      urgency: "LOW"
    });
  }

  // Rule 8: Ground Water NOC
  if (waterUsage === "Heavy Discharge" || profile.usesBorewell) {
    required.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-cgwa-noc"),
      category: "REQUIRED",
      reason: "Industrial groundwater withdrawal in notified industrial zones requires mandatory CGWA clearance and telemetry meters.",
      urgency: "MEDIUM"
    });
  } else {
    infoNeeded.push({
      approval: APPROVAL_CATALOG.find(a => a.id === "appr-cgwa-noc"),
      category: "INFORMATION_NEEDED",
      reason: "Clarify whether plant water is supplied 100% via MIDC pipeline or independent borewells exist on site.",
      questionPrompt: "Does the facility draw water from private borewells, or solely from the MIDC industrial supply network?"
    });
  }

  return {
    required,
    potentiallyRequired,
    infoNeeded,
    summary: {
      totalRequired: required.length,
      totalPotentiallyRequired: potentiallyRequired.length,
      totalInfoNeeded: infoNeeded.length,
      primaryIndustry: industry,
      district: profile.district || "Pune",
      complianceRiskScore: "Low / In Good Standing"
    }
  };
}
