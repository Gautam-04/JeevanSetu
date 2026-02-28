// services/geminiService.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateMarkdownReport = async (reportData) => {
  const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.3
  }
});

  const prompt = `
You are generating an OFFICIAL annual report for an Indian NGO named "Jeevansetu".
The NGO is based in India and all financial values must be in Indian Rupees (₹).
Do NOT use dollars.
Do NOT invent fake names like CEO or placeholders.
Do NOT add dummy contact information.
Do NOT exaggerate numbers.
Use ONLY the data provided below.

Write in professional but realistic NGO tone.
Keep it factual and data-driven.
Avoid generic motivational paragraphs.
No fictional names.
No placeholders like [Your NGO Name].

DATA:
${JSON.stringify(reportData, null, 2)}

Structure the markdown exactly like this:

# Jeevansetu Annual Report ${reportData.year}

## 1. Financial Summary
- Total Donations Received: ₹<value>
- Number of Donations: <value>
- Net Amount After Payment Gateway Charges: ₹<value> (if provided)

Add 2-3 short analysis sentences based strictly on the numbers.

## 2. Child Statistics
- Total Children Supported: <value>
- New Admissions: <value>
- Children Left: <value>

Brief factual analysis only.

## 3. Centre Performance
- Total Centres: <value>
- Occupancy Insights (if data exists)

## 4. Key Observations
List 4–6 bullet insights derived ONLY from data.

## 5. Outlook for Next Year
Write realistic short goals based on trends.

Important Rules:
- Currency must be ₹.
- Do not convert to dollars.
- Do not add imaginary data.
- Do not mention CEO.
- Do not use placeholders.
- Do not fabricate anything.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
};