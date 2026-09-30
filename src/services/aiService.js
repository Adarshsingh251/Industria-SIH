// INDUSTRIA - AI Assistant Service Layer
// Adheres strictly to PRD: Minimal, high-value, realistic, non-chatbot assistant

export async function parseNaturalLanguageBusinessProfile(userText) {
  // Simulate intelligent entity extraction
  await new Promise(resolve => setTimeout(resolve, 800));

  const text = userText.toLowerCase();

  let industry = "Manufacturing";
  if (text.includes("food") || text.includes("dairy") || text.includes("agro")) industry = "Food Processing";
  else if (text.includes("chemical") || text.includes("pharma") || text.includes("paint")) industry = "Chemicals";
  else if (text.includes("textile") || text.includes("garment") || text.includes("fabric")) industry = "Textiles";
  else if (text.includes("electronic") || text.includes("semiconductor") || text.includes("pcb")) industry = "Electronics";
  else if (text.includes("it") || text.includes("software") || text.includes("services")) industry = "IT / Services";

  // Employee extraction
  let employeeCount = 128;
  const empMatch = text.match(/(\d+)\s*(?:employees|workers|staff|people|manpower)/i);
  if (empMatch) employeeCount = parseInt(empMatch[1], 10);

  // Investment extraction
  let investment = 18.0;
  const invMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)/i);
  if (invMatch) investment = parseFloat(invMatch[1]);

  // District extraction
  let district = "Pune";
  if (text.includes("thane") || text.includes("navi mumbai")) district = "Thane";
  else if (text.includes("nashik")) district = "Nashik";
  else if (text.includes("nagpur")) district = "Nagpur";
  else if (text.includes("aurangabad") || text.includes("chhatrapati sambhajinagar")) district = "Chhatrapati Sambhajinagar";
  else if (text.includes("solapur")) district = "Solapur";
  else if (text.includes("kolhapur")) district = "Kolhapur";

  // Power load
  let electricityLoad = "450 kVA";
  const powerMatch = text.match(/(\d+)\s*(?:kva|kw|hp)/i);
  if (powerMatch) electricityLoad = `${powerMatch[1]} kVA`;

  const hazardous = text.includes("hazardous") || text.includes("chemical") || text.includes("toxic") || text.includes("coolant");
  const construction = text.includes("shed") || text.includes("construction") || text.includes("expand") || text.includes("building") || text.includes("civil");

  return {
    parsedProfile: {
      industry,
      district,
      employeeCount,
      investment,
      electricityLoad,
      hazardousMaterial: hazardous ? "Minimal (Category B - Coolants/Oils)" : "None",
      constructionRequired: construction,
      manufacturing: industry !== "IT / Services"
    },
    extractedEntities: [
      { field: "Industry Sector", value: industry, confidence: "High" },
      { field: "Location / District", value: `${district}, Maharashtra`, confidence: "High" },
      { field: "Workforce Size", value: `${employeeCount} Workers`, confidence: "High" },
      { field: "Capital Investment", value: `₹${investment} Cr`, confidence: "High" },
      { field: "Power Demand", value: electricityLoad, confidence: "High" },
      { field: "Environmental Category", value: hazardous ? "Orange (Trade Effluent / Coolant)" : "Green", confidence: "Medium" }
    ],
    assistantNote: "Parameters extracted from your prompt. You can review and adjust them in the step-by-step form before generating your roadmap."
  };
}

export async function analyzeUploadedDocument(file, targetApprovalContext) {
  // Simulate AI document metadata extraction & validation
  await new Promise(resolve => setTimeout(resolve, 950));

  const fileName = file.name || "Fire_Hydrant_Evacuation_Layout_Rev2.pdf";
  const lower = fileName.toLowerCase();

  let detectedType = "Architectural / Fire Safety Layout";
  let matchedApproval = targetApprovalContext || "Fire Safety Approval & Final NOC";
  let validationSummary = "Clear architectural legend, fire hydrant positions marked, emergency stairwells tagged.";
  let confidence = 96;
  let status = "UPLOADED";

  if (lower.includes("pan")) {
    detectedType = "Company Permanent Account Number (PAN)";
    matchedApproval = "General Company KYC";
  } else if (lower.includes("fire") || lower.includes("hydrant") || lower.includes("evacuation")) {
    detectedType = "Fire Hydrant & Evacuation Blueprint";
    matchedApproval = "Fire Safety Approval & Final NOC";
    validationSummary = "Identified 2 fire escape routes, 14 extinguisher locations, and 4 internal hydrant risers.";
  } else if (lower.includes("etp") || lower.includes("pollution") || lower.includes("emission")) {
    detectedType = "Effluent Treatment & Emission Compliance Plan";
    matchedApproval = "MPCB Consent to Operate (CTO)";
  } else if (lower.includes("dish") || lower.includes("layout") || lower.includes("factory")) {
    detectedType = "Factory Building & Machinery Layout Plan";
    matchedApproval = "Factory License (Form No. 2)";
  }

  return {
    documentId: `doc-${Date.now()}`,
    name: detectedType,
    fileName: fileName,
    fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    fileType: file.type || "application/pdf",
    detectedType,
    matchedApproval,
    confidenceScore: `${confidence}% Match`,
    extractedMetadata: {
      issuingAuthorityOrSignatory: "Registered Chartered Architect / MFS Licensed Fire Agency",
      revision: "Rev 2.1 - Approved for Execution",
      dateOnDocument: "26 Sep 2026",
      complianceTags: ["MFS Rules 2006", "IS 2189 / IS 3844", "Factory Safety"]
    },
    validationStatus: "PASS",
    validationMessage: validationSummary,
    readyToAdvanceApplication: true
  };
}
