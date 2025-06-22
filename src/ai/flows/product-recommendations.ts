'use server';

/**
 * @fileOverview Product recommendation AI agent.
 *
 * - recommendProducts - A function that handles the product recommendation process.
 * - RecommendProductsInput - The input type for the recommendProducts function.
 * - RecommendProductsOutput - The return type for the recommendProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendProductsInputSchema = z.object({
  browsingHistory: z.string().describe('The user browsing history.'),
  searchQueries: z.string().describe('The user search queries.'),
});
export type RecommendProductsInput = z.infer<typeof RecommendProductsInputSchema>;

const RecommendProductsOutputSchema = z.object({
  recommendedProducts: z
    .array(z.string())
    .describe('List of recommended product names based on browsing history and search queries.'),
});
export type RecommendProductsOutput = z.infer<typeof RecommendProductsOutputSchema>;

export async function recommendProducts(input: RecommendProductsInput): Promise<RecommendProductsOutput> {
  return recommendProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProductsPrompt',
  input: {schema: RecommendProductsInputSchema},
  output: {schema: RecommendProductsOutputSchema},
  prompt: `You are an AI product recommendation agent. Based on the user's browsing history and search queries, you will provide a list of recommended products.

Browsing History: {{{browsingHistory}}}
Search Queries: {{{searchQueries}}}

Recommended Products:`, // Ensure the AI responds with product recommendations.
});

const recommendProductsFlow = ai.defineFlow(
  {
    name: 'recommendProductsFlow',
    inputSchema: RecommendProductsInputSchema,
    outputSchema: RecommendProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
