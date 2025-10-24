import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// LibreTranslate Free API (no API key needed)
const LIBRETRANSLATE_URL = 'https://libretranslate.com/translate';

// Backup: MyMemory Free API
const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';

interface TranslateRequest {
  text: string;
  targetLang: 'th' | 'en' | 'zh';
}

async function translateWithLibreTranslate(text: string, targetLang: string): Promise<string> {
  try {
    const response = await fetch(LIBRETRANSLATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'lo', // Lao
        target: targetLang === 'zh' ? 'zh' : targetLang,
        format: 'text',
      }),
    });

    if (!response.ok) {
      throw new Error('LibreTranslate failed');
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('LibreTranslate error:', error);
    throw error;
  }
}

async function translateWithMyMemory(text: string, targetLang: string): Promise<string> {
  try {
    const langPair = targetLang === 'zh' ? 'lo|zh-CN' : `lo|${targetLang}`;
    const url = `${MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=${langPair}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('MyMemory failed');
    }

    const data = await response.json();
    return data.responseData?.translatedText || text;
  } catch (error) {
    console.error('MyMemory error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: TranslateRequest = await request.json();
    const { text, targetLang } = body;

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Text and targetLang are required' },
        { status: 400 }
      );
    }

    // Validate target language
    if (!['th', 'en', 'zh'].includes(targetLang)) {
      return NextResponse.json(
        { error: 'Invalid target language. Must be th, en, or zh' },
        { status: 400 }
      );
    }

    let translatedText = text;

    // Try LibreTranslate first
    try {
      translatedText = await translateWithLibreTranslate(text, targetLang);
    } catch (error) {
      console.log('LibreTranslate failed, trying MyMemory...');
      
      // Fallback to MyMemory
      try {
        translatedText = await translateWithMyMemory(text, targetLang);
      } catch (fallbackError) {
        console.error('Both translation services failed:', fallbackError);
        return NextResponse.json(
          { 
            error: 'Translation service unavailable',
            translatedText: text // Return original text
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      translatedText,
      sourceLang: 'lo',
      targetLang,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}

// Batch translation endpoint
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { texts, targetLang } = body;

    if (!Array.isArray(texts) || !targetLang) {
      return NextResponse.json(
        { error: 'texts (array) and targetLang are required' },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      texts.map(async (text: string) => {
        try {
          return await translateWithLibreTranslate(text, targetLang);
        } catch {
          try {
            return await translateWithMyMemory(text, targetLang);
          } catch {
            return text; // Return original if both fail
          }
        }
      })
    );

    return NextResponse.json({
      success: true,
      translatedTexts: results,
      sourceLang: 'lo',
      targetLang,
    });
  } catch (error) {
    console.error('Batch translation error:', error);
    return NextResponse.json(
      { error: 'Batch translation failed' },
      { status: 500 }
    );
  }
}
