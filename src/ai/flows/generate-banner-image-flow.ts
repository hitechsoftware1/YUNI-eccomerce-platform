'use server';
/**
 * @fileOverview An AI flow for generating banner images.
 *
 * - generateBannerImage - A function that generates an image based on a text prompt.
 * - GenerateBannerImageInput - The input type for the generateBannerImage function.
 * - GenerateBannerImageOutput - The return type for the generateBannerImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBannerImageInputSchema = z.object({
  prompt: z.string().describe('A descriptive prompt for the banner image.'),
});
export type GenerateBannerImageInput = z.infer<typeof GenerateBannerImageInputSchema>;

const GenerateBannerImageOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateBannerImageOutput = z.infer<typeof GenerateBannerImageOutputSchema>;


export async function generateBannerImage(input: GenerateBannerImageInput): Promise<GenerateBannerImageOutput> {
  return generateBannerImageFlow(input);
}

const generateBannerImageFlow = ai.defineFlow(
  {
    name: 'generateBannerImageFlow',
    inputSchema: GenerateBannerImageInputSchema,
    outputSchema: GenerateBannerImageOutputSchema,
  },
  async ({ prompt }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A vibrant, high-resolution marketing banner image for an e-commerce store, related to: ${prompt}. The image should be eye-catching and suitable for a hero slider. Dimensions should be approximately 1600x600.`,
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
