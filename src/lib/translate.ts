import { TranslationServiceClient } from '@google-cloud/translate';

const translationClient = new TranslationServiceClient();

export async function translateText(
  text: string,
  targetLanguage: string,
  projectId: string = process.env.GOOGLE_CLOUD_PROJECT_ID || ''
) {
  try {
    const request = {
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      targetLanguageCode: targetLanguage,
    };

    const [response] = await translationClient.translateText(request);
    return response.translations?.[0]?.translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
}