'use server';
/**
 * @fileOverview An AI flow for generating promo card images.
 *
 * - generatePromoCardImage - A function that generates an image based on a text prompt.
 * - GeneratePromoCardImageInput - The input type for the generatePromoCardImage function.
 * - GeneratePromoCardImageOutput - The return type for the generatePromoCardImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromoCardImageInputSchema = z.object({
  prompt: z.string().describe('A descriptive prompt for the promo card image.'),
});
export type GeneratePromoCardImageInput = z.infer<typeof GeneratePromoCardImageInputSchema>;

const GeneratePromoCardImageOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GeneratePromoCardImageOutput = z.infer<typeof GeneratePromoCardImageOutputSchema>;


export async function generatePromoCardImage(input: GeneratePromoCardImageInput): Promise<GeneratePromoCardImageOutput> {
  return generatePromoCardImageFlow(input);
}

const generatePromoCardImageFlow = ai.defineFlow(
  {
    name: 'generatePromoCardImageFlow',
    inputSchema: GeneratePromoCardImageInputSchema,
    outputSchema: GeneratePromoCardImageOutputSchema,
  },
  async ({ prompt }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A vibrant, eye-catching promotional image for an e-commerce store, related to: ${prompt}. The image should be square and visually engaging. Minimalist style.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
        throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
