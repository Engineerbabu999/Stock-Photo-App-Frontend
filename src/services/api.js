const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

/**
 * Checks backend health and whether live OpenAI or simulated engine is active
 */
export async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/status`);
    if (!res.ok) throw new Error(`Status HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    return { status: 'OFFLINE', isMockMode: true, error: err.message };
  }
}

/**
 * 1. Direct LLM chat response: GET /ask-ai?prompt=...
 */
export async function askAi(prompt) {
  const params = new URLSearchParams({ prompt });
  const res = await fetch(`${API_BASE_URL}/ask-ai?${params.toString()}`);
  if (!res.ok) throw new Error(`AI Chat error: ${res.statusText}`);
  return await res.text();
}

/**
 * 2. Styled Options chat response (Pirate Persona): GET /ask-ai-options?prompt=...
 */
export async function askAiOptions(prompt = '') {
  const params = new URLSearchParams();
  if (prompt) params.append('prompt', prompt);
  const res = await fetch(`${API_BASE_URL}/ask-ai-options?${params.toString()}`);
  if (!res.ok) throw new Error(`AI Options error: ${res.statusText}`);
  return await res.text();
}

/**
 * 3. Single image generation: GET /generate-image?prompt=...
 */
export async function generateSingleImage(prompt) {
  const params = new URLSearchParams({ prompt });
  const res = await fetch(`${API_BASE_URL}/generate-image?${params.toString()}`);
  if (!res.ok) throw new Error(`Image Gen error: ${res.statusText}`);
  const data = await res.json();
  const url = data?.results?.[0]?.output?.url || data?.result?.output?.url;
  return { url, raw: data };
}

/**
 * 4. Multi-image gallery generation: GET /generate-images-as-list?...
 */
export async function generateImagesAsList(prompt, { quality = 'standard', n = 1, width = 1024, height = 1024 } = {}) {
  const params = new URLSearchParams({
    prompt,
    quality,
    n: n.toString(),
    width: width.toString(),
    height: height.toString()
  });
  const res = await fetch(`${API_BASE_URL}/generate-images-as-list?${params.toString()}`);
  if (!res.ok) throw new Error(`Images List error: ${res.statusText}`);
  return await res.json(); // List<String> of URLs
}

/**
 * 5. Direct Image redirect URL: GET /redirect-generated-image?prompt=...
 */
export function getRedirectImageUrl(prompt) {
  const params = new URLSearchParams({ prompt });
  return `${API_BASE_URL}/redirect-generated-image?${params.toString()}`;
}

/**
 * 6. Culinary Recipe Creator: GET /recipe-creator?ingredients=...&cuisine=...&dietaryRestrictions=...
 */
export async function createRecipe(ingredients, cuisine = 'any', dietaryRestrictions = 'none') {
  const params = new URLSearchParams({
    ingredients,
    cuisine,
    dietaryRestrictions
  });
  const res = await fetch(`${API_BASE_URL}/recipe-creator?${params.toString()}`);
  if (!res.ok) throw new Error(`Recipe error: ${res.statusText}`);
  return await res.text();
}
