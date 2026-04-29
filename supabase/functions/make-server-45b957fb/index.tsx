import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const supabaseStorage = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const bucketName = 'make-45b957fb-blog-images';

(async () => {
  const { data: buckets } = await supabaseStorage.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  if (!bucketExists) {
    await supabaseStorage.storage.createBucket(bucketName, { public: true });
    console.log(`Created public bucket: ${bucketName}`);
  }
})();

app.use('*', logger(console.log));

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

app.get("/make-server-45b957fb/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== AUTH ROUTES ====================

app.post("/make-server-45b957fb/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true
    });

    if (error) {
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    return c.json({ error: 'Invalid request' }, 400);
  }
});

// ==================== ARTICLE ROUTES ====================

app.get("/make-server-45b957fb/google-reviews", async (c) => {
  try {
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    const placeId = 'ChIJkQ4E_AYVCEgR3rsAUYeWAqE';

    if (!apiKey) {
      return c.json({
        reviews: [],
        error: 'Clé API Google Places non configurée.',
        errorCode: 'NO_API_KEY'
      }, 200);
    }

    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=fr&key=${apiKey}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
      }
    });

    if (!response.ok) {
      return c.json({
        reviews: [],
        error: `Erreur HTTP ${response.status}`,
        errorCode: 'HTTP_ERROR'
      }, 200);
    }

    const data = await response.json();

    if (data.error) {
      return c.json({
        reviews: [],
        error: `Google Places API : ${data.error.message || 'Erreur inconnue'}`,
        errorCode: data.error.code || 'API_ERROR'
      }, 200);
    }

    const reviews = (data.reviews || [])
      .sort((a: any, b: any) => new Date(b.publishTime || 0).getTime() - new Date(a.publishTime || 0).getTime())
      .slice(0, 3)
      .map((review: any) => ({
        author: review.authorAttribution?.displayName || 'Anonyme',
        rating: review.rating || 5,
        comment: review.text?.text || review.originalText?.text || '',
        date: review.relativePublishTimeDescription || 'Récemment',
        profilePhoto: review.authorAttribution?.photoUri || '',
      }));

    return c.json({
      reviews,
      overallRating: data.rating || 0,
      totalReviews: data.userRatingCount || 0
    });
  } catch (error) {
    return c.json({ reviews: [], error: `Erreur serveur : ${error.message}`, errorCode: 'EXCEPTION' }, 200);
  }
});

// Get all articles — public gets only published, admin gets all
app.get("/make-server-45b957fb/articles", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    const isAdmin = !!user?.id;

    const articles = await kv.getByPrefix('article:');

    if (articles.length === 0) {
      const demoArticles = [
        {
          id: 'demo-1',
          slug: "journee-collaborateurs-sodimavi-10-ans-blois-2025",
          title: "Une journée d'entreprise pas comme les autres : Sodimavi célèbre les 10 ans de son agence de Blois avec un road trip rétro",
          excerpt: "Le 9 juin 2025, Sodimavi a organisé une journée d'entreprise originale pour ses 120 collaborateurs avec un road trip en voitures anciennes pour célébrer les 10 ans de l'agence de Blois (Fossé).",
          category: "Événements",
          image: "https://images.unsplash.com/photo-1664560013811-41ad70780e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xhc3NpYyUyMGNhcnMlMjBwYXJraW5nJTIwY29tcGFueSUyMGV2ZW50JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczNzM5NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          publishedAt: "2025-06-30T10:00:00.000Z",
          authorName: "Équipe Val de Loire VI",
          published: true,
          content: `<h2>Une journée d'entreprise pas comme les autres</h2>
<p>Le 9 juin dernier, <strong>Sodimavi</strong>, concessionnaire pour les Véhicules <strong>ISUZU</strong> (trucks et pick-up), <strong>VOLVO</strong>, <strong>DAF</strong> (agence de Blois) et <strong>KÖGEL</strong> dans 8 départements, a organisé une journée d'entreprise originale pour ses <strong>120 collaborateurs</strong>.</p>
<h2>10 ans de l'agence de Blois</h2>
<p>Cette journée marquait un moment important : <strong>les 10 ans de l'agence Sodimavi de Blois</strong>, implantée à <strong>Fossé</strong> dans le département du <strong>Loir-et-Cher</strong>. Dès 9h, les équipes découvrent <strong>une trentaine de voitures anciennes</strong> alignées sur le parking, prêtes pour un <strong>road trip inoubliable</strong> organisé en partenariat avec <strong>Cockpit 41</strong>.</p>
<h2>Cohésion et esprit d'équipe</h2>
<p>Équipés de road books et d'énigmes, les salariés ont pris la route à bord des voitures d'époque pour une <strong>matinée de jeux de piste</strong> et de découverte du territoire.</p>
<h2>Pique-nique au bord de la Loire</h2>
<p>À l'heure du déjeuner, direction <strong>les bords de Loire</strong>, face au <strong>château de Chaumont-sur-Loire</strong>, pour un <strong>pique-nique convivial</strong> en plein air. Des <strong>balades en gabare</strong> étaient proposées tout au long du déjeuner.</p>
<hr>
<p><strong>Val de Loire VI</strong>, membre du groupe Sodimavi, partage ces valeurs de respect, de cohésion et d'excellence au service de ses clients.</p>`,
        },
      ];
      return c.json({ articles: demoArticles });
    }

    const sorted = articles
      .filter((a: any) => isAdmin ? true : a.published)
      .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return c.json({ articles: sorted });
  } catch (error) {
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Get single article by slug
app.get("/make-server-45b957fb/articles/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const article = await kv.get(`article:${slug}`);

    if (!article) {
      // Demo article fallback
      if (slug === 'journee-collaborateurs-sodimavi-10-ans-blois-2025') {
        const demo = {
          id: 'demo-1',
          slug,
          title: "Une journée d'entreprise pas comme les autres : Sodimavi célèbre les 10 ans de son agence de Blois avec un road trip rétro",
          excerpt: "Le 9 juin 2025, Sodimavi a organisé une journée d'entreprise originale pour ses 120 collaborateurs.",
          category: "Événements",
          image: "https://images.unsplash.com/photo-1664560013811-41ad70780e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xhc3NpYyUyMGNhcnMlMjBwYXJraW5nJTIwY29tcGFueSUyMGV2ZW50JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczNzM5NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          publishedAt: "2025-06-30T10:00:00.000Z",
          authorName: "Équipe Val de Loire VI",
          published: true,
          content: `<h2>Une journée d'entreprise pas comme les autres</h2><p>Le 9 juin dernier, <strong>Sodimavi</strong> a organisé une journée d'entreprise originale pour ses <strong>120 collaborateurs</strong>.</p>`,
        };
        return c.json({ article: demo });
      }
      return c.json({ error: 'Article not found' }, 404);
    }

    return c.json({ article });
  } catch (error) {
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Create new article (protected)
app.post("/make-server-45b957fb/articles", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const articleData = await c.req.json();
    const slug = articleData.slug;

    const existing = await kv.get(`article:${slug}`);
    if (existing) {
      return c.json({ error: 'Un article avec ce slug existe déjà' }, 400);
    }

    const article = {
      ...articleData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: user.id,
      authorName: user.user_metadata?.name || user.email,
    };

    await kv.set(`article:${slug}`, article);
    return c.json({ success: true, article });
  } catch (error) {
    return c.json({ error: 'Failed to create article' }, 500);
  }
});

// Update article (protected)
app.put("/make-server-45b957fb/articles/:slug", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const slug = c.req.param('slug');
    const updates = await c.req.json();
    const existing = await kv.get(`article:${slug}`);

    if (!existing) {
      return c.json({ error: 'Article not found' }, 404);
    }

    if (updates.slug && updates.slug !== slug) {
      await kv.del(`article:${slug}`);
      const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
      await kv.set(`article:${updates.slug}`, updated);
      return c.json({ success: true, article: updated });
    }

    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`article:${slug}`, updated);
    return c.json({ success: true, article: updated });
  } catch (error) {
    return c.json({ error: 'Failed to update article' }, 500);
  }
});

// Delete article (protected)
app.delete("/make-server-45b957fb/articles/:slug", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const slug = c.req.param('slug');
    await kv.del(`article:${slug}`);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete article' }, 500);
  }
});

// ==================== IMAGE ROUTES ====================

// Upload image (protected) — returns stable public URL
app.post("/make-server-45b957fb/upload-image", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
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

    const { error } = await supabaseStorage.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, { contentType: file.type });

    if (error) {
      return c.json({ error: 'Failed to upload image' }, 500);
    }

    const { data: urlData } = supabaseStorage.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return c.json({ success: true, url: urlData.publicUrl, fileName });
  } catch (error) {
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

// List all images (protected)
app.get("/make-server-45b957fb/images", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data, error } = await supabaseStorage.storage
      .from(bucketName)
      .list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });

    if (error) {
      return c.json({ error: 'Failed to list images' }, 500);
    }

    const images = (data || [])
      .filter(file => file.name !== '.emptyFolderPlaceholder' && !file.name.endsWith('/'))
      .map(file => {
        const { data: urlData } = supabaseStorage.storage.from(bucketName).getPublicUrl(file.name);
        return {
          name: file.name,
          url: urlData.publicUrl,
          size: file.metadata?.size || 0,
          createdAt: file.created_at,
        };
      });

    return c.json({ images });
  } catch (error) {
    return c.json({ error: 'Failed to list images' }, 500);
  }
});

// Delete image (protected)
app.delete("/make-server-45b957fb/images/:fileName", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const fileName = c.req.param('fileName');
    const { error } = await supabaseStorage.storage.from(bucketName).remove([fileName]);

    if (error) {
      return c.json({ error: 'Failed to delete image' }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete image' }, 500);
  }
});

Deno.serve(app.fetch);
