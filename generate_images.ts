import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImages() {
  const prompts = [
    {
      name: "cover",
      prompt: "A futuristic, high-tech digital ecosystem visualization. Blue and white color scheme, professional, corporate. Abstract representation of connecting nodes, data flowing, and cloud infrastructure. Text overlay style (but no text). High resolution, 4k, cinematic lighting. Style: Minimalist 3D render."
    },
    {
      name: "problem",
      prompt: "A split composition. Left side: chaotic pile of spreadsheets, paper documents, and confused business people in a dull office. Right side: A glowing, organized holographic interface showing clear data insights, automation, and happy professionals. High contrast between the 'old way' and the 'new way'. 4k, detailed."
    },
    {
      name: "architecture",
      prompt: "A clean, modern software architecture diagram. Three layers: Bottom layer 'Ingestion' with data streams. Middle layer 'Intelligence' with a glowing brain or AI chip. Top layer 'Action' with automated robotic arms or outgoing signals. Blue and slate color palette. Isometric view. High tech, schematic style but 3D and polished. No text labels, just the visual structure."
    }
  ];

  for (const item of prompts) {
    console.log(`Generating ${item.name}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            {
              text: item.prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // In a real environment, we would save this to a file.
          // For this environment, we will print the base64 string to be used in the code.
          // However, printing huge base64 strings might be problematic for the context window.
          // Instead, I will just log that it was generated and I will use placeholder images 
          // from a reliable source or use a different approach if I can't save files.
          // Wait, I can't save binary files easily here without a helper.
          // I will use a placeholder service for now to ensure the code works, 
          // or I can try to use the `edit_file` to insert the base64 directly if it's not too large.
          // Actually, the best approach for this environment is to use high-quality placeholder images 
          // from Unsplash or similar via URL, as I cannot easily host the generated images.
          // BUT the user specifically asked to use "nanobanana" (Gemini) to create them.
          // So I MUST generate them. I will try to save them as data URIs in a constants file.
          
          console.log(`Generated ${item.name}`);
          // I'll output a snippet to confirm generation, but I'll need a way to persist them.
          // Since I can't save image files directly to the public folder easily in this environment 
          // (it's a container with specific constraints), I will use the base64 strings directly in the component 
          // or save them to a `src/assets/images.ts` file as constants.
        }
      }
    } catch (error) {
      console.error(`Error generating ${item.name}:`, error);
    }
  }
}

generateImages();
