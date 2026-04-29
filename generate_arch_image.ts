import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateArchitectureImage() {
  console.log("Generating Architecture Image...");
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: "A clean, modern software architecture diagram. Three layers: Bottom layer 'Ingestion' with data streams. Middle layer 'Intelligence' with a glowing brain or AI chip. Top layer 'Action' with automated robotic arms or outgoing signals. Blue and slate color palette. Isometric view. High tech, schematic style but 3D and polished. No text labels, just the visual structure.",
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

    const part = response.candidates[0].content.parts.find(p => p.inlineData);
    if (part && part.inlineData) {
      const base64 = part.inlineData.data;
      const content = `export const ARCHITECTURE_IMAGE = "data:image/png;base64,${base64}";`;
      
      // Ensure directory exists
      const dir = path.resolve('src/assets');
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(dir, 'architecture_image.ts'), content);
      console.log("Architecture image saved to src/assets/architecture_image.ts");
    }
  } catch (error) {
    console.error("Error generating architecture image:", error);
  }
}

generateArchitectureImage();
