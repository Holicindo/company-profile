import { NextResponse } from 'next/server';
import translate from 'translate';

export async function POST(req: Request) {
  try {
    const { text, from = 'id', to = 'en' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Configure translation engine to use Google (free API)
    translate.engine = 'google';
    
    const translatedText = await translate(text, { from, to });

    return NextResponse.json({ result: translatedText });
  } catch (error: any) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed', details: error.message }, { status: 500 });
  }
}
