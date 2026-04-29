import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = 'ChIJkQ4E_AYVCEgR3rsAUYeWAqE'; // VAL DE LOIRE V.I Place ID

    console.log('=== Google Reviews Request ===');
    console.log('API Key present:', !!apiKey);
    console.log('Place ID:', placeId);

    if (!apiKey) {
      console.log('ERROR: Google Places API key not configured');
      return res.status(200).json({
        reviews: [],
        error: 'Clé API Google Places non configurée. Veuillez ajouter GOOGLE_PLACES_API_KEY dans les variables d\'environnement Vercel.',
        errorCode: 'NO_API_KEY',
        overallRating: 0,
        totalReviews: 0,
      });
    }

    // Use the NEW Places API (New)
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=fr&key=${apiKey}`;

    console.log('Calling Google Places API (New)...');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
      },
    });

    if (!response.ok) {
      console.log('HTTP Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return res.status(200).json({
        reviews: [],
        error: `Erreur HTTP ${response.status} lors de l'appel à Google Places API`,
        errorCode: 'HTTP_ERROR',
        details: errorText,
        overallRating: 0,
        totalReviews: 0,
      });
    }

    const data = await response.json();

    console.log('Google API Response received');

    // Handle error responses
    if (data.error) {
      console.log('API Error:', data.error);
      return res.status(200).json({
        reviews: [],
        error: `Google Places API : ${data.error.message || 'Erreur inconnue'}`,
        errorCode: data.error.code || 'API_ERROR',
        details: data.error.message,
        overallRating: 0,
        totalReviews: 0,
      });
    }

    // Get the 3 most recent reviews
    const reviews = (data.reviews || [])
      .sort((a: any, b: any) => {
        const timeA = new Date(a.publishTime || 0).getTime();
        const timeB = new Date(b.publishTime || 0).getTime();
        return timeB - timeA;
      })
      .slice(0, 3)
      .map((review: any) => ({
        author: review.authorAttribution?.displayName || 'Anonyme',
        rating: review.rating || 5,
        comment: review.text?.text || review.originalText?.text || '',
        date: review.relativePublishTimeDescription || 'Récemment',
        profilePhoto: review.authorAttribution?.photoUri || '',
      }));

    console.log(`✓ Successfully fetched ${reviews.length} reviews`);
    return res.status(200).json({
      reviews,
      overallRating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
    });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return res.status(500).json({
      reviews: [],
      error: 'Une erreur est survenue lors de la récupération des avis',
      errorCode: 'INTERNAL_ERROR',
      details: error instanceof Error ? error.message : 'Unknown error',
      overallRating: 0,
      totalReviews: 0,
    });
  }
}
