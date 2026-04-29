import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Supabase client with service role for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Supabase client for storage operations
const supabaseStorage = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Initialize storage bucket on startup
const bucketName = 'make-45b957fb-blog-images';
(async () => {
  const { data: buckets } = await supabaseStorage.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  if (!bucketExists) {
    await supabaseStorage.storage.createBucket(bucketName, { public: false });
    console.log(`Created bucket: ${bucketName}`);
  }
})();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-45b957fb/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== AUTH ROUTES ====================

// Sign up new admin user
app.post("/make-server-45b957fb/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Signup error during request parsing: ${error}`);
    return c.json({ error: 'Invalid request' }, 400);
  }
});

// ==================== ARTICLE ROUTES ====================

// Get Google Reviews
app.get("/make-server-45b957fb/google-reviews", async (c) => {
  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    const placeId = 'ChIJkQ4E_AYVCEgR3rsAUYeWAqE';
    
    console.log('=== Google Reviews Request ===');
    console.log('API Key present:', !!apiKey);
    console.log('API Key length:', apiKey?.length || 0);
    console.log('Place ID:', placeId);
    
    if (!apiKey) {
      console.log('ERROR: Google Places API key not configured');
      return c.json({ 
        reviews: [],
        error: 'Clé API Google Places non configurée. Veuillez ajouter votre clé API.',
        errorCode: 'NO_API_KEY'
      }, 200);
    }

    // Use the NEW Places API (New)
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=fr&key=${apiKey}`;
    
    console.log('Calling Google Places API (New)...');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
      }
    });
    
    if (!response.ok) {
      console.log('HTTP Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return c.json({ 
        reviews: [],
        error: `Erreur HTTP ${response.status} lors de l'appel à Google Places API (New)`,
        errorCode: 'HTTP_ERROR'
      }, 200);
    }
    
    const data = await response.json();
    
    console.log('Google API Response:', JSON.stringify(data, null, 2).substring(0, 1000));
    
    // Handle error responses
    if (data.error) {
      console.log('API Error:', data.error);
      return c.json({ 
        reviews: [],
        error: `Google Places API : ${data.error.message || 'Erreur inconnue'}`,
        errorCode: data.error.code || 'API_ERROR',
        details: data.error.message
      }, 200);
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
    return c.json({ 
      reviews,
      overallRating: data.rating || 0,
      totalReviews: data.userRatingCount || 0
    });
  } catch (error) {
    console.log(`EXCEPTION: ${error}`);
    console.log('Error stack:', error.stack);
    return c.json({ 
      reviews: [],
      error: `Erreur serveur : ${error.message}`,
      errorCode: 'EXCEPTION'
    }, 200);
  }
});

// Get Facebook Posts
app.get("/make-server-45b957fb/facebook-posts", async (c) => {
  try {
    const accessToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN');
    const pageId = Deno.env.get('FACEBOOK_PAGE_ID');
    
    console.log('=== Facebook Posts Request ===');
    console.log('Access Token present:', !!accessToken);
    console.log('Page ID present:', !!pageId);
    
    if (!accessToken || !pageId) {
      console.log('ERROR: Facebook credentials not configured');
      return c.json({ 
        posts: [],
        error: 'Configuration Facebook manquante. Veuillez configurer FACEBOOK_ACCESS_TOKEN et FACEBOOK_PAGE_ID.',
        errorCode: 'NO_CONFIG'
      }, 200);
    }

    // Get posts from Facebook Graph API
    const fields = 'id,message,full_picture,created_time,permalink_url,story';
    const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=${fields}&limit=10&access_token=${accessToken}`;
    
    console.log('Calling Facebook Graph API...');
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log('HTTP Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return c.json({ 
        posts: [],
        error: `Erreur HTTP ${response.status} lors de l'appel à Facebook Graph API`,
        errorCode: 'HTTP_ERROR'
      }, 200);
    }
    
    const data = await response.json();
    
    console.log('Facebook API Response:', JSON.stringify(data, null, 2).substring(0, 500));
    
    // Handle error responses
    if (data.error) {
      console.log('API Error:', data.error);
      return c.json({ 
        posts: [],
        error: `Facebook API : ${data.error.message || 'Erreur inconnue'}`,
        errorCode: data.error.code || 'API_ERROR',
        details: data.error.message
      }, 200);
    }
    
    // Transform posts to match our article format
    const posts = (data.data || [])
      .filter((post: any) => post.message || post.story) // Only posts with content
      .slice(0, 6) // Get up to 6 posts
      .map((post: any) => {
        const message = post.message || post.story || '';
        const excerpt = message.length > 150 
          ? message.substring(0, 150) + '...' 
          : message;
        
        return {
          id: post.id,
          title: message.split('\n')[0].substring(0, 100) || 'Publication Facebook',
          excerpt: excerpt,
          message: message,
          image: post.full_picture || null,
          publishedAt: post.created_time,
          url: post.permalink_url,
          source: 'facebook',
          category: 'Facebook',
        };
      });
    
    console.log(`✓ Successfully fetched ${posts.length} Facebook posts`);
    return c.json({ posts });
  } catch (error) {
    console.log(`EXCEPTION in Facebook posts: ${error}`);
    console.log('Error stack:', error.stack);
    return c.json({ 
      posts: [],
      error: `Erreur serveur : ${error.message}`,
      errorCode: 'EXCEPTION'
    }, 200);
  }
});

// Get all articles
app.get("/make-server-45b957fb/articles", async (c) => {
  try {
    const articles = await kv.getByPrefix('article:');
    
    // If no articles exist, return demo articles
    if (articles.length === 0) {
      const demoArticles = [
        {
          slug: "journee-collaborateurs-sodimavi-10-ans-blois-2025",
          title: "Une journée d'entreprise pas comme les autres : Sodimavi célèbre les 10 ans de son agence de Blois avec un road trip rétro",
          excerpt: "Le 9 juin 2025, Sodimavi a organisé une journée d'entreprise originale pour ses 120 collaborateurs avec un road trip en voitures anciennes pour célébrer les 10 ans de l'agence de Blois (Fossé). Un événement fédérateur placé sous le signe de la cohésion d'équipe et de la convivialité.",
          category: "Événements",
          image: "https://images.unsplash.com/photo-1664560013811-41ad70780e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xhc3NpYyUyMGNhcnMlMjBwYXJraW5nJTIwY29tcGFueSUyMGV2ZW50JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczNzM5NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          publishedAt: "2025-06-30T10:00:00.000Z",
          authorName: "Équipe Val de Loire VI",
          published: true,
          content: `# Une journée d'entreprise pas comme les autres

Le 9 juin dernier, **Sodimavi**, concessionnaire pour les Véhicules **ISUZU** (trucks et pick-up), **VOLVO**, **DAF** (agence de Blois) et **KÖGEL** dans 8 départements, a organisé une journée d'entreprise originale pour ses **120 collaborateurs**. Un événement fédérateur, placé sous le signe de la cohésion d'équipe, de la surprise… et de la convivialité.

## 10 ans de l'agence de Blois : une belle occasion de se retrouver

Cette journée hors du cadre marquait un moment important : **les 10 ans de l'agence Sodimavi de Blois**, implantée à **Fossé** dans le département du **Loir-et-Cher**. Pour l'occasion, direction une ambiance vintage et décalée, avec une surprise de taille pour les collaborateurs.

Dès 9h, à leur arrivée à l'agence, les équipes découvrent **une trentaine de voitures anciennes** alignées sur le parking, prêtes pour un **road trip inoubliable** organisé en partenariat avec **Cockpit 41**. Une immersion dans une autre époque, renforcée par un **dress code rétro** respecté par l'ensemble des collaborateurs et dirigeants — de quoi donner le ton dès les premiers instants !

## Cohésion et esprit d'équipe au cœur du programme

Équipés de road books et d'énigmes, les salariés ont pris la route à bord des voitures d'époque pour une **matinée de jeux de piste** et de découverte du territoire, entre réflexion, rires et esprit d'équipe. Un moment parfait pour se redécouvrir en dehors du cadre habituel de travail.

Plusieurs **temps d'échanges professionnels** ont été proposés, dans un cadre naturel, loin des salles classiques de réunion. Ces moments ont permis d'aborder les points clés de la stratégie d'entreprise, mais aussi d'écouter les retours du terrain, dans une ambiance simple et détendue.

## Pique-nique au bord de la Loire et balade en gabare

À l'heure du déjeuner, direction **les bords de Loire**, face au **château de Chaumont-sur-Loire**, pour un **pique-nique convivial** en plein air.

Des **balades en gabare**, embarcations traditionnelles de la Loire, étaient proposées tout au long du déjeuner pour découvrir le paysage sous un autre angle ainsi que la faune et la flore présentes sur le fleuve.

## Mettre en valeur l'engagement des collaborateurs

**Temps fort** : plusieurs salariés ont été remerciés pour leur **ancienneté** ou pour leur **implication remarquée** au cours de l'année. Une reconnaissance simple mais sincère, qui reflète l'esprit d'écoute et de valorisation porté par le **groupe Sodimavi**.

## Une culture d'entreprise qui place l'humain au centre

Avec cette nouvelle journée d'entreprise, **Sodimavi** souhaite comme chaque année remercier l'ensemble de ses collaborateurs et promouvoir une **qualité de vie au travail** positive et durable. Ces temps forts participent à la construction d'un climat de confiance, d'écoute et de reconnaissance au sein des équipes.

---

**Val de Loire VI**, membre du groupe Sodimavi, partage ces valeurs de respect, de cohésion et d'excellence au service de ses clients. Nous sommes fiers de faire partie d'un groupe qui place l'humain au cœur de sa réussite.

**Contactez-nous au 02 54 54 29 29** pour découvrir nos services et notre équipe passionnée.`,
        },
      ];
      
      return c.json({ articles: demoArticles });
    }
    
    // Sort by date (most recent first)
    const sortedArticles = articles.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    
    return c.json({ articles: sortedArticles });
  } catch (error) {
    console.log(`Error fetching articles: ${error}`);
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Get single article by slug
app.get("/make-server-45b957fb/articles/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const article = await kv.get(`article:${slug}`);
    
    if (!article) {
      // Check if this is a demo article
      const demoArticles = [
        {
          slug: "journee-collaborateurs-sodimavi-10-ans-blois-2025",
          title: "Une journée d'entreprise pas comme les autres : Sodimavi célèbre les 10 ans de son agence de Blois avec un road trip rétro",
          excerpt: "Le 9 juin 2025, Sodimavi a organisé une journée d'entreprise originale pour ses 120 collaborateurs avec un road trip en voitures anciennes pour célébrer les 10 ans de l'agence de Blois (Fossé). Un événement fédérateur placé sous le signe de la cohésion d'équipe et de la convivialité.",
          category: "Événements",
          image: "https://images.unsplash.com/photo-1664560013811-41ad70780e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xhc3NpYyUyMGNhcnMlMjBwYXJraW5nJTIwY29tcGFueSUyMGV2ZW50JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczNzM5NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          publishedAt: "2025-06-30T10:00:00.000Z",
          authorName: "Équipe Val de Loire VI",
          published: true,
          content: `# Une journée d'entreprise pas comme les autres

Le 9 juin dernier, **Sodimavi**, concessionnaire pour les Véhicules **ISUZU** (trucks et pick-up), **VOLVO**, **DAF** (agence de Blois) et **KÖGEL** dans 8 départements, a organisé une journée d'entreprise originale pour ses **120 collaborateurs**. Un événement fédérateur, placé sous le signe de la cohésion d'équipe, de la surprise… et de la convivialité.

## 10 ans de l'agence de Blois : une belle occasion de se retrouver

Cette journée hors du cadre marquait un moment important : **les 10 ans de l'agence Sodimavi de Blois**, implantée à **Fossé** dans le département du **Loir-et-Cher**. Pour l'occasion, direction une ambiance vintage et décalée, avec une surprise de taille pour les collaborateurs.

Dès 9h, à leur arrivée à l'agence, les équipes découvrent **une trentaine de voitures anciennes** alignées sur le parking, prêtes pour un **road trip inoubliable** organisé en partenariat avec **Cockpit 41**. Une immersion dans une autre époque, renforcée par un **dress code rétro** respecté par l'ensemble des collaborateurs et dirigeants — de quoi donner le ton dès les premiers instants !

## Cohésion et esprit d'équipe au cœur du programme

Équipés de road books et d'énigmes, les salariés ont pris la route à bord des voitures d'époque pour une **matinée de jeux de piste** et de découverte du territoire, entre réflexion, rires et esprit d'équipe. Un moment parfait pour se redécouvrir en dehors du cadre habituel de travail.

Plusieurs **temps d'échanges professionnels** ont été proposés, dans un cadre naturel, loin des salles classiques de réunion. Ces moments ont permis d'aborder les points clés de la stratégie d'entreprise, mais aussi d'écouter les retours du terrain, dans une ambiance simple et détendue.

## Pique-nique au bord de la Loire et balade en gabare

À l'heure du déjeuner, direction **les bords de Loire**, face au **château de Chaumont-sur-Loire**, pour un **pique-nique convivial** en plein air.

Des **balades en gabare**, embarcations traditionnelles de la Loire, étaient proposées tout au long du déjeuner pour découvrir le paysage sous un autre angle ainsi que la faune et la flore présentes sur le fleuve.

## Mettre en valeur l'engagement des collaborateurs

**Temps fort** : plusieurs salariés ont été remerciés pour leur **ancienneté** ou pour leur **implication remarquée** au cours de l'année. Une reconnaissance simple mais sincère, qui reflète l'esprit d'écoute et de valorisation porté par le **groupe Sodimavi**.

## Une culture d'entreprise qui place l'humain au centre

Avec cette nouvelle journée d'entreprise, **Sodimavi** souhaite comme chaque année remercier l'ensemble de ses collaborateurs et promouvoir une **qualité de vie au travail** positive et durable. Ces temps forts participent à la construction d'un climat de confiance, d'écoute et de reconnaissance au sein des équipes.

---

**Val de Loire VI**, membre du groupe Sodimavi, partage ces valeurs de respect, de cohésion et d'excellence au service de ses clients. Nous sommes fiers de faire partie d'un groupe qui place l'humain au cœur de sa réussite.

**Contactez-nous au 02 54 54 29 29** pour découvrir nos services et notre équipe passionnée.`,
        },
      ];
      
      const demoArticle = demoArticles.find(a => a.slug === slug);
      if (demoArticle) {
        return c.json({ article: demoArticle });
      }
      
      return c.json({ error: 'Article not found' }, 404);
    }
    
    return c.json({ article });
  } catch (error) {
    console.log(`Error fetching article: ${error}`);
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Create new article (protected)
app.post("/make-server-45b957fb/articles", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Authorization error while creating article: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const articleData = await c.req.json();
    const slug = articleData.slug;
    
    // Check if article with this slug already exists
    const existing = await kv.get(`article:${slug}`);
    if (existing) {
      return c.json({ error: 'Article with this slug already exists' }, 400);
    }
    
    const article = {
      ...articleData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: user.id,
      authorName: 'Emilie RICHARD',
    };
    
    await kv.set(`article:${slug}`, article);
    
    return c.json({ success: true, article });
  } catch (error) {
    console.log(`Error creating article: ${error}`);
    return c.json({ error: 'Failed to create article' }, 500);
  }
});

// Update article (protected)
app.put("/make-server-45b957fb/articles/:slug", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Authorization error while updating article: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const slug = c.req.param('slug');
    const updates = await c.req.json();
    
    const existing = await kv.get(`article:${slug}`);
    if (!existing) {
      return c.json({ error: 'Article not found' }, 404);
    }
    
    // If slug is changing, delete old and create new
    if (updates.slug && updates.slug !== slug) {
      await kv.del(`article:${slug}`);
      const updated = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      await kv.set(`article:${updates.slug}`, updated);
      return c.json({ success: true, article: updated });
    }
    
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`article:${slug}`, updated);
    
    return c.json({ success: true, article: updated });
  } catch (error) {
    console.log(`Error updating article: ${error}`);
    return c.json({ error: 'Failed to update article' }, 500);
  }
});

// Delete article (protected)
app.delete("/make-server-45b957fb/articles/:slug", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Authorization error while deleting article: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const slug = c.req.param('slug');
    await kv.del(`article:${slug}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting article: ${error}`);
    return c.json({ error: 'Failed to delete article' }, 500);
  }
});

// Quick create article (for admin convenience - should be removed in production)
app.post("/make-server-45b957fb/articles/quick-create", async (c) => {
  try {
    const { adminKey, ...articleData } = await c.req.json();
    
    // Simple key check (replace with actual auth in production)
    if (adminKey !== 'vdlvi-quick-2025') {
      return c.json({ error: 'Invalid admin key' }, 401);
    }
    
    const slug = articleData.slug;
    
    // Check if article with this slug already exists
    const existing = await kv.get(`article:${slug}`);
    if (existing) {
      return c.json({ error: 'Article with this slug already exists' }, 400);
    }
    
    const article = {
      ...articleData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: 'quick-create',
      authorName: articleData.authorName || 'Équipe Val de Loire VI',
    };
    
    await kv.set(`article:${slug}`, article);
    
    return c.json({ success: true, article });
  } catch (error) {
    console.log(`Error quick creating article: ${error}`);
    return c.json({ error: 'Failed to create article' }, 500);
  }
});

// Upload image (protected)
app.post("/make-server-45b957fb/upload-image", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      console.log(`Authorization error while uploading image: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();

    const { data, error } = await supabaseStorage.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (error) {
      console.log(`Error uploading image to storage: ${error.message}`);
      return c.json({ error: 'Failed to upload image' }, 500);
    }

    // Create signed URL (valid for 10 years)
    const { data: signedUrlData } = await supabaseStorage.storage
      .from(bucketName)
      .createSignedUrl(fileName, 315360000);

    return c.json({ 
      success: true, 
      url: signedUrlData?.signedUrl,
      fileName 
    });
  } catch (error) {
    console.log(`Error uploading image: ${error}`);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

Deno.serve(app.fetch);
